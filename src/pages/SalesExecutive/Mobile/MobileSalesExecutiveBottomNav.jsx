import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Zap, 
  Target, 
  Users, 
  Wallet, 
  FileText,
  PieChart,
  LineChart
} from "lucide-react";

/**
 * MobileSalesExecutiveBottomNav
 * ─────────────────────────────────────────────────────────
 * High-fidelity bottom navigation for the Sales Executive mobile experience.
 * Matches the "Fluid Executive" design aesthetic with premium micro-interactions.
 */
const MobileSalesExecutiveBottomNav = () => {
  const navItems = [
    { 
      to: "/sales-executive/lead-pipeline", 
      label: "PIPELINE", 
      icon: LineChart 
    },
    { 
      to: "/sales-executive/my-targets", 
      label: "TARGETS", 
      icon: Target 
    },
    { 
      to: "/sales-executive/manage-salesman", 
      label: "TEAM", 
      icon: Users 
    },
    { 
      to: "/sales-executive/dashboard", 
      label: "EARNINGS", 
      icon: Wallet,
      isSpecial: true
    },
    { 
      to: "/sales-executive/reports", 
      label: "REPORTS", 
      icon: FileText 
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 px-2 pb-safe-area-inset-bottom shadow-[0_-8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5">
      <div className="flex items-center justify-around h-20 max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => `
              relative flex flex-col items-center justify-center gap-1.5 transition-all duration-300 flex-1
              ${isActive ? "text-[#f43f5e]" : "text-slate-400"}
            `}
          >
            {({ isActive }) => (
              <>
                <div className={`
                  flex h-11 w-14 items-center justify-center rounded-2xl transition-all duration-300
                  ${isActive && item.isSpecial ? "bg-rose-50 text-[#f43f5e]" : ""}
                  ${isActive && !item.isSpecial ? "text-[#f43f5e]" : ""}
                  ${!isActive ? "hover:bg-slate-50" : ""}
                `}>
                  <item.icon 
                    size={22} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`transition-colors duration-300 ${isActive ? "drop-shadow-sm" : ""}`}
                  />
                  
                  {/* Indicator Dot for active tab */}
                  {isActive && !item.isSpecial && (
                    <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#f43f5e]" />
                  )}
                </div>
                
                <span className={`text-[9px] font-black tracking-[0.05em] uppercase transition-all duration-300 ${isActive ? "opacity-100 scale-105" : "opacity-60"}`}>
                  {item.label}
                </span>

                {/* Glassy highlight for active tab */}
                {isActive && (
                   <div className="absolute inset-0 bg-rose-500/5 blur-xl rounded-full -z-10 animate-pulse-slow" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileSalesExecutiveBottomNav;
