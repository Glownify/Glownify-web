import React from "react";
import { 
  TrendingUp, 
  Target, 
  Users, 
  FileText, 
  MapPin, 
  Zap,
  Plus,
  ArrowRight,
  List,
  Wallet,
  Settings,
  Download
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const leadPipelineData = [
  { name: "Jan", value: 400000 },
  { name: "Feb", value: 300000 },
  { name: "Mar", value: 600000 },
  { name: "Apr", value: 450000 },
  { name: "May", value: 754000 },
  { name: "Jun", value: 500000 },
];

const quickActions = [
  { icon: Plus, label: "Add Lead", iconColor: "#f43f5e", bg: "#fecdd3", path: "/sales-executive/lead-pipeline" },
  { icon: Target, label: "Track Target", iconColor: "#0ea5e9", bg: "#e0f2fe", path: "/sales-executive/my-targets" },
  { icon: Users, label: "Sales Team", iconColor: "#ec4899", bg: "#fbcfe8", path: "/sales-executive/manage-salesman" },
  { icon: FileText, label: "View Reports", iconColor: "#10b981", bg: "#d1fae5", path: "/sales-executive/reports" },
  { icon: MapPin, label: "Districts", iconColor: "#f97316", bg: "#ffedd5", path: "/sales-executive/districts" },
  { icon: Zap, label: "Instant Lead", iconColor: "#8b5cf6", bg: "#ede9fe", path: "/sales-executive/lead-pipeline" },
];

const salesPerformanceData = [
  { name: "Rahul Sharma", id: "GL-EX-101", city: "Mumbai", revenue: "4,20,000", avatar: "RS" },
  { name: "Anjali Gupta", id: "GL-EX-102", city: "Bengaluru", revenue: "8,50,000", avatar: "AG" },
  { name: "Vikram Singh", id: "GL-EX-103", city: "Delhi", revenue: "2,45,000", avatar: "VS" },
];

const MobileDashboardScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="space-y-0.5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B5CF6]">Executive Analytics</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Analytics 🚀</h1>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={() => toast.success("Exporting...")} className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 ring-1 ring-slate-100"><Download size={18} /></button>
           <button onClick={() => toast.success("Settings...")} className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 ring-1 ring-slate-100"><Settings size={18} /></button>
        </div>
      </div>

      {/* Quick Actions Scroll */}
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 px-1">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            <div className="h-16 w-16 rounded-[22px] bg-white shadow-sm ring-1 ring-slate-100 flex items-center justify-center group-active:scale-90 transition-transform">
               <action.icon size={22} className="text-[#8B5CF6]" strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100 relative overflow-hidden">
           <span className="text-[9px] font-black uppercase text-slate-400">Monthly Target</span>
           <h3 className="text-2xl font-black text-slate-900 mt-1">₹ 25.0L</h3>
           <div className="mt-3 flex items-center justify-between text-[9px] font-black uppercase">
              <span className="text-[#8B5CF6]">82%</span>
              <span className="text-slate-300">₹ 4.3L Left</span>
           </div>
           <div className="mt-2 h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-rose-500" style={{ width: '82%' }} />
           </div>
           <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-60" />
        </div>
        <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
           <span className="text-[9px] font-black uppercase text-slate-400">Sales Team</span>
           <h3 className="text-2xl font-black text-slate-900 mt-1">47</h3>
           <div className="mt-3 flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="h-6 w-6 rounded-full border-2 border-white shadow-sm" alt="team" />
              ))}
              <div className="h-6 w-6 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[8px] font-black text-slate-400">+43</div>
           </div>
        </div>
      </div>

      {/* Lead Pipeline Chart Card */}
      <div className="rounded-[40px] bg-white shadow-sm ring-1 ring-slate-100 overflow-hidden relative">
         <div className="p-6 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-800">Lead Pipeline</h3>
            <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black flex items-center gap-1">
               <TrendingUp size={12} /> ₹ 45.2L
            </div>
         </div>
         
         <div className="h-40 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadPipelineData}>
                <defs>
                  <linearGradient id="colorWaveMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={4} fill="url(#colorWaveMobile)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="absolute left-6 top-2 h-16 w-16 rounded-2xl bg-[#8B5CF6] text-white flex flex-col items-center justify-center shadow-lg shadow-purple-200">
               <span className="text-xl font-black">1.2K</span>
               <span className="text-[8px] font-bold uppercase opacity-80">Leads</span>
            </div>
         </div>

         <div className="grid grid-cols-2 bg-slate-50/50 p-6 border-t border-slate-50 gap-y-4">
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hot Leads</span>
               <span className="text-sm font-black text-slate-800">₹ 12.4L</span>
            </div>
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Revenue</span>
               <span className="text-sm font-black text-slate-800">₹ 27.2L</span>
            </div>
         </div>
      </div>

      {/* Target vs Achievement Table Mini */}
      <div className="space-y-4">
         <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-black text-slate-800">Target vs Achievement</h3>
            <button onClick={() => navigate("/sales-executive/my-targets")} className="text-[10px] font-black text-[#8B5CF6] uppercase tracking-widest">VIEW ALL</button>
         </div>
         <div className="flex flex-col gap-3">
            {salesPerformanceData.map((data, i) => (
              <div key={i} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center font-black text-[#8B5CF6] text-xs">
                       {data.avatar}
                    </div>
                    <div className="flex flex-col">
                       <span className="text-sm font-black text-slate-800">{data.name}</span>
                       <span className="text-[9px] font-bold text-slate-400 uppercase">{data.city} • {data.id}</span>
                    </div>
                 </div>
                 <div className="text-right flex flex-col items-end">
                    <span className="text-sm font-black text-slate-800">₹ {data.revenue}</span>
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">SUCCESS</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Updates & Guidance */}
      <div className="rounded-[40px] bg-[#1a0b3a] p-8 text-white relative overflow-hidden">
         <h3 className="text-xl font-black mb-6">Updates & Guidance</h3>
         <div className="space-y-6">
            <div className="flex items-start gap-4">
               <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center font-black text-xs shrink-0">SP</div>
               <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest">Santosh Patel</span>
                  <p className="text-xs font-bold leading-relaxed opacity-80">Check registration status for Bandra cluster.</p>
               </div>
            </div>
            <div className="flex items-start gap-4">
               <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center font-black text-xs shrink-0">VS</div>
               <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest">Vikram Singh</span>
                  <p className="text-xs font-bold leading-relaxed opacity-80">Pune East team reporting 15% spike.</p>
               </div>
            </div>
         </div>
         <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default MobileDashboardScreen;
