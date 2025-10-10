"""
Replaying diff files that were recording via record module.
"""

from typing import cast

from django.contrib.auth.models import User
from django.http import JsonResponse

from epubeditor.models import Book, BookContentPayload, HistoryTrigger, HistoryType
from epubeditor.record import RE_DEBUG_FILE_NAME
from epubeditor.viewsutils import handle_book_content_op


def get_item_id_from_diffname(filename: str) -> str:
    match = RE_DEBUG_FILE_NAME.match(filename)
    assert match is not None
    return match.group("item_id")


def apply_payload(filename: str, data: BookContentPayload, user: User, book: Book) -> JsonResponse:
    """Actually, this just uses the payload in the first line of the diff file (diff comment)"""
    match = RE_DEBUG_FILE_NAME.match(filename)
    assert match is not None
    item_id: str = match.group("item_id")
    trigger = cast(HistoryTrigger, match.group("trigger"))
    type = cast(HistoryType, match.group("type"))
    return handle_book_content_op(data["op"], trigger, type, user, book, item_id, data)
