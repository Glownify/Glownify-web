import React from "react";
import { 
  Target, 
  Map, 
  TrendingUp, 
  Plus,
  ChevronRight,
  PieChart as PieChartIcon,
  BarChart2,
  Lock,
  Share2,
  Lightbulb
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis } from "recharts";
import { toast } from "react-hot-toast";

const pieData = [
  { name: "Achieved", value: 82 },
  { name: "Remaining", value: 18 },
];

const velocityData = [
  { month: "Jul", actual: 80, isFuture: false },
  { month: "Aug", actual: 110, isFuture: false },
  { month: "Sep", actual: 95, isFuture: false },
  { month: "Oct", actual: 0, isFuture: true },
];

const districtStatus = [
  { name: "Mumbai West", tier: "Elite Tier", progress: 94, value: "₹ 11.0L", color: "bg-teal-500" },
  { name: "Bengaluru South", tier: "At Risk", progress: 68, value: "₹ 8.0L", color: "bg-rose-500" },
  { name: "Delhi NCR", tier: "Core Performance", progress: 81, value: "₹ 19.5L", color: "bg-indigo-400" },
];

const MobileTargetsScreen = () => {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="space-y-1 px-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Targets</h1>
        <p className="text-xs font-bold text-slate-400">Quarter 3 Revenue Strategy Overview</p>
      </div>

      {/* Main Achievement Circular Card (Mirrored from Desktop) */}
      <div className="rounded-[40px] border border-white/80 bg-white shadow-sm ring-1 ring-slate-100 p-8 flex flex-col items-center gap-8">
          <div className="relative w-48 h-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                      <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={80}
                          startAngle={90}
                          endAngle={-270}
                          dataKey="value"
                      >
                          <Cell fill="#BE185D" />
                          <Cell fill="#f1f5f9" />
                      </Pie>
                  </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-800 leading-none">82%</span>
                  <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest mt-2">Achieved</span>
              </div>
          </div>

          <div className="w-full space-y-6">
              <div className="flex flex-col items-center text-center gap-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quarterly Revenue</p>
                  <h3 className="text-5xl font-black text-slate-900 tracking-tighter">₹ 34.4L</h3>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-teal-50 text-teal-600 text-[10px] font-black w-fit">
                    <TrendingUp size={12} /> +12.4% vs LY
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                  <div className="flex flex-col items-center">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Gap to Target</p>
                      <p className="text-xl font-black text-rose-500">₹ 7.5L</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Est. Close</p>
                      <p className="text-xl font-black text-slate-800">₹ 43.2L</p>
                  </div>
              </div>
          </div>
      </div>

      {/* Monthly Velocity Section */}
      <div className="space-y-4">
         <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Monthly Velocity</h3>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-rose-500" />
               <span className="text-[10px] font-black text-slate-400 uppercase">Actuals</span>
            </div>
         </div>
         <div className="rounded-[40px] bg-white p-8 shadow-sm ring-1 ring-slate-100 overflow-hidden relative">
            <div className="h-40 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={velocityData}>
                     <XAxis dataKey="month" hide />
                     <Bar dataKey="actual" radius={[6, 6, 6, 6]} barSize={40}>
                        {velocityData.map((entry, index) => (
                           <Cell 
                              key={`cell-${index}`} 
                              fill={entry.isFuture ? '#f1f5f9' : (index === 1 ? '#BE185D' : '#E11D48')} 
                           />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
               {/* Lock Icon for Future */}
               <div className="absolute top-1/2 right-[10%] -translate-y-1/2 opacity-20 flex items-center justify-center">
                  <Lock size={32} />
               </div>
            </div>
         </div>
      </div>

      {/* Incentive Tier Card (Mirrored from Desktop) */}
      <div className="rounded-[40px] bg-[#1a1a1a] p-8 text-white shadow-xl shadow-indigo-900/10 min-h-[320px] flex flex-col justify-between">
          <div>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2">Incentive Tier</p>
              <h3 className="text-2xl font-black italic tracking-tight underline underline-offset-8 decoration-rose-500">Presidential Club</h3>
              
              <div className="mt-10 space-y-4">
                  <div className="flex justify-between items-end">
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Progress</span>
                      <span className="text-[11px] font-black text-rose-500">₹ 12,400 Bonus</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: '65%' }} />
                  </div>
                  <div className="flex justify-between text-[7px] font-black uppercase tracking-[0.2em] opacity-30">
                      <span>₹ 0</span>
                      <span>₹ 25k Peak</span>
                  </div>
              </div>
          </div>
          
          <div className="bg-white/5 rounded-3xl p-5 flex items-center gap-4 mt-8">
              <Share2 size={16} className="text-white/40" />
              <p className="text-[10px] font-bold opacity-60 leading-relaxed">
                  Next ₹ 2.5L revenue unlocks 5% accelerator
              </p>
          </div>
      </div>

      {/* Districts Status Section */}
      <div className="space-y-4">
         <h3 className="text-lg font-black text-slate-800 tracking-tight px-1 uppercase text-[10px] tracking-[0.1em] text-slate-400">Districts Overview</h3>
         <div className="flex flex-col gap-3">
            {districtStatus.map((d, i) => (
               <div key={i} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 flex items-center justify-between transition-all active:scale-[0.98]">
                  <div className="flex items-center gap-4">
                     <div className={`w-1.5 h-10 rounded-full ${d.color}`} />
                     <div>
                        <h4 className="text-sm font-black text-slate-800">{d.name}</h4>
                        <p className="text-[11px] font-bold text-slate-400">{d.tier}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className={`text-sm font-black ${d.progress > 90 ? 'text-teal-500' : d.progress < 70 ? 'text-rose-500' : 'text-slate-800'}`}>{d.progress}%</p>
                     <p className="text-[11px] font-bold text-slate-300">{d.value}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Executive Intelligence Banner */}
      <div 
         onClick={() => toast.success("Opening roadmap...")}
         className="rounded-[30px] bg-slate-50 border border-slate-100 p-8 flex flex-col items-center gap-6 group active:bg-slate-100 transition-all mb-4"
      >
         <div className="w-14 h-14 rounded-2xl bg-[#D9F99D] flex items-center justify-center text-[#365314] shadow-sm shrink-0">
            <Lightbulb size={24} />
         </div>
         <div className="text-center">
            <h4 className="text-sm font-black text-slate-800 mb-2">Executive Intelligence</h4>
            <p className="text-[11px] font-bold text-slate-500 leading-relaxed px-2">
               Focusing on Bandra high-value renewals will secure your milestone early.
            </p>
         </div>
         <button className="text-[10px] font-black text-teal-700 uppercase tracking-widest flex items-center gap-1 group-active:translate-x-1 transition-transform">
            FULL STRATEGY <ChevronRight size={14} />
         </button>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E11D48] text-white shadow-2xl shadow-rose-500/40 transition-all active:scale-90">
        <Plus size={28} strokeWidth={3} />
      </button>
    </div>
  );
};

export default MobileTargetsScreen;
