import React from "react";
import useMobile from "../../hooks/useMobile";
import MobileSuperAdminDashboard from "./MobileSuperAdminDashboard";
import { 
  Users, 
  Store, 
  CreditCard, 
  TrendingUp, 
  ChevronRight,
  MoreVertical,
  ArrowUpRight,
  MapPin,
  Clock,
  Briefcase
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell
} from "recharts";

// ── Mock Data for Charts ──────────────────────────────────────────────────────

const mainChartData = [
  { name: "Jan", revenue: 20000, subscriptions: 12000 },
  { name: "Feb", revenue: 25000, subscriptions: 15000 },
  { name: "Mar", revenue: 22000, subscriptions: 14000 },
  { name: "Apr", revenue: 30000, subscriptions: 18000 },
  { name: "May", revenue: 35000, subscriptions: 21000 },
  { name: "Jun", revenue: 45000, subscriptions: 25000 },
  { name: "Jul", revenue: 42000, subscriptions: 23000 },
  { name: "Aug", revenue: 48000, subscriptions: 26000 },
  { name: "Sep", revenue: 55000, subscriptions: 30000 },
  { name: "Oct", revenue: 60000, subscriptions: 32000 },
  { name: "Nov", revenue: 75000, subscriptions: 38000 },
  { name: "Dec", revenue: 85000, subscriptions: 42000 },
];

const stateRevenueData = [
  { name: "Maharashtra", value: 320480, color: "#8B5CF6" },
  { name: "Karnataka", value: 240000, color: "#D946EF" },
  { name: "Uttar Pradesh", value: 281620, color: "#6366F1" },
  { name: "Gujarat", value: 180000, color: "#10B981" },
];

const growthRateData = [
  { name: "Jan", value: 10 },
  { name: "Feb", value: 15 },
  { name: "Mar", value: 12 },
  { name: "Apr", value: 20 },
  { name: "May", value: 25 },
  { name: "Jun", value: 22 },
];

// ── Main Component ────────────────────────────────────────────────────────────

