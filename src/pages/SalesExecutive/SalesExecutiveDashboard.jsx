import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  List,
  MapPin,
  MoreVertical,
  Plus,
  Settings,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const leadPipelineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 450 },
  { name: "May", value: 754 },
  { name: "Jun", value: 500 },
];

const quickActions = [
  { icon: Plus, label: "Add Lead", iconColor: "#f43f5e", bg: "#fecdd3", path: "/sales-executive/dashboard" },
  { icon: Target, label: "Track Target", iconColor: "#0ea5e9", bg: "#e0f2fe", path: "/sales-executive/dashboard" },
  { icon: Users, label: "Sales Team", iconColor: "#ec4899", bg: "#fbcfe8", path: "/sales-executive/manage-salesman" },
  { icon: FileText, label: "View Reports", iconColor: "#10b981", bg: "#d1fae5", path: "/sales-executive/dashboard" },
  { icon: MapPin, label: "Districts", iconColor: "#f97316", bg: "#ffedd5", path: "/sales-executive/dashboard" },
  { icon: Zap, label: "Instant Lead", iconColor: "#8b5cf6", bg: "#ede9fe", path: "/sales-executive/dashboard" },
];

const SalesExecutiveDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Lead");

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>Shonit's Aditya Kumar</span>
            <span className="h-1 w-1 rounded-full bg-slate-200" />
            <span>Executive Analytics</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Analytics <span className="animate-pulse">🚀</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50">
            <Settings size={14} /> Rules
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50">
            <Download size={14} className="rotate-180" /> Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => action.path && navigate(action.path)}
            className="flex items-center gap-3 rounded-[22px] border border-white/50 bg-white/40 backdrop-blur-md p-4 shadow-sm transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/5 active:scale-[0.98] group"
          >
            <div className="rounded-xl bg-purple-50 p-2 shadow-inner group-hover:scale-110 transition-transform">
              <action.icon size={18} className="text-[#8B5CF6]" strokeWidth={3} />
            </div>
            <span className="truncate text-[13px] font-bold text-slate-700">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-8 xl:flex-row">
        <div className="flex min-w-0 flex-[2.5] flex-col gap-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-4">
            <StatCard
              title="Monthly Target"
              value="Rs 25,00,000"
              progress={82}
              progressText="Rs 20,65,400"
              progressColor="from-[#D946EF] to-[#8B5CF6]"
            />
            <StatCard
              title="Leads Managed"
              value="18"
              badge="Assigned"
              icon={
                <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-50">
                  <FileText className="text-[#8B5CF6]" size={20} />
                </div>
              }
            />
            <StatCard
              title="Sales Persons"
              value="47"
              badge="Active"
              avatars
              icon={
                <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-50">
                  <Users className="text-[#D946EF]" size={20} />
                </div>
              }
            />
            <StatCard
              title="Districts"
              value="31"
              badge="Active Districts"
              icon={
                <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-50">
                  <MapPin className="text-[#8B5CF6]" size={20} />
                </div>
              }
            />
          </div>

          <div className="relative overflow-hidden rounded-[40px] border border-purple-100/20 bg-white/70 shadow-sm">
            <div className="relative z-20 flex flex-col gap-4 p-8 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Lead Pipeline</h3>
                <MetricPill
                  icon={<TrendingUp size={16} className="text-emerald-500" />}
                  label="Total Leads"
                  value="754"
                  tone="bg-emerald-50"
                />
                <MetricPill
                  icon={<Wallet size={16} className="text-[#8B5CF6]" />}
                  label="Value"
                  value="Rs 2.5M"
                  tone="bg-purple-50"
                />
              </div>
              <button className="flex items-center gap-2 self-start text-xs font-black text-[#1a0b3a]/40 transition-all hover:text-[#6C5CE7] xl:self-auto">
                <List size={14} /> Record History
              </button>
            </div>

            <div className="relative mt-2 h-48 sm:h-56">
              <div className="animate-bounce-slow absolute left-4 top-2 z-30 flex h-20 w-20 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] text-white shadow-xl shadow-[#6c5ce7]/30 sm:left-8 sm:h-24 sm:w-24">
                <span className="text-2xl font-black sm:text-3xl">754</span>
                <span className="text-[10px] font-bold uppercase opacity-80">
                  Leads
                </span>
              </div>

              <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
                <div className="absolute bottom-[-20%] left-[-10%] h-full w-[120%] bg-gradient-to-t from-[#6c5ce7]/40 to-transparent blur-[100px] animate-pulse" />
              </div>

              <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={leadPipelineData}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#a29bfe" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#6c5ce7"
                      strokeWidth={5}
                      fillOpacity={1}
                      fill="url(#colorWave)"
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="none"
                      fill="#a29bfe"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-[#1a0b3a]/5 px-5 py-6 backdrop-blur-md sm:grid-cols-2 sm:gap-6 sm:px-8 xl:grid-cols-4 xl:px-12">
              <PipelineMetric label="Hot Leads" value="Rs 6,40,000" color="bg-rose-500" />
              <PipelineMetric
                label="Converted Sales Person"
                value="Rs 9,80,000"
                color="bg-orange-400"
              />
              <PipelineMetric label="Target Regions" value="Rs 1,12,000" color="bg-yellow-400" />
              <PipelineMetric label="Revenue" value="Rs 27,20,000" color="bg-indigo-400" />
            </div>
          </div>

          <div className="overflow-hidden rounded-[40px] border border-purple-100/20 bg-white/70 shadow-sm">
            <div className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                Target vs Achievement
                <span className="block text-sm font-bold text-slate-400 sm:inline sm:ml-4">
                  (This Month)
                </span>
              </h3>
              <button className="flex items-center gap-3 rounded-2xl bg-[#8B5CF6] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Target size={16} /> Targets
              </button>
            </div>

            {/* ... rest of the table code ... */}
          </div>

          <div className="overflow-hidden rounded-[40px] border border-purple-100/20 bg-white/70 shadow-sm">
            {/* ... rest of the assigned leads code ... */}
          </div>
        </div>

        <aside className="min-w-0 flex-1 space-y-8 xl:min-w-[360px]">
          <div className="relative overflow-hidden rounded-[40px] border border-[#8B5CF6]/20 bg-white/70 p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/5">
            <div className="mb-10 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                Commission Highlights
              </h3>
              <button className="text-slate-300 transition-colors hover:text-[#8B5CF6]">
                 <MoreVertical size={20} />
              </button>
            </div>

            <div className="mb-10 flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-purple-50 text-[#8B5CF6] text-3xl font-black shadow-lg shadow-purple-100">
                ₹
              </div>
              <div>
                <p className="mb-1 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Pending Amount
                </p>
                <p className="text-3xl font-black text-slate-800">
                  ₹20,65,000
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="mb-1 flex items-end justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Target Progress
                </span>
                <span className="text-sm font-black text-[#8B5CF6]">82%</span>
              </div>
              <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100 p-1">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.3)] animate-pulse"
                  style={{ width: "82%" }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-black text-slate-400">
                <span>₹20,65,000</span>
                <span className="text-[#8B5CF6]">₹4,35,500 Left</span>
              </div>
            </div>

            <div className="absolute right-[-50px] top-[-50px] h-48 w-48 rounded-full bg-purple-500/5 blur-[80px]" />
          </div>

          <div className="flex max-h-[480px] flex-col rounded-[2.5rem] border border-white/80 bg-white/40 p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-xl font-black text-[#1a0b3a]">
                Updates & Guidance
              </h3>
              <MoreVertical size={18} className="cursor-pointer text-[#1a0b3a]/20" />
            </div>

            <div className="no-scrollbar space-y-6 overflow-y-auto pr-1">
              <Msg
                author="Santosh Patel"
                role="Regional Lead"
                text="Is there any issue with the new licensing procedure? Please check."
                time="Today"
                avatar="SP"
              />
              <Msg
                author="Rohit Sharma"
                text="I'll check and update you. Got it, thanks!"
                time="April 22, 2024"
                isResponse
                avatar="RS"
              />
              <Msg
                author="Santosh Patel"
                text="The team is waiting for the final report. Any ETA?"
                time="1h ago"
                avatar="SP"
              />
            </div>
          </div>

          <div className="flex flex-col rounded-[2.5rem] border border-white/80 bg-white/40 p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 text-xl font-black text-[#1a0b3a] sm:mb-8">
              Targets Achieved
            </h3>
            <div className="space-y-4">
              <AchiveRow range="7% - 15%" bonus="6,000" count="1 Month" color="bg-orange-400" />
              <AchiveRow range="12% - 25%" bonus="10,000" count="1 Month" color="bg-purple-400" />
              <AchiveRow range="25% +" bonus="20,000" count="3 Months" color="bg-emerald-400" />
            </div>
          </div>
        </aside>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes bounce-slow { 0%, 100% { transform: translateY(-5px); } 50% { transform: translateY(5px); } }
            .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
          `,
        }}
      />
    </div>
  );
};

const MetricPill = ({ icon, label, value, tone }) => (
  <div className="flex items-center gap-3">
    <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${tone}`}>
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black uppercase leading-none text-[#1a0b3a]/30">
        {label}
      </span>
      <span className="text-sm font-black text-[#1a0b3a]">{value}</span>
    </div>
  </div>
);

const StatCard = ({ title, value, progress, progressText, progressColor, icon, badge, avatars }) => (
  <div className="relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/40 p-6 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-900/5 sm:p-8">
    <div className="relative z-10 mb-8 flex items-start justify-between gap-4">
      <div className="space-y-2">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#1a0b3a]/30">
          {title}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <h4 className="text-2xl font-black text-[#1a0b3a] sm:text-3xl">{value}</h4>
          {avatars && (
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/50?u=${i + 10}`}
                  className="h-5 w-5 rounded-full border-2 border-white shadow-sm"
                  alt="team"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {icon}
    </div>

    {progress !== undefined ? (
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between text-[10px] font-black">
          <span className="text-[#6C5CE7]">{progress}%</span>
          <span className="text-[#1a0b3a]/40">{progressText}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#1a0b3a]/5">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${progressColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    ) : (
      <div className="relative z-10 flex items-center gap-2 text-[11px] font-black uppercase tracking-tighter text-[#6C5CE7]">
        <ArrowRight size={12} /> {badge}
      </div>
    )}

    <div className="absolute right-[-20px] top-[-20px] h-24 w-24 rounded-full bg-[#6c5ce7]/5 blur-2xl transition-all group-hover:bg-[#6c5ce7]/10" />
  </div>
);

const PipelineMetric = ({ label, value, color }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-3">
      <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="text-[10px] font-black uppercase tracking-tighter text-[#1a0b3a]/30">
        {label}
      </span>
    </div>
    <span className="tabular-nums text-[15px] font-black text-[#1a0b3a]">
      {value}
    </span>
  </div>
);

const TabBtn = ({ label, active, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2.5 whitespace-nowrap rounded-2xl px-6 py-2.5 text-[11px] font-black tracking-wider transition-all ${
      active
        ? "bg-[#1a0b3a] text-white shadow-lg shadow-indigo-900/30 ring-4 ring-[#1a0b3a]/5"
        : "text-[#1a0b3a]/40 hover:bg-white/60 hover:text-[#1a0b3a]"
    }`}
  >
    {icon} {label}
  </button>
);

const DataRow = ({ name, id, assignedTo, city, person, date, revenue, avatar, flag }) => (
  <tr className="group cursor-pointer transition-all hover:bg-white/60">
    <td className="border-b border-[#1a0b3a]/5 px-6 py-6 first:rounded-bl-[1.25rem]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] border border-white bg-gradient-to-br from-[#6c5ce7]/10 to-[#a29bfe]/10 text-sm font-black text-[#6c5ce7] transition-transform group-hover:scale-105">
          {avatar}
        </div>
        <div className="flex flex-col space-y-0.5">
          <span className="text-sm font-black tracking-tight text-[#1a0b3a] transition-colors group-hover:text-[#6C5CE7]">
            {name}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1a0b3a]/30">
            {id}
          </span>
        </div>
      </div>
    </td>
    <td className="border-b border-[#1a0b3a]/5 px-6 py-5">
      <div className="flex items-center gap-2">
        {flag && <img src={flag} alt="flag" className="h-3 w-4 rounded-sm object-cover" />}
        <span className="rounded-lg bg-white/60 px-3 py-1 text-[10px] font-black uppercase text-[#1a0b3a] ring-1 ring-[#1a0b3a]/5">
          {assignedTo}
        </span>
      </div>
    </td>
    <td className="border-b border-[#1a0b3a]/5 px-6 py-5 text-[#1a0b3a]/60">{city}</td>
    <td className="border-b border-[#1a0b3a]/5 px-6 py-5">
      <div className="flex items-center gap-2.5">
        <div className="h-2 w-2 rounded-full bg-[#6C5CE7]" />
        <span>{person}</span>
      </div>
    </td>
    <td className="border-b border-[#1a0b3a]/5 px-6 py-5 text-[#1a0b3a]/30">{date}</td>
    <td className="border-b border-[#1a0b3a]/5 px-6 py-5 text-right text-sm font-black last:rounded-br-[1.25rem]">
      Rs {revenue}
    </td>
  </tr>
);

const Msg = ({ author, role, text, time, avatar, isResponse }) => (
  <div className="group flex flex-col gap-3 animate-in slide-in-from-right-4 duration-500">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-2xl text-xs font-black shadow-sm ${
            isResponse ? "bg-indigo-50 text-indigo-500" : "bg-purple-50 text-purple-500"
          }`}
        >
          {avatar}
        </div>
        <div className="flex flex-col">
          <p className="text-[13px] font-black text-[#1a0b3a]">{author}</p>
          {role && (
            <p className="text-[9px] font-black uppercase tracking-widest text-[#6C5CE7]">
              {role}
            </p>
          )}
        </div>
      </div>
      <span className="text-[10px] font-black text-[#1a0b3a]/20">{time}</span>
    </div>
    <div
      className={`rounded-3xl p-5 text-[13px] font-bold leading-relaxed shadow-sm transition-all group-hover:shadow-md ${
        isResponse
          ? "rounded-tl-none border-l-4 border-indigo-400 bg-white/80 text-[#1a0b3a]/60"
          : "cursor-default rounded-tl-none bg-[#1a0b3a] text-white"
      }`}
    >
      {text}
    </div>
  </div>
);

const AchiveRow = ({ bonus, range, count, color }) => (
  <div className="group flex flex-col gap-3 rounded-3xl border border-white/60 bg-white/40 p-5 transition-all hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex flex-wrap items-center gap-2 text-sm font-black text-[#1a0b3a]">
      <span className="italic tracking-tighter text-[#6C5CE7]">{range}</span>
      <ArrowRight size={14} className="text-[#1a0b3a]/20 transition-transform group-hover:translate-x-1" />
      <span className="font-extrabold tabular-nums">Rs {bonus}</span>
    </div>
    <div className={`w-fit rounded-full px-4 py-1.5 text-[10px] font-black text-white shadow-lg transition-transform group-hover:scale-105 ${color}`}>
      {count}
    </div>
  </div>
);

const RecentLeadRow = ({ name, id, assignedTo, status, renewOn, revenue, target }) => (
  <tr className="group border-b border-[#1a0b3a]/5 transition-all last:border-0 hover:bg-white/40">
    <td className="px-6 py-4">
      <div className="flex flex-col">
        <span className="font-black text-[#1a0b3a]">{name}</span>
        <span className="text-[10px] font-black text-[#1a0b3a]/30">{id}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <img src="https://flagcdn.com/w20/in.png" alt="flag" className="h-3 w-4 rounded-sm object-cover" />
        <span className="text-[#1a0b3a]">{assignedTo}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100">
          <Check size={10} className="text-emerald-500" />
        </div>
        <span className="text-[#1a0b3a]/60">{status}</span>
      </div>
    </td>
    <td className="px-6 py-4 text-center text-[#1a0b3a]/60">{renewOn}</td>
    <td className="px-6 py-4 text-center text-[#1a0b3a]">Rs {revenue}</td>
    <td className="px-6 py-4 text-center font-black text-[#1a0b3a]/60">Rs {target}</td>
    <td className="px-6 py-4 text-right">
      <button className="rounded-lg bg-[#6C5CE7] px-4 py-1.5 text-[10px] font-black text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.05]">
        Manage
      </button>
    </td>
  </tr>
);

export default memo(SalesExecutiveDashboard);
