import { Outlet } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';

const LayoutComponent = () => {
  return (
    <div className="py-4 px-6 flex flex-col min-h-screen">
      <HeaderComponent />
      <Outlet />
    </div>
  );
};

export default LayoutComponent;
