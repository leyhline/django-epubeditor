import csv
import json
from array import array
from collections.abc import Sequence
from functools import reduce
from io import StringIO
from itertools import batched, zip_longest
from pathlib import Path
from typing import TypedDict, Literal, Final
from zipfile import ZipFile, ZIP_DEFLATED

from bitarray import bitarray
from fugashi import Tagger

from epubeditor.epub import SpanData, Timing
from epubeditor.fields import MaybeInterval

Bit = Literal[0, 1]
Position = tuple[int, int]


class WordsDict(TypedDict):
    recognition_kana: list[str]
    text_kana: list[str]
    text_surface: list[str]


KANA_LIMIT: Final = 32768  # sqrt(1024**3)
# from https://github.com/ikegami-yukino/jaconv/blob/master/jaconv/conv_table.py
FULL_KANA: Final = (
    "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズ"
    "セゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピ"
    "フブプヘベペホボポマミムメモャヤュユョヨラリルレロワ"
    "ヲンーヮヰヱヵヶヴヽヾ"  # ・「」。、
)
# HIRAGANA: Final = (
#     "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすず"
#     "せぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴ"
#     "ふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろわ"
#     "をんーゎゐゑゕゖゔゝゞ"  # ・「」。、
# )
KANA_TO_INT: Final = {kana: i for i, kana in enumerate(FULL_KANA)}
PARAGRAPH_BEGIN_CHARS: Final = ("「",)
PARAGRAPH_END_CHARS: Final = ("。",)

tagger = Tagger("-Owakati")


def add_3_bits(ba: bitarray, pos: int, bits: Sequence[Bit]) -> None:
    ba[pos] = bits[0]
    ba[pos + 1] = bits[1]
    ba[pos + 2] = bits[2]


def build_grid(t1: array, t2: array) -> tuple[list[Position], bitarray]:
    """
    First, builds a needleman wunsch grid with size of (t1 + 1) x (t2 + 1),
    where t1 defines the horizontal x-axis and t2 defines the vertical y-axis.

    Returns the positions of all global maxima in the grid.
    Returns a bitarray with the same size of the grid (x3) with optimal directions.
    """
    xsize = t1.buffer_info()[1] + 1
    ysize = t2.buffer_info()[1] + 1
    grid = array("h", xsize * ysize * [0])  # a grid holding the score (signed short, 2 bytes)
    directions = bitarray(xsize * ysize * "000")
    for x in range(1, xsize):
        grid[x] = grid[x - 1] - 1
        add_3_bits(directions, x * 3, (0, 0, 1))  # left
    for y in range(1, ysize):
        grid[y * xsize] = grid[(y - 1) * xsize] - 1
        add_3_bits(directions, y * xsize * 3, (0, 1, 0))  # top
    max_value: int = 0
    max_positions: list[Position] = [(0, 0)]
    for y in range(1, ysize):
        for x in range(1, xsize):
            topleft = grid[(y - 1) * xsize + x - 1]
            top = grid[(y - 1) * xsize + x]
            left = grid[y * xsize + x - 1]
            vals: tuple[int, int, int] = (topleft + (1 if (t1[x - 1] == t2[y - 1]) else -1), top - 1, left - 1)
            current_max_value = max(vals)
            current_direction: list[Bit] = [0, 0, 0]
            for i in range(3):
                if vals[i] == current_max_value:
                    current_direction[i] = 1
            grid[y * xsize + x] = current_max_value
            add_3_bits(directions, y * xsize * 3 + x * 3, current_direction)
            if current_max_value == max_value:
                max_positions.append((x, y))
            elif current_max_value > max_value:
                max_value = current_max_value
                max_positions = [(x, y)]
    return max_positions, directions


def find_path(position: Position, directions: bitarray, xsize: int) -> bitarray:
    """
    A path is encoded as bitarray. A direction is encoded using two bits.
    Before reverse: 0b01: left - 0b10: top - 0b11: topleft
    After reverse: 0b10: right - 0b01: down - 0b11: downright

    Note: We lose some paths here by prioritization topleft > top > left; is this a problem?
          There are too many possibilities when outputting all paths.
          Maybe we can use some kind of shortest paths algorithm here?
    """
    path = bitarray()
    x, y = position
    d_index = y * xsize * 3 + x * 3
    d = directions[d_index : d_index + 3]
    while d.to01() != "000":
        if d[0]:  # topleft
            x -= 1
            y -= 1
            path.extend("11")
        elif d[1]:  # top
            y -= 1
            path.extend("10")
        elif d[2]:  # left
            x -= 1
            path.extend("01")
        d_index = y * xsize * 3 + x * 3
        d = directions[d_index : d_index + 3]
    path.reverse()
    return path


