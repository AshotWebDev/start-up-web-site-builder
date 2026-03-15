# sites/views.py
from rest_framework import generics
# from rest_framework.response import Response

from .models import Site
from .serializers import SiteCreateSerializer
from .tasks import build_site_task


class SiteCreateAPIView(generics.CreateAPIView):
    queryset = Site.objects.all()
    serializer_class = SiteCreateSerializer

    def perform_create(self, serializer):
        site = serializer.save(status="pending")
        build_site_task.delay(site.domain)
