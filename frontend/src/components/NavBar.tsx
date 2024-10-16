import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="bg-gray-950 text-white p-4 flex justify-end items-end px-2 py-2">
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
