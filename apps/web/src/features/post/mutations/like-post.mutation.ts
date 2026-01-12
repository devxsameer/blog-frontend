import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '@blog/api-client';

export function useToggleLike(postSlug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (liked: boolean) => {
      if (liked) {
        await postsApi.like(postSlug);
      } else {
        await postsApi.unlike(postSlug);
      }
    },

    onMutate: async (liked) => {
      await queryClient.cancelQueries({ queryKey: ['post', postSlug] });

      const previousPost = queryClient.getQueryData<any>(['post', postSlug]);

      queryClient.setQueryData(['post', postSlug], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          likedByMe: liked,
          likeCount: old.likeCount + (liked ? 1 : -1),
        };
      });

      return { previousPost };
    },

    onError: (_err, _liked, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postSlug], context.previousPost);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postSlug] });
    },
  });
}
