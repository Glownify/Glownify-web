import React, { memo } from "react";
import { 
  TrendingUp, 
  Flame, 
  Sun, 
  Snowflake, 
  Filter, 
  ArrowUpDown, 
  MoreVertical,
  MousePointer2,
  PhoneCall,
  Search,
  ChevronRight
} from "lucide-react";

const funnelData = [
  { label: "DISCOVERY", count: 18, color: "from-[#8B5CF6] to-[#A78BFA]", width: "100%" },
  { label: "PROPOSAL", count: 12, color: "from-[#D946EF] to-[#F0ABFC]", width: "70%" },
  { label: "NEGOTIATION", count: 7, color: "from-[#F43F5E] to-[#FB7185]", width: "40%" },
];

const heatMapData = [
  { label: "HOT LEADS", count: "09", icon: <Flame size={20} className="text-orange-500" />, color: "text-rose-500", bg: "bg-rose-50" },
  { label: "WARM LEADS", count: "22", icon: <Sun size={20} className="text-yellow-500" />, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "COLD STORAGE", count: "11", icon: <Snowflake size={20} className="text-blue-500" />, color: "text-blue-500", bg: "bg-blue-50" },
];

const opportunities = [
  {
    source: "Stellar Media Group",
    subSource: "Inbound Web",
    account: "Enterprise Tier 1",
    status: "PROPOSAL SENT",
    statusColor: "bg-teal-50 text-teal-600",
    value: "$120,000",
    lastAction: "Call 2h ago",
    initials: "SM",
    initialsBg: "bg-rose-100 text-rose-600"
  },
  {
    source: "Apex Logistics",
    subSource: "Referral",
    account: "Mid-Market",
    status: "HOT NEGOTIATION",
    statusColor: "bg-rose-50 text-rose-600",
    value: "$85,500",
    lastAction: "Email Yesterday",
    initials: "AL",
    initialsBg: "bg-teal-100 text-teal-600"
  },
  {
    source: "NextKindness Corp",
    subSource: "Direct Outreach",
    account: "Government",
    status: "DISCOVERY",
    statusColor: "bg-slate-50 text-slate-600",
    value: "$440,000",
    lastAction: "No action (3d)",
    initials: "NK",
    initialsBg: "bg-amber-100 text-amber-600"
  }
];

const LeadPipeline = () => {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">
          Lead Pipeline
        </h1>
        <p className="text-slate-500 font-bold">
          Tracking 42 active opportunities worth <span className="text-slate-900">$2.4M</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pipeline Funnel */}
        <div className="lg:col-span-2 rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-8 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Pipeline Funnel</h3>
            <span className="px-4 py-1.5 rounded-full bg-teal-400 text-white text-[10px] font-black uppercase tracking-wider">
              LIVE VELOCITY
            </span>
          </div>

          <div className="space-y-8">
            {funnelData.map((item, index) => (
              <div key={index} className="flex items-center gap-6">
                <div className="w-32 text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-2xl font-black text-slate-800">{item.count}</p>
                </div>
                <div className="flex-1 h-12 bg-slate-100/50 rounded-2xl overflow-hidden relative">
                  <div 
                    className={`h-full bg-gradient-to-r ${item.color} rounded-2xl shadow-lg shadow-purple-500/10`}
                    style={{ width: item.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heat Map */}
        <div className="rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Heat Map</h3>
          <div className="flex flex-col gap-4">
            {heatMapData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-6 rounded-[2.5rem] bg-white border border-slate-50 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${item.color}`}>{item.label}</p>
                  <p className="text-3xl font-black text-slate-800">{item.count}</p>
                </div>
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Opportunities Table */}
      <div className="rounded-[40px] border border-white/80 bg-white/80 backdrop-blur-md overflow-hidden shadow-sm">
        <div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Active Opportunities</h3>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-[13px] font-black text-slate-600 hover:bg-slate-100 transition-colors">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-[13px] font-black text-slate-600 hover:bg-slate-100 transition-colors">
              <ArrowUpDown size={16} /> Sort by Value
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50/50">
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Source</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Account</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Value</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Action</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp, index) => (
                <tr key={index} className="group hover:bg-white/50 transition-colors border-b border-slate-50 last:border-0 cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm ${opp.initialsBg}`}>
                        {opp.initials}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{opp.source}</p>
                        <p className="text-[11px] font-bold text-slate-400">{opp.subSource}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-600">{opp.account}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black ${opp.statusColor}`}>
                      {opp.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-800">{opp.value}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-400">{opp.lastAction}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 flex justify-center border-t border-slate-50 bg-white/30 hover:bg-white/50 transition-colors cursor-pointer group">
          <button className="text-[13px] font-black text-rose-500 flex items-center gap-2 group-hover:scale-105 transition-transform">
            View All 42 Opportunities
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      {/* Floating Action Button - as seen in image */}
      <button className="fixed bottom-12 right-12 w-16 h-16 rounded-full bg-rose-500 text-white shadow-2xl shadow-rose-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <PhoneCall size={28} className="group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white text-rose-500 text-[10px] font-black rounded-full flex items-center justify-center shadow-md">
          +
        </div>
      </button>
    </div>
  );
};

export default memo(LeadPipeline);
