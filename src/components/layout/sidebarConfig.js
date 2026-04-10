import {
  LayoutGrid,
  LayoutDashboard,
  Grid,
  CalendarDays,
  BarChart2,
  Settings,
  MapPin,
  User,
  Scissors,
  Sparkles, // Added for AI features
  Users,
  CalendarCheck,
  BarChart3,
  Zap,
  Target,
  Wallet
} from "lucide-react";

export const SIDEBAR_CONFIG = {
  super_admin: {
    basePath: "/super-admin",
    avatar: "AD",
    menu: [
      { name: "MAIN MENU", isHeader: true },
      { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { name: "Manage Salons", icon: Scissors, path: "/manage-salons" },
      { name: "Manage Categories", icon: Grid, path: "/manage-categories" },
      { name: "Manage Users", icon: Users, path: "/manage-users" },
      { name: "Manage Cities & States", icon: MapPin, path: "/manage-cities-and-states" },
      { name: "Manage Sales Executives", icon: User, path: "/manage-sales-executives" },
      { name: "Manage Subscriptions", icon: Settings, path: "/manage-subscriptions" },
      { isSeparator: true },
      { name: "SYSTEM", isHeader: true },
      { name: "Reset Passwords", icon: Settings, path: "/manage-reset-password" },
      { name: "Profile", icon: User, path: "/profile" },
    ],
  },

  sales_executive: {
    basePath: "/sales-executive",
    avatar: "SE",
    menu: [
      { name: "MAIN MENU", isHeader: true },
      { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { name: "Lead Pipeline", icon: Zap, path: "/lead-pipeline" },
      { name: "My Targets", icon: Target, path: "/my-targets" },
      { name: "Sales Persons", icon: Users, path: "/manage-salesman" },
      { name: "My Commissions", icon: Wallet, path: "/my-commissions" },
      { isSeparator: true },
      { name: "SETTINGS", isHeader: true },
      { name: "Profile", icon: User, path: "/profile" },
    ],
  },

  salon_owner: {
    basePath: "/salon-owner",
    avatar: "SO",
    menu: [
      { name: "MAIN MENU", isHeader: true },
      { name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
      { name: "Booking", icon: CalendarDays, path: "/bookings" },
      { name: "Poster Making", icon: Sparkles, path: "/marketing" },
      { name: "View Reports", icon: BarChart2, path: "/reports" },
      { isSeparator: true },
      { name: "Profile", icon: User, path: "/profile" },
    ],
  },

  salesman: {
    basePath: "/salesman",
    avatar: "SM",
    menu: [
      { name: "MAIN MENU", isHeader: true },
      { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { name: "My Saloons", icon: Scissors, path: "/my-saloons" },
      { isSeparator: true },
      { name: "Profile", icon: User, path: "/profile" },
    ],
  },

  team_lead: {
    basePath: "/team-lead",
    avatar: "TL",
    menu: [
      { name: "MAIN MENU", isHeader: true },
      { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { isSeparator: true },
      { name: "Profile", icon: User, path: "/profile" },
    ],
  },

  independent_pro: {
    basePath: "/independent-pro",
    avatar: "IP",
    menu: [
      { name: "MAIN MENU", isHeader: true },
      { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { name: "Manage Services", icon: Scissors, path: "/manage-services" },
      { isSeparator: true },  
      { name: "Profile", icon: User, path: "/profile" },
    ],
  },

  specialist: {
    basePath: "/specialist",
    avatar: "SP",
    menu: [
      { name: "MAIN MENU", isHeader: true },
      { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { isSeparator: true },
      { name: "Profile", icon: User, path: "/profile" },
    ],
  },
};
