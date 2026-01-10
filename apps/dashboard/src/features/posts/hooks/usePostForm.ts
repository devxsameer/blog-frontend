// dashboard/src/features/posts/hooks/usePostForm.ts
import { useMutation } from '@tanstack/react-query';
import { postsApi, ValidationError } from '@blog/api-client';
import type { PostInput } from '@blog/types';
import { useState } from 'react';

export function usePostForm(mode: 'create' | 'edit', slug?: string) {
  const [error, setError] = useState<ValidationError | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (input: PostInput) => {
      if (mode === 'create') return postsApi.create(input);
      if (!slug) throw new Error('Missing slug');
      return postsApi.update(slug, input);
    },

    onSuccess: () => {
      setShowSuccess(true);
    },

    onError: (err) => {
      if (err instanceof ValidationError) {
        setError(err);
      } else {
        throw err;
      }
    },
  });

  return {
    submit: mutation.mutate,
    isSubmitting: mutation.isPending,
    error,
    showSuccess,
    closeSuccess: () => setShowSuccess(false),
    result: mutation.data,
  };
}
