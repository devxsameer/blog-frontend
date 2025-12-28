// web/src/app/router.tsx
import HomePage from '@/pages/Home';
import { createBrowserRouter } from 'react-router';
import { RootLayout } from './root-layout';
import AuthPage from '@/pages/Auth';
import { loginAction, signupAction } from '@/features/auth/actions';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: 'auth',
        Component: AuthPage,
        children: [
          { path: 'login', action: loginAction },
          { path: 'signup', action: signupAction },
        ],
      },
    ],
  },
]);
