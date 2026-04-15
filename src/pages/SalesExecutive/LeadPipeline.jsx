import React, { memo, useState } from "react";
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
import useMobile from "../../hooks/useMobile";
import MobilePipelineScreen from "./Mobile/MobilePipelineScreen";

const funnelData = [
  { label: "DISCOVERY", count: 184, color: "from-[#8B5CF6] to-[#A78BFA]", width: "100%" },
  { label: "PROPOSAL", count: 122, color: "from-[#D946EF] to-[#F0ABFC]", width: "70%" },
  { label: "NEGOTIATION", count: 47, color: "from-[#F43F5E] to-[#FB7185]", width: "40%" },
];

const heatMapData = [
  { label: "HOT LEADS", count: "24", icon: <Flame size={20} className="text-orange-500" />, color: "text-rose-500", bg: "bg-rose-50" },
  { label: "WARM LEADS", count: "112", icon: <Sun size={20} className="text-yellow-500" />, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "COLD STORAGE", count: "48", icon: <Snowflake size={20} className="text-blue-500" />, color: "text-blue-500", bg: "bg-blue-50" },
];

const opportunities = [
  {
    source: "Elite Hair & Spa",
    subSource: "Inbound Web",
    account: "Premium Salon",
    status: "PROPOSAL SENT",
    statusColor: "bg-teal-50 text-teal-600",
    value: "₹ 1,20,000",
    lastAction: "Call 2h ago",
    initials: "EH",
    initialsBg: "bg-rose-100 text-rose-600"
  },
  {
    source: "Radiance Beauty Hub",
    subSource: "Referral",
    account: "Chain Salon",
    status: "HOT NEGOTIATION",
    statusColor: "bg-rose-50 text-rose-600",
    value: "₹ 8,50,500",
    lastAction: "Email Yesterday",
    initials: "RB",
    initialsBg: "bg-teal-100 text-teal-600"
  },
  {
    source: "The Royal Barbers",
    subSource: "Direct Outreach",
    account: "Individual Pro",
    status: "DISCOVERY",
    statusColor: "bg-slate-50 text-slate-600",
    value: "₹ 45,000",
    lastAction: "No action (3d)",
    initials: "TR",
    initialsBg: "bg-amber-100 text-amber-600"
  }
];

const LeadPipeline = () => {
  const isMobile = useMobile();
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Default");

  const [activeOpportunities, setActiveOpportunities] = useState(opportunities);

  if (isMobile) return <MobilePipelineScreen />;

  const handleFilter = (status) => {
    setFilter(status);
    if (status === "All") {
      setActiveOpportunities(opportunities);
    } else {
      setActiveOpportunities(opportunities.filter(opp => opp.status === status));
    }
  };

  const handleSortBy = (type) => {
    setSortBy(type);
    const sorted = [...activeOpportunities].sort((a, b) => {
      const valA = parseInt(a.value.replace(/[^0-9]/g, ""));
      const valB = parseInt(b.value.replace(/[^0-9]/g, ""));
      return type === "Value" ? valB - valA : 0;
    });
    setActiveOpportunities(sorted);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">
          Lead Pipeline
        </h1>
        <p className="text-slate-500 font-bold">
          Tracking 42 active opportunities worth <span className="text-slate-900">₹ 2.4Cr</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8">
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
              <div 
                key={index} 
                onClick={() => handleFilter(item.label === "HOT LEADS" ? "HOT NEGOTIATION" : "All")}
                className="flex items-center justify-between p-6 rounded-[2.5rem] bg-white border border-slate-50 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
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
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-100">
               {["All", "HOT NEGOTIATION", "PROPOSAL SENT"].map((f) => (
                 <button 
                  key={f}
                  onClick={() => handleFilter(f)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                 >
                   {f === "HOT NEGOTIATION" ? "Hot" : f === "PROPOSAL SENT" ? "Proposals" : f}
                 </button>
               ))}
            </div>
            <button 
              onClick={() => handleSortBy("Value")}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all text-[13px] font-black ${sortBy === "Value" ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200" : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"}`}
            >
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
              {activeOpportunities.map((opp, index) => (
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
