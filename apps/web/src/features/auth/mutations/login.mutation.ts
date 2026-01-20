import { authApi } from '@blog/api-client';
import { tokenStore } from '@blog/token-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => authApi.login({ email, password }),

    onSuccess: (res) => {
      tokenStore.set(res.accessToken);
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
}
