"""
Module for recording EPUB modifications as diff files.

This must be activated in settings.py by setting SERIALIZE_PAYLOADS to True.
"""

import json
import re
from difflib import unified_diff
from itertools import groupby
from pathlib import Path
from typing import Iterator

from epubeditor.epub import ParData
from epubeditor.models import (
    Book,
    DebugInfo,
    HistoryTrigger,
    HistoryType,
    MergePayload,
    SplitPayload,
)

RE_DEBUG_FILE_NAME = re.compile(r"(?P<item_id>.+)_(?P<id>\d{4})_(?P<trigger>[INUR])(?P<type>[CUDMS])\.diff")


def group_diff_files(filenames: list[str]) -> Iterator[tuple[str, Iterator[re.Match[str]]]]:
    filenames = sorted(filenames)
    return groupby(
        filter(
            lambda maybe_match: maybe_match is not None,
            (RE_DEBUG_FILE_NAME.match(filename) for filename in filenames if filename.endswith(".diff")),
        ),
        lambda match: match.group("item_id"),  # type: ignore
    )


def write_files_files_to_disk(
    book: Book,
    item_id: str,
    data: MergePayload | SplitPayload | ParData,
    trigger: HistoryTrigger,
    type: HistoryType,
    xhtml_debug_info: DebugInfo | None,
    smil_debug_info: DebugInfo | None,
) -> None:
    data_path = book.get_data_path()
    filenames = [child.name for child in data_path.iterdir()]
    grouped_filename_matches = group_diff_files(filenames)
    filename_matches: None | list[re.Match[str]] = None
    for group_item_id, matches_group in grouped_filename_matches:
        if group_item_id == item_id:
            filename_matches = list(matches_group)
    if filename_matches is None or len(filename_matches) == 0:
        new_id = 1
    else:
        new_id = int(filename_matches[-1].group("id")) + 1
    filename = f"{item_id}_{new_id:04d}_{trigger}{type}.diff"
    with data_path.joinpath(filename).open("w", encoding="utf-8") as f:
        f.write(json.dumps(data))
        f.write("\n")
        if smil_debug_info is not None:
            smil_diff = create_unified_diff(smil_debug_info, data_path)
            f.writelines(smil_diff)
        if xhtml_debug_info is not None:
            xhtml_diff = create_unified_diff(xhtml_debug_info, data_path)
            f.writelines(xhtml_diff)


def create_unified_diff(debug_info: DebugInfo, data_path: Path) -> Iterator[str]:
    rel_path = debug_info.path.relative_to(data_path).as_posix()
    return unified_diff(
        debug_info.old_content,
        debug_info.new_content,
        f"a/{rel_path}",
        f"b/{rel_path}",
        debug_info.old_modified.strftime("%Y-%m-%d %H:%M:%S.%f000 %z"),
        debug_info.new_modified.strftime("%Y-%m-%d %H:%M:%S.%f000 %z"),
    )
