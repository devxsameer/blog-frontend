import PostList from '@/features/post/components/PostList';
import { useInfinitePosts } from '../queries/posts.query';

export default function PostsPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfinitePosts();

  if (isLoading) {
    return (
      <div className="grid min-h-[40vh] place-items-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (isError) {
    return <div className="alert alert-error">Failed to load posts.</div>;
  }

  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <div className="flex min-h-[60vh] gap-16">
      <div className="max-w-prose">
        <h1 className="text-3xl font-semibold">Writing</h1>

        <PostList posts={posts} />

        {hasNextPage && (
          <div className="mt-10 flex justify-center">
            <button
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              className="btn btn-block max-w-sm"
            >
              {isFetchingNextPage ? 'Loading…' : 'Show more'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
