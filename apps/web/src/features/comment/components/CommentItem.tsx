import { useRouteLoaderData } from 'react-router';
import type { CommentNode } from '../comment.types';
import CommentForm from './CommentForm';
import type { RootLoaderData } from '@/app/root.loader';

export default function CommentItem({ comment }: { comment: CommentNode }) {
  const { user } = useRouteLoaderData('root') as RootLoaderData;

  return (
    <div className="space-y-2 border-l pl-4">
      <div className="text-sm">
        <span className="font-medium">{comment.authorId}</span>
        <p className="mt-1">{comment.content}</p>
      </div>

      {user && <CommentForm parentId={comment.id} />}

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
