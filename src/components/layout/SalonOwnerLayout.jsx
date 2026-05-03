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
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#FFF5F6]">
                {/* Image Exact Header Style */}

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto pt-8 pb-12 px-12 no-scrollbar scroll-smooth">
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

export default SalonOwnerLayout;
