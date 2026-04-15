import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Search, Bell, HelpCircle } from "lucide-react";
import SalonOwnerSidebar from "./SalonOwnerSidebar";
import useMobile from "../../hooks/useMobile";
import { useSelector } from "react-redux";

const SalonOwnerLayout = () => {
    const isMobile = useMobile();
    const { user } = useSelector((state) => state.auth);

    if (isMobile) {
        return <Outlet />;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-white">
            {/* ── Sidebar ── */}
            <SalonOwnerSidebar />

            {/* ── Main Content Area ── */}
            <main className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-[#FFF5F6]">
                {/* Image Exact Header Style */}
                <header className="sticky top-0 z-40 flex min-h-16 shrink-0 flex-wrap items-center justify-between gap-4 border-b border-slate-100/50 bg-white/40 px-4 py-3 backdrop-blur-3xl sm:px-6 lg:px-8 2xl:px-10">
                    <div className="flex flex-1 items-center gap-8">
                        <div className="relative group w-full max-w-[420px]">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within:text-[#D81159] transition-colors" />
                            <input type="text" placeholder="Search services..." className="w-full h-10 rounded-full bg-slate-50/50 px-13 pr-6 text-[13px] font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-rose-500/5 transition-all placeholder:text-slate-300" />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-4 sm:gap-6 lg:gap-8">
                        <div className="flex items-center gap-6 text-slate-400">
                            <button className="hover:text-[#D81159] transition-colors relative">
                                <Bell size={20} />
                                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#D81159] border-2 border-white"></span>
                            </button>
                            <button className="hover:text-[#D81159] transition-colors">
                                <HelpCircle size={20} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 border-slate-100 sm:border-l sm:pl-6 lg:pl-8">
                            <div className="text-right">
                                <p className="text-[13px] font-black text-slate-900 leading-none">{user?.name || "Alex Rivera"}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Studio Manager</p>
                            </div>
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg shadow-[#D81159]/10">
                                {user?.image ? <img src={user.image} alt="User" className="w-full h-full object-cover" /> : (
                                    <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" className="w-full h-full object-cover" />
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto px-4 py-5 no-scrollbar scroll-smooth sm:px-6 sm:py-6 lg:px-8 lg:py-8 2xl:px-10">
                    <div className="w-full max-w-[1920px]">
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

export default SalonOwnerLayout;
