// dashboard/src/routes/auth/login.route.tsx
import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from '@/app/root.route';
import { authStore } from '@/features/auth/auth.store';
import LoginPage from '@/features/auth/pages/LoginPage';
import { ROUTES } from '@/shared/constants/routes';

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.login,

  beforeLoad: () => {
    if (authStore.isAuthed()) {
      throw redirect({ to: ROUTES.dashboard });
    }
  },

  component: LoginPage,
});
