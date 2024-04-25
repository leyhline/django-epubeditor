import json
import shutil
import subprocess
from abc import ABCMeta
from os.path import splitext
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Any

from django.conf import settings
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.db.models import OuterRef, Subquery, Q
from django.http import FileResponse, HttpResponseNotFound, HttpResponseRedirect, JsonResponse, HttpRequest
from django.urls import reverse_lazy, reverse
from django.utils import timezone
from django.utils.text import slugify
from django.views.generic.base import ContextMixin, TemplateResponseMixin, RedirectView, TemplateView, View
from django.views.generic.detail import BaseDetailView
from django.views.generic.edit import FormView, DeleteView, CreateView
from django.views.generic.list import ListView

from epubeditor.forms import UploadBookForm, DeleteBookForm, UserCreationForm, build_challenge, equation_to_svg
from epubeditor.models import Book, RoleKey, ParData, Role, History


class AboutView(TemplateView):
    template_name = "epubeditor/about.html"


class LoginFormMixin(ContextMixin):
    extra_context = {"login_form": AuthenticationForm}


class BookListView(LoginFormMixin, ListView):
    model = Book

    def get_queryset(self):
        if self.request.user.is_authenticated:
            role = self.request.user.role_set.filter(book=OuterRef("pk"))
            return self.model.objects.filter(Q(users=self.request.user) | Q(is_public=True)).annotate(
                user_role=Subquery(role.values("role"))
            )
        else:
            return self.model.objects.filter(is_public=True)


class AbstractBookDetailView(BaseDetailView, metaclass=ABCMeta):
    """
    An abstract class checking if the user has access to the requested book.
    Does not include template logic (use TemplateResponseMixin for that).
    """

    model = Book

    def get_object(self, queryset=None):
        uploader = self.kwargs["username"]
        basename = self.kwargs["basename"]
        queryset = self.get_queryset()
        book: Book = queryset.get(uploader=uploader, basename=basename)
        if book.is_public:
            return book
        elif self.request.user.is_authenticated and book.users.filter(id=self.request.user.id).exists():
            return book
        else:
            raise self.model.DoesNotExist("%s matching query does not exist." % self.model.__name__)


class BookDetailView(LoginFormMixin, TemplateResponseMixin, AbstractBookDetailView):
    template_name = "epubeditor/book_detail.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book: Book = context["object"]
        context["username"] = self.kwargs["username"]
        context["basename"] = self.kwargs["basename"]
        context["listing"] = book.get_toc_listing()
        return context


class BookContentView(LoginFormMixin, TemplateResponseMixin, AbstractBookDetailView):
    template_name = "epubeditor/book_content.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book: Book = context["object"]
        item_id = self.kwargs["item_id"]
        context["item_id"] = item_id
        toc = book.get_toc_listing()
        toc_length = len(toc)
        for i, toc_item in enumerate(toc):
            if toc_item.id != item_id:
                continue
            context["title"] = toc_item.text
            context["prev_item_id"] = toc[i - 1].id if 0 <= i - 1 < toc_length else None
            context["next_item_id"] = toc[i + 1].id if 0 <= i + 1 < toc_length else None
            break
        context["username"] = self.kwargs["username"]
        context["basename"] = self.kwargs["basename"]
        try:
            self._get_editable_book()
            context["editable"] = True
        except PermissionDenied:
            context["editable"] = False
        context["xhtml"], context["smil"], context["active_class_name"] = book.get_xml_hrefs(item_id)
        return context

    def _get_editable_book(self) -> Book:
        book: Book = self.get_object()
        if self.request.user.is_authenticated:
            try:
                role: RoleKey = self.request.user.role_set.get(book=book).role
                if role not in ["UL", "ED"]:
                    raise PermissionDenied("Forbidden")
            except Role.DoesNotExist:
                raise PermissionDenied("Forbidden")
            return book
        else:
            raise PermissionDenied("Forbidden")

    def put(self, request: HttpRequest, *args, **kwargs):
        """Change timing of existing SMIL timestamps"""
        try:
            book = self._get_editable_book()
            item_id = self.kwargs["item_id"]
            data: ParData = json.loads(request.body)
            old, new = book.modify_smil(item_id, data)
            History.objects.create(book=book, user=request.user, trigger="N", type="U", old=old, new=new)
            return JsonResponse({"message": "OK", "old": old, "new": new}, status=200)
        except (AssertionError, ValueError, PermissionDenied) as e:
            return JsonResponse({"message": str(e)}, status=400)

    def post(self, request: HttpRequest, *args, **kwargs):
        """Create new SMIL timestamps and corresponding span elements"""
        try:
            book = self._get_editable_book()
            item_id = self.kwargs["item_id"]
            data: ParData = json.loads(request.body)
            print(data)
            new = book.add_to_smil(item_id, data)
            History.objects.create(book=book, user=request.user, trigger="N", type="C", new=new)
            return JsonResponse({"message": "OK", "new": new}, status=201)
        except (AssertionError, ValueError, PermissionDenied) as e:
            return JsonResponse({"message": str(e)}, status=400)

    def delete(self, request: HttpRequest, *args, **kwargs):
        """Delete existing SMIL timestamps"""
        try:
            book = self._get_editable_book()
            item_id = self.kwargs["item_id"]
            data: ParData = json.loads(request.body)
            old = book.delete_from_smil(item_id, data)
            History.objects.create(book=book, user=request.user, trigger="N", type="D", old=old)
            return JsonResponse({"message": "OK", "old": old}, status=200)
        except (AssertionError, ValueError, PermissionDenied) as e:
            return JsonResponse({"message": str(e)}, status=400)


