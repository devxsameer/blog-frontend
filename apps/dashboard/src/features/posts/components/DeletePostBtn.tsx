import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import { postsApi } from '@blog/api-client';

type Props = {
  slug: string;
};

export default function DeletePostButton({ slug }: Props) {
  const [open, setOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await postsApi.delete(slug);
    },
    onSuccess: () => {
      setOpen(false);
    },
  });

  return (
    <>
      <button
        className="btn btn-ghost btn-sm text-error"
        onClick={() => setOpen(true)}
      >
        Delete
      </button>

      <ConfirmDialog
        open={open}
        title="Delete post?"
        description="This action cannot be undone."
        confirmText="Delete"
        loading={deleteMutation.isPending}
        onClose={() => setOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
      />
    </>
  );
}
