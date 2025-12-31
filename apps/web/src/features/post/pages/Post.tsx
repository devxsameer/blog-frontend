import { Outlet, useRouteLoaderData } from 'react-router';
import type { postLoader } from '@/features/post/loaders';
import PostContent from '@/features/post/components/PostContent';
import CommentsSection from '../comment/components/CommentSection';

export default function PostPage() {
  const { post } = useRouteLoaderData('post') as Awaited<
    ReturnType<typeof postLoader>
  >;

  return (
    <>
      <div>
        <PostContent post={post} />
        <CommentsSection />
        <Outlet />
      </div>
    </>
  );
}
