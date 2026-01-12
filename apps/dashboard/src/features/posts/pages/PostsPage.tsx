// dashboard/src/features/posts/pages/Posts.tsx
import { Link, useRouter } from '@tanstack/react-router';
import PostsTable from '../components/PostsTable';
import { postsApi } from '@blog/api-client';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { PostsSearch } from '../posts.types';
import { Route } from '@/routes/dashboard/posts';

type PostsSearchKey = keyof PostsSearch;

function asOrder(value: string): 'asc' | 'desc' | undefined {
  if (value === 'asc' || value === 'desc') return value;
  return undefined;
}

function asSort(value: string): PostsSearch['sort'] {
  if (value === 'createdAt' || value === 'updatedAt' || value === 'publishedAt')
    return value;
  return undefined;
}

function asStatus(value: string): PostsSearch['status'] {
  if (value === 'draft' || value === 'published' || value === 'archived')
    return value;
  return undefined;
}

export default function PostsPage() {
  const router = useRouter();

  const { user } = Route.useRouteContext();
  const search = Route.useSearch();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['dashboard-posts', search],
      queryFn: ({ pageParam }) =>
        postsApi.listDashboard({
          ...search,
          cursor: pageParam,
        }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.meta?.nextCursor,
    });

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  function updateQuery<K extends PostsSearchKey>(
    key: K,
    value?: PostsSearch[K],
  ) {
    router.navigate({
      to: '/dashboard/posts',
      search: (prev: PostsSearch) => {
        const next = {
          ...prev,
        };

        if (value !== undefined) {
          next[key] = value;
        } else {
          delete next[key];
        }

        return next;
      },
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
          <p className="text-base-content/70">
            {user?.role === 'admin'
              ? 'You are admin and can edit/delete any post'
              : 'You are author and can edit/delete your posts'}
          </p>
        </div>

        <Link to={'/dashboard/posts/create'} className="btn btn-neutral">
          Create Post
        </Link>
      </header>

      {/* Filters */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body flex-row flex-wrap gap-4">
          <select
            className="select select-bordered"
            value={search.status ?? ''}
            onChange={(e) => updateQuery('status', asStatus(e.target.value))}
          >
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <select
            className="select select-bordered"
            value={search.sort ?? ''}
            onChange={(e) => updateQuery('sort', asSort(e.target.value))}
          >
            <option value="">Sort by</option>
            <option value="createdAt">Created</option>
            <option value="updatedAt">Updated</option>
          </select>

          <select
            className="select select-bordered"
            value={search.order ?? ''}
            onChange={(e) => updateQuery('order', asOrder(e.target.value))}
          >
            <option value="">Order</option>
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body overflow-x-auto">
          <PostsTable posts={posts} />

          {hasNextPage && (
            <div className="flex justify-center">
              <button
                className="btn btn-outline"
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? 'Loading…' : 'Load more'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