class HomeView(RedirectView):
    pattern_name = "book_list"


class UploadBookView(LoginRequiredMixin, FormView):
    template_name = "epubeditor/upload_book.html"
    form_class = UploadBookForm
    success_url = reverse_lazy("book_list")

    def form_valid(self, form):
        epub = form.cleaned_data["epub"]

        disk_usage = shutil.disk_usage(Path(settings.MEDIA_ROOT))
        # max 1 GB empty space
        if disk_usage.free < 1024 * 1024 * 1024:
            form.add_error("epub", "Not enough disk space on server")
            return self.form_invalid(form)

        # max. 512 MB
        if epub.size > 512 * 1024 * 1024:
            form.add_error("epub", "File size must not exceed 500 MB")
            return self.form_invalid(form)

        try:
            check_result = call_epubcheck(epub.name, epub.file.name)
        except AssertionError as e:
            form.add_error("epub", str(e))
            return self.form_invalid(form)
        except RuntimeError as e:
            for error in e.args:
                form.add_error("epub", error)
            return self.form_invalid(form)

        compressed_size = sum((item.get("compressedSize", 0)) for item in check_result["items"])
        uncompressed_size = sum((item.get("uncompressedSize", 0)) for item in check_result["items"])
        if disk_usage.free < (compressed_size + uncompressed_size + 1024 * 1024 * 1024):
            form.add_error("epub", "Not enough disk space on server")
            return self.form_invalid(form)

        epub_version = check_result["publication"]["ePubVersion"].split(".")
        if epub_version[0] != "3":
            form.add_error("epub", "ePub version 3.x expected")
            return self.form_invalid(form)

        errors = [
            f'{message.get("severity", "ERROR")}: {message.get("message", "Unknown error")}'
            for message in check_result.get("messages", [])
            if message.get("severity") in ["ERROR", "FATAL"]
        ]
        if len(errors) > 0:
            for error in errors:
                form.add_error("epub", error)
            return self.form_invalid(form)

        basename = slugify(check_result["publication"]["title"], allow_unicode=True)
        assert len(basename) > 0, "title slug must not be empty"
        book: Book = form.save(commit=False)
        # The order of the method calls is important
        book.update_after_upload(self.request.user, basename, check_result)
        book.unzip()
        book.set_rootfile_path()
        book.set_cover()
        form.save_m2m()
        return super().form_valid(form)


class DeleteBookView(LoginRequiredMixin, DeleteView):
    model = Book
    template_name = "epubeditor/delete_book.html"
    form_class = DeleteBookForm
    success_url = reverse_lazy("book_list")

    def get_object(self, queryset=None):
        uploader = self.kwargs["username"]
        basename = self.kwargs["basename"]
        queryset = self.get_queryset()
        book: Book = queryset.get(uploader=uploader, basename=basename)
        role: Role = self.request.user.role_set.get(book=book)
        if role.role == "UL":
            return book
        else:
            raise self.model.DoesNotExist("%s matching query does not exist." % self.model.__name__)

    def form_valid(self, form):
        uploader = form.cleaned_data["uploader"]
        title = form.cleaned_data["title"]
        book: Book = self.get_object()
        is_invalid = False
        if uploader != book.uploader:
            is_invalid = True
            form.add_error("uploader", "Invalid username")
        if title != book.title:
            is_invalid = True
            form.add_error("title", "Invalid book title")
        if is_invalid:
            return self.form_invalid(form)
        return super().form_valid(form)


class HistoryView(LoginFormMixin, TemplateResponseMixin, AbstractBookDetailView):
    template_name = "epubeditor/history.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book: Book = context["object"]
        context["username"] = self.kwargs["username"]
        context["basename"] = self.kwargs["basename"]
        context["listing"] = book.history_set.all()
        return context


class ResourcesView(LoginFormMixin, TemplateResponseMixin, AbstractBookDetailView):
    template_name = "epubeditor/resource_list.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book: Book = context["object"]
        context["username"] = self.kwargs["username"]
        context["basename"] = self.kwargs["basename"]
        context["listing"] = book.get_resource_listing()
        return context


