import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';

export function DashBoardLayout() {
  return (
    <div className="font-outfit">
      <div className="drawer lg:drawer-open">
        <div className="drawer-content bg-base-200 flex flex-col">
          <Header />
          <Outlet />
          <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
