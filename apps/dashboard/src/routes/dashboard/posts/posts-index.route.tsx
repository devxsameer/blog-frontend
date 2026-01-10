// dashboard/src/routes/dashboard/posts/post-index.route.tsx
import { createRoute } from '@tanstack/react-router';
import { dashboardRoute } from '../dashboard.route';
import { postsApi } from '@blog/api-client';
import type { PostOrder, PostSort, PostStatus } from '@blog/types';
import PostsPage from '@/features/posts/pages/PostsPage';

export type PostsSearch = {
  cursor?: string;
  authorId?: string;
  sort?: 'createdAt' | 'updatedAt' | 'publishedAt';
  order?: 'asc' | 'desc';
  status?: 'draft' | 'published' | 'archived';
};

export const postsIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'posts',

  validateSearch: (search): PostsSearch => ({
    cursor: typeof search.cursor === 'string' ? search.cursor : undefined,
    authorId: typeof search.authorId === 'string' ? search.authorId : undefined,
    sort:
      search.sort === 'createdAt' ||
      search.sort === 'updatedAt' ||
      search.sort === 'publishedAt'
        ? search.sort
        : undefined,
    order:
      search.order === 'asc' || search.order === 'desc'
        ? search.order
        : undefined,
    status:
      search.status === 'draft' ||
      search.status === 'published' ||
      search.status === 'archived'
        ? search.status
        : undefined,
  }),

  loader: async ({ location }) => {
    const search = location.search as {
      cursor?: string;
      authorId?: string;
      sort?: PostSort;
      order?: PostOrder;
      status?: PostStatus;
    };

    return postsApi.listDashboard(search);
  },
  component: PostsPage,
});
