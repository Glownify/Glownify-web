import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
    ChevronLeft, 
    MoreVertical, 
    Calendar, 
    MessageCircle, 
    RefreshCw, 
    Receipt, 
    Pencil, 
    Phone,
    Check,
    MessageSquare,
    EllipsisVertical,
    ArrowLeft
} from "lucide-react";

// ─── Colors ────────────────────────────────────────────────────────────────────
const PINK = "#f43f5e";
const TEAL = "#14b8a6";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const DEFAULT_BOOKING = {
    id: 1,
    customerName: 'Ayesha',
    service: 'Waxing + Facial',
    status: 'completed', // pending | accepted | completed | cancelled
    date: 'May 13, 2024',
    timeStart: '12:00 PM',
    timeEnd: '1:30 PM',
    duration: '90 mins',
    specialist: {
        name: 'Priya',
        role: 'Assigned Professional',
        initials: 'PR',
        avatarColor: '#fecdd3',
    },
    services: [
        { id: 1, name: 'Full Arm Waxing', price: 600 },
        { id: 2, name: 'Leg Waxing', price: 700 },
        { id: 3, name: 'Acne Facial', price: 500 },
    ],
    notes: '"Client preferred organic wax for arms. No allergies reported during facial session. Very satisfied with the glow."',
    initials: 'AY',
    avatarColor: '#fecdd3',
};

const STATUS_CONFIG = {
    completed: { label: 'COMPLETED', bg: '#f0fdf4', text: '#10b981' },
    accepted: { label: 'ACCEPTED', bg: '#f0fdf4', text: '#10b981' },
    pending: { label: 'PENDING', bg: '#fffbeb', text: '#f59e0b' },
    cancelled: { label: 'CANCELLED', bg: '#fff1f2', text: '#f43f5e' },
};

// ─── Avatar Component ─────────────────────────────────────────────────────────
const Avatar = ({ initials, color, size = 72 }) => (
    <div 
        className="rounded-full flex items-center justify-center shrink-0 font-bold"
        style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.32, color: '#9f1239' }}
    >
        {initials}
    </div>
);

// ─── Section Label ────────────────────────────────────────────────────────────
const SectionLabel = ({ title, action, onAction }) => (
    <div className="flex justify-between items-center mb-4">
        <p className="text-[11px] font-bold text-[#9ca3af] tracking-[1.4px] uppercase">{title}</p>
        {action && (
            <button onClick={onAction} className="flex items-center gap-1.5 focus:outline-none">
                <Pencil size={13} color="#14b8a6" strokeWidth={3} />
                <span className="text-[#14b8a6] font-bold text-[13px]">{action}</span>
            </button>
        )}
    </div>
);

