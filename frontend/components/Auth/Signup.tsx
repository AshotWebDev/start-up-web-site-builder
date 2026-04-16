// ... существующие импорты остаются

"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useRegisterUserMutation } from "@/app/store/features/users/usersApi";

// ← НОВЫЕ ИМПОРТЫ (используем алиас @/ – он уже настроен в tsconfig.json)
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { useEffect } from 'react';  // если ещё нет


const Signup = () => {
  const t = useTranslations();
  const [registerUser, { isLoading, isSuccess, isError, data, error }] = useRegisterUserMutation();

  // ← Добавляем контекст и роутер
  const { login } = useAuth();
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required(t("formErrors.5")),
    lastName: Yup.string().required(t("formErrors.6")),
    email: Yup.string().email(t("formErrors.0")).required(t("formErrors.1")),
    password: Yup.string().min(6, t("formErrors.2")).required(t("formErrors.3")),
    keepSignedIn: Yup.boolean(),
  });


const handleSubmit = async (values: any) => {
  try {
    const data = await api.post('/auth/register/', {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
    });

    login(data.tokens || data, data.user || data);
    router.push(`/${locale}/profile`);
  } catch (err: any) {
    alert(err.message || 'Ошибка регистрации');
  }
};

  // ← Главная магия: после успешной регистрации сразу логиним (автологин)
  useEffect(() => {
    if (isSuccess && data) {
      // data — это ответ от бэкенда (после наших изменений в views.py/register)
      // Ожидаем структуру вроде { tokens: { access, refresh }, user: { ... } }
      // Если у тебя другой формат — подкорректируй
      const tokens = data.tokens || { access: data.access, refresh: data.refresh };
      const user = data.user || data; // если user в корне

      login(tokens, user);

      // Перенаправляем на профиль или главную
      router.push(`/${locale}/profile`); // или '/dashboard' / '/' — как у тебя
    }

    if (isError) {
      console.error("Registration error:", error);
      // Можно добавить toast или setError
    }
  }, [isSuccess, isError, data, login, router, locale]);

  return (
    // ... весь твой JSX остаётся без изменений
    // Только добавь индикатор loading, если хочешь:
    // {isLoading && <p>Регистрация...</p>}
  );
};

export default Signup;