import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { useAuth } from '@/features/auth/auth.query';
import { useEffect } from 'react';

export function AuthRouterProvider() {
  const { data: user } = useAuth();

  useEffect(() => {
    router.invalidate();
  }, [user]);

  return <RouterProvider router={router} context={{ user }} />;
}
