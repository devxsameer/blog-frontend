import PostContent from '@/features/post/components/PostContent';
import CommentsSection from '../../comment/components/CommentSection';
import Breadcrumbs from '@/shared/components/Breadcrumbs';
import { usePost } from '../queries/post.query';
import { usePostComments } from '../../comment/queries/comments.query';
import { useParams } from '@tanstack/react-router';

export default function PostPage() {
  const { postSlug } = useParams({ from: '/posts/$postSlug' });

  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
  } = usePost(postSlug);

  const { data: comments, isLoading: commentsLoading } =
    usePostComments(postSlug);

  if (postLoading) {
    return (
      <div className="grid min-h-[40vh] place-items-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (postError || !post) {
    return <div className="alert alert-error">Post not found.</div>;
  }

  return (
    <>
      <Breadcrumbs dynamicLabel={post.title} />
      <div>
        <PostContent post={post} />
        {commentsLoading ? (
          <div className="text-sm text-neutral-500">Loading comments…</div>
        ) : (
          <CommentsSection postSlug={postSlug} comments={comments ?? []} />
        )}
      </div>
    </>
  );
}
