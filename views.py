import json
import shutil
from abc import ABCMeta
from datetime import timedelta
from itertools import chain
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Final, Any
from urllib.request import Request, urlopen
from zipfile import ZipFile, ZIP_DEFLATED

from bitarray import bitarray
from django.conf import settings
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.core.files.uploadhandler import TemporaryFileUploadHandler
from django.db.models import OuterRef, Subquery, Q
from django.http import FileResponse, HttpResponseNotFound, HttpResponseRedirect, JsonResponse, HttpRequest
from django.shortcuts import redirect
from django.urls import reverse_lazy, reverse
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.utils.text import slugify
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.views.generic.base import TemplateResponseMixin, RedirectView, TemplateView, View
from django.views.generic.detail import BaseDetailView
from django.views.generic.edit import FormView, DeleteView, CreateView
from django.views.generic.list import ListView

from epubeditor.alignment import find_paths, WordsDict, align_text_to_words, group_intervals, merge_by_silence
from epubeditor.apps import EpubeditorConfig
from epubeditor.fields import MaybeInterval, VoskOutput
from epubeditor.forms import UploadBookForm, DeleteBookForm, UserCreationForm, build_challenge, equation_to_svg
from epubeditor.models import (
    Book,
    RoleKey,
    Role,
    History,
    Epubcheck,
    Alignment,
    AlignmentPath,
    ParData,
    HistoryType,
    BookContentPayload,
    PayloadOpType,
    HistoryTrigger,
    MergePayload,
    SplitPayload,
)
from epubeditor.xhtml import XhtmlTree

OP_MAP: Final[dict[PayloadOpType, HistoryType]] = {
    "CREATE": "C",
    "UPDATE": "U",
    "DELETE": "D",
    "MERGE": "M",
    "SPLIT": "S",
}


def post_request(url: str, data: bytes) -> dict[str, Any]:
    request = Request(
        url,
        data=data,
        headers={"Content-Type": "text/plain", "Accept": "application/json"},
        method="POST",
    )
    with urlopen(request) as response:
        assert response.status == 200, f"Request to '{url}' failed: {response.status} {response.reason}"
        return json.loads(response.read())


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


def handle_book_content_op(
    op: PayloadOpType,
    trigger: HistoryTrigger,
    type: HistoryType,
    user: User,
    book: Book,
    item_id: str,
    data: MergePayload | SplitPayload | ParData,
) -> JsonResponse:
    match op:
        case "UPDATE":
            new: ParData = data
            old = book.modify_smil(item_id, new)
            History.create_init_entry(book, item_id, user, "U")
            History.objects.create(book=book, item_id=item_id, user=user, trigger=trigger, type=type, old=old, new=new)
            response = JsonResponse({"message": "OK", "old": old, "new": new}, status=200)
        case "CREATE":
            new = book.add_to_smil(item_id, data)
            _, text_id = new["textSrc"].split("#")
            History.create_init_entry(book, item_id, user, "C")
            History.objects.create(book=book, item_id=item_id, user=user, trigger=trigger, type=type, new=new)
            response = JsonResponse({"message": "OK", "new": new, "textId": text_id}, status=201)
        case "DELETE":
            old = book.delete_from_smil(item_id, data)
            History.create_init_entry(book, item_id, user, "D")
            History.objects.create(book=book, item_id=item_id, user=user, trigger=trigger, type=type, old=old)
            response = JsonResponse({"message": "OK", "old": old}, status=200)
        case "MERGE":
            text_id, old_xhtml, new_xhtml, old_smil, new_smil = book.merge_elements(item_id, data)
            History.create_init_entry(book, item_id, user, "M")
            History.objects.create(
                book=book,
                item_id=item_id,
                user=user,
                trigger=trigger,
                type=type,
                old_xhtml=old_xhtml,
                new_xhtml=new_xhtml,
                old_smil=old_smil,
                new_smil=new_smil,
            )
            response = JsonResponse({"message": "OK", "textId": text_id}, status=200)
        case "SPLIT":
            text_id, old_xhtml, new_xhtml, old_smil, new_smil = book.split_elements(item_id, data)
            History.create_init_entry(book, item_id, user, "S")
            History.objects.create(
                book=book,
                item_id=item_id,
                user=user,
                trigger=trigger,
                type=type,
                old_xhtml=old_xhtml,
                new_xhtml=new_xhtml,
                old_smil=old_smil,
                new_smil=new_smil,
            )
            response = JsonResponse({"message": "OK", "textId": text_id}, status=200)
        case other:
            response = JsonResponse({"message": f"Operation not supported: '{other}'"}, status=400)
    if getattr(settings, "SERIALIZE_PAYLOADS", False):
        write_debug_files_to_disk(zip_filename)
    return response


