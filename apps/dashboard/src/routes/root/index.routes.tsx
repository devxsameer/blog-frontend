// dashboard/src/routes/root/index.routes.tsx
import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from '@/app/root.route';

export const rootIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',

  beforeLoad: () => {
    throw redirect({ to: '/dashboard' });
  },
});
