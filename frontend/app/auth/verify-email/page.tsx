'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, refreshUser } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      return;
    }

    fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/v1/auth/verify-email/?token=` + token,
        { method: 'GET' }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.tokens) {
          login(data.tokens, data.user);
          setStatus('success');
          setTimeout(() => router.push('/profile'), 1500); // или куда нужно
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {status === 'loading' && <p>Подтверждаем почту...</p>}
      {status === 'success' && <p>✅ Почта подтверждена! Перенаправляем...</p>}
      {status === 'error' && <p>❌ Неверная ссылка или токен просрочен</p>}
    </div>
  );
}