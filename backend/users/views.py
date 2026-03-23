from rest_framework import generics, permissions, status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from .serializers import (
    RegisterSerializer,
    UserSerializer,
    UserUpdateSerializer,
    ChangePasswordSerializer, LoginSerializer
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class MeView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ('PUT', 'PATCH'):
            return UserUpdateSerializer
        return UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Пароль успешно изменён"}, status=status.HTTP_200_OK)


class DeleteMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# class VerifyEmailView(APIView):
#     permission_classes = [AllowAny]
#
#     def get(self, request):
#         token = request.GET.get('token')
#
#         try:
#             access_token = AccessToken(token)
#             user = User.objects.get(id=access_token['user_id'])
#             user.email_verified = True
#             user.save()
#             return Response({'message': 'Email подтвержден!'}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'error': 'Неверный или просроченный токен'}, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        token = request.GET.get('token')
        if not token:
            return Response({'error': 'Токен отсутствует'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Используем RefreshToken (долгоживущий)
            refresh = RefreshToken(token)
            user_id = refresh.payload['user_id']
            user = User.objects.get(id=user_id)

            if user.email_verified:
                return Response({'message': 'Почта уже подтверждена'}, status=status.HTTP_200_OK)

            user.email_verified = True
            user.save()

            # === ВОЗВРАЩАЕМ НОВЫЕ ТОКЕНЫ И ПОЛЬЗОВАТЕЛЯ ===
            new_refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Email успешно подтверждён!',
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(new_refresh),
                    'access': str(new_refresh.access_token),
                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': 'Неверный или просроченный токен'}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)

        return Response({
            "user": UserSerializer(user).data,
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        }, status=status.HTTP_200_OK)
