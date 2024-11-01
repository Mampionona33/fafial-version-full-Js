import { MenuItemPorps } from "../interfaces/MenuInterface";

export const menuItemsByRole: { [key: string]: MenuItemPorps[] } = {
  superAdmin: [
    {
      label: "Dashboard",
      to: "/super-admin/dashboard",
      icon: "dashboard_customize",
    },
    { label: "Users", to: "/super-admin/users", icon: "people" },
  ],
  staf: [
    { label: "Dashboard", to: "/staf/dashboard", icon: "dashboard_customize" },
    {
      label: "Calendrier",
      to: "/staf/calendar",
      icon: "calendar_month",
    },
    {
      label: "journal des caisses",
      to: "/staf/journal-des-caisses",
      icon: "receipt_long",
    },
    {
      label: "salles",
      to: "/staf/salles",
      icon: "meeting_room",
    },
    {
      label: "utilisateurs",
      to: "/staf/utilisateurs",
      icon: "people",
    },
    {
      label: "paramatres",
      to: "/staf/paramatres",
      icon: "settings",
    },
  ],
  frontDesk: [
    {
      label: "Dashboard",
      to: "/front-desck/dashboard",
      icon: "dashboard_customize",
    },
    {
      label: "Reservations",
      to: "/front-desck/reservations",
      icon: "book",
    },
  ],
};
