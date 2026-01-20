import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi, ValidationError } from '@blog/api-client';
import type { User } from '@blog/types';

type UpdateProfileInput = {
  username: string;
  bio: string | null;
};

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, UpdateProfileInput, { previous?: User }>(
    {
      mutationFn: async (input) => usersApi.updateMe(input),

      onMutate: async (input) => {
        await queryClient.cancelQueries({ queryKey: ['me'] });

        const previous = queryClient.getQueryData<User>(['me']);

        queryClient.setQueryData<User | undefined>(['me'], (old) =>
          old
            ? {
                ...old,
                username: input.username,
                bio: input.bio,
              }
            : old,
        );

        return { previous };
      },

      onError: (err, _input, ctx) => {
        if (ctx?.previous) {
          queryClient.setQueryData(['me'], ctx.previous);
        }

        if (err instanceof ValidationError) {
          throw err;
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['me'] });
      },
    },
  );
}
