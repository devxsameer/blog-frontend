import { createRootRouteWithContext } from '@tanstack/react-router';
import { RootLayout } from '@/app/root.layout';
import type { User } from '@blog/types';
import { canonical } from '@/shared/utils/seo';

export interface RouterContext {
  user: User | null;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  head: () => ({
    meta: [
      { title: 'Blog · Sameer Ali' },
      { name: 'description', content: 'Production-grade blog platform' },
    ],
    links: [canonical('/')],
  }),
});
