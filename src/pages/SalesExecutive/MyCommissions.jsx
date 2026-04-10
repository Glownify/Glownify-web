import React, { memo } from "react";
import { 
  TrendingUp, 
  Wallet, 
  Calendar, 
  Award, 
  ChevronRight, 
  ArrowUpRight,
  MoreVertical,
  Briefcase,
  Lightbulb,
  MapPin
} from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";

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

const recentCommissions = [
  {
    date: { month: "Aug 24,", year: "2023" },
    account: "Global FinTech Corp",
    txId: "#TR-99821",
    status: "APPROVED",
    statusColor: "bg-teal-50 text-teal-600",
    type: "Enterprise SaaS"
  },
  {
    date: { month: "Aug 22,", year: "2023" },
    account: "TechStream Solutions",
    txId: "#TR-99745",
    status: "PENDING",
    statusColor: "bg-slate-100 text-slate-600",
    type: "Managed Services"
  },
  {
    date: { month: "Aug 18,", year: "2023" },
    account: "Quantum Logistics",
    txId: "#TR-99812",
    status: "APPROVED",
    statusColor: "bg-teal-50 text-teal-600",
    type: "Enterprise SaaS"
  },
  {
    date: { month: "Aug 15,", year: "2023" },
    account: "Astro Systems LLC",
    txId: "#TR-99504",
    status: "APPROVED",
    statusColor: "bg-teal-50 text-teal-600",
    type: "Consulting"
  }
];

const serviceCategories = [
  { label: "Enterprise SaaS", value: 65, color: "bg-[#BE185D]" },
  { label: "Managed Services", value: 25, color: "bg-teal-500" },
  { label: "Custom Solutions", value: 10, color: "bg-slate-200" },
];

const MyCommissions = () => {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">
          My Commissions
        </h1>
        <p className="max-w-2xl text-slate-500 font-bold leading-relaxed">
          Detailed breakdown of your earnings, upcoming payouts, and performance metrics for the current fiscal period.
        </p>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Earnings Card */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#BE185D] to-[#E11D48] p-10 text-white shadow-2xl shadow-rose-500/20">
          <div className="relative z-10 flex flex-col h-full justify-between gap-12">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80 mb-4">
                Current Period Earnings
              </p>
              <h2 className="text-6xl font-black tracking-tighter">$84,250</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
                <TrendingUp size={14} /> +12.4% vs last month
              </div>
            </div>
          </div>
          
          {/* Abstract Bg Decor */}
          <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute right-10 bottom-10 opacity-10">
             <Wallet size={180} strokeWidth={1} />
          </div>
        </div>

        {/* Secondary Cards & Chart */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-8 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pending Payouts</p>
                <h3 className="text-3xl font-black text-slate-800 mb-4">$12,480</h3>
                <div className="flex items-center gap-2 text-teal-600 text-xs font-black">
                    <Calendar size={14} /> Expected Sep 15
                </div>
            </div>
            <div className="rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-8 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lifetime Commissions</p>
                <h3 className="text-3xl font-black text-slate-800 mb-4">$1.2M</h3>
                <div className="flex items-center gap-2 text-rose-500 text-xs font-black">
                    <Award size={14} /> Elite Tier Achievement
                </div>
            </div>
          </div>

          <div className="flex-1 rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-wider">Growth Trajectory</h4>
                   <p className="text-[11px] font-bold text-slate-400">Annualized Performance Tracking</p>
                </div>
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase">Actual</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                      <span className="text-[10px] font-black text-slate-400 uppercase">Target</span>
                   </div>
                </div>
             </div>
             <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={performanceData}>
                      <XAxis dataKey="name" hide />
                      <Tooltip 
                        cursor={{fill: 'transparent'}}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-50">
                                        <p className="text-xs font-black text-slate-800 mb-1">{payload[0].payload.name}</p>
                                        <p className="text-[10px] font-bold text-rose-500">Actual: ${payload[0].value}</p>
                                        <p className="text-[10px] font-bold text-slate-400">Target: ${payload[1].value}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                      />
                      <Bar dataKey="target" fill="#f1f5f9" radius={[4, 4, 4, 4]} barSize={32} />
                      <Bar dataKey="actual" radius={[4, 4, 4, 4]} barSize={32}>
                         {performanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === performanceData.length - 1 ? "#BE185D" : "#fda4af"} />
                         ))}
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Commissions Table */}
        <div className="xl:col-span-2 rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md overflow-hidden shadow-sm">
          <div className="p-8 flex items-center justify-between border-b border-slate-50">
             <h3 className="text-2xl font-black text-slate-800 tracking-tight">Recent Commissions</h3>
             <button className="text-[11px] font-black text-rose-500 uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                View All History <ChevronRight size={14} />
             </button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full">
                <thead>
                   <tr className="bg-slate-50/50">
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Account/Transaction</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                   </tr>
                </thead>
                <tbody>
                   {recentCommissions.map((comm, index) => (
                      <tr key={index} className="group hover:bg-white/50 transition-colors border-b border-slate-50 last:border-0 cursor-pointer">
                         <td className="px-8 py-6">
                            <div className="flex flex-col">
                               <span className="text-sm font-black text-slate-800">{comm.date.month}</span>
                               <span className="text-[11px] font-bold text-slate-400">{comm.date.year}</span>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex flex-col">
                               <span className="text-sm font-black text-slate-800">{comm.account}</span>
                               <span className="text-[11px] font-bold text-slate-400">Transaction ID: {comm.txId}</span>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-center">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${comm.statusColor}`}>
                               {comm.status}
                            </span>
                         </td>
                         <td className="px-8 py-6 text-right font-black text-slate-500 text-sm">
                            {comm.type}
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="flex flex-col gap-6">
           <div className="rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-8 shadow-sm">
              <h3 className="text-xl font-black text-slate-800 mb-8">Service Category</h3>
              <div className="space-y-8">
                 {serviceCategories.map((cat, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex items-center justify-between text-[13px] font-black">
                          <span className="text-slate-800">{cat.label}</span>
                          <span className={cat.color.replace('bg-', 'text-')}>{cat.value}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${cat.color}`} style={{ width: `${cat.value}%` }} />
                       </div>
                    </div>
                 ))}
              </div>

              <div className="mt-12 bg-slate-50 rounded-3xl p-6 relative">
                 <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-rose-500">
                       <Lightbulb size={18} />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coach Insight</span>
                 </div>
                 <p className="text-[12px] font-bold text-slate-600 leading-relaxed">
                    Enterprise SaaS yields 1.2x higher margin this quarter. Focus prospecting here for bonus accelerators.
                 </p>
              </div>
           </div>

           <div className="relative h-64 rounded-[40px] overflow-hidden group cursor-pointer shadow-xl shadow-rose-900/20">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Summit"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#BE185D] via-transparent to-transparent opacity-90" />
              <div className="absolute inset-x-8 bottom-8 text-white">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Upcoming Summit</p>
                 <h4 className="text-2xl font-black leading-tight">President's Club 2024: Maui</h4>
                 <div className="mt-4 h-1 w-12 bg-white/50 rounded-full" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MyCommissions);
