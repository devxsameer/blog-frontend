import { useRouteContext } from '@tanstack/react-router';
import { useUpdateProfile } from '../mutations/update-profile.mutation';
import { useState } from 'react';

export default function ProfilePage() {
  const { user } = useRouteContext({ from: '__root__' });
  const [bio, setBio] = useState(user?.bio ?? '');
  const updateProfile = useUpdateProfile();

  if (!user) {
    return (
      <div className="alert alert-warning">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8 py-10">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold">Your profile</h1>
        <p className="text-base-content/70">
          Account details associated with your activity.
        </p>
      </header>

      {/* Identity */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body flex gap-6 sm:flex-row">
          {user?.avatarUrl ? (
            <div className="avatar">
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="h-16 w-16 rounded-full"
              />
            </div>
          ) : (
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-16 rounded-full text-xl font-semibold">
                {user?.username.charAt(0).toUpperCase()}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-sm text-neutral-600">{user.email}</p>

            <div className="flex gap-2 pt-1">
              <span className="badge badge-outline capitalize">
                {user.role}
              </span>

              {user.emailVerifiedAt ? (
                <span className="badge badge-success">Verified</span>
              ) : (
                <span className="badge badge-warning">Email not verified</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Meta */}
      <div className="text-sm text-neutral-500">
        Member since{' '}
        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
      </div>

      {/* Bio */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="font-semibold">Bio</h3>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile.mutate({ bio: bio.trim() || null });
            }}
          >
            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio about yourself…"
              disabled={updateProfile.isPending}
            />
            {updateProfile.isError && (
              <p className="text-sm text-red-500">
                Failed to update profile. Please try again.
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updateProfile.isPending}
                className="btn btn-neutral btn-sm"
              >
                {updateProfile.isPending ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
