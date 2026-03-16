import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Download,
  IndianRupee,
  Calendar,
  Users,
  Receipt,
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChart as PieChartIcon,
  Sparkles,
  Award,
  Star,
} from 'lucide-react';
import MobileBottomNav from './MobileBottomNav';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BG = '#fff1f2';
const ROSE = '#e11d48';
const ROSE_LIGHT = '#fda4af';

// ─── Dummy Data ─────────────────────────────────────────────────────────────

const DATA = {
  week: {
    revenue: 12400,
    revenueDiff: +8.4,
    bookings: 47,
    bookingsDiff: +12.1,
    newClients: 9,
    newClientsDiff: +3.2,
    avgTicket: 264,
    avgTicketDiff: -2.1,

    revenueBar: [
      { name: 'Mon', value: 1200, color: ROSE_LIGHT },
      { name: 'Tue', value: 1850, color: ROSE },
      { name: 'Wed', value: 980, color: ROSE_LIGHT },
      { name: 'Thu', value: 2100, color: ROSE },
      { name: 'Fri', value: 1750, color: ROSE_LIGHT },
      { name: 'Sat', value: 2800, color: ROSE },
      { name: 'Sun', value: 1720, color: ROSE_LIGHT },
    ],

    bookingsLine: [
      { name: 'Mon', value: 5 },
      { name: 'Tue', value: 9 },
      { name: 'Wed', value: 6 },
      { name: 'Thu', value: 11 },
      { name: 'Fri', value: 8 },
      { name: 'Sat', value: 14 },
      { name: 'Sun', value: 8 },
    ],
  },

  month: {
    revenue: 58300,
    revenueDiff: +14.2,
    bookings: 214,
    bookingsDiff: +9.7,
    newClients: 38,
    newClientsDiff: +22.0,
    avgTicket: 272,
    avgTicketDiff: +4.3,

    revenueBar: [
      { name: 'W1', value: 8200, color: ROSE_LIGHT },
      { name: 'W2', value: 14500, color: ROSE },
      { name: 'W3', value: 17400, color: ROSE },
      { name: 'W4', value: 18200, color: ROSE_LIGHT },
    ],

    bookingsLine: [
      { name: 'W1', value: 44 },
      { name: 'W2', value: 62 },
      { name: 'W3', value: 58 },
      { name: 'W4', value: 50 },
    ],
  },

  year: {
    revenue: 694000,
    revenueDiff: +21.6,
    bookings: 2580,
    bookingsDiff: +18.3,
    newClients: 430,
    newClientsDiff: +31.0,
    avgTicket: 269,
    avgTicketDiff: +2.8,

    revenueBar: [
      { name: 'Jan', value: 42000, color: ROSE_LIGHT },
      { name: 'Feb', value: 38000, color: ROSE_LIGHT },
      { name: 'Mar', value: 51000, color: ROSE },
      { name: 'Apr', value: 62000, color: ROSE },
      { name: 'May', value: 74000, color: ROSE },
      { name: 'Jun', value: 68000, color: ROSE_LIGHT },
      { name: 'Jul', value: 55000, color: ROSE_LIGHT },
      { name: 'Aug', value: 72000, color: ROSE },
      { name: 'Sep', value: 80000, color: ROSE },
      { name: 'Oct', value: 66000, color: ROSE_LIGHT },
      { name: 'Nov', value: 43000, color: ROSE_LIGHT },
      { name: 'Dec', value: 43000, color: ROSE_LIGHT },
    ],

    bookingsLine: [
      { name: 'Jan', value: 180 },
      { name: 'Feb', value: 160 },
      { name: 'Mar', value: 210 },
      { name: 'Apr', value: 240 },
      { name: 'May', value: 290 },
      { name: 'Jun', value: 265 },
      { name: 'Jul', value: 220 },
      { name: 'Aug', value: 270 },
      { name: 'Sep', value: 305 },
      { name: 'Oct', value: 260 },
      { name: 'Nov', value: 180 },
      { name: 'Dec', value: 180 },
    ],
  },
};

const TOP_SERVICES = [
  { name: 'Bridal Makeup', bookings: 38, revenue: 190000, color: '#e11d48' },
  { name: 'Hair Colour', bookings: 54, revenue: 118800, color: '#f97316' },
  { name: 'Facial + Cleanup', bookings: 71, revenue: 106500, color: '#fb7185' },
  { name: 'Waxing', bookings: 93, revenue: 83700, color: '#fda4af' },
  { name: 'Spa Manicure', bookings: 49, revenue: 73500, color: '#fecdd3' },
];

