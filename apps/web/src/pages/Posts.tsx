import PostList from '@/features/post/components/PostList';
import type { postsLoader } from '@/features/post/post.loaders';
import { useLoaderData, Link } from 'react-router';

export default function PostsPage() {
  const { data, meta } = useLoaderData() as Awaited<
    ReturnType<typeof postsLoader>
  >;

  return (
    <div>
      <h1 className="text-4xl font-semibold">Writing</h1>

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
