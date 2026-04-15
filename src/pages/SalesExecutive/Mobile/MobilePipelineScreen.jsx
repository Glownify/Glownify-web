import React, { useState } from "react";
import { 
  TrendingUp, 
  Search,
  Zap,
  Clock,
  ChevronRight,
  Filter,
  MapPin,
  Flame,
  Sun,
  Snowflake,
  MoreVertical,
  Plus
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const funnelData = [
  { label: "DISCOVERY", count: 184, color: "bg-[#8B5CF6]", width: "100%" },
  { label: "PROPOSAL", count: 122, color: "bg-[#D946EF]", width: "70%" },
  { label: "NEGOTIATION", count: 47, color: "bg-[#F43F5E]", width: "40%" },
];

const opportunities = [
  {
    name: "Elite Hair & Spa",
    subSource: "Inbound Web",
    account: "Premium Salon",
    location: "Bandra West, Mumbai",
    status: "PROPOSAL SENT",
    statusBg: "bg-teal-50 text-teal-600",
    value: "₹ 1,20,000",
    lastAction: "Call 2h ago",
    avatar: "EH",
    avatarBg: "bg-rose-100 text-rose-600",
    assigned: "Rahul Sharma"
  },
  {
    name: "Radiance Beauty Hub",
    subSource: "Referral",
    account: "Chain Salon",
    location: "Koramangala, Bengaluru",
    status: "HOT NEGOTIATION",
    statusBg: "bg-rose-50 text-rose-600",
    value: "₹ 8,50,500",
    lastAction: "Email Yesterday",
    avatar: "RB",
    avatarBg: "bg-teal-100 text-teal-600",
    assigned: "Anjali Gupta"
  },
  {
    name: "The Royal Barbers",
    subSource: "Direct Outreach",
    account: "Individual Pro",
    location: "Hauz Khas, Delhi",
    status: "DISCOVERY",
    statusBg: "bg-slate-50 text-slate-600",
    value: "₹ 45,000",
    lastAction: "No action (3d)",
    avatar: "TR",
    avatarBg: "bg-amber-100 text-amber-600",
    assigned: "Rahul Sharma"
  }
];

const MobilePipelineScreen = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLeads, setActiveLeads] = useState(opportunities);

  const handleSearch = (q) => {
    setSearchQuery(q);
    let filtered = opportunities.filter(o => o.name.toLowerCase().includes(q.toLowerCase()));
    if (filter !== "All") {
      filtered = filtered.filter(o => o.status === filter);
    }
    setActiveLeads(filtered);
  };

  const handleFilter = (status) => {
    setFilter(status);
    let filtered = status === "All" ? opportunities : opportunities.filter(o => o.status === status);
    if (searchQuery) {
      filtered = filtered.filter(o => o.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setActiveLeads(filtered);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-left-4 duration-700 pb-20">
      <div className="space-y-1 px-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Lead Pipeline</h1>
        <p className="text-xs font-bold text-slate-400">Tracking 42 active opportunities worth ₹ 2.4Cr</p>
      </div>

      {/* Funnel Card (Mirrored from Desktop) */}
      <div className="rounded-[40px] bg-white p-8 shadow-sm ring-1 ring-slate-100 flex flex-col gap-8">
         <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Pipeline Funnel</h3>
            <span className="px-3 py-1 rounded-full bg-teal-500 text-white text-[8px] font-black uppercase">LIVE</span>
         </div>
         
         <div className="space-y-6">
            {funnelData.map((item, i) => (
               <div key={i} className="flex items-center gap-4">
                  <div className="w-16 flex flex-col items-end">
                     <span className="text-[8px] font-black text-slate-400 uppercase leading-none">{item.label}</span>
                     <span className="text-sm font-black text-slate-800">{item.count}</span>
                  </div>
                  <div className="flex-1 h-10 bg-slate-50 rounded-2xl overflow-hidden relative">
                     <div className={`h-full ${item.color} rounded-2xl shadow-sm`} style={{ width: item.width }} />
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Heat Map Mini Grid (Mirrored from Desktop) */}
      <div className="grid grid-cols-3 gap-3">
         <div className="rounded-3xl bg-rose-50 p-4 flex flex-col items-center gap-2">
            <Flame size={16} className="text-rose-500" />
            <span className="text-lg font-black text-rose-600">24</span>
            <span className="text-[7px] font-black uppercase tracking-widest text-rose-400">HOT</span>
         </div>
         <div className="rounded-3xl bg-amber-50 p-4 flex flex-col items-center gap-2">
            <Sun size={16} className="text-amber-500" />
            <span className="text-lg font-black text-amber-600">112</span>
            <span className="text-[7px] font-black uppercase tracking-widest text-amber-400">WARM</span>
         </div>
         <div className="rounded-3xl bg-blue-50 p-4 flex flex-col items-center gap-2">
            <Snowflake size={16} className="text-blue-500" />
            <span className="text-lg font-black text-blue-600">48</span>
            <span className="text-[7px] font-black uppercase tracking-widest text-blue-400">COLD</span>
         </div>
      </div>

      {/* Search and Filters */}
      <div className="px-1 pt-2 space-y-4">
         <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search leads, accounts, or city..." 
              className="w-full h-14 rounded-2xl bg-white pl-12 pr-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 shadow-sm ring-1 ring-slate-100 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
         </div>

         <div className="no-scrollbar flex items-center gap-3 overflow-x-auto pb-1">
            {["All", "HOT NEGOTIATION", "PROPOSAL SENT", "DISCOVERY"].map((f) => (
              <button 
               key={f}
               onClick={() => handleFilter(f)}
               className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all ${filter === f ? "bg-rose-500 text-white shadow-lg shadow-rose-200" : "bg-white text-slate-400 shadow-sm ring-1 ring-slate-100"}`}
              >
                {f === "HOT NEGOTIATION" ? "Hot" : f === "PROPOSAL SENT" ? "Proposals" : f}
              </button>
            ))}
         </div>
      </div>

      {/* Active Pipeline List */}
      <div className="flex flex-col gap-4">
         {activeLeads.map((lead, i) => (
            <div key={i} className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100 space-y-6 active:scale-[0.98] transition-all relative overflow-hidden group">
               <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-4">
                     <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-sm font-black ${lead.avatarBg}`}>
                        {lead.avatar}
                     </div>
                     <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                           <h3 className="text-base font-black text-slate-900 leading-tight">{lead.name}</h3>
                           <span className={`px-2 py-0.5 rounded-lg text-[7px] font-black uppercase tracking-widest ${lead.statusBg}`}>
                              {lead.status}
                           </span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{lead.account} • {lead.subSource}</p>
                     </div>
                  </div>
                  <button className="p-2 text-slate-200 group-hover:text-slate-400 transition-colors">
                     <MoreVertical size={18} />
                  </button>
               </div>

               <div className="flex items-center justify-between pt-2 border-t border-slate-50 relative z-10">
                  <div className="flex flex-col items-start gap-0.5">
                     <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Est. Value</span>
                     <span className="text-base font-black text-slate-900">{lead.value}</span>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                     <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-400 text-[9px] font-black">
                        <Clock size={12} /> {lead.lastAction}
                     </div>
                  </div>
               </div>

               <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity" />
            </div>
         ))}
         
         <div className="py-6 flex justify-center">
            <button className="text-[11px] font-black text-rose-500 uppercase tracking-tighter flex items-center gap-1 group">
               LOAD 39 MORE OPPORTUNITIES <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
      </div>

      <button className="fixed bottom-24 right-6 z-40 h-14 w-14 rounded-2xl bg-rose-500 text-white shadow-xl shadow-rose-200 flex items-center justify-center active:scale-90 transition-all">
         <Plus size={24} strokeWidth={3} />
      </button>
    </div>
  );
};

export default MobilePipelineScreen;
