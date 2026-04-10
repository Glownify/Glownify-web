import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
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
  FileText,
  MapPin,
  TrendingUp,
  Mail
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";
import useMobile from "../../hooks/useMobile";
import MobileSalesExecutiveBottomNav from "../../pages/SalesExecutive/Mobile/MobileSalesExecutiveBottomNav";

const navItems = [
  { to: "/sales-executive/dashboard", label: "Analytics", icon: LayoutDashboard },
  { to: "/sales-executive/lead-pipeline", label: "Lead Pipeline", icon: Zap },
  { to: "/sales-executive/my-targets", label: "My Targets", icon: Target },
  { to: "/sales-executive/manage-salesman", label: "Sales persons", icon: Users },
  { to: "/sales-executive/my-commissions", label: "My Commissions", icon: Wallet },
  { to: "/sales-executive/reports", label: "Reports", icon: FileText },
];

const SalesExecutiveLayout = () => {
  const isMobile = useMobile();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  if (isMobile) {
    const getPageTitle = () => {
      const item = navItems.find(item => location.pathname === item.to);
      return item ? item.label : "Dashboard";
    };

    return (
      <div className="min-h-screen bg-[#F8F9FA] pb-24">
        {/* Mobile Header Row */}
        <div className="sticky top-0 z-40 flex items-center justify-between bg-white/80 px-6 py-4 backdrop-blur-xl border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-slate-100 shadow-sm">
              <img src="https://i.pravatar.cc/100?u=exec1" alt="Executive" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-800">Executive</span>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Online</span>
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
             <span className="text-[14px] font-black text-[#E11D48] tracking-tight uppercase">{getPageTitle()}</span>
          </div>

          <div className="flex items-center gap-4">
             <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                <Bell size={18} />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
             </button>
          </div>
        </div>

        <main className="p-4">
          <Outlet />
        </main>

        <MobileSalesExecutiveBottomNav />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#E2DFFF]">
      {/* ── Sidebar ── */}
      <aside className="w-72 2xl:w-88 h-screen flex flex-col bg-white border-r border-slate-100 sticky top-0 shadow-[20px_0_60px_rgba(0,0,0,0.02)] z-50 shrink-0 transition-all duration-300">
        <div className="p-10 mb-6 flex flex-col">
            <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase whitespace-nowrap">GLOWNIFY</span>
            <span className="text-[10px] font-black text-[#8B5CF6] uppercase tracking-[0.25em] mt-1.5 opacity-60 leading-none">Sales & Executive Suite</span>
        </div>

        <nav className="flex-1 px-7 space-y-2.5 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={`w-full flex items-center gap-4 px-6 py-4.5 rounded-[22px] transition-all duration-500 group relative flex ${
                    isActive 
                    ? "bg-[#8B5CF6] text-white shadow-2xl shadow-purple-500/25 translate-x-1" 
                    : "text-slate-400 hover:text-[#8B5CF6] hover:bg-purple-50/50 hover:translate-x-1"
                  }`
                }
              >
                <div className={`p-2 rounded-xl bg-white shadow-sm flex items-center justify-center transition-all ${isActive ? "scale-110 shadow-lg text-[#8B5CF6]" : "text-slate-400 group-hover:text-[#8B5CF6]"}`}>
                   <item.icon size={18} strokeWidth={isActive ? 3 : 2} />
                </div>
                <span className={`text-[15px] font-black tracking-tight whitespace-nowrap ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-800"}`}>
                  {item.label}
                </span>
                {!isActive && <div className="ml-auto w-1 h-1 rounded-full bg-slate-200 group-hover:bg-[#8B5CF6] transition-colors" />}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-8 border-t border-slate-50">
          <button 
             onClick={logout}
             className="w-full h-15 rounded-[22px] bg-red-50 text-red-500 font-bold text-[14px] flex items-center justify-center gap-3 transition-all hover:bg-red-500 hover:text-white shadow-sm hover:shadow-red-500/20 group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-24 sticky top-0 z-40 bg-white/70 backdrop-blur-3xl border-b border-slate-100 flex items-center justify-between px-12 shrink-0">
           <div className="flex items-center gap-8 flex-1">
              <div className="relative group w-full max-w-[420px]">
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within:text-[#8B5CF6] transition-colors" />
                 <input type="text" placeholder="Search sales data..." className="w-full h-13 rounded-2xl border border-slate-100 bg-slate-50/30 px-13 pr-6 text-[14px] font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-slate-300" />
              </div>
           </div>

           <div className="flex items-center gap-6">
              <button className="h-13 px-8 rounded-2xl bg-[#8B5CF6] text-white text-[14px] font-black shadow-xl shadow-purple-500/20 active:scale-95 transition-all hover:-translate-y-1">
                 Create Lead
              </button>
              <div className="flex items-center gap-3 border-l border-slate-100 pl-6 ml-2">
                 <button className="relative w-12 h-12 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#8B5CF6] hover:bg-slate-50 transition-all">
                    <Bell size={20} />
                    <span className="absolute top-[-4px] right-[-4px] w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-4 border-white shadow-lg shadow-red-500/20">7</span>
                 </button>
                 <button className="relative w-12 h-12 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#8B5CF6] hover:bg-slate-50 transition-all ml-3">
                    <Mail size={20} />
                 </button>
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-10 2xl:p-12 no-scrollbar">
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default SalesExecutiveLayout;
