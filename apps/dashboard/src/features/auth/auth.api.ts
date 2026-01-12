// dashboard/src/features/auth/auth.api.ts
import { authApi } from '@blog/api-client';
import { tokenStore } from '@blog/token-store';

export async function login(email: string, password: string) {
  const res = await authApi.login({ email, password });
  tokenStore.set(res.accessToken);
  return res.user;
}

export async function logout() {
  tokenStore.clear();
  try {
    await authApi.logout();
  } catch (err) {
    console.warn('Logout failed', err);
  }
}
