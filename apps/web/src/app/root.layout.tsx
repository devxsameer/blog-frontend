import Header from '@/layouts/components/Header';
import Footer from '@/layouts/components/Footer';
import { HeadContent, Outlet } from '@tanstack/react-router';

export function RootLayout() {
  return (
    <>
      <HeadContent />
      <div className="font-outfit flex min-h-screen flex-col hover:col-auto">
        <Header />
        <div className="mx-auto min-h-screen w-full max-w-6xl p-4 py-6">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
