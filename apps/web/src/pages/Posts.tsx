import PostList from '@/features/post/components/PostList';
import type { postsLoader } from '@/features/post/post.loaders';
import { useLoaderData, Link } from 'react-router';

export default function PostsPage() {
  const { data, meta } = useLoaderData() as Awaited<
    ReturnType<typeof postsLoader>
  >;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Writing</h1>

      <PostList posts={data} />

      {meta?.nextCursor && (
        <div className="mt-10">
          <Link to={`?cursor=${meta.nextCursor}`} className="text-sm underline">
            Load more
          </Link>
        </div>
      )}
    </div>
  );
}
