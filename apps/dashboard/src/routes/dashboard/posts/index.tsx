import PostsPage from '@/features/posts/pages/PostsPage';
import type { PostsSearch } from '@/features/posts/posts.types';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/posts/')({
  component: PostsPage,
  validateSearch: (search: Record<string, unknown>): PostsSearch => ({
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
});
