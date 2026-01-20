import HomePage from '@/features/home/pages/HomePage';
import { canonical, pageTitle } from '@/shared/utils/seo';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title: pageTitle('Home') }],
    links: [canonical('/')],
  }),
  component: HomePage,
});
