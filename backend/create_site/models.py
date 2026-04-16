# sites/models.py
from django.db import models
from django.conf import settings # 1. Импортируем настройки вместо auth.models


class Site(models.Model):
    # Привязываем сайт к конкретному юзеру
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sites")

    name = models.CharField(max_length=255)
    # db_index=True ускоряет поиск по домену в сотни раз
    domain = models.CharField(max_length=255, unique=True, db_index=True)
    template = models.CharField(max_length=100)

    # Вместо статусов делаем простой переключатель
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.domain} ({self.template})"


# НОВАЯ МОДЕЛЬ: Здесь храним уникальные данные сайта
class SiteContent(models.Model):
    site = models.OneToOneField(Site, on_delete=models.CASCADE, related_name="content")
    # Можно использовать JSONField для гибкости
    settings = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"Content for {self.site.domain}"