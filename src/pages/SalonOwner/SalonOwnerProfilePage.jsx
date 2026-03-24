import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Search,
  Bell,
  MessageSquare,
  Settings,
  Store,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  ExternalLink,
  ChevronRight,
  Info,
  CreditCard,
  Users,
  Sliders
} from 'lucide-react';
import MobileSalonProfileScreen from './Mobile/MobileSalonProfileScreen';

const SalonOwnerProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeTab, setActiveTab] = useState('General');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileSalonProfileScreen />;
  }

  // Use user from redux or a fallback dummy user for development preview
  const currentUser = user || {
    name: "Julian Vane",
    email: "julian.vane@example.com",
    roleDetails: {
      shopName: "The Atelier",
      whatsappNumber: "+33 1 45 22 33 44",
      location: {
        address: "12 Rue du Faubourg Saint-Honoré, 75008 Paris, France"
      }
    }
  };

  const { roleDetails: shop } = currentUser;

  const tabs = [
    { id: 'General', label: 'General', icon: Sliders },
    { id: 'Notifications', label: 'Notifications', icon: Bell },
    { id: 'Billing', label: 'Subscription & Billing', icon: CreditCard },
    { id: 'Permissions', label: 'Team Permissions', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* 1. Header / Top Bar */}
      <header className="px-8 py-4 flex items-center justify-between border-b border-slate-100 bg-[#F8F9FB]">
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[#D81159] transition-colors" />
            <input
              type="text"
              placeholder="Search settings..."
              className="w-full bg-slate-100/50 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#D81159]/20 transition-all outline-none"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F8F9FB]"></span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
            <MessageSquare size={20} />
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <div className="text-right">
              <p className="text-xs font-bold text-[#D81159]">The Atelier Paris</p>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter flex items-center justify-end gap-1">
                Live <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#D81159] text-white flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">
              AT
            </div>
          </div>
        </div>
      </header>

      {/* 2. Page Content */}
      <main className="p-8 max-w-[1400px] mx-auto">
        {/* Title & Description */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
            <p className="text-slate-500 text-sm font-medium">
              Configure your salon's digital identity, manage your professional team, and <br />
              customize how you communicate with clients.
            </p>
          </div>
          <button className="bg-[#D81159] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#D81159]/20 hover:bg-[#B10D49] transition-all transform active:scale-95 uppercase tracking-wider">
            Save Changes
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-slate-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 pb-4 text-sm font-bold transition-all relative ${
                activeTab === tab.id ? 'text-[#D81159]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#D81159] rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column (8 units) */}
          <div className="col-span-8 space-y-8">
            {/* Salon Identity Card */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] flex items-center justify-center text-[#D81159]">
                  <Store size={24} />
                </div>
                <h2 className="text-xl font-black text-slate-800">Salon Identity</h2>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Salon Brand Name</label>
                  <input
                    type="text"
                    defaultValue={shop?.shopName || "The Atelier"}
                    className="w-full bg-[#F3F6FF] border-none rounded-xl py-4 px-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-[#D81159]/20 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Contact Phone</label>
                  <input
                    type="text"
                    defaultValue={shop?.whatsappNumber || "+33 1 45 22 33 44"}
                    className="w-full bg-[#F3F6FF] border-none rounded-xl py-4 px-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-[#D81159]/20 outline-none"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Physical Address</label>
                  <input
                    type="text"
                    defaultValue={shop?.location?.address || "12 Rue du Faubourg Saint-Honoré, 75008 Paris, France"}
                    className="w-full bg-[#F3F6FF] border-none rounded-xl py-4 px-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-[#D81159]/20 outline-none"
                  />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Home Service Mode</p>
                    <p className="text-[10px] text-slate-400 font-bold">Allow staff to book appointments at client locations</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-400">
                  <Clock size={24} />
                </div>
                <h2 className="text-xl font-black text-slate-800">Business Hours</h2>
              </div>

              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Sunday'].map((day, idx) => (
                  <div key={day} className="flex items-center gap-6">
                    <p className="w-24 text-sm font-bold text-slate-800">{day}</p>
                    
                    {day === 'Sunday' ? (
                      <div className="flex-1 flex items-center gap-4">
                        <div className="flex-1 bg-[#F3F6FF] rounded-xl py-3 px-6 text-center">
                          <span className="text-xs font-bold text-slate-400 italic">Closed for maintenance</span>
                        </div>
                        <span className="px-4 py-1.5 bg-red-50 text-red-400 text-[10px] font-black uppercase rounded-full border border-red-100">Closed</span>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center gap-4">
                        <div className="flex-1 flex items-center gap-4">
                          <div className="flex-1 bg-[#F3F6FF] rounded-xl py-3 px-6 text-center text-sm font-bold text-slate-700">09:00 AM</div>
                          <span className="text-xs font-bold text-slate-400">to</span>
                          <div className="flex-1 bg-[#F3F6FF] rounded-xl py-3 px-6 text-center text-sm font-bold text-slate-700">07:00 PM</div>
                        </div>
                        <span className="px-4 py-1.5 bg-emerald-50 text-emerald-500 text-[10px] font-black uppercase rounded-full border border-emerald-100">Open</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 units) */}
          <div className="col-span-4 space-y-8">
            {/* Pro Suite Card */}
            <div className="bg-[#1D1B2A] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-8 right-8 text-slate-600">
                <Sliders size={20} className="rotate-45" />
              </div>
              
              <div className="mb-8">
                <span className="bg-[#D81159] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Current Plan</span>
                <h3 className="text-3xl font-black mt-4">Pro Suite</h3>
                <p className="text-slate-400 text-xs font-bold mt-1">Renewing on Oct 24, 2024</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  'Unlimited Staff Accounts',
                  'Advanced Analytics Reports',
                  'SMS & Email Marketing'
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="text-xs font-bold text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-white text-[#1D1B2A] py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-transform active:scale-95 shadow-lg shadow-white/5">
                Manage Subscription
              </button>
            </div>

            {/* Quick Alerts Card */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-black text-slate-800 mb-6">Quick Alerts</h3>
              
              <div className="space-y-6">
                {[
                  { label: 'Email Alerts', sub: 'Daily booking summary', active: true },
                  { label: 'SMS Notifications', sub: 'Urgent cancellation alerts', active: true },
                  { label: 'Marketing Consent', sub: 'Product updates and news', active: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{item.label}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{item.sub}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.active} />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D81159]"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-[#F3F6FF] rounded-2xl flex items-start gap-3">
                <div className="p-1.5 bg-[#D81159] rounded-lg text-white mt-0.5">
                  <Info size={12} />
                </div>
                <p className="text-[10px] font-bold text-slate-500 leading-normal">
                  System notifications regarding billing and security cannot be disabled.
                </p>
              </div>
            </div>

            {/* Data Privacy Card */}
            <div className="bg-[#F3F6FF] rounded-[2.5rem] p-8 border border-white">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-500 shadow-sm border border-white">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800">Data Privacy Encrypted</h3>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 max-w-[200px] mx-auto text-center leading-normal">
                    Your salon data is secured with AES-256 bank-level encryption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalonOwnerProfilePage;