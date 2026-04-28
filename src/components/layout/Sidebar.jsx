import { NavLink } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import { SIDEBAR_CONFIG } from "./sidebarConfig";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleConfig = SIDEBAR_CONFIG[user?.role];

  if (!roleConfig) return null;

  const { basePath, menu } = roleConfig;

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <aside className="w-80 h-screen bg-white flex flex-col border-r border-purple-100/50 shadow-[20px_0_50px_rgba(139,92,246,0.02)]">
      {/* Brand Header */}
      <div className="p-10 mb-6">
         <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase whitespace-nowrap">GLOWNIFY</span>
            <span className="text-[10px] font-black text-[#8B5CF6] uppercase tracking-[0.2em] mt-1 opacity-60">
              {user?.role?.replace(/_/g, " ") || "Management Suite"}
            </span>
         </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 overflow-y-auto no-scrollbar">
        <div className="space-y-2">
          {menu.map((item, index) => {
            // Section Header
            if (item.isHeader) {
              return (
                <div key={index} className="pt-8 pb-3 px-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                  {item.name}
                </div>
              );
            }

            // Separator
            if (item.isSeparator) {
              return <div key={index} className="my-4 border-t border-purple-50/50 mx-5" />;
            }

            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={`${basePath}${item.path}`}
                className={({ isActive }) =>
                  `w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                  ${isActive 
                    ? "active bg-gradient-to-r from-purple-50 to-white text-[#8B5CF6] shadow-sm ring-1 ring-purple-100/50" 
                    : "text-slate-400 hover:text-[#8B5CF6] hover:bg-purple-50/30"}`
                }
              >
                <Icon size={20} className="transition-colors" />
                <span className={`text-[14px] font-bold group-hover:text-slate-800 transition-colors`}>
                  {item.name}
                </span>
                <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_10px_rgba(139,92,246,0.5)] group-[.active]:block" />
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Profile/Footer Section */}
      <div className="p-8 border-t border-purple-50">
        <div className="bg-slate-50 p-5 rounded-[2.5rem] flex items-center gap-4 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-purple-500/5 transition-all cursor-pointer relative">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center font-black text-[#8B5CF6] group-hover:scale-110 transition-transform">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black text-slate-800 truncate">{user?.name || "Member"}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{user?.role?.replace(/_/g, " ")}</span>
            </div>
            <button 
              onClick={logout}
              className="ml-auto p-2 text-slate-300 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
