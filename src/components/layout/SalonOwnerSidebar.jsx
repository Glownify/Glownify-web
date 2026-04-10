import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutGrid,
    CalendarDays,
    BarChart2,
    User,
    Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";

const SalonOwnerSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const mainNavItems = [
        { name: "Dashboard", icon: LayoutGrid, path: "/salon-owner/dashboard" },
        { name: "Booking", icon: CalendarDays, path: "/salon-owner/bookings" },
        { name: "Poster Making", icon: Sparkles, path: "/salon-owner/marketing" },
        { name: "View Reports", icon: BarChart2, path: "/salon-owner/reports" },
        { name: "Profile", icon: User, path: "/salon-owner/profile" },
    ];

    const logout = () => {
        dispatch(logoutUser());
        navigate("/");
    };

    return (
        <aside className="w-80 h-screen bg-white flex flex-col border-r border-slate-100 sticky top-0 z-50 overflow-hidden shrink-0 shadow-[20px_0_60px_rgba(0,0,0,0.02)]">
            {/* 1. Logo / Header - Matching "The Fluid Executive" */}
            <div className="p-10 mb-2 flex flex-col gap-1">
                <div className="flex flex-col">
                    <span className="text-xl font-black text-slate-900 tracking-tighter leading-tight uppercase">
                        The Fluid <br/> Executive
                    </span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                        Elite Salon Suite
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
                            className={`w-full flex items-center gap-6 px-10 py-5 transition-all duration-300 group relative
                                ${isActive 
                                    ? "bg-rose-500/5 text-rose-600" 
                                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50/50"
                                }`
                            }
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-600 rounded-r-full" />
                            )}
                            <item.icon size={22} strokeWidth={isActive ? 3 : 2} className="transition-colors" />
                            <span className={`text-[12px] font-black tracking-widest group-hover:text-slate-800 transition-colors uppercase whitespace-nowrap`}>
                                {item.name}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* 3. Footer Actions: User Info */}
            <div className="p-8 space-y-6 border-t border-slate-50 mt-auto bg-slate-50/30">
                <div 
                    onClick={logout}
                    className="flex items-center gap-4 cursor-pointer group"
                >
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-rose-600 group-hover:text-white transition-all overflow-hidden shadow-sm">
                        {user?.image ? <img src={user.image} alt="User" className="w-full h-full object-cover" /> : user?.name?.charAt(0) || "SO"}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[13px] font-black text-slate-900 truncate leading-none mb-1">{user?.name || "Salon Manager"}</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">Premium Account</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SalonOwnerSidebar;
