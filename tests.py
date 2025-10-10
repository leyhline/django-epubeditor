"""
INTEGRATION TESTS

This file is for tests that require a database and additional services.
See: https://docs.djangoproject.com/en/5.1/topics/testing/

Pure unit tests for isolated functions and classes without Django dependencies
live in the other test_*.py files.
See: https://docs.python.org/3/library/unittest.html#test-discovery
"""

import json
from pathlib import Path
from shutil import rmtree
from typing import Final
from xml.etree.ElementTree import tostring
from zipfile import ZipFile

from django.conf import settings
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.test import Client, TestCase
from django.urls import reverse

from epubeditor.epub import SmilTree
from epubeditor.models import Book, BookContentPayload, Epubcheck, History
from epubeditor.replay import apply_payload, get_item_id_from_diffname
from epubeditor.xhtml import XhtmlTree

settings.MEDIA_ROOT = "./test-media/"
settings.SERIALIZE_PAYLOADS = False

CURRENT_FOLDER: Final = Path(__file__).parent
TEST_DATA_FOLDER: Final = CURRENT_FOLDER / "test-data"


def upload_book(client: Client, username: str, password: str, filename: str) -> tuple[bool, HttpResponse]:
    login_success = client.login(username=username, password=password)
    # Upload epub file; epubcheck server must be running
    epub_path = TEST_DATA_FOLDER / filename
    epub_file = epub_path.open("rb")
    response = client.post(reverse("upload_book"), {"epub": epub_file})
    return login_success, response


class UploadTestCase(TestCase):
    parameters = [
        (
            "gongitsune.epub",
            "ごん狐",
            "https://www.aozora.gr.jp/cards/000121/files/628_14895.html",
            "ja-JP",
            "OEBPS/content.opf",
        )
    ]

    @classmethod
    def setUpTestData(cls):
        cls.username = "uploadtest"
        cls.password = "uploadtestpassword"
        cls.upload_path = Path(settings.MEDIA_ROOT) / cls.username
        cls.upload_path.mkdir(parents=True, exist_ok=True)
        cls.user = User.objects.create_user(cls.username, f"{cls.username}@localhost", cls.password)

    def test_upload_expect_success(self):
        for filename, title, identifier, language, rootfile in self.parameters:
            with self.subTest(filename):
                login_success, response = upload_book(self.client, self.username, self.password, filename)
                self.assertTrue(login_success)
                # check redirect after successful upload
                self.assertRedirects(response, reverse("book_list"))
                # check that folder for unzipped epub contents was created
                new_folder_path = self.upload_path / title
                self.assertTrue(new_folder_path.exists())
                self.assertTrue(new_folder_path.is_dir())
                # check that cover image file was created
                new_cover_path = self.upload_path / f"{title}.jpg"
                self.assertTrue(new_cover_path.exists())
                self.assertTrue(new_cover_path.is_file())
                # check correct database entries
                book = Book.objects.last()
                self.assertIsNotNone(book)
                if book is None:
                    return
                self.assertEqual(book.uploader, self.username)
                self.assertEqual(book.basename, title)
                self.assertEqual(book.identifier, identifier)
                self.assertEqual(book.title, title)
                self.assertEqual(book.language, language)
                self.assertFalse(book.is_public)
                self.assertEqual(book.rootfile_path, rootfile)
                self.assertEqual(book.cover, f"{self.username}/{title}.jpg")
                uploader = book.users.filter(role__role="UL").get()
                self.assertEqual(uploader, self.user)
                epubcheck_result = Epubcheck.objects.last()
                self.assertIsNotNone(epubcheck_result)
                if epubcheck_result is None:
                    return
                self.assertEqual(epubcheck_result.book, book)
                self.assertEqual(len(epubcheck_result.epubcheck["messages"]), 0)

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        rmtree(cls.upload_path)


class EditBookContentTestCase(TestCase):
    maxDiff = None
    parameters = [("gongitsune.epub", "gongitsune-diffs.zip")]

    @classmethod
    def setUpTestData(cls):
        cls.username = "edittest"
        cls.password = "edittestpassword"
        cls.upload_path = Path(settings.MEDIA_ROOT) / cls.username
        cls.upload_path.mkdir(parents=True, exist_ok=True)
        cls.user = User.objects.create_user(cls.username, f"{cls.username}@localhost", cls.password)

    def test_replay_expect_success(self):
        for filename, diff_zip_name in self.parameters:
            with self.subTest(filename):
                upload_book(self.client, self.username, self.password, filename)
                book = Book.objects.last()
                self.assertIsNotNone(book)
                if book is None:
                    return
                item_before_init: dict[str, tuple[str, str]] = dict()
                xml_before_apply: list[tuple[str, str]] = []
                diff_zip_path = TEST_DATA_FOLDER / diff_zip_name
                with ZipFile(diff_zip_path, "r") as zipfile:
                    diff_names = zipfile.namelist()
                    for name in diff_names:
                        item_id = get_item_id_from_diffname(name)
                        xhtml_content = XhtmlTree(file=book.get_xhtml_path(item_id, False)).tostring()
                        smil_content = SmilTree(file=book.get_xhtml_path(item_id, True)).tostring()
                        if item_id not in item_before_init:
                            item_before_init[item_id] = (xhtml_content, smil_content)
                        xml_before_apply.append((xhtml_content, smil_content))
                        with zipfile.open(name, "r") as f:
                            data: BookContentPayload = json.loads(f.readline())
                        response = apply_payload(name, data, self.user, book)
                        self.assertEqual(response.status_code, 200)
                        response_body = json.loads(response.content)
                        self.assertEqual(response_body["message"], "OK")
                # For each diff file, a History object is created, plus an additional "Init" object per item_id
                history = History.objects.filter(book=book).order_by("-id")
                self.assertEqual(history.count(), len(diff_names) + len(item_before_init))
                for history_entry in history:
                    if history_entry.trigger == "I":
                        XhtmlTree.register_namespaces()
                        xhtml_actual = tostring(history_entry.new_xhtml, encoding="unicode")  # type: ignore
                        SmilTree.register_namespaces()
                        smil_actual = tostring(history_entry.new_smil, encoding="unicode")  # type: ignore
                        xhtml_expected, smil_expected = item_before_init[history_entry.item_id]
                        self.assertEqual(xhtml_actual, xhtml_expected)
                        self.assertEqual(smil_actual, smil_expected)
                        continue
                    undo_response = self.client.post(
                        reverse(
                            "book_content",
                            kwargs={
                                "username": self.user.username,
                                "basename": history_entry.book.basename,
                                "item_id": history_entry.item_id,
                            },
                        ),
                        {"op": "UNDO"},
                        content_type="application/json",
                    )
                    self.assertEqual(undo_response.status_code, 200)
                    undo_response_body = json.loads(undo_response.content)
                    self.assertEqual(undo_response_body["message"], "OK")
                    xhtml_actual = XhtmlTree(
                        file=history_entry.book.get_xhtml_path(history_entry.item_id, False)
                    ).tostring()
                    smil_actual = SmilTree(
                        file=history_entry.book.get_xhtml_path(history_entry.item_id, True)
                    ).tostring()
                    xhtml_expected, smil_expected = xml_before_apply.pop()
                    self.assertEqual(xhtml_actual, xhtml_expected)
                    self.assertEqual(smil_actual, smil_expected)

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        rmtree(cls.upload_path)
