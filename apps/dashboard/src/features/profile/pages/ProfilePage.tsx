import IdentityInfo from '../components/IdentityInfo';
import ProfileForm from '../components/ProfileForm';
import { useAuth } from '@/features/auth/auth.query';

export default function ProfilePage() {
  const { data: user } = useAuth();

  if (!user) {
    return (
      <div className="alert alert-warning">
        Unable to load profile information.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-base-content/60 text-sm">
          Manage your account information
        </p>
      </header>

      {/* Identity */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body space-y-6">
          <IdentityInfo user={user} />
        </div>
      </div>

      {/* Profile settings */}
      <div className="card bg-base-100 shadow-sm">
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
