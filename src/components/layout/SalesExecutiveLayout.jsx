import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  Wallet, 
  Zap, 
  Headphones, 
  MousePointerClick, 
  Search, 
  Bell, 
  RefreshCcw, 
  ChevronDown,
  Globe,
  Settings,
  ArrowRight,
  LogOut,
  HelpCircle
} from 'lucide-react';

const SalesExecutiveLayout = () => {
    // Responsive check for larger screens
    if (window.innerWidth < 1024) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f8f6fb] to-[#f3ecf9] text-[#2D1B4E] p-8 text-center">
                <div className="w-20 h-20 bg-[#6C5CE7]/10 rounded-3xl flex items-center justify-center mb-6">
                    <Zap className="w-10 h-10 text-[#6C5CE7]" />
                </div>
                <h1 className="text-2xl font-black mb-2">Desktop Only View</h1>
                <p className="text-gray-500 font-medium font-inter">The Sales Executive Dashboard is optimized for large screens. Please switch to a tablet or desktop for the best experience.</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen font-inter text-[#2D1B4E]" style={{ background: 'linear-gradient(135deg, #f3ecf9 0%, #eaddf8 50%, #f8f6fb 100%)' }}>
            {/* --- Sidebar --- */}
            <aside className="w-[280px] bg-[#1a0b3a] text-white flex flex-col h-screen sticky top-0 overflow-hidden shrink-0 shadow-2xl shadow-indigo-900/20">
                {/* Logo Section */}
                <div className="p-8 pb-12 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#a29bfe] to-[#6c5ce7] rounded-xl flex items-center justify-center shadow-lg shadow-[#6c5ce7]/30">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter italic">Glownify</span>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
                    <SidebarLink to="/sales-executive/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
                    <SidebarLink to="/sales-executive/lead-pipeline" icon={<Zap size={18} />} label="Lead Pipeline" badge="754" />
                    <SidebarLink to="/sales-executive/my-targets" icon={<Target size={18} />} label="My Targets" />
                    <SidebarLink to="/sales-executive/manage-salesman" icon={<Users size={18} />} label="Sales Persons" />
                    <SidebarLink to="/sales-executive/my-commissions" icon={<Wallet size={18} />} label="My Commissions" />
                    <SidebarLink to="/sales-executive/quick-actions" icon={<MousePointerClick size={18} />} label="Quick Actions" />
                    <SidebarLink to="/sales-executive/support" icon={<Headphones size={18} />} label="Support" />
                </nav>

                {/* Sidebar Bottom Profile/Support Area */}
                <div className="p-6 mt-auto">
                    {/* Decorative Banner/Image */}
                    <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[4/3] group border border-white/5 shadow-2xl">
                        <img 
                          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=300&auto=format&fit=crop" 
                          alt="Spa Promotion" 
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b3a] via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full border border-white/30 overflow-hidden shadow-lg">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya" alt="Profile" className="w-full h-full object-cover" />
                             </div>
                             <div className="text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">Aditya Kumar</div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all group">
                            <HelpCircle size={18} className="group-hover:rotate-12 transition-transform" />
                            <span className="text-sm font-bold tracking-tight">Support center</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-rose-400 hover:bg-rose-500/5 transition-all group">
                            <LogOut size={18} />
                            <span className="text-sm font-bold tracking-tight">Logout</span>
                        </button>
                    </div>
                </div>
                
                {/* Copyright/Version Info */}
                <div className="px-10 pb-6 opacity-30">
                    <p className="text-[10px] font-bold tracking-widest uppercase">© 2025 Glownify v1.2</p>
                </div>
            </aside>

            {/* --- Main Content Area --- */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-8 py-5 bg-transparent shrink-0">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-xl">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6C5CE7]/60 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search anything..." 
                            className="w-full pl-14 pr-8 py-3.5 bg-white/50 backdrop-blur-md border border-white/60 rounded-full text-sm font-medium text-[#2D1B4E] placeholder-[#2D1B4E]/40 focus:bg-white focus:ring-4 focus:ring-[#8B5CF6]/5 outline-none transition-all shadow-sm"
                        />
                    </div>

                    {/* Right Side Header Items */}
                    <div className="flex items-center gap-6 ml-8">
                        <div className="hidden xl:flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-sm cursor-pointer hover:bg-white transition-all group">
                            <Globe className="w-4 h-4 text-[#6C5CE7]" />
                            <span className="text-[11px] font-black text-[#2D1B4E]">India</span>
                            <ChevronDown className="w-3 h-3 text-[#2D1B4E]/30 group-hover:translate-y-0.5 transition-transform" />
                        </div>
                        
                        <div className="flex items-center gap-4 border-l border-[#2D1B4E]/5 pl-6">
                            <div className="relative cursor-pointer group active:scale-95 transition-all">
                                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#EF4444] text-[10px] font-black text-white flex items-center justify-center rounded-full border-2 border-[#faf8fc] shadow-lg shadow-red-500/20">7</div>
                                <div className="p-2.5 bg-white/60 backdrop-blur-md rounded-xl border border-white/60 group-hover:bg-white transition-all shadow-sm">
                                    <Bell className="w-5 h-5 text-[#2D1B4E]/70" />
                                </div>
                            </div>
                            
                            <div className="relative cursor-pointer group active:scale-95 transition-all">
                                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#6C5CE7] text-[10px] font-black text-white flex items-center justify-center rounded-full border-2 border-[#faf8fc] shadow-lg shadow-indigo-500/20">9</div>
                                <div className="p-2.5 bg-white/60 backdrop-blur-md rounded-xl border border-white/60 group-hover:bg-white transition-all shadow-sm">
                                    <RefreshCcw className="w-5 h-5 text-[#2D1B4E]/70" />
                                </div>
                            </div>

                            <NavLink to="/sales-executive/profile" className="flex items-center gap-3 p-1 pr-4 bg-white/40 backdrop-blur-md rounded-full border border-white/60 hover:bg-white transition-all shadow-sm group">
                                <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-inner">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya" alt="Profile" className="w-full h-full" />
                                </div>
                                <img src="https://flagcdn.com/w40/in.png" alt="IN" className="w-5 h-3.5 rounded-sm object-cover shadow-sm group-hover:scale-105 transition-transform" />
                            </NavLink>
                        </div>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto no-scrollbar pt-2 px-8 pb-8">
                    <Outlet />
                </main>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .font-inter { font-family: 'Inter', sans-serif; }
                @keyframes glow { 0% { box-shadow: 0 0 5px rgba(162, 155, 254, 0.2); } 50% { box-shadow: 0 0 20px rgba(162, 155, 254, 0.4); } 100% { box-shadow: 0 0 5px rgba(162, 155, 254, 0.2); } }
                .animate-glow { animation: glow 2s infinite; }
            ` }} />
        </div>
    );
};

const SidebarLink = ({ to, icon, label, badge }) => (
    <NavLink 
      to={to}
      className={({ isActive }) => `
        flex items-center justify-between px-5 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 group relative
        ${isActive 
            ? 'bg-[#6c5ce7] text-white shadow-xl shadow-[#6c5ce7]/40 scale-[1.02] z-10' 
            : 'text-white/40 hover:text-white hover:bg-white/5'}
      `}
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-3.5">
            <span className={`transition-all duration-300 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
               {React.cloneElement(icon, { strokeWidth: 2.5 })}
            </span>
            <span className="text-[14px] font-black tracking-tight">{label}</span>
          </div>
          {badge && (
            <span className="text-[10px] font-black bg-[#EF4444] text-white px-2 py-0.5 rounded-[10px] shadow-lg shadow-red-500/20">
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );

export default SalesExecutiveLayout;
