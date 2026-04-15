import React, { useState } from "react";
import { 
  TrendingUp, 
  ChevronRight,
  BarChart3,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Laptop,
  Users,
  Store,
  ShieldCheck,
  Zap,
  Target,
  MapPin,
  FileText
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, Cell, XAxis } from "recharts";
import { toast } from "react-hot-toast";

const revenueGrowthData = [
  { name: "1", value: 30 },
  { name: "2", value: 45 },
  { name: "3", value: 35 },
  { name: "4", value: 60 },
  { name: "5", value: 40 },
  { name: "6", value: 55 },
  { name: "7", value: 90 },
];

const registrationActivityData = [
  { name: "MON", value: 40 },
  { name: "TUE", value: 35 },
  { name: "WED", value: 30 },
  { name: "THU", value: 45 },
  { name: "FRI", value: 60 },
  { name: "SAT", value: 85 },
  { name: "SUN", value: 70 },
];

const topSalons = [
  {
    name: "Elite Hair & Spa",
    location: "Bandra West, Mumbai",
    revenue: "₹ 1,42,000",
    progress: 85,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Radiance Beauty Hub",
    location: "Koramangala, Bengaluru",
    revenue: "₹ 1,18,500",
    progress: 70,
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "The Royal Barbers",
    location: "Hauz Khas, Delhi",
    revenue: "₹ 96,400",
    progress: 55,
    image: "https://images.unsplash.com/photo-1620331700440-97f62c05763b?auto=format&fit=crop&q=80&w=200"
  }
];

