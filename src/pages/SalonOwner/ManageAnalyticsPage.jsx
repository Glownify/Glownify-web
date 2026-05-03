import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Star, 
  ChevronRight, 
  Filter, 
  Download, 
  MoreVertical,
  Activity,
  Zap,
  Target,
  PieChart as PieChartIcon
} from "lucide-react";
import MobileSalonReportScreen from "./Mobile/MobileSalonReportScreen";

const ManageAnalyticsPage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [timeframe, setTimeframe] = useState("Month");

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile) return <MobileSalonReportScreen />;

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            {/* ── HEADER & RANGE SELECTOR ── */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-sm ring-1 ring-black/5">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#E91E63]">
                         <span>Insight Core</span>
                         <span className="w-1.5 h-1.5 rounded-full bg-rose-200"></span>
                         <span>Real-time Intelligence</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-800">Operational Analytics</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
                        {["Day", "Week", "Month", "Year"].map((t) => (
                            <button 
                                key={t}
                                onClick={() => setTimeframe(t)}
                                className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${timeframe === t ? 'bg-white text-slate-900 shadow-md ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <button className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                        <Download size={20} />
                    </button>
                </div>
            </div>

            {/* ── KEY PERFORMANCE INDICATORS ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <KPICard 
                    title="Gross Revenue" 
                    value="₹ 1,42,850" 
                    change="+12.4%" 
                    isUp={true} 
                    icon={DollarSign} 
                    color="text-rose-500" 
                    bg="bg-rose-50" 
                />
                <KPICard 
                    title="Active Customers" 
                    value="842" 
                    change="+4.8%" 
                    isUp={true} 
                    icon={Users} 
                    color="text-blue-500" 
                    bg="bg-blue-50" 
                />
                <KPICard 
                    title="Retention Rate" 
                    value="68.4%" 
                    change="-2.1%" 
                    isUp={false} 
                    icon={Activity} 
                    color="text-emerald-500" 
                    bg="bg-emerald-50" 
                />
                <KPICard 
                    title="Slot Utilization" 
                    value="92.1%" 
                    change="+15.0%" 
                    isUp={true} 
                    icon={Clock} 
                    color="text-purple-500" 
                    bg="bg-purple-50" 
                />
            </div>

            {/* ── MAIN CHARTS AREA ── */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* REVENUE VELOCITY CHART (Dummy Visualization) */}
                <div className="xl:col-span-8 bg-white/70 border border-purple-100/30 rounded-[3.5rem] p-10 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Revenue Velocity</h3>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Projection vs Actual Performance</p>
                        </div>
                        <button className="flex items-center gap-2 text-[#E91E63] font-black text-[10px] uppercase tracking-widest hover:gap-3 transition-all">Detailed Report <ArrowRight size={16} /></button>
                    </div>

                    <div className="h-80 flex items-end justify-between gap-4 px-4 overflow-hidden">
                        {[45, 65, 55, 85, 75, 95, 65, 85, 70, 90, 80, 100].map((h, i) => (
                            <div key={i} className="relative group/bar flex-1">
                                <div 
                                    className="w-full bg-slate-100 rounded-2xl group-hover/bar:bg-rose-50 transition-colors duration-500" 
                                    style={{ height: '100%' }}
                                />
                                <div 
                                    className={`absolute bottom-0 w-full rounded-2xl transition-all duration-1000 ${i === 11 ? 'bg-gradient-to-t from-[#E91E63] to-rose-400 shadow-xl shadow-rose-200' : 'bg-slate-200 group-hover/bar:bg-rose-200'}`} 
                                    style={{ height: `${h}%` }}
                                />
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">M{i+1}</div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="absolute top-0 right-0 p-10 opacity-5 -mr-10 -mt-10 group-hover:text-rose-500 transition-colors duration-1000">
                        <TrendingUp size={240} strokeWidth={1} />
                    </div>
                </div>

                {/* SERVICE MIX (Pie Chart Dummy) */}
                <div className="xl:col-span-4 bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                     <div className="relative z-10 space-y-10">
                        <div>
                            <h3 className="text-2xl font-black tracking-tight">Service Mix</h3>
                            <p className="text-xs font-black text-white/30 uppercase tracking-[0.2em] mt-2 italic">Dominant Revenue Streams</p>
                        </div>

                        <div className="relative w-48 h-48 mx-auto mt-4">
                             <div className="absolute inset-0 rounded-full border-[1.5rem] border-white/5" />
                             <div className="absolute inset-0 rounded-full border-[1.5rem] border-[#E91E63] border-l-transparent border-b-transparent rotate-45 group-hover:rotate-[225deg] transition-transform duration-1000" />
                             <div className="absolute inset-0 flex flex-col items-center justify-center">
                                 <h4 className="text-4xl font-black">42%</h4>
                                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Hair Styling</p>
                             </div>
                        </div>

                        <div className="space-y-4 pt-10">
                             <MixRow label="Hair styling" val="42%" color="bg-[#E91E63]" />
                             <MixRow label="Skin care" val="28%" color="bg-blue-400" />
                             <MixRow label="Grooming" val="18%" color="bg-emerald-400" />
                             <MixRow label="Others" val="12%" color="bg-white/20" />
                        </div>
                     </div>
                     <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-[#E91E63]/10 blur-[100px] pointer-events-none" />
                </div>
            </div>

            {/* ── PERFORMANCE RANKINGS ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* TOP SPECIALISTS */}
                <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <h4 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-3"><Zap size={20} className="text-amber-500" /> Top Performers</h4>
                        <button className="text-xs font-black text-[#E91E63] tracking-widest uppercase">View All</button>
                    </div>
                    <div className="space-y-6">
                        <PerformantRow 
                            name="Julian Marc" 
                            role="Senior Stylist" 
                            revenue="₹ 18,420" 
                            rating="4.9" 
                            img="https://randomuser.me/api/portraits/men/32.jpg" 
                        />
                        <PerformantRow 
                            name="Sophia Chen" 
                            role="Skin Expert" 
                            revenue="₹ 15,200" 
                            rating="4.8" 
                            img="https://randomuser.me/api/portraits/women/44.jpg" 
                        />
                        <PerformantRow 
                            name="Amara Okafor" 
                            role="Color Specialist" 
                            revenue="₹ 12,850" 
                            rating="4.9" 
                            img="https://randomuser.me/api/portraits/women/68.jpg" 
                        />
                    </div>
                </div>

                {/* STRATEGIC INSIGHTS */}
                <div className="bg-gradient-to-br from-white to-rose-50/30 border border-rose-100 rounded-[3rem] p-10 flex flex-col justify-between">
                    <div>
                        <h4 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-3 mb-10"><Target size={20} className="text-[#E91E63]" /> Strategic Insights</h4>
                        <div className="space-y-8">
                            <InsightDetail 
                                title="Peak Demand Warning" 
                                desc="Saturday 2PM - 6PM is 98% booked. Consider opening an additional slot or incentive early arrivals." 
                            />
                            <InsightDetail 
                                title="Low Retention Alert" 
                                desc="New customers from 'Bridal' category are not re-booking within 30 days. Recommend sending a loyalty coupon." 
                            />
                        </div>
                    </div>
                    <button className="w-full mt-10 h-16 rounded-[1.5rem] bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">Generate AI Strategy Report</button>
                </div>
            </div>
        </div>
    );
};

/* ── HELPERS ── */

const KPICard = ({ title, value, change, isUp, icon: Icon, color, bg }) => (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm group hover:-translate-y-1 transition-all">
        <div className="flex items-center justify-between mb-6">
            <div className={`p-3 rounded-2xl ${bg} ${color}`}><Icon size={20} /></div>
            <div className={`flex items-center gap-1 text-[11px] font-black ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}
            </div>
        </div>
        <h3 className="text-3xl font-black text-slate-800 mt-2">{value}</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{title}</p>
    </div>
);

const MixRow = ({ label, val, color }) => (
    <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              <span className="text-xs font-bold text-white/50">{label}</span>
         </div>
         <span className="text-xs font-black">{val}</span>
    </div>
);

const PerformantRow = ({ name, role, revenue, rating, img }) => (
    <div className="flex items-center justify-between group cursor-default">
         <div className="flex items-center gap-4">
              <img src={img} className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-110 transition-transform" alt={name} />
              <div>
                  <h5 className="text-sm font-black text-slate-800">{name}</h5>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{role}</p>
              </div>
         </div>
         <div className="text-right">
              <p className="text-sm font-black text-slate-800">{revenue}</p>
              <div className="flex items-center justify-end gap-1 text-amber-500 text-[10px] font-black">
                   <Star size={10} fill="currentColor" /> {rating}
              </div>
         </div>
    </div>
);

const InsightDetail = ({ title, desc }) => (
    <div className="space-y-2">
         <h5 className="text-sm font-black text-[#E91E63] uppercase tracking-widest">{title}</h5>
         <p className="text-sm font-medium text-slate-500 leading-relaxed">{desc}</p>
    </div>
);

export default ManageAnalyticsPage;
