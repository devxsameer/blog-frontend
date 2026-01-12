import { useInfiniteQuery } from '@tanstack/react-query';
import { postsApi } from '@blog/api-client';

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) =>
      postsApi.list({
        cursor: pageParam,
        limit: 10,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.meta?.nextCursor ?? undefined,
    staleTime: 60 * 1000,
  });
}
