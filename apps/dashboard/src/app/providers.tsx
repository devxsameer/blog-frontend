// dashboard/src/app/providers.tsx
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query-client';

export function AppProviders() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}
