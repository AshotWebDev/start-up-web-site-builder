# sites/serializers.py
from rest_framework import serializers
from .models import Site

ALLOWED_TEMPLATES = (
    "next_blog",
    "next_saas",
    "next_landing",
)

class SiteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        # Убрали status, добавили owner_id в read_only
        fields = ("id", "name", "domain", "template")

    def validate_template(self, value):
        if value not in ALLOWED_TEMPLATES:
            raise serializers.ValidationError("Unknown template")
        return value