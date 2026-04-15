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
  Workflow,
  MapPin,
  Mail,
  Store,
  CreditCard,
  Briefcase,
  Layers
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";
import useMobile from "../../hooks/useMobile";

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

  if (isMobile) {
    return <Outlet />;
  }

  const menuItems = [
    { name: "Dashboard", icon: BarChart3, path: "/super-admin/dashboard" },
    { name: "Users", icon: Users, path: "/super-admin/manage-users" },
    { name: "Salons", icon: Store, path: "/super-admin/manage-salons" },
    { name: "Sales Executives", icon: Briefcase, path: "/super-admin/manage-sales-executives" },
    { name: "Categories", icon: Layers, path: "/super-admin/manage-categories" },


    { name: "Territories", icon: MapPin, path: "/super-admin/manage-cities-and-states" },
    { name: "Finance", icon: CreditCard, path: "/super-admin/manage-finance" },
    { name: "Plans", icon: Settings, path: "/super-admin/manage-subscriptions" },
    { name: "System Logs", icon: FileText, path: "/super-admin/manage-system-logs" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* ── Sidebar ── */}
      <aside className="w-80 h-screen flex flex-col bg-white border-r border-slate-100 sticky top-0 z-50">
        <div className="p-8 mb-4 border-b border-slate-50">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                  <span className="font-black text-xs">FE</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-800 tracking-tight uppercase leading-none">The Fluid Executive</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-80 decoration-slate-300">Super Admin Terminal</span>
               </div>
            </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar pt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                  isActive 
                  ? "bg-rose-50 text-rose-600 shadow-sm" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                }`}
              >
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-rose-600" : "text-slate-400 group-hover:text-slate-600"} />
                <span className={`text-[14px] font-bold tracking-tight whitespace-nowrap ${isActive ? "text-rose-600" : "text-slate-500 group-hover:text-slate-800"}`}>
                  {item.name}
                </span>
                {isActive && <div className="absolute right-4 w-1.5 h-6 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(225,29,72,0.4)]" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 space-y-4">
          <button className="w-full py-4 rounded-2xl bg-rose-600 text-white text-[13px] font-black shadow-lg shadow-rose-200 hover:bg-rose-700 hover:-translate-y-0.5 transition-all active:scale-95">
             GENERATE REPORT
          </button>
          
          <div className="px-4 space-y-4 pt-4 border-t border-slate-50">
             <button className="flex items-center gap-3 text-slate-400 font-bold text-sm hover:text-slate-800 transition-colors">
                <Settings size={18} /> Support
             </button>
             <button onClick={logout} className="flex items-center gap-3 text-slate-400 font-bold text-sm hover:text-rose-600 transition-colors">
                <LogOut size={18} /> Logout
             </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth no-scrollbar flex flex-col">
        {/* Premium Header */}
        <header className="h-20 sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-10 shrink-0">
           <div className="flex items-center gap-8 flex-1">
              <span className="text-lg font-black text-slate-800 tracking-tight">
                 {menuItems.find(m => location.pathname === m.path)?.name === "Users" ? "User Management Hub" : "SalonEcosystem Admin"}
              </span>
              <div className="relative group w-full max-w-[380px]">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-rose-500 transition-colors" />
                 <input type="text" placeholder="Search ecosystem data..." className="w-full h-11 rounded-xl bg-slate-50/50 px-10 pr-6 text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-rose-500/5 transition-all placeholder:text-slate-300 border border-transparent focus:border-slate-100" />
              </div>
           </div>

           <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all relative">
                 <Bell size={18} />
                 <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                 <Settings size={18} />
              </button>
              <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                 <Briefcase size={18} />
              </button>
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-slate-100 ml-2">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julian" alt="User" className="w-full h-full object-cover" />
              </div>
           </div>
        </header>

        <div className="p-10 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </div>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default SuperAdminLayout;
