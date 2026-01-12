import { useRouteContext } from '@tanstack/react-router';

export default function ProfilePage() {
  const { user } = useRouteContext({ from: '__root__' });

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Profile</h1>

      {/* User info */}
      <div className="mt-6 rounded border p-4">
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500">Username</span>
            <div className="font-medium">{user?.username}</div>
          </div>

          <div>
            <span className="text-gray-500">Email</span>
            <div className="font-medium">{user?.email}</div>
          </div>

          {user?.createdAt && (
            <div>
              <span className="text-gray-500">Member since</span>
              <div className="font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comments placeholder */}
      <div className="mt-10">
        <h2 className="text-lg font-medium">Your comments</h2>

        <p className="mt-2 text-sm text-gray-500">
          Comments you've written on posts will appear here.
        </p>

        {/* Later: comments list */}
      </div>
    </div>
  );
}
