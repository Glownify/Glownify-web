import React, { memo, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkSubscription } from "../../utils/checkSubscription";
import MobileSalonAdminDashboard from "./Mobile/MobileSalonAdminDashboard";
import {
  Search,
  Bell,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Store,
  Check,
  Mail,
  Eye,
  Plus,
  Gift,
  FileText,
  Share2,
  BookOpen,
  Wallet,
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
} from "recharts";

const actionCards = [
  { label: "Add Service", icon: Plus, bg: "#f4c9d5", text: "#a63b61" },
  { label: "Salon View", icon: Eye, bg: "#c8e5f6", text: "#2f7ea3" },
  { label: "Create Offer", icon: Gift, bg: "#f3cad9", text: "#b84879" },
  { label: "View Reports", icon: FileText, bg: "#caead1", text: "#2a8a57" },
  { label: "Share", icon: Share2, bg: "#f7dfab", text: "#b87814" },
  { label: "Courses", icon: BookOpen, bg: "#f1c9dc", text: "#ba4c7f" },
];

const metricCards = [
  { title: "Total Salons Registered", subtitle: "", value: "48", icon: Store, iconWrap: "bg-[#e2d2ff] text-[#744de0]" },
  { title: "Active Subscriptions", subtitle: "\u20B9 2,60,000 Earning", value: "32", icon: Check, iconWrap: "bg-[#d7f0e1] text-[#4ba57f]" },
  { title: "Pending Followups", subtitle: "", value: "11", icon: Check, iconWrap: "bg-[#ffe5c8] text-[#da8e48]" },
  { title: "This Month Commission", subtitle: "Earnings", value: "\u20B9 18,500", icon: Wallet, iconWrap: "bg-[#e0d4ff] text-[#7452df]" },
];

const activityData = [
  { name: "Jan", salons: 18, subs: 16 },
  { name: "Feb", salons: 26, subs: 22 },
  { name: "Mar", salons: 34, subs: 28 },
  { name: "Apr", salons: 38, subs: 33 },
  { name: "May", salons: 45, subs: 39 },
  { name: "Jun", salons: 40, subs: 45 },
  { name: "Aug", salons: 50, subs: 58 },
];

const pieData = [
  { name: "Used", value: 43, color: "#9b5cf6" },
  { name: "Left", value: 57, color: "#eadcff" },
];

const alertsData = [
  { id: "SP-SAL-331", name: "Golden Mirror Salon", location: "Jayanagar", score: 42 },
  { id: "SP-MAL-215", name: "StyleLight Salon", location: "Malleswaram", score: 37 },
  { id: "SP-SAL-235", name: "SimplyStrands Unisex", location: "Banaswadi", score: 31 },
];

const salonsData = [
  { name: "Style Elegante", id: "SP JPM 005", area: "Jayanagar", subArea: "Ayanagar", serviceType: "In-Salon", plan: "Premium", status: "Active", regDate: "25 Mar, 201", statusClass: "bg-[#9bc5ba] text-white" },
  { name: "SpaXpress Salon", id: "SP-SLR 034", area: "Jayanagar", subArea: "Jayanagar", serviceType: "Premium", plan: "Premium", status: "Active", regDate: "26 Mar, 201", statusClass: "bg-[#9bc5ba] text-white" },
  { name: "Golden Mirror", id: "SP-BLR G31", area: "Indiranagar", subArea: "Jayanagar", serviceType: "In-Salon", plan: "Basic", status: "Pro", regDate: "25 Mar, 201", statusClass: "bg-[#9b63e4] text-white" },
  { name: "Glamour Touch Spa", id: "SP-SAL 215", area: "Jayanagar", subArea: "Jayanagar", serviceType: "In-Salon", plan: "Pro", status: "Trial", regDate: "21 Mar, 201", statusClass: "bg-[#7f8fdc] text-white" },
  { name: "StyleLight Salon", id: "SP-SAL 179", area: "Malleswaram", subArea: "Bangalore", serviceType: "In-Salon", plan: "Pro", status: "Pro", regDate: "21 Mar, 201", statusClass: "bg-[#7d75d6] text-white" },
];

