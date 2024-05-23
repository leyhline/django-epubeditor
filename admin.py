from django.contrib import admin

from epubeditor.models import Book


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ["uploader", "basename", "is_public", "title", "language", "identifier"]
    list_editable = ["is_public"]
    readonly_fields = [
        "uploader",
        "basename",
        "rootfile_path",
        "identifier",
        "title",
        "language",
        "cover",
    ]
