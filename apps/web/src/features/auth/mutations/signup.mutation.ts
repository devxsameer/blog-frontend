// features/auth/mutations/signup.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tokenStore } from '@blog/token-store';
import { authApi } from '@blog/api-client';

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) => authApi.signup({ username, email, password }),

    onSuccess: (res) => {
      tokenStore.set(res.accessToken);
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
}
