import json
import shutil
from abc import ABCMeta
from pathlib import Path
from tempfile import TemporaryDirectory
from zipfile import ZipFile

import requests
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
from django.views.generic.base import TemplateResponseMixin, RedirectView, TemplateView, View
from django.views.generic.detail import BaseDetailView
from django.views.generic.edit import FormView, DeleteView, CreateView
from django.views.generic.list import ListView

from epubeditor.apps import EpubeditorConfig
from epubeditor.forms import UploadBookForm, DeleteBookForm, UserCreationForm, build_challenge, equation_to_svg
from epubeditor.models import Book, RoleKey, ParData, Role, History, Epubcheck, Alignment


class AboutView(TemplateView):
    template_name = "epubeditor/about.html"


class BookListView(ListView):
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


class BookDetailView(TemplateResponseMixin, AbstractBookDetailView):
    template_name = "epubeditor/book_detail.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book: Book = context["object"]
        context["username"] = self.kwargs["username"]
        context["basename"] = self.kwargs["basename"]
        context["listing"] = book.get_toc_listing()
        try:
            raise_for_permissions(book, self.request.user)
            context["editable"] = True
        except PermissionDenied:
            context["editable"] = False
        return context


class BookContentView(TemplateResponseMixin, AbstractBookDetailView):
    template_name = "epubeditor/book_content.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book: Book = context["object"]
        item_id = self.kwargs["item_id"]
        context["item_id"] = item_id
        context["title"], context["prev_item_id"], context["next_item_id"] = read_toc(book, item_id)
        context["username"] = self.kwargs["username"]
        context["basename"] = self.kwargs["basename"]
        try:
            raise_for_permissions(book, self.request.user)
            context["editable"] = True
        except PermissionDenied:
            context["editable"] = False
        context["xhtml"], context["smil"], context["active_class_name"] = book.get_xml_hrefs(item_id)
        return context

    def put(self, request: HttpRequest, *args, **kwargs):
        """Change timing of existing SMIL timestamps"""
        try:
            book: Book = self.get_object()
            raise_for_permissions(book, request.user)
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
            book: Book = self.get_object()
            raise_for_permissions(book, request.user)
            item_id = self.kwargs["item_id"]
            data: ParData = json.loads(request.body)
            new = book.add_to_smil(item_id, data)
            History.objects.create(book=book, user=request.user, trigger="N", type="C", new=new)
            return JsonResponse({"message": "OK", "new": new}, status=201)
        except (AssertionError, ValueError, PermissionDenied) as e:
            return JsonResponse({"message": str(e)}, status=400)

    def delete(self, request: HttpRequest, *args, **kwargs):
        """Delete existing SMIL timestamps"""
        try:
            book: Book = self.get_object()
            raise_for_permissions(book, request.user)
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
            check_result = call_epubcheck(epub.file.name)
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
        book = Book(
            uploader=self.request.user.username,
            basename=basename,
            identifier=check_result["publication"]["identifier"],
            title=check_result["publication"]["title"],
            language=check_result["publication"]["language"],
        )
        book.save()
        book.users.add(self.request.user, through_defaults={"role": "UL"})
        Epubcheck.objects.create(book=book, epubcheck=check_result)
        path = book.get_data_path()
        path.mkdir(parents=True, exist_ok=True)
        with ZipFile(epub.file, "r") as zip_ref:
            zip_ref.extractall(path)
        book.set_rootfile_path()
        book.set_cover()
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


class HistoryView(TemplateResponseMixin, AbstractBookDetailView):
    template_name = "epubeditor/history.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book: Book = context["object"]
        context["username"] = self.kwargs["username"]
        context["basename"] = self.kwargs["basename"]
        context["listing"] = book.history_set.all()
        return context


