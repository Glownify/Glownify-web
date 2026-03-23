import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Settings, 
  PieChart, 
  Bell, 
  Search, 
  Plus, 
  LogOut,
  ChevronRight,
  Target,
  FileText,
  Workflow
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";
import useMobile from "../../hooks/useMobile";

/**
 * SuperAdminLayout
 * ─────────────────────────────────────────────────────────────
 * Custom premium layout for Super Admin role on Desktop.
 * Modern purple-themed design with sidebar and header.
 */
const SuperAdminLayout = () => {
  const isMobile = useMobile();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  // If mobile, just render the outlet (the child page handles mobile layout)
  if (isMobile) {
    return <Outlet />;
  }

  const menuItems = [
    { name: "Analytics", icon: BarChart3, path: "/super-admin/dashboard" },
    { name: "Manage Users", icon: Users, path: "/super-admin/manage-users" },
    { name: "Manage Subscriptions", icon: Settings, path: "/super-admin/manage-subscriptions" },
    { name: "Commission Reports", icon: PieChart, path: "/super-admin/manage-sales-executives" },
    { name: "Manage Reports", icon: FileText, path: "#" },
    { name: "Settings", icon: Settings, path: "/super-admin/profile", hasSubmenu: true },
    { name: "Integrations", icon: Workflow, path: "#", hasSubmenu: true },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F7FF]">
      {/* ── Sidebar ── */}
      <aside className="w-72 h-screen flex flex-col bg-white/50 backdrop-blur-xl border-r border-purple-100/50 sticky top-0 shadow-2xl shadow-purple-500/5">
        
        {/* Logo Section */}
        <div className="p-8 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
               <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19 7-7 3 3-7 7-3-3Z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z"/><path d="m2 2 5 3"/><path d="m9 7 5 3"/>
               </svg>
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 tracking-tight">
              Glownify
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 mb-4 overflow-y-auto space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${isActive || location.pathname === item.path
                  ? "bg-[#8B5CF6] text-white shadow-xl shadow-purple-200 translate-x-1" 
                  : "text-slate-500 hover:bg-purple-50 hover:text-[#8B5CF6] hover:translate-x-1"}`
              }
            >
              <div className="flex items-center gap-4">
                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="font-semibold text-[15px]">{item.name}</span>
              </div>
              {item.hasSubmenu && (
                <ChevronRight className={`w-4 h-4 transition-transform ${location.pathname === item.path ? "rotate-90" : ""}`} />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Profile Section */}
        <div className="p-6 mt-auto">
          <div className="bg-white/80 p-4 rounded-3xl border border-purple-50 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-purple-200 p-0.5">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit" 
                alt="Admin" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-800 text-[14px] truncate">Admin User</h4>
              <p className="text-[12px] text-slate-500 font-medium">Super Admin</p>
            </div>
            <button onClick={logout} className="text-slate-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-lg">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-24 px-10 flex items-center justify-between border-b border-purple-50/50 bg-white/70 backdrop-blur-md sticky top-0 z-10 shrink-0">
          
          {/* Left Side: Tabs */}
          <div className="flex items-center gap-1 bg-purple-50/50 p-1.5 rounded-[22px] border border-purple-100/50">
             <button className="px-6 py-2.5 rounded-[18px] bg-white text-[#8B5CF6] font-bold text-[14px] shadow-sm ring-1 ring-purple-100/50">
               Sales Dashboard
             </button>
             <button className="px-6 py-2.5 rounded-[18px] text-slate-500 font-semibold text-[14px] hover:text-[#8B5CF6] transition-colors">
               Manage Users
             </button>
             <button className="px-6 py-2.5 rounded-[18px] text-slate-500 font-semibold text-[14px] hover:text-[#8B5CF6] transition-colors">
               Manage Subscriptions
             </button>
          </div>

          {/* Right Side: Search, Create, Notis, Profile */}
          <div className="flex items-center gap-6">
            
            {/* Search Bar */}
            <div className="relative group w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#8B5CF6] transition-colors" />
              <input 
                type="text" 
                placeholder="Search analytics..." 
                className="w-full h-11 bg-slate-50/50 border border-slate-100 rounded-[18px] pl-11 pr-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-200/50 focus:bg-white transition-all transition-duration-300"
              />
            </div>

            {/* Create Button */}
            <button className="flex items-center gap-2 h-11 px-6 rounded-[18px] bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] text-white font-bold text-[14px] shadow-lg shadow-purple-200 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <Plus size={18} strokeWidth={3} />
              Create Plan
            </button>

            {/* Notification Badge */}
            <div className="relative cursor-pointer transition-transform hover:scale-110 active:scale-95">
              <div className="w-11 h-11 bg-slate-50/50 border border-slate-100 rounded-[18px] flex items-center justify-center">
                <Bell className="w-5 h-5 text-slate-500" />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white border-2 border-white text-[10px] font-bold rounded-full flex items-center justify-center">
                6
              </span>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
               <div className="w-11 h-11 rounded-[16px] overflow-hidden border border-purple-100">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit" alt="Rohit" className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col">
                 <span className="text-[14px] font-bold text-slate-800 leading-tight">Rohit Sharma</span>
                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Super Admin</span>
               </div>
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
};

export default SuperAdminLayout;