const SuperAdminDashboard = () => {
  const isMobile = useMobile();
  
  if (isMobile) {
    return <MobileSuperAdminDashboard />;
  }

  return (
    <div className="space-y-10 pb-10">
      
      {/* ── 1. Welcome Header & Top Stats ── */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Analytics <span className="animate-pulse">👋</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg flex items-center gap-2">
              Welcome <span className="text-[#8B5CF6] font-bold">Rohit Sharma</span>
              <ChevronRight className="w-5 h-5 opacity-50" />
            </p>
          </div>

          <div className="bg-amber-50/80 border border-amber-100 p-4 rounded-3xl flex items-start gap-4 max-w-md shadow-sm">
             <div className="bg-amber-100 p-2 rounded-xl">
               <Clock className="w-5 h-5 text-amber-600" />
             </div>
             <div>
               <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Tip of the day</p>
               <p className="text-[13px] text-amber-900 leading-relaxed">
                 Monitor commission payouts to track incentives given to the sales team effectively. <span className="font-bold underline cursor-pointer">Learn More</span>
               </p>
             </div>
          </div>
        </div>

        {/* Top 4 Stat Cards */}
        <div className="grid grid-cols-4 gap-6">
          <StatCard 
            title="Total Revenue (This Month)" 
            value="₹8,50,682"
            icon={<ArrowUpRight className="w-5 h-5" />}
            color="bg-emerald-50 text-emerald-600 border-emerald-100"
            subText="Target: ₹10,00,000"
          />
          <StatCard 
            title="Active Subscriptions" 
            value="5,286"
            icon={<Briefcase className="w-5 h-5" />}
            color="bg-purple-50 text-[#8B5CF6] border-purple-100"
            iconBg="bg-purple-100"
            subText="↑ 12% from last month"
          />
          <StatCard 
            title="Total Subscriptions Year" 
            value="22,468"
            icon={<Users className="w-5 h-5" />}
            color="bg-indigo-50 text-indigo-600 border-indigo-100"
            subText="Target: 50,000"
          />
          <StatCard 
            title="Average Renewal Rate" 
            value="85.7%"
            icon={<TrendingUp className="w-5 h-5" />}
            color="bg-pink-50 text-pink-600 border-pink-100"
            subText="Top in industry: 90%"
          />
        </div>
      </div>

      {/* ── 2. Main Analytics Grid ── */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Column (Chart Area) */}
        <div className="col-span-12 xl:col-span-9 space-y-8">
          
          {/* Main Chart Container */}
          <div className="bg-white rounded-[40px] p-10 border border-purple-50 shadow-sm relative overflow-hidden">
             {/* Background Gradients for Glass Effect */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50/30 blur-[100px] rounded-full -mr-20 -mt-20"></div>
             
             {/* Tabs & Controls */}
             <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 relative z-1">
               <div className="flex items-center gap-8 border-b-2 border-slate-50 w-full sm:w-auto">
                 <button className="text-[#8B5CF6] font-bold pb-4 border-b-4 border-[#8B5CF6] -mb-[2px] text-lg transition-all">Sales & Revenue</button>
                 <button className="text-slate-400 font-bold pb-4 border-b-4 border-transparent hover:text-slate-600 -mb-[2px] text-lg transition-all">Lead Funnel</button>
               </div>
               
               <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                  <button className="px-5 py-2 rounded-xl bg-white text-slate-800 font-bold text-sm shadow-sm ring-1 ring-slate-100">Today</button>
                  <button className="px-5 py-2 rounded-xl text-slate-500 font-bold text-sm hover:text-slate-800">Projects</button>
                  <button className="px-5 py-2 rounded-xl text-slate-500 font-bold text-sm hover:text-slate-800">Status</button>
               </div>
             </div>

             {/* Chart Legend & Total */}
             <div className="flex items-end justify-between mb-8 relative z-1">
                <div className="flex items-center gap-10">
                   <div className="flex flex-col">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-1">Revenue (Jan - Dec)</span>
                      <div className="flex items-center gap-3">
                         <h2 className="text-4xl font-black text-slate-800">₹38,21,560</h2>
                         <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
                            <ArrowUpRight size={14} /> 18.4%
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 pt-6 uppercase text-[10px] font-black tracking-widest text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></div> Revenue
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#D946EF]"></div> Subscriptions
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-2 h-10 px-4 bg-slate-50 border border-slate-100 rounded-xl cursor-not-allowed opacity-50">
                   <span className="text-sm font-bold text-slate-600">Getines Chavners</span>
                   <ChevronRight size={16} />
                </div>
             </div>

             {/* The Chart */}
             <div className="h-[400px] w-full relative z-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mainChartData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D946EF" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#D946EF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94A3B8', fontSize: 13, fontWeight: 700}}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8B5CF6" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorRev)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="subscriptions" 
                      stroke="#D946EF" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorSub)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Bottom Grid for Small Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* State-wise Revenue */}
             <div className="bg-white rounded-[40px] p-8 border border-purple-50 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-bold text-slate-800">State-wise Revenue</h3>
                   <MoreVertical className="text-slate-400 cursor-pointer" />
                </div>
                <div className="space-y-6">
                   {stateRevenueData.map((state) => (
                      <div key={state.name} className="space-y-2">
                         <div className="flex justify-between items-end">
                            <span className="text-slate-500 font-bold text-sm tracking-wide">{state.name}</span>
                            <span className="text-slate-900 font-black text-sm">₹{state.value.toLocaleString()}</span>
                         </div>
                         <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-1000" 
                              style={{ width: `${(state.value / 350000) * 100}%`, backgroundColor: state.color }}
                            ></div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Monthly Growth Rate */}
             <div className="bg-white rounded-[40px] p-8 border border-purple-50 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-xl font-bold text-slate-800">Monthly Growth Rate</h3>
                   <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black">
                      <TrendingUp size={12} /> 86.24%
                   </div>
                </div>
                <div className="h-56 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={growthRateData}>
                         <Bar dataKey="value" fill="#8B5CF6" radius={[6, 6, 0, 0]}>
                            {growthRateData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8B5CF6' : '#E9D5FF'} />
                            ))}
                         </Bar>
                         <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '15px'}} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column (Widgets) */}
        <div className="col-span-12 xl:col-span-3 space-y-8">
           
           {/* State Performance Widget */}
           <div className="bg-white rounded-[40px] p-8 border border-purple-50 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-6 font-black tracking-tight">State Performance</h3>
              <div className="space-y-6">
                 <div className="p-6 bg-purple-50 rounded-[30px] border border-purple-100 relative overflow-hidden group hover:shadow-lg transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/40 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                    <div className="flex justify-between items-start mb-4 relative z-1 text-purple-900">
                       <div>
                          <p className="text-[11px] font-black uppercase tracking-widest opacity-60">Maharashtra</p>
                          <h4 className="text-xl font-black">₹3,20,480</h4>
                          <p className="text-[10px] font-bold opacity-60 mt-1">TOTAL REVENUE</p>
                       </div>
                       <div className="bg-white p-2 rounded-xl text-purple-600 shadow-sm">
                          <MapPin size={16} />
                       </div>
                    </div>
                    <div className="flex justify-between text-[11px] font-bold text-purple-900/60 relative z-1">
                       <span>₹1,34,680</span>
                       <span>₹1,34,680</span>
                    </div>
                 </div>

                 <div className="p-6 bg-indigo-50 rounded-[30px] border border-indigo-100 group hover:shadow-lg transition-all overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-200/40 rounded-full -mr-10 -mt-10"></div>
                    <div className="flex justify-between items-start mb-2 relative z-1 text-indigo-900">
                       <div>
                          <p className="text-[11px] font-black uppercase tracking-widest opacity-60">Karnataka</p>
                          <h4 className="text-xl font-black">₹2,40,000</h4>
                          <p className="text-[10px] font-bold opacity-60 mt-1">TOTAL REVENUE</p>
                       </div>
                       <div className="bg-white p-2 rounded-xl text-indigo-600 shadow-sm">
                          <MapPin size={16} />
                       </div>
                    </div>
                 </div>
                 
                 <button className="w-full py-4 rounded-2xl bg-[#8B5CF6] text-white font-bold text-sm shadow-lg shadow-purple-100 hover:-translate-y-1 transition-all uppercase tracking-widest">
                    View All States
                 </button>
              </div>
           </div>

           {/* Sales Performance Widget */}
           <div className="bg-white rounded-[40px] p-8 border border-purple-50 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-6 font-black tracking-tight">Sales Performance</h3>
              <div className="space-y-6">
                 <SalesPerson name="Aditya Kumar" role="Team Lean" perf="73%" color="bg-emerald-400" />
                 <SalesPerson name="Sonali Mehta" role="Executive" perf="68%" color="bg-indigo-400" />
                 <SalesPerson name="Neha Sharma" role="Manager" perf="69%" color="bg-amber-400" />
                 <SalesPerson name="Rahul Varma" role="Sales person" perf="52%" color="bg-pink-400" />
              </div>
           </div>

           {/* Quick Stats */}
           <div className="bg-white rounded-[40px] p-8 border border-purple-50 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800 font-black tracking-tight">Quick Stats</h3>
                <MoreVertical className="text-slate-300 w-4 pb-1" />
              </div>
              <div className="space-y-5">
                 <QuickStatItem label="Todays New Subscriptions" value="58" />
                 <QuickStatItem label="Monthly Active Leads" value="34.2" />
                 <QuickStatItem label="Active Lead Conversion Rate" value="28%" />
                 <QuickStatItem label="Negative Churn Rate" value="4.5%" />
                 <QuickStatItem label="Top Selling Plan" value="Pro Plan" isHighlight />
              </div>
           </div>

        </div>
      </div>

    </div>
  );
};

