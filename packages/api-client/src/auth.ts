import { api } from './client';
import type { User } from '@blog/shared-types';

export function login(email: string, password: string) {
  return api<User>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return api<void>('/auth/logout', {
    method: 'POST',
  });
}
