# sites/urls.py
from django.urls import path
from .views import SiteCreateAPIView

urlpatterns = [
    path("sites/", SiteCreateAPIView.as_view()),
]
