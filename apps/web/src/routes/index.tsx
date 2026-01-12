import HomePage from '@/features/home/pages/HomePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});
