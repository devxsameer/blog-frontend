import CreatePostPage from '@/features/posts/pages/CreatePostPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/posts/create')({
  component: CreatePostPage,
});
