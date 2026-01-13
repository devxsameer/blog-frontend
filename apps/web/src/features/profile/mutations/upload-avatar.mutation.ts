import { avatarApi, uploadAvatarToCloudinary } from '@blog/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const sig = await avatarApi.getUploadSignature();
      const url = await uploadAvatarToCloudinary(file, sig);
      await avatarApi.updateAvatar(url);
      return url;
    },

    onSuccess: (avatarUrl) => {
      queryClient.setQueryData(['me'], (old: any) =>
        old ? { ...old, avatarUrl } : old,
      );
    },
  });
}
