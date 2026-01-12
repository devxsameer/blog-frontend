import type { User } from '@blog/types';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

export interface RouterContext {
  user: User | null;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  pendingComponent: () => (
    <div className="fixed inset-0 flex items-center justify-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  ),
});

function RootLayout() {
  return <Outlet />;
}
