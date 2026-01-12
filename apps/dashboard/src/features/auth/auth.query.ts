import { useQuery } from '@tanstack/react-query';
import type { User } from '@blog/types';
import { authApi } from '@blog/api-client';

export function useAuthQuery() {
  return useQuery<User | null>({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const res = await authApi.me();
        return res.user;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
