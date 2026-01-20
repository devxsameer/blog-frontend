import LoginPage from '@/features/auth/pages/LoginPage';
import { canonical, pageTitle } from '@/shared/utils/seo';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/login')({
  head: () => ({
    meta: [{ title: pageTitle('Login') }],
    links: [canonical('/auth/login')],
  }),
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/' });
    }
  },
  component: LoginPage,
});
