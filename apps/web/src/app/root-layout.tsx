// web/src/app/root-layout.tsx
import Header from '@/layouts/Header';
import { Outlet } from 'react-router';

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col hover:col-auto">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
