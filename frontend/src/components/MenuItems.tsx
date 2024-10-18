import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { menuItemsByRole } from "../constants/appContants";
import RoleChecker from "../utils/RoleChecker"; // Importer la classe RoleChecker

const MenuItems = () => {
  const { user } = useAuth();

  // Fonction pour générer les items de menu en fonction des rôles
  const getMenuItems = () => {
    const items = [];
    const roles = user?.roles || [];

    // Ajout d'un lien vers "/select-dashboard" si l'utilisateur a plusieurs rôles
    if (RoleChecker.getUserRolesLength(user!) > 1) {
      items.push({
        label: "Sélectionner le tableau de bord",
        to: "/select-dashboard",
        icon: "dashboard_customize", // Vous pouvez choisir une icône appropriée
      });
    }

    for (const role of roles) {
      const roleName = role.name;
      if (menuItemsByRole[roleName]) {
        items.push(...menuItemsByRole[roleName]);
      }
    }

    return items;
  };

  const menuItems = getMenuItems();

  return (
    <ul>
      {menuItems.map((item) => (
        <li key={item.to} className="w-full">
          <Link
            to={item.to}
            className="hover:bg-gray-200 flex items-center gap-2 w-full py-1 px-4"
            replace
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "15px" }}
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
