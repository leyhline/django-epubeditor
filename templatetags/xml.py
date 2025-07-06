from xml.etree.ElementTree import Element

import defusedxml.ElementTree as ET
from django import template
from django.urls import reverse

from epubeditor.models import Book
from epubeditor.xhtml import XhtmlTree, SmilTree, is_ruby_tag

register = template.Library()


@register.filter
def to_text(element: Element) -> str:
    results: list[tuple[str | None, str | None]] = []

    def _to_text_without_ruby(_elem: Element) -> None:
        results.append((_elem.get("id"), _elem.text))
        for child in _elem:
            if is_ruby_tag(child):
                continue
            _to_text_without_ruby(child)
            if child.tail is not None:
                results.append((None, child.tail))

    for child in element:
        _to_text_without_ruby(child)

    text_parts: list[tuple[str, list[str]]] = []
    last_id: str | None = None
    for part_id, part in results:
        if part_id is not None and part_id != last_id:
            last_id = part_id
            text_parts.append((last_id, []))
        if last_id is not None and part is not None:
            text_parts[-1][1].append(part)
    return "\n".join(f"{part_id}: {''.join(parts)}" for part_id, parts in text_parts)


@register.filter
def xhtml_tostring(element: Element) -> str:
    XhtmlTree.register_namespaces()
    return ET.tostring(element, encoding="unicode")


@register.filter
def smil_tostring(element: Element) -> str:
    SmilTree.register_namespaces()
    return ET.tostring(element, encoding="unicode")


@register.simple_tag(takes_context=True)
def xhtml_with_base_to_string(context, element: Element, item_id: str) -> str:
    namespaces = XhtmlTree.register_namespaces()
    stylesheet_links = element.findall(".//link[@rel='stylesheet']", namespaces=namespaces)
    if stylesheet_links:
        book: Book = context["object"]
        xhtml_path, _, _ = book.get_xml_hrefs(item_id)
        url = reverse("resource_data", args=(context["username"], context["basename"], xhtml_path))
        url = url.rpartition("/")[0]
        for stylesheet_link in stylesheet_links:
            original_url = stylesheet_link.get("href")
            if original_url is not None:
                stylesheet_link.set("href", f"{url}/{original_url}")
    XhtmlTree.register_namespaces()
    return ET.tostring(element, encoding="unicode")
