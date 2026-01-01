import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="hero min-h-[80vh]">
      <div className="hero-content">
        <Outlet />
      </div>
    </div>
  );
}
