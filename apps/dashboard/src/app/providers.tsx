// dashboard/src/app/providers.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query-client';
import { AuthRouterProvider } from './auth-router-provider';

export function AppProviders() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthRouterProvider />
      </QueryClientProvider>
    </>
  );
}