def write_debug_files_to_disk(zip_filename: str, xhtml_before, xhtml_after, smil_before, smil_after) -> None:
    zip_path = Path(zip_filename)
    assert str(zip_path.parent) == ".", f"'{zip_filename}' must be a filename without path components"
    assert zip_path.suffix == ".zip", f"'{zip_filename}' must be a .zip file with a corresponding extension"

    with ZipFile(zip_path, "a", ZIP_DEFLATED, False) as zipfile:
        pass


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

    def post(self, request: HttpRequest, *args, **kwargs) -> JsonResponse:
        """Restructure XHTML and SMIL by merging or splitting elements"""
        try:
            book: Book = self.get_object()
            raise_for_permissions(book, request.user)
            item_id = self.kwargs["item_id"]
            payload: BookContentPayload = json.loads(request.body)
            match payload["op"]:
                case "UNDO":
                    entry = History.get_last_undoable(book, item_id)
                    if entry is None:
                        return JsonResponse({"message": "Nothing to undo in history"}, status=400)
                    op, type, data = entry.undo()
                    return handle_book_content_op(op, "U", type, request.user, book, item_id, data)
                case "REDO":
                    entry = History.get_last_redoable(book, item_id)
                    if entry is None:
                        return JsonResponse({"message": "Nothing to redo in history"}, status=400)
                    op, type, data = entry.redo()
                    return handle_book_content_op(op, "R", type, request.user, book, item_id, data)
                case other:
                    return handle_book_content_op(other, "N", OP_MAP[other], request.user, book, item_id, payload)
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
        request.upload_handlers = [TemporaryFileUploadHandler(request)]
        super().setup(request, *args, **kwargs)

    # https://docs.djangoproject.com/en/5.1/topics/http/file-uploads/#modifying-upload-handlers-on-the-fly
    @method_decorator(csrf_protect)
    def post(self, request: HttpRequest, *args, **kwargs):
        return super().post(request, *args, **kwargs)

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
        context["listing"] = book.history_set.order_by("-timestamp").all()
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


def call_epubcheck(path: str) -> dict[str, Any]:
    path = Path(path)
    assert path.suffix.lower() == ".epub", "Filename must end with .epub"
    path = path.resolve()
    url = f"http://localhost:{EpubeditorConfig.EPUBCHECK_SERVER_PORT}"
    return post_request(url, path.as_posix().encode())


