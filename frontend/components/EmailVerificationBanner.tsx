'use client';

import { useAuth } from '../contexts/AuthContext';

export default function EmailVerificationBanner() {
  const { user, refreshUser } = useAuth();

  if (!user || user.email_verified) return null;

  return (
    <div className="bg-yellow-500 text-black p-4 text-center font-medium">
      Подтвердите почту, чтобы получить полный доступ!
      <button
        onClick={refreshUser}
        className="ml-4 underline hover:no-underline"
      >
        Проверить сейчас
      </button>
    </div>
  );
}