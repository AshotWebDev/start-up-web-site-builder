from django.conf import settings
from django.core.mail import send_mail
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from validate_email_address import validate_email

from .models import CustomUser

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    tokens = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'tariff_plan', 'tokens')
        read_only_fields = ('id', 'tokens')

    def validate_email(self, value):
        if not validate_email(value, verify=True):
            raise serializers.ValidationError("Пожалуйста, укажите существующий адрес электронной почты.")
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Пользователь с таким email уже существует.")
        return value

    def get_tokens(self, obj):
        refresh = RefreshToken.for_user(obj)
        return {'refresh': str(refresh), 'access': str(refresh.access_token)}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            tariff_plan=validated_data.get('tariff_plan')
        )


        # Создаём токен для подтверждения email
        token = RefreshToken.for_user(user).access_token
        verify_url = f"{settings.FRONTEND_URL}/auth/verify-email/?token={token}"

        # Отправляем письмо
        send_mail(
            subject='Подтверждение почты',
            message=f'Перейдите по ссылке для подтверждения: {verify_url}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
        )

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'tariff_plan')


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'tariff_plan')



class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True, min_length=6)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Старый пароль указан неверно")
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = CustomUser.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('Пользователь не найден.')

        if not user.email_verified:
            raise AuthenticationFailed('Почта не подтверждена. Проверьте вашу почту.')

        user = authenticate(username=user.email, password=password)
        if not user:
            raise AuthenticationFailed('Неверный пароль.')

        attrs['user'] = user
        return attrs


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        if not self.user.email_verified:
            raise serializers.ValidationError("Подтвердите свой email, прежде чем войти в аккаунт.")

        return data
