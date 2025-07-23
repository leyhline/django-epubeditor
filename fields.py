from xml.etree.ElementTree import Element

import defusedxml.ElementTree as ET
from django.db import models

from epubeditor.xhtml import XhtmlTree, SmilTree


class XmlField(models.TextField):
    description = "Automatic conversion from and to XML Element; can be NULL"

    @staticmethod
    def register_namespaces() -> dict[str, str]:
        return dict()

    def from_db_value(self, value: str | None, expression, connection) -> Element | None:
        if value is None:
            return value
        return ET.fromstring(value)

    def to_python(self, value: Element | str | None) -> Element | None:
        if isinstance(value, Element):
            return value
        if value is None:
            return value
        return ET.fromstring(value)

    def get_prep_value(self, value: Element | None) -> str | None:
        if value is None:
            return None
        else:
            self.register_namespaces()
            return ET.tostring(value, encoding="unicode")


class XhtmlField(XmlField):
    description = "Automatic conversion from XHTML Element; can be NULL"

    @staticmethod
    def register_namespaces() -> dict[str, str]:
        return XhtmlTree.register_namespaces()


class SmilField(XmlField):
    description = "Automatic conversion from SMIL Element; can be NULL"

    @staticmethod
    def register_namespaces() -> dict[str, str]:
        return SmilTree.register_namespaces()
