import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Calendar,
    BarChart3,
    User,
    ChevronRight,
    Plus,
    Headphones,
    BookOpen,
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
        { name: "Booking", icon: Calendar, path: "/salon-owner/manage-bookings" },
        { name: "View Reports", icon: BarChart3, path: "/salon-owner/reports" },
        { name: "Courses", icon: BookOpen, path: "/salon-owner/courses" },
        { name: "Profile", icon: User, path: "/salon-owner/profile" },
    ];

    return (
        <aside 
            className="w-[300px] h-screen text-white flex flex-col shadow-2xl relative z-50"
            style={{ 
                backgroundImage: `linear-gradient(to bottom, rgba(139, 92, 246, 0.92), rgba(88, 28, 135, 0.95)), url("https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* 1. Glownify Logo */}
            <div className="p-8 pb-10 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center -ml-1">
                    <img src="https://api.iconify.design/noto:butterfly.svg" alt="logo" className="w-8 h-8 opacity-90 brightness-200 contrast-150 grayscale-0 hue-rotate-[280deg]" />
                </div>
                <span className="text-2xl font-bold tracking-tight">Glownify</span>
            </div>

            {/* 2. Navigation Menu */}
            <nav className="flex-1 px-4 py-2 space-y-2">
                {mainNavItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-6 py-4 rounded-2xl text-[16px] font-semibold transition-all group
                             ${isActive
                                ? "bg-white/20 text-white shadow-lg ring-1 ring-white/30 backdrop-blur-md"
                                : "text-purple-100/80 hover:bg-white/10 hover:text-white"}`
                        }
                    >
                        <item.icon className="w-6 h-6 mr-4 transition-transform group-hover:scale-110" />
                        <span className="flex-1">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default SalonOwnerSidebar;