def text_to_kana(text_lines: list[str]) -> tuple[list[str], list[str]]:
    """
    Convert a japanese text to katakana using MeCab.

    BUG: Never use MeCab with Python generator constructs!
    """
    kana_words: list[str] = []
    surface_words: list[str] = []
    for line in text_lines:
        if not line.strip():
            continue
        nodes = tagger(line)
        for node in nodes:
            surface = node.surface.strip()
            if node.feature.kana:
                kana_words.append(node.feature.kana.strip())
            elif all(c in FULL_KANA for c in surface):
                kana_words.append(surface)
            else:
                kana_words.append("")
            surface_words.append(surface)
    return kana_words, surface_words


def words_to_kana(words: list[str]) -> tuple[list[str], list[str]]:
    """
    Convert japanese words to katakana by first merging them and then separating them again.

    BUG: Never use MeCab with Python generator constructs!
    """
    text_lines = "".join(words).split("\n")
    kana_words, surface_words = text_to_kana(text_lines)
    kana_results: list[str] = []
    surface_results: list[str] = []
    i = 0
    for word in words:
        matched_kana: list[str] = []
        matched_surfaces: list[str] = []
        while ((matched_len := sum(len(word) for word in matched_surfaces)) < len(word)) and i < len(kana_words):
            matched_kana.append(kana_words[i])
            matched_surfaces.append(surface_words[i])
            i += 1
        if matched_len == len(word):
            kana_results.append("".join(matched_kana))
            surface_results.append("".join(matched_surfaces))
        else:  # matched_len > word_len: BAD CASE! Call tagger again
            matched_kana.clear()
            matched_surfaces.clear()
            alt_nodes = tagger(word)
            for node in alt_nodes:
                surface = node.surface.strip()
                if node.feature.kana:
                    matched_kana.append(node.feature.kana.strip())
                elif all(c in FULL_KANA for c in surface):
                    matched_kana.append(surface)
                else:
                    matched_kana.append("")
                matched_surfaces.append(surface)
            kana_results.append("".join(matched_kana))
            surface_results.append("".join(matched_surfaces))
            i -= 1
            kana_words[i] = kana_words[i][len(kana_results[-1]) :]
            surface_words[i] = surface_words[i][len(surface_results[-1]) :]
    assert len(kana_results) == len(words)
    assert len(surface_results) == len(words)
    return kana_results, surface_results


def write_debug_files_to_disk(
    zip_filename: str,
    text: str,
    positions: list[Position],
    directions: bitarray,
    paths: list[bitarray],
    text_surface,
    text_kana,
    recognition_words,
    recognition_kana,
) -> None:
    zip_path = Path(zip_filename)
    assert str(zip_path.parent) == ".", f"'{zip_filename}' must be a filename without path components"
    assert zip_path.suffix == ".zip", f"'{zip_filename}' must be a .zip file with a corresponding extension"

    with ZipFile(zip_filename, "w", ZIP_DEFLATED, False) as zipfile:
        misc = {"max_positions": positions, "directions_bit_n": len(directions)}
        zipfile.writestr("text.txt", text)
        zipfile.writestr("misc.json", json.dumps(misc))
        zipfile.writestr("directions.bin", directions.tobytes())
        path_buffer = StringIO()
        for path in paths:
            for d in batched(path, 2):
                match d:
                    case (1, 1):  # match between recognition and text (diagonal)
                        path_buffer.write("d")
                    case (0, 1):  # use recognition, skip text (vertical)
                        path_buffer.write("v")
                    case (1, 0):  # skip recognition, use text (horizontal)
                        path_buffer.write("h")
                    case other:
                        raise ValueError(f"invalid path direction: {other}")
            path_buffer.write("\n")
        zipfile.writestr("paths.txt", path_buffer.getvalue())
        base_text = "".join(line.strip() for line in text.split("\n") if line.strip())
        words_dict: WordsDict = {
            "recognition_kana": recognition_kana,
            "text_kana": text_kana,
            "text_surface": text_surface,
        }
        align_headers: list[str] = []
        align_words: list[list[str]] = []
        for i, path in enumerate(paths, 1):
            align_headers.append(f"aligned_text_words_{i}")
            result_intervals = align_text_to_words(path, words_dict)
            align_words.append(["" if iv is None else base_text[iv[0] : iv[1]] for iv in result_intervals])
        csv_buffer = StringIO()
        writer = csv.writer(csv_buffer)
        writer.writerow(
            ["text_surface_by_word", "text_kana_by_word", "recognition_words", "recognition_kana_by_word"]
            + align_headers
        )
        for columns in zip_longest(text_surface, text_kana, recognition_words, recognition_kana, *align_words):
            writer.writerow(columns)
        zipfile.writestr("alignment.csv", csv_buffer.getvalue())


