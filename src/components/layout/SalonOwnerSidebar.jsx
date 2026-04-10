import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Calendar,
    BarChart3,
    Users,
    Scissors,
    Settings,
    LogOut,
    Plus
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";

const SalonOwnerSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const mainNavItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/salon-owner/dashboard" },
        { name: "Bookings", icon: Calendar, path: "/salon-owner/manage-bookings" },
        { name: "Reports", icon: BarChart3, path: "/salon-owner/reports" },
        { name: "Staff", icon: Users, path: "/salon-owner/manage-specialists" },
        { name: "Services", icon: Scissors, path: "/salon-owner/manage-services" },
        { name: "Settings", icon: Settings, path: "/salon-owner/profile" },
    ];

    const logout = () => {
        dispatch(logoutUser());
        navigate("/");
    };

    return (
        <aside className="w-88 h-screen bg-white flex flex-col border-r border-slate-100 sticky top-0 z-50 overflow-hidden shrink-0 shadow-[20px_0_60px_rgba(0,0,0,0.02)]">
            {/* 1. Logo / Header - Matching "The Tactile Atelier" */}
            <div className="p-10 mb-2 flex items-center gap-4">
                <div className="w-14 h-14 bg-[#E8D9CC] rounded-2xl flex items-center justify-center shadow-sm">
                   <Scissors className="text-[#8B5CF6] opacity-50" size={24} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-black text-slate-800 tracking-tighter leading-tight uppercase">
                        The Tactile <br/> Atelier
                    </span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                        Management Suite
                    </span>
                </div>
            </div>

            {/* 2. Navigation Menu */}
            <nav className="flex-1 px-0 py-6 space-y-1 overflow-y-auto no-scrollbar">
                {mainNavItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={`w-full flex items-center gap-6 px-10 py-4 transition-all duration-300 group relative
                                ${isActive 
                                    ? "bg-[#D81159]/5 text-[#D81159]" 
                                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50/50"
                                }`
                            }
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D81159] rounded-r-full" />
                            )}
                            <item.icon size={22} strokeWidth={isActive ? 3 : 2} className="transition-colors" />
                            <span className={`text-[15px] font-black tracking-tight group-hover:text-slate-800 transition-colors uppercase whitespace-nowrap`}>
                                {item.name}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* 3. New Appointment Button & User Info */}
            <div className="p-8 space-y-6">
                <button className="w-full bg-[#D81159] hover:bg-[#B00E48] text-white h-16 rounded-2xl flex items-center justify-center gap-3 font-black text-[13px] tracking-widest uppercase shadow-xl shadow-rose-500/20 transition-all hover:-translate-y-1 active:scale-95">
                    <Plus size={20} strokeWidth={3} />
                    New Appointment
                </button>

                <div 
                    onClick={logout}
                    className="flex items-center gap-4 py-4 px-2 cursor-pointer group border-t border-slate-50 pt-8"
                >
                    <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-[#D81159] group-hover:text-white transition-all overflow-hidden">
                        {user?.image ? <img src={user.image} alt="User" className="w-full h-full object-cover" /> : user?.name?.charAt(0) || "RS"}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[14px] font-black text-slate-800 truncate leading-none mb-1">{user?.name || "Alex Rivera"}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">Salon Manager</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SalonOwnerSidebar;
