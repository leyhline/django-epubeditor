import json
import shutil
from abc import ABCMeta
from datetime import timedelta
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import cast
from urllib.error import HTTPError

from django.conf import settings
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.core.files.images import ImageFile
from django.core.files.uploadedfile import TemporaryUploadedFile
from django.core.files.uploadhandler import TemporaryFileUploadHandler
from django.db.models import OuterRef, Q, Subquery
from django.http import (
    FileResponse,
    HttpRequest,
    HttpResponse,
    HttpResponseNotFound,
    HttpResponseRedirect,
    JsonResponse,
)
from django.urls import reverse, reverse_lazy
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.utils.text import slugify
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.views.generic.base import (
    RedirectView,
    TemplateResponseMixin,
    TemplateView,
    View,
)
from django.views.generic.detail import BaseDetailView
from django.views.generic.edit import CreateView, DeleteView, FormView
from django.views.generic.list import ListView

from epubeditor.forms import (
    DeleteBookForm,
    UploadBookForm,
    UserCreationForm,
    build_challenge,
    equation_to_svg,
)
from epubeditor.models import (
    Book,
    BookContentPayload,
    CompressToEpubOption,
    Epubcheck,
    History,
    Role,
)
from epubeditor.viewsutils import (
    OP_TO_TYPE,
    call_epubcheck,
    handle_book_content_op,
    raise_for_permissions,
    read_toc,
)


class AboutView(TemplateView):
    template_name = "epubeditor/about.html"


class BookListView(ListView):
    model = Book

    def get_queryset(self):
        if self.request.user.is_authenticated:
            role = self.request.user.role_set.filter(book=OuterRef("pk"))  # type: ignore
            return Book.objects.filter(Q(users=self.request.user) | Q(is_public=True)).annotate(
                user_role=Subquery(role.values("role"))
            )
        else:
            return Book.objects.filter(is_public=True)


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
        elif self.request.user.is_authenticated and book.users.filter(id=self.request.user.id).exists():  # type: ignore
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
            raise_for_permissions(book, cast(User, self.request.user))
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
            raise_for_permissions(book, cast(User, self.request.user))
            context["editable"] = True
        except PermissionDenied:
            context["editable"] = False
        context["xhtml"], context["smil"], context["active_class_name"] = book.get_xml_hrefs(item_id)
        return context

    def post(self, request: HttpRequest, *args, **kwargs) -> JsonResponse:
        """Restructure XHTML and SMIL by merging or splitting elements"""
        try:
            book: Book = self.get_object()
            raise_for_permissions(book, cast(User, request.user))
            item_id = self.kwargs["item_id"]
            payload: BookContentPayload = json.loads(request.body)
            match payload["op"]:
                case "UNDO":
                    entry = History.get_last_undoable(book, item_id)
                    if entry is None:
                        return JsonResponse({"message": "Nothing to undo in history"}, status=400)
                    op, type, data = entry.undo()
                    return handle_book_content_op(op, "U", type, cast(User, request.user), book, item_id, data)
                case "REDO":
                    entry = History.get_last_redoable(book, item_id)
                    if entry is None:
                        return JsonResponse({"message": "Nothing to redo in history"}, status=400)
                    op, type, data = entry.redo()
                    return handle_book_content_op(op, "R", type, cast(User, request.user), book, item_id, data)
                case other:
                    return handle_book_content_op(
                        other, "N", OP_TO_TYPE[other], cast(User, request.user), book, item_id, payload
                    )
        except (AssertionError, ValueError, PermissionDenied) as e:
            return JsonResponse({"message": str(e)}, status=400)


class HomeView(RedirectView):
    pattern_name = "book_list"


