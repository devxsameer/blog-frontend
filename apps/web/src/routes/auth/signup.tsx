import SignupPage from '@/features/auth/pages/SignupPage';
import { canonical, pageTitle } from '@/shared/utils/seo';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/signup')({
  head: () => ({
    meta: [{ title: pageTitle('Create Account') }],
    links: [canonical('/auth/signup')],
  }),
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/' });
    }
  },
  component: SignupPage,
});
