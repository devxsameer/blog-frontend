import type { User } from '@blog/types';
import { usersApi } from '@blog/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function UserRow({ user }: { user: User }) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (input: Partial<User>) => usersApi.update(user.id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['admin-users'],
      });
    },
  });

  return (
    <tr>
      <td className="font-medium">{user.username}</td>
      <td>{user.email}</td>

      <td>
        <select
          className="select select-xs"
          value={user.role}
          disabled={user.isReadOnly}
          onChange={(e) =>
            updateMutation.mutate({
              role: e.target.value as User['role'],
            })
          }
        >
          <option value="user">User</option>
          <option value="author">Author</option>
          <option value="admin">Admin</option>
        </select>
      </td>

      <td>
        {user.emailVerifiedAt ? (
          <span className="badge badge-success">Verified</span>
        ) : (
          <span className="badge badge-warning">Unverified</span>
        )}
      </td>

      <td>
        <button
          className={`btn btn-xs ${
            user.isActive ? 'btn-outline' : 'btn-error'
          }`}
          onClick={() =>
            updateMutation.mutate({
              isActive: !user.isActive,
            })
          }
        >
          {user.isActive ? 'Disable' : 'Enable'}
        </button>
      </td>

      <td className="text-sm opacity-70">
        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
      </td>
    </tr>
  );
}
