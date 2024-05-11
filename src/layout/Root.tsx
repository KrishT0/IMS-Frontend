import { FC } from "react";
import { Outlet } from "react-router-dom";

const Root: FC = () => {
  return (
    <div className="max-w-[1000px] h-[100vh] border-2 mx-auto">
      <Outlet />
    </div>
  );
};

export default Root;
