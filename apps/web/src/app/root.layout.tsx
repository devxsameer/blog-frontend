// web/src/app/root-layout.tsx
import Header from '@/layouts/Header';
import { Outlet } from 'react-router';
import ScrollToTop from './ScrollToTop';
import Footer from '@/layouts/Footer';

export function RootLayout() {
  return (
    <div className="font-outfit flex min-h-screen flex-col hover:col-auto">
      <ScrollToTop />
      <Header />
      <div className="mx-auto w-full max-w-6xl p-4 py-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
