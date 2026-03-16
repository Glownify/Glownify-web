import React, { memo, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkSubscription } from "../../utils/checkSubscription";
import MobileSalonAdminDashboard from "./Mobile/MobileSalonAdminDashboard";
import {
  Search,
  Bell,
  Store,
  CheckCircle,
  MapPin,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  ClipboardList,
  BarChart3,
  Clock,
  HelpCircle,
} from "lucide-react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// --- Mock Data ---

const activityData = [
  { name: "Jan", salons: 15, subs: 10 },
  { name: "Feb", salons: 20, subs: 18 },
  { name: "Mar", salons: 30, subs: 25 },
  { name: "Apr", salons: 40, subs: 32 },
  { name: "May", salons: 50, subs: 38 },
  { name: "Jun", salons: 30, subs: 42 },
  { name: "Jul", salons: 40, subs: 48 },
  { name: "Aug", salons: 60, subs: 55 },
];

const salonsData = [
  { id: "1", name: "Style Elegante", subId: "SP-JPM-005", area: "Jayanagar", subArea: "Ayanagar", serviceType: "In-Salon", typeColor: "bg-green-100 text-green-700", plan: "Premium", status: "Active", statusColor: "bg-emerald-500 text-white", date: "25 Mar, 201" },
  { id: "2", name: "Spaxpress Salon", subId: "SP-SLR-034", area: "Jayanagar", subArea: "Jayanagar", serviceType: "Premium", typeColor: "bg-purple-100 text-purple-700", plan: "Premium", status: "Active", statusColor: "bg-emerald-500 text-white", date: "26 Mar, 201" },
  { id: "3", name: "Golden Mirror", subId: "SP-BLR-031", area: "Indiranagar", subArea: "Jayanagar", serviceType: "In-Salon", typeColor: "bg-green-100 text-green-700", plan: "Basic", status: "Pro", statusColor: "bg-purple-600 text-white", date: "25 Mar, 201" },
  { id: "4", name: "Glamour Touch Spa", subId: "SP-SAL-215", area: "Jayanagar", subArea: "Jayanagar", serviceType: "In-Salon", typeColor: "bg-green-100 text-green-700", plan: "Pro", status: "Trial", statusColor: "bg-blue-500 text-white", date: "21 Mar, 201" },
  { id: "5", name: "StyleLight Salon", subId: "SP-MAL-179", area: "Malleswaram", subArea: "Bangalore", serviceType: "In-Salon", typeColor: "bg-green-100 text-green-700", plan: "Pro", status: "Pro", statusColor: "bg-purple-600 text-white", date: "21 Mar, 201" },
];

const alertsData = [
  { id: "SP-SAL-331", name: "Golden Mirror Salon", location: "Jayanagar", score: 42 },
  { id: "SP-MAL-215", name: "StyleLight Salon", location: "Malleswaram, Bangalore", score: 37 },
  { id: "SP-SAL-235", name: "SimplyStrands Unisex", location: "Banaswadi, Bangalore", score: 37 },
  { id: "SP-SAL-175", name: "Starlight Spa", location: "Benson Town, Bangalore", score: 37 },
];

const pieData = [
  { name: "Remaining", value: 57, color: "#d8b4fe" },
  { name: "Achieved", value: 43, color: "#9333ea" },
];

const visitPieData = [
  { name: "Pending", value: 54, color: "#a855f7" },
  { name: "Completed", value: 46, color: "#f3e8ff" },
];


const SalonOwnerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.state?.skipSubscriptionCheck) return;
    checkSubscription(navigate);
  }, [navigate, location]);

  if (isMobile) {
    return <MobileSalonAdminDashboard />;
  }

  return (
    <div className="p-6 w-full max-w-[1600px] mx-auto min-h-screen" style={{ background: 'linear-gradient(135deg, #eaddf8 0%, #f3ebf9 50%, #faf8fc 100%)' }}>

      {/* 1. Top Header Bar */}
      <header className="flex flex-col xl:flex-row justify-between items-center mb-8 gap-6 bg-white/30 backdrop-blur-lg p-4 rounded-[20px] border border-white/40 shadow-sm">
        {/* Left: Search Bar */}
        <div className="relative w-full xl:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600/70 w-5 h-5" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-md border border-white/60 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-[15px] font-medium text-purple-900 placeholder-purple-500/70 shadow-sm"
          />
        </div>

        {/* Center: Location indicator */}
        <div className="flex items-center gap-2 px-3 py-3 rounded-full text-purple-900">
          <MapPin size={18} className="text-purple-600" />
          <span className="font-semibold text-[15px] whitespace-nowrap">Jayanagar, Bangalore</span>
          <ChevronRight size={16} className="text-purple-400 ml-0.5" />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4 w-full xl:w-auto justify-center xl:justify-end">
          <div className="bg-[#8b5cf6] text-white px-6 py-2.5 rounded-xl font-bold text-[15px] flex items-center gap-2 shadow-lg shadow-purple-500/30 cursor-pointer">
             <span className="opacity-80 font-normal">₹</span> 25,000
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 bg-white/50 backdrop-blur-md hover:bg-white/80 rounded-xl border border-white text-purple-700 transition-colors shadow-sm">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">4</span>
            </button>
            <button className="relative p-2.5 bg-white/50 backdrop-blur-md hover:bg-white/80 rounded-xl border border-white text-purple-700 transition-colors shadow-sm">
              <MessageSquare size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">3</span>
            </button>
            <div className="flex items-center gap-3 ml-2 border-l border-purple-200/50 pl-4">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya"
                alt="Profile"
                className="w-10 h-10 rounded-full border border-white bg-purple-100 shadow-sm"
              />
              <img src="https://flagcdn.com/w40/in.png" alt="IN" className="w-[18px] h-[13px] rounded-sm shadow-sm" />
            </div>
          </div>
        </div>
      </header>

      {/* 2. Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Card 1: Total Salons */}
        <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[20px] border border-white/60 shadow-sm flex items-center justify-between group hover:translate-y-[-2px] transition-all">
          <div>
            <p className="text-[13px] text-[#4f208a] font-semibold mb-2 leading-tight">Total Salons<br/>Registered</p>
            <h3 className="text-[32px] font-bold text-[#32135d] tracking-tight leading-none mt-1">48</h3>
          </div>
          <div className="w-12 h-12 bg-[#D1C4EF] text-[#6b21a8] rounded-xl flex items-center justify-center border border-white/50 shadow-sm">
            <Store size={22} strokeWidth={2.5} />
          </div>
        </div>

        {/* Card 2: Active Subscriptions */}
        <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[20px] border border-white/60 shadow-sm flex items-center justify-between group hover:translate-y-[-2px] transition-all">
          <div>
            <p className="text-[13px] text-[#4f208a] font-semibold mb-2 leading-tight">Active<br/>Subscriptions</p>
            <div className="flex flex-col gap-1">
              <h3 className="text-[32px] font-bold text-[#32135d] tracking-tight leading-none">32</h3>
              <p className="text-[11px] text-[#4f208a] font-medium flex items-center gap-1">₹ 2,60,000 <span className="opacity-70">Earning</span></p>
            </div>
          </div>
          <div className="w-12 h-12 bg-[#bbf7d0] text-[#16a34a] rounded-full flex items-center justify-center border-4 border-white/50 shadow-sm">
            <Check size={20} strokeWidth={3} />
          </div>
        </div>

        {/* Card 3: Pending Followups */}
        <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[20px] border border-white/60 shadow-sm flex items-center justify-between group hover:translate-y-[-2px] transition-all">
          <div>
            <p className="text-[13px] text-[#4f208a] font-semibold mb-2 leading-tight">Pending<br/>Followups</p>
            <h3 className="text-[32px] font-bold text-[#32135d] tracking-tight leading-none mt-1">11</h3>
          </div>
          <div className="w-12 h-12 bg-[#fed7aa] text-[#ea580c] rounded-full flex items-center justify-center border-4 border-white/50 shadow-sm">
            <Check size={20} strokeWidth={3} />
          </div>
        </div>

        {/* Card 4: This Month Commission */}
        <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[20px] border border-white/60 shadow-sm flex items-center justify-between group hover:translate-y-[-2px] transition-all relative overflow-hidden">
          <div className="relative z-10 w-full">
            <p className="text-[13px] text-[#4f208a] font-semibold mb-2 leading-tight">This Month<br/>Commission</p>
            <div className="flex flex-col gap-1">
              <h3 className="text-[28px] font-bold text-[#32135d] tracking-tight leading-none">₹ 18,500</h3>
              <p className="text-[11px] text-[#4f208a] font-medium"><span className="opacity-70">Earnings</span></p>
            </div>
          </div>
          <div className="w-16 h-16 absolute right-4 bottom-4 opacity-70">
            {/* Coins illustration mock */}
            <div className="w-8 h-4 bg-purple-200 border-2 border-[#8B5CF6] rounded-full absolute bottom-0 right-2"></div>
            <div className="w-8 h-4 bg-purple-300 border-2 border-[#8B5CF6] rounded-full absolute bottom-2 right-2"></div>
            <div className="w-8 h-4 bg-purple-100 border-2 border-[#8B5CF6] rounded-full absolute bottom-4 right-2"></div>
            <div className="w-8 h-4 bg-purple-400 border-2 border-[#8B5CF6] rounded-full absolute bottom-1 right-6"></div>
            <div className="w-8 h-4 bg-purple-200 border-2 border-[#8B5CF6] rounded-full absolute bottom-3 right-6"></div>
            <div className="w-8 h-4 bg-[#8B5CF6] border-2 border-purple-200 rounded-full absolute bottom-5 right-6 flex items-center justify-center"><span className="text-[8px] text-white">₹</span></div>
          </div>
        </div>
      </div>

      {/* 3. Main Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* --- Left 8 Columns (Charts & Table) --- */}
        <div className="lg:col-span-8 space-y-8">

          {/* Registration Activity Section */}
          <div className="bg-white/50 backdrop-blur-xl rounded-[20px] border border-white/60 shadow-sm p-6 h-[420px] flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-10 relative z-10">
              <h3 className="text-[17px] font-bold text-[#32135d] tracking-tight">Registration Activity</h3>
              <div className="flex bg-[#e8dbf4]/50 p-1 rounded-lg border border-white/50">
                <button className="text-[11px] font-bold px-4 py-1.5 text-[#6b479e] hover:text-purple-700 transition-colors">This Week</button>
                <button className="text-[11px] font-bold px-4 py-1.5 bg-white/70 text-purple-700 rounded-md shadow-sm border border-white/60">This Month</button>
              </div>
            </div>

            <div className="flex-1 w-full min-h-0 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={activityData} margin={{ top: 0, right: 30, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#9CA3AF', fontWeight: 'bold' }} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#9CA3AF', fontWeight: 'bold' }} />
                  <Tooltip
                    cursor={{ fill: '#F5F3FF' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                  />
                  <Legend verticalAlign="bottom" align="left" iconType="circle" wrapperStyle={{ paddingTop: '30px', paddingLeft: '20px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }} />

                  <Bar name="Salons Registered" dataKey="salons" fill="#34D399" radius={[6, 6, 0, 0]} maxBarSize={35} opacity={0.6} />
                  <Line name="Subscriptions Activated" type="monotone" dataKey="subs" stroke="#8B5CF6" strokeWidth={4} dot={{ r: 5, strokeWidth: 3, fill: '#fff', stroke: '#8B5CF6' }} activeDot={{ r: 8 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            {/* Soft decorative blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-[80px] -mt-32 -mr-32 opacity-40"></div>
          </div>

          {/* My Registered Salons Table Area */}
          <div className="bg-white/50 backdrop-blur-xl rounded-[20px] border border-white/60 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/40 gap-4">
              <h3 className="text-[17px] font-bold text-[#32135d] tracking-tight">My Registered Salons</h3>
              <div className="flex bg-[#e8dbf4]/50 p-1 rounded-xl border border-white/40">
                <button className="text-[11px] font-semibold px-4 py-2 text-purple-700">Active Only</button>
                <div className="w-[1px] h-4 bg-[#c8b7df] self-center"></div>
                <button className="text-[11px] font-semibold px-4 py-2 text-[#6b479e] hover:text-purple-700">This Month</button>
                <div className="w-[1px] h-4 bg-[#c8b7df] self-center"></div>
                <button className="text-[11px] font-semibold px-4 py-2 text-purple-700 bg-white/70 rounded-lg shadow-sm border border-white/50 flex items-center gap-2">
                  By Area <ChevronDown size={14} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto p-4 pt-1">
              <table className="w-full text-left border-separate border-spacing-y-0 min-w-[800px]">
                <thead>
                  <tr className="text-[#6b479e] text-[12px] font-semibold text-left">
                    <th className="px-5 py-4 font-semibold pb-3">Salon Name <ChevronDown size={14} className="inline ml-1" /></th>
                    <th className="px-5 py-4 font-semibold pb-3">Area <ChevronDown size={14} className="inline ml-1" /></th>
                    <th className="px-5 py-4 font-semibold pb-3 text-center">Service Type <ChevronDown size={14} className="inline ml-1" /></th>
                    <th className="px-5 py-4 font-semibold pb-3 text-center">Plan <ChevronDown size={14} className="inline ml-1" /></th>
                    <th className="px-5 py-4 font-semibold pb-3 text-center">Status <ChevronDown size={14} className="inline ml-1" /></th>
                    <th className="px-5 py-4 font-semibold pb-3">Reg Date <ChevronDown size={14} className="inline ml-1" /></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/40">
                  {salonsData.map((salon) => (
                    <tr key={salon.id} className="text-[13px] hover:bg-white/30 transition-all cursor-pointer group">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-[#32135d] group-hover:text-purple-800 transition-colors">{salon.name}</div>
                        <div className="text-[11px] text-[#6b479e] mt-0.5">{salon.subId}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[#4f208a]">{salon.area}</div>
                        <div className="text-[11px] text-[#8e6db9] mt-0.5">{salon.subArea}</div>
                      </td>
                      <td className="px-5 py-5 text-center">
                        <span className={`inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${salon.typeColor} ring-1 ring-inset ring-black/5 shadow-sm`}>
                          {salon.serviceType}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-[#4f208a]">{salon.plan}</span>
                          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                            <Check size={10} strokeWidth={3} />
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${salon.statusColor} shadow-sm bg-opacity-90`}>
                          {salon.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#4f208a] tabular-nums">{salon.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-4 border-t border-white/40 flex items-center justify-between text-[12px] text-[#6b479e] bg-[#f0ebf8]/30">
              <p>Showing 1 - 6 of 48</p>
              <div className="flex gap-1.5 items-center">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/60 hover:text-purple-700 transition-colors"><ChevronLeft size={16} /></button>
                <div className="flex gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#8B5CF6] text-white shadow-sm font-medium">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/60 hover:text-purple-700 transition-colors">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/60 hover:text-purple-700 transition-colors">3</button>
                  <span className="flex items-center px-1 font-medium">...</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/60 hover:text-purple-700 transition-colors">79</button>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/60 hover:text-purple-700 transition-colors"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Right 4 Columns (Right Panel) --- */}
        <div className="lg:col-span-4 space-y-8">

          {/* Card 1: My Commission Overview */}
          <div className="bg-white/50 backdrop-blur-xl rounded-[20px] border border-white/60 shadow-sm p-6 relative group">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[17px] font-bold text-[#32135d] tracking-tight">My Commission Overview</h3>
              <button className="bg-white/50 p-2 rounded-lg text-purple-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <HelpCircle size={18} />
              </button>
            </div>

            <div className="flex items-center relative gap-4 mb-2">
              <div className="flex-1 space-y-4 text-[13px] font-semibold text-[#4f208a]">
                <div className="flex justify-between border-b border-white/40 pb-2.5">
                  <span className="text-[#6b479e]">Total Registration</span>
                  <span className="text-[#32135d]">312</span>
                </div>
                <div className="flex justify-between border-b border-white/40 pb-2.5">
                  <span className="text-[#6b479e]">Active Subscriptions</span>
                  <span className="text-[#32135d]">214</span>
                </div>
                <div className="flex justify-between border-b border-white/40 pb-2.5">
                  <span className="text-[#6b479e] text-[11px]">Commission per ActiveSubs</span>
                  <span className="text-[#32135d] text-[11px]">₹500</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-purple-200">
                  <span className="text-purple-700">Total Earned</span>
                  <span className="text-[22px] font-bold text-[#32135d] tracking-tight">₹ 18,500</span>
                </div>
                <div className="flex gap-4 pt-2">
                  <div className="flex-1 p-3 rounded-2xl bg-white/40 border border-white/60 group/item transition-all hover:bg-white/60 shadow-sm">
                    <p className="text-[10px] text-[#6b479e] font-semibold tracking-wider mb-1">PAID</p>
                    <p className="text-[15px] text-[#32135d] font-bold">₹ 1,80,000</p>
                    <div className="mt-2 h-1 bg-white/50 rounded-full overflow-hidden w-full ring-1 ring-black/5">
                      <div className="h-full bg-emerald-400 w-[70%]" />
                    </div>
                  </div>
                  <div className="flex-1 p-3 rounded-2xl bg-white/40 border border-white/60 group/item transition-all hover:bg-white/60 shadow-sm">
                    <p className="text-[10px] text-[#6b479e] font-semibold tracking-wider mb-1">PENDING</p>
                    <p className="text-[15px] font-bold text-red-500">₹ 85,000</p>
                    <div className="mt-2 h-1 bg-white/50 rounded-full overflow-hidden w-full ring-1 ring-black/5">
                      <div className="h-full bg-red-400 w-[30%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[120px] h-[120px] absolute -right-4 -top-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={42} outerRadius={58} paddingAngle={4} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0 4px 6px rgba(0,0,0,0.1))` }} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[22px] font-bold text-purple-700 tracking-tight leading-none">43%</span>
                  <span className="text-[9px] font-semibold text-[#6b479e] mt-0.5">₹ 10,500</span>
                </div>
              </div>
            </div>

            {/* Legend for donut */}
            <div className="flex justify-end gap-3 text-[9px] font-semibold tracking-wider text-[#6b479e] mt-4 pr-1">
              <span className="flex items-center gap-1.5 before:w-1.5 before:h-1.5 before:bg-purple-600 before:rounded-full">Remaining: 97%</span>
              <span className="flex items-center gap-1.5 before:w-1.5 before:h-1.5 before:bg-purple-300 before:rounded-full">Felemring (19-4Q)</span>
            </div>
          </div>

          {/* Card 2: Visit Log Summary */}
          <div className="bg-white/50 backdrop-blur-xl rounded-[20px] border border-white/60 shadow-sm p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[17px] font-bold text-[#32135d] tracking-tight">Visit Log Summary</h3>
              <div className="bg-white/50 p-2 rounded-lg text-purple-700 shadow-sm hover:bg-white/80 transition-colors cursor-pointer">
                <ChevronRight size={18} />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-1 space-y-3">
                <div className="bg-[#f0e8f9]/50 p-3 rounded-2xl border border-white/60 flex items-center justify-between group transition-all hover:translate-x-1 shadow-sm">
                  <div className="flex items-center gap-2 text-[11px] text-purple-700 font-semibold tracking-wider">
                    <ClipboardList size={16} /> Total Visits
                  </div>
                  <span className="font-bold text-[#32135d] text-[17px] tabular-nums">8,125</span>
                </div>
                <div className="bg-white/40 p-3 rounded-2xl border border-white/60 flex items-center justify-between group transition-all hover:translate-x-1 shadow-sm">
                  <div className="flex items-center gap-2 text-[11px] text-[#6b479e] font-semibold tracking-wider">
                    <Check size={16} className="text-emerald-500" /> Cold wees
                  </div>
                  <span className="font-bold text-[#4f208a] text-[15px] tabular-nums">2 16,730</span>
                </div>
                <div className="pt-2 pl-4 border-l-4 border-[#8B5CF6]">
                  <p className="text-[10px] font-semibold tracking-wide text-purple-700">Converted to Subscription</p>
                  <p className="text-[24px] font-bold text-[#32135d] mt-0.5 tabular-nums tracking-tighter">6</p>
                </div>
              </div>

              <div className="w-[110px] h-[110px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={visitPieData} innerRadius={35} outerRadius={50} paddingAngle={4} dataKey="value" stroke="none" startAngle={90} endAngle={-270}>
                      {visitPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-1">
                  <span className="text-[20px] font-bold text-purple-700 tracking-tight leading-none">54%</span>
                  <span className="text-[9px] font-semibold text-[#6b479e]">pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Low Performance Alert */}
          <div className="bg-white/50 backdrop-blur-xl rounded-[20px] border border-white/60 shadow-sm overflow-hidden flex flex-col relative">
            <div className="p-5 border-b border-white/40 flex items-center justify-between bg-white/20">
              <h3 className="text-[14px] font-bold text-[#32135d]">Low Performance Alert</h3>
              <div className="w-8 h-8 rounded-full bg-red-100/80 text-red-500 flex items-center justify-center shadow-inner">
                <TrendingUp size={16} className="rotate-180" />
              </div>
            </div>
            <div className="p-2 space-y-1">
              {alertsData.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 py-3.5 hover:bg-white/50 rounded-2xl transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${alert.name}`}
                        alt={alert.name}
                        className="w-10 h-10 rounded-[14px] bg-purple-100/50 border border-white shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#10b981] rounded-full border-[2px] border-white flex items-center justify-center">
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-semibold text-[#32135d] group-hover:text-purple-800 transition-colors tracking-tight">{alert.name}</p>
                        <span className="text-[9px] text-[#6b479e] font-semibold tracking-wide">{alert.id}</span>
                      </div>
                      <p className="text-[11px] text-[#4f208a] mt-0.5">{alert.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[#6b479e] py-1.5 px-3 bg-white/60 rounded-xl font-bold text-[13px] transition-all group-hover:bg-purple-100 group-hover:text-purple-700 border border-white/50 shadow-sm">
                      <Store size={14} />
                      <span className="tabular-nums">{alert.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Omit the "View Detailed Report" button since it's not strongly featured in Image 2 or simplify it */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default memo(SalonOwnerDashboard);
