import PostsPage from '@/features/post/pages/PostsPage';
import { canonical, pageTitle } from '@/shared/utils/seo';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/')({
  head: () => ({
    meta: [
      { title: pageTitle('All Posts') },
      {
        name: 'description',
        content:
          'Browse all published articles on software engineering, backend systems, and real-world web development.',
      },
    ],
    links: [canonical('/posts')],
  }),
  component: PostsPage,
});
