import { NavLink } from "react-router-dom";
import { Settings } from "lucide-react";
import { SIDEBAR_CONFIG } from "./sidebarConfig";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const roleConfig = SIDEBAR_CONFIG[user?.role];

  if (!roleConfig) return null;

  const { basePath, menu } = roleConfig;

  return (
    <aside className="w-64 h-screen bg-white flex flex-col border-r border-gray-100">
      {/* Brand Header */}
      <div className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            {roleConfig.avatar}
          </div>
          <span className="font-bold text-gray-800 tracking-tight">SALON CRM</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-1">
          {menu.map((item, index) => {
            // Section Header
            if (item.isHeader) {
              return (
                <div key={index} className="pt-4 pb-2 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.name}
                </div>
              );
            }

            // Separator
            if (item.isSeparator) {
              return <div key={index} className="my-2 border-t border-gray-50" />;
            }

            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={`${basePath}${item.path}`}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 group
                  ${isActive 
                    ? "bg-purple-50 text-purple-600" 
                    : "text-slate-500 hover:bg-gray-50 hover:text-slate-900"}`
                }
              >
                <Icon className="w-5 h-5 mr-3" strokeWidth={2} />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-gray-50">
        <NavLink
          to={`${basePath}/settings`}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-xl text-[14px] font-medium transition-all
            ${isActive ? "bg-purple-50 text-purple-600" : "text-slate-500 hover:bg-gray-50"}`
          }
        >
          <Settings className="w-5 h-5 mr-3" strokeWidth={2} />
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;