import PostContent from '@/features/post/components/PostContent';
import CommentsSection from '../../comment/components/CommentSection';
import Breadcrumbs from '@/shared/components/Breadcrumbs';
import { usePostComments } from '../../comment/queries/comments.query';
import { useLoaderData, useParams } from '@tanstack/react-router';

export default function PostPage() {
  const { post } = useLoaderData({ from: '/posts/$postSlug' });
  const { postSlug } = useParams({ from: '/posts/$postSlug' });

  const { data: comments, isLoading: commentsLoading } =
    usePostComments(postSlug);

  return (
    <div>
      <Breadcrumbs dynamicLabel={post.title} />
      <div>
        <PostContent post={post} />
        {commentsLoading ? (
          <div className="text-sm text-neutral-500">Loading comments…</div>
        ) : (
          <CommentsSection postSlug={postSlug} comments={comments ?? []} />
        )}
      </div>
    </div>
  );
}
