import { authApi } from '@blog/api-client';
import { tokenStore } from '@blog/token-store';

export async function login(email: string, password: string) {
  const res = await authApi.login({ email, password });
  tokenStore.set(res.accessToken);
  return res.user;
}

export async function signup(
  username: string,
  email: string,
  password: string,
) {
  const res = await authApi.signup({ username, email, password });
  tokenStore.set(res.accessToken);
  return res.user;
}

export async function logout() {
  tokenStore.clear();
  try {
    await authApi.logout();
  } catch {}
}
