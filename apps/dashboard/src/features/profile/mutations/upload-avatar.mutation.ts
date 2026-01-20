import { avatarApi, uploadAvatarToCloudinary } from '@blog/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      if (file.size > 2_000_000) {
        throw new Error('Avatar must be under 2MB');
      }

      const sig = await avatarApi.getUploadSignature();
      const publicId = await uploadAvatarToCloudinary(file, sig);
      await avatarApi.updateAvatar(publicId);
    },

    onMutate: async (file) => {
      await queryClient.cancelQueries({ queryKey: ['me'] });

      const previousUser = queryClient.getQueryData(['me']);

      const previewUrl = URL.createObjectURL(file);

      queryClient.setQueryData(['me'], (old: any) =>
        old ? { ...old, avatarUrl: previewUrl } : old,
      );

      return { previousUser, previewUrl };
    },

    onError: (_err, _file, ctx) => {
      if (ctx?.previewUrl) {
        URL.revokeObjectURL(ctx.previewUrl);
      }

      if (ctx?.previousUser) {
        queryClient.setQueryData(['me'], ctx.previousUser);
      }
    },

    onSuccess: (_data, _file, ctx) => {
      if (ctx?.previewUrl) {
        URL.revokeObjectURL(ctx.previewUrl);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
}
