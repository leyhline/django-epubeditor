import voskhttp
from django.core.management.base import BaseCommand

from epubeditor.apps import EpubeditorConfig


class Command(BaseCommand):
    help = "Start the voskhttp server"

    def handle(self, *args, **options):
        voskhttp.run(port=EpubeditorConfig.VOSKHTTP_SERVER_PORT)
