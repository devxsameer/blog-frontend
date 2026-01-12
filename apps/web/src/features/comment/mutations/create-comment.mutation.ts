import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from '@blog/api-client';
import type { Comment } from '@blog/types';

export function useCreateComment(postSlug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      content,
      parentId,
    }: {
      content: string;
      parentId?: string;
    }) => commentsApi.create(postSlug, { content, parentId }),

    onMutate: async ({ content, parentId }) => {
      await queryClient.cancelQueries({
        queryKey: ['comments', postSlug],
      });

      const previous =
        queryClient.getQueryData<Comment[]>(['comments', postSlug]) ?? [];

      const optimistic: Comment = {
        id: crypto.randomUUID(),
        content,
        parentId,
        createdAt: new Date().toISOString(),
        author: { id: 'me', username: 'You' },
      } as Comment;

      queryClient.setQueryData<Comment[]>(
        ['comments', postSlug],
        (old = []) => [...old, optimistic],
      );

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
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
