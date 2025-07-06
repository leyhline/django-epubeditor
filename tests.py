"""
INTEGRATION TESTS

This file is for tests that require a database and additional services.
See: https://docs.djangoproject.com/en/5.1/topics/testing/

Pure unit tests for isolated functions and classes without Django dependencies
live in the other test_*.py files.
See: https://docs.python.org/3/library/unittest.html#test-discovery
"""

from abc import abstractmethod, ABCMeta
from datetime import datetime
from pathlib import Path
from shutil import rmtree
from typing import Final

from django.conf import settings
from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from .models import Book, Epubcheck, Alignment

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


class AbstractAlignTestCase(TestCase, metaclass=ABCMeta):
    @staticmethod
    @abstractmethod
    def get_epub_name() -> str: ...

    @classmethod
    @abstractmethod
    def get_book(cls) -> Book: ...

    @staticmethod
    def get_username() -> str:
        return "aligntest"

    @staticmethod
    def get_password() -> str:
        return "aligntestpassword"

    @classmethod
    def setUpTestData(cls):
        cls.upload_path = Path(settings.MEDIA_ROOT) / cls.get_username()
        cls.user = User.objects.create_user(cls.get_username(), f"{cls.get_username()}@localhost", cls.get_password())
        cls.book = cls.get_book()
        cls.book.save()
        cls.book.users.add(cls.user, through_defaults={"role": "UL"})
        epub_path = TEST_DATA_FOLDER / cls.get_epub_name()
        cls.book.extract(epub_path)
        cls.book.set_rootfile_path()

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        rmtree(cls.upload_path)

    def check_alignment(
        self,
        basename: str,
        item_id: str,
        audio_id: str,
        audio_path: str,
        expected_nr_alignment_paths: int,
        alignment_path_index: int,
        silence_threshold: float,
    ):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        login_success = self.client.login(username=self.get_username(), password=self.get_password())
        self.assertTrue(login_success)
        # Align step 1: select audio file and trigger alignment
        book = Book.objects.first()
        with self.assertRaises(KeyError):
            book.get_xhtml_path(item_id, True)
        original_xhtml_content = book.get_xhtml_path(item_id, False).read_text("utf-8")
        url_args = (self.get_username(), book.basename, item_id)
        response = self.client.post(
            reverse("align_step_1", args=url_args),
            {"audiosrc": audio_path, "zip_filename": f"{timestamp}_{basename}.zip"},
        )
        self.assertRedirects(response, reverse("align_step_2", args=url_args))
        alignment = Alignment.objects.first()
        self.assertEqual(alignment.item_id, item_id)
        self.assertEqual(alignment.audio_id, audio_id)
        self.assertGreater(len(alignment.speech_recognition["monologues"]), 0)
        alignment_paths = alignment.alignmentpath_set.all()
        self.assertEqual(len(alignment_paths), expected_nr_alignment_paths)
        alignment_path = alignment_paths[0]
        self.assertFalse(alignment_path.selected)
        self.assertAlmostEqual(alignment_path.min_silence_s, 0.0)
        # Align step 2: select an alignment path
        response = self.client.post(reverse("align_step_2", args=url_args), {"alignmentpath": alignment_path_index})
        self.assertRedirects(response, reverse("align_step_3", args=url_args))
        alignment_path.refresh_from_db()
        self.assertTrue(alignment_path.selected)
        self.assertAlmostEqual(alignment_path.min_silence_s, 0.0)
        # Align step 3: select a silence duration to form terms from words
        response = self.client.post(reverse("align_step_3", args=url_args), {"threshold": silence_threshold})
        self.assertRedirects(response, reverse("book_content", args=url_args))
        alignment_path.refresh_from_db()
        self.assertAlmostEqual(alignment_path.min_silence_s, silence_threshold)
        # Finally, if media overlay was created: modified XHTML and newly created SMIL
        self.assertTrue(book.get_xhtml_path(item_id, True).exists())
        current_xhtml_content = book.get_xhtml_path(item_id, False).read_text("utf-8")
        self.assertXMLNotEqual(current_xhtml_content, original_xhtml_content)


class AlignGongitsuneTestCase(AbstractAlignTestCase):
    """
    Test the alignment algorithm and corresponding interactions; also includes upload.

    Depends on the epubcheck and voskhttp services.
    """

    @staticmethod
    def get_epub_name() -> str:
        return "gongitsune.epub"

    @classmethod
    def get_book(cls) -> Book:
        return Book(
            uploader=cls.get_username(),
            basename="ごん狐",
            identifier="https://www.aozora.gr.jp/cards/000121/files/628_14895.html",
            title="ごん狐",
            language="ja-JP",
        )

    def test_align_gongitsune_chapter01(self):
        self.check_alignment(
            "gongitsune_chapter01",
            "chapter01.xhtml",
            "gongitsune_01_niimi.ogg",
            "Audio/gongitsune_01_niimi.ogg",
            1,
            1,
            0.37,
        )

    def test_align_gongitsune_chapter02(self):
        self.check_alignment(
            "gongitsune_chapter02",
            "chapter02.xhtml",
            "gongitsune_02_niimi.ogg",
            "Audio/gongitsune_02_niimi.ogg",
            5,
            1,
            0.37,
        )