const PIE_DATA = [
  { name: 'Bridal Makeup', value: 38, color: '#e11d48', text: '18%' },
  { name: 'Hair Colour', value: 54, color: '#f97316', text: '26%' },
  { name: 'Facial + Cleanup', value: 71, color: '#fb7185', text: '34%' },
  { name: 'Spa Manicure', value: 49, color: '#fda4af', text: '22%' },
];

const TOP_SPECIALISTS = [
  { name: 'Pooja S.', bookings: 64, rating: 4.9, initials: 'PS', revenue: 128000 },
  { name: 'Priya M.', bookings: 57, rating: 4.8, initials: 'PM', revenue: 102600 },
  { name: 'Ajay R.', bookings: 49, rating: 4.7, initials: 'AR', revenue: 88200 },
  { name: 'Rohit K.', bookings: 44, rating: 4.6, initials: 'RK', revenue: 79200 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(1)}L`
    : n >= 1000
    ? `₹${(n / 1000).toFixed(1)}k`
    : `₹${n}`;

const fmtCount = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`);

// ─── Section Heading ──────────────────────────────────────────────────────────

const SectionHeading = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-3 px-4">
    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ffe4e6' }}>
      <Icon size={14} color={ROSE} />
    </div>
    <span className="text-base font-bold text-gray-800">{title}</span>
  </div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, label, value, diff, accent }) => {
  const up = diff >= 0;
  return (
    <div
      className="bg-white rounded-2xl p-4 flex-1 shadow-sm"
      style={{
        boxShadow: '0 3px 10px rgba(249, 168, 184, 0.15)',
      }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center mb-2"
        style={{ backgroundColor: `${accent}22` }}
      >
        <Icon size={17} color={accent} />
      </div>
      <div className="text-2xl font-extrabold text-gray-800">{value}</div>
      <div className="text-xs text-gray-400 font-medium mt-0.5">{label}</div>

      <div className="flex items-center gap-1 mt-2">
        {up ? (
          <TrendingUp size={13} color="#16a34a" />
        ) : (
          <TrendingDown size={13} color="#dc2626" />
        )}
        <span className={`text-xs font-bold ${up ? 'text-green-600' : 'text-red-500'}`}>
          {up ? '+' : ''}
          {diff}%
        </span>
        <span className="text-xs text-gray-300">vs last</span>
      </div>
    </div>
  );
};

// ─── Card Wrapper ─────────────────────────────────────────────────────────────

const Card = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-2xl mx-4 p-4 mb-4 ${className}`}
    style={{
      boxShadow: '0 3px 12px rgba(249, 168, 184, 0.13)',
    }}
  >
    {children}
  </div>
);

// ─── Period Toggle ────────────────────────────────────────────────────────────

const PERIODS = ['week', 'month', 'year'];

const PeriodToggle = ({ value, onChange }) => (
  <div className="flex bg-white rounded-xl border border-gray-100 p-0.5 mx-4 mb-4">
    {PERIODS.map((p) => {
      const active = value === p;
      return (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`flex-1 py-2 rounded-lg items-center justify-center transition-colors
            ${active ? 'bg-rose-500' : 'bg-transparent'}`}
        >
          <span
            className={`text-sm font-semibold capitalize
              ${active ? 'text-white' : 'text-gray-400'}`}
          >
            {p}
          </span>
        </button>
      );
    })}
  </div>
);

// ─── Top Service Row ──────────────────────────────────────────────────────────

const ServiceRow = ({ item, rank, maxBookings }) => {
  const pct = (item.bookings / maxBookings) * 100;
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-300 w-4">#{rank}</span>
          <span className="text-sm font-semibold text-gray-700">{item.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{item.bookings} bookings</span>
          <span className="text-sm font-bold text-gray-800">{fmt(item.revenue)}</span>
        </div>
      </div>
      {/* Progress bar */}
      <div className="h-1.5 bg-pink-50 rounded-full overflow-hidden w-full">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: item.color }}
        />
      </div>
    </div>
  );
};

// ─── Specialist Row ───────────────────────────────────────────────────────────

const SpecialistRow = ({ item, rank }) => (
  <div className="flex items-center mb-3 last:mb-0">
    <span className="text-xs font-bold text-gray-300 w-5">#{rank}</span>
    {/* Avatar */}
    <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center mr-3 shrink-0">
      <span className="text-xs font-bold text-rose-600">{item.initials}</span>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-semibold text-gray-800 truncate">{item.name}</div>
      <div className="flex items-center gap-1 mt-0.5">
        <Star size={11} color="#f59e0b" fill="#f59e0b" />
        <span className="text-xs text-gray-400">{item.rating}</span>
        <span className="text-gray-200 mx-1">·</span>
        <span className="text-xs text-gray-400">{item.bookings} bookings</span>
      </div>
    </div>
    <div className="text-sm font-bold text-gray-800 shrink-0">{fmt(item.revenue)}</div>
  </div>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function MobileSalonReportScreen() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('month');
  const d = DATA[period];

  const maxBookings = Math.max(...TOP_SERVICES.map((s) => s.bookings));

  return (
    <div
      className="flex flex-col min-h-screen pb-24 font-sans"
      style={{ backgroundColor: BG }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 sticky top-0 z-10" style={{ backgroundColor: BG }}>
        <button
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 flex items-center justify-center rounded-full hover:bg-rose-50 transition-colors"
        >
          <ChevronLeft size={26} color={ROSE} />
        </button>
        <span className="text-lg font-bold text-gray-800 tracking-tight">Salon Reports</span>
        <button className="p-1 -mr-1 flex items-center justify-center rounded-full hover:bg-rose-50 transition-colors">
          <Download size={22} color={ROSE} />
        </button>
      </div>

      <div className="flex-1 pt-2">
        {/* ── Period Toggle ── */}
        <PeriodToggle value={period} onChange={setPeriod} />

        {/* ── Stat Cards (2×2 grid) ── */}
        <div className="px-4 mb-4 flex flex-col gap-3">
          <div className="flex gap-3">
            <StatCard
              icon={IndianRupee}
              label="Revenue"
              value={fmt(d.revenue)}
              diff={d.revenueDiff}
              accent="#e11d48"
            />
            <StatCard
              icon={Calendar}
              label="Bookings"
              value={fmtCount(d.bookings)}
              diff={d.bookingsDiff}
              accent="#f97316"
            />
          </div>
          <div className="flex gap-3">
            <StatCard
              icon={Users}
              label="New Clients"
              value={d.newClients}
              diff={d.newClientsDiff}
              accent="#0891b2"
            />
            <StatCard
              icon={Receipt}
              label="Avg Ticket"
              value={`₹${d.avgTicket}`}
              diff={d.avgTicketDiff}
              accent="#16a34a"
            />
          </div>
        </div>

        {/* ── Revenue Bar Chart ── */}
        <SectionHeading icon={BarChart3} title="Revenue Overview" />
        <Card>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={d.revenueBar} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fce7f3" />
                <XAxis
                  dataKey="name"
                  axisLine={{ stroke: '#fce7f3' }}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val)}
                />
                <Tooltip
                  cursor={{ fill: '#ffe4e6' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-rose-500 rounded-lg px-2 py-1 shadow-md">
                          <span className="text-white text-xs font-bold">{fmt(payload[0].value)}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {d.revenueBar.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* ── Bookings Line Chart ── */}
        <SectionHeading icon={TrendingUp} title="Booking Trend" />
        <Card>
          <div className="h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={d.bookingsLine} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={ROSE} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={ROSE} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fce7f3" />
                <XAxis
                  dataKey="name"
                  axisLine={{ stroke: '#fce7f3' }}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-rose-500 rounded-lg px-2 py-1 shadow-md">
                          <span className="text-white text-xs font-bold">{payload[0].value}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={ROSE}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorBookings)"
                  activeDot={{ r: 4, fill: ROSE }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-3 h-1.5 rounded-full bg-rose-400" />
            <span className="text-xs text-gray-400">Bookings per period</span>
          </div>
        </Card>

        {/* ── Service Mix Pie ── */}
        <SectionHeading icon={PieChartIcon} title="Service Mix" />
        <Card>
          <div className="flex items-center gap-4">
            {/* Pie */}
            <div className="w-[120px] h-[120px] relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    innerRadius={38}
                    outerRadius={58}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-extrabold text-gray-800 leading-tight">
                  {TOP_SERVICES.length}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">services</span>
              </div>
            </div>
            {/* Legend */}
            <div className="flex-1 flex flex-col gap-2">
              {TOP_SERVICES.slice(0, 4).map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-xs text-gray-600 flex-1 truncate">
                    {s.name}
                  </span>
                  <span className="text-xs font-bold text-gray-500 shrink-0">
                    {PIE_DATA[i]?.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── Top Services ── */}
        <SectionHeading icon={Sparkles} title="Top Services" />
        <Card>
          {TOP_SERVICES.map((s, i) => (
            <ServiceRow key={i} item={s} rank={i + 1} maxBookings={maxBookings} />
          ))}
        </Card>

        {/* ── Top Specialists ── */}
        <SectionHeading icon={Award} title="Top Specialists" />
        <Card className="mb-8">
          {TOP_SPECIALISTS.map((s, i) => (
            <SpecialistRow key={i} item={s} rank={i + 1} />
          ))}
        </Card>
      </div>

      <MobileBottomNav />
    </div>
  );
}
