import csv
import json
from abc import ABCMeta, abstractmethod
from array import array
from pathlib import Path
from typing import Final, TypedDict
from unittest import TestCase
from zipfile import ZipFile

from bitarray import bitarray

from .alignment import (
    build_grid,
    KANA_TO_INT,
    find_path,
    words_to_kana,
    text_to_kana,
    align_text_to_words,
    WordsDict,
)

CURRENT_FOLDER: Final = Path(__file__).parent
TEST_DATA_FOLDER: Final = CURRENT_FOLDER / "test-data"


class MiscDict(TypedDict):
    max_positions: list[tuple[int, int]]
    directions_bit_n: int


class AlignmentDict(TypedDict):
    text_surface_by_word: list[str | None]
    text_kana_by_word: list[str | None]
    recognition_words: list[str | None]
    recognition_kana_by_word: list[str | None]


class AbstractAlignmentTest(TestCase, metaclass=ABCMeta):
    """
    Prepares a test class by opening zipped test data.

    The test data zipfile must contain the following files:

    * misc.json      - for storing small key value pairs that do not belong elsewhere
    * text.txt       - the original text used for alignment
    * directions.bin - the full needleman wunsch grid
    * paths.txt      - each line is an optimal path through the grid
    * alignment.csv  - the textual 'words' used for alignment as well as the final result
    """

    @staticmethod
    @abstractmethod
    def get_testdata_path() -> Path: ...

    @classmethod
    def setUpClass(cls):
        with ZipFile(cls.get_testdata_path(), "r") as zipfile:
            json_bytes = zipfile.read("misc.json")
            cls.misc: MiscDict = json.loads(json_bytes)

            text_bytes = zipfile.read("text.txt")
            cls.text_lines = [line.strip() for line in text_bytes.decode("utf-8").splitlines()]

            directions_bytes = zipfile.read("directions.bin")
            cls.directions = bitarray(buffer=directions_bytes[: cls.misc["directions_bit_n"]])

            cls.paths = []
            paths_bytes = zipfile.read("paths.txt")
            for path in paths_bytes.decode("utf-8").splitlines():
                if not path:
                    continue
                path_ba = bitarray()
                for d in path:
                    match d:
                        case "d":  # match between recognition and text (diagonal)
                            path_ba.append(1)
                            path_ba.append(1)
                        case "v":  # use recognition, skip text (vertical)
                            path_ba.append(0)
                            path_ba.append(1)
                        case "h":  # skip recognition, use text (horizontal)
                            path_ba.append(1)
                            path_ba.append(0)
                        case other:
                            raise ValueError(f"invalid path direction: {other}")
                cls.paths.append(path_ba)

            alignment_bytes = zipfile.read("alignment.csv")
            reader = csv.reader(alignment_bytes.decode("utf-8").splitlines())
            headers = next(reader)
            fields_list: list[list[str]] = [[] for _ in headers]
            for row in reader:
                for i, field in enumerate(row):
                    fields_list[i].append(field)
            cls.alignment: AlignmentDict = {header: fields for header, fields in zip(headers, fields_list)}

    def check_align_text_to_words(self, path_index: int):
        # Assert correct length of test expectation
        self.assertEqual(len(self.alignment["recognition_words"]), len(self.alignment["recognition_kana_by_word"]))
        self.assertEqual(len(self.alignment["text_surface_by_word"]), len(self.alignment["text_kana_by_word"]))
        self.assertEqual(
            len(self.alignment[f"aligned_text_words_{path_index+1}"]), len(self.alignment["recognition_kana_by_word"])
        )

        # compute results
        words_dict: WordsDict = {
            "text_kana": self.alignment["text_kana_by_word"],
            "text_surface": self.alignment["text_surface_by_word"],
            "recognition_kana": self.alignment["recognition_kana_by_word"],
        }
        result_intervals = align_text_to_words(self.paths[path_index], words_dict)

        # Assert correct length of result intervals (must not change after execution!)
        self.assertEqual(len(self.alignment[f"aligned_text_words_{path_index+1}"]), len(result_intervals))
        self.assertEqual(len(self.alignment["recognition_kana_by_word"]), len(result_intervals))

        # Assert correct content of result intervals
        text = "".join(self.text_lines)
        for interval, expected_text in zip(result_intervals, self.alignment[f"aligned_text_words_{path_index+1}"]):
            if interval is None:
                self.assertEqual(expected_text, "")
            else:
                start, end = interval
                text_part = text[start:end]
                self.assertEqual(expected_text, text_part)

    def check_build_grid(self):
        # prepare full text from seperated words
        vosk_kana = "".join(self.alignment["recognition_kana_by_word"])
        text_kana = "".join(self.alignment["text_kana_by_word"])
        t1 = array("B", (KANA_TO_INT[char] for char in text_kana))
        t2 = array("B", (KANA_TO_INT[char] for char in vosk_kana))
        # build actual needleman wunsch grid
        positions, directions = build_grid(t1, t2)
        # check positions in grid with maximum value
        self.assertEqual(len(self.misc["max_positions"]), len(positions))
        for expected_pos, given_pos in zip(self.misc["max_positions"], positions):
            self.assertEqual(tuple(expected_pos), given_pos)
        # check full grid (aka directions)
        self.assertEqual(len(self.directions), len(directions))
        self.assertEqual(self.directions, directions)
        # additionally, assert find_path function
        xsize = t1.buffer_info()[1] + 1
        self.assertEqual(len(self.paths), len(positions))
        for i, position in enumerate(positions):
            given_path = find_path(position, directions, xsize)
            expected_path = self.paths[i]
            self.assertEqual(expected_path, given_path, f"path {i+1}/{len(positions)}")

    def check_words_to_kana(self, path_index: int):
        recognition_kana_by_word, recognition_words = words_to_kana(self.alignment["recognition_words"])
        for index, (expected_kana, given_kana) in enumerate(
            zip(self.alignment["recognition_kana_by_word"], recognition_kana_by_word)
        ):
            self.assertEqual(expected_kana, given_kana, f"kana at index {index}")
        for index, (expected_word, given_word) in enumerate(
            zip(self.alignment["recognition_words"], recognition_words)
        ):
            self.assertEqual(expected_word, given_word, f"word at index {index}")

    def check_text_to_kana(self):
        text_kana_by_word, text_surface_by_word = text_to_kana(self.text_lines)
        self.assertEqual("".join(self.text_lines), "".join(text_surface_by_word))
        self.assertEqual(self.alignment["text_kana_by_word"], text_kana_by_word)
        self.assertEqual(self.alignment["text_surface_by_word"], text_surface_by_word)


class GongitsuneChapter1Test(AbstractAlignmentTest):
    @staticmethod
    def get_testdata_path() -> Path:
        return TEST_DATA_FOLDER / "gongitsune_chapter01.zip"

    def test_align_text_to_words_with_path1(self):
        self.check_align_text_to_words(0)

    def test_build_grid(self):
        self.check_build_grid()

    def test_words_to_kana_with_path1(self):
        self.check_words_to_kana(0)

    def test_text_to_kana(self):
        self.check_text_to_kana()
