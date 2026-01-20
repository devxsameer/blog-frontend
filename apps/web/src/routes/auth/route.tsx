import AuthLayout from '@/layouts/AuthLayout';
import { canonical, pageTitle } from '@/shared/utils/seo';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  head: () => ({
    meta: [{ title: pageTitle('Authentication') }],
    links: [canonical('/auth')],
  }),
  component: AuthLayout,
});
