import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from '@blog/api-client';
import type { Comment, User } from '@blog/types';

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

      const user = queryClient.getQueryData<User>(['me']);

      if (!user) return;

      const optimistic: Comment = {
        id: crypto.randomUUID(),
        content,
        parentId: parentId ?? null,
        createdAt: new Date().toISOString(),
        author: {
          id: user.id,
          username: user.username,
          avatarUrl: user.avatarUrl ?? null,
        },
        authorId: user.id,
        postId: crypto.randomUUID(),
      };

      queryClient.setQueryData<Comment[]>(
        ['comments', postSlug],
        (old = []) => [optimistic, ...old],
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
