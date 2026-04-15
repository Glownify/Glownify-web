import React from "react";
import { 
  Users, 
  Search,
  Plus,
  Mail,
  Phone,
  TrendingUp,
  UserPlus2,
  ChevronRight
} from "lucide-react";
import { toast } from "react-hot-toast";

const teamMembers = [
  {
    name: "Rahul Sharma",
    id: "ID: GL-EX-101",
    location: "Mumbai West District",
    progress: 92,
    status: "ACTIVE",
    statusBg: "bg-teal-400 text-white",
    avatar: "https://i.pravatar.cc/150?u=mock-0"
  },
  {
    name: "Anjali Gupta",
    id: "ID: GL-EX-102",
    location: "Bengaluru South Zone",
    progress: 84,
    status: "ACTIVE",
    statusBg: "bg-teal-400 text-white",
    avatar: "https://i.pravatar.cc/150?u=mock-1"
  },
  {
    name: "Vikram Singh",
    id: "ID: GL-EX-103",
    location: "Delhi NCR North",
    progress: 76,
    status: "ACTIVE",
    statusBg: "bg-teal-400 text-white",
    avatar: "https://i.pravatar.cc/150?u=mock-2"
  },
  {
    name: "Sneha Patil",
    id: "ID: GL-EX-104",
    location: "Pune East Cluster",
    progress: 68,
    status: "ACTIVE",
    statusBg: "bg-teal-400 text-white",
    avatar: "https://i.pravatar.cc/150?u=mock-3"
  },
  {
    name: "Deepak Joshi",
    id: "ID: GL-EX-105",
    location: "Chennai Metro",
    progress: 45,
    status: "OUT OF OFFICE",
    statusBg: "bg-slate-100 text-slate-400",
    avatar: "https://i.pravatar.cc/150?u=mock-4"
  }
];

const MobileTeamScreen = ({ onAdd, onViewProfile }) => {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-700 pb-20">
      <div className="space-y-1 px-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sales Persons</h1>
        <p className="text-xs font-bold text-slate-400">Manage 13 high-performance field executives</p>
      </div>

      {/* Main Stats Row (Mirrored from Desktop) */}
      <div className="grid grid-cols-2 gap-4">
          <div className="rounded-[32px] bg-white p-6 shadow-sm border border-slate-50 flex flex-col items-center">
             <span className="text-[9px] font-black text-teal-500 uppercase tracking-widest mb-1">Total Active</span>
             <span className="text-2xl font-black text-slate-900">13</span>
          </div>
          <div className="rounded-[32px] bg-white p-6 shadow-sm border border-slate-50 flex flex-col items-center">
             <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1">Top Performers</span>
             <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900">28</span>
                <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 text-[8px] font-black">+4%</span>
             </div>
          </div>
      </div>

      {/* Add Executive Banner */}
      <div 
         onClick={onAdd}
         className="rounded-[40px] border-2 border-dashed border-rose-200 bg-white/40 p-8 flex flex-col items-center justify-center gap-4 transition-all hover:bg-white hover:border-rose-500 group active:scale-[0.98]"
      >
         <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 transition-all">
            <UserPlus2 size={24} />
         </div>
         <div className="text-center">
            <h4 className="text-lg font-black text-slate-800 mb-1">Add Executive</h4>
            <p className="text-xs font-bold text-slate-400">Expand your team roster</p>
         </div>
      </div>

      {/* Search Bar */}
      <div className="px-1 pt-2">
         <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID, or territory..." 
              className="w-full h-14 rounded-2xl bg-white pl-12 pr-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 shadow-sm ring-1 ring-slate-100 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all"
            />
         </div>
      </div>

      {/* Team Members List */}
      <div className="flex flex-col gap-5">
         <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Directory</h3>
            <button className="text-[10px] font-black text-[#8B5CF6] uppercase tracking-widest">FILTER</button>
         </div>

         {teamMembers.map((member, i) => (
            <div 
              key={i} 
              onClick={() => onViewProfile({ ...member, _id: `mock-${i}`, user: { name: member.name } })}
              className="rounded-[40px] bg-white p-8 shadow-sm ring-1 ring-slate-100 space-y-8 active:scale-[0.98] transition-all relative overflow-hidden group"
            >
               <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-5">
                     <div className="relative">
                        <img 
                           src={member.avatar} 
                           className="h-16 w-16 rounded-3xl object-cover ring-4 ring-slate-50 grayscale group-hover:grayscale-0 transition-all duration-500" 
                           alt={member.name} 
                        />
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-4 border-white" />
                     </div>
                     <div className="flex flex-col">
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest w-fit mb-2 ${member.statusBg}`}>
                           {member.status}
                        </span>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{member.name}</h3>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{member.location}</p>
                     </div>
                  </div>
                  <span className="text-[9px] font-black text-[#8B5CF6] opacity-60">{member.id}</span>
               </div>

               <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                     <span className="text-slate-400">Target Progress</span>
                     <span className="text-rose-500">{member.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-rose-500 rounded-full" style={{ width: `${member.progress}%` }} />
                  </div>
               </div>

               <div className="flex items-center gap-3 pt-2 relative z-10">
                  <button 
                     onClick={(e) => { e.stopPropagation(); toast.success(`Calling ${member.name}`); }}
                     className="flex-1 py-4 rounded-2xl bg-[#8B5CF6] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-200 active:scale-95 transition-all"
                  >
                     View Profile
                  </button>
                  <button 
                     onClick={(e) => { e.stopPropagation(); toast.success(`Calling ${member.name}`); }}
                     className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-rose-500 active:scale-95 transition-all"
                  >
                     <Phone size={20} />
                  </button>
               </div>
               
               {/* Glass Decoration */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity" />
            </div>
         ))}
      </div>
    </div>
  );
};

export default MobileTeamScreen;
