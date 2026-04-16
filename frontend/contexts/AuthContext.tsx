'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  email_verified: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (tokens: any, userData: User) => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (tokens: any, userData: User) => {
    localStorage.setItem('access', tokens.access || tokens.access_token);
    localStorage.setItem('refresh', tokens.refresh);
    setUser(userData);
  };

  const refreshUser = async () => {
    const token = localStorage.getItem('access');
    if (!token) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/v1/auth/me/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) setUser(await res.json());
    } catch {}
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};