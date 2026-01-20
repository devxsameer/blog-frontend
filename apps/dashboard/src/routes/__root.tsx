import type { User } from '@blog/types';
import { createRootRouteWithContext } from '@tanstack/react-router';

export interface RouterContext {
  user: User | null;
}

export const Route = createRootRouteWithContext<RouterContext>()();
