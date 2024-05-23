from django.urls import path, include, re_path
from django.views.decorators.common import no_append_slash

from epubeditor import views

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("sw.js", no_append_slash(views.ServiceWorkerView.as_view()), name="service_worker"),
    re_path(
        r"^(?P<filename>workbox-[a-z0-9]+\.js)$", no_append_slash(views.WorkboxView.as_view()), name="workbox_runtime"
    ),
    path("accounts/", include("django.contrib.auth.urls")),
    path("accounts/delete/", views.DeleteAccountView.as_view(), name="delete_account"),
    path("accounts/signup/", views.SignupView.as_view(), name="signup"),
    path("accounts/signup/limited/", views.SignupLimitView.as_view(), name="signup_limit"),
    path("accounts/logout/do/", views.DoLogoutView.as_view(), name="do_logout"),
    path("upload/", views.UploadBookView.as_view(), name="upload_book"),
    path("books/", views.BookListView.as_view(), name="book_list"),
    path("books/<username>/<basename>/", views.BookDetailView.as_view(), name="book_detail"),
    path("books/<username>/<basename>/<item_id>/", views.BookContentView.as_view(), name="book_content"),
    path("covers/<username>/<basename>/", views.CoverImage.as_view(), name="cover"),
    path("delete/<username>/<basename>/", views.DeleteBookView.as_view(), name="delete_book"),
    path("download/<username>/<basename>/", views.EpubDownload.as_view(), name="download"),
    path("history/<username>/<basename>/", views.HistoryView.as_view(), name="history"),
    path("resources/<username>/<basename>/", views.ResourcesView.as_view(), name="resources"),
    path(
        "resources/<username>/<basename>/<path:path>",
        no_append_slash(views.ResourceData.as_view()),
        name="resource_data",
    ),
    path("align/<username>/<basename>/<item_id>/", views.AlignView.as_view(), name="align"),
    path("about/", views.AboutView.as_view(), name="about"),
]