def find_paths(words: list[str], original_text: str, zip_filename: str = None) -> tuple[list[bitarray], WordsDict]:
    """
    Generally, *words* are from speech recognition while *original_text* is the book's content.

    In the resulting needleman wunsch grid for global alignment (scores and directions),
    *words* define the vertical y-axis while *text* defines the horizontal x-axis.

    In other words: the x-axis comes from the book, the y-axis from speech recognition.

    If zip_path is given the function additionally writes intermediate data to disc
    for testing and debugging purposes.
    """
    text_lines = [line.strip() for line in original_text.split("\n") if line.strip()]
    recognition_kana, _ = words_to_kana(words)
    recognition = "".join(recognition_kana)
    if len(recognition) >= KANA_LIMIT:
        raise ValueError(f"The number of kana from speech detection must be below {KANA_LIMIT}")
    text_kana, text_surface = text_to_kana(text_lines)
    text = "".join(text_kana)
    if len(text) >= KANA_LIMIT:
        raise ValueError(f"The number of kana from the original text must be below {KANA_LIMIT}")
    t1 = array("B", (KANA_TO_INT[char] for char in text))
    t2 = array("B", (KANA_TO_INT[char] for char in recognition))
    positions, directions = build_grid(t1, t2)
    xsize = t1.buffer_info()[1] + 1
    paths = [find_path(position, directions, xsize) for position in positions]
    words_dict: WordsDict = {
        "recognition_kana": recognition_kana,
        "text_kana": text_kana,
        "text_surface": text_surface,
    }
    if zip_filename:
        write_debug_files_to_disk(
            zip_filename, original_text, positions, directions, paths, text_surface, text_kana, words, recognition_kana
        )
    return paths, words_dict


class PathHandler:
    def __init__(self, words_dict: WordsDict):
        self.result_intervals: list[MaybeInterval] = [None for _ in words_dict["recognition_kana"]]
        self.recognition_intervals = self._create_intervals_from_kana(words_dict["recognition_kana"])
        self.recognition_kana = words_dict["recognition_kana"]
        assert len(self.result_intervals) == len(self.recognition_intervals)
        self.recognition_intervals_index = 0

        self.text_intervals = self._create_intervals_from_surface(words_dict["text_surface"], words_dict["text_kana"])
        self.text_kana = words_dict["text_kana"]
        self.text_surface = words_dict["text_surface"]
        self.text_intervals_index = 0

        self.recognition_kana_index = 0
        self.text_kana_index = 0

    def walk(self, path: bitarray) -> None:
        for direction in batched(path, 2):
            match direction:
                case (1, 1):  # downright (match)
                    self._text_increment()
                    self._recognition_increment()
                case (0, 1):  # down (use recognition, skip text)
                    self._recognition_increment()
                case (1, 0):  # right (skip recognition, use text)
                    self._text_increment()
                case other:
                    raise ValueError(f"invalid path direction: {other}")

    def get_result(self):
        return self.result_intervals

    def _text_increment(self):
        self.text_kana_index += 1
        while self.text_intervals_index < len(self.text_intervals):
            kana_end, surface_interval = self.text_intervals[self.text_intervals_index]
            if self.text_kana_index >= kana_end:
                if self.result_intervals[self.recognition_intervals_index] is None:
                    self.result_intervals[self.recognition_intervals_index] = surface_interval
                self.text_intervals_index += 1
            else:
                return

    def _recognition_increment(self):
        self.recognition_kana_index += 1
        while self.recognition_intervals_index < len(self.recognition_intervals):
            kana_end = self.recognition_intervals[self.recognition_intervals_index]
            if self.recognition_kana_index >= kana_end:
                self.recognition_intervals_index += 1
            else:
                return

    @staticmethod
    def _create_intervals_from_kana(kana_words: list[str]) -> list[int]:
        intervals: list[int] = []
        start = 0
        for kana_word in kana_words:
            intervals.append(start + len(kana_word))
            start += len(kana_word)
        return intervals

    @staticmethod
    def _create_intervals_from_surface(
        surface_words: list[str], kana_words: list[str]
    ) -> list[tuple[int, MaybeInterval]]:
        """Create intervals for words, but only for words that can be spelled in kana."""
        assert len(surface_words) == len(kana_words)
        intervals: list[tuple[int, MaybeInterval]] = []
        surface_start = 0
        kana_start = 0
        for word, kana_word in zip(surface_words, kana_words):
            if kana_word == "":
                interval: MaybeInterval = None
            else:
                interval: MaybeInterval = (surface_start, surface_start + len(word))
            intervals.append((kana_start + len(kana_word), interval))
            surface_start += len(word)
            kana_start += len(kana_word)
        return intervals


