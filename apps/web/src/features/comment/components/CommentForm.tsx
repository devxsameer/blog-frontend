import { useRef } from 'react';
import { useCreateComment } from '../mutations/create-comment.mutation';

export default function CommentForm({
  postSlug,
  parentId,
  onSuccess,
}: {
  postSlug: string;
  parentId?: string;
  onSuccess?: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mutation = useCreateComment(postSlug);

  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        const content = textareaRef.current?.value.trim();
        if (!content) return;

        mutation.mutate(
          { content, parentId },
          {
            onSuccess: () => {
              if (textareaRef.current) textareaRef.current.value = '';
              onSuccess?.();
            },
          },
        );
      }}
    >
      <textarea
        ref={textareaRef}
        disabled={mutation.isPending}
        required
        className="textarea w-full"
        placeholder={parentId ? 'Write a reply…' : 'Write a comment…'}
      />

      <button disabled={mutation.isPending} className="btn btn-sm mt-3">
        {mutation.isPending ? 'Posting…' : 'Post'}
      </button>
    </form>
  );
}
