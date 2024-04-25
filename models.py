import os
import re
import shutil
from pathlib import Path
from time import sleep
from typing import NamedTuple, Literal, TypedDict, Final
from xml.etree import ElementTree as ET
from zipfile import ZipFile, ZIP_DEFLATED

from PIL import Image
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.db import models
from django.dispatch import receiver
from django.utils import timezone

from epubeditor.epub import (
    get_cover_image_path,
    get_toc_path,
    iterate_manifest_items,
    CORE_MEDIA_TYPES,
    iterate_metadata_items,
)

RoleKey = Literal["UL", "ED", "RD"]

RE_CLOCK = re.compile(r"""^(?:(?P<hours>\d+):)??(?:(?P<minutes>\d+):)??(?P<seconds>\d+)(?P<fraction>\.\d+)?$""")
SMIL_NAMESPACES = {
    "": "http://www.w3.org/ns/SMIL",
    "epub": "http://www.idpf.org/2007/ops",
}
XHTML_NAMESPACES = {
    "": "http://www.w3.org/1999/xhtml",
    "epub": "http://www.idpf.org/2007/ops",
}


class TocListingItem(NamedTuple):
    id: str
    text: str
    media_overlay_id: str | None
    media_overlay_path: str | None


class ResourceListingItem(NamedTuple):
    href: str
    attributes: dict[str, str]


class ParData(TypedDict):
    parId: str
    textSrc: str
    audioSrc: str
    clipBegin: str
    clipEnd: str


def clock_value_to_seconds(value: str) -> float:
    # TODO this doesn't look quite right
    match = RE_CLOCK.match(value)
    assert match, f"Invalid clock value '{value}'"
    hours = match.group("hours")
    minutes = match.group("minutes")
    seconds = match.group("seconds")
    fraction = match.group("fraction")
    if fraction:
        fraction = float(fraction)
    else:
        fraction = 0
    if hours:
        hours = int(hours)
    else:
        hours = 0
    if minutes:
        minutes = int(minutes)
    else:
        minutes = 0
    seconds = int(seconds)
    return hours * 3600 + minutes * 60 + seconds + fraction


def extract_par_data(par: ET.Element, namespaces) -> ParData:
    text = par.find("text", namespaces=namespaces)
    audio = par.find("audio", namespaces=namespaces)
    par_id: str = par.get("id")
    assert par_id, "missing id attribute for par element"
    text_src: str = text.get("src")
    assert text_src, "missing src attribute for text element under id='{par_id}'"
    audio_src: str = audio.get("src")
    assert audio_src, "missing src attribute for audio element under id='{par_id}'"
    clip_begin: str = audio.get("clipBegin")
    assert clip_begin, "missing clipBegin attribute for audio element under id='{par_id}'"
    if not RE_CLOCK.match(clip_begin):
        raise ValueError(f"Invalid clipBegin value '{clip_begin}' for audio element under id='{par_id}'")
    clip_end: str = audio.get("clipEnd")
    assert clip_end, "missing clipEnd attribute for audio element under id='{par_id}'"
    if not RE_CLOCK.match(clip_end):
        raise ValueError(f"Invalid clipEnd value '{clip_end}' for audio element under id='{par_id}'")
    return {
        "parId": par_id,
        "textSrc": text_src,
        "audioSrc": audio_src,
        "clipBegin": clip_begin,
        "clipEnd": clip_end,
    }


def build_new_par_id(prev_par_id: str) -> str:
    last_char = prev_par_id[-1]
    if last_char.islower() and last_char.isascii() and last_char != "z":
        return prev_par_id[:-1] + chr(ord(last_char) + 1)
    else:
        return prev_par_id + "a"


def register_namespaces(namespaces: dict[str, str]) -> dict[str, str]:
    for prefix, uri in namespaces.items():
        ET.register_namespace(prefix, uri)
    return namespaces


def epub_path(instance, filename):
    return os.path.join(instance.uploader, f"{instance.basename}.epub")


def cover_path(instance, filename):
    return os.path.join(instance.uploader, f"{instance.basename}.jpg")


