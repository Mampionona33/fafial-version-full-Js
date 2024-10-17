import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="bg-gray-950 text-white p-4 flex justify-end items-center px-2 py-2 fixed top-0 left-0 right-0 z-50">
      <button
        onClick={handleLogout}
        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-1 px-8 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