class SignupView(LoginFormMixin, CreateView):
    MAX_NEW_USERS_PER_HOUR = 10

    template_name = "registration/signup.html"
    form_class = UserCreationForm
    success_url = reverse_lazy("login")

    def __init__(self):
        super().__init__()
        self.equation, self.solution = build_challenge()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        equation_svg = equation_to_svg(self.equation)
        context["equation"] = equation_svg
        return context

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse("book_list"))
        if self._is_rate_limit_exceeded():
            return HttpResponseRedirect(reverse("signup_limit"))
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        self.object = None
        request.session["solution"] = self.solution
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        self.object = None
        solution = request.session.get("solution", None)
        request.session["solution"] = self.solution
        form = self.get_form()
        result = form.data.get("result", "")
        try:
            result = int(result)
        except ValueError:
            form.add_error(None, "Calculation incorrect")
        if result != solution:
            form.add_error(None, "Calculation incorrect")
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

    def _is_rate_limit_exceeded(self):
        last_hour = timezone.now() - timezone.timedelta(hours=1)
        nr_new_users = User.objects.filter(date_joined__gte=last_hour).count()
        try:
            max_new_users = settings.MAX_NEW_USERS_PER_HOUR
        except AttributeError:
            max_new_users = self.MAX_NEW_USERS_PER_HOUR
        return nr_new_users >= max_new_users


class SignupLimitView(LoginFormMixin, TemplateView):
    template_name = "registration/signup_limit.html"


class DeleteAccountView(LoginRequiredMixin, DeleteView):
    model = User
    template_name = "registration/delete_account.html"
    form_class = AuthenticationForm
    success_url = reverse_lazy("book_list")

    def get_object(self, queryset=None):
        return self.request.user


class ResourceData(AbstractBookDetailView):
    def get(self, request, *args, **kwargs):
        """
        TODO: Better use nginx redirecting in a production environment instead of piping everything through Django
        """
        book: Book = self.get_object()
        rel_path = self.kwargs["path"]
        media_type = book.get_media_type(rel_path)
        if not media_type:
            return HttpResponseNotFound()
        path = book.get_rootfile_path().parent.joinpath(rel_path).resolve()
        book.assert_data_path(path)
        return FileResponse(path.open("rb"), content_type=media_type)


class CoverImage(AbstractBookDetailView):
    def get(self, request, *args, **kwargs):
        """
        TODO: same as above, use nginx redirecting
        """
        book: Book = self.get_object()
        return FileResponse(book.cover.open("rb"), content_type="image/jpeg")


class EpubDownload(AbstractBookDetailView):
    def get(self, request, *args, **kwargs):
        book: Book = self.get_object()
        tempdir = TemporaryDirectory()
        try:
            zip_path = book.compress_to_epub(tempdir.name)
            response = FileResponse(open(zip_path, "rb"), content_type="application/epub+zip")
            # Let Django remove/cleanup temporary directory after response handling
            response._resource_closers.append(tempdir.cleanup)
            return response
        except Exception as e:
            tempdir.cleanup()
            raise e


class ServiceWorkerView(View):
    def get(self, request, *args, **kwargs):
        sw_path = Path(__file__).parent.joinpath("static/epubeditor/sw.js").resolve()
        response = FileResponse(sw_path.open("rb"), content_type="application/javascript")
        response.headers["Service-Worker-Allowed"] = "/"
        return response


def load_epubcheck_json(stdout: str) -> dict[str, Any]:
    json_start_index = stdout.find("{")
    json_end_index = stdout.rfind("}")
    return json.loads(stdout[json_start_index : json_end_index + 1])


def call_epubcheck(filename, filepath) -> dict[str, Any]:
    """Depends on java and epubcheck.jar. Both must be installed on the system."""
    assert splitext(filename)[1].lower() == ".epub", "Filename must end with .epub"
    # TODO use something like firejail to make this at least slightly more secure
    java_args = [
        "C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.10.7-hotspot\\bin\\java.exe",
        "-jar",
        "epubcheck-5.1.0/epubcheck.jar",
        filepath,
        "-j",
        "-",
    ]
    epubcheck_proc = subprocess.run(java_args, capture_output=True, text=True)
    if epubcheck_proc.returncode != 0:
        errors = [epubcheck_proc.stderr]
        try:
            check_result = load_epubcheck_json(epubcheck_proc.stdout)
            messages = [
                f'{message.get("severity", "ERROR")}: {message.get("message", "Unknown error")}'
                for message in check_result.get("messages", [])
            ]
            errors.extend(messages)
        except json.JSONDecodeError:
            pass
        raise RuntimeError(*errors)
    return load_epubcheck_json(epubcheck_proc.stdout)
