import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Calendar, 
  User, 
  Clock, 
  MapPin, 
  Home, 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  CheckCircle,
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Inbox,
  LayoutGrid,
  List as ListIcon,
  Store
} from "lucide-react";

import MobileSalonBookingsPage from "./Mobile/SalonBookingsPage";

const PINK = "#e91e63";
const TEAL = "#14b8a6";

const MOCK_BOOKINGS = [
    { id: 1, customerName: "Rahul P.", service: "Bridal Makeup", tier: "PREMIUM SERVICE", specialist: "Pooja S.", date: "May 13", time: "1:00 PM", status: "pending", type: "salon", amount: 5000, duration: "2 hrs", initials: "RP", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, customerName: "Ayesha Khan", service: "Waxing + Facial", tier: "REGULAR", specialist: "Priya D.", date: "May 13", time: "12:00 PM", status: "pending", type: "salon", amount: 1800, duration: "1.5 hrs", initials: "AK", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, customerName: "Mehak Sharma", service: "Spa Manicure", tier: "REGULAR", specialist: "Pooja S.", date: "May 13", time: "10:30 AM", status: "accepted", type: "salon", amount: 600, duration: "1 hr", initials: "MS", avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 4, customerName: "Sunil Verma", service: "Hair Cut + Shave", tier: "REGULAR", specialist: "Ajay K.", date: "May 13", time: "11:00 AM", status: "pending", type: "home", amount: 900, duration: "45 min", initials: "SV", avatar: "https://i.pravatar.cc/150?u=3" },
];

