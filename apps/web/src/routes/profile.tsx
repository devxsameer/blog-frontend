import ProfilePage from '@/features/profile/pages/ProfilePage';
import { canonical, pageTitle } from '@/shared/utils/seo';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  head: () => ({
    meta: [{ title: pageTitle('Your Profile') }],
    links: [canonical('/profile')],
  }),
  component: ProfilePage,
});
