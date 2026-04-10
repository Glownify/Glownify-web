import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    ChevronLeft, 
    Calendar, 
    Clock, 
    Menu,
    UserCircle,
    User,
    Home,
    Store,
    MapPin,
    ArrowLeft
} from "lucide-react";
import MobileBottomNav from "./MobileBottomNav";

// ─── Colors (Translated from React Native constants) ──────────────────────────
const PINK = "#e91e63";
const BG = "#fff1f2"; // Matches the light pinkish background in the image
const TEAL = "#14b8a6";
const RED = "#f43f5e";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const MOCK_BOOKINGS = [
    {
        id: 1,
        customerName: 'Rahul P.',
        service: 'Bridal Makeup',
        specialist: 'Pooja S.',
        date: 'May 13',
        time: '1:00 PM',
        duration: '2 hrs',
        status: 'pending',
        isNew: true,
        amount: 5000,
        totalAmount: 2500,
        initials: 'RP',
        avatar: 'https://i.pravatar.cc/150?u=rahul',
    },
    {
        id: 2,
        customerName: 'Sunil',
        service: 'Hair Cut + Shave',
        specialist: 'Ajay',
        date: 'May 13',
        time: '11:00 AM',
        duration: '1.5 hr',
        status: 'pending',
        isNew: false,
        amount: 900,
        totalAmount: 900,
        initials: 'SU',
        avatar: 'https://i.pravatar.cc/150?u=sunil',
    },
    {
        id: 5,
        customerName: 'Amit K.',
        service: 'Full Grooming',
        serviceSubtitle: '(Haircut, Shave, & Massage)',
        specialist: 'Rohit',
        date: 'May 13',
        time: '10:00 AM',
        duration: '1.5 hrs',
        status: 'pending',
        isNew: false,
        amount: 1500,
        totalAmount: 1500,
        initials: 'AK',
        avatar: 'https://i.pravatar.cc/150?u=amit2',
    },
    {
        id: 7,
        customerName: 'Vikram Singh',
        service: 'Beard Trim',
        specialist: 'Arjun Reddy',
        date: 'May 10',
        time: '3:00 PM',
        duration: '30 min',
        status: 'completed',
        isNew: false,
        amount: 800,
        totalAmount: 800,
        initials: 'VS',
        avatar: 'https://i.pravatar.cc/150?u=vikram',
    },
];

const STATUS_TABS = ['All', 'Ongoing', 'Completed', 'Cancelled'];

