import React from "react";
import { 
  Users, 
  Search,
  Plus,
  Mail,
  Phone,
  Laptop
} from "lucide-react";

const teamMembers = [
  {
    name: "Julian Vance",
    id: "ID: 4E3DE-001",
    location: "Pacific Northwest",
    progress: 84,
    status: "TOP PERFORMER",
    statusBg: "bg-[#82E0D1] text-teal-800",
    avatar: "https://i.pravatar.cc/100?u=julian"
  },
  {
    name: "Elena Rodriguez",
    id: "ID: 4E3DE-002",
    location: "Southeast Coast",
    progress: 62,
    status: "ON TRACK",
    statusBg: "bg-slate-100 text-slate-500",
    avatar: "https://i.pravatar.cc/100?u=elena"
  },
  {
    name: "Marcus Thorne",
    id: "ID: 4E3DE-110",
    location: "Great Lakes",
    progress: 91,
    status: "TOP PERFORMER",
    statusBg: "bg-[#82E0D1] text-teal-800",
    avatar: "https://i.pravatar.cc/100?u=marcus"
  },
  {
    name: "Sarah Jenkins",
    id: "ID: 4E3DE-003",
    location: "Central Plains",
    progress: 38,
    status: "BELOW TARGET",
    statusBg: "bg-rose-50 text-rose-600",
    avatar: "https://i.pravatar.cc/100?u=sarah"
  },
  {
    name: "David Chen",
    id: "ID: 4E3DE-201",
    location: "West Coast Metro",
    progress: 77,
    status: "ON TRACK",
    statusBg: "bg-slate-100 text-slate-500",
    avatar: "https://i.pravatar.cc/100?u=david"
  }
];

const MobileTeamScreen = () => {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-700 pb-12">
      {/* Laptop Icon Title */}
      <div className="flex items-center gap-2 -mt-14 mb-8 opacity-60">
         <Laptop size={16} className="text-slate-900" />
         <span className="text-xs font-black uppercase tracking-widest text-slate-900">Sales Persons</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Team Directory</h1>
        <p className="text-xs font-bold text-slate-400">Manage 14 high-performance field executives</p>
      </div>

      {/* Scale Card */}
      <div className="rounded-[40px] bg-white p-8 border border-slate-50 shadow-sm relative overflow-hidden">
         <div className="space-y-6 relative z-10 text-center flex flex-col items-center">
            <div className="space-y-2">
               <h3 className="text-lg font-black text-slate-900">Scale your reach</h3>
               <p className="text-[10px] font-bold text-slate-400 max-w-[200px] mx-auto">Onboard new territory managers and assign initial sales targets.</p>
            </div>
            
            <button className="flex items-center gap-2 rounded-2xl bg-[#E11D48] px-8 py-4 text-xs font-black text-white shadow-xl shadow-rose-200 active:scale-95 transition-all">
               <Plus size={16} strokeWidth={3} /> ADD SALES PERSON
            </button>
         </div>
         
         <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />
      </div>

      {/* Search and Filter Tabs */}
      <div className="space-y-4 pt-2">
         <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID, or territory..." 
              className="w-full h-14 rounded-2xl bg-white pl-12 pr-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 shadow-sm ring-1 ring-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
            />
         </div>

         <div className="flex items-center justify-between gap-3">
            <button className="flex-1 rounded-2xl bg-white px-4 py-3 text-[10px] font-black uppercase text-teal-600 shadow-sm ring-1 ring-slate-100">Active</button>
            <button className="flex-1 rounded-2xl bg-white px-4 py-3 text-[10px] font-black uppercase text-slate-400 shadow-sm ring-1 ring-slate-100 italic">On Leave</button>
            <button className="flex-1 rounded-2xl bg-white px-4 py-3 text-[10px] font-black uppercase text-slate-400 shadow-sm ring-1 ring-slate-100">Contract</button>
         </div>
      </div>

      {/* Team Members List */}
      <div className="flex flex-col gap-5">
         {teamMembers.map((member, i) => (
            <div key={i} className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100 space-y-6">
               <div className="flex items-start gap-4">
                  <div className="relative">
                     <img src={member.avatar} className="h-16 w-16 rounded-2xl object-cover ring-4 ring-slate-50" alt={member.name} />
                     <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div className="flex flex-col pt-1">
                     <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest">{member.id}</span>
                     <h3 className="text-lg font-black text-slate-900 tracking-tight">{member.name}</h3>
                     <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">📍 {member.location}</p>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                     <span className="text-slate-400">Target Progress</span>
                     <span className="text-rose-500">{member.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-[#E11D48] rounded-full" style={{ width: `${member.progress}%` }} />
                  </div>
               </div>

               <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                     <button className="h-10 w-10 rounded-xl bg-rose-50 flex items-center justify-center text-[#E11D48] active:scale-95 transition-all">
                        <Mail size={16} />
                     </button>
                     <button className="h-10 w-10 rounded-xl bg-rose-50 flex items-center justify-center text-[#E11D48] active:scale-95 transition-all">
                        <Phone size={16} />
                     </button>
                  </div>
                  <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${member.statusBg}`}>
                     {member.status}
                  </span>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default MobileTeamScreen;
