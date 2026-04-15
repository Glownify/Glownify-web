import React from "react";
import { 
  TrendingUp, 
  Wallet, 
  Calendar, 
  Award, 
  ChevronRight, 
  BarChart2,
  Lightbulb,
  ArrowUpRight,
  Store,
  Zap,
  Star
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, Tooltip } from "recharts";
import { toast } from "react-hot-toast";

const performanceData = [
  { name: "Jan", actual: 4000, target: 4500 },
  { name: "Feb", actual: 3000, target: 4000 },
  { name: "Mar", actual: 6000, target: 5000 },
  { name: "Apr", actual: 4500, target: 4800 },
  { name: "May", actual: 7500, target: 6000 },
  { name: "Jun", actual: 5000, target: 5500 },
  { name: "Jul", actual: 8000, target: 7000 },
  { name: "Aug", actual: 9500, target: 8000 },
];

const commissions = [
  {
    name: "Elite Hair & Spa",
    type: "ELITE SUBSCRIPTION • OCT 24",
    amount: "₹ 4,500",
    status: "APPROVED",
    statusColor: "bg-teal-50 text-teal-600",
    icon: Store,
    iconColor: "bg-teal-100 text-teal-600"
  },
  {
    name: "Radiance Beauty Hub",
    type: "PREMIUM SETUP • OCT 22",
    amount: "₹ 8,500",
    status: "PENDING",
    statusColor: "bg-slate-100 text-slate-500",
    icon: Star,
    iconColor: "bg-slate-100 text-slate-600"
  },
  {
    name: "The Royal Barbers",
    type: "STANDARD TIER • OCT 21",
    amount: "₹ 6,200",
    status: "APPROVED",
    statusColor: "bg-teal-50 text-teal-600",
    icon: Zap,
    iconColor: "bg-teal-100 text-teal-600"
  }
];

const serviceCategories = [
  { label: "Chain Salons", value: 65, color: "bg-[#BE185D]" },
  { label: "Individual Pro", value: 25, color: "bg-teal-500" },
  { label: "Home Services", value: 10, color: "bg-slate-200" },
];

const MobileCommissionsScreen = () => {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-700 pb-20">
      {/* Header */}
      <div className="space-y-1 px-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Commissions</h1>
        <p className="text-xs font-bold text-slate-400">Detailed breakdown of your earnings</p>
      </div>

      {/* Main Earnings Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#BE185D] to-[#E11D48] p-8 text-white shadow-xl shadow-rose-200">
         <div className="relative z-10 flex flex-col gap-6">
            <div className="space-y-1">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Current Period Earnings</span>
               <h2 className="text-5xl font-black tracking-tighter">₹ 84,250</h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md w-fit text-[10px] font-black">
               <TrendingUp size={12} /> +12.4% vs last month
            </div>
         </div>
         <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
         <Wallet className="absolute right-6 top-6 opacity-10" size={80} strokeWidth={1} />
      </div>

      {/* Grid for Payouts & Lifetime */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-100 flex flex-col items-center">
           <span className="text-[9px] font-black uppercase text-slate-400 mb-2 whitespace-nowrap">Pending Payouts</span>
           <h3 className="text-xl font-black text-slate-800">₹ 12,480</h3>
           <div className="mt-2 flex items-center gap-1 text-[8px] font-black text-teal-600">
              <Calendar size={10} /> Sep 15
           </div>
        </div>
        <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-100 flex flex-col items-center">
           <span className="text-[9px] font-black uppercase text-slate-400 mb-2 whitespace-nowrap">Lifetime Total</span>
           <h3 className="text-xl font-black text-slate-800">₹ 18.2L</h3>
           <div className="mt-2 flex items-center gap-1 text-[8px] font-black text-rose-500">
              <Award size={10} /> Elite Tier
           </div>
        </div>
      </div>

      {/* Growth Trajectory Chart */}
      <div className="space-y-4">
         <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Growth Trajectory</h3>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span className="text-[8px] font-black text-slate-400">ACTUAL</span>
               </div>
               <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <span className="text-[8px] font-black text-slate-400">TARGET</span>
               </div>
            </div>
         </div>
         <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="h-32 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                     <XAxis dataKey="name" hide />
                     <Bar dataKey="target" fill="#f1f5f9" radius={[4, 4, 4, 4]} barSize={20} />
                     <Bar dataKey="actual" radius={[4, 4, 4, 4]} barSize={20}>
                        {performanceData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={index === performanceData.length - 1 ? "#BE185D" : "#fda4af"} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* Recent Commissions Table Mini */}
      <div className="space-y-4">
         <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-black text-slate-800">Recent Commissions</h3>
            <button onClick={() => toast.success("History...")} className="text-[10px] font-black text-rose-500 uppercase tracking-widest">VIEW ALL</button>
         </div>
         <div className="flex flex-col gap-3">
            {commissions.map((comm, i) => (
              <div key={i} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${comm.iconColor}`}>
                       <comm.icon size={20} />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-sm font-black text-slate-800">{comm.name}</span>
                       <span className="text-[9px] font-bold text-slate-400 uppercase">{comm.type}</span>
                    </div>
                 </div>
                 <div className="text-right flex flex-col items-end gap-1">
                    <span className="text-sm font-black text-rose-500">{comm.amount}</span>
                    <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${comm.statusColor}`}>
                       {comm.status}
                    </span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Service Categories breakdown */}
      <div className="rounded-[40px] bg-white p-8 shadow-sm ring-1 ring-slate-100">
         <h3 className="text-xl font-black text-slate-800 mb-8">Service Category</h3>
         <div className="space-y-6">
            {serviceCategories.map((cat, i) => (
               <div key={i} className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                     <span className="text-slate-500">{cat.label}</span>
                     <span className={cat.color.replace('bg-', 'text-')}>{cat.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className={`h-full ${cat.color}`} style={{ width: `${cat.value}%` }} />
                  </div>
               </div>
            ))}
         </div>

         {/* Coach Insight */}
         <div className="mt-10 bg-slate-50 rounded-3xl p-6 relative">
            <div className="flex items-center gap-2 mb-2">
               <Lightbulb size={16} className="text-rose-500" />
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Coach Insight</span>
            </div>
            <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
               Premium salon clusters yield 1.2x higher margin this quarter. Focus prospecting here.
            </p>
         </div>
      </div>

      {/* Elite Summit Banner */}
      <div 
         onClick={() => toast.success("Opening President's Club...")}
         className="relative h-56 rounded-[40px] overflow-hidden group cursor-pointer shadow-lg shadow-rose-100 mb-6"
      >
         <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Summit"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#BE185D] via-transparent to-transparent opacity-90" />
         <div className="absolute inset-x-6 bottom-6 text-white">
            <p className="text-[9px] font-black uppercase tracking-widest opacity-80 mb-1">Upcoming Summit</p>
            <h4 className="text-xl font-black leading-tight">Glownify Elite 2024: Goa</h4>
            <div className="mt-3 h-1 w-10 bg-white/50 rounded-full" />
         </div>
      </div>
    </div>
  );
};

export default MobileCommissionsScreen;
