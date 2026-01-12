import { useQuery } from '@tanstack/react-query';
import { commentsApi } from '@blog/api-client';

export function usePostComments(postSlug: string) {
  return useQuery({
    queryKey: ['comments', postSlug],
    queryFn: () => commentsApi.listByPost(postSlug),
    staleTime: 30 * 1000,
  });
}
