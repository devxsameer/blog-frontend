import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '@blog/api-client';
import type { PostContent } from '@blog/types';

export function useToggleLike(postSlug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (liked: boolean) => {
      return liked ? postsApi.like(postSlug) : postsApi.unlike(postSlug);
    },

    onMutate: async (liked) => {
      await queryClient.cancelQueries({
        queryKey: ['post', postSlug],
      });

      const previousPost = queryClient.getQueryData<PostContent>([
        'post',
        postSlug,
      ]);

      queryClient.setQueryData<PostContent>(['post', postSlug], (old) => {
        if (!old) return old;

        return {
          ...old,
          likedByMe: liked,
          likeCount: Math.max(0, old.likeCount + (liked ? 1 : -1)),
        };
      });

      return { previousPost };
    },

    onError: (_err, _liked, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postSlug], context.previousPost);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', postSlug],
      });
    },
  });
}
