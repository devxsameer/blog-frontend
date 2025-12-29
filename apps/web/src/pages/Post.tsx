import { Outlet, useRouteLoaderData } from 'react-router';
import type { postLoader } from '@/features/post/post.loaders';
import PostMeta from '@/features/post/components/PostMeta';
import PostContent from '@/features/post/components/PostContent';
import CommentsSection from '@/features/comment/components/CommentSection';

export default function PostPage() {

  const { post } = useRouteLoaderData('post') as Awaited<
    ReturnType<typeof postLoader>
  >;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="">
        <PostMeta post={post} />
        <PostContent post={post} />
        {/* <PostActions postId={post.id} /> */}

        <CommentsSection />
        <Outlet />
      </div>
    </div>
  );
}
