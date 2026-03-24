import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, SlidersHorizontal, Calendar, User, Clock, MapPin, Home } from "lucide-react";
import MobileBottomNav from "./MobileBottomNav";

// ─── Colors ────────────────────────────────────────────────────────────────────
const PINK = "#e91e63";
const TEAL = "#14b8a6";
const BG = "#fdf2f8"; // Updated to lighter pink

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const MOCK_BOOKINGS = [
    { id: 1, customerName: "Rahul P.", service: "Bridal Makeup", tier: "PREMIUM SERVICE", specialist: "Pooja S.", date: "May 13, 1:00 PM", status: "pending", type: "salon", amount: 5000, initials: "RP", avatarColor: "#9e9e9e" },
    { id: 2, customerName: "Sunil", service: "Hair Cut + Shave", tier: "REGULAR", specialist: "Ajay", date: "May 13, 11:00 AM", status: "pending", type: "salon", amount: 900, initials: "S", avatarColor: "#fecdd3" },
    { id: 3, customerName: "Amit K.", service: "Full Grooming", tier: "PREMIUM", specialist: "Rohit", date: "May 13, 10:00 AM", status: "pending", type: "home", amount: 1500, initials: "AK", avatarColor: "#9e9e9e" },
    { id: 4, customerName: "Vikram Singh", service: "Beard Trim", tier: "REGULAR", specialist: "Arjun", date: "May 10, 3:00 PM", status: "accepted", type: "home", amount: 800, initials: "VS", avatarColor: "#dbeafe" },
];

const STATUS_TABS = ["All", "Ongoing", "Completed", "Cancelled"];

const getStatusFilter = (tab) => {
    switch (tab) {
        case "Ongoing": return ["accepted"];
        case "Completed": return ["completed"];
        case "Cancelled": return ["declined"];
        default: return ["pending", "accepted", "completed", "declined"];
    }
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ initials, color, size = 52, isNew }) => (
    <div className="relative">
        <div className="rounded-full flex items-center justify-center shrink-0 font-bold"
            style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.3, color: "#fff" }}>
            {initials}
        </div>
    </div>
);

