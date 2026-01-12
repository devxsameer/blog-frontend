import PostsPage from '@/features/post/pages/PostsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/')({
  component: PostsPage,
});
