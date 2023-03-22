import React from "react";
import { Outlet } from "react-router-dom";

const MainLayoutes = () => {
  return (
    <div className="dark:bg-gray-900 min-h-[100vh] pt-20 px-20">
      <Outlet />
    </div>
  );
};

export default MainLayoutes;
