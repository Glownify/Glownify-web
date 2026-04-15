import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDashboardData } from "../../redux/slice/superadminSlice";
import {
    Plus, Users, Store, CreditCard, Calendar, Clock,
    Gift, FileText, Share2, BookOpen, ChevronRight,
    Bell, Check, X, Star, Briefcase
} from "lucide-react";

import { MOCK_BOOKINGS, MOCK_REVIEWS } from "../../utils/constants";
import Avatar from "../../components/common/Avatar";

// ─── Colors ────────────────────────────────────────────────────────────────────
const PINK = "#e91e63";
const BG = "#fce4ec";

// ─── Booking Card — exact match to dashboard screenshot ────────────────────────
const BookingCard = ({ booking, onAccept, onDecline }) => {
    const isPending = booking.status === "pending";
    const initials = booking.customerName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    return (
        <div className="bg-white rounded-2xl mb-3 overflow-hidden"
            style={{ boxShadow: "0 2px 12px rgba(244,63,94,0.10)" }}>
            {/* Top row: avatar + name/service + amount */}
            <div className="flex items-start gap-3 p-4 pb-2">
                <Avatar src={booking.avatar} initials={initials} size={52} />
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-[16px] text-gray-900">{booking.customerName}</p>
                    <p className="text-[13px] text-gray-500 mt-0.5">{booking.service} • {booking.duration}</p>
                </div>
                <p className="font-extrabold text-[17px] text-gray-900 shrink-0">
                    ₹ {booking.amount.toLocaleString("en-IN")}
                </p>
            </div>

            {/* Divider */}
            <div className="mx-4" style={{ height: 1, backgroundColor: "#f3f4f6" }} />

            {/* Bottom row: date + action buttons */}
            <div className="flex items-center justify-between px-4 py-3">
                <p className="text-[13px] text-gray-400">{booking.date}</p>
                {isPending ? (
                    <div className="flex gap-2">
                        <button onClick={() => onAccept(booking.id)}
                            className="px-5 py-2 rounded-xl text-white text-[13px] font-bold"
                            style={{ backgroundColor: "#16a34a" }}>Accept</button>
                        <button onClick={() => onDecline(booking.id)}
                            className="px-5 py-2 rounded-xl text-white text-[13px] font-bold"
                            style={{ backgroundColor: PINK }}>Decline</button>
                    </div>
                ) : (
                    <span className="text-[12px] font-bold px-3 py-1 rounded-full"
                        style={booking.status === "accepted"
                            ? { backgroundColor: "#d1fae5", color: "#059669" }
                            : { backgroundColor: "#fff1f2", color: PINK }}>
                        {booking.status}
                    </span>
                )}
            </div>
        </div>
    );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const MobileSuperAdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dashboardData } = useSelector((state) => state.superadmin);
    const { user } = useSelector((state) => state.auth);

    const [bookings, setBookings] = useState(MOCK_BOOKINGS);
    useEffect(() => { dispatch(fetchDashboardData()); }, [dispatch]);

    const handleAccept = (id) => setBookings((p) => p.map((b) => b.id === id ? { ...b, status: "accepted" } : b));
    const handleDecline = (id) => setBookings((p) => p.map((b) => b.id === id ? { ...b, status: "declined" } : b));

    const summary = dashboardData || {};

    // Stat data
    const STATS = [
        { icon: <Store size={18} />, label: "Salons", value: summary.activeSalons ?? "842" },
        { icon: <Users size={18} />, label: "Users", value: summary.totalUsers ? (summary.totalUsers / 1000).toFixed(1) + "k" : "128k" },
        { icon: <CreditCard size={18} />, label: "MRR", value: summary.revenue ? "$" + (summary.revenue / 1000).toFixed(0) + "k" : "$142k" },
    ];

    // Quick actions
    const QUICK_ACTIONS = [
        { icon: Store, label: "Verify Salons", iconColor: "#e11d48", bg: "#fff1f2", route: "/super-admin/manage-salons" },
        { icon: Users, label: "User Hub", iconColor: "#0f172a", bg: "#f8fafc", route: "/super-admin/manage-users" },
        { icon: Briefcase, label: "Execs", iconColor: "#2563eb", bg: "#eff6ff", route: "/super-admin/manage-sales-executives" },
        { icon: CreditCard, label: "Finance", iconColor: "#059669", bg: "#f0fdf4", route: "/super-admin/manage-finance" },
    ];

    const adminInitials = user?.name
        ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : "AD";

    return (
        <div className="min-h-screen pb-24 bg-[#F8FAFC] font-sans">

            {/* ── Header ── */}
            <div className="bg-white px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-sm border-b border-slate-100">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em]">Platform Pulse</span>
                      <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-1">
                          Exec Overview
                      </h1>
                   </div>
                   <button onClick={() => navigate("/super-admin/profile")} className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-slate-200">
                      {adminInitials}
                   </button>
                </div>

                {/* Main Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                   {STATS.map((stat, i) => (
                      <div key={i} className="flex flex-col gap-1">
                         <div className="flex items-center gap-1.5 text-slate-400">
                            {stat.icon}
                            <span className="text-[9px] font-black uppercase tracking-widest leading-none">{stat.label}</span>
                         </div>
                         <p className="text-xl font-black text-slate-800">{stat.value}</p>
                      </div>
                   ))}
                </div>
            </div>

            <div className="px-6 -mt-6">
                {/* ── Quick Actions ── */}
                <div className="grid grid-cols-4 gap-3">
                    {QUICK_ACTIONS.map((action) => {
                        const Icon = action.icon;
                        return (
                            <button key={action.label}
                                onClick={() => action.route && navigate(action.route)}
                                className="flex flex-col items-center justify-center gap-2 rounded-2xl py-5 shadow-sm border border-white transition-all active:scale-95 bg-white"
                            >
                                <div className="p-3 rounded-xl" style={{ backgroundColor: action.bg }}>
                                   <Icon size={20} color={action.iconColor} />
                                </div>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter text-center">{action.label}</p>
                            </button>
                        );
                    })}
                </div>

                {/* ── System Alerts ── */}
                <div className="mt-8 space-y-4">
                   <div className="flex items-center justify-between px-1">
                      <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">System Alerts</h2>
                      <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[9px] font-black rounded uppercase">3 Urgent</span>
                   </div>

                   <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group active:bg-slate-50 transition-colors" onClick={() => navigate("/super-admin/manage-salons")}>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                            <Store size={20} />
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[13px] font-black text-slate-800">12 Salons Pending</span>
                            <span className="text-[10px] font-bold text-slate-400">Identity verification required</span>
                         </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                   </div>

                   <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group active:bg-slate-50 transition-colors" onClick={() => navigate("/super-admin/manage-finance")}>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <CreditCard size={20} />
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[13px] font-black text-slate-800">Payout Batch Ready</span>
                            <span className="text-[10px] font-bold text-slate-400">Total volume: $42.5k</span>
                         </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                   </div>
                </div>

                {/* ── Recent Activity ── */}
                <div className="mt-10">
                    <p className="font-black text-[14px] text-slate-800 uppercase tracking-widest px-1 mb-4">Recent Bookings</p>
                    {bookings.slice(0, 3).map((b) => (
                        <BookingCard key={b.id} booking={b} onAccept={handleAccept} onDecline={handleDecline} />
                    ))}
                </div>


                {/* ── Recent Reviews ── */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <p className="font-bold text-[18px] text-gray-900">Recent Reviews</p>
                        <button className="flex items-center gap-0.5">
                            <span className="text-[14px] font-semibold" style={{ color: PINK }}>Recent Reviews</span>
                            <ChevronRight size={16} color={PINK} />
                        </button>
                    </div>

                    {MOCK_REVIEWS.map((review) => (
                        <div key={review.id} className="bg-white rounded-2xl p-4"
                            style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                            <div className="flex items-start gap-3">
                                {/* Avatar */}
                                <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-bold text-[14px]"
                                    style={{ backgroundColor: review.avatarColor, color: "#9f1239" }}>
                                    {review.initials}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-[15px] text-gray-900">{review.name}</p>
                                            {/* Stars */}
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <Star key={i} size={11} fill={i <= review.rating ? "#fbbf24" : "none"}
                                                        color={i <= review.rating ? "#fbbf24" : "#d1d5db"} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <p className="text-[12px] text-gray-400">{review.date}</p>
                                            <ChevronRight size={14} color="#9ca3af" />
                                        </div>
                                    </div>
                                    <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">{review.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MobileSuperAdminDashboard;
