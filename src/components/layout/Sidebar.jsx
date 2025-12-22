import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { SIDEBAR_CONFIG } from "./sidebarConfig";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const roleConfig = SIDEBAR_CONFIG[user?.role];

  if (!roleConfig) return null;

  const { basePath, menu } = roleConfig;

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      {/* Branding */}
      <div className="h-16 flex items-center justify-center bg-gray-900 border-b border-indigo-700/50">
        <div className="flex items-center gap-2 text-indigo-400 font-extrabold">
          <LayoutDashboard className="w-6 h-6" />
          PANEL
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
        {menu.map((item, index) => {
          if (item.isSeparator) {
            return <div key={index} className="my-4 border-t border-gray-700" />;
          }

          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={`${basePath}${item.path}`}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

     
    </aside>
  );
};

export default Sidebar;
