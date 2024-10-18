import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SelectDashboard = () => {
  const { user } = useAuth();

  // Vérification des rôles
  const hasSuperAdminRole = user?.roles.some(
    (role: { name: string }) => role.name === "superAdmin"
  );
  const hasStafRole = user?.roles.some(
    (role: { name: string }) => role.name === "staf"
  );
  const hasFrontDeskRole = user?.roles.some(
    (role: { name: string }) => role.name === "frontDesk"
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="p-8 bg-gray-300 flex flex-col items-center justify-center mx-10 my-20 rounded-sm shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-gray-950">
          Choisissez un tableau de bord
        </h1>
        <ul className="w-full max-w-md space-y-4">
          {/* Super Admin Dashboard */}
          {hasSuperAdminRole && (
            <li>
              <Link
                to="/super-admin-dashboard"
                className="block p-4 bg-gray-700 text-white text-center rounded-sm shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600"
              >
                Super Admin Dashboard
              </Link>
            </li>
          )}

          {/* Staf Dashboard */}
          {hasStafRole && (
            <li>
              <Link
                to="/staf-dashboard"
                className="block p-4 bg-gray-700 text-white text-center rounded-sm shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600"
              >
                Staf Dashboard
              </Link>
            </li>
          )}

          {/* Front Desk Dashboard */}
          {hasFrontDeskRole && (
            <li>
              <Link
                to="/front-desck-dashboard"
                className="block p-4 bg-gray-700 text-white text-center rounded-sm shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600"
              >
                Front Desk Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SelectDashboard;
