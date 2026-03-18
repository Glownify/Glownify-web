import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Target,
    Wallet,
    Zap,
    Plus,
    ArrowRight,
    FileText,
    MapPin,
    TrendingUp,
    Settings,
    ChevronDown,
    HelpCircle,
    MoreVertical,
    Check,
    ChevronLeft,
    ChevronRight,
    Download,
    List
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const SalesExecutiveDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All Lead');

    const leadPipelineData = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 450 },
        { name: 'May', value: 754 },
        { name: 'Jun', value: 500 },
    ];

    const quickActions = [
        { icon: Plus, label: 'Add Lead', iconColor: '#f43f5e', bg: '#fecdd3' },
        { icon: Target, label: 'Track Target', iconColor: '#0ea5e9', bg: '#e0f2fe' },
        { icon: Users, label: 'Sales Team', iconColor: '#ec4899', bg: '#fbcfe8' },
        { icon: FileText, label: 'View Reports', iconColor: '#10b981', bg: '#d1fae5' },
        { icon: MapPin, label: 'Districts', iconColor: '#f97316', bg: '#ffedd5' },
        { icon: Zap, label: 'Instant Lead', iconColor: '#8b5cf6', bg: '#ede9fe' },
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-700">
            {/* 1. Header & Breadcrumbs */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#2D1B4E]/40 uppercase tracking-wider">
                        <span>Shonit's Aditya Kumar</span>
                        <span className="w-1 h-1 rounded-full bg-[#2D1B4E]/20"></span>
                        <span>Dashboard</span>
                        <span className="w-1 h-1 rounded-full bg-[#2D1B4E]/20"></span>
                        <span className="text-[#6C5CE7]">Sales & Executive</span>
                    </div>
                    <h1 className="text-4xl font-black text-[#1a0b3a] tracking-tight">Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-full text-xs font-black text-[#2D1B4E]/60 shadow-sm hover:bg-white hover:text-[#6C5CE7] transition-all">
                        <Settings size={14} /> All Rule
                    </button>
                    <button className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-full text-xs font-black text-[#2D1B4E]/60 shadow-sm hover:bg-white hover:text-[#6C5CE7] transition-all">
                        <Download size={14} className="rotate-180" /> Regcard History
                    </button>
                </div>
            </div>

            {/* 2. Quick Actions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {quickActions.map((action, index) => (
                    <button
                        key={index}
                        className="flex items-center justify-center gap-3 p-4 rounded-3xl transition-all hover:scale-[1.03] active:scale-[0.98] shadow-sm border border-white/60 group hover:shadow-xl hover:shadow-indigo-500/5"
                        style={{ backgroundColor: action.bg }}
                    >
                        <div className="p-2 rounded-xl bg-white/40 shadow-inner group-hover:scale-110 transition-transform">
                            <action.icon size={18} color={action.iconColor} strokeWidth={3} />
                        </div>
                        <span className="text-[13px] font-black text-[#1a0b3a] whitespace-nowrap">{action.label}</span>
                    </button>
                ))}
            </div>

            {/* 3. Main Body Split */}
            <div className="flex flex-col xl:flex-row gap-8">

                {/* Left Content Column */}
                <div className="flex-[2.5] flex flex-col gap-8 min-w-0">

                    {/* Stats Cards Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Monthly Target"
                            value="₹ 25,00,000"
                            progress={82}
                            progressText="₹ 20,65,400"
                            progressColor="from-[#6c5ce7] to-[#a29bfe]"
                        />
                        <StatCard
                            title="Leads Managed"
                            value="18"
                            badge="Assigned"
                            icon={<div className="p-3 bg-blue-50 rounded-2xl"><FileText className="text-blue-500" size={24} /></div>}
                        />
                        <StatCard
                            title="Sales Persons"
                            value="47"
                            badge="Active"
                            avatars={true}
                            icon={<div className="p-3 bg-purple-50 rounded-2xl"><Users className="text-[#a29bfe]" size={24} /></div>}
                        />
                        <StatCard
                            title="Districts Covered"
                            value="31"
                            badge="Districts"
                            icon={<div className="p-3 bg-emerald-50 rounded-2xl"><MapPin className="text-emerald-500" size={24} /></div>}
                        />
                    </div>

                    {/* Lead Pipeline Wave Card */}
                    <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/80 shadow-sm overflow-hidden flex flex-col group relative">
                        <div className="p-8 pb-4 flex items-center justify-between relative z-20">
                            <div className="flex items-center gap-6">
                                <h3 className="text-xl font-black text-[#1a0b3a]">Lead Pipeline</h3>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                                        <TrendingUp size={16} className="text-emerald-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-black text-[#1a0b3a]/30 leading-none">Total Leads</span>
                                        <span className="text-sm font-black text-[#1a0b3a]">754</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 border-l-2 border-[#1a0b3a]/5 pl-6">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <Wallet size={16} className="text-blue-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-black text-[#1a0b3a]/30 leading-none">Potential Value</span>
                                        <span className="text-sm font-black text-[#1a0b3a]">₹ 2,500,000</span>
                                    </div>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 text-xs font-black text-[#1a0b3a]/40 hover:text-[#6C5CE7] transition-all">
                                <List size={14} /> Record History
                            </button>
                        </div>

                        <div className="relative h-48 mt-2">
                            {/* Floating Leads Box */}
                            <div className="absolute top-2 left-8 z-30 flex flex-col items-center justify-center w-24 h-24 bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] rounded-3xl shadow-xl shadow-[#6c5ce7]/30 text-white animate-bounce-slow">
                                <span className="text-3xl font-black">754</span>
                                <span className="text-[10px] font-bold uppercase opacity-80">Leads</span>
                            </div>

                            {/* SVG Wave Background */}
                            <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none opacity-40">
                                <div className="absolute bottom-[-20%] left-[-10%] w-[120%] h-full bg-gradient-to-t from-[#6c5ce7]/40 to-transparent blur-[100px] animate-pulse"></div>
                            </div>

                            <div className="w-full h-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={leadPipelineData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#a29bfe" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="value" stroke="#6c5ce7" strokeWidth={5} fillOpacity={1} fill="url(#colorWave)" />
                                        {/* Additional waves for depth */}
                                        <Area type="monotone" dataKey="value" stroke="none" fill="#a29bfe" fillOpacity={0.1} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Metrics Footer Bar */}
                        <div className="px-12 py-8 bg-[#1a0b3a]/5 backdrop-blur-md grid grid-cols-4 gap-8">
                            <PipelineMetric label="Hot Leads" value="₹ 6,40,000" color="bg-rose-500" />
                            <PipelineMetric label="Converted Sales Person" value="₹ 9,80,000" color="bg-orange-400" />
                            <PipelineMetric label="Target Regions" value="₹ 1,12,000" color="bg-yellow-400" />
                            <PipelineMetric label="Revenue" value="₹ 27,20,000" color="bg-indigo-400" />
                        </div>
                    </div>

                    {/* Table Section Card */}
                    <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/80 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <h3 className="text-xl font-black text-[#1a0b3a]">Target vs Achievement <span className="text-[#1a0b3a]/30 font-bold text-sm ml-2">(This Month)</span></h3>
                            <button className="flex items-center gap-3 px-6 py-2.5 bg-[#1a0b3a] text-white rounded-full text-xs font-black shadow-xl shadow-indigo-900/10 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                <Target size={14} className="text-[#a29bfe]" /> Targets
                            </button>
                        </div>

                        {/* Content Tabs */}
                        <div className="px-8 pb-4 flex items-center gap-4 overflow-x-auto no-scrollbar">
                            <TabBtn label="All Lead" active={activeTab === 'All Lead'} onClick={() => setActiveTab('All Lead')} icon={<Zap size={14} />} />
                            <TabBtn label="Assign Lead" active={activeTab === 'Assign Lead'} onClick={() => setActiveTab('Assign Lead')} icon={<Plus size={14} />} />
                            <TabBtn label="Reassign Lead" active={activeTab === 'Reassign Lead'} onClick={() => setActiveTab('Reassign Lead')} icon={<Users size={14} />} />
                            <TabBtn label="Track Target" active={activeTab === 'Track Target'} onClick={() => setActiveTab('Track Target')} icon={<Target size={14} />} />
                        </div>

                        {/* Table Area */}
                        <div className="p-4 pt-2 overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-0">
                                <thead className="bg-[#1a0b3a] text-white text-[10px] font-black uppercase tracking-[0.15em]">
                                    <tr>
                                        <th className="px-6 py-5 rounded-tl-[1.25rem]">Trade Name & ID</th>
                                        <th className="px-6 py-5">Assigned To</th>
                                        <th className="px-6 py-5">City</th>
                                        <th className="px-6 py-5">Assigned Person</th>
                                        <th className="px-6 py-5">Dates Recieved</th>
                                        <th className="px-6 py-5 rounded-tr-[1.25rem] text-right">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[13px] font-bold divide-y divide-[#1a0b3a]/5">
                                    <DataRow
                                        name="Radiance Spa & Salon" id="GLW-SAL-100" assignedTo="GLW-SAL-109" flag="https://flagcdn.com/w20/in.png" city="Bangalore" person="Nitu Sharma" date="05 Apr 2025" revenue="39,999" avatar="RS"
                                    />
                                    <DataRow
                                        name="Glamour Hub" id="GLW-SAL-211" assignedTo="RAVI-SAIN-01" city="Mysore" person="Ravi Jain" date="04 Apr 2024" revenue="0" avatar="GH"
                                    />
                                    <DataRow
                                        name="Star Beauty Lounge" id="GLW-SAL-098" assignedTo="GLW-SAL-098" city="Hubli" person="Rakesh Kumar" date="29 Mar 2024" revenue="19,999" avatar="SB"
                                    />
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="p-8 pt-4 flex items-center justify-between">
                            <p className="text-xs font-extrabold text-[#1a0b3a]/30">Showing 1 - 3 of 3</p>
                            <div className="flex items-center gap-2">
                                <button className="p-2.5 rounded-xl bg-white/60 hover:bg-white text-[#1a0b3a]/40 hover:text-[#6C5CE7] transition-all border border-white/60 shadow-sm"><ChevronLeft size={16} /></button>
                                <button className="w-10 h-10 rounded-xl bg-[#6C5CE7] text-white font-black shadow-lg shadow-indigo-500/20 text-sm">1</button>
                                <button className="p-2.5 rounded-xl bg-white/60 hover:bg-white text-[#1a0b3a]/40 hover:text-[#6C5CE7] transition-all border border-white/60 shadow-sm"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Assigned Leads Section */}
                    <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/80 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 flex items-center justify-between border-b border-[#1a0b3a]/5">
                            <h3 className="text-xl font-black text-[#1a0b3a]">Recent Assigned Leads</h3>
                            <div className="flex items-center gap-3 text-xs font-bold text-[#1a0b3a]/40">
                                <span>1 - 9 of 19</span>
                                <button className="p-1 hover:text-[#6C5CE7]"><ChevronRight size={16} /></button>
                            </div>
                        </div>

                        <div className="p-4 pt-2 overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-0">
                                <thead className="text-[#1a0b3a]/30 text-[10px] font-black uppercase tracking-[0.1em]">
                                    <tr>
                                        <th className="px-6 py-4">Trade Name & ID</th>
                                        <th className="px-6 py-4">Assigned To</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-center">Renew On</th>
                                        <th className="px-6 py-4 text-center">Revenue</th>
                                        <th className="px-6 py-4 text-center">Target</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[13px] font-bold">
                                    <RecentLeadRow
                                        name="Radiance Spa & Salon"
                                        id="GLM-SAL, 100"
                                        assignedTo="GLW-SAL-100"
                                        status="Bangalore"
                                        renewOn="05 Apr 2025"
                                        revenue="39,999"
                                        target="39,999"
                                    />
                                    <RecentLeadRow
                                        name="Style Luxury Hub"
                                        id="GLM-SAL, 109"
                                        assignedTo="GLW-SAL-109"
                                        status="Mysore"
                                        renewOn="12 May 2025"
                                        revenue="18,500"
                                        target="25,000"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar Column */}
                <aside className="flex-1 space-y-8 min-w-[340px]">

                    {/* Commission Highlights Card */}
                    <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/80 shadow-sm flex flex-col group hover:shadow-2xl hover:shadow-indigo-900/5 transition-all duration-500 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-xl font-black text-[#1a0b3a]">Commission Highlights</h3>
                            <button className="text-[#1a0b3a]/20 hover:text-rose-500 transition-colors"><Plus className="rotate-45" size={20} /></button>
                        </div>

                        <div className="flex items-center gap-5 mb-10">
                            <div className="w-16 h-16 bg-yellow-100 rounded-[1.75rem] flex items-center justify-center text-3xl shadow-lg shadow-yellow-200/50">💰</div>
                            <div>
                                <p className="text-[11px] font-black text-[#1a0b3a]/40 uppercase tracking-widest mb-1">Pending Amount</p>
                                <p className="text-3xl font-black text-[#1a0b3a]">₹ 20,65,000</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[12px] font-black text-[#1a0b3a]/30 uppercase">Targets</span>
                                <span className="text-sm font-black text-[#6C5CE7]">82%</span>
                            </div>
                            <div className="h-4 w-full bg-[#1a0b3a]/5 rounded-full overflow-hidden flex p-1">
                                <div className="h-full bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] rounded-full shadow-[0_0_10px_rgba(108,92,231,0.3)] animate-pulse" style={{ width: '82%' }}></div>
                            </div>
                            <div className="flex justify-between text-[11px] font-black text-[#1a0b3a]/40">
                                <span>₹ 20,65,000</span>
                                <span className="text-[#a29bfe]">₹ 4,35,500</span>
                            </div>
                        </div>

                        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-indigo-500/5 rounded-full blur-[60px]"></div>
                    </div>

                    {/* Updates & Guidance (Chat Style) */}
                    <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/80 shadow-sm flex flex-col max-h-[480px]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-[#1a0b3a]">Updates & Guidance</h3>
                            <MoreVertical size={18} className="text-[#1a0b3a]/20 cursor-pointer" />
                        </div>

                        <div className="space-y-6 overflow-y-auto no-scrollbar pr-1">
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

                    {/* Targets Achieved */}
                    <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/80 shadow-sm flex flex-col">
                        <h3 className="text-xl font-black text-[#1a0b3a] mb-8">Targets Achieved</h3>
                        <div className="space-y-4">
                            <AchiveRow range="7% - 15%" bonus="6,000" count="1 Month" color="bg-orange-400" />
                            <AchiveRow range="12% - 25%" bonus="10,000" count="1 Month" color="bg-purple-400" />
                            <AchiveRow range="25% +" bonus="20,000" count="3 Months" color="bg-emerald-400" />
                        </div>
                    </div>

                </aside>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes bounce-slow { 0%, 100% { transform: translateY(-5px); } 50% { transform: translateY(5px); } }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      ` }} />
        </div>
    );
};

// --- Sub-components for Layout and Style ---

const StatCard = ({ title, value, progress, progressText, progressColor, icon, badge, avatars }) => (
    <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/80 shadow-sm flex flex-col justify-between group hover:shadow-2xl hover:shadow-indigo-900/5 transition-all duration-500 relative overflow-hidden">
        <div className="flex items-start justify-between mb-8 relative z-10">
            <div className="space-y-2">
                <p className="text-[11px] font-black text-[#1a0b3a]/30 uppercase tracking-widest">{title}</p>
                <div className="flex items-center gap-3">
                    <h4 className="text-3xl font-black text-[#1a0b3a]">{value}</h4>
                    {avatars && (
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/50?u=${i + 10}`} className="w-5 h-5 rounded-full border-2 border-white shadow-sm" alt="team" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {icon}
        </div>

        {progress !== undefined ? (
            <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center text-[10px] font-black">
                    <span className="text-[#6C5CE7]">{progress}%</span>
                    <span className="text-[#1a0b3a]/40">{progressText}</span>
                </div>
                <div className="h-2 w-full bg-[#1a0b3a]/5 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${progressColor} rounded-full`} style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        ) : (
            <div className="flex items-center gap-2 text-[11px] font-black text-[#6C5CE7] uppercase tracking-tighter relative z-10">
                <ArrowRight size={12} /> {badge}
            </div>
        )}

        {/* Subtle decorative circle */}
        <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-[#6c5ce7]/5 rounded-full blur-2xl group-hover:bg-[#6c5ce7]/10 transition-all"></div>
    </div>
);

const PipelineMetric = ({ label, value, color }) => (
    <div className="flex flex-col gap-2 group cursor-default">
        <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${color} shadow-[0_0_8px_${color}]`}></div>
            <span className="text-[10px] font-black text-[#1a0b3a]/30 uppercase tracking-tighter group-hover:text-[#1a0b3a] transition-colors">{label}</span>
        </div>
        <span className="text-[15px] font-black text-[#1a0b3a] tabular-nums">{value}</span>
    </div>
);

const TabBtn = ({ label, active, icon, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2.5 px-6 py-2.5 rounded-2xl text-[11px] font-black whitespace-nowrap transition-all tracking-wider
        ${active
                ? 'bg-[#1a0b3a] text-white shadow-lg shadow-indigo-900/30 ring-4 ring-[#1a0b3a]/5'
                : 'text-[#1a0b3a]/40 hover:text-[#1a0b3a] hover:bg-white/60'}
    `}>
        {icon} {label}
    </button>
);

const DataRow = ({ name, id, assignedTo, city, person, date, revenue, avatar, flag }) => (
    <tr className="hover:bg-white/60 transition-all group cursor-pointer">
        <td className="px-6 py-6 border-b border-[#1a0b3a]/5 first:rounded-bl-[1.25rem]">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-[#6c5ce7]/10 to-[#a29bfe]/10 text-[#6c5ce7] flex items-center justify-center font-black text-sm group-hover:scale-105 transition-transform border border-white">
                    {avatar}
                </div>
                <div className="flex flex-col space-y-0.5">
                    <span className="font-black text-[#1a0b3a] group-hover:text-[#6C5CE7] transition-colors tracking-tight text-sm">{name}</span>
                    <span className="text-[10px] text-[#1a0b3a]/30 font-black tracking-widest uppercase">{id}</span>
                </div>
            </div>
        </td>
        <td className="px-6 py-5 border-b border-[#1a0b3a]/5">
            <div className="flex items-center gap-2">
                {flag && <img src={flag} alt="flag" className="w-4 h-3 object-cover rounded-sm" />}
                <span className="px-3 py-1 bg-white/60 rounded-lg text-[10px] font-black text-[#1a0b3a] uppercase ring-1 ring-[#1a0b3a]/5">{assignedTo}</span>
            </div>
        </td>
        <td className="px-6 py-5 border-b border-[#1a0b3a]/5 text-[#1a0b3a]/60">{city}</td>
        <td className="px-6 py-5 border-b border-[#1a0b3a]/5">
            <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#6C5CE7]"></div>
                <span>{person}</span>
            </div>
        </td>
        <td className="px-6 py-5 border-b border-[#1a0b3a]/5 text-[#1a0b3a]/30">{date}</td>
        <td className="px-6 py-5 border-b border-[#1a0b3a]/5 text-right font-black text-sm last:rounded-br-[1.25rem]">₹ {revenue}</td>
    </tr>
);

const Msg = ({ author, role, text, time, avatar, isResponse }) => (
    <div className={`flex flex-col gap-3 group animate-in slide-in-from-right-4 duration-500`}>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs shadow-sm
                    ${isResponse ? 'bg-indigo-50 text-indigo-500' : 'bg-purple-50 text-purple-500'}`}>
                    {avatar}
                </div>
                <div className="flex flex-col">
                    <p className="text-[13px] font-black text-[#1a0b3a]">{author}</p>
                    {role && <p className="text-[9px] font-black text-[#6C5CE7] uppercase tracking-widest">{role}</p>}
                </div>
            </div>
            <span className="text-[10px] font-black text-[#1a0b3a]/20">{time}</span>
        </div>
        <div className={`p-5 rounded-3xl text-[13px] font-bold leading-relaxed shadow-sm group-hover:shadow-md transition-all
            ${isResponse
                ? 'bg-white/80 text-[#1a0b3a]/60 rounded-tl-none border-l-4 border-indigo-400'
                : 'bg-[#1a0b3a] text-white rounded-tl-none active:scale-[0.99] transition-transform cursor-default'}
        `}>
            {text}
        </div>
    </div>
);

const AchiveRow = ({ bonus, range, count, color }) => (
    <div className="flex items-center justify-between p-5 rounded-3xl bg-white/40 border border-white/60 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer group">
        <div className="flex items-center gap-2 text-sm font-black text-[#1a0b3a]">
            <span className="text-[#6C5CE7] italic tracking-tighter">{range}</span>
            <ArrowRight size={14} className="text-[#1a0b3a]/20 group-hover:translate-x-1 transition-transform" />
            <span className="font-extrabold tabular-nums">₹ {bonus}</span>
        </div>
        <div className={`px-4 py-1.5 ${color} text-white rounded-full text-[10px] font-black shadow-lg group-hover:scale-105 transition-transform`}>{count}</div>
    </div>
);

const RecentLeadRow = ({ name, id, assignedTo, status, renewOn, revenue, target }) => (
    <tr className="hover:bg-white/40 transition-all group border-b border-[#1a0b3a]/5 last:border-0">
        <td className="px-6 py-4">
            <div className="flex flex-col">
                <span className="text-[#1a0b3a] font-black">{name}</span>
                <span className="text-[10px] text-[#1a0b3a]/30 font-black">{id}</span>
            </div>
        </td>
        <td className="px-6 py-4">
            <div className="flex items-center gap-2">
                <img src="https://flagcdn.com/w20/in.png" alt="flag" className="w-4 h-3 object-cover rounded-sm" />
                <span className="text-[#1a0b3a]">{assignedTo}</span>
            </div>
        </td>
        <td className="px-6 py-4">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check size={10} className="text-emerald-500" />
                </div>
                <span className="text-[#1a0b3a]/60">{status}</span>
            </div>
        </td>
        <td className="px-6 py-4 text-center text-[#1a0b3a]/60">{renewOn}</td>
        <td className="px-6 py-4 text-center text-[#1a0b3a]">₹ {revenue}</td>
        <td className="px-6 py-4 text-center text-[#1a0b3a]/60 font-black">₹ {target}</td>
        <td className="px-6 py-4 text-right">
            <button className="px-4 py-1.5 bg-[#6C5CE7] text-white rounded-lg text-[10px] font-black shadow-lg shadow-indigo-500/20 hover:scale-[1.05] transition-all">
                Manage
            </button>
        </td>
    </tr>
);

export default memo(SalesExecutiveDashboard);