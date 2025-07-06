from typing import TypedDict, Literal, Union
from xml.etree.ElementTree import Element

import defusedxml.ElementTree as ET
from django.db import models

from epubeditor.xhtml import XhtmlTree, SmilTree

MaybeInterval = Union[tuple[int, int], None]


class Term(TypedDict):
    confidence: float
    start: float
    end: float
    text: str
    type: Literal["WORD"]


class Speaker(TypedDict):
    id: Literal["unknown"]
    name: None


class Monologue(TypedDict):
    speaker: Speaker
    start: float
    end: float
    terms: list[Term]


class VoskOutput(TypedDict):
    schemaVersion: Literal["2.0"]
    monologues: list[Monologue]
    text: list[str]


def serialize_intervals(intervals: list[MaybeInterval]) -> str:
    return ",".join("" if interval is None else f"{interval[0]},{interval[1]}" for interval in intervals)


def deserialize_intervals(interval_string: str) -> list[MaybeInterval]:
    intervals: list[MaybeInterval] = []
    a: int | None = None
    for value in interval_string.split(","):
        if value == "":
            intervals.append(None)
        elif a is not None:
            intervals.append((a, int(value)))
            a = None
        else:
            a = int(value)
    return intervals


class MaybeIntervalsField(models.TextField):
    description = "None or a tuple of indices signifying start and end index of a string"

    def from_db_value(self, value: str | None, expression, connection) -> list[MaybeInterval] | None:
        if value is None:
            return value
        return deserialize_intervals(value)

    def to_python(self, value: list[MaybeInterval] | str | None) -> list[MaybeInterval] | None:
        if isinstance(value, list):
            return value
        if value is None:
            return value
        return deserialize_intervals(value)

    def get_prep_value(self, value: list[MaybeInterval] | None) -> str | None:
        if value is None:
            return None
        else:
            return serialize_intervals(value)


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
