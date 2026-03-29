import React, { useState } from 'react';
import { 
  Shield, 
  Settings, 
  Terminal, 
  ShieldCheck, 
  Activity, 
  Bell, 
  ChevronRight, 
  ArrowRight, 
  Filter, 
  Download,
  Search,
  Zap,
  Cpu,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import useMobile from '../../hooks/useMobile';

const ManageSystemLogsPage = () => {
    const isMobile = useMobile();

    // Mock Audit Logs
    const auditLogs = [
        { 
            id: 1, 
            timestamp: "Oct 24, 2023", 
            time: "14:22:15 GMT", 
            admin: "Marcus Vane", 
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
            action: "Modified Global VAT", 
            actionColor: "rose", 
            object: "Policy_Tax_Global_v2.4", 
            ip: "192.168.1.384" 
        },
        { 
            id: 2, 
            timestamp: "Oct 24, 2023", 
            time: "12:05:44 GMT", 
            admin: "Jana Smith", 
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jana",
            action: "Revoked API Key", 
            actionColor: "slate", 
            object: "Auth_Provider_Internal", 
            ip: "172.16.254.12" 
        },
        { 
            id: 3, 
            timestamp: "Oct 23, 2023", 
            time: "09:15:20 GMT", 
            admin: "Marcus Vane", 
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
            action: "Created New Plan", 
            actionColor: "emerald", 
            object: "Plan_Enterprise_Elite", 
            ip: "192.168.1.384" 
        },
        { 
            id: 4, 
            timestamp: "Oct 23, 2023", 
            time: "05:44:11 GMT", 
            admin: "System Root", 
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robot",
            action: "Daily Snapshot Executed", 
            actionColor: "slate", 
            object: "DB_Global_Production", 
            ip: "::1 (local)" 
        },
    ];

    if (isMobile) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                    <Terminal className="text-rose-600" />
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">System Logs</h1>
                </div>
                
                <div className="space-y-4">
                    {auditLogs.map(log => (
                        <div key={log.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-3">
                                    <img src={log.avatar} alt="" className="w-8 h-8 rounded-lg bg-slate-50" />
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{log.timestamp}</div>
                                        <div className="text-xs font-bold text-slate-800">{log.admin}</div>
                                    </div>
                                </div>
                                <span className="text-[9px] font-black font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                    {log.ip}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                    log.actionColor === 'rose' ? 'bg-rose-500' : 
                                    log.actionColor === 'emerald' ? 'bg-emerald-500' : 'bg-slate-300'
                                }`}></div>
                                <div className="text-xs font-bold text-slate-600">{log.action}</div>
                            </div>
                            <div className="text-[10px] font-medium text-slate-400 truncate bg-slate-50 p-2 rounded-lg border border-slate-100/50">
                                {log.object}
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
                   <span className="text-[10px] uppercase font-black tracking-widest text-rose-600">Administrative Hub</span>
                   <h1 className="text-4xl font-black text-slate-800 tracking-tight">System Terminal</h1>
                   <p className="text-slate-500 mt-2 font-medium max-w-2xl">
                      Manage global ecosystem parameters, financial thresholds, and monitor immutable security audit logs in real-time.
                   </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="Search system logs or configurations..." 
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
                    <div className="h-10 w-px bg-slate-200 mx-2"></div>
                    <div className="flex items-center gap-3 bg-white p-2 border border-slate-100 rounded-2xl shadow-sm">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="" className="w-8 h-8 rounded-xl bg-slate-50" />
                        <div className="pr-3">
                            <div className="text-[10px] font-black text-slate-800 uppercase tracking-tight leading-none">Marcus Vane</div>
                            <div className="text-[9px] font-bold text-rose-600 uppercase tracking-widest mt-0.5">Global Admin</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-12 gap-8">
                {/* Global Tax Rates */}
                <div className="col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between group transition-all hover:shadow-xl hover:shadow-rose-500/5">
                    <div>
                        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-8 border border-rose-100/50 group-hover:scale-110 transition-transform">
                            <span className="text-2xl font-black">%</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">Global Tax Rates</h3>
                        <p className="text-xs font-medium text-slate-400 leading-relaxed mb-8">
                            Standardize VAT and service levies across all operational regions.
                        </p>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Standard VAT (%)</label>
                                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-black text-slate-700">
                                    18.5
                                </div>
                            </div>
                            <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Platform Service Fee (%)</label>
                                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-black text-slate-700">
                                    2.5
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button className="group/btn flex items-center gap-2 text-rose-600 text-xs font-black uppercase tracking-widest mt-10 hover:gap-3 transition-all">
                        Update Policy <ArrowRight size={14} />
                    </button>
                </div>

                {/* API Gateway */}
                <div className="col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm group">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-rose-500 mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-slate-200">
                        <Cpu size={28} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">API Gateway</h3>
                    <p className="text-xs font-medium text-slate-400 leading-relaxed mb-10">
                        Manage external connections and third-party salon management tool integrations.
                    </p>
                    
                    <div className="space-y-4">
                        <ConnectionRow icon={<RefreshCw size={16} />} name="Stripe Connect" status="ACTIVE" active />
                        <ConnectionRow icon={<Terminal size={16} />} name="Twilio SMS" status="STANDBY" />
                    </div>
                </div>

                {/* Alert Thresholds */}
                <div className="col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div className="relative">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-800 mb-8 border border-slate-100">
                            <Bell size={28} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Alert Thresholds</h3>
                        
                        <div className="space-y-8">
                            <ThresholdItem label="Critical Rev Drop" value="15.0%" progress={75} color="rose" />
                            <ThresholdItem label="Churn Risk Trigger" value="30 Days" progress={45} color="slate" />
                        </div>

                        <button className="w-full mt-12 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
                            Config Thresholds
                        </button>
                    </div>
                </div>
            </div>

            {/* Security Audit Log */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-10 border-b border-slate-50">
                    <div>
                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block mb-1">Immutable Record</span>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Security Audit Log</h2>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-600 transition-all font-black text-[10px] uppercase tracking-widest">
                            <Filter size={14} /> Filter Logs
                        </button>
                        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-600 transition-all font-black text-[10px] uppercase tracking-widest">
                            <Download size={14} /> Export CSV
                        </button>
                    </div>
                </div>
                
                <table className="w-full text-left order-collapse">
                    <thead>
                        <tr className="bg-slate-50/30">
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timestamp</th>
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Administrator</th>
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Action Performed</th>
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">System Object</th>
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">IP Address</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {auditLogs.map(log => (
                            <tr key={log.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="px-10 py-8">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-800">{log.timestamp}</span>
                                        <span className="text-[9px] font-bold text-slate-400 tracking-tight mt-1">{log.time}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center p-0.5 border border-slate-200/50">
                                            <img src={log.avatar} alt="" className="w-full h-full rounded-lg" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-700">{log.admin}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                        log.actionColor === 'rose' ? 'bg-rose-50 text-rose-600' :
                                        log.actionColor === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                        'bg-slate-100 text-slate-500'
                                    }`}>
                                        {log.action}
                                    </span>
                                </td>
                                <td className="px-10 py-8">
                                    <span className="text-xs font-bold text-slate-500 font-mono tracking-tight">{log.object}</span>
                                </td>
                                <td className="px-10 py-8">
                                    <span className="text-[10px] font-black text-slate-400 tracking-widest font-mono">{log.ip}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-10 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing 4 of 28,451 security events</span>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
                            <RefreshCw size={14} className="rotate-180" />
                        </button>
                        <button className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Notice */}
            <div className="bg-rose-600 rounded-[2.5rem] p-8 text-white flex items-center justify-between shadow-2xl shadow-rose-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110"></div>
                <div className="flex items-center gap-6 relative">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <AlertCircle size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black tracking-tight">System Integrity Check Required</h4>
                        <p className="text-xs font-medium text-rose-100/70 mt-1">The annual compliance audit is scheduled for next Monday. Ensure all logs are verified.</p>
                    </div>
                </div>
                <button className="px-10 py-5 bg-white text-rose-600 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95 shadow-xl relative overflow-hidden group/btn">
                    Run Verify Task
                </button>
            </div>
        </div>
    );
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const ConnectionRow = ({ icon, name, status, active }) => (
    <div className={`flex items-center justify-between p-4 rounded-2xl border ${active ? 'bg-white border-rose-100/50 shadow-sm' : 'bg-slate-50/50 border-slate-100/50'} transition-all hover:border-rose-200`}>
        <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? 'bg-rose-50 text-rose-600' : 'bg-white text-slate-400 border border-slate-100'}`}>
                {icon}
            </div>
            <span className="text-xs font-black text-slate-700 tracking-tight">{name}</span>
        </div>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200/50 text-slate-400'}`}>
            {status}
        </span>
    </div>
);

const ThresholdItem = ({ label, value, progress, color }) => (
    <div>
        <div className="flex justify-between items-end mb-3 px-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
            <span className={`text-xs font-black ${color === 'rose' ? 'text-rose-600' : 'text-slate-800'}`}>{value}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
                className={`h-full rounded-full transition-all duration-1000 ${color === 'rose' ? 'bg-rose-500 shadow-[0_0_12px_rgba(225,29,72,0.4)]' : 'bg-slate-800'}`} 
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    </div>
);

export default ManageSystemLogsPage;
