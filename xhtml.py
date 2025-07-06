import re
from abc import ABC, abstractmethod, ABCMeta
from collections.abc import Container
from copy import deepcopy
from dataclasses import dataclass
from io import StringIO
from os import PathLike
from typing import Final
from xml.etree.ElementTree import Element, ElementTree, register_namespace, TreeBuilder

from defusedxml.ElementTree import DefusedXMLParser

RE_WHITESPACE = re.compile(r"\s+")

# https://www.w3.org/TR/epub-33/#sec-xhtml-deviations-discouraged
DISCOURAGED_TAGS: Final = frozenset({"base", "rp", "embed"})
# https://developer.mozilla.org/en-US/docs/Web/HTML/Element
CONTENT_SECTIONING_TAGS: Final = frozenset({"address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4", "h5", "h6", "hgroup", "main", "nav", "section", "search"})  # fmt: skip
TEXT_CONTENT_TAGS: Final = frozenset({"blockquote", "dd", "div", "dl", "dt", "figcaption", "figure", "hr", "li", "menu", "ol", "p", "pre", "ul"})  # fmt: skip
INLINE_TEXT_SEMANTICS_TAGS: Final = frozenset({"a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn", "em", "i", "kbd", "mark", "q", "rp", "rt", "ruby", "s", "samp", "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr"})  # fmt: skip
MULTIMEDIA_TAGS: Final = frozenset({"area", "audio", "img", "map", "track", "video"})  # fmt: skip
EMBEDDED_CONTENT_TAGS: Final = frozenset({"embed", "fencedframe", "iframe", "object", "picture", "portal", "source"})  # fmt: skip
SCRIPTING_TAGS: Final = frozenset({"canvas", "noscript", "script"})  # fmt: skip
DEMARCATING_EDITS_TAGS: Final = frozenset({"del", "ins"})  # fmt: skip
TABLE_CONTENT_TAGS: Final = frozenset({"caption", "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"})  # fmt: skip
FORMS_TAGS: Final = frozenset({"button", "datalist", "fieldset", "form", "input", "label", "legend", "meter", "optgroup", "option", "output", "progress", "select", "textarea"})  # fmt: skip
INTERACTIVE_TAGS: Final = frozenset({"details", "dialog", "summary"})  # fmt: skip
DEPRECATED_TAGS: Final = frozenset({"acronym", "big", "center", "content", "dir", "font", "frame", "frameset", "image", "marquee", "menuitem", "nobr", "noembed", "noframes", "param", "plaintext", "rb", "rtc", "shadow", "strike", "tt", "xmp"})  # fmt: skip

# These tags indicate a new paragraph as far as I know; it's from experimenting, not from external documentation.
PARAGRAPH_TAGS: Final = frozenset({"h1", "h2", "h3", "h4", "h5", "h6", "p"})

XHTML_NAMESPACES: Final = {"": "http://www.w3.org/1999/xhtml", "epub": "http://www.idpf.org/2007/ops"}
SMIL_NAMESPACES: Final = {"": "http://www.w3.org/ns/SMIL", "epub": "http://www.idpf.org/2007/ops"}
OPF_NAMESPACES: Final = {"": "http://www.idpf.org/2007/opf", "dc": "http://purl.org/dc/elements/1.1/"}
CONTAINER_NAMESPACES: Final = {"": "urn:oasis:names:tc:opendocument:xmlns:container"}


def register_namespaces(namespaces: dict[str, str]) -> dict[str, str]:
    for prefix, uri in namespaces.items():
        register_namespace(prefix, uri)
    return namespaces


class AbstractTree(ElementTree, metaclass=ABCMeta):
    @staticmethod
    @abstractmethod
    def register_namespaces() -> dict[str, str]: ...

    @staticmethod
    def get_doctype() -> str:
        return ""

    def write(self, file: PathLike[str]) -> None:
        self.register_namespaces()
        buffer = StringIO()
        super().write(buffer, encoding="unicode", xml_declaration=False, method="xml")
        with open(file, "w", encoding="utf-8") as f:
            f.write(f'<?xml version="1.0" encoding="utf-8"?>\n{self.get_doctype()}')
            f.write(buffer.getvalue())

    def parse(self, source: PathLike[str]) -> None:
        self.register_namespaces()
        parser = DefusedXMLParser(target=TreeBuilder())
        super().parse(source, parser)


