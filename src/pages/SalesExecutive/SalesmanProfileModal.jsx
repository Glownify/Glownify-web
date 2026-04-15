import React from "react";
import { 
  X, 
  Mail, 
  Phone, 
  TrendingUp, 
  Award, 
  Target, 
  MapPin, 
  Calendar,
  Zap,
  Clock,
  Briefcase
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  AreaChart,
  Area
} from "recharts";

const performanceData = [
  { day: "Mon", sales: 4200 },
  { day: "Tue", sales: 3800 },
  { day: "Wed", sales: 5100 },
  { day: "Thu", sales: 4800 },
  { day: "Fri", sales: 6200 },
  { day: "Sat", sales: 5900 },
  { day: "Sun", sales: 7100 },
];

const SalesmanProfileModal = ({ isOpen, onClose, salesman }) => {
  if (!isOpen || !salesman) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 sm:px-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl animate-in fade-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto no-scrollbar rounded-[3rem] bg-white shadow-2xl overflow-hidden ring-1 ring-slate-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-8 top-8 z-10 h-12 w-12 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white hover:text-rose-500 backdrop-blur-md transition-all shadow-xl"
        >
          <X size={24} />
        </button>

        {/* Hero Header */}
        <div className="relative h-64 bg-gradient-to-br from-[#2D1B4E] to-[#1a0b3a] overflow-hidden">
           <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
           </div>
           
           <div className="relative h-full flex flex-col justify-end p-10 pb-8">
              <div className="flex items-end gap-8">
                 <div className="relative group">
                    <img 
                      src={`https://i.pravatar.cc/200?u=${salesman._id}`} 
                      className="h-32 w-32 rounded-[2.5rem] object-cover border-4 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105" 
                      alt={salesman.user?.name} 
                    />
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                       ON
                    </div>
                 </div>
                 
                 <div className="flex-1 space-y-2 mb-2">
                    <div className="flex items-center gap-3">
                       <h2 className="text-4xl font-black text-white tracking-tight">{salesman.user?.name}</h2>
                       <span className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-[10px] font-black uppercase tracking-widest border border-white/5">
                          {salesman.referralId}
                       </span>
                    </div>
                    <div className="flex items-center gap-6 text-white/60 text-sm font-bold">
                       <span className="flex items-center gap-2"><MapPin size={16} /> Mumbai West District</span>
                       <span className="flex items-center gap-2"><Briefcase size={16} /> Senior Field Executive</span>
                       <span className="flex items-center gap-2"><Calendar size={16} /> Joined Jan 2024</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Content Area */}
        <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Left Column: Stats & Performance */}
           <div className="lg:col-span-8 space-y-8">
              {/* Quick KPIs */}
              <div className="grid grid-cols-3 gap-6">
                 <div className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MTD Revenue</p>
                    <p className="text-2xl font-black text-slate-900">₹ 4.2L</p>
                    <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black">
                       <TrendingUp size={12} /> +12%
                    </div>
                 </div>
                 <div className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conv. Rate</p>
                    <p className="text-2xl font-black text-slate-900">22.4%</p>
                    <div className="flex items-center gap-1 text-rose-500 text-[10px] font-black">
                       <TrendingUp size={12} className="rotate-180" /> -2%
                    </div>
                 </div>
                 <div className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Leads</p>
                    <p className="text-2xl font-black text-slate-900">42</p>
                    <div className="text-[10px] font-black text-slate-400">12 High Priority</div>
                 </div>
              </div>

              {/* Chart Section */}
              <div className="rounded-[3rem] border border-slate-100 p-8 space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Sales Velocity</h3>
                        <p className="text-xs font-bold text-slate-400">Weekly revenue trends and performance peaks</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-5 py-2 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">Weekly</button>
                        <button className="px-5 py-2 rounded-xl bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100">Monthly</button>
                    </div>
                 </div>
                 <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={performanceData}>
                          <defs>
                             <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <Tooltip 
                             contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: '900' }}
                          />
                          <Area type="monotone" dataKey="sales" stroke="#8B5CF6" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>

           {/* Right Column: Actions & Achievements */}
           <div className="lg:col-span-4 space-y-8">
              {/* Contact Actions */}
              <div className="space-y-4">
                 <button className="w-full py-5 rounded-[2rem] bg-[#8B5CF6] text-white text-sm font-black flex items-center justify-center gap-3 shadow-xl shadow-purple-500/20 active:scale-95 transition-all">
                    <Mail size={18} /> SEND MESSAGE
                 </button>
                 <button className="w-full py-5 rounded-[2rem] bg-slate-50 text-slate-600 text-sm font-black flex items-center justify-center gap-3 hover:bg-slate-100 active:scale-95 transition-all">
                    <Phone size={18} /> DIRECT CALL
                 </button>
              </div>

              {/* Achievements */}
              <div className="rounded-[2.5rem] bg-slate-50 p-8 space-y-6">
                 <div className="flex items-center gap-3">
                    <Award className="text-rose-500" size={20} />
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Recent Badges</h3>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 group">
                       <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-[#8B5CF6] shadow-sm transform group-hover:rotate-12 transition-transform">
                          <Zap size={20} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-800">Speed Onboarding</p>
                          <p className="text-[10px] font-bold text-slate-400">Mar 2024</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                       <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-rose-500 shadow-sm transform group-hover:rotate-12 transition-transform">
                          <Target size={20} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-800">Target Crusher</p>
                          <p className="text-[10px] font-bold text-slate-400">Feb 2024</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Account Status Card */}
              <div className="rounded-[2.5rem] bg-[#1a0b3a] p-8 text-white space-y-6">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">System Status</p>
                    <div className="flex items-center gap-2">
                       <div className="h-2 w-2 rounded-full bg-emerald-500" />
                       <span className="text-sm font-black italic">Fully Optimized</span>
                    </div>
                 </div>
                 <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 text-white/60">
                       <Clock size={16} />
                       <span className="text-[11px] font-bold uppercase tracking-widest">Active for 8h 12m</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                       <Briefcase size={16} />
                       <span className="text-[11px] font-bold uppercase tracking-widest">12 Districts Covered</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SalesmanProfileModal;
