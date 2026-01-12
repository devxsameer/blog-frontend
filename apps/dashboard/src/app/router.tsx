// dashboard/src/app/router.tsx
import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: { user: null! },
  defaultPendingComponent: () => (
    <div className="fixed inset-0 flex items-center justify-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  ),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
