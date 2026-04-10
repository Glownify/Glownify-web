import React from "react";
import { 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  Plus,
  ChevronRight,
  Store,
  Calendar,
  Zap,
  Banknote
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis } from "recharts";

const performanceBreakdownData = [
  { name: "WK1", value: 30 },
  { name: "WK2", value: 65, active: true },
  { name: "WK3", value: 40 },
  { name: "WK4", value: 85, highlight: true },
  { name: "WK5", value: 50 },
];

const commissions = [
  {
    name: "Luxe Beauty Studio",
    type: "NEW REGISTRATION • OCT 24",
    amount: "+$450.00",
    status: "SETTLED",
    statusColor: "bg-emerald-50 text-emerald-500",
    icon: Store,
    iconColor: "bg-teal-100 text-teal-600"
  },
  {
    name: "Velvet Hair Salon",
    type: "ELITE SUBSCRIPTION • OCT 22",
    amount: "+$850.00",
    status: "PENDING",
    statusColor: "bg-slate-100 text-slate-500",
    icon: Calendar,
    iconColor: "bg-slate-100 text-slate-600"
  },
  {
    name: "Gentlemen's Quarters",
    type: "PREMIUM SETUP • OCT 21",
    amount: "+$620.00",
    status: "SETTLED",
    statusColor: "bg-emerald-50 text-emerald-500",
    icon: Zap,
    iconColor: "bg-teal-100 text-teal-600"
  }
];

const MobileEarningsScreen = () => {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-700">
      {/* Page Title Row (Matches Image 1 layout) */}
      <div className="flex items-center justify-center -mt-14 mb-8">
         <h1 className="text-lg font-black text-rose-500">Earnings</h1>
      </div>

      {/* Main Earnings Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] ring-1 ring-slate-100">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Earnings</span>
          <h2 className="text-4xl font-black tracking-tight text-slate-900">$12,840.00</h2>
        </div>
        
        <div className="mt-4 flex items-center gap-2 text-emerald-500">
          <TrendingUp size={16} />
          <span className="text-xs font-black">+14.2% from last month</span>
        </div>

        <div className="absolute top-6 right-6 h-12 w-16 bg-slate-50 rounded-2xl flex items-center justify-center opacity-40">
           <Banknote size={24} className="text-slate-400" />
        </div>
        
        <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-rose-50 rounded-full blur-3xl" />
      </div>

      {/* Grid for Pending & Target */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Pending</span>
          <h3 className="mt-2 text-2xl font-black text-slate-900">$2,450</h3>
          <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-[60%] bg-rose-500 rounded-full" />
          </div>
        </div>
        
        <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Target</span>
          <h3 className="mt-2 text-2xl font-black text-slate-900">85%</h3>
          <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-emerald-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Performance Breakdown Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col">
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Performance Breakdown</h3>
            <span className="text-[10px] font-bold text-slate-400">Target vs Actual Revenue</span>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Quarterly</span>
             <button className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-0.5">VIEW <ChevronRight size={12} /></button>
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceBreakdownData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 8, fontWeight: 900, fill: '#94a3b8'}} dy={10} />
                <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={40}>
                  {performanceBreakdownData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.highlight ? "#9F1239" : entry.active ? "#E11D48" : "#E2E8F0"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Commissions Section */}
      <div className="space-y-4 pb-12">
        <h3 className="text-xl font-black text-slate-900 tracking-tight px-1">Recent Commissions</h3>
        <div className="flex flex-col gap-3">
          {commissions.map((comm, i) => (
            <div key={i} className="flex items-center justify-between rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-all active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${comm.iconColor}`}>
                  <comm.icon size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-800">{comm.name}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{comm.type}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-sm font-black text-rose-500">{comm.amount}</span>
                <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${comm.statusColor}`}>
                  {comm.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E11D48] text-white shadow-2xl shadow-rose-500/40 transition-all active:scale-90 active:rotate-90">
        <Plus size={28} strokeWidth={3} />
      </button>
    </div>
  );
};

export default MobileEarningsScreen;
