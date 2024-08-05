import { Outlet } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";

const LayoutComponent = () => {
  return (
    <div className="p-4 flex flex-col min-h-screen">
      <HeaderComponent/>
      <Outlet/>
    </div>
  );
};

export default LayoutComponent;