import re
import subprocess

from django.core.management.base import BaseCommand

from epubeditor.apps import EpubeditorConfig

RE_JAVA_VERSION = re.compile(
    r".*runtime\s.+\(build (?P<major>\d+)\.(?P<minor>\d+)\.(?P<patch>.+)\)\n", flags=re.IGNORECASE | re.DOTALL
)


def check_java_version():
    proc = subprocess.run(["java", "-version"], text=True, stderr=subprocess.PIPE)
    if proc.returncode != 0:
        raise RuntimeError("Java is not installed:\n" + proc.stderr)
    match = RE_JAVA_VERSION.match(proc.stderr)
    if not match:
        raise RuntimeError("Failed to parse Java version:\n" + proc.stderr)
    major_version = int(match.group("major"))
    minor_version = int(match.group("minor"))
    if (major_version != 1 or minor_version < 8) and major_version < 11:
        raise RuntimeError("Java 1.8 or later is required:\n" + proc.stderr)


class Command(BaseCommand):
    help = "Start the epubcheck-server using the system Java runtime"

    def handle(self, *args, **options):
        check_java_version()
        subprocess.run(
            [
                "java",
                "-Xms1024m",
                "-Xmx2048m",
                "-jar",
                "epubeditor/epubcheck-server.jar",
                "--port",
                str(EpubeditorConfig.EPUBCHECK_SERVER_PORT),
            ],
            check=True,
        )
