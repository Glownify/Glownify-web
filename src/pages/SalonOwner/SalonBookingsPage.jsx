import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import toast from "react-hot-toast";

import MobileSalonBookingsPage from "./Mobile/SalonBookingsPage";
import { fetchBookings, updateBookingStatus } from "../../redux/slice/saloonownerSlice";

const PINK = "#e91e63";
const TEAL = "#14b8a6";

const formatTime = (timeStr) => {
    if (!timeStr) return "N/A";
    try {
        const [hours, minutes] = timeStr.split(':');
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    } catch (e) {
        return timeStr;
    }
};

const SalonBookingsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { bookings, loading, pendingCount, totalBookings, totalPages } = useSelector((state) => state.saloonowner);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [activeTab, setActiveTab] = useState("All");
    const [bookingType, setBookingType] = useState("salon"); // 'salon' | 'home'
    const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const statusMap = {
            "Pending": "pending",
            "Confirmed": "confirmed",
            "In Progress": "in_progress",
            "Completed": "completed",
            "Cancelled": "cancelled",
            "No Show": "no_show",
            "Rescheduled": "rescheduled"
        };

        const status = statusMap[activeTab] || "";

        dispatch(fetchBookings({
            status: status,
            bookingType: bookingType === "salon" ? "in_salon" : "home_service",
            page: page,
            limit: 10
        }));
    }, [dispatch, activeTab, bookingType, page]);

    const handleAccept = async (id) => {
        try {
            await dispatch(updateBookingStatus({ bookingId: id, status: 'confirmed' })).unwrap();
            toast.success("Booking confirmed!");
        } catch (error) {
            toast.error(error?.message || "Failed to confirm booking");
        }
    };

    const handleDecline = async (id) => {
        try {
            await dispatch(updateBookingStatus({ bookingId: id, status: 'cancelled' })).unwrap();
            toast.success("Booking cancelled");
        } catch (error) {
            toast.error(error?.message || "Failed to cancel booking");
        }
    };

    const filteredBookings = useMemo(() => {
        if (!searchQuery) return bookings;
        return bookings.filter(b =>
            b.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b._id.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [bookings, searchQuery]);

    const potentialRevenue = useMemo(() => {
        return bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    }, [bookings]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (page > 3) pages.push('...');

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }

            if (page < totalPages - 2) pages.push('...');
            if (!pages.includes(totalPages)) pages.push(totalPages);
        }
        return pages;
    };

    if (isMobile) {
        return <MobileSalonBookingsPage />;
    }

    return (
        <div className="space-y-3 animate-in fade-in duration-500 pb-10 select-none max-w-[1400px] mx-auto">
            {/* ── TOP SECTION: SERVICE TOGGLE ── */}
            <div className="bg-slate-900 p-1.5 rounded-[1.5rem] flex max-w-xs mx-auto shadow-xl">
                <button
                    onClick={() => setBookingType("salon")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all ${bookingType === "salon" ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <Store size={14} /> Salon Visit
                </button>
                <button
                    onClick={() => setBookingType("home")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all ${bookingType === "home" ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <Home size={14} /> Home Service
                </button>
            </div>

            <div className="px-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-2.5 min-w-max md:justify-center justify-start">
                    {["All", "Pending", "Confirmed", "In Progress", "Completed", "Cancelled", "No Show", "Rescheduled"].map(tab => {
                        const active = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-xl font-black text-[12px] uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border ${active ? 'bg-[#E91E63] text-white border-transparent shadow-pink-200 shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'}`}
                            >
                                {tab}
                                {tab === "Pending" && pendingCount > 0 && (
                                    <span className={`ml-1.5 px-2 py-0.5 rounded-lg text-[9px] font-black ${active ? 'bg-white/20' : 'bg-pink-500 text-white'}`}>{pendingCount}</span>
                                )}
                                {tab === "All" && bookings.length > 0 && (
                                    <span className={`ml-1.5 px-2 py-0.5 rounded-lg text-[9px] font-black ${active ? 'bg-white/20' : 'bg-slate-100 text-slate-400'}`}>{bookings.length}</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                {/* ── MAIN CONTENT ── */}
                <div className="flex-1 space-y-3">

                    <div className="flex items-center justify-between px-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white border text-slate-400 hover:text-slate-800'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode("table")}
                                className={`p-2 rounded-xl transition-all ${viewMode === "table" ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white border text-slate-400 hover:text-slate-800'}`}
                            >
                                <ListIcon size={18} />
                            </button>
                        </div>
                        <p className="text-xs font-bold text-slate-400 tracking-wide underline decoration-slate-200 underline-offset-4 decoration-2">
                            {loading ? "Loading..." : `Showing ${filteredBookings.length} requests`}
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-40">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-40 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100 mx-auto max-w-2xl">
                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                                <Inbox className="text-slate-300" size={32} />
                            </div>
                            <h3 className="text-xl font-black text-slate-800">No bookings found</h3>
                            <p className="text-slate-400 font-bold mt-2">Try adjusting your filters or search query.</p>
                        </div>
                    ) : (
                        <div className={viewMode === "grid" ? "grid grid-cols-1 xl:grid-cols-2 gap-8" : "space-y-4"}>
                            {filteredBookings.map(booking => {
                                const status = booking.status?.toLowerCase();
                                const isPending = status === "pending";
                                const avatar = booking.customer?.avatar || `https://i.pravatar.cc/150?u=${booking._id}`;
                                const date = new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

                                return (
                                    <div key={booking._id} onClick={() => navigate("/salon-owner/booking-detail", { state: { booking } })} className="group bg-white border border-slate-100 rounded-[1.5rem] p-4 hover:shadow-lg hover:shadow-pink-500/5 transition-all duration-500 relative cursor-pointer">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <img src={avatar} className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-50/50 shadow-sm group-hover:scale-105 transition-transform" alt={booking.customer?.name} />
                                                    {isPending && <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white shadow-sm ring-1 ring-amber-100" />}
                                                </div>
                                                <div className="space-y-0.5">
                                                    <h4 className="text-base font-black text-slate-800 tracking-tight">{booking.customer?.name || "Guest"}</h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-3.5 rounded-[1.2rem] bg-slate-50/70 border border-slate-100/50 space-y-3 mb-4 group-hover:bg-white transition-colors duration-500">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[13px] font-bold text-slate-700">
                                                    {(() => {
                                                        const item = booking.serviceItems?.[0];
                                                        const svc = item?.service;
                                                        return (typeof svc === 'object' ? svc?.name : svc) || item?.name || "Service";
                                                    })()}
                                                </p>
                                                <p className="text-base font-black text-slate-800">₹{booking.totalAmount}</p>
                                            </div>
                                            <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                                                <span className="flex items-center gap-1"><Calendar size={13} className="text-pink-500" /> {date}</span>
                                                <span className="flex items-center gap-1"><Clock size={13} className="text-purple-400" /> {formatTime(booking.timeSlot?.start)} - {formatTime(booking.timeSlot?.end)}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <User size={14} className="text-slate-300" />
                                                <span className="text-[12px] font-bold text-slate-500">Assigned To: <span className="text-slate-900 border-b border-slate-100 pb-0.5">{booking.specialist?.name || "Unassigned"}</span></span>
                                            </div>

                                            {isPending ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDecline(booking._id); }}
                                                        className="px-6 h-10 rounded-xl bg-rose-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-rose-500/10 hover:bg-rose-600 hover:-translate-y-0.5 transition-all"
                                                    >
                                                        Decline
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleAccept(booking._id); }}
                                                        className="px-6 h-10 rounded-xl bg-teal-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-teal-500/10 hover:bg-teal-600 hover:-translate-y-0.5 transition-all"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[1.5px] flex items-center gap-2.5 shadow-sm ${status === 'accepted' || status === 'confirmed' ? 'bg-teal-50 text-teal-600 ring-1 ring-teal-100' : status === 'completed' ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100' : 'bg-rose-50 text-rose-600 ring-1 ring-rose-100'}`}>
                                                    {status === 'accepted' || status === 'confirmed' ? <CheckCircle size={16} /> : <TrendingUp size={16} />}
                                                    {status}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {/* ── PAGINATION ── */}
                    {totalBookings > 0 && (
                        <div className="mt-6 flex items-center justify-center gap-4">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className={`px-6 py-2.5 rounded-xl border font-black text-[11px] uppercase tracking-widest transition-all ${page === 1 ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed' : 'bg-white text-slate-600 border-slate-200 hover:border-pink-200 hover:text-pink-500 shadow-sm'}`}
                            >
                                Previous
                            </button>

                            <div className="flex items-center gap-2">
                                {totalPages <= 1 ? (
                                    <button className="w-10 h-10 rounded-xl font-black text-sm bg-[#E91E63] text-white shadow-lg shadow-pink-200">
                                        1
                                    </button>
                                ) : (
                                    getPageNumbers().map((num, idx) => (
                                        num === '...' ? (
                                            <span key={`dots-${idx}`} className="px-2 text-slate-300 font-black">...</span>
                                        ) : (
                                            <button
                                                key={num}
                                                onClick={() => handlePageChange(num)}
                                                className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${page === num ? 'bg-[#E91E63] text-white shadow-lg shadow-pink-200' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
                                            >
                                                {num}
                                            </button>
                                        )
                                    ))
                                )}
                            </div>

                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages || totalPages <= 1}
                                className={`px-6 py-2.5 rounded-xl border font-black text-[11px] uppercase tracking-widest transition-all ${(page === totalPages || totalPages <= 1) ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed' : 'bg-white text-slate-600 border-slate-200 hover:border-pink-200 hover:text-pink-500 shadow-sm'}`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalonBookingsPage;
