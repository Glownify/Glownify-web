import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  Clock, 
  Calendar, 
  User, 
  MessageSquare, 
  Phone, 
  MoreVertical, 
  CheckCircle, 
  Scissors, 
  CreditCard,
  Plus,
  ArrowRight,
  TrendingUp,
  Ticket,
  Printer,
  Mail,
  Instagram,
  Globe,
  Navigation,
  FileText,
  AlertCircle
} from 'lucide-react';
import MobileBookingDetailPage from './Mobile/BookingDetailPage';

const MOCK_BOOKING = {
  id: 1,
  customerName: 'Ayesha Khan',
  service: 'Waxing + Facial',
  status: 'completed', 
  date: 'May 13, 2024',
  timeStart: '12:00 PM',
  timeEnd: '1:30 PM',
  duration: '90 mins',
  specialist: {
    name: 'Priya D.',
    role: 'Senior Professional',
    initials: 'PR',
    avatar: 'https://i.pravatar.cc/150?u=priya',
  },
  services: [
    { id: 1, name: 'Full Arm Waxing', price: 600 },
    { id: 2, name: 'Leg Waxing', price: 700 },
    { id: 3, name: 'Acne Facial', price: 500 },
  ],
  notes: 'Client preferred organic wax for arms. No allergies reported during facial session. Very satisfied with the glow.',
  initials: 'AY',
  avatar: 'https://i.pravatar.cc/150?u=ayesha',
};

const BookingDetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const booking = location.state?.booking ?? MOCK_BOOKING;

    useState(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile) return <MobileBookingDetailPage />;

    const grandTotal = booking.services.reduce((sum, s) => sum + (s.price || 0), 0);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* ── TOP NAV & ACTIONS ── */}
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-sm sticky top-0 z-40">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Booking Context</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                             Appointment ID: <span className="text-pink-500">#GLO-{booking.id || '942'}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
                        <Printer size={18} /> Print Voucher
                    </button>
                    <button 
                        onClick={() => navigate('/salon-owner/create-bill', { state: { booking } })}
                        className="flex items-center gap-3 px-8 py-3.5 bg-[#E91E63] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-pink-500/20 hover:scale-105 transition-all"
                    >
                        Generate Bill
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                
                {/* ── LEFT SIDE: Customer & Details ── */}
                <div className="xl:col-span-8 space-y-10">
                    
                    {/* CUSTOMER PROFILE CARD */}
                    <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden">
                        {/* Status Watermark */}
                        <div className="absolute -top-10 -right-10 text-[12rem] font-black text-slate-50 select-none pointer-events-none uppercase">
                             {booking.status}
                        </div>

                        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-10">
                            <div className="relative group">
                                <img 
                                    src={booking.avatar || `https://i.pravatar.cc/150?u=${booking.id}`} 
                                    className="w-48 h-48 rounded-[3.5rem] object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500 ring-8 ring-pink-50" 
                                    alt={booking.customerName} 
                                />
                                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#E91E63]">
                                     <CheckCircle size={24} />
                                </div>
                            </div>

                            <div className="flex-1 space-y-6 text-center md:text-left pt-4">
                                <div>
                                    <h2 className="text-5xl font-black text-slate-800 tracking-tight">{booking.customerName}</h2>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                                        <div className="px-4 py-1.5 rounded-full bg-pink-50 text-[#E91E63] text-[10px] font-black uppercase tracking-widest">LOYAL CUSTOMER</div>
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                            {booking.status}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                                     <QuickInfo icon={Phone} label="Call Now" value="+91 9876..." color="text-teal-500" />
                                     <QuickInfo icon={MessageSquare} label="Message" value="Open Chat" color="text-[#8B5CF6]" />
                                     <QuickInfo icon={Mail} label="Email" value="a.khan@ex..." color="text-blue-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* APPOINTMENT SPECIFICS */}
                    <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-800 mb-10 tracking-tight">Appointment Specifics</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
                                <SectionLabel icon={Calendar} title="Schedule" color="text-pink-500" />
                                <div className="mt-6 space-y-2">
                                     <h4 className="text-xl font-black text-slate-800">{booking.date}</h4>
                                     <p className="text-sm font-bold text-slate-400 capitalize">{booking.timeStart} – {booking.timeEnd} <span className="mx-2 text-slate-200">|</span> {booking.duration}</p>
                                </div>
                            </div>

                            <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
                                <SectionLabel icon={User} title="Assigned Specialist" color="text-purple-500" />
                                <div className="mt-6 flex items-center gap-4">
                                     <img src={booking.specialist.avatar} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt={booking.specialist.name} />
                                     <div>
                                         <h4 className="text-lg font-black text-slate-800">{booking.specialist.name}</h4>
                                         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{booking.specialist.role}</p>
                                     </div>
                                </div>
                            </div>
                        </div>

                        {/* SERVICE SUMMARY */}
                        <div className="mt-12">
                             <SectionLabel icon={Scissors} title="Service Summary" color="text-[#E91E63]" />
                             <div className="mt-8 space-y-4">
                                 {booking.services.map(s => (
                                     <div key={s.id} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:shadow-lg transition-all cursor-default">
                                         <span className="font-bold text-slate-700">{s.name}</span>
                                         <span className="text-lg font-black text-slate-900">₹{s.price.toLocaleString()}</span>
                                     </div>
                                 ))}
                                 
                                 <div className="pt-8 flex items-center justify-between px-6">
                                     <div className="space-y-1">
                                          <h4 className="text-xl font-black text-slate-800">Grand Total</h4>
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inclusive of all taxes</p>
                                     </div>
                                     <h3 className="text-4xl font-black text-[#E91E63]">₹{grandTotal.toLocaleString()}</h3>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT SIDE: Context & Actions ── */}
                <div className="xl:col-span-4 space-y-8">
                    
                    {/* QUICK ACTIONS CARD */}
                    <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-8">Management Actions</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <SmallAction icon={Calendar} label="Reschedule" color="bg-white/10" />
                            <SmallAction icon={TrendingUp} label="Upgrade" color="bg-pink-500" />
                            <SmallAction icon={AlertCircle} label="Cancel" color="bg-white/10" />
                            <SmallAction icon={MessageSquare} label="Support" color="bg-white/10" />
                        </div>
                        <button className="w-full mt-10 h-16 rounded-[1.5rem] bg-white text-slate-900 font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Rebook Client</button>
                    </div>

                    {/* NOTES CARD */}
                    <div className="bg-amber-50/50 border-2 border-amber-100 rounded-[3rem] p-10">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-lg font-black text-amber-900 flex items-center gap-3"><FileText size={22} /> Notes</h4>
                            <button className="text-amber-600 font-bold text-xs uppercase tracking-widest">EDIT</button>
                        </div>
                        <p className="text-sm font-medium text-amber-800 italic leading-relaxed opacity-80">
                             "{booking.notes}"
                        </p>
                    </div>

                    {/* POLICIES / INFO */}
                    <div className="bg-white border border-slate-100 rounded-[3rem] p-10">
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Security & Policies</h4>
                         <div className="space-y-6">
                              <PolicyRow icon={CreditCard} text="Payment: Online/Handover" />
                              <PolicyRow icon={CheckCircle} text="Verified Appointment" />
                              <PolicyRow icon={Navigation} text="Location: Inner Ring Road" />
                         </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

/* ── HELPERS ── */

const SectionLabel = ({ icon: Icon, title, color }) => (
    <div className="flex items-center gap-3">
        <Icon size={18} className={color} />
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{title}</h4>
    </div>
);

const QuickInfo = ({ icon: Icon, label, value, color }) => (
    <div className="group cursor-pointer">
        <div className="flex items-center gap-2 mb-1">
             <Icon size={14} className={color} />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        </div>
        <p className="text-sm font-bold text-slate-700 group-hover:text-[#E91E63] transition-colors">{value}</p>
    </div>
);

const SmallAction = ({ icon: Icon, label, color }) => (
    <button className={`p-6 rounded-[2rem] ${color} transition-all hover:scale-105 active:scale-95 text-center`}>
         <Icon size={20} className="mx-auto mb-2" />
         <p className="text-[9px] font-black uppercase tracking-widest">{label}</p>
    </button>
);

const PolicyRow = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
        <Icon size={16} className="text-slate-300" />
        {text}
    </div>
);

export default BookingDetailPage;
