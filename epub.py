import math
import re
from collections.abc import Iterator, Container
from copy import deepcopy
from itertools import pairwise
from pathlib import Path
from typing import NamedTuple, TypedDict
from xml.etree.ElementTree import Element, SubElement

from epubeditor.xhtml import SmilTree, OpfTree, XhtmlTree, deepcopy_parent_element

Timing = tuple[float, float]


class SpanData(TypedDict):
    chars: list[str]
    timing: Timing | None


class ParData(TypedDict):
    parId: str
    textSrc: str
    audioSrc: str
    clipBegin: str
    clipEnd: str


RE_PAR_ID_PART = re.compile(r"""(?P<alpha>[A-Za-z]*)(?P<num>[0-9]+)""")
RE_CLOCK = re.compile(r"""^(?:(?P<hours>\d+):)??(?:(?P<minutes>\d+):)??(?P<seconds>\d+)(?P<fraction>\.\d+)?$""")


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
COMPRESSABLE_CORE_MEDIA_TYPES = frozenset(
    [
        "image/svg+xml",
        "text/css",
        "application/xhtml+xml",
        "application/smil+xml",
        "font/ttf",
        "application/font-sfnt",
        "font/otf",
        "application/vnd.ms-opentype",
    ]
)


class ResourceListingItem(NamedTuple):
    href: str
    attributes: dict[str, str]


class TocListingItem(NamedTuple):
    id: str
    text: str
    media_overlay_id: str | None
    media_overlay_path: str | None


def build_new_id(prev_id: str, next_id: str | None) -> str:
    parts = prev_id.split("-")
    parts_matches = [RE_PAR_ID_PART.match(part) for part in parts]
    next_parts = None if next_id is None else next_id.split("-")
    if next_parts is None or len(next_parts) < len(parts):
        last_part_match = parts_matches[-1]
        last_part = last_part_match.group("alpha") + str(int(last_part_match.group("num")) + 1)
        joined_parts = "-".join(parts[:-1])
        if joined_parts:
            return joined_parts + "-" + last_part
        else:
            return last_part
    else:
        last_part_index = len(parts_matches) - 1
        last_part_match = parts_matches[last_part_index]
        last_part_num = int(last_part_match.group("num"))
        next_parts_matches = [RE_PAR_ID_PART.match(part) for part in next_parts]
        next_part_match = next_parts_matches[last_part_index]
        next_part_num = int(next_part_match.group("num"))
        if next_part_num - last_part_num > 1:
            last_part = last_part_match.group("alpha") + str(last_part_num + 1)
            joined_parts = "-".join(parts[:-1])
            if joined_parts:
                return joined_parts + "-" + last_part
            else:
                return last_part
        else:
            return "-".join(parts) + "-1"


def clock_value_to_seconds(value: str) -> float:
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


