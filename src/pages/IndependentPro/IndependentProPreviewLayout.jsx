import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  CalendarDays,
  LayoutDashboard,
  Scissors,
  ShieldCheck,
  User,
} from "lucide-react";

const previewNavItems = [
  {
    label: "Dashboard",
    path: "/preview/independent-pro/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Bookings",
    path: "/preview/independent-pro/bookings",
    icon: CalendarDays,
  },
  {
    label: "Manage Services",
    path: "/preview/independent-pro/manage-services",
    icon: Scissors,
  },
  {
    label: "Profile",
    path: "/preview/independent-pro/profile",
    icon: User,
  },
];

const IndependentProPreviewLayout = () => {
  return (
    <div className="min-h-screen bg-[#E2DFFF]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-80 border-r border-purple-100/60 bg-white lg:flex lg:flex-col">
        <div className="p-9 border-b border-purple-50">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center font-black">
              IP
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 tracking-tight">
                Individual Pro
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B5CF6] mt-1">
                Preview Panel
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {previewNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-black transition-all ${
                  isActive
                    ? "bg-purple-50 text-[#8B5CF6] ring-1 ring-purple-100 shadow-sm"
                    : "text-slate-400 hover:bg-purple-50/60 hover:text-[#8B5CF6]"
                }`
              }
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-purple-50">
          <div className="rounded-[28px] bg-slate-50 border border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">Approved Preview</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Home service panel
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-purple-100/60 bg-white/85 backdrop-blur-xl lg:hidden">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-black text-slate-900">Individual Pro</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B5CF6]">
                Preview Panel
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center font-black">
              IP
            </div>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {previewNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `shrink-0 flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-black transition-all ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-purple-50 text-[#8B5CF6]"
                  }`
                }
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="lg:ml-80 p-5 lg:p-10">
        <div className="max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default IndependentProPreviewLayout;
