import { Link } from "react-router-dom";
import { MenuItemPorps } from "../interfaces/MenuInterface";

const StafDashboard = () => {
  const stafMenuItems: MenuItemPorps[] = [
    {
      label: "Dashboard",
      to: "/staf-dashboard",
      icon: "dashboard_customize",
    },
    {
      label: "Calendrier",
      to: "/staf-dashboard/calendar",
      icon: "calendar_month",
    },
  ];

  return (
    <ul>
      {stafMenuItems.map((item) => (
        <li key={item.label} className="w-full">
          <Link
            to={item.to}
            className="hover:bg-gray-200 flex items-center gap-2 w-full py-1 px-4"
            replace
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "15px" }}
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

export default StafDashboard;
