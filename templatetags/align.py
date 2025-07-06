from bitarray import bitarray
from django import template

from epubeditor.fields import VoskOutput, MaybeInterval, serialize_intervals

register = template.Library()


@register.filter
def concat_vosk_text(vosk_output: VoskOutput) -> str:
    return "".join(f"<p>{line}</p>" for line in vosk_output["text"])


@register.filter
def concat_text(text: str) -> str:
    return "".join(f"<p>{line}</p>" for line in text.split("\n") if line)


@register.filter
def intervals_to_csv(intervals: list[MaybeInterval]) -> str:
    return serialize_intervals(intervals)


@register.filter
def align_lines(path: tuple[bitarray, list[MaybeInterval], str, list[str]]) -> str:
    _, intervals, text, recognition_kana = path
    assert len(intervals) == len(recognition_kana)
    readings: list[tuple[str, str | None]] = []
    text_index = 0
    for interval, kana in zip(intervals, recognition_kana):
        if interval is None:
            continue
        start, end = interval
        readings.append((text[text_index:start], None))
        readings.append((text[start:end], kana))
        text_index = end
    readings.append((text[text_index:], None))
    return "".join(
        kanji if kana is None else f"<ruby><rb>{kanji}</rb><rp>(</rp><rt>{kana}</rt><rp>)</rp></ruby>"
        for kanji, kana in readings
    )
    # text1, text2 = texts
    # chars1 = []
    # chars2 = []
    # i1 = 0
    # i2 = 0
    # for d in batched(path, 2):
    #     match d:
    #         case (1, 1):  # match between recognition and text
    #             chars1.append(text1[i1])
    #             i1 += 1
    #             chars2.append(text2[i2])
    #             i2 += 1
    #         case (0, 1):  # use recognition, skip text
    #             chars1.append(text1[i1])
    #             i1 += 1
    #             chars2.append("　")
    #         case (1, 0):  # skip recognition, use text
    #             chars1.append("　")
    #             chars2.append(text2[i2])
    #             i2 += 1
    #         case other:
    #             raise ValueError(f"invalid path direction: {other}")
    # chars1.extend(text1[i1:])
    # chars2.extend(text2[i2:])
    # return "".join(
    #     f'<div style="display:inline-block;margin-bottom:1em">{c1}<br>{c2}</div>'
    #     for c1, c2 in zip_longest(chars1, chars2, fillvalue="　")
    # )
