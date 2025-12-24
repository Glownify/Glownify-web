import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  Copy, 
  Check, 
  TrendingUp, 
  DollarSign, 
  User as UserIcon,
  MapPin,
  Briefcase
} from 'lucide-react';

const ProfilePage = () => {
  const [copied, setCopied] = useState(false);
  
  // Get and Parse the user data from localStorage
  const userDataString = localStorage.getItem('user');
  const user = userDataString ? JSON.parse(userDataString) : null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-500">No profile data available. Please log in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 z-0"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="h-24 w-24 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-indigo-100">
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h1 className="text-3xl font-extrabold text-slate-900">{user.name}</h1>
                <span className="w-fit mx-auto md:mx-0 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest rounded-full border border-indigo-100">
                  {user.role.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1.5"><Calendar size={14}/> Member since {new Date(user.createdAt).getFullYear()}</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500"/> Verified Account</span>
              </div>
            </div>

            <div className="flex gap-2">
               <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
                  Edit Profile
               </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Contact & Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg"><Mail size={18} className="text-slate-400"/></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                    <p className="text-sm font-semibold text-slate-900 break-all">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg"><Phone size={18} className="text-slate-400"/></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Phone</p>
                    <p className="text-sm font-semibold text-slate-900">{user.phone}</p>
                  </div>
                </div>
                {user.roleDetails?.city && (
                   <div className="flex items-start gap-4">
                    <div className="p-2 bg-slate-50 rounded-lg"><MapPin size={18} className="text-slate-400"/></div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Region ID</p>
                      <p className="text-sm font-semibold text-slate-900">{user.roleDetails.city}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Referral Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Referral ID</p>
              <div className="flex items-center justify-between bg-white/10 rounded-xl p-3 border border-white/10">
                <code className="font-mono font-bold text-indigo-300">{user.roleDetails?.referralId || 'N/A'}</code>
                <button 
                  onClick={() => handleCopy(user.roleDetails?.referralId)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {copied ? <Check size={18} className="text-emerald-400"/> : <Copy size={18}/>}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-3 italic text-center">Share this ID to onboard new salons</p>
            </div>
          </div>

          {/* Right Column: Financials & Role Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600"><DollarSign size={24}/></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Total Earnings</p>
                    <h4 className="text-2xl font-black text-slate-900">${user.roleDetails?.totalEarnings || 0}</h4>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><TrendingUp size={24}/></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Commission Rate</p>
                    <h4 className="text-2xl font-black text-slate-900">{user.roleDetails?.commissionRate || 0}%</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-bold text-slate-900">Account Metadata</h3>
                 <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    user.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Account ID</p>
                      <p className="text-xs font-mono text-slate-600 break-all bg-slate-50 p-2 rounded-lg">{user._id}</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Executive ID</p>
                      <p className="text-xs font-mono text-slate-600 break-all bg-slate-50 p-2 rounded-lg">{user.roleDetails?.salesExecutive || 'None'}</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Last Updated</p>
                      <p className="text-sm font-semibold text-slate-700">{new Date(user.updatedAt).toLocaleDateString()}</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Role Version</p>
                      <p className="text-sm font-semibold text-slate-700">v{user.roleDetails?.__v || 0}.0</p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <p className="text-center text-slate-400 text-[11px] uppercase tracking-widest pt-4">
          Secured Profile Page &bull; {new Date().getFullYear()} System Dashboard
        </p>

      </div>
    </div>
  );
};

export default ProfilePage;