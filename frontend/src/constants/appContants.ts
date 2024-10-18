import { MenuItemPorps } from "../interfaces/MenuInterface";

export const BACKEND_URL = `${import.meta.env.VITE_API_END_POINT}/api/v1`;
export const COOKIE_NAME = import.meta.env.VITE_COOKIE_NAME || "auth_token";

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

// Associer les liens avec les rôles
export const selectDashboardLinkItems: {
  role: string;
  items: MenuItemPorps[];
}[] = [
  {
    role: "superAdmin",
    items: [
      {
        label: "Super Admin Dashboard",
        to: "/super-admin-dashboard",
      },
      {
        label: "Staf Dashboard",
        to: "/staf-dashboard",
      },
      {
        label: "Front Desk Dashboard",
        to: "/front-desck-dashboard",
      },
    ],
  },
  {
    role: "staf",
    items: [
      {
        label: "Staf Dashboard",
        to: "/staf-dashboard",
      },
    ],
  },
  {
    role: "frontDesk",
    items: [
      {
        label: "Front Desk Dashboard",
        to: "/front-desck-dashboard",
      },
    ],
  },
];
