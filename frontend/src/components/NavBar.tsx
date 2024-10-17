import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import AppSidebar from "./AppSidebar";

const NavBar = () => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-end items-center px-2 py-2 fixed top-0 left-0 right-0  h-14">
      <div className="flex gap-4 justify-between w-full">
        <button
          onClick={() => setSidebarVisible(true)}
          className="bg-gray-600 flex h-8 w-8 text-center justify-center items-center  hover:bg-gray-500 text-white font-bold py-1 px-8 rounded"
        >
          <span className="material-symbols-outlined text-center">menu</span>
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-8 rounded"
        >
          Logout
        </button>
      </div>

      <AppSidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
      />
    </div>
  );
};

export default NavBar;
