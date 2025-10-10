import os
import shutil
from datetime import datetime
from datetime import timezone as tz
from enum import Enum
from os import PathLike
from pathlib import Path
from time import sleep
from typing import IO, Final, Literal, NamedTuple, TypedDict, Union, cast
from xml.etree.ElementTree import Element
from zipfile import ZIP_DEFLATED, ZIP_STORED, ZipFile

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from PIL import Image

from epubeditor.epub import (
    COMPRESSABLE_CORE_MEDIA_TYPES,
    CORE_MEDIA_TYPES,
    ParData,
    ResourceListingItem,
    TocListingItem,
    adjust_smil_timings,
    create_smil,
    extract_par_data,
    get_cover_image_path,
    get_text_href_from_smil,
    get_toc_path,
    iterate_manifest_items,
    merge_smil,
    merge_xhtml,
    read_resource_listing,
    read_toc,
    read_xml_hrefs,
    remove_media_overlays,
    split_element,
    split_smil,
    split_xhtml,
)
from epubeditor.fields import SmilField, XhtmlField
from epubeditor.xhtml import (
    SMIL_NAMESPACES,
    XHTML_NAMESPACES,
    ContainerTree,
    OpfTree,
    SmilTree,
    XhtmlTree,
)

RoleKey = Literal["UL", "ED", "RD"]
HistoryType = Literal["C", "U", "D", "M", "S"]
HistoryTrigger = Literal["I", "N", "U", "R"]
PayloadOpType = Literal["CREATE", "UPDATE", "DELETE", "MERGE", "SPLIT", "UNDO", "REDO"]


class CompressToEpubOption(Enum):
    NONE = ""
    FOR_READING_SYSTEMS = "for_reading_systems"
    WITHOUT_MEDIA_OVERLAYS = "without_media_overlays"


class DebugInfo(NamedTuple):
    path: Path
    old_content: list[str]
    new_content: list[str]
    old_modified: datetime
    new_modified: datetime


class MergePayload(TypedDict):
    parId: str
    otherParId: str


class SplitPayload(TypedDict):
    parId: str
    index: int


class BookContentPayload(MergePayload, SplitPayload, ParData):
    op: PayloadOpType


def epub_path(instance, filename):
    return os.path.join(instance.uploader, f"{instance.basename}.epub")


def cover_path(instance, filename):
    return os.path.join(instance.uploader, f"{instance.basename}.jpg")


