import React from "react";
import { useNavigate } from "react-router-dom";
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
  Briefcase,
  ShieldCheck
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

import { SUPERADMIN_CHART_DATA as mainChartData, STATE_REVENUE_DATA as stateRevenueData, GROWTH_RATE_DATA as growthData } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../redux/slice/superadminSlice";
import { useEffect } from "react";


// ── Main Component ────────────────────────────────────────────────────────────

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const isMobile = useMobile();
  const navigate = useNavigate();

  const { dashboardData, loading } = useSelector((state) => state.superadmin || {});

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);
  
  if (isMobile) {
    return <MobileSuperAdminDashboard />;
  }

  if (loading && !dashboardData) {
    return (
       <div className="flex h-[80vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-600 border-t-transparent"></div>
       </div>
    );
  }


  return (
    <div className="space-y-8 pb-10">
      
      {/* ── Header Area ── */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] opacity-80 decoration-rose-200 underline underline-offset-4">System Pulse</span>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight mt-1">
          Executive Overview
        </h1>
      </div>

      {/* ── Top Stats ── */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard 
          title="Platform Revenue" 
          value={dashboardData?.revenue ? `$${(dashboardData.revenue / 1000000).toFixed(2)}M` : "$1.42M"}
          subText="+12.4% vs last month"
          icon={<TrendingUp size={16} />}
          isValid
        />
        <StatCard 
          title="Active Salons" 
          value={dashboardData?.activeSalons || "842"}
          subText="24 onboarded this week"
          color="emerald"
        />
        <StatCard 
          title="Total Users" 
          value={dashboardData?.totalUsers ? `${(dashboardData.totalUsers / 1000).toFixed(1)}k` : "128.5k"}
          subText="Churn rate 1.2%"
          color="slate"
        />
        <StatCard 
          title="Booking Velocity" 
          value={dashboardData?.bookingVelocity || "18.2/min"}
          subText="Peak activity detected"
          isPrimary
        />
      </div>


      <div className="grid grid-cols-12 gap-8">
        {/* ── Left Column: Critical Actions ── */}
        <div className="col-span-8 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-800 tracking-tight">Critical Actions Required</h2>
              <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-black rounded-full uppercase tracking-wider border border-rose-100">3 Urgent Tasks</span>
           </div>

           <div className="space-y-3">
              <ActionItem 
                title="Luxe Barbers - New Registration" 
                desc="Identity verification & Tax compliance pending"
                btnText="Approve"
                onClick={() => navigate("/super-admin/manage-salons")}
                icon={<Store size={18} />}
              />
              <ActionItem 
                title="Dispute: #TRS-00021 (High Value)" 
                desc="$450.00 chargeback appeal from Salon ID: 442"
                btnText="Review"
                altBtnText="Escalate"
                onClick={() => navigate("/super-admin/manage-finance")}
                icon={<CreditCard size={18} className="text-orange-500" />}
                isUrgency
              />
              <ActionItem 
                title="Enterprise Plan Migration" 
                desc="Bloom Studio Group requesting custom tier access"
                btnText="Enable Custom Tier"
                onClick={() => navigate("/super-admin/manage-subscription")}
                icon={<Users size={18} className="text-slate-500" />}
              />
           </div>
        </div>

        {/* ── Right Column: Growth Distribution ── */}
        <div className="col-span-4 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col">
           <h2 className="text-lg font-black text-slate-800 tracking-tight mb-6">Growth Distribution</h2>
           
           <div className="flex-1 flex items-end justify-between px-2 mb-6">
              {growthData.map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-3 w-8">
                   <div 
                     className="w-full bg-rose-500 rounded-lg transition-all duration-1000" 
                     style={{ height: `${item.value}%` }}
                   ></div>
                   <span className="text-[10px] font-bold text-slate-400">{item.day}</span>
                </div>
              ))}
           </div>

           <div className="space-y-3 border-t border-slate-50 pt-6">
              <GrowthStat label="Subscription Growth" value="+18%" />
              <GrowthStat label="Service Commission" value="+7.2%" />
              <GrowthStat label="Marketplace Ads" value="+3.4%" />
              <button 
                onClick={() => navigate("/super-admin/manage-finance")}
                className="w-full py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-[11px] uppercase tracking-wider mt-2 border border-slate-100 hover:bg-slate-100 transition-colors"
              >
                Full Analytics Suite
              </button>
           </div>
        </div>
      </div>

      {/* ── Bottom: Ecosystem Events ── */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
         <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-1">
               <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Transparency</span>
               <h2 className="text-2xl font-black text-slate-800 tracking-tight">Recent Ecosystem Events</h2>
            </div>
            <button 
               onClick={() => navigate("/super-admin/manage-system-logs")}
               className="flex items-center gap-2 text-[11px] font-black text-rose-600 uppercase tracking-widest bg-rose-50 px-5 py-2.5 rounded-xl border border-rose-100 hover:bg-rose-100 transition-colors"
            >
               View All Logs <ChevronRight size={14} />
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="border-b border-slate-50">
                     <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Event Source</th>
                     <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Severity</th>
                     <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                     <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                     <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  <EventRow source="Payment Gateway: Stripe" severity="stable" time="2 mins ago" action="Batch payout success ($14k)" status="checked" />
                  <EventRow source="Auth Service: AWS" severity="info" time="14 mins ago" action="Rate limit reached for IP: 182.xx" status="blocked" />
                  <EventRow source="Messaging: Twilio" severity="stable" time="22 mins ago" action="SMS verification surge (India)" status="checked" />
               </tbody>
            </table>
         </div>
      </div>

    </div>
  );
};

