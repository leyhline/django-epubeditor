from django.apps import AppConfig


class EpubeditorConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "epubeditor"

    EPUBCHECK_SERVER_PORT = 8003
    VOSKHTTP_SERVER_PORT = 8004
