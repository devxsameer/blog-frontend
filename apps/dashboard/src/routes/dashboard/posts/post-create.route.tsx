// dashboard/src/routes/dashboard/posts/post-create.route.tsx
import { createRoute } from '@tanstack/react-router';
import { dashboardRoute } from '../dashboard.route';
import CreatePostPage from '@/features/posts/pages/CreatePostPage';

export const postCreateRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'posts/create',

  component: CreatePostPage,
});