// ── Helper Sub-Components ──────────────────────────────────────────────────

const StatCard = ({ title, value, icon, color, subText, iconBg }) => (
  <div className={`p-8 rounded-[40px] border border-transparent shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between h-48 ${color.split(' ')[0]} bg-white ring-1 ring-slate-100`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3.5 rounded-2xl ${iconBg || color.split(' ')[0]} shadow-sm group-hover:scale-110 transition-all`}>
        {React.cloneElement(icon, { className: `w-6 h-6 ${color.split(' ')[1]}` })}
      </div>
      <MoreVertical className="text-slate-300 w-4 h-4 cursor-pointer" />
    </div>
    <div>
      <h3 className="text-4xl font-black text-slate-800 mb-2">{value}</h3>
      <p className="text-slate-400 font-bold text-[13px] uppercase tracking-wider mb-1 line-clamp-1">{title}</p>
      {subText && <p className={`text-[11px] font-bold ${color.split(' ')[1]}`}>{subText}</p>}
    </div>
  </div>
);

const SalesPerson = ({ name, role, perf, color }) => (
  <div className="flex items-center gap-4 group cursor-pointer">
     <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md ring-2 ring-white group-hover:ring-[#8B5CF6] transition-all">
       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} className="w-full h-full object-cover" />
     </div>
     <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-800 text-sm truncate">{name}</h4>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{role}</p>
     </div>
     <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-black text-slate-800">{perf}</span>
        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full ${color}`} style={{ width: perf }}></div>
        </div>
     </div>
  </div>
);

const QuickStatItem = ({ label, value, isHighlight }) => (
  <div className="flex items-center justify-between group">
     <span className="text-slate-400 font-bold text-[13px]">{label}</span>
     <span className={`font-black text-[14px] ${isHighlight ? 'text-[#8B5CF6] bg-purple-50 px-2.5 py-1 rounded-lg ring-1 ring-purple-100' : 'text-slate-800'}`}>
       {value}
     </span>
  </div>
);

export default SuperAdminDashboard;