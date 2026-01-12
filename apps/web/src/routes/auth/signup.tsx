import SignupPage from '@/features/auth/pages/SignupPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/signup')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/' });
    }
  },
  component: SignupPage,
});
