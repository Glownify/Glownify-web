import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  LogOut,
  Menu,
  Search,
  Plus,
  Zap,
  LayoutDashboard,
  Users,
  Target,
  Wallet,
  MousePointerClick,
  Headphones,
  FileText
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";
import useMobile from "../../hooks/useMobile";

const navItems = [
  { to: "/sales-executive/dashboard", label: "Analytics", icon: LayoutDashboard },
  { to: "/sales-executive/lead-pipeline", label: "Lead Pipeline", icon: Zap },
  { to: "/sales-executive/my-targets", label: "My Targets", icon: Target },
  { to: "/sales-executive/manage-salesman", label: "Sales persons", icon: Users },
  { to: "/sales-executive/my-commissions", label: "My Commissions", icon: Wallet },
  { to: "#", label: "Reports", icon: FileText },
];

const SalesExecutiveLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMobile();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  if (isMobile) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F7FF]">
      {/* ── Sidebar ── */}
      <aside className="w-72 h-screen flex flex-col bg-white/50 backdrop-blur-xl border-r border-purple-100/50 sticky top-0 shadow-2xl shadow-purple-500/5">
        <div className="p-8 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
             <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 tracking-tight">
            Glownify
          </span>
        </div>

        <nav className="flex-1 px-4 mb-4 overflow-y-auto space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${isActive ? "bg-[#8B5CF6] text-white shadow-xl shadow-purple-200" : "text-slate-500 hover:bg-purple-50 hover:text-[#8B5CF6] hover:translate-x-1"}`
              }
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-[15px]">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <button 
             onClick={logout}
             className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-red-50 text-red-500 font-bold text-[15px] bg-white transition-all hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-24 px-10 flex items-center justify-between border-b border-purple-50/50 bg-white/70 backdrop-blur-md sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-1 bg-purple-50/50 p-1.5 rounded-[22px] border border-purple-100/50">
             <button className="px-6 py-2.5 rounded-[18px] bg-white text-[#8B5CF6] font-bold text-[14px]">Executive Dashboard</button>
             <button className="px-6 py-2.5 rounded-[18px] text-slate-500 font-semibold text-[14px]">My Pipeline</button>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search leads..." className="w-full h-11 bg-slate-50/50 border border-slate-100 rounded-[18px] pl-11 pr-4 text-[14px] outline-none focus:bg-white transition-all" />
            </div>

            <button className="flex items-center gap-2 h-11 px-6 rounded-[18px] bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] text-white font-bold text-[14px] shadow-lg shadow-purple-200">
              <Plus size={18} strokeWidth={3} />
              Add Lead
            </button>

            <div className="relative cursor-pointer w-11 h-11 bg-slate-50/50 border border-slate-100 rounded-[18px] flex items-center justify-center">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white border-2 border-white text-[10px] font-bold rounded-full flex items-center justify-center">7</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default SalesExecutiveLayout;
