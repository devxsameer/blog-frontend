import { useState } from 'react';
import type { User } from '@blog/types';
import { ValidationError } from '@blog/api-client';
import { useUpdateProfile } from '../mutations/update-profile.mutation';

export default function ProfileForm({ user }: { user: User }) {
  const updateProfile = useUpdateProfile();

  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio ?? '');
  const [error, setError] = useState<ValidationError | null>(null);

  const hasChanges = username !== user.username || bio !== (user.bio ?? '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!hasChanges) return;

    setError(null);

    updateProfile.mutate(
      {
        username,
        bio: bio || null,
      },
      {
        onError: (err) => {
          if (err instanceof ValidationError) {
            setError(err);
          }
        },
      },
    );
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
        />
      </label>

      <label className="fieldset">
        <span className="fieldset-label font-semibold">Bio</span>
        <textarea
          className="textarea textarea-bordered w-full"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="btn btn-neutral"
        disabled={!hasChanges || updateProfile.isPending}
      >
        {updateProfile.isPending ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  );
}
