import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
    ArrowLeft,
    ChevronRight
} from "lucide-react";
import MobileBottomNav from "./MobileBottomNav";
import { fetchBookings, updateBookingStatus } from "../../../redux/slice/saloonownerSlice";
import { toast } from "react-hot-toast";

// ─── Colors ──────────────────────────────────────────────────────────────────
const PINK = "#e91e63";
const BG = "#fff1f2";
const TEAL = "#14b8a6";
const RED = "#f43f5e";

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

const STATUS_TABS = ['All', 'Pending', 'Confirmed', 'Progress', 'Completed', 'Cancelled', 'No Show', 'Rescheduled'];

// ─── Booking Card Component ───────────────────────────────────────────────────
const BookingCard = ({ booking, onAccept, onDecline, onPress }) => {
    // Backend status mapping for UI
    const status = booking.status?.toLowerCase();
    const isPending = status === "pending";

    // Data Extraction 
    const customerName = booking.customer?.name || "Guest";
    const firstItem = booking.serviceItems?.[0];
    const svc = firstItem?.service;
    const serviceName = (typeof svc === 'object' ? svc?.name : svc) || firstItem?.name || "Service";

    const serviceSubtitle = booking.serviceItems?.length > 1 ? `+ ${booking.serviceItems.length - 1} more` : "";
    const specialistName = booking.specialist?.name || "Not Assigned";
    const bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const bookingTime = formatTime(booking.timeSlot?.start);
    const amount = booking.totalAmount || 0;
    const avatar = booking.customer?.avatar || `https://i.pravatar.cc/150?u=${booking._id}`;

    return (
        <div
            onClick={onPress}
            className="bg-white rounded-[24px] mb-4 p-5 shadow-sm active:scale-[0.98] transition-all cursor-pointer border border-[#fef2f2]"
            style={{
                boxShadow: '0 4px 20px rgba(233, 30, 99, 0.05)',
            }}
        >
            <div className="flex items-start gap-4">
                <div className="w-[64px] h-[64px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={avatar} className="w-full h-full object-cover" alt="avatar" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold text-[19px] text-gray-800 leading-tight truncate">{customerName}</h1>
                        {isPending && (
                            <div className="bg-[#fff7ed] px-3 py-1 rounded-full">
                                <span className="text-[11px] font-bold text-[#f97316]">New</span>
                            </div>
                        )}
                    </div>
                    <p className="text-[15px] text-gray-500 mt-1 font-medium">{serviceName}</p>
                    {serviceSubtitle && (
                        <p className="text-[12px] text-gray-400 mt-[1px] leading-tight">{serviceSubtitle}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-4 mt-3">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <Calendar size={14} className="text-gray-300" />
                            <span className="text-[12px] text-gray-400 font-bold whitespace-nowrap">{bookingDate}, {bookingTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 min-w-0">
                            <UserCircle size={14} className="text-gray-300" />
                            <span className="text-[12px] text-gray-400 font-bold truncate max-w-[80px]">{specialistName}</span>
                        </div>
                        <span className="text-[17px] font-black text-gray-800 ml-auto">₹ {amount.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#fff1f2]">
                <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                    <span className="text-[13px]">Total</span>
                    <span className="text-[14px] text-gray-700">₹{amount.toLocaleString()}</span>
                    <span className="mx-1 text-[12px] text-gray-200">|</span>
                    <span className="text-[12px]">{booking.bookingType === 'in_salon' ? 'Salon Visit' : 'Home Service'}</span>
                </div>

                {isPending ? (
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onAccept(booking._id); }}
                            className="bg-[#14b8a6] text-white px-6 py-2.5 rounded-2xl font-bold text-[13px] active:scale-95 transition-all shadow-lg shadow-teal-100"
                        >
                            Accept
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDecline(booking._id); }}
                            className="bg-[#f43f5e] text-white px-6 py-2.5 rounded-2xl font-bold text-[13px] active:scale-95 transition-all shadow-lg shadow-rose-100"
                        >
                            Decline
                        </button>
                    </div>
                ) : (
                    <div className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${status === 'accepted' || status === 'confirmed' ? 'bg-[#f0fdfa] text-[#14b8a6]'
                        : status === 'completed' ? 'bg-[#eff6ff] text-[#3b82f6]'
                            : 'bg-[#fff1f2] text-[#f43f5e]'
                        }`}>
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SalonBookingsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { bookings, loading, pendingCount, totalPages, currentPage } = useSelector((state) => state.saloonowner);

    const [activeTab, setActiveTab] = useState("All");
    const [serviceType, setServiceType] = useState('salon'); // 'salon' | 'home'
    const [page, setPage] = useState(1);

    useEffect(() => {
        const statusMap = {
            "Pending": "pending",
            "Confirmed": "confirmed",
            "Progress": "in_progress",
            "Completed": "completed",
            "Cancelled": "cancelled",
            "No Show": "no_show",
            "Rescheduled": "rescheduled"
        };

        const status = statusMap[activeTab] || "";

        dispatch(fetchBookings({
            status: status,
            bookingType: serviceType === 'salon' ? 'in_salon' : 'home_service',
            page: page,
            limit: 10
        }));
    }, [dispatch, activeTab, serviceType, page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleAccept = async (id) => {
        try {
            await dispatch(updateBookingStatus({ bookingId: id, status: 'confirmed' })).unwrap();
            toast.success("Booking accepted!");
        } catch (error) {
            toast.error(error?.message || "Failed to accept booking");
        }
    };

    const handleDecline = async (id) => {
        try {
            await dispatch(updateBookingStatus({ bookingId: id, status: 'cancelled' })).unwrap();
            toast.success("Booking declined");
        } catch (error) {
            toast.error(error?.message || "Failed to decline booking");
        }
    };

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
                    {pendingCount > 0 && (
                        <div className="absolute -top-[1px] -right-[1px] w-[20px] h-[20px] rounded-full flex items-center justify-center bg-[#f43f5e] border-2 border-[#fff1f2]">
                            <span className="text-white text-[10px] font-bold">{pendingCount}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Service Type Toggle ── */}
            <div className="px-4 mb-5">
                <div className="bg-white p-1.5 rounded-[22px] flex gap-1 shadow-sm border border-[#fff1f2]">
                    <button
                        onClick={() => setServiceType('salon')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[18px] text-[14px] font-bold transition-all ${serviceType === 'salon' ? 'bg-[#fff1f2] text-pink-500 shadow-inner' : 'text-gray-400'}`}
                    >
                        <Store size={18} /> Salon Visit
                    </button>
                    <button
                        onClick={() => setServiceType('home')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[18px] text-[14px] font-bold transition-all ${serviceType === 'home' ? 'bg-[#fff1f2] text-pink-500 shadow-inner' : 'text-gray-400'}`}
                    >
                        <Home size={18} /> Home Service
                    </button>
                </div>
            </div>

            {/* ── Status Banner ── */}
            <div className="bg-white rounded-[22px] px-6 py-4 mx-4 mb-6 flex items-center gap-3 shadow-sm border border-[#fef2f2]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-amber-50">
                    <Clock size={20} className="text-amber-500" />
                </div>
                <p className="text-[17px] font-bold text-gray-700 flex items-baseline gap-2">
                    <span className="text-[18px] text-gray-900">{pendingCount}</span>
                    <span className="text-gray-500 font-medium">Pending Requests</span>
                </p>
            </div>

            {/* ── Status Tabs ── */}
            <div className="flex gap-2.5 px-4 mb-6 overflow-x-auto no-scrollbar pb-1">
                {STATUS_TABS.map(tab => {
                    const active = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-full font-bold text-[15px] transition-all whitespace-nowrap ${active
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
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white/40 rounded-[40px] border-2 border-dashed border-pink-100/50 mx-4">
                        <div className="w-[84px] h-[84px] rounded-[32px] bg-pink-50/50 flex items-center justify-center mb-5 rotate-12">
                            <Calendar size={38} className="text-[#f48fb1]" />
                        </div>
                        <h3 className="text-[18px] font-black text-slate-800">No active bookings</h3>
                        <p className="text-[14px] text-slate-400 mt-2 font-medium px-10">Nothing in "{activeTab}" filter for today.</p>
                    </div>
                ) : (
                    bookings.map(booking => (
                        <BookingCard
                            key={booking._id}
                            booking={booking}
                            onAccept={handleAccept}
                            onDecline={handleDecline}
                            onPress={() => navigate("/salon-owner/booking-detail", { state: { booking } })}
                        />
                    ))
                )}
                {/* ── Dynamic Pagination ── */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-[24px] p-4 mt-6 mb-10 shadow-sm border border-[#fff1f2]">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-[13px] transition-all ${page === 1 ? 'text-gray-300' : 'text-pink-500 active:bg-pink-50'}`}
                        >
                            <ChevronLeft size={18} /> Prev
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-[14px] font-bold text-gray-700">{page}</span>
                            <span className="text-[12px] text-gray-400">of</span>
                            <span className="text-[14px] font-bold text-gray-700">{totalPages}</span>
                        </div>

                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-[13px] transition-all ${page === totalPages ? 'text-gray-300' : 'text-pink-500 active:bg-pink-50'}`}
                        >
                            Next <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            <MobileBottomNav />
        </div>
    );
};

export default SalonBookingsPage;
