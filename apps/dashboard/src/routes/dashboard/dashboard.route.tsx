// dashboard/src/routes/dashboard/dashboard.route.tsx
import { rootRoute } from '@/app/root.route';
import { DashBoardLayout } from '@/layouts/DashboardLayout';
import { createRoute, redirect } from '@tanstack/react-router';
import { initAuthOnce } from '../../features/auth/init-auth-once';
import { authApi } from '@blog/api-client';
import { authStore } from '../../features/auth/auth.store';
import { ROUTES } from '@/shared/constants/routes';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.dashboard,

  beforeLoad: async () => {
    await initAuthOnce();

    try {
      const { user } = await authApi.me();
      authStore.setUser(user);

      if (!['admin', 'author'].includes(user.role)) {
        throw redirect({ to: ROUTES.login });
      }

      return { user };
    } catch {
      authStore.clear();
      throw redirect({ to: ROUTES.login });
    }
  },

  component: DashBoardLayout,
});
