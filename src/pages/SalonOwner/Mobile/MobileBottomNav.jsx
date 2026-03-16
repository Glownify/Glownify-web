import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutGrid, CalendarDays, BarChart2, User } from "lucide-react";

export default function MobileBottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        {
            label: "Dashboard",
            icon: LayoutGrid,
            path: "/salon-owner",
            match: ["/salon-owner"],
        },
        {
            label: "Booking",
            icon: CalendarDays,
            path: "/salon-owner/bookings",
            match: ["/salon-owner/bookings", "/salon-owner/booking-detail", "/salon-owner/create-bill"],
        },
        {
            label: "View Reports",
            icon: BarChart2,
            path: "/salon-owner/reports",
            match: ["/salon-owner/reports"],
        },
        {
            label: "Profile",
            icon: User,
            path: "/salon-owner/profile",
            match: ["/salon-owner/profile"],
        },
    ];

    // Helper to check if current path matches to highlight tab
    const isActive = (item) => {
        // exact match for dashboard to avoid matching all /salon-owner paths
        if (item.path === "/salon-owner" && location.pathname !== "/salon-owner") {
            return false;
        }
        return item.match.some((p) => location.pathname.startsWith(p));
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                backgroundColor: "#156778",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 10px 20px 10px", // extra padding bottom for safe area
                boxSizing: "border-box",
                zIndex: 50,
            }}
        >
            {navItems.map((item, index) => {
                const active = isActive(item);
                const Icon = item.icon;

                return (
                    <button
                        key={index}
                        onClick={() => {
                            if (item.path !== "#") {
                                navigate(item.path);
                            }
                        }}
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "4px",
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            opacity: active ? 1 : 0.7,
                        }}
                    >
                        <Icon size={24} color="#fff" strokeWidth={active ? 2.5 : 2} />
                        <span
                            style={{
                                color: "#fff",
                                fontSize: "10px",
                                fontWeight: active ? "700" : "500",
                            }}
                        >
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
