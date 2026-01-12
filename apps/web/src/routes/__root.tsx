import { createRootRouteWithContext } from '@tanstack/react-router';
import { RootLayout } from '@/app/root.layout';
import type { User } from '@blog/types';

export interface RouterContext {
  user: User | null;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
