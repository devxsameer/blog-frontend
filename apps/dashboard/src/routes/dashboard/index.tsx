import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import { dashboardApi } from '@blog/api-client';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
  loader: async ({ context }) => {
    const user = context.user;

    if (user?.role === 'admin') {
      const overview = await dashboardApi.adminOverview();
      return { role: 'admin' as const, overview };
    }

    if (user?.role === 'author') {
      const overview = await dashboardApi.authorOverview();
      return { role: 'author' as const, overview };
    }

    throw new Error('Unauthorized');
  },
});