def seconds_to_clock_value(sec: float) -> str:
    hours = str(int(sec // 3600)).zfill(2)
    minutes = str(int((sec % 3600) // 60)).zfill(2)
    seconds = str(int(sec % 60)).zfill(2)
    fraction = f"{sec % 1:.3f}"[1:]
    return f"{hours}:{minutes}:{seconds}{fraction}"


def extract_par_data(par: Element, namespaces) -> ParData:
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


def scan_manifest_for_property(tree: OpfTree, prop: str) -> Element:
    namespaces = tree.register_namespaces()
    manifest = tree.find("manifest", namespaces=namespaces)
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


def iterate_manifest_items(tree: OpfTree, allowed_media_types: Container[str] = None) -> Iterator[Element]:
    namespaces = tree.register_namespaces()
    manifest = tree.find("manifest", namespaces=namespaces)
    if not manifest:
        raise KeyError(f"no 'manifest' element in '{tree}'")
    for item in manifest:
        if allowed_media_types is not None and item.get("media-type") not in allowed_media_types:
            continue
        yield item


def add_manifest_item(tree: OpfTree, tag: str, attrib: dict[str, str]) -> None:
    namespaces = tree.register_namespaces()
    root = tree.getroot()
    manifest = root.find("manifest", namespaces=namespaces)
    if not manifest:
        raise KeyError(f"no 'manifest' element in '{root}'")
    last_manifest_child: Element | None = None
    if len(manifest) > 0:
        last_manifest_child = manifest[-1]
    new_manifest_child = SubElement(manifest, tag, attrib)
    if last_manifest_child is None:
        new_manifest_child.tail = manifest.text
    else:
        new_manifest_child.tail = last_manifest_child.tail
        last_manifest_child.tail = manifest.text


def iterate_metadata_items(tree: OpfTree) -> Iterator[Element]:
    namespaces = tree.register_namespaces()
    metadata = tree.find("metadata", namespaces=namespaces)
    if not metadata:
        raise KeyError(f"no 'metadata' element in '{tree}'")
    for item in metadata:
        yield item


def get_path_from_href(item: Element, rootfile_path: Path) -> Path:
    href = item.get("href")
    if not href:
        raise KeyError(f"no 'href' attribute in '{item}'")
    path = rootfile_path.parent.joinpath(href)
    if not path.exists():
        raise FileNotFoundError(f"file '{path}' not found")
    return path


def get_cover_image_path(tree: OpfTree, rootfile_path: Path) -> Path:
    """Raises KeyError if no element with the cover-image property is found."""
    item = scan_manifest_for_property(tree, "cover-image")
    image_path = get_path_from_href(item, rootfile_path)
    return image_path


def get_toc_path(tree: OpfTree, rootfile_path: Path) -> Path:
    item = scan_manifest_for_property(tree, "nav")
    toc_path = get_path_from_href(item, rootfile_path)
    return toc_path


def read_resource_listing(tree: OpfTree) -> list[ResourceListingItem]:
    listing = [
        ResourceListingItem(item.get("href"), item.attrib) for item in iterate_manifest_items(tree, CORE_MEDIA_TYPES)
    ]
    return listing


def read_toc(rootfile_tree: OpfTree, toc_tree: XhtmlTree, toc_src: str) -> list[TocListingItem]:
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
    namespaces = toc_tree.register_namespaces()
    anchors = toc_tree.findall(".//nav[@epub:type='toc']/.//a", namespaces)
    listing: list[TocListingItem] = []
    for anchor in anchors:
        href = anchor.get("href")
        if toc_src:
            href = f"{toc_src}/{href}"
        if href in href_id_dict:
            item_id, media_overlay_id = href_id_dict[href]
            listing.append(TocListingItem(item_id, anchor.text, media_overlay_id, id_href_dict.get(media_overlay_id)))
    return listing


def read_item_href(tree: OpfTree, item_id: str) -> str:
    for item in iterate_manifest_items(tree):
        if item.get("id") == item_id:
            href = item.get("href")
            assert href, f"missing href: {item}"
            return href


def read_xml_hrefs(tree: OpfTree, item_id: str) -> tuple[str, str | None, str | None]:
    id_item_dict = {
        item.get("id"): item for item in iterate_manifest_items(tree, ("application/xhtml+xml", "application/smil+xml"))
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


def build_smil_par(data: SpanData, text_src: str, audio_src: str, index: int) -> Element:
    par = Element("par", {"id": f"p{index}"})
    SubElement(par, "text", {"src": f"{text_src}#s{index}"})
    timing = data["timing"]
    if timing is not None:
        begin, end = timing
        SubElement(par, "audio", {"src": audio_src, "clipBegin": f"{begin:.3f}", "clipEnd": f"{end:.3f}"})
    return par


def merge_smil(tree: SmilTree, par_id: str, other_par_id: str) -> tuple[str, str, str, Element, Element]:
    namespaces = tree.register_namespaces()
    parent = tree.find(".//par[@id='%s']/.." % par_id, namespaces=namespaces)
    for first, second in pairwise(parent):
        first_id = first.get("id")
        second_id = second.get("id")
        if (first_id == par_id and second_id == other_par_id) or (first_id == other_par_id and second_id == par_id):
            first_audio = first.find("audio", namespaces=namespaces)
            second_audio = second.find("audio", namespaces=namespaces)
            assert first_audio.get("src") and first_audio.get("src") == second_audio.get("src")
            old_parent = deepcopy_parent_element(parent, False, (first_id, second_id))
            first_audio.set("clipEnd", second_audio.get("clipEnd"))
            parent.remove(second)
            first_text = first.find("text", namespaces=namespaces)
            second_text = second.find("text", namespaces=namespaces)
            first_text_src, first_text_id = first_text.get("src").split("#")
            second_text_src, second_text_id = second_text.get("src").split("#")
            assert first_text_src == second_text_src
            new_parent = deepcopy_parent_element(parent, False, (first_id,))
            return first_text_src, first_text_id, second_text_id, old_parent, new_parent
    raise ValueError(f"Merging media overlay not possible; elements '{par_id}' and '{other_par_id}' are not direct siblings")  # fmt: skip


def merge_xhtml(tree: XhtmlTree, text_id: str, other_text_id: str) -> tuple[Element, Element]:
    namespaces = tree.register_namespaces()
    parent = tree.find(".//span[@id='%s']/.." % text_id, namespaces=namespaces)
    for first, second in pairwise(parent):
        first_id = first.get("id")
        second_id = second.get("id")
        if (first_id == text_id and second_id == other_text_id) or (first_id == other_text_id and second_id == text_id):
            assert not first.tail, f"No text between elements to merge allowed, but got: {first.tail}"
            old_parent = deepcopy_parent_element(parent, True, (first_id, second_id))
            if second.text is not None:
                if len(first) > 0:
                    if first[-1].tail is None:
                        first[-1].tail = second.text
                    else:
                        first[-1].tail += second.text
                else:
                    first.text += second.text
            for child in second:
                first.append(child)
            first.tail = second.tail
            parent.remove(second)
            new_parent = deepcopy_parent_element(parent, True, (first_id,))
            return old_parent, new_parent
    raise ValueError(f"Merging media overlay not possible; elements '{text_id}' and '{other_text_id}' are not direct siblings")  # fmt: skip


def get_text_href_from_smil(tree: SmilTree, par_id: str) -> tuple[str, str]:
    namespaces = tree.register_namespaces()
    par_elem = tree.find(".//par[@id='%s']" % par_id, namespaces=namespaces)
    text_elem = par_elem.find("text", namespaces=namespaces)
    href, fragment = text_elem.get("src").split("#")
    return href, fragment


def extract_text_from_elem_list(elem_list: list[Element | str]) -> str:
    skip_tags = {"{http://www.w3.org/1999/xhtml}rp", "{http://www.w3.org/1999/xhtml}rt"}
    text_parts: list[str] = []

    def extract_text(elem: Element):
        if elem.text is not None:
            text_parts.append(elem.text.strip())
        for elem_child in elem:
            if elem_child.tag in skip_tags:
                continue
            if elem_child.text:
                text_parts.append(elem_child.text.strip())
            extract_text(elem_child)
            if elem_child.tail:
                text_parts.append(elem_child.tail.strip())

    for x in elem_list:
        if isinstance(x, Element):
            extract_text(x)
        else:
            text_parts.append(x)
    return "".join(text_parts)


def append_from_elem_list(elem: Element, elem_list: list[Element | str]) -> None:
    before_sub_elem: Element | None = None
    for x in elem_list:
        if isinstance(x, Element):
            elem.append(x)
            before_sub_elem = x
        elif before_sub_elem is None:
            if elem.text is None:
                elem.text = ""
            elem.text += x
        else:
            if before_sub_elem.tail is None:
                before_sub_elem.tail = ""
            before_sub_elem.tail += x


def split_element(elem: Element, split_index: int = math.inf) -> tuple[list[str | Element], list[str | Element], int]:
    before: list[str | Element] = []
    after: list[str | Element] = []
    counter = 0
    if elem.text is not None:
        for char in elem.text:
            if counter <= split_index:
                before.append(char)
            else:
                after.append(char)
            counter += 1
    for sub_elem in elem:
        if counter <= split_index:
            before.append(deepcopy(sub_elem))
            before[-1].tail = None
        else:
            after.append(deepcopy(sub_elem))
            after[-1].tail = None
        counter += 1
        if sub_elem.tail is not None:
            for char in sub_elem.tail:
                if counter <= split_index:
                    before.append(char)
                else:
                    after.append(char)
                counter += 1
    return before, after, counter


def split_xhtml(tree: XhtmlTree, text_id: str, split_index: int) -> tuple[str, str, str, Element, Element]:
    namespaces = tree.register_namespaces()
    parent = tree.find(".//span[@id='%s']/.." % text_id, namespaces=namespaces)
    child_elem: Element | None = None
    child_index = 0
    for i, child in enumerate(parent):
        if child.get("id") == text_id:
            child_elem = child
            child_index = i
            break
    assert child_elem is not None
    child_id = child_elem.get("id")
    old_parent = deepcopy_parent_element(parent, True, (child_id,))
    before, after, _ = split_element(child_elem, split_index)

    before_text = extract_text_from_elem_list(before)
    after_text = extract_text_from_elem_list(after)

    next_elem_id: str | None = None
    do_take_next_id = False
    for elem in tree.iter():
        elem_id = elem.get("id")
        if elem_id is None:
            continue
        if do_take_next_id:
            next_elem_id = elem_id
            break
        if elem_id == child_id:
            do_take_next_id = True

    new_elem1 = Element("span", child_elem.attrib)
    new_elem2 = Element("span", child_elem.attrib)
    new_text_id = build_new_id(child_id, next_elem_id)
    new_elem2.set("id", new_text_id)

    append_from_elem_list(new_elem1, before)
    append_from_elem_list(new_elem2, after)

    parent.remove(child_elem)
    parent.insert(child_index, new_elem2)
    parent.insert(child_index, new_elem1)

    new_parent = deepcopy_parent_element(parent, True, (child_id, new_text_id))

    return new_text_id, before_text, after_text, old_parent, new_parent


def split_smil(
    tree: SmilTree, par_id: str, new_text_src: str, text1_length: int, text2_length: int
) -> tuple[Element, Element]:
    namespaces = tree.register_namespaces()
    parent = tree.find(".//par[@id='%s']/.." % par_id, namespaces=namespaces)
    child_elem: Element | None = None
    child_index = 0
    for i, child in enumerate(parent):
        if child.get("id") == par_id:
            child_elem = child
            child_index = i
            break
    assert child_elem is not None
    audio = child_elem.find("audio", namespaces=namespaces)
    begin = clock_value_to_seconds(audio.get("clipBegin"))
    end = clock_value_to_seconds(audio.get("clipEnd"))
    diff_s = (end - begin) / (text1_length + text2_length) * text1_length
    child_id = child_elem.get("id")
    old_parent = deepcopy_parent_element(parent, False, (child_id,))
    next_elem_id: str | None = None
    do_take_next_id = False
    for elem in tree.iter("{" + namespaces[""] + "}" + "par"):
        elem_id = elem.get("id")
        if elem_id is None:
            continue
        if do_take_next_id:
            next_elem_id = elem.get("id")
            break
        if elem_id == child_id:
            do_take_next_id = True

    split_time = seconds_to_clock_value(begin + diff_s)
    new_par_id = build_new_id(child_id, next_elem_id)
    new_par_elem = Element("par", {"id": new_par_id})
    new_text = SubElement(new_par_elem, "text", {"src": new_text_src})
    new_audio = SubElement(
        new_par_elem, "audio", {"src": audio.get("src"), "clipBegin": split_time, "clipEnd": audio.get("clipEnd")}
    )
    new_par_elem.text = child_elem.text
    new_par_elem.tail = child_elem.tail
    new_text.tail = child_elem.find("text", namespaces=namespaces).tail
    new_audio.tail = child_elem.find("audio", namespaces=namespaces).tail
    parent.insert(child_index + 1, new_par_elem)
    audio.set("clipEnd", split_time)
    new_parent = deepcopy_parent_element(parent, False, (child_id, new_par_id))
    return old_parent, new_parent


def create_smil(tree: SmilTree, new: ParData) -> str:
    new_clip_begin = clock_value_to_seconds(new["clipBegin"])
    namespaces = tree.register_namespaces()
    par_parents = tree.findall(".//par/..", namespaces=namespaces)
    assert len(par_parents) > 0, "no par elements found in smil file"
    pars_dict: dict[Element, list[ParData]] = {
        parent: [extract_par_data(par, namespaces) for par in parent.findall("./par", namespaces)]
        for parent in par_parents
    }
    audio_src_counter: dict[Element, int] = {parent: 0 for parent in pars_dict.keys()}
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
    elif clock_value_to_seconds(par_list[0]["clipBegin"]) > new_clip_begin:
        raise NotImplementedError("Inserting before the first par is currently not supported")
    else:
        par_index = 1
        for par_index, par in enumerate(par_list[1:], 1):
            if clock_value_to_seconds(par["clipBegin"]) > new_clip_begin:
                break
        prev_par_id = par_list[par_index - 1]["parId"]
        next_par_id = par_list[par_index + 1]["parId"] if par_index < len(par_list) - 1 else None
        new_par_id = build_new_id(prev_par_id, next_par_id)
        par = Element("par", {"id": new_par_id})
        text = Element("text", {"src": new["textSrc"]})
        par.append(text)
        audio = Element("audio", {"src": new["audioSrc"], "clipBegin": new["clipBegin"], "clipEnd": new["clipEnd"]})
        par.append(audio)
        parent.insert(par_index, par)
    return new_par_id
