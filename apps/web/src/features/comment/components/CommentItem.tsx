import { useFetcher, useRouteLoaderData } from 'react-router';
import type { CommentNode } from '../comment.types';
import CommentForm from './CommentForm';
import type { RootLoaderData } from '@/app/root.loader';
import { useState } from 'react';

export default function CommentItem({ comment }: { comment: CommentNode }) {
  const { user } = useRouteLoaderData('root') as RootLoaderData;
  const fetcher = useFetcher();
  const [isReplying, setIsReplying] = useState(false);

  const canDelete = user && user.id === comment.author.id;

  return (
    <div className="space-y-2 border-l pl-4">
      <div className="text-sm">
        <span className="font-semibold">{comment.author.username}</span>
        <p className="my-1 text-neutral-600">{comment.content}</p>
        <div className="flex gap-3 text-xs text-neutral-500">
          <button
            type="button"
            disabled={!user}
            onClick={() => setIsReplying((p) => !p)}
          >
            Reply
          </button>

          {canDelete && (
            <fetcher.Form
              method="post"
              action={`comments/${comment.id}/delete`}
            >
              <button
                type="submit"
                className="text-red-600"
                disabled={fetcher.state === 'submitting'}
              >
                {fetcher.state === 'submitting' ? 'Deleting…' : 'Delete'}
              </button>
            </fetcher.Form>
          )}
        </div>
      </div>

      {user && isReplying && (
        <CommentForm
          parentId={comment.id}
          onSuccess={() => setIsReplying(false)}
        />
      )}

      {comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
