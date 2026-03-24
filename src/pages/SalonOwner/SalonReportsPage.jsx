import React, { useState, useEffect } from "react";
import MobileSalonReportScreen from "./Mobile/MobileSalonReportScreen";
import {
  TrendingUp,
  Wallet,
  Calendar,
  Ticket,
  MoreVertical,
  Scissors,
  Download,
  Star as StarIcon,
  ChevronRight,
  Target,
  FileText
} from "lucide-react";

const SalonReportsPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeRange, setActiveRange] = useState("LAST 30 DAYS");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileSalonReportScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-inter text-[#1a0b3a] md:p-10">
      {/* ── HEADER ── */}
      <div className="flex items-start justify-between mb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-[#1a0b3a]">
            Performance Insight
          </h1>
          <p className="text-sm font-medium text-gray-500 max-w-lg">
            Comprehensive overview of your salon's financial health, booking trends, and staff productivity for the last 30 days.
          </p>
        </div>

        <div className="flex bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-white shadow-sm ring-1 ring-black/5">
          {["LAST 30 DAYS", "LAST QUARTER", "YEARLY"].map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                activeRange === range 
                ? "bg-[#E91E63] text-white shadow-md shadow-[#E91E63]/20" 
                : "text-gray-400 hover:text-[#1a0b3a]"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* ── TOP STAT CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* TOTAL REVENUE CARD */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#E91E63] p-8 shadow-xl shadow-[#E91E63]/20 group">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-white/70">Total Revenue</p>
              <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-inner">
                <Wallet size={20} />
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-4xl font-black text-white">$42,920.00</h2>
              <div className="flex items-center gap-1.5">
                <TrendingUp size={14} className="text-pink-200" />
                <span className="text-xs font-bold text-white/90">+12.4% <span className="text-white/60 font-medium ml-1">from last month</span></span>
              </div>
            </div>
          </div>
          {/* Decorative background circle */}
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 rounded-full bg-white/5 group-hover:scale-125 transition-transform duration-700" />
        </div>

        {/* BOOKINGS CARD */}
        <StatCard 
            title="Bookings"
            value="1,284"
            indicator="+ 8% growth"
            indicatorColor="text-emerald-500"
            icon={<Calendar className="text-teal-500" />}
            iconBg="bg-teal-50"
        />

        {/* AVG TICKET CARD */}
        <StatCard 
            title="Avg. Ticket"
            value="$114.50"
            indicator="Stable vs last period"
            indicatorColor="text-gray-400"
            icon={<Ticket className="text-indigo-500" />}
            iconBg="bg-indigo-50"
        />
      </div>

      {/* ── CHARTS SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 mb-10">
        {/* Revenue Overview (Custom Bars) */}
        <div className="lg:col-span-5 bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 flex flex-col relative">
            <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                    <h3 className="text-lg font-black text-[#1a0b3a]">Revenue Overview</h3>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Daily earnings distribution</p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400">
                    <MoreVertical size={20} />
                </button>
            </div>

            <div className="flex-1 flex items-end justify-between gap-4 px-2 min-h-[220px]">
                {[
                    { day: "MON", val: 55, active: false },
                    { day: "TUE", val: 80, active: true },
                    { day: "WED", val: 45, active: false },
                    { day: "THU", val: 95, active: true },
                    { day: "FRI", val: 65, active: false },
                    { day: "SAT", val: 100, active: true },
                    { day: "SUN", val: 40, active: false },
                ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center group cursor-pointer">
                        <div className="w-full relative min-h-[220px] flex items-end justify-center">
                            {/* Constant Track */}
                            <div className="w-16 rounded-full bg-slate-50 border border-slate-100/50 absolute top-0 bottom-0 left-1/2 -translate-x-1/2 shadow-inner" />
                            {/* Interactive Fill */}
                            <div 
                                className={`w-16 rounded-full transition-all duration-700 relative overflow-hidden flex flex-col items-center justify-end shadow-sm ${
                                    item.active ? "bg-[#E91E63]" : "bg-indigo-100/60"
                                }`} 
                                style={{ height: `${item.val}%` }}
                            >
                                {/* Top highlight / cap */}
                                <div className={`w-full h-12 rounded-full mb-[-24px] ${item.active ? "bg-white/20" : "bg-white/40"}`} />
                            </div>
                        </div>
                        <span className={`mt-6 text-[10px] font-black tracking-widest ${item.active ? "text-[#E91E63]" : "text-gray-400"}`}>{item.day}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Service Mix (Donut) */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 flex flex-col items-center">
            <h3 className="text-lg font-black text-[#1a0b3a] w-full mb-8">Service Mix</h3>
            
            <div className="relative w-48 h-48 mb-8">
                {/* SVG Donut */}
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                    {/* Background Circle */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                    {/* Segments */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#1a0b3a" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="0" className="opacity-10" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#E91E63" strokeWidth="12" strokeDasharray="113 251.2" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#14b8a6" strokeWidth="12" strokeDasharray="75 251.2" strokeDashoffset="-113" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#1a0b3a" strokeWidth="12" strokeDasharray="63.2 251.2" strokeDashoffset="-188" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-[#1a0b3a]">12</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Categories</span>
                </div>
            </div>

            <div className="w-full space-y-4">
                <MixItem label="Hair Styling" percent="45%" color="bg-[#E91E63]" />
                <MixItem label="Coloring" percent="30%" color="bg-teal-500" />
                <MixItem label="Skin & Nails" percent="25%" color="bg-[#1a0b3a]" />
            </div>
        </div>
      </div>

      {/* ── BOTTOM LISTS SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Top Services */}
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#1a0b3a]">Top Services</h3>
                <button className="text-[10px] font-black uppercase tracking-widest text-[#E91E63] hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
                <ServiceRow 
                    icon={<Scissors size={18} className="text-[#E91E63]" />} 
                    iconBg="bg-rose-50"
                    name="Signature Balayage"
                    category="TREATMENT & COLOR"
                    value="$12,450"
                    growth="+14% Growth"
                />
                <ServiceRow 
                    icon={<Target size={18} className="text-teal-500" />} 
                    iconBg="bg-teal-50"
                    name="Precision Women's Cut"
                    category="STYLING"
                    value="$8,120"
                    growth="Steady"
                    growthColor="text-gray-400"
                />
                <ServiceRow 
                    icon={<Target size={18} className="text-indigo-500" />} 
                    iconBg="bg-indigo-50"
                    name="Olaplex Recovery"
                    category="TREATMENT"
                    value="$5,900"
                    growth="+22% Growth"
                />
            </div>
        </div>

        {/* Star Specialists */}
        <div className="space-y-6">
            <div className="flex items-center justify-between py-1">
                <h3 className="text-xl font-black text-[#1a0b3a]">Star Specialists</h3>
                <button className="flex items-center gap-2 bg-[#E91E63] text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#E91E63]/30 hover:scale-105 transition-all">
                    <Download size={14} /> Export Report
                </button>
            </div>
            
            <div className="space-y-5">
                <SpecialistRow 
                    name="Sarah Jenkins" 
                    revenue="$15.2k" 
                    utility="92%" 
                    avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" 
                />
                <SpecialistRow 
                    name="Marcus Wu" 
                    revenue="$12.8k" 
                    utility="85%" 
                    avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" 
                />
                <SpecialistRow 
                    name="Elena Rodriguez" 
                    revenue="$11.4k" 
                    utility="78%" 
                    avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" 
                />
            </div>
        </div>
      </div>
    </div>
  );
};

// ── Helpers ──

const StatCard = ({ title, value, indicator, indicatorColor, icon, iconBg }) => (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between group overflow-hidden relative">
        <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-[0.15em] text-gray-400">{title}</p>
                <div className={`p-2.5 rounded-2xl ${iconBg} shadow-sm group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
            </div>
            <div className="space-y-1">
                <h2 className="text-4xl font-black text-[#1a0b3a]">{value}</h2>
                <p className={`text-[11px] font-bold ${indicatorColor}`}>
                    {indicator.startsWith('+') && <TrendingUp size={12} className="inline mr-1" />}
                    {indicator}
                </p>
            </div>
        </div>
    </div>
);

const MixItem = ({ label, percent, color }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-[11px] font-bold text-gray-500">{label}</span>
        </div>
        <span className="text-[11px] font-black text-[#1a0b3a]">{percent}</span>
    </div>
);

const ServiceRow = ({ icon, iconBg, name, category, value, growth, growthColor = "text-emerald-500" }) => (
    <div className="flex items-center justify-between bg-white p-5 rounded-[2rem] border border-gray-50 hover:border-indigo-100 transition-colors cursor-pointer group shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${iconBg} group-hover:scale-105 transition-transform`}>
                {icon}
            </div>
            <div>
                <h4 className="text-[15px] font-black text-[#1a0b3a]">{name}</h4>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{category}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-[15px] font-black text-[#1a0b3a]">{value}</p>
            <p className={`text-[9px] font-black uppercase tracking-widest ${growthColor}`}>{growth}</p>
        </div>
    </div>
);

const SpecialistRow = ({ name, revenue, utility, avatar }) => {
    const utilWidth = utility;
    return (
        <div className="flex items-center gap-5 p-2 rounded-[2rem] hover:bg-white/50 transition-colors group">
            <div className="h-14 w-14 rounded-2xl overflow-hidden shadow-md ring-2 ring-white group-hover:ring-[#E91E63]/20 transition-all">
                <img src={avatar} alt={name} className="h-full w-full bg-indigo-50" />
            </div>
            <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                    <h4 className="text-[15px] font-black text-[#1a0b3a]">{name}</h4>
                    <span className="text-xs font-black text-[#E91E63]">{revenue}</span>
                </div>
                <div className="space-y-1">
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-teal-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(20,184,166,0.3)]" 
                            style={{ width: utilWidth }}
                        />
                    </div>
                    <div className="flex justify-end pr-1">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{utility} Util.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalonReportsPage;