// ─── Main Content ─────────────────────────────────────────────────────────────
const BookingDetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Merge navigation state with default mock
    const booking = location.state?.booking ? { ...DEFAULT_BOOKING, ...location.state.booking } : DEFAULT_BOOKING;
    const [notes] = useState(booking.notes);

    const statusCfg = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending;
    const grandTotal = booking.services.reduce((sum, s) => sum + s.price, 0);

    return (
        <div className="min-h-screen bg-white pb-40 font-sans select-none">
            {/* ── Top Nav ── */}
            <div className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-20 border-b border-[#f3f4f6]">
                <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f9fafb] active:scale-90 transition-transform">
                    <ArrowLeft size={20} className="text-[#1f2937]" />
                </button>
                <p className="font-bold text-[17px] text-[#1f2937]">Booking Details</p>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f9fafb]">
                    <EllipsisVertical size={20} className="text-[#1f2937]" />
                </button>
            </div>

            <div className="overflow-y-auto no-scrollbar">
                {/* ── Customer Hero ── */}
                <div className="px-5 pt-6 pb-6 flex items-center gap-4">
                    <div className="relative">
                        <Avatar initials={booking.initials} color={booking.avatarColor} size={72} />
                        {booking.status === 'completed' && (
                            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#14b8a6] flex items-center justify-center border-2 border-white">
                                <Check size={14} color="#fff" strokeWidth={3} />
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <h1 className="font-bold text-[24px] text-[#1f2937] leading-tight">{booking.customerName}</h1>
                        <p className="text-[#6b7280] text-[14px] mt-0.5 font-medium">{booking.service}</p>
                    </div>
                    <div className="rounded-full px-3 py-1.5 shrink-0" style={{ backgroundColor: statusCfg.bg }}>
                        <span className="text-[11px] font-bold tracking-wider" style={{ color: statusCfg.text }}>{statusCfg.label}</span>
                    </div>
                </div>

                {/* ── Booking Information Card ── */}
                <div className="mx-4 rounded-[24px] p-5 mb-4 bg-white border border-[#f3f4f6]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <SectionLabel title="BOOKING INFORMATION" />
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#fff1f2] shrink-0">
                            <Calendar size={22} color="#f43f5e" />
                        </div>
                        <div>
                            <p className="font-bold text-[16px] text-[#1f2937]">{booking.date}</p>
                            <p className="text-[#9ca3af] text-[13px] mt-0.5 font-medium">{booking.timeStart} – {booking.timeEnd} ({booking.duration})</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-[#f9fafb]">
                        <Avatar initials={booking.specialist.initials} color={booking.specialist.avatarColor} size={44} />
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-[14px] text-[#1f2937] truncate">{booking.specialist.name}</p>
                            <p className="text-[#9ca3af] text-[12px] mt-0.5 font-medium">{booking.specialist.role}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#14b8a6]">
                            <MessageSquare size={16} color="#fff" fill="white" />
                        </div>
                    </div>
                </div>

                {/* ── Service Summary Card ── */}
                <div className="mx-4 rounded-[24px] p-5 mb-4 bg-white border border-[#f3f4f6]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <SectionLabel title="SERVICE SUMMARY" />
                    <div className="space-y-0">
                        {booking.services.map((service, idx) => (
                            <React.Fragment key={service.id}>
                                <div className="flex justify-between items-center py-3">
                                    <p className="text-[#374151] text-[15px] font-medium">{service.name}</p>
                                    <p className="font-bold text-[#1f2937] text-[15px]">₹{service.price.toLocaleString("en-IN")}</p>
                                </div>
                                {idx < booking.services.length - 1 && <div className="h-px bg-[#f3f4f6]" />}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="h-[1.5px] bg-[#e5e7eb] my-3" />
                    <div className="flex justify-between items-center">
                        <p className="font-bold text-[17px] text-[#1f2937]">Grand Total</p>
                        <p className="font-black text-[22px] text-[#f43f5e]">₹{grandTotal.toLocaleString("en-IN")}</p>
                    </div>
                </div>

                {/* ── Additional Notes ── */}
                <div className="mx-4 mb-6">
                    <SectionLabel title="ADDITIONAL NOTES" action="Edit" />
                    <div className="rounded-2xl p-4 bg-[#f0fdfa] border border-[#99f6e4]">
                        <p className="text-[#374151] text-[14px] leading-relaxed italic font-medium">{notes}</p>
                    </div>
                </div>

                {/* ── Quick Actions Row ── */}
                <div className="flex mx-4 mb-6 rounded-[24px] bg-white border border-[#f3f4f6]" style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                    {[
                        { icon: Phone, label: 'Call', color: '#f43f5e', bg: '#fef2f2' },
                        { icon: MessageCircle, label: 'Message', color: '#14b8a6', bg: '#f1fcf9' },
                        { icon: Calendar, label: 'Reschedule', color: '#6b7280', bg: '#f9fafb' }
                    ].map((btn, idx, arr) => (
                        <button 
                            key={btn.label}
                            className="flex-1 flex flex-col items-center justify-center py-4 active:bg-gray-50 transition-colors"
                            style={{ borderRight: idx < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                        >
                            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1.5" style={{ backgroundColor: btn.bg }}>
                                <btn.icon size={20} color={btn.color} />
                            </div>
                            <span className="text-[#374151] text-[12px] font-bold tracking-tight">{btn.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Bottom CTA Bar ── */}
            <div className="fixed bottom-0 left-0 right-0 bg-white px-4 pb-8 pt-4 flex gap-3 border-t border-[#f3f4f6]" style={{ boxShadow: '0 -4px 12px rgba(0,0,0,0.08)' }}>
                <button 
                    onClick={() => navigate(-1)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-full py-4 font-bold text-[15px] border-2 border-[#f43f5e] text-[#f43f5e] bg-white active:scale-95 transition-transform"
                >
                    <RefreshCw size={18} /> Rebook
                </button>
                <button 
                    onClick={() => navigate("/salon-owner/billing-detail")}
                    className="flex-[2] flex items-center justify-center gap-2 rounded-full py-4 font-bold text-[15px] bg-[#f43f5e] text-white active:shadow-inner active:scale-95 transition-all shadow-lg shadow-pink-200"
                >
                    <Receipt size={18} /> Create Bill
                </button>
            </div>
        </div>
    );
};

export default BookingDetailPage;
