import type { User } from '@blog/types';
import { useUploadAvatar } from '../mutations/upload-avatar.mutation';
import { Avatar } from '@/shared/components/Avatar';

function IdentityInfo({ user }: { user: User }) {
  const uploadAvatar = useUploadAvatar();
  return (
    <>
      <div className="flex items-start gap-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar src={user.avatarUrl} name={user.username} size={80} />
          <label className="btn btn-block btn-xs btn-outline cursor-pointer self-start">
            {uploadAvatar.isPending ? 'Uploading…' : 'Change avatar'}
            <input
              type="file"
              hidden
              accept="image/png,image/jpeg,image/webp"
              disabled={uploadAvatar.isPending}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  uploadAvatar.mutate(file);
                }
              }}
            />
          </label>
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold">{user.username}</h2>
          <p className="text-base-content/70 text-sm">{user.email}</p>

          <div className="flex gap-2 pt-1">
            <span
              className={`badge text-xs capitalize ${
                user.role === 'admin'
                  ? 'badge-error'
                  : user.role === 'author'
                    ? 'badge-primary'
                    : 'badge-ghost'
              }`}
            >
              {user.role}
            </span>

            {user.emailVerifiedAt ? (
              <span className="badge badge-success text-xs">Verified</span>
            ) : (
              <span className="badge badge-warning text-xs">Unverified</span>
            )}
          </div>
        </div>
      </div>
      {uploadAvatar.isError && (
        <p className="text-center text-xs text-red-500">
          {(uploadAvatar.error as Error).message}
        </p>
      )}
      <div>
        <h3 className="mb-1 font-semibold">Bio</h3>

        {user?.bio ? (
          <p className="text-base-content/80 leading-relaxed">{user.bio}</p>
        ) : (
          <p className="text-base-content/50 italic">No bio provided</p>
        )}
      </div>

      <div className="divider" />

      {/* Meta */}
      <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
        <div>
          <span className="text-base-content/60 block">User ID</span>
          <span className="font-mono text-xs">{user.id}</span>
        </div>

        {user.createdAt && (
          <div>
            <span className="text-base-content/60 block">Joined</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default IdentityInfo;
