import LoginPage from '@/features/auth/pages/LoginPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/login')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/' });
    }
  },
  component: LoginPage,
});
