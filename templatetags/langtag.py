from datetime import date
from pathlib import Path
from typing import TypedDict, Literal

from django import template

register = template.Library()

REGISTRY_PATH = Path(__file__).parent.joinpath("language-subtag-registry.txt")
TYPE_SET = {"language", "script", "region"}
SCOPE_SET = {"macrolanguage", "collection", "special", "private-use"}


class LangTag(TypedDict):
    type: Literal["language", "script", "region"]
    subtag: str
    description: str
    added: date
    scope: Literal["macrolanguage", "collection", "special", "private-use"] | None


def parse_registry() -> list[LangTag]:
    registry: list[LangTag] = []
    with REGISTRY_PATH.open("r", encoding="utf-8") as f:
        contents = f.read()
    entries = [entry for entry in contents.replace("\n  ", " ").split("%%") if len(entry.splitlines()) > 1]
    for entry in entries:
        tag_type = None
        subtag = None
        description = None
        added = None
        scope = None
        for line in entry.splitlines():
            line = line.strip()
            if len(line) == 0:
                continue
            key, val = line.split(": ", 1)
            if key == "Type" and val in TYPE_SET:
                tag_type = val
            elif tag_type in TYPE_SET and key == "Subtag":
                if (
                    tag_type == "language"
                    or (tag_type == "script" and len(val) == 4)
                    or (tag_type == "region" and len(val) == 2)
                ):
                    subtag = val.lower()
            elif tag_type in TYPE_SET and key == "Description":
                description = val
            elif tag_type in TYPE_SET and key == "Added":
                added = date.fromisoformat(val)
            elif tag_type in TYPE_SET and key == "Scope" and val in SCOPE_SET:
                scope = val
                if key == "private-use":  # ignore private-use subtags
                    tag_type = None
        if all((tag_type, subtag, description, added)):
            registry.append(LangTag(type=tag_type, subtag=subtag, description=description, added=added, scope=scope))
    return registry


def group_registry(registry: list[LangTag]) -> tuple[dict[str, str], dict[str, str], dict[str, str]]:
    languages: dict[str, str] = {}
    scripts: dict[str, str] = {}
    regions: dict[str, str] = {}
    for entry in registry:
        if entry["type"] == "language":
            languages[entry["subtag"]] = entry["description"]
        elif entry["type"] == "script":
            scripts[entry["subtag"]] = entry["description"]
        elif entry["type"] == "region":
            regions[entry["subtag"]] = entry["description"]
    return languages, scripts, regions


LANGUAGES, SCRIPTS, REGIONS = group_registry(parse_registry())


@register.filter
def describe_langtag(tag: str) -> str:
    description: list[str] = []
    subtags = tag.split("-")
    if len(subtags) == 0:
        return tag
    try:
        description.append(LANGUAGES[subtags[0].lower()])
        for subtag in subtags[1:]:
            if len(subtag) == 4:
                description.append(SCRIPTS[subtag.lower()])
            elif len(subtag) == 2:
                description.append(REGIONS[subtag.lower()])
    except KeyError:
        return tag
    return ", ".join(description)
