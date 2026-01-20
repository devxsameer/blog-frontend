import { queryClient } from '@/app/query-client';
import PostPage from '@/features/post/pages/PostPage';
import { canonical, pageTitle } from '@/shared/utils/seo';
import { postsApi } from '@blog/api-client';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/$postSlug')({
  loader: async ({ params }) => {
    const post = await queryClient.fetchQuery({
      queryKey: ['post', params.postSlug],
      queryFn: () => postsApi.get(params.postSlug),
    });

    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData!.post;

    return {
      meta: [
        { title: pageTitle(post.title) },
        {
          name: 'description',
          content: post.excerpt ?? 'Article on devXsameer blog',
        },
      ],
      links: [canonical(`/posts/${post.slug}`)],
    };
  },
  component: PostPage,
});
