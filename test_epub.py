from unittest import TestCase

from epub import build_new_id


class TestCase_build_new_id(TestCase):
    def test_consecutive_ids(self):
        new_id = build_new_id("p4", "p5")
        self.assertEqual("p4-1", new_id)

    def test_gap_between_ids(self):
        new_id = build_new_id("p4", "p6")
        self.assertEqual("p5", new_id)

    def test_single_id(self):
        new_id = build_new_id("p4", None)
        self.assertEqual("p5", new_id)
