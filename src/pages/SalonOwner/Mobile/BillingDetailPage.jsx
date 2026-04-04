import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    ChevronLeft, 
    MoreVertical, 
    Printer, 
    Share2, 
    Plus, 
    Minus, 
    Trash2, 
    Calendar, 
    Scissors, 
    Leaf, 
    Smile,
    ArrowLeft,
    EllipsisVertical
} from "lucide-react";

// ─── Colors ────────────────────────────────────────────────────────────────────
const PINK = "#f43f5e";
const TEAL = "#14b8a6";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const INITIAL_SERVICES = [
    { id: 1, name: 'Full Arm Waxing', price: 600, qty: 1, icon: Scissors, iconColor: '#f43f5e', iconBg: '#fff1f2' },
    { id: 2, name: 'Leg Waxing',      price: 700, qty: 1, icon: Leaf,     iconColor: '#f43f5e', iconBg: '#fff1f2' },
    { id: 3, name: 'Acne Facial',     price: 500, qty: 1, icon: Smile,    iconColor: '#f43f5e', iconBg: '#fff1f2' },
];

const TIP_OPTIONS = [20, 50, 100, 200];
const DISCOUNT_LABEL = 'First Visit';
const DISCOUNT_AMOUNT = 280;

const CUSTOMER = {
    name: 'Ayesha',
    invoiceNo: 'INV-8829',
    date: 'Oct 24, 2023',
    time: '10:30 AM',
    initials: 'AY',
    avatarColor: '#fecdd3',
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ initials, color, size = 56 }) => (
    <div 
        className="rounded-full flex items-center justify-center shrink-0 font-bold"
        style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.33, color: '#9f1239' }}
    >
        {initials}
    </div>
);

