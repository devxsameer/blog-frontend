// web/src/app/router.tsx
import { DashBoardLayout } from '@/layouts/dashboard-layout';
import Dashboard from '@/pages/Dashboard';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: DashBoardLayout,
    children: [{ index: true, Component: Dashboard }],
  },
]);
