import { redirect } from 'react-router';
import { authStore } from './auth.store';

export function requireAuth() {
  const user = authStore.getUser();

  // Not authenticated
  if (!user) {
    throw redirect('/auth/login');
  }
  return null;
}
