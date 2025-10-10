import json
from pathlib import Path
from typing import Any, Final, cast
from urllib.request import Request, urlopen

from django.conf import settings
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.http import JsonResponse

from epubeditor.apps import EpubeditorConfig
from epubeditor.models import (
    Book,
    DebugInfo,
    History,
    HistoryTrigger,
    HistoryType,
    MergePayload,
    ParData,
    PayloadOpType,
    Role,
    RoleKey,
    SplitPayload,
)
from epubeditor.record import write_files_files_to_disk

OP_TO_TYPE: Final[dict[PayloadOpType, HistoryType]] = {
    "CREATE": "C",
    "UPDATE": "U",
    "DELETE": "D",
    "MERGE": "M",
    "SPLIT": "S",
}


def post_request(url: str, data: bytes) -> dict[str, Any]:
    request = Request(
        url,
        data=data,
        headers={"Content-Type": "text/plain", "Accept": "application/json"},
        method="POST",
    )
    with urlopen(request) as response:
        assert response.status == 200, f"Request to '{url}' failed: {response.status} {response.reason}"
        return json.loads(response.read())


def call_epubcheck(path_str: str) -> dict[str, Any]:
    path = Path(path_str)
    assert path.suffix.lower() == ".epub", "Filename must end with .epub"
    path = path.resolve()
    url = f"http://localhost:{EpubeditorConfig.EPUBCHECK_SERVER_PORT}"
    return post_request(url, path.as_posix().encode())


def raise_for_permissions(book: Book, user: User) -> None:
    if user.is_authenticated:
        try:
            role: RoleKey = user.role_set.get(book=book).role  # type: ignore
            if role not in ["UL", "ED"]:
                raise PermissionDenied("Forbidden")
        except Role.DoesNotExist:
            raise PermissionDenied("Forbidden")
    else:
        raise PermissionDenied("Forbidden")


def read_toc(book: Book, item_id: str) -> tuple[str, str | None, str | None]:
    toc = book.get_toc_listing()
    toc_length = len(toc)
    for i, toc_item in enumerate(toc):
        if toc_item.id != item_id:
            continue
        return (
            toc_item.text,
            toc[i - 1].id if 0 <= i - 1 < toc_length else None,
            toc[i + 1].id if 0 <= i + 1 < toc_length else None,
        )
    raise RuntimeError(f"Item with id '{item_id}' not found in table of contents")


def handle_book_content_op(
    op: PayloadOpType,
    trigger: HistoryTrigger,
    type: HistoryType,
    user: User,
    book: Book,
    item_id: str,
    data: MergePayload | SplitPayload | ParData,
) -> JsonResponse:
    do_serialize_payloads = getattr(settings, "SERIALIZE_PAYLOADS", False)
    xhtml_debug_info: DebugInfo | None = None
    smil_debug_info: DebugInfo | None = None
    match op:
        case "UPDATE":
            History.create_init_entry(book, item_id, user, "U")
            new = cast(ParData, data)
            old, smil_debug_info = book.modify_smil(item_id, new, do_serialize_payloads)
            History.objects.create(book=book, item_id=item_id, user=user, trigger=trigger, type=type, old=old, new=new)
            response = JsonResponse({"message": "OK", "old": old, "new": new}, status=200)
        case "CREATE":
            History.create_init_entry(book, item_id, user, "C")
            old = cast(ParData, data)
            new, smil_debug_info = book.add_to_smil(item_id, old, do_serialize_payloads)
            _, text_id = new["textSrc"].split("#")
            History.objects.create(book=book, item_id=item_id, user=user, trigger=trigger, type=type, new=new)
            response = JsonResponse({"message": "OK", "new": new, "textId": text_id}, status=201)
        case "DELETE":
            History.create_init_entry(book, item_id, user, "D")
            new = cast(ParData, data)
            old, smil_debug_info = book.delete_from_smil(item_id, new, do_serialize_payloads)
            History.objects.create(book=book, item_id=item_id, user=user, trigger=trigger, type=type, old=old)
            response = JsonResponse({"message": "OK", "old": old}, status=200)
        case "MERGE":
            History.create_init_entry(book, item_id, user, "M")
            merge_payload = cast(MergePayload, data)
            text_id, old_xhtml, new_xhtml, old_smil, new_smil, xhtml_debug_info, smil_debug_info = book.merge_elements(
                item_id, merge_payload, do_serialize_payloads
            )
            History.objects.create(
                book=book,
                item_id=item_id,
                user=user,
                trigger=trigger,
                type=type,
                old_xhtml=old_xhtml,
                new_xhtml=new_xhtml,
                old_smil=old_smil,
                new_smil=new_smil,
            )
            response = JsonResponse({"message": "OK", "textId": text_id}, status=200)
        case "SPLIT":
            History.create_init_entry(book, item_id, user, "S")
            split_payload = cast(SplitPayload, data)
            text_id, old_xhtml, new_xhtml, old_smil, new_smil, xhtml_debug_info, smil_debug_info = book.split_elements(
                item_id, split_payload, do_serialize_payloads
            )
            History.objects.create(
                book=book,
                item_id=item_id,
                user=user,
                trigger=trigger,
                type=type,
                old_xhtml=old_xhtml,
                new_xhtml=new_xhtml,
                old_smil=old_smil,
                new_smil=new_smil,
            )
            response = JsonResponse({"message": "OK", "textId": text_id}, status=200)
        case other:
            response = JsonResponse({"message": f"Operation not supported: '{other}'"}, status=400)
    if do_serialize_payloads:
        write_files_files_to_disk(book, item_id, data, trigger, type, xhtml_debug_info, smil_debug_info)
    return response
