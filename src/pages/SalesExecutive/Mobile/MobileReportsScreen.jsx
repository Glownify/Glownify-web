import React from "react";
import { 
  TrendingUp, 
  ChevronRight,
  BarChart3,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Laptop
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, Cell, XAxis } from "recharts";

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

const registrations = [
  {
    name: "Aura Luxury Spa",
    location: "New York • Premium Tier",
    status: "ACTIVE",
    statusBg: "bg-emerald-100 text-emerald-600",
    image: "https://images.unsplash.com/photo-1544161515-4ae6ce6fe858?auto=format&fit=crop&q=80&w=100"
  },
  {
    name: "The Loft Grooming",
    location: "Brooklyn • Standard Tier",
    status: "PENDING",
    statusBg: "bg-slate-100 text-slate-500",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=100"
  },
  {
    name: "Serenity Studio",
    location: "Manhattan • Enterprise",
    status: "ACTIVE",
    statusBg: "bg-emerald-100 text-emerald-600",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=100"
  }
];

const MobileReportsScreen = () => {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-700">
      {/* Laptop Icon Title (Matches Image 2) */}
      <div className="flex items-center gap-2 -mt-14 mb-8 opacity-60">
         <Laptop size={16} className="text-slate-900" />
         <span className="text-xs font-black uppercase tracking-widest text-slate-900">Reports</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Quarterly Reports</h1>
        <p className="text-xs font-bold text-slate-400">Performance insights & field activity overview</p>
      </div>

      {/* Revenue Growth Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="flex flex-col gap-1 mb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-600">Total Revenue Growth</span>
          <div className="flex items-end gap-3">
             <h2 className="text-4xl font-black tracking-tight text-slate-900">$142.8k</h2>
             <div className="flex items-center gap-0.5 text-[10px] font-black text-emerald-500 pb-1">
                <TrendingUp size={12} /> +12.4%
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

      {/* Target Completion Circular Card */}
      <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="flex flex-col items-center gap-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 self-start">Target Completion</span>
          
          <div className="relative flex items-center justify-center">
             <svg className="h-32 w-32 -rotate-90">
                <circle cx="64" cy="64" r="50" fill="transparent" stroke="#F1F5F9" strokeWidth="12" />
                <circle cx="64" cy="64" r="50" fill="transparent" stroke="#E11D48" strokeWidth="12" strokeDasharray={314} strokeDashoffset={314 * (1 - 0.82)} strokeLinecap="round" />
             </svg>
             <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900">82%</span>
             </div>
          </div>

          <button className="w-full rounded-2xl bg-[#E11D48] py-4 text-xs font-black text-white shadow-xl shadow-rose-500/20 active:scale-95 transition-all">
             View Pipeline
          </button>
        </div>
      </div>

      {/* Registration Activity Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col">
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Registration Activity</h3>
          </div>
          <div className="flex items-center bg-slate-100 rounded-full p-1">
             <button className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase bg-[#82E0D1] text-teal-800">Weekly</button>
             <button className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase text-slate-400">Monthly</button>
          </div>
        </div>

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

      {/* Recent Registrations Section */}
      <div className="space-y-4 pb-12">
        <h3 className="text-xl font-black text-slate-900 tracking-tight px-1">Recent Registrations</h3>
        <div className="flex flex-col gap-3">
          {registrations.map((reg, i) => (
            <div key={i} className="flex items-center justify-between rounded-[24px] bg-white p-3 shadow-sm ring-1 ring-slate-100 transition-all active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <img src={reg.image} alt={reg.name} className="h-14 w-14 rounded-2xl object-cover" />
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-800">{reg.name}</span>
                  <span className="text-[9px] font-bold text-slate-400 capitalize">{reg.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${reg.statusBg}`}>
                  {reg.status}
                </span>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileReportsScreen;
