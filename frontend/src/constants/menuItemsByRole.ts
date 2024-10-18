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
    {
      label: "journal des caisses",
      to: "/staf-dashboard/journal-des-caisses",
      icon: "receipt_long",
    },
    {
      label: "salles",
      to: "/staf-dashboard/salles",
      icon: "meeting_room",
    },
    {
      label: "utilisateurs",
      to: "/staf-dashboard/utilisateurs",
      icon: "people",
    },
    {
      label: "paramatres",
      to: "/staf-dashboard/paramatres",
      icon: "settings",
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
