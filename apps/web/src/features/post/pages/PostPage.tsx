import PostContent from '@/features/post/components/PostContent';
import CommentsSection from '../../comment/components/CommentSection';
import Breadcrumbs from '@/shared/components/Breadcrumbs';
import { usePostComments } from '../../comment/queries/comments.query';
import { useLoaderData } from '@tanstack/react-router';
import { usePost } from '../queries/post.query';

export default function PostPage() {
  const { post: initialPost } = useLoaderData({ from: '/posts/$postSlug' });

  const { data: post } = usePost(initialPost);

  if (!post) return null;

  const { data: comments, isLoading: commentsLoading } = usePostComments(
    post.slug,
  );

  return (
    <div>
      <Breadcrumbs dynamicLabel={post.title} />
      <div>
        <PostContent post={post} />
        {commentsLoading ? (
          <div className="text-sm text-neutral-500">Loading comments…</div>
        ) : (
          <CommentsSection postSlug={post.slug} comments={comments ?? []} />
        )}
      </div>
    </div>
  );
}