const MobileReportsScreen = () => {
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const periods = ["Weekly", "Monthly", "Yearly"];

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-700 pb-20">
      <div className="flex flex-col gap-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{timePeriod} Reports</h1>
          <p className="text-xs font-bold text-slate-400">
            {timePeriod === "Weekly" ? "Performance for Week 42" : timePeriod === "Monthly" ? "October 2026 Strategic Overview" : "Fiscal Year 2026 Analysis"}
          </p>
        </div>

        {/* Global Time Toggle */}
        <div className="flex p-1 bg-white rounded-2xl border border-slate-100 shadow-sm">
           {periods.map((period) => (
             <button
               key={period}
               onClick={() => setTimePeriod(period)}
               className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 timePeriod === period 
                 ? "bg-rose-500 text-white shadow-lg shadow-rose-200" 
                 : "text-slate-400"
               }`}
             >
               {period}
             </button>
           ))}
        </div>
      </div>

      {/* Revenue Growth Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="flex flex-col gap-1 mb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-600">Total Revenue Growth</span>
          <div className="flex items-end gap-3">
             <h2 className="text-4xl font-black tracking-tight text-slate-900">₹ 4.2L</h2>
             <div className="flex items-center gap-0.5 text-[10px] font-black text-emerald-500 pb-1">
                <TrendingUp size={12} /> +14.2%
             </div>
          </div>
        </div>

        <div className="h-28 w-full mt-2">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={revenueGrowthData}>
               <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={20}>
                 {revenueGrowthData.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={index === revenueGrowthData.length - 1 ? "#E11D48" : "#F1F5F9"} />
                 ))}
               </Bar>
             </BarChart>
           </ResponsiveContainer>
        </div>
        
        <div className="absolute top-6 right-6">
           <Sparkles size={20} className="text-slate-100" />
        </div>
      </div>

      {/* Registration Activity Cards */}
      <div className="grid grid-cols-1 gap-4">
        <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Activity metrics</h4>
           <div className="space-y-5">
              <ActivityItem icon={<Users size={16} />} label="New Members" value="1,248" growth="+8%" />
              <ActivityItem icon={<Store size={16} />} label="New Salons" value="312" growth="+12%" color="text-rose-500" />
              <ActivityItem icon={<ShieldCheck size={16} />} label="Active Rate" value="94.2%" growth="+0.4%" />
           </div>
        </div>
      </div>

      {/* Executive Summary Card */}
      <div className="rounded-[32px] bg-[#BE185D] p-8 text-white shadow-xl shadow-rose-900/10 flex flex-col gap-6">
         <div className="space-y-2">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Executive Summary</span>
            <h3 className="text-xl font-bold leading-tight">Northwest territory is showing a 22% spike in high-end treatments.</h3>
         </div>
         <button onClick={() => toast.success("Opening map...")} className="w-full py-4 rounded-2xl bg-white text-[#BE185D] text-xs font-black shadow-lg">VIEW TERRITORY MAP</button>
      </div>

      {/* Market Density Card (Replacing Map for Mobile) */}
      <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-100 flex flex-col gap-6">
         <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
               <h4 className="text-[13px] font-black text-slate-800">Market Density Index</h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase">Growth Potential Tracker</p>
            </div>
            <MapPin size={20} className="text-rose-500" />
         </div>
         
         <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 flex items-center justify-between">
               <span className="text-xs font-black text-slate-700">Bandra Hub</span>
               <span className="text-xs font-black text-rose-500">8.4 Density</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 flex items-center justify-between">
               <span className="text-xs font-black text-slate-700">Koramangala Zone</span>
               <span className="text-xs font-black text-teal-600">6.1 Density</span>
            </div>
         </div>
      </div>

      {/* Registration Activity Chart Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-800 tracking-tight px-1 uppercase text-[10px] tracking-[0.1em] text-slate-400">Registration Trends</h3>
        <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
           <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={registrationActivityData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 8, fontWeight: 900, fill: '#94a3b8'}} dy={10} />
                    <Line type="monotone" dataKey="value" stroke="#882C44" strokeWidth={3} dot={false} />
                 </LineChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Top Performing Salons Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
           <h3 className="text-xl font-black text-slate-900 tracking-tight">Top Performing Salons</h3>
           <button onClick={() => toast.success("Rankings...")} className="text-[10px] font-black text-rose-500 uppercase tracking-widest">RANKINGS</button>
        </div>
        <div className="flex flex-col gap-4">
          {topSalons.map((salon, i) => (
            <div key={i} className="flex items-center gap-4 rounded-[32px] bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-all active:scale-[0.98]">
               <img src={salon.image} alt={salon.name} className="h-16 w-16 rounded-2xl object-cover" />
               <div className="flex-1 min-w-0 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-black text-slate-800 truncate">{salon.name}</span>
                     <span className="text-sm font-black text-slate-800 shrink-0">{salon.revenue}</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-black text-slate-400 tracking-widest uppercase">
                     <span>{salon.location}</span>
                     <span className="text-teal-500">+{salon.progress}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                     <div className="h-full bg-rose-500" style={{ width: `${salon.progress}%` }} />
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Insights Cards (Mirrored from Desktop Bottom Row) */}
      <div className="space-y-4 pb-12">
         <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Strategic Insights</h3>
         <div className="flex flex-col gap-4">
            <InsightCard 
               icon={<Zap size={18} className="text-rose-500" />} 
               title="Commission Projection"
               desc="Estimated executive payouts for Q3 are tracking 5% higher."
            />
            <InsightCard 
               icon={<Target size={18} className="text-teal-500" />} 
               title="Growth Velocity"
               desc="Customer acquisition cost decreased by 12.5% through digital routing."
            />
         </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ icon, label, value, growth, color = "text-teal-500" }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
        {icon}
      </div>
      <div>
        <p className="text-xs font-black text-slate-800 leading-none">{value}</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">{label}</p>
      </div>
    </div>
    <span className={`text-[10px] font-black ${color}`}>{growth}</span>
  </div>
);

const InsightCard = ({ icon, title, desc }) => (
  <div className="p-6 rounded-[32px] border border-white/80 bg-white/70 backdrop-blur-md shadow-sm active:scale-[0.98] transition-all">
    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
      {icon}
    </div>
    <h4 className="text-base font-black text-slate-800 mb-2">{title}</h4>
    <p className="text-[11px] font-bold text-slate-500 leading-relaxed opacity-70">
      {desc}
    </p>
  </div>
);

export default MobileReportsScreen;
