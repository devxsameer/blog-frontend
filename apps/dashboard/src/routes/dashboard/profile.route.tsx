// dashboard/src/routes/dashboard/profile.route.tsx
import { createRoute } from '@tanstack/react-router';
import { dashboardRoute } from './dashboard.route';
import ProfilePage from '@/features/profile/pages/ProfilePage';

export const profileRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'profile',
  component: ProfilePage,
});
