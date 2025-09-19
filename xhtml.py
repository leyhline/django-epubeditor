import re
from abc import ABCMeta, abstractmethod
from collections.abc import Container
from copy import deepcopy
from io import StringIO
from os import PathLike
from typing import Final
from xml.etree.ElementTree import Element, register_namespace, ElementTree, TreeBuilder

from defusedxml.ElementTree import DefusedXMLParser

RE_WHITESPACE = re.compile(r"\s+")

INLINE_TEXT_SEMANTICS_TAGS: Final = frozenset({"a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn", "em", "i", "kbd", "mark", "q", "rp", "rt", "ruby", "s", "samp", "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr"})  # fmt: skip

XHTML_NAMESPACES: Final = {"": "http://www.w3.org/1999/xhtml", "epub": "http://www.idpf.org/2007/ops"}
SMIL_NAMESPACES: Final = {"": "http://www.w3.org/ns/SMIL", "epub": "http://www.idpf.org/2007/ops"}
OPF_NAMESPACES: Final = {"": "http://www.idpf.org/2007/opf", "dc": "http://purl.org/dc/elements/1.1/"}
CONTAINER_NAMESPACES: Final = {"": "urn:oasis:names:tc:opendocument:xmlns:container"}


class AbstractTree(ElementTree, metaclass=ABCMeta):
    @staticmethod
    @abstractmethod
    def register_namespaces() -> dict[str, str]: ...

    @staticmethod
    def get_doctype() -> str:
        return ""

    def _tobuffer(self) -> StringIO:
        self.register_namespaces()
        buffer = StringIO()
        super().write(buffer, encoding="unicode", xml_declaration=False, method="xml")
        return buffer

    def write(self, file: PathLike[str]) -> None:
        buffer = self._tobuffer()
        with open(file, "w", encoding="utf-8") as f:
            f.write(f'<?xml version="1.0" encoding="utf-8"?>\n{self.get_doctype()}')
            f.write(buffer.getvalue())

    def tostring(self) -> str:
        buffer = self._tobuffer()
        return buffer.getvalue()

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


def register_namespaces(namespaces: dict[str, str]) -> dict[str, str]:
    for prefix, uri in namespaces.items():
        register_namespace(prefix, uri)
    return namespaces


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
