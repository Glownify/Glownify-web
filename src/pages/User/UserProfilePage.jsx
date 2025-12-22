import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Mail, Phone, ShieldCheck, 
  Calendar, Hash, Settings, ChevronRight,
  LogOut, CreditCard
} from 'lucide-react';

const UserProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  const joinDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) 
    : "Recent";

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="relative">
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 p-1">
              <div className="w-full h-full rounded-full bg-white p-1">
                 <div className="w-full h-full rounded-full bg-rose-50 flex items-center justify-center text-rose-600 text-5xl font-light">
                   {user?.name?.[0]?.toUpperCase() || "R"}
                 </div>
              </div>
            </div>
            {user?.isVerified && (
              <div className="absolute bottom-2 right-2 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-white">
                <ShieldCheck size={18} />
              </div>
            )}
          </div>

          <div className="text-center mt-6">
            <h1 className="text-3xl font-light text-slate-800 tracking-tight">
              {user?.name || "Raman"}
            </h1>
            <p className="text-rose-500 font-medium text-sm mt-1 uppercase tracking-widest italic">
              {user?.role || "Customer"}
            </p>
          </div>

          <div className="w-full mt-10 space-y-3">
            <button className="w-full flex items-center justify-between px-6 py-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all group">
              <span className="font-medium">Edit Profile</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full flex items-center justify-between px-6 py-4 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition-all">
              <span className="font-medium">Logout</span>
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Right Column: Information & Settings */}
        <div className="lg:col-span-8">
          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
              Account Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Info Block */}
              {[
                { label: 'Email Address', value: user?.email, icon: <Mail size={20}/> },
                { label: 'Phone Number', value: user?.phone, icon: <Phone size={20}/> },
                { label: 'Member Since', value: joinDate, icon: <Calendar size={20}/> },
                { label: 'Account ID', value: user?._id?.slice(-8), icon: <Hash size={20}/> }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                  <div className="text-rose-500 mt-1">{item.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">{item.label}</p>
                    <p className="text-slate-700 font-medium mt-0.5">{item.value || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="group cursor-pointer p-6 rounded-3xl border-2 border-slate-50 hover:border-rose-100 hover:bg-rose-50/30 transition-all">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-white group-hover:text-rose-500 transition-all mb-4">
                    <CreditCard size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800">Payment Methods</h3>
                  <p className="text-sm text-slate-500 mt-1">Manage your cards and billing details.</p>
               </div>

               <div className="group cursor-pointer p-6 rounded-3xl border-2 border-slate-50 hover:border-rose-100 hover:bg-rose-50/30 transition-all">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-white group-hover:text-rose-500 transition-all mb-4">
                    <Settings size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800">Privacy Settings</h3>
                  <p className="text-sm text-slate-500 mt-1">Control your account visibility and data.</p>
               </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default UserProfilePage;