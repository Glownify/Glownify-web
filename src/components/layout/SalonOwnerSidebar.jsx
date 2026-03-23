import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Calendar,
    BarChart3,
    Users,
    Scissors,
    Settings,
    LogOut,
} from "lucide-react";


/**
 * SalonOwnerSidebar
 * -------------------------------------------------------------
 * A specialized sidebar for the Salon Owner role matching the screenshot.
 * Features a purple gradient, user profile cards, and specialized nav items.
 */
const SalonOwnerSidebar = () => {
    const mainNavItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/salon-owner/dashboard" },
        { name: "Bookings", icon: Calendar, path: "/salon-owner/manage-bookings" },
        { name: "Reports", icon: BarChart3, path: "/salon-owner/reports" },
        { name: "Staff", icon: Users, path: "/salon-owner/manage-specialists" },
        { name: "Services", icon: Scissors, path: "/salon-owner/manage-services" },
        { name: "Settings", icon: Settings, path: "/salon-owner/profile" },
    ];


    return (
        <aside 
            className="w-[280px] h-screen bg-[#F8F9FB] border-r border-slate-200 flex flex-col relative z-50"
        >
            {/* 1. Logo / Header */}
            <div className="p-8 pb-10">
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-slate-900 tracking-tight">The Atelier</span>
                    <span className="text-xs text-slate-500 font-medium">Management Suite</span>
                </div>
            </div>

            {/* 2. Navigation Menu */}
            <nav className="flex-1 px-4 space-y-1">
                {mainNavItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 rounded-xl text-[14px] font-semibold transition-all group
                             ${isActive
                                ? "bg-[#FFF0F3] text-[#D81159]"
                                : "text-slate-500 hover:bg-slate-100"}` 
                        }
                    >
                        <item.icon className={`w-5 h-5 mr-3 transition-transform group-hover:scale-110 ${
                            window.location.pathname.includes(item.path) ? "text-[#D81159]" : "text-slate-400"
                        }`} />
                        <span className="flex-1">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* 3. User Profile Card at Bottom */}
            <div className="p-4 border-t border-slate-100">
                <div className="bg-white p-3 rounded-2xl flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                        <img src="https://ui-avatars.com/api/?name=Julian+Vane" alt="user" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">Julian Vane</p>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-tight">Salon Manager</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};


export default SalonOwnerSidebar;
