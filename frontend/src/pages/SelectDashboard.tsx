import { useAuth } from "../hooks/useAuth";
import SelectDashboardLink from "../components/SelectDashboardLink";
import { selectDashboardLinkItems } from "../constants/appContants";

const SelectDashboard = () => {
  const { user } = useAuth();

  // Récupérer les rôles de l'utilisateur
  const roles = user?.roles.map((role) => role.name) || [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="p-8 bg-gray-300 flex flex-col items-center justify-center mx-10 my-20 rounded-sm shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-gray-950">
          Choisissez un tableau de bord
        </h1>
        <ul className="w-full max-w-md space-y-4">
          {selectDashboardLinkItems.map(
            ({ role, items }) =>
              roles.includes(role) &&
              items.map((item) => (
                <li key={item.to}>
                  <SelectDashboardLink to={item.to} label={item.label} />
                </li>
              ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default SelectDashboard;
