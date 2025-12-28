// web/src/app/router.tsx
import HomePage from '@/pages/Home';
import { createBrowserRouter } from 'react-router';
import { RootLayout } from './root-layout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [{ index: true, Component: HomePage }],
  },
]);
