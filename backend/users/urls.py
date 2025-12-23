from django.urls import path
from .views import RegisterView, MeView, ChangePasswordView, DeleteMeView, VerifyEmailView, LoginView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeView.as_view(), name='me'),
    path('me/password/', ChangePasswordView.as_view(), name='change_password'),
    path('me/delete/', DeleteMeView.as_view(), name='delete_me'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
]