class ResourcesView(TemplateResponseMixin, AbstractBookDetailView):
    template_name = "epubeditor/resource_list.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book: Book = context["object"]
        context["username"] = self.kwargs["username"]
        context["basename"] = self.kwargs["basename"]
        context["listing"] = book.get_resource_listing()
        return context


class SignupView(CreateView):
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

    def post(self, request: HttpRequest, *args, **kwargs):
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


class SignupLimitView(TemplateView):
    template_name = "registration/signup_limit.html"


class DoLogoutView(LoginRequiredMixin, TemplateView):
    template_name = "registration/logout.html"


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
        path = Path(__file__).parent.joinpath("static/epubeditor/sw.js").resolve()
        response = FileResponse(path.open("rb"), content_type="text/javascript")
        response.headers["Service-Worker-Allowed"] = "/"
        return response


class WorkboxView(View):
    def get(self, request, *args, **kwargs):
        path = Path(__file__).parent.joinpath("static/epubeditor").joinpath(kwargs["filename"]).resolve()
        response = FileResponse(path.open("rb"), content_type="text/javascript")
        return response


def call_epubcheck(path: str) -> dict:
    path = Path(path)
    assert path.suffix.lower() == ".epub", "Filename must end with .epub"
    path = path.resolve()
    response = requests.post(
        f"http://localhost:{EpubeditorConfig.EPUBCHECK_SERVER_PORT}",
        data=path.as_posix(),
        headers={"Content-Type": "text/plain", "Accept": "application/json"},
    )
    response.raise_for_status()
    return response.json()


class AlignView(TemplateResponseMixin, AbstractBookDetailView):
    template_name = "epubeditor/align.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book: Book = context["object"]
        raise_for_permissions(book, self.request.user)
        item_id = self.kwargs["item_id"]
        context["item_id"] = item_id
        context["title"], context["prev_item_id"], context["next_item_id"] = read_toc(book, item_id)
        context["username"] = self.kwargs["username"]
        context["basename"] = self.kwargs["basename"]
        context["alignment"] = book.alignment_set.filter(item_id=item_id).order_by("timestamp").last()
        context["audio_files"] = [
            resource.href
            for resource in book.get_resource_listing()
            if resource.attributes.get("media-type") in ["audio/mpeg", "audio/mp4", "audio/ogg; codecs=opus"]
        ]
        context["text"] = book.extract_text_from_xhtml(item_id)
        return context

    def post(self, request: HttpRequest, *args, **kwargs):
        book: Book = self.get_object()
        raise_for_permissions(book, request.user)
        audio_src: str = request.POST["audiosrc"]
        path = book.get_rootfile_path().parent.joinpath(audio_src).resolve()
        book.assert_data_path(path)
        alignment = Alignment.objects.create(book=book, item_id=self.kwargs["item_id"])
        response = requests.post(
            f"http://localhost:{EpubeditorConfig.VOSKHTTP_SERVER_PORT}",
            data=path.as_posix(),
            headers={"Content-Type": "text/plain", "Accept": "application/json"},
        )
        alignment.speech_recognition = response.json()
        alignment.save(update_fields=["speech_recognition"])
        return super().get(request, *args, **kwargs)


def raise_for_permissions(book: Book, user: User) -> None:
    if user.is_authenticated:
        try:
            role: RoleKey = user.role_set.get(book=book).role
            if role not in ["UL", "ED"]:
                raise PermissionDenied("Forbidden")
        except Role.DoesNotExist:
            raise PermissionDenied("Forbidden")
    else:
        raise PermissionDenied("Forbidden")


def read_toc(book: Book, item_id: str) -> tuple[str, str | None, str | None]:
    toc = book.get_toc_listing()
    toc_length = len(toc)
    for i, toc_item in enumerate(toc):
        if toc_item.id != item_id:
            continue
        return (
            toc_item.text,
            toc[i - 1].id if 0 <= i - 1 < toc_length else None,
            toc[i + 1].id if 0 <= i + 1 < toc_length else None,
        )
