import PostPage from '@/features/post/pages/PostPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/$postSlug')({
  component: PostPage,
});
