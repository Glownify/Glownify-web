import React, { memo } from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  Tooltip 
} from "recharts";
import { 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  ChevronRight, 
  Lightbulb,
  Share2,
  Target,
  MoreHorizontal
} from "lucide-react";
import useMobile from "../../hooks/useMobile";
import MobileTargetsScreen from "./Mobile/MobileTargetsScreen";

const pieData = [
  { name: "Achieved", value: 82 },
  { name: "Remaining", value: 18 },
];

const velocityData = [
  { month: "July", actual: 80, isFuture: false },
  { month: "August", actual: 110, isFuture: false },
  { month: "September", actual: 95, isFuture: false },
  { month: "October", actual: 0, isFuture: true },
];

const districtData = [
  { name: "North District", tier: "Elite Tier", progress: 94, value: "$1.1M", color: "bg-teal-500" },
  { name: "West District", tier: "At Risk", progress: 68, value: "$0.8M", color: "bg-rose-500" },
  { name: "East District", tier: "Core Performance", progress: 81, value: "$0.9M", color: "bg-indigo-400" },
  { name: "Central District", tier: "Core Performance", progress: 79, value: "$0.6M", color: "bg-slate-400" },
];

const MyTargetsPage = () => {
  const isMobile = useMobile();
  
  if (isMobile) return <MobileTargetsScreen />;
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">
          My Targets
        </h1>
        <p className="text-slate-500 font-bold">
          Quarter 3 Revenue Performance Strategy
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
        {/* Main Achievement Card */}
        <div className="xl:col-span-8 rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-6 lg:p-8 2xl:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            <div className="relative w-64 h-64 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={100}
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
                    <span className="text-5xl font-black text-slate-800 leading-none">82%</span>
                    <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest mt-2">Achieved</span>
                </div>
            </div>

            <div className="flex-1 space-y-10 w-full">
                <div className="flex flex-col gap-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Quarterly Revenue</p>
                    <div className="flex items-end gap-6 flex-wrap">
                        <h3 className="text-6xl font-black text-slate-900 tracking-tighter">$3.44M</h3>
                        <div className="mb-2 flex items-center gap-1 px-3 py-1.5 rounded-full bg-teal-50 text-teal-600 text-[10px] font-black">
                           <TrendingUp size={12} /> +12.4% vs LY
                        </div>
                        <span className="mb-3 text-[13px] font-bold text-slate-400">Target Goal: <span className="text-slate-900">$4.20M</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                   <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Gap to Target</p>
                       <p className="text-3xl font-black text-rose-500">$756K</p>
                   </div>
                   <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Estimated Close</p>
                       <p className="text-3xl font-black text-slate-800">$4.32M</p>
                   </div>
                </div>
            </div>
        </div>

        {/* Districts Card */}
        <div className="xl:col-span-4 rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-6 lg:p-8 2xl:p-10 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-10">
                <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-widest">Districts</h3>
                <MoreHorizontal className="text-slate-300" size={20} />
            </div>
            <div className="space-y-8 flex-1">
                {districtData.map((d, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
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
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
        {/* Monthly Velocity Card */}
        <div className="xl:col-span-8 rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-6 lg:p-8 2xl:p-10 shadow-sm">
            <div className="flex items-center justify-between mb-12">
                <div>
                   <h3 className="text-xl font-black text-slate-800 tracking-tight">Monthly Velocity</h3>
                   <p className="text-xs font-bold text-slate-400">Revenue pacing by month in Q3</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Actuals</span>
                </div>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={velocityData} margin={{ top: 0, right: 0, left: 0, bottom: 20 }}>
                        <XAxis 
                            dataKey="month" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 900}} 
                            dy={10}
                        />
                        <Bar 
                            dataKey="actual" 
                            radius={[12, 12, 12, 12]} 
                            barSize={100}
                        >
                            {velocityData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.isFuture ? '#f1f5f9' : (index === 1 ? '#BE185D' : '#E11D48')} 
                                    stroke={entry.isFuture ? '#cbd5e1' : 'none'}
                                    strokeDasharray={entry.isFuture ? "4 4" : "0"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                {/* Future Lock Icon */}
                <div className="relative">
                   <div className="absolute top-[-140px] right-[10%] opacity-20">
                       <Lock size={40} />
                   </div>
                </div>
            </div>
        </div>

        {/* Incentive Card */}
        <div className="xl:col-span-4 rounded-[40px] bg-[#1a1a1a] p-6 lg:p-8 2xl:p-10 text-white flex flex-col justify-between shadow-2xl shadow-indigo-900/40 min-h-[400px]">
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Incentive Tier</p>
                <h3 className="text-2xl font-black italic tracking-tight">The Presidential Club</h3>
                
                <div className="mt-12 space-y-6">
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Current Progress</span>
                        <span className="text-sm font-black text-rose-500">$12,400 Bonus</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500" style={{ width: '65%' }} />
                    </div>
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.2em] opacity-30">
                        <span>$0</span>
                        <span>$15k Milestone</span>
                        <span>$25k Peak</span>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                       <Share2 size={16} />
                   </div>
                   <p className="text-[11px] font-bold opacity-60">
                      Next $250k revenue unlocks 5% accelerator
                   </p>
                </div>
            </div>
        </div>
      </div>

      {/* Footer Intelligence Banner */}
      <div className="rounded-[30px] bg-slate-50 border border-slate-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6 group cursor-pointer hover:bg-slate-100/50 transition-all">
         <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#D9F99D] flex items-center justify-center text-[#365314] shadow-sm">
                <Lightbulb size={24} />
            </div>
            <div>
               <h4 className="text-sm font-black text-slate-800 mb-1">Executive Intelligence Report</h4>
               <p className="text-[12px] font-bold text-slate-500 leading-relaxed">
                  Focusing on North District high-value renewals by Friday will secure the 85% Quarterly Milestone early.
               </p>
            </div>
         </div>
         <button className="flex items-center gap-2 text-[11px] font-black text-teal-700 uppercase tracking-widest whitespace-nowrap group-hover:translate-x-1 transition-transform">
            View Full Strategy <ChevronRight size={16} />
         </button>
      </div>
    </div>
  );
};

export default memo(MyTargetsPage);