class AlignView(TemplateResponseMixin, AbstractBookDetailView):
    template_name = "epubeditor/align.html"

    def get(self, request: HttpRequest, *args, **kwargs):
        self.object = self.get_object()
        context = self.get_context_data(object=self.object)
        if context["alignment"] is None:
            return redirect("align_step_1", **kwargs)
        elif context["selected_alignment_path"] is None:
            return redirect("align_step_2", **kwargs)
        else:
            return redirect("align_step_3", **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book: Book = context["object"]
        raise_for_permissions(book, self.request.user)
        item_id = self.kwargs["item_id"]
        context["item_id"] = item_id
        context["title"], context["prev_item_id"], context["next_item_id"] = read_toc(book, item_id)
        context["username"] = self.kwargs["username"]
        context["basename"] = self.kwargs["basename"]
        context["audio_files"] = [
            resource.href
            for resource in book.get_resource_listing()
            if resource.attributes.get("media-type") in ["audio/mpeg", "audio/mp4", "audio/ogg; codecs=opus"]
        ]
        alignment: Alignment | None = book.alignment_set.filter(item_id=item_id).order_by("timestamp").last()
        if alignment is not None:
            context["alignment"] = alignment
            context["text"] = alignment.text
            words_dict: WordsDict = alignment.words
            path_set = alignment.alignmentpath_set.order_by("id")
            paths: list[tuple[bitarray, list[MaybeInterval], str, list[str]]] = []
            for p in path_set:
                path_array = bitarray()
                path_array.frombytes(p.path)
                path = path_array[: p.path_bit_n]
                intervals: list[MaybeInterval] = p.intervals
                text = "".join(line.strip() for line in alignment.text.split("\n") if line.strip())
                kana = words_dict["recognition_kana"]
                paths.append((path, intervals, text, kana))
            context["alignment_paths"] = paths
            context["selected_alignment_path"] = path_set.filter(selected=True).first()
            timings = alignment.get_timings()
            context["timings"] = ",".join(map(str, chain.from_iterable(timings)))
            audio_hrefs = [
                resource.href
                for resource in book.get_resource_listing()
                if resource.attributes["id"] == alignment.audio_id
                and resource.attributes.get("media-type") in ["audio/mpeg", "audio/mp4", "audio/ogg; codecs=opus"]
            ]
            assert len(audio_hrefs) == 1
            context["audiosrc"] = audio_hrefs[0]
        else:
            context["alignment"] = None
            context["text"] = book.extract_text_from_xhtml(item_id)
        return context


class AlignStep1View(AlignView):
    template_name = "epubeditor/align_step_1.html"

    def get(self, request: HttpRequest, *args, **kwargs):
        self.object = self.get_object()
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)

    def post(self, request: HttpRequest, *args, **kwargs):
        book: Book = self.get_object()
        raise_for_permissions(book, request.user)
        item_id = self.kwargs["item_id"]
        # step 1 should imply that there is no alignment in the database
        # therefore: try to create a new alignment
        audio_src: str = request.POST["audiosrc"]
        path = book.get_rootfile_path().parent.joinpath(audio_src).resolve()
        book.assert_data_path(path)
        url = f"http://localhost:{EpubeditorConfig.VOSKHTTP_SERVER_PORT}"
        results: VoskOutput = post_request(url, path.as_posix().encode())
        audio_ids = [
            resource.attributes["id"]
            for resource in book.get_resource_listing()
            if resource.href == audio_src
            and resource.attributes.get("media-type") in ["audio/mpeg", "audio/mp4", "audio/ogg; codecs=opus"]
        ]
        assert len(audio_ids) == 1
        audio_id = audio_ids[0]
        words: list[str] = list(
            chain.from_iterable((term["text"] for term in monologue["terms"]) for monologue in results["monologues"])
        )
        xml_root = XhtmlTree(file=book.get_xhtml_path(item_id)).getroot()
        text = book.extract_text_from_xhtml(item_id)
        if getattr(settings, "SERIALIZE_PAYLOADS", False):
            zip_filename = request.POST["zip_filename"]
            paths, words_dict = find_paths(words, text, zip_filename)
        else:
            paths, words_dict = find_paths(words, text)
        intervals_by_path = [align_text_to_words(path, words_dict) for path in paths]
        alignment = Alignment.objects.filter(book=book, item_id=item_id).first()
        if alignment is None:
            alignment = Alignment.objects.create(
                book=book,
                item_id=item_id,
                audio_id=audio_id,
                speech_recognition=results,
                words=words_dict,
                text=text,
                source=xml_root,
            )
        else:
            alignment.alignmentpath_set.all().delete()
            alignment.audio_id = audio_id
            alignment.speech_recognition = results
            alignment.words = words_dict
            alignment.text = text
            alignment.source = xml_root
            alignment.save()
        AlignmentPath.objects.bulk_create(
            AlignmentPath(
                alignment=alignment,
                path=path.tobytes(),
                path_bit_n=len(path),
                intervals=intervals,
            )
            for path, intervals in zip(paths, intervals_by_path)
        )
        return redirect("align_step_2", **kwargs)


class AlignStep2View(AlignView):
    template_name = "epubeditor/align_step_2.html"

    def get(self, request: HttpRequest, *args, **kwargs):
        self.object = self.get_object()
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)

    def post(self, request: HttpRequest, *args, **kwargs):
        book: Book = self.get_object()
        raise_for_permissions(book, request.user)
        alignment_path_index: int = int(request.POST["alignmentpath"])
        self.object = book
        context = self.get_context_data(object=self.object)
        alignment: Alignment = context["alignment"]
        paths = alignment.alignmentpath_set.order_by("id")
        for i, path in enumerate(paths, 1):
            if i == alignment_path_index:
                path.selected = True
            else:
                path.selected = False
        paths.bulk_update(paths, ["selected"])
        return redirect("align_step_3", **kwargs)


class AlignStep3View(AlignView):
    template_name = "epubeditor/align_step_3.html"

    def get(self, request: HttpRequest, *args, **kwargs):
        self.object = self.get_object()
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)

    def post(self, request: HttpRequest, *args, **kwargs):
        book: Book = self.get_object()
        raise_for_permissions(book, request.user)
        silence_threshold: float = float(request.POST["threshold"])
        self.object = book
        context = self.get_context_data(object=self.object)
        item_id = context["item_id"]
        alignment_path: AlignmentPath = context["selected_alignment_path"]
        alignment_path.min_silence_s = silence_threshold
        alignment_path.save(update_fields=["min_silence_s"])
        text: str = context["text"]
        alignment: Alignment = context["alignment"]
        groups = group_intervals(text, alignment_path.intervals, alignment.get_timings())
        merged_groups = merge_by_silence(groups, silence_threshold)
        audio_ids = [
            resource.attributes["id"]
            for resource in book.get_resource_listing()
            if resource.href == context["audiosrc"]
            and resource.attributes.get("media-type") in ["audio/mpeg", "audio/mp4", "audio/ogg; codecs=opus"]
        ]
        assert len(audio_ids) == 1
        alignment.add_media_overlay(context["item_id"], audio_ids[0], merged_groups)
        History.create_init_entry(book, item_id, request.user, "A")
        return redirect("book_content", **kwargs)


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
