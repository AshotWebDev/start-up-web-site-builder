# sites/views.py
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Site, SiteContent
from .serializers import SiteCreateSerializer


# 1. Эндпоинт для твоего личного кабинета (Создание сайта)
class SiteCreateAPIView(generics.CreateAPIView):
    queryset = Site.objects.all()
    serializer_class = SiteCreateSerializer
    permission_classes = [permissions.IsAuthenticated]  # Защищаем создание

    def perform_create(self, serializer):
        # Сохраняем сайт и привязываем к текущему юзеру
        site = serializer.save(owner=self.request.user)
        # Сразу создаем пустую запись для контента
        SiteContent.objects.create(site=site)


# 2. НОВЫЙ ЭНДПОИНТ: Связь между Next.js и Django
class SiteResolveAPIView(APIView):
    permission_classes = [permissions.AllowAny]  # Открытый эндпоинт для Next.js

    def get(self, request):
        # Next.js будет передавать домен в запросе
        domain = request.GET.get('domain')
        if not domain:
            return Response({"error": "Domain is required"}, status=400)

        # Ищем сайт в БД по домену
        site = get_object_or_404(Site, domain=domain, is_active=True)

        # Отдаем Next.js всю нужную информацию
        return Response({
            "name": site.name,
            "template": site.template,
            "content": site.content.settings  # Отдаем настройки (цвета, тексты)
        })