class Book(models.Model):
    uploader = models.CharField(max_length=50)
    basename = models.SlugField(default="", allow_unicode=True)
    identifier = models.CharField(max_length=100, help_text="Analogous to dc:identifier in the OPF file")
    title = models.CharField(max_length=100, help_text="Analogous to dc:title in the OPF file")
    language = models.CharField(max_length=100, help_text="Analogous to dc:language in the OPF file")
    is_public = models.BooleanField(default=False)
    users = models.ManyToManyField(User, through="Role")
    rootfile_path = models.CharField(max_length=100)
    cover = models.ImageField(upload_to=cover_path, blank=True)

    class Meta:
        unique_together = ("uploader", "basename")

    def __str__(self):
        return f"Book({self.id}, '{self.uploader}/{self.basename}')"

    def get_data_path(self) -> Path:
        media_root = Path(settings.MEDIA_ROOT)
        assert len(self.uploader) > 0 and len(self.basename) > 0, f"invalid path: {self.uploader}/{self.basename}"
        data_path = media_root.joinpath(self.uploader).joinpath(self.basename)
        return data_path.resolve()

    def assert_data_path(self, path: Path) -> None:
        data_path = self.get_data_path()
        assert path.resolve().is_relative_to(data_path)

    def get_rootfile_path(self) -> Path:
        data_path = self.get_data_path()
        rootfile_path = data_path.joinpath(self.rootfile_path)
        self.assert_data_path(rootfile_path)
        return rootfile_path

    def set_rootfile_path(self) -> None:
        """
        Read the container.xml to set the relative path of the rootfile inside
        the Book model. This path does not change, so calling this one time
        is sufficient. The rootfile is necessary for all other EPUB related operations.
        """
        data_path = self.get_data_path()
        container_path = data_path.joinpath("META-INF").joinpath("container.xml")
        if not container_path.exists():
            raise FileNotFoundError(f"container.xml not found in {data_path}")
        tree = ContainerTree(file=container_path)
        namespaces = tree.register_namespaces()
        rootfiles = tree.find("rootfiles", namespaces=namespaces)
        for rootfile in rootfiles:
            rootfile_path = rootfile.get("full-path")
            if not rootfile_path:
                continue
            path = data_path.joinpath(rootfile_path)
            self.assert_data_path(path)
            if not path.exists():
                continue
            self.rootfile_path = rootfile_path
            self.save(update_fields=["rootfile_path"])
            return
        raise FileNotFoundError(f"rootfile not found in {data_path}")

    def compress_to_epub(self, folder: str, option: CompressToEpubOption) -> str:
        data_path = self.get_data_path()
        zip_path = os.path.join(folder, f"{self.basename}.epub")
        meta_inf_files: Final = {
            "container.xml",
            "signatures.xml",
            "encryption.xml",
            "metadata.xml",
            "rights.xml",
            "manifest.xml",
        }
        with ZipFile(zip_path, "w", ZIP_DEFLATED, False) as zipfile:
            zipfile.write(data_path.joinpath("mimetype"), "mimetype")
            for child in data_path.joinpath("META-INF").iterdir():
                if child.is_file() and child.name in meta_inf_files:
                    zipfile.write(child, child.relative_to(data_path))
            rootfile_path = self.get_rootfile_path()
            if option == CompressToEpubOption.WITHOUT_MEDIA_OVERLAYS:
                rootfile_tree = OpfTree(file=rootfile_path)
                remove_media_overlays(rootfile_tree)
                zipfile.writestr(rootfile_path.relative_to(data_path).as_posix(), rootfile_tree.tostring())
            else:
                zipfile.write(rootfile_path, rootfile_path.relative_to(data_path))
            for resource in self.get_resource_listing():
                path = rootfile_path.parent.joinpath(resource.href)
                media_type = resource.attributes.get("media-type")
                if (
                    option == CompressToEpubOption.WITHOUT_MEDIA_OVERLAYS
                    and media_type is not None
                    and (media_type == "application/smil+xml" or media_type.startswith("audio/"))
                ):
                    pass
                elif option == CompressToEpubOption.FOR_READING_SYSTEMS and media_type == "application/smil+xml":
                    smil_tree = SmilTree(file=path)
                    adjust_smil_timings(smil_tree)
                    zipfile.writestr(path.relative_to(data_path).as_posix(), smil_tree.tostring())
                elif media_type in COMPRESSABLE_CORE_MEDIA_TYPES:
                    zipfile.write(path, path.relative_to(data_path))
                else:
                    zipfile.write(path, path.relative_to(data_path), ZIP_STORED)
        return zip_path

    def extract(self, epub_file: PathLike | IO) -> None:
        path = self.get_data_path()
        path.mkdir(parents=True, exist_ok=True)
        with ZipFile(epub_file, "r") as zipfile:
            zipfile.extractall(path)

    def set_cover(self) -> None:
        """searches for property 'cover-image' in package.opf; call after unzip"""
        rootfile_path = self.get_rootfile_path()
        rootfile_tree = OpfTree(file=rootfile_path)
        try:
            image_path = get_cover_image_path(rootfile_tree, rootfile_path)
        except KeyError:
            return
        self.assert_data_path(image_path)
        with Image.open(image_path) as im:
            media_root = Path(settings.MEDIA_ROOT)
            target_path = media_root.joinpath(self.uploader).joinpath(f"{self.basename}.jpg")
            im.thumbnail((280, im.height), Image.Resampling.LANCZOS)
            im.save(target_path, format="JPEG", quality="web_low")
            self.cover = f"{self.uploader}/{self.basename}.jpg"
            self.save(update_fields=["cover"])

    def get_toc_listing(self) -> list[TocListingItem]:
        rootfile_path = self.get_rootfile_path()
        rootfile_tree = OpfTree(file=rootfile_path)
        toc_path = get_toc_path(rootfile_tree, rootfile_path)
        self.assert_data_path(toc_path)
        toc_tree = XhtmlTree(file=toc_path)
        toc_src = toc_path.parent.relative_to(rootfile_path.parent).as_posix()
        if toc_src.startswith("."):
            toc_src = toc_src[1:]
        return read_toc(rootfile_tree, toc_tree, toc_src)

    def get_xml_hrefs(self, item_id: str) -> tuple[str, str | None, str | None]:
        rootfile_path = self.get_rootfile_path()
        tree = OpfTree(file=rootfile_path)
        return read_xml_hrefs(tree, item_id)

    def get_resource_listing(self) -> list[ResourceListingItem]:
        rootfile_path = self.get_rootfile_path()
        tree = OpfTree(file=rootfile_path)
        return read_resource_listing(tree)

    def get_media_type(self, href) -> str | None:
        rootfile_path = self.get_rootfile_path()
        tree = OpfTree(file=rootfile_path)
        for item in iterate_manifest_items(tree, CORE_MEDIA_TYPES):
            if item.get("href") == href:
                return item.get("media-type")
        return None

    def get_xhtml_path(self, item_id: str, get_smil_instead=False) -> Path:
        xhtml_href, smil_href, _ = self.get_xml_hrefs(item_id)
        if get_smil_instead:
            if smil_href is None:
                raise KeyError(f'rootfile item with id="{item_id}" has no media-overlay attribute')
            href = smil_href
        else:
            href = xhtml_href
        rootfile_path = self.get_rootfile_path()
        path = rootfile_path.parent.joinpath(href)
        self.assert_data_path(path)
        return path

    def get_xhtml_paths(self, item_id: str) -> tuple[Path, Path | None]:
        xhtml_href, smil_href, _ = self.get_xml_hrefs(item_id)
        rootfile_path = self.get_rootfile_path()
        xhtml_path = rootfile_path.parent.joinpath(xhtml_href)
        self.assert_data_path(xhtml_path)
        smil_path: Path | None = None
        if smil_href is not None:
            smil_path = rootfile_path.parent.joinpath(smil_href)
            self.assert_data_path(smil_path)
        return xhtml_path, smil_path

    def lock(self, path: Path):
        """Locks a file inside the EPUB directory. The lock is released after 10 seconds."""
        relative_path = path.relative_to(self.get_data_path()).as_posix()
        assert len(relative_path) > 0, "lock not possible: path to file should not be empty"
        lock, _ = FileLock.objects.get_or_create(book=self, path=relative_path)
        lock.lock()
        return lock

    def modify_smil(self, item_id: str, new: ParData, do_serialize_payloads: bool) -> tuple[ParData, DebugInfo | None]:
        smil_path = self.get_xhtml_path(item_id, True)
        lock = self.lock(smil_path)
        try:
            debug_info: DebugInfo | None = None
            if do_serialize_payloads:
                old_content, old_modified = read_file_for_debug(smil_path)
            tree = SmilTree(file=smil_path)
            namespaces = tree.register_namespaces()
            par = tree.find(".//par[@id='%s']" % new["parId"], namespaces=namespaces)
            assert par is not None, f"No par element found with id={new['parId']} in: {smil_path}"
            old = extract_par_data(par, namespaces)
            audio = par.find("audio", namespaces=namespaces)
            assert audio is not None, f"No audio element found below par with id={new['parId']} in: {smil_path}"
            audio.set("clipBegin", new["clipBegin"])
            audio.set("clipEnd", new["clipEnd"])
            tree.write(smil_path)
            if do_serialize_payloads:
                new_content, new_modified = read_file_for_debug(smil_path)
                debug_info = DebugInfo(smil_path, old_content, new_content, old_modified, new_modified)  # type: ignore
            return old, debug_info
        finally:
            lock.unlock()

    def delete_from_smil(
        self, item_id: str, old: ParData, do_serialize_payloads: bool
    ) -> tuple[ParData, DebugInfo | None]:
        smil_path = self.get_xhtml_path(item_id, True)
        lock = self.lock(smil_path)
        try:
            debug_info: DebugInfo | None = None
            if do_serialize_payloads:
                old_content, old_modified = read_file_for_debug(smil_path)
            tree = SmilTree(file=smil_path)
            namespaces = tree.register_namespaces()
            par_parent = tree.find(".//par[@id='%s']/.." % old["parId"], namespaces=namespaces)
            assert par_parent is not None, f"No parent of par element with id={old['parId']} found in: {smil_path}"
            par = par_parent.find("./par[@id='%s']" % old["parId"], namespaces=namespaces)
            assert par is not None, f"No par element found with id={old['parId']} in: {smil_path}"
            par_parent.remove(par)
            tree.write(smil_path)
            if do_serialize_payloads:
                new_content, new_modified = read_file_for_debug(smil_path)
                debug_info = DebugInfo(smil_path, old_content, new_content, old_modified, new_modified)  # type: ignore
            return old, debug_info
        finally:
            lock.unlock()

    def add_to_smil(self, item_id: str, new: ParData, do_serialize_payloads: bool) -> tuple[ParData, DebugInfo | None]:
        smil_path = self.get_xhtml_path(item_id, True)
        lock = self.lock(smil_path)
        try:
            debug_info: DebugInfo | None = None
            if do_serialize_payloads:
                old_content, old_modified = read_file_for_debug(smil_path)
            tree = SmilTree(file=smil_path)
            new_par_id = create_smil(tree, new)
            new["parId"] = new_par_id
            tree.write(smil_path)
            new_content, new_modified = read_file_for_debug(smil_path)
            if do_serialize_payloads:
                debug_info = DebugInfo(smil_path, old_content, new_content, old_modified, new_modified)  # type: ignore
            return new, debug_info
        finally:
            lock.unlock()

    def merge_elements(
        self, item_id: str, payload: MergePayload, do_serialize_payloads: bool
    ) -> tuple[str, Element, Element, Element, Element, DebugInfo | None, DebugInfo | None]:
        xhtml_path = self.get_xhtml_path(item_id, False)
        smil_path = self.get_xhtml_path(item_id, True)
        xhtml_lock = self.lock(xhtml_path)
        smil_lock = self.lock(smil_path)
        try:
            xhtml_debug_info: DebugInfo | None = None
            smil_debug_info: DebugInfo | None = None
            if do_serialize_payloads:
                old_smil_content, old_smil_modified = read_file_for_debug(smil_path)
            smil_tree = SmilTree(file=smil_path)
            text_src, text_id, other_text_id, old_smil, new_smil = merge_smil(
                smil_tree, payload["parId"], payload["otherParId"]
            )
            assert smil_path.parent.joinpath(text_src).resolve() == xhtml_path
            if do_serialize_payloads:
                old_xhtml_content, old_xhtml_modified = read_file_for_debug(xhtml_path)
            xhtml_tree = XhtmlTree(file=xhtml_path)
            old_xhtml, new_xhtml = merge_xhtml(xhtml_tree, text_id, other_text_id)
            smil_tree.write(smil_path)
            if do_serialize_payloads:
                new_smil_content, new_smil_modified = read_file_for_debug(smil_path)
                smil_debug_info = DebugInfo(
                    smil_path, old_smil_content, new_smil_content, old_smil_modified, new_smil_modified  # type: ignore
                )
            xhtml_tree.write(xhtml_path)
            if do_serialize_payloads:
                new_xhtml_content, new_xhtml_modified = read_file_for_debug(xhtml_path)
                xhtml_debug_info = DebugInfo(
                    xhtml_path, old_xhtml_content, new_xhtml_content, old_xhtml_modified, new_xhtml_modified  # type: ignore
                )
            return (
                text_id,
                old_xhtml,
                new_xhtml,
                old_smil,
                new_smil,
                xhtml_debug_info,
                smil_debug_info,
            )
        finally:
            xhtml_lock.unlock()
            smil_lock.unlock()

    def split_elements(
        self, item_id: str, payload: SplitPayload, do_serialize_payloads: bool
    ) -> tuple[str, Element, Element, Element, Element, DebugInfo | None, DebugInfo | None]:
        xhtml_path = self.get_xhtml_path(item_id, False)
        smil_path = self.get_xhtml_path(item_id, True)
        xhtml_lock = self.lock(xhtml_path)
        smil_lock = self.lock(smil_path)
        try:
            xhtml_debug_info: DebugInfo | None = None
            smil_debug_info: DebugInfo | None = None
            if do_serialize_payloads:
                old_smil_content, old_smil_modified = read_file_for_debug(smil_path)
            smil_tree = SmilTree(file=smil_path)
            text_src, text_id = get_text_href_from_smil(smil_tree, payload["parId"])
            assert smil_path.parent.joinpath(text_src).resolve() == xhtml_path
            if do_serialize_payloads:
                old_xhtml_content, old_xhtml_modified = read_file_for_debug(xhtml_path)
            xhtml_tree = XhtmlTree(file=xhtml_path)
            new_text_id, text1, text2, old_xhtml, new_xhtml = split_xhtml(xhtml_tree, text_id, payload["index"])
            old_smil, new_smil = split_smil(
                smil_tree, payload["parId"], f"{text_src}#{new_text_id}", len(text1), len(text2)
            )
            smil_tree.write(smil_path)
            if do_serialize_payloads:
                new_smil_content, new_smil_modified = read_file_for_debug(smil_path)
                smil_debug_info = DebugInfo(
                    smil_path, old_smil_content, new_smil_content, old_smil_modified, new_smil_modified  # type: ignore
                )
            xhtml_tree.write(xhtml_path)
            if do_serialize_payloads:
                new_xhtml_content, new_xhtml_modified = read_file_for_debug(xhtml_path)
                xhtml_debug_info = DebugInfo(
                    xhtml_path, old_xhtml_content, new_xhtml_content, old_xhtml_modified, new_xhtml_modified  # type: ignore
                )
            return text_id, old_xhtml, new_xhtml, old_smil, new_smil, xhtml_debug_info, smil_debug_info
        finally:
            xhtml_lock.unlock()
            smil_lock.unlock()


