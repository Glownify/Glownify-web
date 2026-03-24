import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import SalonOwnerSidebar from "./SalonOwnerSidebar";
import useMobile from "../../hooks/useMobile";

/**
 * SalonOwnerLayout
 * -------------------------------------------------------------
 * Layout wrapper specifically for the Salon Owner role.
 * Matches the premium theme for desktop versions.
 */
const SalonOwnerLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useMobile();

    if (isMobile) {
        return <Outlet />;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#F8F7FF]">
            {/* Sidebar - Desktop always visible, Mobile toggleable */}
            <div
                className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl shadow-purple-500/5 backdrop-blur-xl border-r border-purple-100/50`}
            >
                <SalonOwnerSidebar />
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Mobile Sidebar Toggle */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-[#8B5CF6] text-white rounded-full shadow-lg"
                >
                    <Menu size={20} />
                </button>

                {/* Scrollable Content Container */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 custom-scrollbar">
                    <div className="max-w-[1600px] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: #E2E8F0;
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #CBD5E1;
                }
            `}</style>
        </div>
    );
};

export default SalonOwnerLayout;
