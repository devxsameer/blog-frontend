import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from '@blog/api-client';
import type { Comment } from '@blog/types';

export function useDeleteComment(postSlug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => commentsApi.delete(commentId),

    onMutate: async (commentId) => {
      await queryClient.cancelQueries({
        queryKey: ['comments', postSlug],
      });

      const previous =
        queryClient.getQueryData<Comment[]>(['comments', postSlug]) ?? [];

      queryClient.setQueryData<Comment[]>(['comments', postSlug], (old = []) =>
        old.filter((c) => c.id !== commentId),
      );

      return { previous };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(['comments', postSlug], ctx.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', postSlug],
      });
    },
  });
}
