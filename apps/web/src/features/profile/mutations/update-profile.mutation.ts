import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@blog/api-client';
import type { User } from '@blog/types';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bio }: { bio: string | null }) =>
      usersApi.updateMe({ bio }),

    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: ['me'] });

      const previousUser = queryClient.getQueryData<User | null>(['me']);

      queryClient.setQueryData<User | null>(['me'], (old) =>
        old ? { ...old, bio: input.bio } : old,
      );

      return { previousUser };
    },

    onError: (_err, _input, ctx) => {
      if (ctx?.previousUser) {
        queryClient.setQueryData(['me'], ctx.previousUser);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
}
