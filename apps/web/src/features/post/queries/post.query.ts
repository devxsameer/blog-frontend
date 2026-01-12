import { useQuery } from '@tanstack/react-query';
import { postsApi } from '@blog/api-client';

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => postsApi.get(slug),
    staleTime: 60 * 1000,
  });
}
