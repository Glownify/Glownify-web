import React, { memo, useState } from "react";
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  Cell,
  XAxis
} from "recharts";
import { 
  Users, 
  Store, 
  ShieldCheck, 
  TrendingUp, 
  Globe, 
  Map as MapIcon,
  ChevronRight,
  Zap,
  Target,
  FileText
} from "lucide-react";

const miniBarData = [
  { value: 40 }, { value: 65 }, { value: 45 }, { value: 90 }, { value: 75 }, { value: 100 }
];

const topSalons = [
  {
    name: "The Gilded Shear",
    location: "Beverly Hills, CA",
    revenue: "$142,000",
    progress: 85,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Lumina Wellness",
    location: "Chelsea, NY",
    revenue: "$118,500",
    progress: 70,
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Verdant MedSpa",
    location: "Austin, TX",
    revenue: "$96,400",
    progress: 55,
    image: "https://images.unsplash.com/photo-1620331700440-97f62c05763b?auto=format&fit=crop&q=80&w=200"
  }
];

const SalesReportPage = () => {
  const [viewType, setViewType] = useState("map");

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">
          Quarterly Reports
        </h1>
        <p className="text-slate-500 font-bold">
          Q3 Fiscal Year 2024 Analysis & Projections
        </p>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Revenue Growth */}
        <div className="rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-8 shadow-sm flex flex-col justify-between h-80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest mb-1">Total Revenue Growth</p>
              <h3 className="text-5xl font-black text-slate-900">$4.2M</h3>
              <p className="mt-2 text-[11px] font-bold text-slate-400">Outperforming target by $340k this quarter.</p>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-teal-50 text-teal-500 text-[10px] font-black">
              <TrendingUp size={12} /> +14.2%
            </div>
          </div>
          <div className="h-24 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={miniBarData}>
                  <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                    {miniBarData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === miniBarData.length - 1 ? "#BE185D" : "#f1f5f9"} 
                      />
                    ))}
                  </Bar>
               </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Registration Activity */}
        <div className="rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-8 shadow-sm h-80">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Registration Activity</h4>
          <div className="space-y-6">
            <ActivityItem icon={<Users size={18} />} label="New Members" value="1,248" growth="+8%" />
            <ActivityItem icon={<Store size={18} />} label="New Salons" value="312" growth="+12%" color="text-rose-500" />
            <ActivityItem icon={<ShieldCheck size={18} />} label="Active Rate" value="94.2%" growth="+0.4%" />
          </div>
        </div>

        {/* Executive Summary */}
        <div className="rounded-[40px] bg-[#BE185D] p-8 text-white shadow-2xl shadow-rose-900/20 flex flex-col justify-between h-80">
          <div>
             <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-6">Executive Summary</p>
             <h3 className="text-2xl font-bold leading-relaxed tracking-tight">
               Northwest territory is showing a 22% spike in high-end treatment registrations.
             </h3>
          </div>
          <button className="w-full py-4 rounded-2xl bg-white text-[#BE185D] text-sm font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
             View Territory Map
          </button>
        </div>
      </div>

      {/* Market Density & Top Salons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map Section */}
        <div className="lg:col-span-7 rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-8 shadow-sm">
           <div className="flex items-center justify-between mb-8">
             <div>
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Market Density Index</h3>
               <p className="text-xs font-bold text-slate-400">Relative growth potential across major metropolitan zones.</p>
             </div>
             <div className="flex p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                <button 
                  onClick={() => setViewType('map')}
                  className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${viewType === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                >
                  Map View
                </button>
                <button 
                  onClick={() => setViewType('list')}
                  className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${viewType === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                >
                  List View
                </button>
             </div>
           </div>
           
           <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-slate-900 group">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" 
                alt="Market Map"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-indigo-900/40" />
              
              {/* Markers */}
              <div className="absolute top-[30%] left-[25%] p-4 bg-white rounded-2xl shadow-2xl border border-white/50 animate-bounce">
                 <p className="text-[8px] font-black text-slate-400 uppercase">Manhattan Hub</p>
                 <p className="text-xs font-black text-rose-500">8.4 Density</p>
              </div>
              <div className="absolute bottom-[40%] right-[35%] p-4 bg-white rounded-2xl shadow-2xl border border-white/50">
                 <p className="text-[8px] font-black text-slate-400 uppercase">Soho District</p>
                 <p className="text-xs font-black text-teal-600">6.1 Density</p>
              </div>
           </div>
        </div>

        {/* Top Salons */}
        <div className="lg:col-span-5 rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-8 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Top Performing Salons</h3>
              <button className="text-[11px] font-black text-rose-500 uppercase tracking-widest hover:translate-x-1 transition-transform">
                 View Rankings
              </button>
           </div>
           <div className="space-y-6">
             {topSalons.map((salon, i) => (
                <div key={i} className="flex items-center gap-6 p-4 rounded-3xl hover:bg-white transition-all cursor-pointer group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                     <img src={salon.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={salon.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-black text-slate-800 truncate">{salon.name}</h4>
                        <span className="text-sm font-black text-slate-800">{salon.revenue}</span>
                     </div>
                     <div className="flex justify-between items-center mb-3">
                        <p className="text-[11px] font-bold text-slate-400">{salon.location}</p>
                        <p className="text-[9px] font-black text-teal-500 uppercase">Monthly Rev</p>
                     </div>
                     <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500" style={{ width: `${salon.progress}%` }} />
                     </div>
                  </div>
                </div>
             ))}
           </div>
        </div>
      </div>

      {/* Bottom Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <InsightCard 
           icon={<Zap size={18} className="text-rose-500" />} 
           title="Commission Projection"
           desc="Estimated executive payouts for Q3 are tracking 5% higher than last year due to record-breaking salon onboardings."
         />
         <InsightCard 
           icon={<Target size={18} className="text-teal-500" />} 
           title="Growth Velocity"
           desc="The current customer acquisition cost (CAC) has decreased by 12.5% through optimized field sales digital routing."
         />
         <InsightCard 
           icon={<ShieldCheck size={18} className="text-indigo-500" />} 
           title="Compliance Rating"
           desc="99.8% of all reporting cycles are within regulatory parameters. All automated audits completed for the current period."
         />
      </div>
    </div>
  );
};

const ActivityItem = ({ icon, label, value, growth, color = "text-teal-500" }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
        {icon}
      </div>
      <div>
        <p className="text-xs font-black text-slate-800">{value}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">{label}</p>
      </div>
    </div>
    <span className={`text-xs font-black ${color}`}>{growth}</span>
  </div>
);

const InsightCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md shadow-sm hover:translate-y-[-4px] transition-all">
    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
      {icon}
    </div>
    <h4 className="text-lg font-black text-slate-800 mb-4">{title}</h4>
    <p className="text-xs font-bold text-slate-500 leading-relaxed">
      {desc}
    </p>
  </div>
);

export default memo(SalesReportPage);