class Book(models.Model):
    uploader = models.CharField(max_length=50)
    basename = models.SlugField(default="", allow_unicode=True)
    rootfile_path = models.CharField(max_length=100)
    identifier = models.CharField(max_length=100, help_text="Analogous to dc:identifier in the OPF file")
    title = models.CharField(max_length=100, help_text="Analogous to dc:title in the OPF file")
    language = models.CharField(max_length=100, help_text="Analogous to dc:language in the OPF file")
    epub = models.FileField(upload_to=epub_path)
    cover = models.ImageField(upload_to=cover_path, blank=True)
    is_public = models.BooleanField(default=False)
    epubcheck = models.JSONField()
    users = models.ManyToManyField(User, through="Role")

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

    def update_after_upload(self, user, basename, check_result):
        """
        Call after successful upload. Saves the book and adds the user as uploader.
        Afterward, call form.save_m2m() to save the many-to-many user relation.
        """
        self.uploader = user.username
        self.basename = basename
        self.identifier = check_result["publication"]["identifier"]
        self.title = check_result["publication"]["title"]
        self.language = check_result["publication"]["language"]
        self.epubcheck = check_result
        self.save()
        self.users.add(user, through_defaults={"role": "UL"})

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
        tree = ET.parse(container_path)
        rootfiles = tree.find("{urn:oasis:names:tc:opendocument:xmlns:container}rootfiles")
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

    def unzip(self):
        path = self.get_data_path()
        path.mkdir(exist_ok=True)
        with ZipFile(self.epub.file, "r") as zip_ref:
            zip_ref.extractall(path)

    def compress_to_epub(self, folder: str) -> str:
        data_path = self.get_data_path()
        zip_path = os.path.join(folder, f"{self.basename}.epub")
        with ZipFile(zip_path, "w", ZIP_DEFLATED, False) as fd:
            for root, _, files in data_path.walk():
                for file in files:
                    path = root.joinpath(file)
                    fd.write(path, path.relative_to(data_path))
        return zip_path

    def set_cover(self) -> None:
        """searches for property 'cover-image' in package.opf; call after unzip"""
        rootfile_path = self.get_rootfile_path()
        rootfile_tree = ET.parse(rootfile_path)
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
        rootfile_tree = ET.parse(rootfile_path)
        href_id_dict: dict[str, tuple[str, str | None]] = {
            item.get("href"): (item.get("id"), item.get("media-overlay"))
            for item in iterate_manifest_items(rootfile_tree, ("application/xhtml+xml",))
            if item.get("id") and item.get("href")
        }
        id_href_dict: dict[str, str] = {
            item.get("id"): item.get("href")
            for item in iterate_manifest_items(rootfile_tree, ("application/smil+xml",))
            if item.get("id") and item.get("href")
        }
        toc_path = get_toc_path(rootfile_tree, rootfile_path)
        base = toc_path.parent.relative_to(rootfile_path.parent).as_posix()
        if base.startswith("."):
            base = base[1:]
        tree = ET.parse(toc_path)
        namespaces = register_namespaces(XHTML_NAMESPACES)
        anchors = tree.findall(".//nav[@epub:type='toc']/.//a", namespaces)
        listing: list[TocListingItem] = []
        for anchor in anchors:
            href = anchor.get("href")
            if base:
                href = f"{base}/{href}"
            if href in href_id_dict:
                item_id, media_overlay_id = href_id_dict[href]
                listing.append(
                    TocListingItem(item_id, anchor.text, media_overlay_id, id_href_dict.get(media_overlay_id))
                )
        return listing

    def get_xml_hrefs(self, item_id) -> tuple[str, str | None, str | None]:
        rootfile_path = self.get_rootfile_path()
        tree = ET.parse(rootfile_path)
        id_item_dict = {
            item.get("id"): item
            for item in iterate_manifest_items(tree, ("application/xhtml+xml", "application/smil+xml"))
        }
        xhtml_item = id_item_dict[item_id]
        assert xhtml_item.get("media-type") == "application/xhtml+xml", f"incorrect media-type: {xhtml_item}"
        xhtml_href = xhtml_item.get("href")
        assert xhtml_href, f"missing href: {xhtml_item}"
        smil_href: str | None = None
        smil_id = xhtml_item.get("media-overlay")
        if smil_id:
            smil_item = id_item_dict[smil_id]
            smil_href = smil_item.get("href")
            assert smil_href
        active_class_name: str | None = None
        for meta_item in iterate_metadata_items(tree):
            tag = meta_item.tag
            if tag != "{http://www.idpf.org/2007/opf}meta":
                continue
            prop = meta_item.get("property")
            if prop != "media:active-class":
                continue
            active_class_name = meta_item.text
        return xhtml_href, smil_href, active_class_name

    def get_resource_listing(self) -> list[ResourceListingItem]:
        rootfile_path = self.get_rootfile_path()
        tree = ET.parse(rootfile_path)
        listing = [
            ResourceListingItem(item.get("href"), item.attrib)
            for item in iterate_manifest_items(tree, CORE_MEDIA_TYPES)
        ]
        return listing

    def get_media_type(self, href) -> str | None:
        rootfile_path = self.get_rootfile_path()
        tree = ET.parse(rootfile_path)
        for item in iterate_manifest_items(tree, CORE_MEDIA_TYPES):
            if item.get("href") == href:
                return item.get("media-type")
        return None

    def get_smil_path(self, item_id: str) -> Path:
        _, href, _ = self.get_xml_hrefs(item_id)
        rootfile_path = self.get_rootfile_path()
        smil_path = rootfile_path.parent.joinpath(href)
        self.assert_data_path(smil_path)
        return smil_path

    def lock(self, path: Path):
        """Locks a file inside the EPUB directory. The lock is released after 10 seconds."""
        relative_path = path.relative_to(self.get_data_path()).as_posix()
        assert len(relative_path) > 0, "lock not possible: path to file should not be empty"
        lock, _ = FileLock.objects.get_or_create(book=self, path=relative_path)
        lock.lock()
        return lock

    def modify_smil(self, item_id: str, new: ParData) -> tuple[ParData, ParData]:
        smil_path = self.get_smil_path(item_id)
        lock = self.lock(smil_path)
        try:
            namespaces = register_namespaces(SMIL_NAMESPACES)
            tree = ET.parse(smil_path)
            par = tree.find(".//par[@id='%s']" % new["parId"], namespaces=namespaces)
            old = extract_par_data(par)
            audio = par.find("audio", namespaces=namespaces)
            audio.set("clipBegin", new["clipBegin"])
            audio.set("clipEnd", new["clipEnd"])
            tree.write(smil_path)
        finally:
            lock.unlock()
        return old, new

    def delete_from_smil(self, item_id: str, old: ParData) -> ParData:
        smil_path = self.get_smil_path(item_id)
        lock = self.lock(smil_path)
        try:
            namespaces = register_namespaces(SMIL_NAMESPACES)
            tree = ET.parse(smil_path)
            par_parent = tree.find(".//par[@id='%s']/.." % old["parId"], namespaces=namespaces)
            par = par_parent.find("./par[@id='%s']" % old["parId"], namespaces=namespaces)
            par_parent.remove(par)
            tree.write(smil_path)
        finally:
            lock.unlock()
        return old

    def add_to_smil(self, item_id: str, new: ParData) -> ParData:
        smil_path = self.get_smil_path(item_id)
        new_clip_begin = clock_value_to_seconds(new["clipBegin"])
        lock = self.lock(smil_path)
        try:
            namespaces = register_namespaces(SMIL_NAMESPACES)
            tree = ET.parse(smil_path)
            par_parents = tree.findall(".//par/..", namespaces=namespaces)
            assert len(par_parents) > 0, "no par elements found in smil file"
            pars_dict: dict[ET.Element, list[ParData]] = {
                parent: [extract_par_data(par, namespaces) for par in parent.findall("./par", namespaces)]
                for parent in par_parents
            }
            audio_src_counter: dict[ET.Element, int] = {parent: 0 for parent in pars_dict.keys()}
            for parent, par_list in pars_dict.items():
                for par in par_list:
                    if new["audioSrc"] == par["audioSrc"]:
                        audio_src_counter[parent] += 1
            counter_list = list(audio_src_counter.items())
            counter_list.sort(key=lambda x: x[1], reverse=True)
            parent, count = counter_list[0]
            if count == 0:
                parent = par_parents[0]
            par_list = pars_dict[parent]
            if len(par_list) == 0:
                raise NotImplementedError("Inserting before the first par is currently not supported")
            elif len(par_list) > 0 and clock_value_to_seconds(par_list[0]["clipBegin"]) > new_clip_begin:
                raise NotImplementedError("Inserting before the first par is currently not supported")
            else:
                par_index = 1
                for par_index, par in enumerate(par_list[1:], 1):
                    if clock_value_to_seconds(par["clipBegin"]) > new_clip_begin:
                        break
                prev_par = par_list[par_index - 1]
                new["parId"] = build_new_par_id(prev_par["parId"])
                par = ET.Element("par", {"id": new["parId"]})
                text = ET.Element("text", {"src": new["textSrc"]})
                par.append(text)
                audio = ET.Element(
                    "audio", {"src": new["audioSrc"], "clipBegin": new["clipBegin"], "clipEnd": new["clipEnd"]}
                )
                par.append(audio)
                parent.insert(par_index, par)
            tree.write(smil_path)
        finally:
            lock.unlock()
        return new


@receiver(models.signals.post_delete, sender=Book)
def delete_book_data(sender, instance: Book, **kwargs):
    data_path = instance.get_data_path()
    if data_path.exists():
        shutil.rmtree(data_path)
    if instance.epub.name:
        Path(instance.epub.path).unlink(missing_ok=True)
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
    TRIGGER_CHOICES = {"N": "Normal", "U": "Undo", "R": "Redo"}
    TYPE_CHOICES = {"C": "Create", "U": "Update", "D": "Delete"}

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    trigger = models.CharField(max_length=1, choices=TRIGGER_CHOICES)
    type = models.CharField(max_length=1, choices=TYPE_CHOICES)
    old = models.JSONField(null=True)
    new = models.JSONField(null=True)
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
