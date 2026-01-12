import { DashBoardLayout } from '@/layouts/DashboardLayout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.user || !['admin', 'author'].includes(context.user.role)) {
      throw redirect({ to: '/login' });
    }
  },
  component: DashBoardLayout,
});