def align_text_to_words(path: bitarray, words_dict: WordsDict) -> list[MaybeInterval]:
    path_handler = PathHandler(words_dict)
    path_handler.walk(path)
    return path_handler.get_result()


def group_intervals(text: str, intervals: list[MaybeInterval], timings: list[Timing]) -> list[list[SpanData]]:
    """Must have the same logic as groupIntervals method in align-threshold.ts"""
    groups: list[list[SpanData]] = []
    text_lines = text.split("\n")
    text = "".join(text_lines)  # removes newlines
    newline_positions: list[int] = reduce(
        lambda acc, cur: acc + [(acc[-1] if len(acc) > 0 else 0) + len(cur)], text_lines, []
    )
    newline_position_index = 0
    paragraph: list[SpanData] = []
    text_index = 0
    # the intervals hold indices for the text (without newlines)
    for i, interval in enumerate(intervals):
        if interval is None:
            continue
        start, end = interval

        # Fill the gaps between intervals by adding these characters to the last data element.
        while text_index < start and text[text_index] not in PARAGRAPH_BEGIN_CHARS:
            if len(paragraph) > 0:
                # if there is a previous data element, add the text here
                paragraph[-1]["chars"].append(text[text_index])
            else:
                paragraph.append({"chars": [text[text_index]], "timing": None})
            text_index += 1

        # A newline in the text attribute implies the start of a new paragraph
        while start >= newline_positions[newline_position_index]:
            groups.append(paragraph)
            paragraph = []
            newline_position_index += 1

        # Handle the normal case (we are inside the given interval or at the start of a quotation)
        span_data: SpanData = {"chars": [], "timing": None}
        while text_index < end:
            span_data["chars"].append(text[text_index])
            text_index += 1

        # add timings if available
        if i < len(timings):
            span_data["timing"] = timings[i]

        # finally, add the final data structure to the paragraph array
        paragraph.append(span_data)
    # Handle punctuation: add to last word
    if len(paragraph) > 0:
        while text_index < len(text):
            if text[text_index] in PARAGRAPH_END_CHARS:
                paragraph[-1]["chars"].append(text[text_index])
                text_index += 1
            else:
                break
    # Add leftover paragraph to groups
    if len(paragraph) > 0:
        groups.append(paragraph)
    return groups


def merge_by_silence(groups: list[list[SpanData]], silence: float) -> list[list[SpanData]]:
    """Must have the same logic as mergeBySilence in align-threshold.ts"""
    merged_groups: list[list[SpanData]] = []
    for paragraph in groups:
        merged_data: list[SpanData] = []
        for span_data in paragraph:
            last_merged = merged_data[-1] if len(merged_data) > 0 else None
            if last_merged is not None and last_merged["timing"] is not None:
                last_end = last_merged["timing"][1]
            else:
                last_end = None
            if span_data["timing"] is not None:
                current_start = span_data["timing"][0]
            else:
                current_start = 0
            if (
                last_merged is not None
                and last_end is not None
                and current_start is not None
                and current_start - last_end < silence
            ):
                last_merged["chars"].extend(span_data["chars"])
                last_merged["timing"] = (last_merged["timing"][0], span_data["timing"][1])
            else:
                merged_data.append(span_data)
        merged_groups.append(merged_data)
    return merged_groups
