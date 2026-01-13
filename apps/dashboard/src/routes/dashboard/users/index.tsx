import UsersPage from '@/features/users/pages/UsersPage';
import type { UsersSearch } from '@/features/users/types';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/users/')({
  beforeLoad: ({ context }) => {
    if (context.user?.role !== 'admin') {
      throw redirect({ to: '/dashboard' });
    }
  },

  validateSearch: (search: Record<string, unknown>): UsersSearch => ({
    role:
      search.role === 'admin' ||
      search.role === 'author' ||
      search.role === 'user'
        ? search.role
        : undefined,

    isActive:
      search.isActive === 'true'
        ? true
        : search.isActive === 'false'
          ? false
          : undefined,
  }),

  component: UsersPage,
});
