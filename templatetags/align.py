from typing import TypedDict, Literal

from django import template
from fugashi import Tagger

tagger = Tagger("-Owakati")
register = template.Library()


class Speaker(TypedDict):
    id: Literal["unknown"]
    name: None


class Term(TypedDict):
    confidence: float
    start: float
    end: float
    text: str
    type: Literal["WORD"]


class Monologue(TypedDict):
    speaker: Speaker
    start: float
    end: float
    terms: list[Term]


class VoskOutput(TypedDict):
    schemaVersion: Literal["2.0"]
    monologues: list[Monologue]
    text: list[str]


@register.filter
def concat_text(vosk_output: VoskOutput) -> str:
    # terms: Iterator[Term] = chain.from_iterable(monologue["terms"] for monologue in vosk_output["monologues"])
    # tuples = (term["text"], (tagger.parse(term["text"])) for term in terms)
    return "".join(f"<p>{line}</p>" for line in vosk_output["text"])
