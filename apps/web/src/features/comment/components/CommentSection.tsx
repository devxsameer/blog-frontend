import { Link, useRouteLoaderData } from 'react-router';
import { buildTree } from '../comment.utils';
import type { Comment } from '../comment.types';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import type { RootLoaderData } from '@/app/root.loader';

export default function CommentsSection() {
  const { user } = useRouteLoaderData('root') as RootLoaderData;
  const data = useRouteLoaderData('comments') as {
    comments: Comment[];
  };

  const tree = buildTree(data.comments);

  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold">Comments</h2>
      {user ? (
        <CommentForm />
      ) : (
        <p className="text-sm text-neutral-600">
          <Link to="/auth/login" className="underline underline-offset-4">
            Log in
          </Link>{' '}
          to write a comment.
        </p>
      )}
      <CommentList tree={tree} />
    </section>
  );
}
