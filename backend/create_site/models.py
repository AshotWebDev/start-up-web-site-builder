# sites/models.py
from django.db import models

class Site(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("building", "Building"),
        ("ready", "Ready"),
        ("failed", "Failed"),
    )

    name = models.CharField(max_length=255)
    domain = models.CharField(max_length=255, unique=True)
    template = models.CharField(max_length=100)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.domain} ({self.status})"