const quickActions = [
  { icon: Plus, label: "Add Service", bg: "#fecdd3", color: "#ef476f", path: "/salon-owner/manage-services" },
  { icon: Eye, label: "Salon View", bg: "#dbeefe", color: "#1d9bf0", path: "/salon-owner/my-view" },
  { icon: Gift, label: "Create Offer", bg: "#fce7f3", color: "#ec4899", path: "/salon-owner/manage-add-ons" },
  { icon: FileText, label: "View Reports", bg: "#dcfce7", color: "#22c55e", path: "/salon-owner/reports" },
  { icon: Share2, label: "Share", bg: "#ffedd5", color: "#f97316", path: "#" },
  { icon: BookOpen, label: "Courses", bg: "#f8d3e0", color: "#c54f82", path: "#" },
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

  if (isMobile) return <MobileSalonAdminDashboard />;
  const PINK_BRAND = "#D946EF";
  const PURPLE_BRAND = "#8B5CF6";

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">

        <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {actionCards.map((item) => (
            <button key={item.label + item.bg} className="h-[62px] rounded-[22px] border border-white/50 bg-white/40 backdrop-blur-md shadow-sm flex items-center justify-center gap-3 px-4 font-bold text-[14px] text-slate-600 hover:scale-105 transition-all hover:bg-white hover:shadow-xl hover:shadow-purple-500/5">
              <item.icon size={16} className="text-[#8B5CF6]" />
              <span>{item.label}</span>
            </button>
          ))}
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {metricCards.map((card) => (
            <div key={card.title} className="bg-white/70 backdrop-blur-xl rounded-[30px] border border-purple-100/50 px-8 py-8 shadow-sm flex items-center justify-between min-h-[140px] hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div>
                <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">{card.title}</p>
                <p className="text-[11px] text-[#8B5CF6] font-bold">{card.subtitle}</p>
                <h3 className="text-3xl font-black text-slate-800 mt-2 tracking-tight">{card.value}</h3>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${card.iconWrap} bg-white ring-1 ring-slate-50`}>
                <card.icon size={24} />
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-12 xl:col-span-6 bg-white/70 border border-purple-100/20 rounded-[40px] p-8 shadow-sm min-h-[400px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Registration Activity</h3>
              <div className="flex items-center gap-3 bg-purple-50 p-1 rounded-xl">
                 <button className="px-4 py-1.5 rounded-lg bg-white text-[#8B5CF6] font-bold text-xs shadow-sm">Monthly</button>
                 <button className="px-4 py-1.5 rounded-lg text-slate-400 font-bold text-xs">Yearly</button>
              </div>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={activityData} margin={{ top: 10, right: 5, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#94a3b8", fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#94a3b8", fontWeight: 700 }} />
                  <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="salons" fill="#8B5CF6" radius={[6, 6, 0, 0]} maxBarSize={32} />
                  <Line dataKey="subs" type="monotone" stroke="#D946EF" strokeWidth={4} dot={{ r: 6, fill: "#fff", stroke: "#D946EF", strokeWidth: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-400 mt-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /> Registered Salons
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D946EF]" /> Subscriptions
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-3 bg-white/70 border border-purple-100/20 rounded-[40px] p-8 shadow-sm min-h-[400px]">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Commission Overview</h3>
            <div className="space-y-8 text-[12px] text-[#6c588f]">
              <div className="flex items-center justify-between gap-6 border-b border-purple-50 pb-8">
                <div className="space-y-4">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Commission Rate</p>
                      <h4 className="text-2xl font-black text-[#8B5CF6]">45%</h4>
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Conversion Rate</p>
                      <h4 className="text-2xl font-black text-[#D946EF]">40%</h4>
                   </div>
                </div>
                <div className="w-32 h-32 relative shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} innerRadius={35} outerRadius={50} dataKey="value" stroke="none">
                        {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[#8B5CF6]">
                    <span className="text-xl font-black">43%</span>
                    <span className="text-[8px] font-bold uppercase tracking-tighter opacity-60">Payout</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[14px] font-black text-slate-700"><span>Paid</span><span>₹1,80,000</span></div>
                <div className="flex items-center justify-between text-[14px] font-black text-slate-700"><span>Pending</span><span>₹85,000</span></div>
                <div className="pt-6 border-t border-purple-50">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Progress</p>
                    <p className="text-[12px] font-black text-[#8B5CF6]">62%</p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                    <div className="h-full w-[62%] bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] rounded-full shadow-lg transition-all duration-1000" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-3 space-y-4">
            <div className="bg-white/84 border border-[#dacaf4] rounded-[22px] px-5 py-4 shadow-sm flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-[#2c1e4c]">Advertisements</h3>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#b7afcf]" />
                <span className="w-3 h-3 rounded-full bg-[#d8d0ee]" />
                <span className="w-3 h-3 rounded-full bg-[#d8d0ee]" />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[24px] border border-[#f5d29b] bg-gradient-to-br from-[#ffcf3b] via-[#ffb324] to-[#ff7a1b] min-h-[288px] shadow-[0_20px_50px_rgba(255,166,0,0.22)] p-6">
              <div className="relative z-10 max-w-[62%] xl:max-w-[68%]">
                <p className="text-[18px] md:text-[24px] italic font-extrabold text-[#212145]">Special Offer!</p>
                <h4 className="text-[24px] lg:text-[28px] xl:text-[34px] font-extrabold leading-[1.1] text-[#24315d] mt-4">Get 30% OFF on Website Design</h4>
                <p className="text-[14px] font-semibold text-[#6b3d00] mt-4">Valid till: 30 March</p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <button className="px-5 h-11 rounded-xl bg-[#3554b8] text-white font-semibold">View Details</button>
                  <button className="px-5 h-11 rounded-xl bg-[#ff7a1b] border border-white/40 text-white font-semibold">Contact Now</button>
                </div>
              </div>
              <div className="absolute right-2 bottom-2 w-[150px] h-[120px] rounded-[24px] bg-white/30 blur-2xl" />
              <div className="absolute right-4 bottom-4 text-[56px] lg:text-[68px] xl:text-[84px]">??</div>
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-xl bg-white text-[#7b6ca9] shadow-lg flex items-center justify-center"><ChevronLeft size={20} /></button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-11 h-11 rounded-xl bg-white text-[#7b6ca9] shadow-lg flex items-center justify-center"><ChevronRight size={20} /></button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 bg-white/84 border border-[#dacaf4] rounded-[22px] px-5 py-5 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <h4 className="text-[15px] font-bold text-[#2c1e4c]">My Registered Salons</h4>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 h-9 rounded-xl border border-[#d8c7f4] bg-white/95 text-[#654f8d] text-[13px] font-medium">Active Only</button>
                <button className="px-4 h-9 rounded-xl border border-[#d8c7f4] bg-white/95 text-[#654f8d] text-[13px] font-medium">This Month</button>
                <button className="px-4 h-9 rounded-xl border border-[#d8c7f4] bg-white/95 text-[#654f8d] text-[13px] font-medium flex items-center gap-2">By Area <ChevronDown size={14} /></button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="text-left text-[13px] text-[#715c99] border-b border-[#ece1f8]">
                    <th className="pb-4 font-semibold">Salon Name</th>
                    <th className="pb-4 font-semibold">Area</th>
                    <th className="pb-4 font-semibold">Service Type</th>
                    <th className="pb-4 font-semibold">Plan</th>
                    <th className="pb-4 font-semibold">Status</th>
                    <th className="pb-4 font-semibold">Reg Date</th>
                  </tr>
                </thead>
                <tbody>
                  {salonsData.map((salon) => (
                    <tr key={salon.id} className="border-b border-[#f1e9fb] text-[14px] text-[#2f2450]">
                      <td className="py-4">
                        <div className="font-semibold">{salon.name}</div>
                        <div className="text-[11px] text-[#9181b4] mt-1">{salon.id}</div>
                      </td>
                      <td className="py-4">
                        <div>{salon.area}</div>
                        <div className="text-[11px] text-[#9181b4] mt-1">{salon.subArea}</div>
                      </td>
                      <td className="py-4">
                        <span className="inline-flex px-3 py-1 rounded-xl bg-[#edf4f5] text-[#5f6778] text-[13px]">{salon.serviceType}</span>
                      </td>
                      <td className="py-4">{salon.plan}</td>
                      <td className="py-4">
                        <span className={`inline-flex px-4 py-1 rounded-xl text-[13px] font-medium ${salon.statusClass}`}>{salon.status}</span>
                      </td>
                      <td className="py-4">{salon.regDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-4 text-[13px] text-[#7f70a6]">
              <p>Showing 1 - 6 of 48</p>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg border border-[#d8c7f4] bg-white/95 text-[#7f70a6]">{`<`}</button>
                <button className="w-8 h-8 rounded-lg bg-[#8a63f7] text-white">1</button>
                <button className="w-8 h-8 rounded-lg border border-[#d8c7f4] bg-white/95 text-[#7f70a6]">2</button>
                <button className="w-8 h-8 rounded-lg border border-[#d8c7f4] bg-white/95 text-[#7f70a6]">3</button>
                <button className="w-10 h-8 rounded-lg border border-[#d8c7f4] bg-white/95 text-[#7f70a6]">79</button>
                <button className="w-8 h-8 rounded-lg border border-[#d8c7f4] bg-white/95 text-[#7f70a6]">{`>`}</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/84 border border-[#dacaf4] rounded-[22px] px-5 py-5 shadow-sm">
            <h4 className="text-[15px] font-bold text-[#2c1e4c] mb-3">Low Performance Alert</h4>
            <div className="space-y-3">
              {alertsData.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between rounded-2xl bg-[#f6efff] px-4 py-3.5">
                  <div>
                    <p className="text-[14px] font-semibold text-[#2f2450]">{alert.name}</p>
                    <p className="text-[11px] text-[#9181b4]">{alert.location}</p>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-white/95 text-[#5e4b86] text-[12px] font-bold shadow-sm">{alert.score}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </div>
  );
};

export default memo(SalonOwnerDashboard);

