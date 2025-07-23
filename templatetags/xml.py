from xml.etree.ElementTree import Element

from django import template

from epubeditor.xhtml import is_ruby_tag

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
