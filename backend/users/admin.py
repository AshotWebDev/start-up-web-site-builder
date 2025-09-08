from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ("email", "first_name", "last_name", "tariff_plan", "is_staff", "is_superuser")
    list_filter = ("is_staff", "is_superuser", "is_active")

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Личная информация", {"fields": ("first_name", "last_name", "tariff_plan")}),
        ("Права доступа", {"fields": ("is_active", "is_staff", "is_superuser")}),
        ("Дата", {"fields": ("last_login",)}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "first_name", "last_name", "tariff_plan", "password1", "password2", "is_staff",
                       "is_superuser"),
        }),
    )

    search_fields = ("email",)
    ordering = ("email",)