@receiver(models.signals.post_delete, sender=Book)
def delete_book_data(sender, instance: Book, **kwargs):
    data_path = instance.get_data_path()
    if data_path.exists():
        shutil.rmtree(data_path)
    if instance.cover.name:
        Path(instance.cover.path).unlink(missing_ok=True)


@receiver(models.signals.pre_delete, sender=User)
def delete_uploaded_books(sender, instance: User, **kwargs):
    uploaded_books = instance.book_set.filter(role__role="UL")
    data_path_parents: list[Path] = [book.get_data_path().parent for book in uploaded_books]
    uploaded_books.delete()
    if len(data_path_parents) > 0:
        shutil.rmtree(data_path_parents[0], ignore_errors=True)


class Role(models.Model):
    ROLE_CHOICES = {"UL": "Uploader", "ED": "Editor", "RD": "Reader"}

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    role = models.CharField(max_length=2, choices=ROLE_CHOICES)


class History(models.Model):
    TRIGGER_CHOICES: Final[dict[HistoryTrigger, str]] = {"I": "Init", "N": "Normal", "U": "Undo", "R": "Redo"}
    TYPE_CHOICES: Final[dict[HistoryType, str]] = {
        "C": "Create",
        "U": "Update",
        "D": "Delete",
        "M": "Merge",
        "S": "Split",
    }

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    item_id = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    trigger = models.CharField(max_length=1, choices=TRIGGER_CHOICES)
    type = models.CharField(max_length=1, choices=TYPE_CHOICES)
    old = models.JSONField(null=True)
    new = models.JSONField(null=True)
    old_xhtml = XhtmlField(null=True)
    new_xhtml = XhtmlField(null=True)
    old_smil = SmilField(null=True)
    new_smil = SmilField(null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["book", "item_id"])]

    def undo(self) -> tuple[PayloadOpType, HistoryType, ParData | MergePayload | SplitPayload]:
        assert (
            self.trigger == "N" or self.trigger == "R"
        ), f"Last operation is not undoable: {self.get_trigger_display()}"
        match cast(HistoryType, self.type):
            case "C":
                data = cast(ParData, self.old)
                return "DELETE", "C", data
            case "U":
                data = cast(ParData, self.old)
                return "UPDATE", "U", data
            case "D":
                data = cast(ParData, self.new)
                return "CREATE", "D", data
            case "M":
                seq_elem: Element = self.new_smil
                par_elems = seq_elem.findall("par", namespaces=SMIL_NAMESPACES)
                assert len(par_elems) == 1
                par_id: str = par_elems[0].get("id")
                text_elem = par_elems[0].find("text", namespaces=SMIL_NAMESPACES)
                _, text_id = text_elem.get("src").split("#", 1)
                xhtml_elem: Element = self.old_xhtml
                span_elem = xhtml_elem.find(".//span[@id='%s']/.." % text_id, namespaces=XHTML_NAMESPACES)
                _, _, counter = split_element(span_elem)
                data = cast(SplitPayload, {"parId": par_id, "index": counter})
                return "SPLIT", "M", data
            case "S":
                seq_elem: Element = self.new_smil
                par_elems = seq_elem.findall("par", namespaces=SMIL_NAMESPACES)
                assert len(par_elems) == 2
                par1_id: str = par_elems[0].get("id")
                par2_id: str = par_elems[1].get("id")
                data = cast(MergePayload, {"parId": par1_id, "otherParId": par2_id})
                return "MERGE", "S", data
            case other:
                raise ValueError(f"Invalid history type: '{other}'")

    def redo(self) -> tuple[PayloadOpType, HistoryType, BookContentPayload]:
        assert self.trigger == "U", f"Last operation is not redoable: {self.get_trigger_display()}"
        match self.type:
            case other:
                raise NotImplementedError()

    @classmethod
    def get_last_redoable(cls, book: Book, item_id: str) -> Union["History", None]:
        history = cls.objects.filter(book=book, item_id=item_id).order_by("-timestamp")
        redo_counter = 0
        for entry in history:
            match entry.trigger:
                case "N" | "I":
                    return None
                case "U":
                    if redo_counter == 0:
                        return entry
                    else:
                        redo_counter -= 1
                case "R":
                    redo_counter += 1
                case other:
                    raise ValueError(f"Unknown history trigger value: {other}")

    @classmethod
    def get_last_undoable(cls, book: Book, item_id: str) -> Union["History", None]:
        history = cls.objects.filter(book=book, item_id=item_id).order_by("-timestamp")
        undo_counter = 0
        for entry in history:
            match entry.trigger:
                case "N" | "R":
                    if undo_counter == 0:
                        return entry
                    else:
                        undo_counter -= 1
                case "U":
                    undo_counter += 1
                case "I":
                    return None
                case other:
                    raise ValueError(f"Unknown history trigger value: {other}")

    @classmethod
    def create_init_entry(cls, book: Book, item_id: str, user: User, type: HistoryType):
        """Only create init entry in History if there are no existing entries for the given item_id."""
        entries = cls.objects.filter(book=book, item_id=item_id).all()
        if len(entries) == 0:
            xhtml_path, smil_path = book.get_xhtml_paths(item_id)
            xhtml_root = XhtmlTree(file=xhtml_path).getroot()
            smil_content = None if smil_path is None else SmilTree(file=smil_path).getroot()
            History.objects.create(
                book=book,
                item_id=item_id,
                user=user,
                trigger="I",
                type=type,
                new_xhtml=xhtml_root,
                new_smil=smil_content,
            )


class Epubcheck(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    epubcheck = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)


class FileLock(models.Model):
    MAX_LOCK_TIME_S: Final = 10

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    path = models.CharField(max_length=100)
    locked = models.BooleanField(null=True)
    timestamp = models.DateTimeField(null=True)

    class Meta:
        unique_together = ("book", "path")

    def lock(self):
        """
        Lock the file for a maximum of 10 seconds. If the lock is already set, wait until it is released.
        A deadlock is still possible if the timestamp changes between checks, but this should only happen
        under very high load.
        """
        if self.locked:
            while (timezone.now() - self.timestamp).total_seconds() < self.MAX_LOCK_TIME_S:
                sleep(1)
                self.refresh_from_db()
        self.locked = True
        self.timestamp = timezone.now()
        self.save(update_fields=["locked", "timestamp"])

    def unlock(self):
        self.locked = False
        self.save(update_fields=["locked"])


def read_file_for_debug(path: Path) -> tuple[list[str], datetime]:
    modified = datetime.fromtimestamp(path.stat(follow_symlinks=False).st_mtime, tz.utc)
    with path.open("r", encoding="utf-8") as f:
        content = [line for line in f]
    return content, modified
