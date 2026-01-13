import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi, ValidationError } from '@blog/api-client';
import type { User } from '@blog/types';

export default function ProfileForm({ user }: { user: User | null }) {
  const queryClient = useQueryClient();

  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio ?? '');
  const [error, setError] = useState<ValidationError | null>(null);

  const mutation = useMutation({
    mutationFn: async () =>
      usersApi.updateMe({
        username,
        bio: bio || null,
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
    },

    onError: (err) => {
      if (err instanceof ValidationError) {
        setError(err);
      } else {
        throw err;
      }
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    mutation.mutate();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error?.issues && (
        <div className="space-y-1">
          {error.issues.map((issue) => (
            <p key={issue.path} className="text-sm text-red-500">
              {issue.message}
            </p>
          ))}
        </div>
      )}

      <label className="fieldset">
        <span className="fieldset-label font-semibold">Username</span>
        <input
          className="input w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label className="fieldset">
        <span className="fieldset-label font-semibold">Bio</span>
        <textarea
          className="textarea textarea-bordered"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="btn btn-neutral"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  );
}