// ─── Service Row ──────────────────────────────────────────────────────────────
const ServiceRow = ({ service, onIncrement, onDecrement, onDelete }) => (
    <div 
        className="bg-white rounded-2xl flex items-center px-4 py-4 mb-3"
        style={{ boxShadow: '0 2px 8px rgba(244,63,94,0.06)' }}
    >
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mr-3 shrink-0" style={{ backgroundColor: service.iconBg }}>
            <service.icon size={22} color={service.iconColor} />
        </div>

        {/* Name + Price */}
        <div className="flex-1 min-w-0">
            <p className="font-bold text-[14px] text-[#1f2937] truncate">{service.name}</p>
            <p className="font-bold text-[13px] mt-1 text-[#14b8a6]">
                ₹{(service.price * service.qty).toLocaleString("en-IN")}
            </p>
        </div>

        {/* Qty Controls */}
        <div className="flex items-center gap-3">
            <button 
                onClick={() => onDecrement(service.id)}
                className="w-7 h-7 rounded-full flex items-center justify-center border border-[#e5e7eb] bg-[#f9fafb] active:scale-90"
            >
                <Minus size={14} className="text-[#374151]" />
            </button>
            <span className="font-bold text-[15px] text-[#1f2937] min-w-[20px] text-center">{service.qty}</span>
            <button 
                onClick={() => onIncrement(service.id)}
                className="w-7 h-7 rounded-full flex items-center justify-center border border-[#e5e7eb] bg-[#f9fafb] active:scale-90"
            >
                <Plus size={14} className="text-[#374151]" />
            </button>
        </div>

        {/* Delete */}
        <button 
            onClick={() => onDelete(service.id)}
            className="w-8 h-8 rounded-full flex items-center justify-center ml-3 bg-[#f9fafb] active:bg-red-50 group"
        >
            <Trash2 size={16} className="text-[#9ca3af] group-active:text-red-500 transition-colors" />
        </button>
    </div>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const BillingDetailPage = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState(INITIAL_SERVICES);
    const [selectedTip, setSelectedTip] = useState(100);

    const increment = (id) => setServices(prev => prev.map(s => s.id === id ? { ...s, qty: s.qty + 1 } : s));
    const decrement = (id) => setServices(prev => prev.map(s => s.id === id ? { ...s, qty: Math.max(1, s.qty - 1) } : s));
    const deleteService = (id) => {
        if(window.confirm("Remove this service from the bill?")) {
            setServices(prev => prev.filter(s => s.id !== id));
        }
    };

    const subtotal   = services.reduce((sum, s) => sum + s.price * s.qty, 0);
    const grandTotal = subtotal + selectedTip - DISCOUNT_AMOUNT;

    return (
        <div className="min-h-screen bg-white pb-40 font-sans select-none overflow-y-auto no-scrollbar">
            {/* ── Top Nav ── */}
            <div className="flex items-center justify-between px-4 py-3 sticky top-0 z-20 bg-white border-b border-[#f3f4f6]">
                <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#fff1f2] active:scale-95">
                    <ArrowLeft size={20} className="text-[#f43f5e]" strokeWidth={3} />
                </button>
                <p className="font-bold text-[17px] text-[#1f2937]">Create Bill</p>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f9fafb]">
                    <EllipsisVertical size={20} className="text-[#1f2937]" />
                </button>
            </div>

            <div className="px-5 py-4">
                {/* ── Customer Info Card ── */}
                <div className="bg-white rounded-[24px] p-4 flex items-center gap-4 border border-[#f3f4f6] mb-6 animate-in slide-in-from-top duration-300" 
                    style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <Avatar initials={CUSTOMER.initials} color={CUSTOMER.avatarColor} size={64} />
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-[20px] text-[#1f2937] leading-tight truncate">{CUSTOMER.name}</p>
                        <p className="font-bold text-[13px] mt-1 text-[#f43f5e]">Bill #{CUSTOMER.invoiceNo}</p>
                        <div className="flex items-center gap-1.5 mt-1.5 text-[#9ca3af]">
                            <Calendar size={12} />
                            <span className="text-[12px] font-medium">{CUSTOMER.date} • {CUSTOMER.time}</span>
                        </div>
                    </div>
                </div>

                {/* ── Services Section ── */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-[20px] text-[#1f2937]">Services</h2>
                        <div className="px-3 py-1 rounded-full bg-[#f0fdfa]">
                            <span className="text-[#14b8a6] font-bold text-[12px]">{services.length} ITEMS</span>
                        </div>
                    </div>

                    <div className="space-y-0">
                        {services.map(s => (
                            <ServiceRow key={s.id} service={s} onIncrement={increment} onDecrement={decrement} onDelete={deleteService} />
                        ))}
                    </div>

                    {/* Add Service Button */}
                    <button className="w-full h-14 flex items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-[#fda4af] bg-white group active:bg-pink-50 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-[#f43f5e] flex items-center justify-center">
                            <Plus size={16} className="text-white" strokeWidth={3} />
                        </div>
                        <span className="font-bold text-[#f43f5e] text-[15px]">Add Service</span>
                    </button>
                </div>

                {/* ── Add a Tip ── */}
                <div className="mb-8">
                    <h2 className="font-bold text-[16px] text-[#1f2937] mb-4">Add a Tip</h2>
                    <div className="flex gap-2.5">
                        {TIP_OPTIONS.map(tip => {
                            const active = selectedTip === tip;
                            return (
                                <button 
                                    key={tip} 
                                    onClick={() => setSelectedTip(active ? 0 : tip)}
                                    className={`flex-1 h-12 rounded-full font-bold text-[14px] transition-all flex items-center justify-center border-2 ${active ? 'border-[#f43f5e] text-[#f43f5e] bg-white' : 'border-[#e5e7eb] text-[#374151] bg-white active:bg-gray-50'}`}
                                >
                                    ₹{tip}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Bill Summary Card ── */}
                <div className="bg-white rounded-[24px] p-5 border border-[#f3f4f6]" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div className="flex justify-between items-center py-3 border-b border-[#f3f4f6]">
                        <span className="text-[#6b7280] font-medium text-[14px]">Subtotal</span>
                        <div className="flex items-center gap-3">
                            <div className="px-2 py-0.5 rounded-full bg-[#14b8a6]">
                                <span className="text-white text-[9px] font-black uppercase tracking-wider">PAID</span>
                            </div>
                            <span className="font-bold text-[#1f2937] text-[14px]">₹{subtotal.toLocaleString("en-IN")}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-[#f3f4f6]">
                        <span className="text-[#6b7280] font-medium text-[14px]">Tip Amount</span>
                        <span className="font-bold text-[#1f2937] text-[14px]">₹{selectedTip}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-[#f3f4f6]">
                        <div className="flex items-center gap-2">
                            <span className="text-[#6b7280] font-medium text-[14px]">Discount</span>
                            <div className="px-2 py-0.5 rounded-full bg-[#fff1f2] border border-[#fecdd3]">
                                <span className="text-[#f43f5e] font-bold text-[10px]">{DISCOUNT_LABEL}</span>
                            </div>
                        </div>
                        <span className="font-bold text-[#f43f5e] text-[14px]">- ₹{DISCOUNT_AMOUNT}</span>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <span className="font-bold text-[#1f2937] text-[18px]">Grand Total</span>
                        <span className="font-black text-[#14b8a6] text-[26px]">₹{grandTotal.toLocaleString("en-IN")}</span>
                    </div>
                </div>
            </div>

            {/* ── Bottom Actions ── */}
            <div className="fixed bottom-0 left-0 right-0 bg-white px-4 pt-4 pb-8 border-t border-[#f3f4f6] flex flex-col gap-3" 
                style={{ boxShadow: '0 -4px 12px rgba(0,0,0,0.08)' }}>
                <button 
                    className="w-full flex items-center justify-center gap-2.5 rounded-full py-4 text-white font-bold text-[16px] bg-[#f43f5e] shadow-lg shadow-red-100 active:scale-95 active:shadow-inner transition-all duration-200"
                >
                    <Printer size={20} /> Print Bill
                </button>
                <button className="flex items-center justify-center gap-2 py-1 text-[#9ca3af] font-bold text-[14px] active:text-[#f43f5e] transition-colors">
                    <Share2 size={16} /> Share Invoice
                </button>
            </div>
        </div>
    );
};

export default BillingDetailPage;
