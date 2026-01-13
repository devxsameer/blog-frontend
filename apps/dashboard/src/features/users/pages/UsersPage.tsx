import { useInfiniteQuery } from '@tanstack/react-query';
import { usersApi } from '@blog/api-client';
import UsersTable from '../components/UsersTable';
import { Route } from '@/routes/dashboard/users';
import { useRouter } from '@tanstack/react-router';

export default function UsersPage() {
  const search = Route.useSearch();
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['admin-users', search],
      queryFn: ({ pageParam }) =>
        usersApi.list({
          cursor: pageParam,
          role: search.role,
          isActive: search.isActive,
        }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.meta?.nextCursor,
    });

  const users = data?.pages.flatMap((p) => p.data) ?? [];

  function updateSearch(key: 'role' | 'isActive', value?: any) {
    router.navigate({
      to: '/dashboard/users',
      search: (prev) => {
        const next = { ...prev };
        if (value === undefined) delete next[key];
        else next[key] = value;
        return next;
      },
    });
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-base-content/70">
          Admin-only view of platform users.
        </p>
      </header>

      {/* Filters */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body flex-row gap-4">
          <select
            className="select select-bordered"
            value={search.role ?? ''}
            onChange={(e) => updateSearch('role', e.target.value || undefined)}
          >
            <option value="">All roles</option>
            <option value="admin">Admin</option>
            <option value="author">Author</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body overflow-x-auto">
          <UsersTable users={users} />

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
