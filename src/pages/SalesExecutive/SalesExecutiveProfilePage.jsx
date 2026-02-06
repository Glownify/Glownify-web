import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Mail, 
  Phone, 
  ShieldCheck, 
  Copy, 
  Check, 
  TrendingUp, 
  DollarSign, 
  User as UserIcon,
  MapPin,
  Briefcase,
  QrCode,
  Award
} from 'lucide-react';

const SalesExecutiveProfilePage = () => {
  const [copied, setCopied] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 bg-indigo-200 rounded-full"></div>
          <p className="text-slate-500 font-medium">Authenticating Executive Session...</p>
        </div>
      </div>
    );
  }

  const { roleDetails: details } = user;

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Executive Header Card */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-full -mr-20 -mt-20 z-0"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="h-28 w-28 bg-slate-900 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h1>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-200 w-fit mx-auto md:mx-0">
                  {user.role.replace('_', ' ')}
                </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 text-sm font-medium">
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-500"/> Account {user.status}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={16} className="text-indigo-500"/> Executive Grade</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
               <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2">
                  Edit Profile
               </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: ID & Contact */}
          <div className="space-y-6">
            {/* Referral Card */}
            <div className="bg-slate-900 rounded-4xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Executive Referral ID</p>
                <QrCode size={18} className="text-indigo-400"/>
              </div>
              <div className="flex items-center justify-between bg-white/10 rounded-2xl p-4 border border-white/10">
                <code className="font-mono font-bold text-lg text-indigo-300">{details?.referralId}</code>
                <button 
                  onClick={() => handleCopy(details?.referralId)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  {copied ? <Check size={20} className="text-emerald-400"/> : <Copy size={20}/>}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-4 text-center font-medium uppercase tracking-tighter">Use this code for partner onboarding</p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-4xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Contact Registry</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Mail size={20}/></div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Phone size={20}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</p>
                    <p className="text-sm font-bold text-slate-900">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><MapPin size={20}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Assigned City ID</p>
                    <p className="text-sm font-bold text-slate-900">{details?.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Earnings & Technicals */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Financial Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-4xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 text-emerald-50/50 group-hover:text-emerald-50 transition-colors">
                  <DollarSign size={100} />
                </div>
                <div className="relative z-10">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Total Earnings</p>
                  <h4 className="text-4xl font-black text-slate-900">${details?.totalEarnings || 0}</h4>
                  <div className="mt-4 flex items-center gap-2 text-emerald-600 text-xs font-bold">
                    <TrendingUp size={14}/> Paid to date
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-4xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 text-indigo-50/50 group-hover:text-indigo-50 transition-colors">
                  <Award size={100} />
                </div>
                <div className="relative z-10">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Commission Rate</p>
                  <h4 className="text-4xl font-black text-slate-900">{details?.commissionRate || 0}%</h4>
                  <div className="mt-4 flex items-center gap-2 text-indigo-600 text-xs font-bold">
                    <Check size={14}/> Standard Executive Rate
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata & System Info */}
            <div className="bg-white rounded-4xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-8 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Account Metadata</h3>
                <code className="text-[10px] text-slate-400 font-mono">ID: {user._id.slice(-8)}</code>
              </div>
              <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Account Creation</p>
                  <p className="text-sm font-bold text-slate-700">{new Date(user.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Last Profile Sync</p>
                  <p className="text-sm font-bold text-slate-700">{new Date(user.updatedAt).toLocaleString()}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Role Detail Reference</p>
                  <code className="text-[11px] block bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-500 break-all select-all">
                    {details?._id}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] py-6">
          Sales Executive Network &bull; Secure Terminal
        </p>
      </div>
    </div>
  );
};

export default SalesExecutiveProfilePage;