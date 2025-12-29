import { http } from './http';
import { httpRaw } from './http-raw';
import { unwrap } from '../unwrap';
import { AuthError } from '../errors/auth';
import { tokenStore } from '@blog/token-store';

let refreshPromise: Promise<void> | null = null;

async function refreshSession() {
  const { status, body } = await httpRaw('/api/auth/refresh', {
    method: 'POST',
  });

  const data = unwrap<{ accessToken: string }>(status, body);
  tokenStore.set(data.accessToken);
}

export async function authHttp(
  input: RequestInfo,
  init: RequestInit = {},
  retry = true,
): Promise<{ status: number; body: any }> {
  try {
    return await http(input, init);
  } catch (err) {
    if (!(err instanceof AuthError) || !retry) {
      throw err;
    }

    if (!refreshPromise) {
      refreshPromise = refreshSession().finally(() => {
        refreshPromise = null;
      });
    }

    await refreshPromise;
    return authHttp(input, init, false);
  }
}
