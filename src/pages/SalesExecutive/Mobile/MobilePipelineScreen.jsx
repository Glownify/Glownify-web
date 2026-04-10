import React from "react";
import { 
  TrendingUp, 
  Search,
  Zap,
  Clock,
  ChevronRight,
  Filter,
  MapPin,
  Laptop
} from "lucide-react";

const leads = [
  {
    name: "Julianne Smith",
    location: "Chicago, IL",
    status: "HOT",
    statusBg: "bg-[#82E0D1] text-teal-800",
    avatar: "JS",
    avatarBg: "bg-[#E0FAFF]",
    assigned: "Sarah Chen"
  },
  {
    name: "Marcus Knight",
    location: "Seattle, WA",
    status: "WARM",
    statusBg: "bg-orange-50 text-orange-600",
    avatar: "MK",
    avatarBg: "bg-[#F5F3FF]",
    assigned: "Dave Wilson"
  },
  {
    name: "Theodore Lee",
    location: "Austin, TX",
    status: "URGENT",
    statusBg: "bg-rose-50 text-rose-600",
    avatar: "TL",
    avatarBg: "bg-[#FFF1F2]",
    assigned: "Sarah Chen"
  }
];

const MobilePipelineScreen = () => {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-left-4 duration-700">
      {/* Laptop Icon Title */}
      <div className="flex items-center gap-2 -mt-14 mb-8 opacity-60">
         <Laptop size={16} className="text-slate-900" />
         <span className="text-xs font-black uppercase tracking-widest text-slate-900">Lead Pipeline</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Lead Pipeline</h1>
        <p className="text-xs font-bold text-slate-400">Strategic distribution overview</p>
      </div>

      {/* Portfolio Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
         <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-teal-600">Total Portfolio</span>
            <TrendingUp size={18} className="text-teal-600" />
         </div>
         <h2 className="text-5xl font-black tracking-tight text-slate-900">1,284</h2>
         <div className="mt-2 flex items-center gap-1 text-[10px] font-black text-emerald-500">
            <TrendingUp size={12} /> +12% vs last month
         </div>
         
         <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-teal-50 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Grid for Primary Categories */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-[28px] bg-[#E11D48] p-5 shadow-lg shadow-rose-200 text-white relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-80">Priority</span>
            <Zap size={14} fill="white" />
          </div>
          <h3 className="mt-3 text-3xl font-black relative z-10">42</h3>
          <p className="text-[9px] font-bold opacity-80 mt-1 relative z-10">Conversion ready</p>
          
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        </div>
        
        <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-100 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Untouched</span>
            <Clock size={14} className="text-slate-900 opacity-60" />
          </div>
          <h3 className="mt-3 text-3xl font-black text-slate-900">156</h3>
          <p className="text-[9px] font-bold text-slate-400 mt-1">Needs outreach</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 pt-2">
        <div className="relative">
           <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search by name, city or agent..." 
             className="w-full h-14 rounded-2xl bg-white pl-12 pr-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 shadow-sm ring-1 ring-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
           />
        </div>

        <div className="no-scrollbar flex items-center gap-3 overflow-x-auto pb-1">
           <button className="whitespace-nowrap rounded-full bg-[#BE185D] px-6 py-2.5 text-[10px] font-black uppercase text-white shadow-lg shadow-rose-200">All Leads</button>
           <button className="whitespace-nowrap rounded-full bg-slate-100 px-6 py-2.5 text-[10px] font-black uppercase text-slate-500">Active</button>
           <button className="whitespace-nowrap rounded-full bg-slate-100 px-6 py-2.5 text-[10px] font-black uppercase text-slate-500">Qualified</button>
           <button className="whitespace-nowrap rounded-full bg-slate-100 px-6 py-2.5 text-[10px] font-black uppercase text-slate-500">Proposed</button>
        </div>
      </div>

      {/* Active Pipeline Section */}
      <div className="space-y-4 pb-12">
        <div className="flex items-center justify-between px-1">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Pipeline</h3>
           <button className="text-[9px] font-black uppercase text-rose-500">Sort by: Date</button>
        </div>
        
        <div className="flex flex-col gap-4 relative">
          {leads.map((lead, i) => (
            <div key={i} className="rounded-[32px] bg-white p-5 shadow-sm ring-1 ring-slate-100 space-y-5 transition-all active:scale-[0.98]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-sm font-black text-teal-800 ${lead.avatarBg}`}>
                    {lead.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800">{lead.name}</span>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 capitalize">
                       <MapPin size={10} /> {lead.location}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${lead.statusBg}`}>
                  {lead.status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <div className="flex items-center gap-2">
                   <img src={`https://i.pravatar.cc/40?u=${lead.assigned}`} className="h-6 w-6 rounded-full" alt="assignee" />
                   <span className="text-[10px] font-bold text-slate-400">{lead.assigned}</span>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-rose-500 flex items-center gap-1">
                   DETAILS <ChevronRight size={12} className="stroke-[3]" />
                </button>
              </div>
            </div>
          ))}

          {/* List FAB */}
          <button className="absolute bottom-4 right-2 h-12 w-12 rounded-full bg-[#E11D48] text-white shadow-xl shadow-rose-300 flex items-center justify-center active:scale-95 transition-all">
             <Filter size={20} fill="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePipelineScreen;
