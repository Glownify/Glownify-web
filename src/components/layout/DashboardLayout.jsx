import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, LogOut, Bell, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { SIDEBAR_CONFIG } from "./sidebarConfig";
import { logoutUser } from "../../redux/slice/authSlice";
import useMobile from "../../hooks/useMobile";

/**
 * DashboardLayout
 * ─────────────────────────────────────────────────────────────
 * Shared layout wrapper for all role-based dashboards (Salesman, Team Lead, Specialist, etc.).
 * Unified Premium Theme for Desktop.
 */
const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isMobile = useMobile();

  const roleConfig = SIDEBAR_CONFIG[user?.role];

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    if (!path || path === "dashboard") return "Dashboard Overview";
    return path.replace(/-/g, " ").toUpperCase();
  };

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  // ── Mobile: Full-screen child pages ──
  if (isMobile) {
    return <Outlet />;
  }

  // ── Desktop: Premium Unified Layout ──
  return (
    <div className="flex h-screen overflow-hidden bg-[#E2DFFF]">
      
      {/* Sidebar - Integrated Glass Design */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${open ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl shadow-purple-500/5 backdrop-blur-xl border-r border-purple-100/30 bg-white/50 sticky top-0`}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Sticky Premium Header */}
        <header className="h-24 bg-white/70 backdrop-blur-md border-b border-purple-50 flex justify-between items-center px-10 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-2 hover:bg-purple-50 rounded-xl transition-colors" onClick={() => setOpen(true)}>
              <Menu className="text-slate-600" />
            </button>
            <div className="flex flex-col">
               <h1 className="text-2xl font-black text-slate-800 tracking-tight">{getPageTitle()}</h1>
               <p className="text-[11px] font-bold text-[#8B5CF6] uppercase tracking-widest opacity-70">Glownify Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search data..." className="w-64 h-11 bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 text-[13px] outline-none focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all" />
            </div>

            <div className="flex items-center gap-4 border-l border-slate-100 pl-6 ml-2">
               <div className="relative cursor-pointer w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center hover:bg-white transition-colors">
                  <Bell className="w-5 h-5 text-slate-500" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white border-2 border-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
               </div>
               
               <div className="flex items-center gap-3 bg-purple-50/50 p-1.5 rounded-2xl border border-purple-100/50">
                  <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center font-black text-[#8B5CF6] text-xs">
                    {roleConfig?.avatar || user?.name?.charAt(0) || "U"}
                  </div>
                  <div className="flex flex-col pr-2">
                     <p className="text-[13px] font-bold text-slate-800 leading-none">{user?.name || "User"}</p>
                     <p className="text-[10px] font-black text-[#8B5CF6] uppercase tracking-tighter mt-1">{user?.role?.replace(/_/g, " ")}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2.5 rounded-xl hover:bg-white text-red-500 transition-colors shadow-sm hover:shadow-red-500/10"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-10 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
