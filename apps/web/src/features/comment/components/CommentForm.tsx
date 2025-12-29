import { useFetcher } from 'react-router';

export default function CommentForm({ parentId }: { parentId?: string }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  return (
    <fetcher.Form method="post" action="comments" className="mt-4">
      <input type="hidden" name="parentId" value={parentId ?? ''} />

      <textarea
        name="content"
        required
        className="w-full rounded border p-2"
        placeholder={parentId ? 'Write a reply…' : 'Write a comment…'}
      />

      <button disabled={isSubmitting} className="mt-2 text-sm underline">
        {isSubmitting ? 'Posting…' : 'Post'}
      </button>
    </fetcher.Form>
  );
}
