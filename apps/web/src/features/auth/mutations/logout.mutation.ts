// features/auth/mutations/logout.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tokenStore } from '@blog/token-store';
import { authApi } from '@blog/api-client';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,

    onSuccess: () => {
      tokenStore.clear();

      queryClient.setQueryData(['me'], null);
      queryClient.removeQueries({ queryKey: ['me'] });
    },

    onError: (err) => {
      tokenStore.clear();
      queryClient.setQueryData(['me'], null);

      if (import.meta.env.DEV) {
        console.error('Logout failed:', err);
      }
    },
  });
}
