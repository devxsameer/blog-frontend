import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { useAuth } from '@/features/auth/auth.query';
import { useEffect } from 'react';

export function AuthRouterProvider() {
  const { data: user, isFetching } = useAuth();

  useEffect(() => {
    if (!isFetching) {
      router.invalidate();
    }
  }, [isFetching, user]);

  if (!user && isFetching) {
    return (
      <div className="fixed inset-0 grid place-items-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return <RouterProvider router={router} context={{ user }} />;
}