// ─── Booking Card — exact match to screenshot ─────────────────────────────────
const BookingCard = ({ booking, onAccept, onDecline, onPress }) => {
    const isPending = booking.status === "pending";

    const statusCfg = {
        accepted: { bg: "#f0fdf4", color: "#10b981", label: "Accepted" },
        completed: { bg: "#eff6ff", color: "#3b82f6", label: "Completed" },
        declined: { bg: "#fff1f2", color: PINK, label: "Declined" },
    }[booking.status];

    return (
        <div
            onClick={onPress}
            className="bg-white rounded-[24px] mb-4 overflow-hidden cursor-pointer p-4 pb-5 shadow-sm"
        >
            {/* ── Top section ── */}
            <div className="flex items-start gap-4 mb-2">
                <img src={`https://i.pravatar.cc/150?u=${booking.id}`} className="w-14 h-14 rounded-full object-cover" alt="avatar" />
                <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-[18px] text-gray-800 leading-tight">{booking.customerName}</p>
                        {isPending && <span className="bg-[#ffedd5] text-[#d97706] text-[11px] font-bold px-3 py-0.5 rounded-full">New</span>}
                    </div>
                    <p className="text-[14px] text-gray-500 mt-1">{booking.service}</p>
                    {booking.service.includes("Grooming") && <p className="text-[12px] text-gray-400 mt-0.5">(Haircut, Shave, &amp; Massage)</p>}
                </div>
            </div>

            {/* Row 2: Date & Time + Provider */}
            <div className="flex items-center justify-between text-gray-500 mt-4 mb-5 ml-[72px]">
                <div className="flex items-center gap-1.5">
                    <Calendar size={13} color="#9ca3af" />
                    <p className="text-[12.5px]">{booking.date}</p>
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                    <User size={13} color="#9ca3af" />
                    <p className="text-[12.5px]">{booking.specialist}</p>
                </div>
                <p className="font-extrabold text-[17px] text-gray-900 ml-auto">₹ {booking.amount.toLocaleString("en-IN")}</p>
            </div>

            {/* ── Divider + Actions ── */}
            <div className="border-t border-gray-100 flex items-center justify-between pt-4 mt-1">
                <div className="flex items-center gap-1.5">
                    <span className="text-[13px] text-gray-400">Total</span>
                    <span className="text-[15px] font-bold text-gray-700">₹{(booking.amount).toLocaleString("en-IN")}</span>
                    <span className="text-[12px] text-gray-300 mx-1">|</span>
                    <span className="text-[12px] text-gray-400">2 hrs</span>
                </div>
                {isPending ? (
                    <div className="flex gap-2.5">
                        <button
                            onClick={(e) => { e.stopPropagation(); onAccept(booking.id); }}
                            className="px-5 py-2 rounded-full font-bold text-[14px] text-white transition-all shadow-sm"
                            style={{ backgroundColor: TEAL }}
                        >
                            Accept
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDecline(booking.id); }}
                            className="px-5 py-2 rounded-full font-bold text-[14px] text-white transition-all shadow-sm"
                            style={{ backgroundColor: "#ef4444" }}
                        >
                            Decline
                        </button>
                    </div>
                ) : (
                    <div>
                        <span className="inline-flex text-[12px] font-bold px-3 py-1.5 rounded-full"
                            style={{ backgroundColor: statusCfg?.bg, color: statusCfg?.color }}>
                            {statusCfg?.label ?? booking.status}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Animated Type Toggle ─────────────────────────────────────────────────────
const TypeToggle = ({ value, onChange }) => {
    const OPTS = [
        { key: "salon", icon: MapPin, label: "Salon Visit" },
        { key: "home", icon: Home, label: "Home Service" },
    ];

    return (
        <div className="flex bg-white rounded-full border border-gray-100 p-1 mx-4 relative mb-4 shadow-sm">
            {OPTS.map((opt) => {
                const active = value === opt.key;
                const IconComponent = opt.icon;
                return (
                    <button
                        key={opt.key}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 z-10 transition-colors rounded-full ${active ? "bg-[#ffe4e6]" : ""}`}
                        onClick={() => onChange(opt.key)}
                    >
                         <IconComponent size={15} color={active ? PINK : "#9ca3af"} />
                         <span className={`text-[15px] font-bold ${active ? "text-pink-600" : "text-gray-400"}`}>
                            {opt.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SalonBookingsPage = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState(MOCK_BOOKINGS);
    const [activeTab, setActiveTab] = useState("All");
    const [bookingType, setBookingType] = useState("salon");

    const pendingCount = bookings.filter((b) => b.status === "pending" && b.type === bookingType).length;
    const allowedStatuses = getStatusFilter(activeTab);
    const filtered = bookings.filter((b) => {
        const statusMatch = allowedStatuses.includes(b.status);
        const typeMatch = b.type === bookingType;
        return statusMatch && typeMatch;
    });

    const handleAccept = (id) => setBookings((p) => p.map((b) => b.id === id ? { ...b, status: "accepted" } : b));
    const handleDecline = (id) => setBookings((p) => p.map((b) => b.id === id ? { ...b, status: "declined" } : b));

    return (
        <div className="min-h-screen pb-28" style={{ backgroundColor: BG }}>

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 pt-5 pb-3">
                <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
                    <ChevronLeft size={26} color={PINK} />
                </button>
                <p className="font-bold text-[17px] text-gray-900">New Booking Requests</p>
                {/* Avatar + badge */}
                <div className="relative">
                    <img src="https://i.pravatar.cc/150?img=11" alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                    <div className="absolute -top-0.5 -right-0.5 w-[17px] h-[17px] rounded-full flex items-center justify-center border-2"
                        style={{ backgroundColor: PINK, borderColor: BG }}>
                        <span className="text-white text-[9px] font-bold">3</span>
                    </div>
                </div>
            </div>

            {/* ── Service Type Toggle ── */}
            <TypeToggle value={bookingType} onChange={setBookingType} />

            {/* ── Pending Count Card (Simple style matching new image) ── */}
            <div className="mx-4 mb-5 rounded-2xl px-5 py-3 flex items-center bg-white shadow-sm border border-gray-100 gap-2">
                <div className="w-6 h-6 flex items-center justify-center">
                    <Clock size={18} color="#f59e0b" />
                </div>
                <p className="text-[15px] font-medium text-gray-700">
                     <span className="font-extrabold text-gray-900">{pendingCount}</span> Pending Requests
                </p>
            </div>

            {/* ── Status Tabs — Pill Style ── */}
            <div className="flex px-4 mb-6 gap-2 overflow-x-auto scrollbar-hide py-1">
                {STATUS_TABS.map((tab) => {
                    const active = activeTab === tab;
                    return (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full text-[14px] font-bold transition-all whitespace-nowrap`}
                            style={active
                                ? { backgroundColor: "#fb7185", color: "#fff", boxShadow: "0 2px 8px rgba(251, 113, 133, 0.4)" }
                                : { backgroundColor: "#fff", color: "#9ca3af", border: "1px solid #e5e7eb" }}>
                            {tab}
                        </button>
                    );
                })}
            </div>

            {/* ── Booking List ── */}
            <div className="px-4">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20 gap-3">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fce7f3" }}>
                            <Calendar size={28} color="#f48fb1" />
                        </div>
                        <p className="font-bold text-[16px] text-gray-700">No bookings here</p>
                        <p className="text-[13px] text-gray-400">Nothing in "{activeTab}" yet</p>
                    </div>
                ) : (
                    filtered.map((booking) => (
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
}

export default SalonBookingsPage;
