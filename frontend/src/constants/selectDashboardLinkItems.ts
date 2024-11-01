import { MenuItemPorps } from "../interfaces/MenuInterface";

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