const SalonBookingsPage = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    
    // Desktop View States
    const [bookings, setBookings] = useState(MOCK_BOOKINGS);
    const [activeTab, setActiveTab] = useState("All");
    const [bookingType, setBookingType] = useState("salon"); // 'salon' | 'home'
    const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile) {
        return <MobileSalonBookingsPage />;
    }

    const handleAccept = (id) => setBookings(p => p.map(b => b.id === id ? { ...b, status: "accepted" } : b));
    const handleDecline = (id) => setBookings(p => p.map(b => b.id === id ? { ...b, status: "declined" } : b));

    const pendingCount = bookings.filter(b => b.status === "pending" && b.type === bookingType).length;
    
    const filteredBookings = bookings.filter(b => {
        const typeMatch = b.type === bookingType;
        const statusMatch = activeTab === "All" || b.status === activeTab.toLowerCase();
        return typeMatch && statusMatch;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20 select-none">
            {/* ── HEADER & SEARCH ── */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-sm ring-1 ring-black/5">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Booking Gateway</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <TrendingUp size={14} className="text-pink-500" /> +14% requests this week
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find a customer..." 
                            className="bg-white border-2 border-slate-100 rounded-2xl py-4 pl-14 pr-6 w-96 focus:border-pink-200 outline-none transition-all font-bold text-slate-700"
                        />
                    </div>
                    <button className="p-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-slate-800 transition-all">
                        <Filter size={20} />
                    </button>
                    <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all">
                        Create New +
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* ── LEFT SIDEBAR: Stats & Quick Filters ── */}
                <div className="lg:col-span-3 space-y-8">
                    
                    {/* TYPE TOGGLE (Matches Image 2 Controls) */}
                    <div className="bg-slate-900 p-2.5 rounded-[2.5rem] flex gap-1.5 shadow-2xl">
                        <button 
                            onClick={() => setBookingType("salon")}
                            className={`flex-1 flex items-center justify-center gap-2.5 py-4.5 rounded-[1.8rem] text-[11px] font-black uppercase tracking-widest transition-all ${bookingType === "salon" ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Store size={15} /> Salon
                        </button>
                        <button 
                            onClick={() => setBookingType("home")}
                            className={`flex-1 flex items-center justify-center gap-2.5 py-4.5 rounded-[1.8rem] text-[11px] font-black uppercase tracking-widest transition-all ${bookingType === "home" ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Home size={15} /> Home
                        </button>
                    </div>

                    {/* STATUS FILTER PANEL (Matches Image 2) */}
                    <div className="bg-white rounded-[2.5rem] p-8 space-y-6 shadow-sm border border-slate-50">
                        <h4 className="text-[11px] font-black text-slate-300 uppercase tracking-[2px] px-2">Filter Status</h4>
                        <div className="space-y-1.5">
                            {["All", "Pending", "Accepted", "Completed", "Cancelled"].map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-[15px] transition-all ${activeTab === tab ? 'bg-pink-50/50 text-[#E91E63]' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    {tab}
                                    {tab === "Pending" && pendingCount > 0 && (
                                        <span className="bg-[#E91E63] text-white px-2.5 py-0.5 rounded-lg text-[10px] font-black">{pendingCount}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* REVENUE CARD (Matches Image 2) */}
                    <div className="bg-gradient-to-br from-[#ff0080] to-[#E91E63] rounded-[2.5rem] p-9 text-white shadow-2xl shadow-pink-500/30 relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                        <div className="flex items-center justify-between mb-8 relative z-10">
                             <div className="p-4 bg-white/20 rounded-[20px] backdrop-blur-md border border-white/20 shadow-inner"><Calendar size={22} strokeWidth={2.5} /></div>
                             <button className="text-white/60 hover:text-white transition-colors"><Download size={20} /></button>
                        </div>
                        <h3 className="text-5xl font-black mb-2.5 relative z-10 tracking-tight">₹18,420</h3>
                        <p className="text-[11px] font-black uppercase tracking-[1.5px] text-white/80 relative z-10">Potential Revenue This Week</p>
                    </div>
                </div>

                {/* ── RIGHT PANEL: Main Grid/List ── */}
                <div className="lg:col-span-9 space-y-8">
                    
                    {/* VIEW CONTROLS */}
                    <div className="flex items-center justify-between px-6">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setViewMode("grid")}
                                className={`p-3 rounded-2xl transition-all ${viewMode === "grid" ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-white border-2 border-slate-50 text-slate-400 hover:text-slate-800'}`}
                            >
                                <LayoutGrid size={20} />
                            </button>
                            <button 
                                onClick={() => setViewMode("table")}
                                className={`p-3 rounded-2xl transition-all ${viewMode === "table" ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-white border-2 border-slate-50 text-slate-400 hover:text-slate-800'}`}
                            >
                                <ListIcon size={20} />
                            </button>
                        </div>
                        <p className="text-sm font-bold text-slate-400 tracking-wide underline decoration-slate-200 underline-offset-8 decoration-2">Showing {filteredBookings.length} requests</p>
                    </div>

                    {/* BOOKING GRID (Matches Image 2) */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {filteredBookings.map(booking => (
                            <div key={booking.id} className="group bg-white border border-slate-100 rounded-[3.5rem] p-9 hover:shadow-2xl hover:shadow-pink-500/5 transition-all duration-500 relative">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-center gap-5">
                                        <div className="relative">
                                            <img src={booking.avatar} className="w-20 h-20 rounded-[2rem] object-cover ring-[6px] ring-slate-50/50 shadow-md group-hover:scale-105 transition-transform" alt={booking.customerName} />
                                            {booking.status === "pending" && <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-amber-400 rounded-full border-[5px] border-white shadow-sm ring-1 ring-amber-100" />}
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xl font-black text-slate-800 tracking-tight">{booking.customerName}</h4>
                                            <div className="flex">
                                                <p className="text-[10px] font-black text-[#E91E63] uppercase tracking-widest px-3.5 py-1.5 bg-pink-50/50 rounded-xl border border-pink-100/30">{booking.tier}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-3 text-slate-300 hover:text-slate-800 hover:bg-slate-50 rounded-2xl transition-all"><MoreHorizontal size={24} /></button>
                                </div>

                                <div className="p-8 rounded-[2.5rem] bg-slate-50/70 border border-slate-100/50 space-y-5 mb-10 group-hover:bg-white transition-colors duration-500">
                                    <div className="flex items-center justify-between">
                                        <p className="text-base font-bold text-slate-700">{booking.service}</p>
                                        <p className="text-xl font-black text-slate-800">₹{booking.amount}</p>
                                    </div>
                                    <div className="flex items-center gap-6 text-[12px] font-bold text-slate-400">
                                        <span className="flex items-center gap-2"><Calendar size={16} className="text-pink-500" /> {booking.date}</span>
                                        <span className="flex items-center gap-2"><Clock size={16} className="text-purple-400" /> {booking.time} ({booking.duration})</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <User size={16} className="text-slate-300" />
                                        <span className="text-[13px] font-bold text-slate-500">Assigned To: <span className="text-slate-900 border-b-2 border-slate-100 pb-0.5">{booking.specialist}</span></span>
                                    </div>

                                    {booking.status === "pending" ? (
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => handleDecline(booking.id)}
                                                className="px-8 h-12 rounded-2xl bg-rose-500 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:bg-rose-600 hover:-translate-y-1 transition-all"
                                            >
                                                Decline
                                            </button>
                                            <button 
                                                onClick={() => handleAccept(booking.id)}
                                                className="px-8 h-12 rounded-2xl bg-teal-500 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-teal-500/20 hover:bg-teal-600 hover:-translate-y-1 transition-all"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[1.5px] flex items-center gap-2.5 shadow-sm ${booking.status === 'accepted' ? 'bg-teal-50 text-teal-600 ring-1 ring-teal-100' : 'bg-blue-50 text-blue-600 ring-1 ring-blue-100'}`}>
                                            {booking.status === 'accepted' ? <CheckCircle size={16} /> : <TrendingUp size={16} />}
                                            {booking.status}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalonBookingsPage;