@method_decorator(csrf_exempt, name="dispatch")
class UploadBookView(LoginRequiredMixin, FormView):
    template_name = "epubeditor/upload_book.html"
    form_class = UploadBookForm
    success_url = reverse_lazy("book_list")

    def setup(self, request, *args, **kwargs):
        # always create temporary files for epub uploads since
        # epubcheck uses file paths
        request.upload_handlers = [TemporaryFileUploadHandler(request)]  # type: ignore
        super().setup(request, *args, **kwargs)

    # https://docs.djangoproject.com/en/5.1/topics/http/file-uploads/#modifying-upload-handlers-on-the-fly
    @method_decorator(csrf_protect)
    def post(self, request: HttpRequest, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def form_valid(self, form):
        epub: TemporaryUploadedFile = form.cleaned_data["epub"]

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
            check_result = call_epubcheck(epub.temporary_file_path())
        except AssertionError as e:
            form.add_error("epub", str(e))
            return self.form_invalid(form)
        except RuntimeError as e:
            for error in e.args:
                form.add_error("epub", error)
            return self.form_invalid(form)
        except HTTPError as e:
            error_msg = f"{e.code} {e.msg}"
            try:
                response_body = json.loads(e.file.read())
                if "message" in response_body:
                    error_msg += f"- {response_body["message"]}"
            except json.JSONDecodeError:
                pass
            form.add_error("epub", error_msg)
            return self.form_invalid(form)

        compressed_size = sum((item.get("compressedSize", 0)) for item in check_result["items"])
        uncompressed_size = sum((item.get("uncompressedSize", 0)) for item in check_result["items"])
        if disk_usage.free < (compressed_size + uncompressed_size + 1024 * 1024 * 1024):
            form.add_error("epub", "Not enough disk space on server")
            return self.form_invalid(form)

        epub_version = check_result["publication"]["ePubVersion"].split(".")
        if epub_version[0] != "3":
            form.add_error("epub", "EPUB version 3.0 expected")
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
        book.extract(epub.file)
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
        role: Role = self.request.user.role_set.get(book=book)  # type: ignore
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
            return self.form_invalid(form)  # type: ignore
        return super().form_valid(form)  # type: ignore


class HistoryView(TemplateResponseMixin, AbstractBookDetailView):
    template_name = "epubeditor/history.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book: Book = context["object"]
        context["username"] = self.kwargs["username"]
        context["basename"] = self.kwargs["basename"]
        context["listing"] = book.history_set.order_by("-timestamp").all()  # type: ignore
        return context


class HistoryItemView(TemplateResponseMixin, AbstractBookDetailView):
    template_name = "epubeditor/history.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book: Book = context["object"]
        context["username"] = self.kwargs["username"]
        context["basename"] = self.kwargs["basename"]
        item_id = self.kwargs["item_id"]
        context["item_id"] = item_id
        context["listing"] = History.objects.filter(book=book, item_id=item_id).order_by("-timestamp").all()
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
        last_hour = timezone.now() - timedelta(hours=1)
        nr_new_users = User.objects.filter(date_joined__gte=last_hour).count()
        max_new_users = getattr(settings, "MAX_NEW_USERS_PER_HOUR", self.MAX_NEW_USERS_PER_HOUR)
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
        return cast(User, self.request.user)


class ResourceDataView(AbstractBookDetailView):
    def get(self, request, *args, **kwargs):  # type: ignore
        book: Book = self.get_object()
        rel_path = self.kwargs["path"]
        media_type = book.get_media_type(rel_path)
        if not media_type:
            return HttpResponseNotFound()
        path = book.get_rootfile_path().parent.joinpath(rel_path).resolve()
        book.assert_data_path(path)
        if getattr(settings, "USE_XSENDFILE", False):
            path_val = path.as_posix().encode("utf-8")
            return HttpResponse(
                content_type=media_type, headers={"X-Sendfile": path_val, "Content-Disposition": "inline"}
            )
        else:
            return FileResponse(path.open("rb"), content_type=media_type)


class CoverImageView(AbstractBookDetailView):
    def get(self, request, *args, **kwargs):  # type: ignore
        book: Book = self.get_object()
        cover = cast(ImageFile, book.cover)
        if getattr(settings, "USE_XSENDFILE", False):
            path = Path(settings.MEDIA_ROOT).joinpath(cover.name)
            path_val = path.as_posix().encode("utf-8")
            return HttpResponse(
                content_type="image/jpeg", headers={"X-Sendfile": path_val, "Content-Disposition": "inline"}
            )
        else:
            return FileResponse(cover.open("rb"), content_type="image/jpeg")


class EpubDownloadView(AbstractBookDetailView):
    def get(self, request, *args, **kwargs):  # type: ignore
        book: Book = self.get_object()
        tempdir = TemporaryDirectory()
        if "for_reading_systems" in request.GET:
            compress_epub_option = CompressToEpubOption.FOR_READING_SYSTEMS
        elif "without_media_overlays" in request.GET:
            compress_epub_option = CompressToEpubOption.WITHOUT_MEDIA_OVERLAYS
        else:
            compress_epub_option = CompressToEpubOption.NONE
        try:
            zip_path = book.compress_to_epub(tempdir.name, compress_epub_option)
            response = FileResponse(open(zip_path, "rb"), content_type="application/epub+zip")
            # Let Django remove/cleanup temporary directory after response handling
            response._resource_closers.append(tempdir.cleanup)  # type: ignore
            return response
        except Exception as e:
            tempdir.cleanup()
            raise e


class ServiceWorkerView(View):
    def get(self, request, *args, **kwargs):
        path = Path(__file__).parent.joinpath("static/epubeditor/sw.js").resolve()
        response = FileResponse(path.open("rb"), content_type="text/javascript")
        response.headers["Service-Worker-Allowed"] = "/"  # type: ignore
        return response


class WorkboxView(View):
    def get(self, request, *args, **kwargs):
        path = Path(__file__).parent.joinpath("static/epubeditor").joinpath(kwargs["filename"]).resolve()
        response = FileResponse(path.open("rb"), content_type="text/javascript")
        return response
