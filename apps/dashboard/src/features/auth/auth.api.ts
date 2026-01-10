// dashboard/src/features/auth/auth.api.ts
import { authApi } from '@blog/api-client';
import { tokenStore } from '@blog/token-store';
import { authStore } from './auth.store';

export async function login(email: string, password: string) {
  const res = await authApi.login({ email, password });
  tokenStore.set(res.accessToken);
  authStore.setUser(res.user);
  return res.user;
}

export async function logout() {
  authStore.clear();
  tokenStore.clear();
  try {
    await authApi.logout();
  } catch (err) {
    console.warn('Logout failed', err);
  }
}
