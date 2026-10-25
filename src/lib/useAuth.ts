import { useEffect, useState, useCallback } from 'react';
import { api } from '@appdeploy/client';

export type Role = 'public' | 'student' | 'professional' | 'admin' | 'super_admin';

export interface AppUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  bio: string;
  joinedAt: string;
}

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/auth/me');
      setUser(res.data?.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const register = async (payload: { fullName: string; username: string; email: string; phone: string; password: string; role: string }) => {
    const res = await api.post('/api/auth/register', payload);
    setUser(res.data.user);
    return res.data.user as AppUser;
  };

  const login = async (identifier: string, password: string) => {
    const res = await api.post('/api/auth/login', { identifier, password });
    setUser(res.data.user);
    return res.data.user as AppUser;
  };

  const logout = async () => {
    await api.post('/api/auth/logout', {});
    setUser(null);
  };

  return { user, loading, register, login, logout, refresh };
}
