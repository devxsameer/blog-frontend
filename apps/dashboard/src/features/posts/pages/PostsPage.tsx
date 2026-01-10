// dashboard/src/features/posts/pages/Posts.tsx
import { Link, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  postsIndexRoute,
  type PostsSearch,
} from '@/routes/dashboard/posts/posts-index.route';
import { dashboardRoute } from '@/routes/dashboard/dashboard.route';
import PostsTable from '../components/PostsTable';

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

  const { user } = dashboardRoute.useRouteContext();
  const search = postsIndexRoute.useSearch();
  const data = postsIndexRoute.useLoaderData();

  const [posts, setPosts] = useState(data.data);
  const [nextCursor, setNextCursor] = useState(data.meta?.nextCursor);

  // Reset when filters change
  useEffect(() => {
    setPosts(data.data);
    setNextCursor(data.meta?.nextCursor);
  }, [data]);

  const loadMore = async () => {
    if (!nextCursor) return;

    await router.navigate({
      to: postsIndexRoute.to,
      search: (prev: PostsSearch) => ({
        ...prev,
        cursor: nextCursor,
      }),
      replace: false,
    });
  };

  function updateQuery<K extends PostsSearchKey>(
    key: K,
    value?: PostsSearch[K],
  ) {
    router.navigate({
      to: postsIndexRoute.to,
      search: (prev: PostsSearch) => {
        const next: PostsSearch = {
          ...prev,
          cursor: undefined, // reset pagination
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
            {user.role === 'admin'
              ? 'You are admin and can edit/delete any post'
              : 'You are author and can edit/delete your posts'}
          </p>
        </div>

        <Link to="/dashboard/posts/create" className="btn btn-neutral">
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

          {nextCursor && (
            <div className="flex justify-center">
              <button className="btn btn-outline" onClick={loadMore}>
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
