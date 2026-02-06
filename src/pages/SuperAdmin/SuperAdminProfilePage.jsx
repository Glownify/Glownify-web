import React from 'react';
import { useSelector } from 'react-redux';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  Calendar, 
  Fingerprint, 
  Info, 
  CheckCircle2, 
  XCircle,
  Clock,
  Key
} from 'lucide-react';

const SuperAdminProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-slate-500 font-medium">Loading security credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Authority Header Card */}
        <div className="bg-slate-900 rounded-4xl p-8 text-white relative overflow-hidden shadow-2xl">
          {/* Abstract background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="h-28 w-28 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center text-5xl font-black text-indigo-300 shadow-inner">
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg border border-indigo-500/30 w-fit mx-auto md:mx-0">
                  {user.role.replace('_', ' ')}
                </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-400 text-sm">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock size={14} className="text-indigo-400"/> System Admin Since {new Date(user.createdAt).getFullYear()}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck size={14} className="text-emerald-400"/> Root Access Verified
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Auth Status</p>
                    <p className="text-xs font-bold text-emerald-400 uppercase">{user.status}</p>
                </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-4xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Info size={14}/> Contact Registry
              </h3>
              <div className="space-y-6">
                <div className="group">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Primary Email</p>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-indigo-500"/>
                    <span className="text-sm font-bold text-slate-700">{user.email}</span>
                  </div>
                </div>
                <div className="group">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Secure Line</p>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-indigo-500"/>
                    <span className="text-sm font-bold text-slate-700">{user.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* verification status card */}
            <div className="bg-white rounded-4xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Security Verification</h3>
                <div className={`flex items-center justify-between p-4 rounded-2xl border ${user.isVerified ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                    <div className="flex items-center gap-3">
                        {user.isVerified ? <CheckCircle2 className="text-emerald-500"/> : <XCircle className="text-amber-500"/>}
                        <span className="text-xs font-bold text-slate-700">Identity Verified</span>
                    </div>
                    <span className="text-[10px] font-black uppercase text-slate-400">{user.isVerified ? 'Yes' : 'No'}</span>
                </div>
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Government ID</p>
                    <p className="text-xs text-slate-500 font-medium italic">{user.governmentId || 'Not uploaded to registry'}</p>
                </div>
            </div>
          </div>

          {/* Main Content Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* System Privileges */}
            <div className="bg-white rounded-4xl p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Key size={20}/></div>
                    <h3 className="text-lg font-bold text-slate-900">Privilege Level: Tier 1 Root</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        "User Management", "Subscription Control", 
                        "System Logs", "Revenue Analytics", 
                        "Security Protocols", "Global Settings"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <CheckCircle2 size={16} className="text-indigo-500" />
                            <span className="text-xs font-bold text-slate-600">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Technical Traceability */}
            <div className="bg-white rounded-4xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-8 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Technical Signature</h3>
                <Fingerprint size={16} className="text-slate-300"/>
              </div>
              <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Unique Internal ID</p>
                  <code className="text-[11px] block bg-slate-900 text-indigo-300 p-3 rounded-xl font-mono border border-slate-800 break-all select-all">
                    {user._id}
                  </code>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Database Revision</p>
                    <p className="text-sm font-bold text-slate-700">Sequence v{user.__v}.0</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Last Secure Sync</p>
                    <p className="text-sm font-bold text-slate-700">{new Date(user.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] py-6">
          System Core Identity &bull; Secure Environment v2.4.0
        </p>
      </div>
    </div>
  );
};

export default SuperAdminProfilePage;