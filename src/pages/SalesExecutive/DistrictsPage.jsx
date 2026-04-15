import React, { memo } from "react";
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  Target, 
  ChevronRight, 
  Search,
  Filter,
  ArrowRight,
  Plus
} from "lucide-react";
import { toast } from "react-hot-toast";
import useMobile from "../../hooks/useMobile";

const districtData = [
  { 
    name: "Mumbai West", 
    manager: "Rahul Sharma", 
    leads: 450, 
    conversion: "24%", 
    revenue: "₹ 12.5L", 
    growth: "+14%",
    status: "Performing",
    statusColor: "text-emerald-500 bg-emerald-50"
  },
  { 
    name: "Bengaluru South", 
    manager: "Anjali Gupta", 
    leads: 320, 
    conversion: "18%", 
    revenue: "₹ 8.2L", 
    growth: "+8%",
    status: "Stable",
    statusColor: "text-blue-500 bg-blue-50"
  },
  { 
    name: "Delhi NCR", 
    manager: "Vikram Singh", 
    leads: 580, 
    conversion: "21%", 
    revenue: "₹ 19.5L", 
    growth: "+22%",
    status: "High Growth",
    statusColor: "text-rose-500 bg-rose-50"
  },
  { 
    name: "Pune Cluster", 
    manager: "Sneha Patil", 
    leads: 210, 
    conversion: "15%", 
    revenue: "₹ 6.2L", 
    growth: "-2%",
    status: "At Risk",
    statusColor: "text-amber-500 bg-amber-50"
  },
  { 
    name: "Hyderabad IT", 
    manager: "Amit Verma", 
    leads: 390, 
    conversion: "20%", 
    revenue: "₹ 11.4L", 
    growth: "+11%",
    status: "Performing",
    statusColor: "text-emerald-500 bg-emerald-50"
  },
  { 
    name: "Chennai Metro", 
    manager: "Priya Nair", 
    leads: 280, 
    conversion: "19%", 
    revenue: "₹ 9.1L", 
    growth: "+5%",
    status: "Stable",
    statusColor: "text-blue-500 bg-blue-50"
  }
];

const DistrictsPage = () => {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Districts</h1>
          <p className="text-xs font-bold text-slate-400">Territory performance & coverage</p>
        </div>

        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search districts..." 
            className="w-full h-14 rounded-2xl bg-white pl-12 pr-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 shadow-sm ring-1 ring-slate-100 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all"
          />
        </div>

        <div className="flex flex-col gap-4 pb-12">
          {districtData.map((district, i) => (
            <div key={i} className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-100 space-y-4 transition-all active:scale-[0.98]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#8B5CF6]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">{district.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{district.manager}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${district.statusColor}`}>
                  {district.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Revenue</p>
                  <p className="text-lg font-black text-slate-800">{district.revenue}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Leads</p>
                  <p className="text-lg font-black text-slate-800">{district.leads}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#8B5CF6]">
                <div className="flex items-center gap-1">
                   <TrendingUp size={12} /> {district.growth} Growth
                </div>
                <button className="flex items-center gap-1">
                  TERRITORY MAP <ChevronRight size={12} className="stroke-[3]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Districts Overview</h1>
        <p className="text-slate-500 font-bold">Managing 12 active clusters across the region</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {districtData.map((district, i) => (
          <div key={i} className="group relative overflow-hidden rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-start justify-between mb-8">
              <div className="h-16 w-16 rounded-2xl bg-purple-50 flex items-center justify-center text-[#8B5CF6] group-hover:scale-110 transition-transform">
                <MapPin size={32} />
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${district.statusColor}`}>
                {district.status}
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{district.name}</h3>
              <p className="text-sm font-bold text-slate-400 mt-1">Manager: {district.manager}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8 pt-8 border-t border-slate-50">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</p>
                <p className="text-2xl font-black text-slate-900">{district.revenue}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Leads</p>
                <p className="text-2xl font-black text-slate-900">{district.leads}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-500 font-black text-sm">
                <TrendingUp size={16} /> {district.growth}
              </div>
              <button 
                onClick={() => toast.success(`Opening detailed analytics for ${district.name}`)}
                className="flex items-center gap-2 text-xs font-black text-[#8B5CF6] hover:translate-x-1 transition-transform uppercase tracking-widest outline-none"
              >
                Details <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => toast.success("Opening territory expansion request form...")}
          className="rounded-[40px] border-2 border-dashed border-purple-200 bg-white/40 p-8 flex flex-col items-center justify-center gap-4 transition-all hover:bg-white hover:border-[#8B5CF6] group min-h-[350px] outline-none"
        >
           <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-purple-50 group-hover:text-[#8B5CF6] transition-all">
              <Plus size={24} />
           </div>
           <div className="text-center">
              <h4 className="text-lg font-black text-slate-800 mb-1">Add Territory</h4>
              <p className="text-xs font-bold text-slate-400">Register new district cluster</p>
           </div>
        </button>
      </div>
    </div>
  );
};

export default memo(DistrictsPage);