class XhtmlTree(AbstractTree):
    @staticmethod
    def get_doctype() -> str:
        return "<!DOCTYPE html>\n\n"

    @staticmethod
    def register_namespaces() -> dict[str, str]:
        return register_namespaces(XHTML_NAMESPACES)


class SmilTree(AbstractTree):
    @staticmethod
    def register_namespaces() -> dict[str, str]:
        return register_namespaces(SMIL_NAMESPACES)


class OpfTree(AbstractTree):
    @staticmethod
    def register_namespaces() -> dict[str, str]:
        return register_namespaces(OPF_NAMESPACES)


class ContainerTree(AbstractTree):
    @staticmethod
    def register_namespaces() -> dict[str, str]:
        return register_namespaces(CONTAINER_NAMESPACES)


class Count:
    def __init__(self) -> None:
        self._value = 0

    @property
    def value(self) -> int:
        return self._value

    def increment(self) -> None:
        self._value += 1

    def __repr__(self):
        return f"Count({self.value})"


@dataclass
class ChildNode(ABC):
    text: str
    element: Element
    parent: Element | None = None

    @abstractmethod
    def move(self, new_element: Element) -> None: ...

    def split(self, new_element: Element, match: str, remaining: str) -> "ChildNode": ...


class ElementText(ChildNode):
    def move(self, new_element: Element) -> None:
        children = list(new_element)
        if len(children) == 0:
            if new_element.text is None:
                new_element.text = self.element.text
            else:
                new_element.text += self.element.text
        else:
            if children[-1].tail is None:
                children[-1].tail = self.element.text
            else:
                children[-1].tail += self.element.text
        self.element.text = None

    def split(self, new_element: Element, match: str, remaining: str) -> ChildNode:
        self.text = match
        self.element.text = match
        self.move(new_element)
        assert new_element.tail is None
        new_element.tail = remaining
        return ElementTail(remaining, new_element)


class ElementTail(ChildNode):
    def move(self, new_element: Element) -> None:
        children = list(new_element)
        if len(children) == 0:
            if new_element.text is None:
                new_element.text = self.element.tail
            else:
                new_element.text += self.element.tail
        else:
            if children[-1].tail is None:
                children[-1].tail = self.element.tail
            else:
                children[-1].tail += self.element.tail
        self.element.tail = None

    def split(self, new_element: Element, match: str, remaining: str) -> ChildNode:
        # TODO use the nodes not previously processed instead of the match text!
        self.text = match
        self.element.tail = match
        self.move(new_element)
        assert new_element.tail is None
        new_element.tail = remaining
        return ElementTail(remaining, new_element)


class ChildElement(ChildNode):
    def move(self, new_element: Element) -> None:
        element_copy = deepcopy(self.element)
        self.parent.remove(self.element)
        element_copy.tail = None
        new_element.append(element_copy)

    def split(self, new_element: Element, match: str, remaining: str) -> ChildNode:
        raise NotImplementedError("TODO: implement only when necessary")


def is_inline_tag(element: Element) -> bool:
    ns_tag_split = element.tag.rsplit("}", 1)
    tag = ns_tag_split[1] if len(ns_tag_split) > 1 else element.tag
    return tag in INLINE_TEXT_SEMANTICS_TAGS


def strip_html(element: Element, next_sibling: Element = None) -> None:
    """See: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace"""
    children = list(element)
    if is_inline_tag(element):  # handle inline formatting context
        if element.tail is not None:
            element.tail = RE_WHITESPACE.sub(" ", element.tail)
        if element.text is not None:
            element.text = RE_WHITESPACE.sub(" ", element.text)
            if len(element.text) > 0 and RE_WHITESPACE.match(element.text[-1]):
                if element.tail:
                    element.tail = element.tail.lstrip()
                elif next_sibling is not None and next_sibling.text is not None:
                    next_sibling.text = next_sibling.text.lstrip()
    else:  # assume block formatting context
        if element.text is not None:
            if len(children) > 0 and is_inline_tag(children[0]):
                element.text = RE_WHITESPACE.sub(" ", element.text)
                element.text = element.text.lstrip()
                if len(element.text) > 0 and RE_WHITESPACE.match(element.text[-1]):
                    children[0].text = children[0].text.lstrip()
                if children[-1].tail is not None:
                    children[-1].tail = children[-1].tail.rstrip()
            else:
                element.text = element.text.strip()
        if element.tail is not None:
            element.tail = element.tail.strip()
    for i in range(len(children)):
        child = children[i]
        maybe_next_child = children[i + 1] if i + 1 < len(children) else None
        strip_html(child, next_sibling=maybe_next_child)


