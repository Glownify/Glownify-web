import React from "react";
import { 
  Target, 
  Map, 
  TrendingUp, 
  Plus,
  ChevronRight,
  Laptop
} from "lucide-react";

const districtStatus = [
  { name: "New York Metro", progress: 92, color: "bg-[#E11D48]" },
  { name: "Massachusetts", progress: 100, color: "bg-[#4B1B2A]" },
  { name: "Pennsylvania", progress: 64, color: "bg-[#4B1B2A]" },
];

const incentiveSlabs = [
  { label: "STANDARD", range: "80% - 100%", commission: "2.5% Comm.", active: true },
  { label: "ELITE", range: "100% - 120%", commission: "5.0% Comm.", active: false },
  { label: "MASTER", range: "120% +", commission: "7.5% Comm.", active: false },
];

const achievers = [
  { name: "Sarah J.", hit: "112% HIT", avatar: "https://i.pravatar.cc/100?u=sarahj" },
  { name: "Marcus R.", hit: "105% HIT", avatar: "https://i.pravatar.cc/100?u=marcusr" },
];

const MobileTargetsScreen = () => {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-700">
      {/* Laptop Icon Title */}
      <div className="flex items-center gap-2 -mt-14 mb-8 opacity-60">
         <Laptop size={16} className="text-slate-900" />
         <span className="text-xs font-black uppercase tracking-widest text-slate-900">My Targets</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Performance Targets</h1>
        <p className="text-xs font-bold text-slate-400">Q3 Fiscal Year 2024 • Northeast Region</p>
      </div>

      {/* Primary Target Card */}
      <div className="relative overflow-hidden rounded-[40px] bg-white p-8 shadow-sm ring-1 ring-slate-100">
         <div className="flex flex-col gap-2 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-teal-600">+ 0.05EM QUARTERLY TARGET</span>
            <div className="flex items-baseline gap-2">
               <h2 className="text-5xl font-black tracking-tight text-slate-900">$1.2M</h2>
               <span className="text-sm font-bold text-slate-400">/ $1.5M Goal</span>
            </div>
            
            <div className="mt-4 space-y-3">
               <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div className="h-full w-[80%] bg-[#E11D48] rounded-full" />
               </div>
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-900">80% Achieved</span>
                  <span className="text-slate-400">22 Days Remaining</span>
               </div>
            </div>
         </div>
         
         {/* Decoration concentric circles */}
         <div className="absolute top-4 right-[-20px] opacity-10 pointer-events-none">
            <div className="h-32 w-32 rounded-full border-[10px] border-[#E11D48]" />
            <div className="absolute inset-0 flex items-center justify-center scale-75">
               <div className="h-32 w-32 rounded-full border-[10px] border-[#E11D48]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center scale-50">
               <div className="h-32 w-32 rounded-full border-[10px] border-[#E11D48]" />
            </div>
         </div>
      </div>

      {/* Velocity Card */}
      <div className="rounded-[40px] bg-[#82E0D1] p-8 shadow-lg shadow-teal-50 relative overflow-hidden group">
         <div className="flex flex-col gap-1 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-teal-900/40">MONTHLY VELOCITY</span>
            <h3 className="text-4xl font-black text-teal-900">$420K</h3>
            <p className="text-[10px] font-bold text-teal-900/40">104% of August Pacing</p>
            
            <div className="mt-4">
               <TrendingUp size={24} className="text-teal-700 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
         </div>
         <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-white/20 rounded-full blur-2xl" />
      </div>

      {/* District Status Section */}
      <div className="rounded-[40px] bg-slate-50 p-8 space-y-8">
         <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">District Status</h3>
            <Map size={18} className="text-slate-400" />
         </div>

         <div className="space-y-6">
            {districtStatus.map((district, i) => (
               <div key={i} className="space-y-3">
                  <div className="flex items-end justify-between text-[11px] font-black">
                     <span className="text-slate-900">{district.name}</span>
                     <span className="text-[#E11D48]">{district.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white rounded-full overflow-hidden p-0.5">
                     <div className={`h-full ${district.color} rounded-full`} style={{ width: `${district.progress}%` }} />
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Incentive Slabs Section */}
      <div className="rounded-[40px] bg-white p-8 space-y-6 border border-slate-50">
         <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Incentive Slabs</h3>
         <div className="flex flex-col gap-3">
            {incentiveSlabs.map((slab, i) => (
               <div key={i} className={`flex items-center justify-between rounded-2xl p-4 transition-all ${slab.active ? "bg-slate-50 ring-1 ring-[#E11D48]/20" : "bg-slate-50/50"}`}>
                  <div className="flex items-center gap-3">
                     {slab.active && <div className="h-8 w-1 bg-[#E11D48] rounded-full" />}
                     <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">{slab.label}</span>
                        <span className="text-xs font-black text-slate-900">{slab.range}</span>
                     </div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                     <span className="text-[11px] font-black text-rose-500 uppercase">{slab.commission}</span>
                     {slab.active && <span className="text-[8px] font-black text-teal-500 uppercase tracking-widest">ACTIVE</span>}
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Recent Achievers Section */}
      <div className="space-y-6 pb-12">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest px-1">Recent Achievers</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
           {achievers.map((achiever, i) => (
              <div key={i} className="flex-shrink-0 flex items-center gap-4 bg-white rounded-3xl p-3 pr-6 shadow-sm ring-1 ring-slate-100">
                 <div className="p-0.5 rounded-full ring-2 ring-teal-400 ring-offset-2">
                    <img src={achiever.avatar} className="h-12 w-12 rounded-full object-cover" alt={achiever.name} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-800 whitespace-nowrap">{achiever.name}</span>
                    <span className="text-[10px] font-black text-teal-600 whitespace-nowrap uppercase tracking-widest">{achiever.hit}</span>
                 </div>
              </div>
           ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E11D48] text-white shadow-2xl shadow-rose-500/40 active:scale-95 transition-all">
        <Plus size={28} strokeWidth={3} />
      </button>
    </div>
  );
};

export default MobileTargetsScreen;
