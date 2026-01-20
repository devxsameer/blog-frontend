import { useQuery } from '@tanstack/react-query';
import { postsApi } from '@blog/api-client';
import type { PostContent } from '@blog/types';

export function usePost(initialPost: PostContent) {
  return useQuery({
    queryKey: ['post', initialPost.slug],
    queryFn: () => postsApi.get(initialPost.slug),
    initialData: initialPost,
  });
}