// ── Helper Sub-Components ──────────────────────────────────────────────────

const StatCard = ({ title, value, subText, icon, color = 'rose', isPrimary, isValid }) => (
  <div className={`p-8 rounded-[2.5rem] border transition-all flex flex-col justify-between h-52 group ${
    isPrimary 
    ? "bg-rose-600 border-rose-600 text-white shadow-xl shadow-rose-200" 
    : "bg-white border-slate-50 shadow-sm hover:shadow-md"
  }`}>
    <div className="flex justify-between items-start">
       <span className={`text-[11px] font-black uppercase tracking-widest ${isPrimary ? "text-rose-100" : "text-slate-400"}`}>
         {title}
       </span>
       {icon && <div className={isPrimary ? "text-white" : "text-rose-500"}>{icon}</div>}
    </div>
    <div className="space-y-1">
       <h3 className={`text-4xl font-black tracking-tight ${isPrimary ? "text-white" : "text-slate-800"}`}>{value}</h3>
       <div className="flex items-center gap-2">
          {isValid && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>}
          <span className={`text-[11px] font-bold ${isPrimary ? "text-rose-200" : "text-slate-400"}`}>{subText}</span>
       </div>
    </div>
  </div>
);

const ActionItem = ({ title, desc, btnText, altBtnText, icon, isUrgency, onClick }) => (
  <div className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all ${
    isUrgency ? "bg-orange-50/30 border-orange-100" : "bg-slate-50/30 border-slate-100"
  }`}>
     <div className="flex items-center gap-5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          isUrgency ? "bg-orange-100 text-orange-600" : "bg-emerald-100 text-emerald-600"
        }`}>
           {icon}
        </div>
        <div className="flex flex-col">
           <h4 className="font-black text-slate-800 text-[14px]">{title}</h4>
           <p className="text-[12px] font-medium text-slate-400 mt-0.5">{desc}</p>
        </div>
     </div>
     <div className="flex items-center gap-3">
        <button 
          onClick={onClick}
          className="text-[11px] font-black text-slate-400 px-4 py-2 hover:text-slate-800 transition-colors"
        >
          Details
        </button>
        {altBtnText && (
          <button 
            onClick={onClick}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-[11px] font-black text-slate-500 hover:bg-slate-50 transition-all font-sans"
          >
            {altBtnText}
          </button>
        )}
        <button 
          onClick={onClick}
          className={`px-6 py-2.5 rounded-xl text-[11px] font-black text-white hover:opacity-90 transition-all font-sans ${
          isUrgency ? "bg-rose-600 shadow-md shadow-rose-100" : "bg-rose-600 shadow-md shadow-rose-100"
        }`}>
           {btnText}
        </button>
     </div>
  </div>
);

const GrowthStat = ({ label, value }) => (
  <div className="flex items-center justify-between group">
     <span className="text-[12px] font-bold text-slate-500">{label}</span>
     <span className="text-[12px] font-black text-slate-800">{value}</span>
  </div>
);

const EventRow = ({ source, severity, time, action, status }) => (
  <tr className="group hover:bg-slate-50 transition-colors">
     <td className="py-6">
        <div className="flex items-center gap-3">
           <div className={`w-2 h-2 rounded-full ${source.includes('Stripe') ? 'bg-emerald-500' : source.includes('AWS') ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
           <span className="font-bold text-slate-700 text-[13px]">{source}</span>
        </div>
     </td>
     <td className="py-6">
        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
          severity === 'stable' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
           {severity}
        </span>
     </td>
     <td className="py-6 text-[12px] font-bold text-slate-400">{time}</td>
     <td className="py-6 text-[13px] font-bold text-slate-700">{action}</td>
     <td className="py-6">
        {status === 'checked' ? (
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
             <ShieldCheck size={12} />
          </div>
        ) : (
          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-tight">Blocked</span>
        )}
     </td>
  </tr>
);

export default SuperAdminDashboard;