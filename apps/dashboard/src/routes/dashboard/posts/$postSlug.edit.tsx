import EditPostPage from '@/features/posts/pages/EditPostPage';
import { postsApi } from '@blog/api-client';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/posts/$postSlug/edit')({
  component: EditPostPage,
  loader: async ({ params }) => {
    return postsApi.get(params.postSlug);
  },
});
