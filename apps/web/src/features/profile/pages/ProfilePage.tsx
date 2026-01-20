import { useAuth } from '@/features/auth/auth.query';
import ProfileForm from '../components/ProfileForm';
import IdentityInfo from '../components/IdentityInfo';

export default function ProfilePage() {
  const { data: user } = useAuth();

  if (!user) {
    return (
      <div className="alert alert-warning">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold">Your profile</h1>
        <p className="text-base-content/70 text-sm">
          Account details associated with your activity.
        </p>
      </header>

      {/* Identity */}
      <div className="card bg-base-100 border-base-content/20 border shadow-sm">
        <div className="card-body space-y-6">
          <IdentityInfo user={user} />
        </div>
      </div>

      <div className="card bg-base-100 border-base-content/20 border shadow-sm">
        <div className="card-body space-y-6">
          <h2 className="text-base-content/80 text-base font-semibold">
            Edit profile
          </h2>
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}