// ─── Booking Card Component ───────────────────────────────────────────────────
const BookingCard = ({ booking, onAccept, onDecline, onPress }) => {
    const isPending = booking.status === "pending";

    return (
        <div
            onClick={onPress}
            className="bg-white rounded-[24px] mb-4 p-5 shadow-sm active:scale-[0.98] transition-all cursor-pointer border border-[#fef2f2]"
            style={{ 
                boxShadow: '0 4px 20px rgba(233, 30, 99, 0.05)',
            }}
        >
            {/* Top row: avatar + name/service + NEW badge */}
            <div className="flex items-start gap-4">
                <div className="w-[64px] h-[64px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={booking.avatar} className="w-full h-full object-cover" alt="avatar" />
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold text-[19px] text-gray-800 leading-tight truncate">{booking.customerName}</h1>
                        {booking.isNew && isPending && (
                            <div className="bg-[#fff7ed] px-3 py-1 rounded-full">
                                <span className="text-[11px] font-bold text-[#f97316]">New</span>
                            </div>
                        )}
                    </div>
                    <p className="text-[15px] text-gray-500 mt-1 font-medium">{booking.service}</p>
                    {booking.serviceSubtitle && (
                        <p className="text-[12px] text-gray-400 mt-[1px] leading-tight">{booking.serviceSubtitle}</p>
                    )}

                    {/* Info items in a flex row */}
                    <div className="flex flex-wrap items-center gap-x-4 mt-3">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <Calendar size={14} className="text-gray-300" />
                            <span className="text-[12px] text-gray-400 font-bold whitespace-nowrap">{booking.date}, {booking.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 min-w-0">
                            <UserCircle size={14} className="text-gray-300" />
                            <span className="text-[12px] text-gray-400 font-bold truncate max-w-[80px]">{booking.specialist}</span>
                        </div>
                        <span className="text-[17px] font-black text-gray-800 ml-auto">₹ {booking.amount.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#fff1f2]">
                <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                    <span className="text-[13px]">Total</span>
                    <span className="text-[14px] text-gray-700">₹{booking.totalAmount.toLocaleString()}</span>
                    <span className="mx-1 text-[12px] text-gray-200">|</span>
                    <span className="text-[12px]">{booking.duration}</span>
                </div>

                {isPending ? (
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onAccept(booking.id); }}
                            className="bg-[#14b8a6] text-white px-6 py-2.5 rounded-2xl font-bold text-[13px] active:scale-95 transition-all shadow-lg shadow-teal-100"
                        >
                            Accept
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDecline(booking.id); }}
                            className="bg-[#f43f5e] text-white px-6 py-2.5 rounded-2xl font-bold text-[13px] active:scale-95 transition-all shadow-lg shadow-rose-100"
                        >
                            Decline
                        </button>
                    </div>
                ) : (
                    <div className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        booking.status === 'accepted' ? 'bg-[#f0fdfa] text-[#14b8a6]' 
                        : booking.status === 'completed' ? 'bg-[#eff6ff] text-[#3b82f6]' 
                        : 'bg-[#fff1f2] text-[#f43f5e]'
                    }`}>
                        {booking.status}
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SalonBookingsPage = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState(MOCK_BOOKINGS);
    const [activeTab, setActiveTab] = useState("All");
    const [serviceType, setServiceType] = useState('salon'); // 'salon' | 'home'

    const pendingCount = bookings.filter(b => b.status === "pending").length;

    const handleAccept = (id) => setBookings(p => p.map(b => b.id === id ? { ...b, status: "accepted" } : b));
    const handleDecline = (id) => setBookings(p => p.map(b => b.id === id ? { ...b, status: "declined" } : b));

    const getStatusFilter = (tab) => {
        switch (tab) {
          case 'Ongoing': return ['accepted'];
          case 'Completed': return ['completed'];
          case 'Cancelled': return ['declined'];
          default: return ['pending', 'accepted', 'completed', 'declined'];
        }
    };

    const allowedStatuses = getStatusFilter(activeTab);
    const filtered = bookings.filter(b => allowedStatuses.includes(b.status));

    return (
        <div className="min-h-screen pb-32 font-sans overflow-x-hidden" style={{ backgroundColor: BG }}>
            {/* ── Header ── */}
            <div className="px-5 pt-4 pb-4 mb-2 flex items-center justify-between sticky top-0 bg-[#fff1f2]/80 backdrop-blur-md z-20">
                <button onClick={() => navigate(-1)} className="p-1 -ml-1 active:opacity-70 transition-opacity">
                    <ArrowLeft size={24} color={PINK} strokeWidth={3} />
                </button>
                <h1 className="font-bold text-[18px] text-[#1f2937]">New Booking Requests</h1>
                <div className="relative">
                    <div className="w-[42px] h-[42px] rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm ring-1 ring-pink-100">
                        <img src="https://i.pravatar.cc/150?u=salon_admin_f" className="w-full h-full object-cover" alt="avatar" />
                    </div>
                    <div className="absolute -top-[1px] -right-[1px] w-[20px] h-[20px] rounded-full flex items-center justify-center bg-[#f43f5e] border-2 border-[#fff1f2]">
                        <span className="text-white text-[10px] font-bold">3</span>
                    </div>
                </div>
            </div>

            {/* ── Service Type Toggle (Matches Image 1) ── */}
            <div className="px-4 mb-5">
                <div className="bg-white p-1.5 rounded-[22px] flex gap-1 shadow-sm border border-[#fff1f2]">
                    <button 
                        onClick={() => setServiceType('salon')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[18px] text-[14px] font-bold transition-all ${serviceType === 'salon' ? 'bg-[#fff1f2] text-pink-500 shadow-inner' : 'text-gray-400'}`}
                    >
                        <span className="text-base">?</span> Salon Visit
                    </button>
                    <button 
                        onClick={() => setServiceType('home')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[18px] text-[14px] font-bold transition-all ${serviceType === 'home' ? 'bg-[#fff1f2] text-pink-500 shadow-inner' : 'text-gray-400'}`}
                    >
                        <Home size={18} /> Home Service
                    </button>
                </div>
            </div>

            {/* ── Status Banner (Matches Image 1) ── */}
            <div className="bg-white rounded-[22px] px-6 py-4 mx-4 mb-6 flex items-center gap-3 shadow-sm border border-[#fef2f2]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-amber-50">
                    <Clock size={20} className="text-amber-500" />
                </div>
                <p className="text-[17px] font-bold text-gray-700 flex items-baseline gap-2">
                    <span className="text-[18px] text-gray-900">3</span>
                    <span className="text-gray-500 font-medium">Pending Requests</span>
                </p>
            </div>

            {/* ── Status Tabs — Pill Style (Matches Image 1) ── */}
            <div className="flex gap-2.5 px-4 mb-6 overflow-x-auto no-scrollbar pb-1">
                {STATUS_TABS.map(tab => {
                    const active = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-full font-bold text-[15px] transition-all whitespace-nowrap ${
                                active 
                                ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' 
                                : 'bg-white text-gray-400 border border-gray-50 shadow-sm'
                            }`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>

            {/* ── Booking List ── */}
            <div className="px-4 space-y-1">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white/40 rounded-[40px] border-2 border-dashed border-pink-100/50 mx-4">
                        <div className="w-[84px] h-[84px] rounded-[32px] bg-pink-50/50 flex items-center justify-center mb-5 rotate-12">
                            <Calendar size={38} className="text-[#f48fb1]" />
                        </div>
                        <h3 className="text-[18px] font-black text-slate-800">No active bookings</h3>
                        <p className="text-[14px] text-slate-400 mt-2 font-medium px-10">Nothing in "{activeTab}" filter for today.</p>
                    </div>
                ) : (
                    filtered.map(booking => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            onAccept={handleAccept}
                            onDecline={handleDecline}
                            onPress={() => navigate("/salon-owner/booking-detail", { state: { booking } })}
                        />
                    ))
                )}
            </div>

            <MobileBottomNav />
        </div>
    );
};

export default SalonBookingsPage;

