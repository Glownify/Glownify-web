import React from 'react';
import { 
  Download, 
  TrendingUp, 
  Wallet, 
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  FileText, 
  Plus, 
  Search, 
  Bell, 
  Settings,
  MoreVertical,
  Percent,
  MinusCircle,
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import useMobile from '../../hooks/useMobile';

const ManageFinancePage = () => {
    const isMobile = useMobile();

    // Mock Data
    const pendingPayouts = [
        { id: 1, name: "Luxe Velvet Studio", tier: "Premium Tier", balance: "12,450.00", lastPayout: "Oct 12, 2023", initials: "LV", color: "bg-rose-50 text-rose-600" },
        { id: 2, name: "Urban Nails Bar", tier: "Pro Tier", balance: "5,230.15", lastPayout: "Oct 14, 2023", initials: "UN", color: "bg-slate-50 text-slate-600" },
        { id: 3, name: "Glow & Flow Spa", tier: "Basic Tier", balance: "3,100.00", lastPayout: "Oct 01, 2023", initials: "GL", color: "bg-rose-50 text-rose-600" },
    ];

    const commissionTiers = [
        { name: "Basic Tier", rate: "5%", desc: "Standard rate for starter salons with limited transactions.", count: "412 SALONS", color: "rose" },
        { name: "Pro Tier", rate: "8%", desc: "Optimized for growing salons. Includes priority support.", count: "856 SALONS", color: "slate" },
        { name: "Premium Tier", rate: "12%", desc: "Enterprise solutions with API access and custom payouts.", count: "124 SALONS", color: "emerald" },
    ];

    const recentTransactions = [
        { id: 1, type: "Subscription Renewal", target: "Bloom Hair", ref: "#TXN-94021", amount: "+$299.00", time: "Just Now", icon: <PlusCircle size={16} />, color: "emerald" },
        { id: 2, type: "Service Fee Deduction", target: "Zen Spa", ref: "#FEE-1283", amount: "-$42.50", time: "14 minutes ago", icon: <Percent size={16} />, color: "rose" },
        { id: 3, type: "New Pro Setup", target: "Elite Barbers", ref: "#TXN-94020", amount: "+$499.00", time: "2 hours ago", icon: <PlusCircle size={16} />, color: "emerald" },
        { id: 4, type: "Service Fee Deduction", target: "Radiance Lab", ref: "#FEE-1282", amount: "-$12.80", time: "3 hours ago", icon: <Percent size={16} />, color: "rose" },
    ];

    if (isMobile) {
        return (
            <div className="p-4 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-black text-slate-800">Finance Hub</h1>
                    <button className="p-2 bg-rose-600 text-white rounded-xl shadow-lg shadow-rose-100">
                        <Download size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <MobileStatCard label="Total Earnings" value="$842,900" trend="+12.5%" />
                    <MobileStatCard label="Net Profit" value="$126,435" trend="+8.2%" />
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-black text-slate-800">Pending Payouts</h2>
                    {pendingPayouts.map(payout => (
                        <div key={payout.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs ${payout.color}`}>
                                    {payout.initials}
                                </div>
                                <div>
                                    <div className="text-sm font-black text-slate-800">{payout.name}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{payout.tier}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-black text-slate-800">${payout.balance}</div>
                                <button className="text-[10px] font-black text-rose-600 uppercase mt-1">Process</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                   <h1 className="text-4xl font-black text-slate-800 tracking-tight">Financial Overview</h1>
                   <p className="text-slate-500 mt-2 font-medium">Real-time performance metrics and payout management.</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="Search transactions or salons..." 
                            className="bg-slate-100/50 border border-slate-200/60 rounded-2xl px-6 py-3.5 pl-12 text-sm font-medium w-80 outline-none focus:ring-4 focus:ring-rose-50 focus:border-rose-200 transition-all placeholder:text-slate-400"
                        />
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    <button className="p-3.5 bg-white border border-slate-200/60 rounded-2xl text-slate-400 hover:text-rose-600 transition-colors shadow-sm">
                        <Bell size={20} />
                    </button>
                    <button className="p-3.5 bg-white border border-slate-200/60 rounded-2xl text-slate-400 hover:text-rose-600 transition-colors shadow-sm">
                        <Settings size={20} />
                    </button>
                    <button className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-rose-200 active:scale-95">
                        <Download size={16} /> Export Global Data
                    </button>
                </div>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-3 gap-8">
                <FinanceStatCard 
                    label="TOTAL PLATFORM EARNINGS" 
                    value="$842,900" 
                    trend="+12.5% from last month"
                    icon={<Wallet size={20} className="text-rose-600" />}
                    bgColor="bg-rose-50/50"
                />
                <FinanceStatCard 
                    label="NET PROFIT (FEES)" 
                    value="$126,435" 
                    trend="+8.2% fee efficiency"
                    icon={<FileText size={20} className="text-emerald-600" />}
                    bgColor="bg-emerald-50/50"
                />
                <FinanceStatCard 
                    label="PAYOUTS COMPLETED" 
                    value="1,248" 
                    trend="98.4% success rate"
                    icon={<CheckCircle size={20} className="text-emerald-600" />}
                    bgColor="bg-white"
                />
            </div>

            {/* Middle Section: Payouts and Tiers */}
            <div className="grid grid-cols-12 gap-10">
                {/* Pending Payouts Queue */}
                <div className="col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Pending Payouts Queue</h2>
                            <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-rose-100">
                                24 Awaiting Approval
                            </span>
                        </div>
                    </div>

                    <table className="w-full text-left order-collapse">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Salon Partner</th>
                                <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Balance</th>
                                <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Last Payout</th>
                                <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {pendingPayouts.map(payout => (
                                <tr key={payout.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="py-8">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center font-black text-sm shadow-sm ${payout.color}`}>
                                                {payout.initials}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-800">{payout.name}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{payout.tier}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8">
                                        <span className="text-sm font-black text-slate-800 tracking-tight">${payout.balance}</span>
                                    </td>
                                    <td className="py-8 text-center px-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-slate-600">{payout.lastPayout.split(',')[0]}</span>
                                            <span className="text-[10px] font-bold text-slate-400 mt-1">{payout.lastPayout.split(',')[1]}</span>
                                        </div>
                                    </td>
                                    <td className="py-8 text-right">
                                        <button className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-100 active:scale-95">
                                            Process Payout
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Commission Tiers */}
                <div className="col-span-4 space-y-6">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-4 flex items-center gap-2">
                        Commission Tiers
                    </h2>
                    {commissionTiers.map(tier => (
                        <div key={tier.name} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-rose-500/5 relative overflow-hidden group">
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${tier.color === 'rose' ? 'bg-rose-500' : tier.color === 'emerald' ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
                            <div className="flex justify-between items-start relative z-10">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-black text-slate-800 tracking-tight">{tier.name}</h3>
                                    <p className="text-[11px] font-medium text-slate-400 leading-relaxed max-w-[180px]">
                                        {tier.desc}
                                    </p>
                                </div>
                                <div className={`text-4xl font-black tracking-tighter ${tier.color === 'rose' ? 'text-rose-600' : tier.color === 'emerald' ? 'text-emerald-600' : 'text-slate-800'}`}>
                                    {tier.rate}
                                </div>
                            </div>
                            <div className="mt-8 flex items-center justify-between relative z-10">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${tier.color === 'emerald' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                    {tier.count}
                                </span>
                                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                    <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Transactions & Deductions */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Recent Transactions & Deductions</h2>
                    <button className="text-[11px] font-black text-rose-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                        View All <Plus size={14} />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    {recentTransactions.map(txn => (
                        <div key={txn.id} className={`bg-white group rounded-[2rem] p-6 border ${txn.color === 'emerald' ? 'border-emerald-100/30' : 'border-rose-100/30'} shadow-sm flex items-center justify-between hover:shadow-lg transition-all`}>
                            <div className="flex items-center gap-5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${txn.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} group-hover:scale-110 transition-transform`}>
                                    {txn.icon}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-800 tracking-tight">{txn.type} - {txn.target}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref: {txn.ref}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-lg font-black tracking-tight ${txn.color === 'emerald' ? 'text-emerald-600' : 'text-rose-600'}`}>{txn.amount}</div>
                                <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{txn.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ── Components ──────────────────────────────────────────────────────────────

const FinanceStatCard = ({ label, value, trend, icon, bgColor }) => (
    <div className={`rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group ${bgColor}`}>
        <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</span>
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                {icon}
            </div>
        </div>
        <div className="space-y-4">
            <div className="text-5xl font-black text-slate-800 tracking-tight">{value}</div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <TrendingUp size={14} /> {trend}
            </div>
        </div>
    </div>
);

const MobileStatCard = ({ label, value, trend }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{label}</span>
        <div className="text-3xl font-black text-slate-800 mb-2">{value}</div>
        <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{trend}</div>
    </div>
);

export default ManageFinancePage;
