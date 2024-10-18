import { MenuItemPorps } from "../interfaces/MenuInterface";

export const menuItemsByRole: { [key: string]: MenuItemPorps[] } = {
    superAdmin: [
      {
        label: "Dashboard",
        to: "/super-admin-dashboard",
        icon: "dashboard_customize",
      },
      { label: "Users", to: "/super-admin-dashboard/users", icon: "people" },
    ],
    staf: [
      { label: "Dashboard", to: "/staf-dashboard", icon: "dashboard_customize" },
      {
        label: "Calendrier",
        to: "/staf-dashboard/calendar",
        icon: "calendar_month",
      },
    ],
    frontDesk: [
      {
        label: "Dashboard",
        to: "/front-desck-dashboard",
        icon: "dashboard_customize",
      },
      {
        label: "Reservations",
        to: "/front-desck-dashboard/reservations",
        icon: "book",
      },
    ],
  };
  