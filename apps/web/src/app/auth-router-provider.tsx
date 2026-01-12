import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { useAuthQuery } from '@/features/auth/auth.query';
import { useEffect } from 'react';

export function AuthRouterProvider() {
  const { data: user, isFetching } = useAuthQuery();

  useEffect(() => {
    if (!isFetching) {
      router.invalidate();
    }
  }, [isFetching, user]);

  if (isFetching) {
    return (
      <div className="fixed inset-0 grid place-items-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return <RouterProvider router={router} context={{ user }} />;
}
