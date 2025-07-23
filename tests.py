"""
INTEGRATION TESTS

This file is for tests that require a database and additional services.
See: https://docs.djangoproject.com/en/5.1/topics/testing/

Pure unit tests for isolated functions and classes without Django dependencies
live in the other test_*.py files.
See: https://docs.python.org/3/library/unittest.html#test-discovery
"""

from pathlib import Path
from shutil import rmtree
from typing import Final

from django.conf import settings
from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from .models import Book, Epubcheck

settings.MEDIA_ROOT = "./test-media/"
settings.SERIALIZE_PAYLOADS = True

CURRENT_FOLDER: Final = Path(__file__).parent
TEST_DATA_FOLDER: Final = CURRENT_FOLDER / "test-data"


class UploadTestCase(TestCase):
    """
    Test file upload.

    Depends on the epubcheck service.
    """

    @classmethod
    def setUpTestData(cls):
        cls.username = "uploadtest"
        cls.password = "uploadtestpassword"
        cls.upload_path = Path(settings.MEDIA_ROOT) / cls.username
        cls.user = User.objects.create_user(cls.username, f"{cls.username}@localhost", cls.password)

    def test_upload_gongitsune(self):
        login_success = self.client.login(username=self.username, password=self.password)
        self.assertTrue(login_success)
        # Upload epub file; epubcheck server must be running
        epub_path = TEST_DATA_FOLDER / "gongitsune.epub"
        epub_file = epub_path.open("rb")
        response = self.client.post(reverse("upload_book"), {"epub": epub_file})
        # check redirect after successful upload
        self.assertRedirects(response, reverse("book_list"))
        # check that folder for unzipped epub contents was created
        new_folder_path = self.upload_path / "ごん狐"
        self.assertTrue(new_folder_path.exists())
        self.assertTrue(new_folder_path.is_dir())
        # check that cover image file was created
        new_cover_path = self.upload_path / "ごん狐.jpg"
        self.assertTrue(new_cover_path.exists())
        self.assertTrue(new_cover_path.is_file())
        # check correct database entries
        book = Book.objects.first()
        self.assertEqual(book.uploader, self.username)
        self.assertEqual(book.basename, "ごん狐")
        self.assertEqual(book.identifier, "https://www.aozora.gr.jp/cards/000121/files/628_14895.html")
        self.assertEqual(book.title, "ごん狐")
        self.assertEqual(book.language, "ja-JP")
        self.assertFalse(book.is_public)
        self.assertEqual(book.rootfile_path, "OEBPS/content.opf")
        self.assertEqual(book.cover, f"{self.username}/ごん狐.jpg")
        uploader = book.users.filter(role__role="UL").first()
        self.assertEqual(uploader, self.user)
        epubcheck_result = Epubcheck.objects.first()
        self.assertEqual(epubcheck_result.book, book)
        self.assertEqual(len(epubcheck_result.epubcheck["messages"]), 0)

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        rmtree(cls.upload_path)
