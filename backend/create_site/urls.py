# sites/urls.py
from django.urls import path
from .views import SiteCreateAPIView, SiteResolveAPIView

urlpatterns = [
    # Для личного кабинета (POST)
    path("create/", SiteCreateAPIView.as_view()),

    # Для твоего сервера Next.js (GET)
    path("resolve/", SiteResolveAPIView.as_view()),
]