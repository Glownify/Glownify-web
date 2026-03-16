import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    PlusSquare,
    Store,
    ClipboardList,
    TrendingUp,
    BarChart3,
    Headphones,
    ChevronRight,
    Plus
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
        { name: "Register New Salon", icon: PlusSquare, path: "/salon-owner/register-salon" },
        { name: "My Registered Salons", icon: Store, path: "/salon-owner/manage-salons" },
        { name: "Visits Log", icon: ClipboardList, path: "/salon-owner/manage-bookings" },
        { name: "My Performance", icon: TrendingUp, path: "/salon-owner/manage-analytics" },
        { name: "Reports", icon: BarChart3, path: "/salon-owner/reports" },
        { name: "Support", icon: Headphones, path: "/salon-owner/support" },
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
            <div className="p-6 pb-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center -ml-1">
                    {/* Pink/purple butterfly logo */}
                    <img src="https://api.iconify.design/noto:butterfly.svg" alt="logo" className="w-8 h-8 opacity-90 brightness-200 contrast-150 grayscale-0 hue-rotate-[280deg]" />
                </div>
                <span className="text-2xl font-semibold tracking-tight">Glownify</span>
            </div>

            {/* 2. Top User Card (Ravi Jain) */}
        <div className="px-5 mb-6 mt-4">
            <div className="flex items-center gap-3 decoration-transparent">
                <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi"
                    alt="Avatar"
                    className="w-12 h-12 rounded-full border border-white/20 bg-purple-100/20"
                />
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[17px] leading-tight text-white mb-0.5">Ravi Jain</p>
                    <p className="text-[11px] text-purple-200/90 truncate flex items-center gap-1.5 font-medium tracking-wide">
                        Jayanagar <span className="opacity-50 text-[10px]">●</span> SP-BLR-101
                    </p>
                </div>
            </div>
        </div>

            {/* 3. Navigation Menu */}
        <nav className="flex-1 px-4 py-2 space-y-1">
            {mainNavItems.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl text-[15px] font-medium transition-all group
                         ${isActive
                            ? "bg-white/20 text-white shadow-sm ring-1 ring-white/20"
                            : "text-purple-100/90 hover:bg-white/10 hover:text-white"}`
                    }
                >
                        <item.icon className={`w-5 h-5 mr-3 transition-colors ${item.name === 'Dashboard' ? 'group-hover:text-white' : ''}`} />
                        <span className="flex-1">{item.name}</span>
                        {item.name === "Visits Log" || item.name === "My Performance" || item.name === "Reports" ? (
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        ) : null}
                    </NavLink>
                ))}
            </nav>

            {/* 4. Bottom Section */}
        <div className="p-5 pb-6">
            <div className="relative overflow-hidden bg-transparent rounded-2xl flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 relative z-10 w-full">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya"
                        alt="Aditya"
                        className="w-10 h-10 rounded-full border border-white/20 bg-white/10 shadow-sm"
                    />
                    <div className="flex-1">
                        <p className="text-[15px] font-semibold text-white leading-tight">Aditya Kumar</p>
                        <p className="text-[11px] text-purple-200/80 font-medium tracking-wide">Super Admin ist Team</p>
                    </div>
                </div>
            </div>

            {/* + Add New Salon Button */}
            <button className="w-full py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl flex items-center justify-start px-4 gap-3 font-medium text-[15px] transition-all shadow-lg active:scale-95 group">
                <Plus size={20} className="transition-transform group-hover:rotate-90" />
                Add New Salon
            </button>

            <div className="flex items-center justify-between text-[11px] text-purple-100/60 mt-4 px-1">
                <div className="flex items-center gap-1.5 font-medium cursor-pointer hover:text-white transition-colors">
                    <Headphones size={13} />
                    Support
                </div>
                <span className="font-medium tracking-wider">© 2022<br/>Glownify</span>
            </div>
            </div>
        </aside>
    );
};

export default SalonOwnerSidebar;
