// dashboard/src/routes/dashboard/posts/post-edit.route.tsx
import { createRoute } from '@tanstack/react-router';
import { dashboardRoute } from '../dashboard.route';
import { postsApi } from '@blog/api-client';
import EditPostPage from '@/features/posts/pages/EditPostPage';

export const postEditRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'posts/$postSlug/edit',

  loader: async ({ params }) => {
    return postsApi.get(params.postSlug);
  },

  component: EditPostPage,
});
