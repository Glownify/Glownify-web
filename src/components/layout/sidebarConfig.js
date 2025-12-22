import {
  LayoutDashboard,
  Grid,
  Settings,
  MapPin,
  User,
  Scissors,
} from "lucide-react";

export const SIDEBAR_CONFIG = {
  super_admin: {
    basePath: "/super-admin",
    avatar: "AD",
    menu: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { name: "Manage Saloons", icon: Scissors, path: "/manage-saloons" },
      { name: "Manage Categories", icon: Grid, path: "/manage-categories" },
      { name: "Manage Users", icon: User, path: "/manage-users" },
      { name: "Manage Cities & States", icon: MapPin, path: "/manage-cities-and-states" },
      { name: "Manage Sales Executives", icon: User, path: "/manage-sales-executives" },
      { name: "Manage Reset Password", icon: Settings, path: "/manage-reset-password" },
      { isSeparator: true },
      { name: "Profile", icon: Settings, path: "/profile" },
    ],
  },

  sales_executive: {
    basePath: "/sales-executive",
    avatar: "SE",
    menu: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { name: "Manage Salesmen", icon: Scissors, path: "/manage-salesmen" },
      { isSeparator: true },
      { name: "Profile", icon: Settings, path: "/profile" },
    ],
  },
};