def strip_xml(element: Element) -> None:
    if element.text is not None:
        element.text = element.text.strip()
    if element.tail is not None:
        element.tail = element.tail.strip()
    for child in element:
        strip_xml(child)


def deepcopy_parent_element(parent: Element, is_html: bool, ids_to_keep: Container[str]) -> Element:
    parent_copy = deepcopy(parent)
    for child in list(parent_copy):
        if child.get("id") not in ids_to_keep:
            parent_copy.remove(child)
    if is_html:
        strip_html(parent_copy)
    else:
        strip_xml(parent_copy)
    return parent_copy


def is_ruby_tag(element: Element) -> bool:
    ns_tag_split = element.tag.rsplit("}", 1)
    tag = ns_tag_split[1] if len(ns_tag_split) > 1 else element.tag
    return tag == "rp" or tag == "rt"


def to_text_without_ruby(elem: Element) -> str:
    """Recursively gets an elements text with all its children."""
    results: list[str] = []

    def _to_text_without_ruby(_elem: Element) -> None:
        if _elem.text is not None:
            results.append(_elem.text)
        for child in _elem:
            if is_ruby_tag(child):
                continue
            _to_text_without_ruby(child)
            if child.tail is not None:
                results.append(child.tail)

    _to_text_without_ruby(elem)
    return "".join(results)


def insert_span(parent: Element, nodes: list[ChildNode], text_list: list[str], index: Count, count: Count) -> None:
    assert len(text_list) > 0
    match_text = text_list[0]
    node_text_parts: list[str] = []
    match: str = ""
    right: str = ""
    for node in nodes:
        node_text_parts.append(node.text)
        left, match, right = "".join(node_text_parts).partition(match_text)
        if match:
            assert left == ""
            break

    if match == "":
        return

    count.increment()
    ns_tag_split = parent.tag.rsplit("}", 1)
    namespace = (ns_tag_split[0] + "}") if len(ns_tag_split) > 1 else ""
    new_span = Element(namespace + "span", {"id": f"s{count.value}"})
    parent.insert(index.value, new_span)
    index.increment()
    text_list.pop(0)

    for i in range(len(node_text_parts) - 1):
        node_text = node_text_parts[i]
        node = nodes.pop(0)
        node.move(new_span)
        match_handled, match = match[: len(node_text)], match[len(node_text) :]
        assert match_handled == node_text
    last_node = nodes.pop(0)
    if right == "":
        last_node.move(new_span)
    else:
        new_node = last_node.split(new_span, match, right)
        if len(text_list) == 0:
            return
        nodes.insert(0, new_node)
        insert_span(parent, nodes, text_list, index, count)
    return


def insert_spans_recursive(element: Element, text_list: list[str], count: Count, level: int) -> None:
    if len(text_list) == 0:
        return
    children = list(element)
    nodes: list[ChildNode] = []
    index = Count()
    # 1. Check the element's first text node
    if element.text is not None and element.text.strip():
        nodes.append(ElementText(element.text, element))
        insert_span(element, nodes, text_list, index, count)
        if len(text_list) == 0:
            return
    for child_element in children:
        if is_ruby_tag(child_element):
            continue
        insert_spans_recursive(child_element, text_list, count, level + 1)
        if len(text_list) == 0:
            return
        child_text = to_text_without_ruby(child_element)
        nodes.append(ChildElement(child_text, child_element, element))
        # 2. Check the element's children
        insert_span(element, nodes, text_list, index, count)
        if len(text_list) == 0:
            return
        # 3. Check the element's text nodes
        if child_element.tail is not None and child_element.tail.strip():
            nodes.append(ElementTail(child_element.tail, child_element))
            insert_span(element, nodes, text_list, index, count)
            if len(text_list) == 0:
                return


def insert_spans(root_element: Element, text_list: list[str], count: Count = None) -> None:
    """
    Inserts span elements (with ascending id attribute) where the items from
    `text_list` match the text inside the XHTML tree. The text inside
    `text_list` must match the text embedded inside `xhtml`.
    """
    assert len(text_list) > 0
    if count is None:
        count = Count()
    for child in root_element:
        ns_tag_split = child.tag.rsplit("}", 1)
        tag = ns_tag_split[1] if len(ns_tag_split) > 1 else child.tag
        if tag in PARAGRAPH_TAGS:
            insert_spans_recursive(child, text_list, count, 1)
        else:
            insert_spans(child, text_list, count)
