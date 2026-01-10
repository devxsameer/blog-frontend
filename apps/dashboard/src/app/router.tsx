// dashboard/src/app/router.tsx
import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './root.route';
import { loginRoute } from '@/routes/auth/login.route';
import { dashboardRoute } from '@/routes/dashboard/dashboard.route';
import { dashboardIndexRoute } from '@/routes/dashboard/dashboard-index.route';
import { profileRoute } from '@/routes/dashboard/profile.route';
import { rootIndexRoute } from '@/routes/root/index.routes';
import { postsIndexRoute } from '@/routes/dashboard/posts/posts-index.route';
import { postEditRoute } from '@/routes/dashboard/posts/post-edit.route';
import { postCreateRoute } from '@/routes/dashboard/posts/post-create.route';

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    rootIndexRoute,
    dashboardRoute.addChildren([
      dashboardIndexRoute,
      postsIndexRoute,
      postCreateRoute,
      postEditRoute,
      profileRoute,
    ]),
    loginRoute,
  ]),

  defaultPendingComponent: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <span className="loading loading-spinner loading-lg" />
    </div>
  ),
});
