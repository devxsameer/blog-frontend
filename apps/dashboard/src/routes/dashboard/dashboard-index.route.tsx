import { createRoute } from '@tanstack/react-router';
import { dashboardRoute } from './dashboard.route';
import { dashboardApi } from '@blog/api-client';
import { authStore } from '@/features/auth/auth.store';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';

export const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',

  loader: async () => {
    if (authStore.isAdmin()) {
      const overview = await dashboardApi.adminOverview();
      return { role: 'admin' as const, overview };
    }

    if (authStore.isAuthor()) {
      const overview = await dashboardApi.authorOverview();
      return { role: 'author' as const, overview };
    }

    throw new Error('Unauthorized');
  },

  component: DashboardPage,
});
