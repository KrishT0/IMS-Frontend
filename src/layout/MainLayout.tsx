import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout: FC = () => {
  return (
    <div className="max-w-[1000px] h-[100vh] border-2 mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
