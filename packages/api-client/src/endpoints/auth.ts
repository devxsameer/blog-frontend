import { authHttp } from '../http/auth-http';
import { unwrap } from '../unwrap';
import { tokenStore } from '@blog/token-store';

export const authApi = {
  async me() {
    const { status, body } = await authHttp('/api/auth/me');
    return unwrap<{ user: any }>(status, body);
  },

  async login(input: any) {
    const { status, body } = await authHttp('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    });

    const data = unwrap<{ user: any; accessToken: string }>(status, body);

    tokenStore.set(data.accessToken);

    return data;
  },

  async signup(input: any) {
    const { status, body } = await authHttp('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(input),
    });

    const data = unwrap<{ user: any; accessToken: string }>(status, body);

    tokenStore.set(data.accessToken);

    return data;
  },

  async logout() {
    try {
      const { status, body } = await authHttp('/api/auth/logout', {
        method: 'POST',
      });

      unwrap<void>(status, body);
    } finally {
      tokenStore.clear();
    }
  },
};
