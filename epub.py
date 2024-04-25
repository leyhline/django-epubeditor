from collections.abc import Iterator, Container
from pathlib import Path
from xml.etree import ElementTree as ET
from xml.etree.ElementTree import ElementTree

"""https://www.w3.org/TR/epub-33/#sec-core-media-types"""
CORE_MEDIA_TYPES = frozenset(
    [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/webp",
        "audio/mpeg",
        "audio/mp4",
        "audio/ogg; codecs=opus",
        "text/css",
        "font/ttf",
        "application/font-sfnt",
        "font/otf",
        "application/vnd.ms-opentype",
        "font/woff",
        "application/font-woff",
        "font/woff2",
        "application/xhtml+xml",
        "application/smil+xml",
    ]
)


def scan_manifest_for_property(tree: ElementTree, prop: str) -> ET.Element:
    manifest = tree.find("{http://www.idpf.org/2007/opf}manifest")
    if not manifest:
        raise KeyError(f"no 'manifest' element in '{tree}'")
    for item in manifest:
        properties = item.get("properties")
        if not properties:
            continue
        if prop not in properties.split(" "):
            continue
        return item
    raise KeyError(f"'no item with property '{prop}' in '{manifest}'")


def iterate_manifest_items(tree: ElementTree, allowed_media_types: Container[str] = None) -> Iterator[ET.Element]:
    manifest = tree.find("{http://www.idpf.org/2007/opf}manifest")
    if not manifest:
        raise KeyError(f"no 'manifest' element in '{tree}'")
    for item in manifest:
        if allowed_media_types is not None and item.get("media-type") not in allowed_media_types:
            continue
        yield item


def iterate_metadata_items(tree: ElementTree) -> Iterator[ET.Element]:
    metadata = tree.find("{http://www.idpf.org/2007/opf}metadata")
    if not metadata:
        raise KeyError(f"no 'metadata' element in '{tree}'")
    for item in metadata:
        yield item


def get_path_from_href(item: ET.Element, rootfile_path: Path) -> Path:
    href = item.get("href")
    if not href:
        raise KeyError(f"no 'href' attribute in '{item}'")
    path = rootfile_path.parent.joinpath(href)
    if not path.exists():
        raise FileNotFoundError(f"file '{path}' not found")
    return path


def get_cover_image_path(tree: ElementTree, rootfile_path: Path) -> Path:
    """Raises KeyError if no element with the cover-image property is found."""
    item = scan_manifest_for_property(tree, "cover-image")
    image_path = get_path_from_href(item, rootfile_path)
    return image_path


def get_toc_path(tree: ElementTree, rootfile_path: Path) -> Path:
    item = scan_manifest_for_property(tree, "nav")
    toc_path = get_path_from_href(item, rootfile_path)
    return toc_path
