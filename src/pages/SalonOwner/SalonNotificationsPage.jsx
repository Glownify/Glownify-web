import React, { useState } from "react";
import { 
  Bell, 
  ChevronRight, 
  Clock, 
  Star, 
  Calendar, 
  Info, 
  CheckCircle2, 
  Trash2, 
  Settings,
  Circle,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { toast } from "react-hot-toast";
import useMobile from "../../hooks/useMobile";
import MobileSalonNotificationsScreen from "./Mobile/MobileSalonNotificationsScreen";

const SalonNotificationsPage = () => {
  const isMobile = useMobile();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking",
      title: "New Appointment Request",
      message: "Julian Marc has requested a 'Signature Cut' for today at 2:30 PM.",
      time: "2 mins ago",
      isRead: false,
      color: "bg-rose-500",
      icon: Calendar
    },
    {
      id: 2,
      type: "review",
      title: "Five-Star Review!",
      message: "Sophia Chen just left a glowing review for your salon. 'Amazing service!'",
      time: "1 hour ago",
      isRead: false,
      color: "bg-emerald-500",
      icon: Star
    },
    {
      id: 3,
      type: "system",
      title: "Payout Successful",
      message: "Monthly earning of ₹ 42,000 has been transferred to your account.",
      time: "Yesterday",
      isRead: true,
      color: "bg-blue-500",
      icon: CheckCircle2
    },
    {
      id: 4,
      type: "alert",
      title: "Service Availability Update",
      message: "Sunita K. has marked herself unavailable for the upcoming Friday shift.",
      time: "2 days ago",
      isRead: true,
      color: "bg-orange-500",
      icon: AlertCircle
    }
  ]);

  if (isMobile) {
    return <MobileSalonNotificationsScreen />;
  }

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success("Marked all as read");
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#E91E63]">
             <span>Activity Stream</span>
             <span className="w-1 h-1 rounded-full bg-rose-200"></span>
             <span>Intelligent Hub</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-800">
            Notifications
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={markAllRead}
            className="px-6 py-3 rounded-2xl bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-white border border-slate-100 flex items-center gap-2 transition-all"
          >
            <CheckCircle2 size={16} /> Mark All Read
          </button>
          <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-100 transition-all">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* ── NOTIFICATIONS LIST ── */}
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div key={notif.id} className={`group relative flex items-start gap-6 p-8 rounded-[2.5rem] transition-all border ${notif.isRead ? 'bg-white/40 border-slate-50 grayscale-[0.3]' : 'bg-white border-white shadow-xl shadow-rose-200/10 hover:shadow-2xl hover:shadow-rose-500/5 hover:-translate-y-1'}`}>
              <div className={`w-14 h-14 rounded-2xl ${notif.color} flex items-center justify-center text-white shrink-0 shadow-lg`}>
                <notif.icon size={24} className="group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-slate-800 tracking-tight">{notif.title}</h4>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-serif">{notif.time}</span>
                </div>
                <p className="text-sm font-medium text-slate-500 leading-relaxed pr-10">
                  {notif.message}
                </p>
                {!notif.isRead && (
                   <span className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Circle size={8} fill="#E91E63" className="text-[#E91E63]" />
                   </span>
                )}
              </div>

              <button 
                onClick={() => deleteNotification(notif.id)}
                className="opacity-0 group-hover:opacity-100 p-3 rounded-xl bg-rose-50 text-rose-500 transition-all hover:bg-rose-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className="py-40 flex flex-col items-center justify-center text-center space-y-6 animate-in slide-in-from-bottom-10 duration-1000">
            <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 flex items-center justify-center text-slate-200">
               <Bell size={40} className="opacity-20" />
            </div>
            <div className="space-y-1">
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Stream is Clear</h3>
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No new updates found.</p>
            </div>
          </div>
        )}
      </div>

      {/* ── SYSTEM ADVERTISEMENT ── */}
      <div className="relative mt-20 overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-[#1a0b3a] to-[#2c1a4d] p-12 text-white shadow-2xl">
         <div className="relative z-10 max-w-lg space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">Optimization Suite</span>
            <h2 className="text-4xl font-black tracking-tight leading-[1.1]">Grow your salon with <span className="text-[#E91E63]">Promotional Campaigns</span></h2>
            <p className="text-white/60 font-medium leading-relaxed">Boost your revenue by up to 40% with smart notifications and targeted offers for your loyal customers.</p>
            <button className="flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20">
               Establish Campaign <ChevronRight size={18} className="stroke-[3]" />
            </button>
         </div>
         <div className="absolute right-[-10%] bottom-[-20%] w-[500px] h-[500px] rounded-full bg-[#E91E63]/10 blur-[120px]" />
         <Bell size={300} className="absolute right-0 top-0 opacity-5 -rotate-12 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};

export default SalonNotificationsPage;
