import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
    Plus,
    Users,
    Gift,
    FileText,
    Share2,
    BookOpen,
    Calendar,
    Clock,
    ChevronRight,
    Star,
    Eye,
    UserCircle,
    CheckCircle,
    User,
} from 'lucide-react';
import MobileBottomNav from './MobileBottomNav';
import { fetchSalonOwnerDashboard, updateBookingStatus } from '../../../redux/slice/saloonownerSlice';

// ─── Constants ────────────────────────────────────────────────────────────────
const H_PAD = '16px'; // single source of truth for horizontal padding
const SECTION_GAP = '24px'; // vertical gap between sections

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_STATS = {
    todayEarnings: 5700,
    bookedToday: 23,
    pendingRequests: 5,
    totalCustomers: 863,
};

const MOCK_RECENT_BOOKINGS = [
    {
        id: 1,
        customer: 'Amit K.',
        service: 'Hair Color',
        duration: '1 hr',
        amount: 2500,
        status: 'pending',
        avatar: 'https://i.pravatar.cc/150?u=amit',
    },
    {
        id: 2,
        customer: 'Mehak S.',
        service: 'Full Body Massage',
        duration: '1.5 hr',
        amount: 2000,
        status: 'pending',
        avatar: 'https://i.pravatar.cc/150?u=mehak',
    },
    {
        id: 3,
        customer: 'Riya',
        service: 'Bridal Makeup',
        duration: '2 hr',
        amount: 5000,
        status: 'pending',
        avatar: 'https://i.pravatar.cc/150?u=riya',
    },
];

const MOCK_REVIEWS = [
    {
        id: 1,
        name: 'Neha T.',
        rating: 5,
        text: 'The bridal package was amazing! The staff was very professional and the results were exactly what I wanted.',
        initials: 'NT',
        avatarColor: '#fda4af',
    },
];

// Row 1 — 4 compact actions
const QUICK_ACTIONS_ROW1 = [
    {
        icon: Plus,
        label: 'Add Service',
        iconColor: '#f43f5e',
        bg: '#fecdd3',
        navigateTo: '/salon-owner/manage-services-mobile',
    },
    {
        icon: Eye,
        label: 'Salon View',
        iconColor: '#0ea5e9',
        bg: '#e0f2fe',
        navigateTo: '/salon-owner/my-view',
    },
    {
        icon: Gift,
        label: 'Create Offer',
        iconColor: '#ec4899',
        bg: '#fbcfe8',
        navigateTo: '/salon-owner/manage-add-ons',
    },
    {
        icon: FileText,
        label: 'View Reports',
        iconColor: '#10b981',
        bg: '#d1fae5',
        navigateTo: '/salon-owner/reports',
    },
];

// Row 2 — 2 wide actions
const QUICK_ACTIONS_ROW2 = [
    {
        icon: Share2,
        label: 'Share',
        iconColor: '#f97316',
        bg: '#ffedd5',
        navigateTo: '#', // Add valid path later
    },
    {
        icon: BookOpen,
        label: 'Courses',
        iconColor: '#ec4899',
        bg: '#fbcfe8',
        navigateTo: '#', // Add valid path later
    },
];

// Stats config
const STATS_CONFIG = [
    {
        key: 'bookedToday',
        label: 'Booked Today',
        icon: Calendar,
        iconColor: '#f43f5e',
        iconBg: '#fecdd3',
        trend: '+3',
        trendUp: true,
        navigateTo: '/salon-owner/bookings',
    },
    {
        key: 'pendingRequests',
        label: 'Pending',
        icon: Clock,
        iconColor: '#f97316',
        iconBg: '#ffedd5',
        trend: '+2',
        trendUp: true,
        navigateTo: '/salon-owner/bookings',
    },
    {
        key: 'totalCustomers',
        label: 'Customers',
        icon: Users,
        iconColor: '#10b981',
        iconBg: '#d1fae5',
        trend: '+12',
        trendUp: true,
        navigateTo: '/salon-owner/manage-bookings',
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const cardShadow = {
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
};

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

const BookingCard = ({ booking, onAccept, onDecline, onPress }) => {
    const status = booking.status?.toLowerCase();
    const isPending = status === "pending";

    const customerName = booking.customer?.name || "Guest";
    const firstItem = booking.serviceItems?.[0];
    const svc = firstItem?.service;
    const serviceName = (typeof svc === 'object' ? svc?.name : svc) || firstItem?.name || "Service";

    const serviceSubtitle = booking.serviceItems?.length > 1 ? `+ ${booking.serviceItems.length - 1} more` : "";
    const specialistName = booking.specialist?.name || "Not Assigned";
    const bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const bookingTime = formatTime(booking.timeSlot?.start);
    const amount = booking.totalAmount || booking.totalPrice || booking.amount || 0;
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

// ─── Sub-components ───────────────────────────────────────────────────────────
const Avatar = ({ src, initials, color, size = 48 }) => (
    <div
        style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color || '#fecdd3',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        }}
    >
        {src ? (
            <img
                src={src}
                alt="avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        ) : (
            <span
                style={{ fontSize: size * 0.33, color: '#9f1239', fontWeight: '700' }}
            >
                {initials}
            </span>
        )}
    </div>
);

const StatCard = ({ config, value, onPress }) => {
    const IconComponent = config.icon;
    return (
        <button
            onClick={onPress}
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                gap: '5px',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: '14px',
                padding: '10px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                ...cardShadow,
            }}
        >
            <div
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    backgroundColor: config.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                <IconComponent size={16} color={config.iconColor} />
            </div>

            <div style={{ minWidth: 0 }}>
                <div
                    style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        color: '#111827',
                    }}
                >
                    {value}
                </div>
                <div
                    style={{
                        fontSize: '10px',
                        color: '#6b7280',
                        fontWeight: '600',
                        marginTop: '2px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {config.label}
                </div>
            </div>
        </button>
    );
};

const QuickActionBtn = ({ action, style, onPress }) => {
    const IconComponent = action.icon;
    return (
        <button
            onClick={onPress}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: action.bg,
                borderRadius: '14px',
                padding: '12px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                ...style,
            }}
        >
            <div>
                <IconComponent size={20} color={action.iconColor} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                    style={{
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#374151',
                    }}
                >
                    {action.label}
                </span>
            </div>
        </button>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MobileSalonAdminDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { dashboardData, loading } = useSelector((state) => state.saloonowner);
    const { user } = useSelector((state) => state.auth);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        dispatch(fetchSalonOwnerDashboard());
    }, [dispatch]);

    useEffect(() => {
        if (dashboardData?.recentBookings) {
            setBookings(dashboardData.recentBookings);
        }
    }, [dashboardData]);

    const stats = dashboardData?.stats || {
        bookedToday: 0,
        pendingBookings: 0,
        totalCustomers: 0
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
        <div style={{ flex: 1, backgroundColor: '#fff1f2', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div
                style={{
                    padding: `12px ${H_PAD} 16px ${H_PAD}`,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                        Hello, {user?.roleDetails?.shopName || 'Salon Owner'} 👋
                    </h1>
                </div>

                <div
                    style={{ position: 'relative', cursor: 'pointer' }}
                    onClick={() => navigate('#')}
                >
                    <Avatar src="https://i.pravatar.cc/150?u=salon_admin" size={44} />
                    <div
                        style={{
                            position: 'absolute',
                            top: '-2px',
                            right: '-2px',
                            width: '18px',
                            height: '18px',
                            borderRadius: '9px',
                            backgroundColor: '#f43f5e',
                            border: '2px solid #fff1f2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ color: '#fff', fontSize: '10px', fontWeight: '700' }}>
                            3
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ paddingBottom: '20px' }}>
                {/* ── Promotional Banner ──────────────────────────────────────────── */}
                <div
                    style={{
                        margin: `calc(${SECTION_GAP} - 8px) ${H_PAD} 0 ${H_PAD}`,
                        borderRadius: '20px',
                        overflow: 'hidden',
                        backgroundColor: '#111827',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ flex: 1 }}>
                        <h2
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                lineHeight: '24px',
                                margin: 0,
                            }}
                        >
                            Create & Share<br />Promotional Posters
                        </h2>
                        <button
                            style={{
                                marginTop: '12px',
                                alignSelf: 'flex-start',
                                borderRadius: '50px',
                                backgroundColor: '#f43f5e',
                                padding: '9px 20px',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate('/salon-owner/ai-poster-creator')}
                        >
                            <span style={{ color: '#fff', fontWeight: '700', fontSize: '13px' }}>
                                Try Now
                            </span>
                        </button>
                    </div>
                </div>

                {/* ── Stats Cards ─────────────────────────────────────────────────── */}
                <div
                    style={{
                        margin: `${SECTION_GAP} ${H_PAD} 0 ${H_PAD}`,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        justifyContent: 'space-between',
                    }}
                >
                    {STATS_CONFIG.map((config) => {
                        let value = 0;
                        if (config.key === 'bookedToday') value = stats.bookedToday;
                        if (config.key === 'pendingRequests') value = stats.pendingBookings;
                        if (config.key === 'totalCustomers') value = stats.totalCustomers;

                        return (
                            <StatCard
                                key={config.key}
                                config={config}
                                value={value}
                                onPress={() => navigate(config.navigateTo)}
                            />
                        );
                    })}
                </div>

                {/* ── Quick Actions ───────────────────────────────────────────────── */}
                <div style={{ margin: `${SECTION_GAP} ${H_PAD} 0 ${H_PAD}` }}>
                    {/* Row 1 — 4 equal compact buttons */}
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                        {QUICK_ACTIONS_ROW1.map((action) => (
                            <QuickActionBtn
                                key={action.label}
                                action={action}
                                onPress={() => navigate(action.navigateTo)}
                                style={{ flex: 1, flexDirection: 'column', gap: '4px' }}
                            />
                        ))}
                    </div>

                    {/* Row 2 — 2 wide 50/50 buttons */}
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '10px' }}>
                        {QUICK_ACTIONS_ROW2.map((action) => (
                            <QuickActionBtn
                                key={action.label}
                                action={action}
                                onPress={() => navigate(action.navigateTo)}
                                style={{ flex: 1, gap: '4px' }}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Recent Bookings ─────────────────────────────────────────────── */}
                <div style={{ margin: `${SECTION_GAP} ${H_PAD} 0 ${H_PAD}` }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '14px',
                        }}
                    >
                        <h3 style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '18px', margin: 0 }}>
                            Recent Bookings
                        </h3>
                        <button
                            onClick={() => navigate('/salon-owner/bookings')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            <span style={{ color: '#f43f5e', fontSize: '14px', fontWeight: '600' }}>
                                View All
                            </span>
                            <ChevronRight size={16} color="#f43f5e" />
                        </button>
                    </div>

                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <BookingCard
                                key={booking._id}
                                booking={booking}
                                onAccept={handleAccept}
                                onDecline={handleDecline}
                                onPress={() => navigate("/salon-owner/booking-detail", { state: { booking } })}
                            />
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
                            No recent bookings
                        </div>
                    )}
                </div>

                {/* ── Recent Reviews ──────────────────────────────────────────────── */}
                <div style={{ margin: `${SECTION_GAP} ${H_PAD} 0 ${H_PAD}` }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '14px',
                        }}
                    >
                        <h3 style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '18px', margin: 0 }}>
                            Recent Reviews
                        </h3>
                        <button
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            <span style={{ color: '#f43f5e', fontSize: '14px', fontWeight: '600' }}>
                                View All
                            </span>
                            <ChevronRight size={16} color="#f43f5e" />
                        </button>
                    </div>

                    {(dashboardData?.recentReviews || []).length > 0 ? (
                        dashboardData.recentReviews.map((review) => (
                            <div
                                key={review._id}
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '14px',
                                    padding: '14px',
                                    marginBottom: '12px',
                                    ...cardShadow,
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Avatar
                                        initials={review.user?.name?.substring(0, 2).toUpperCase()}
                                        color={'#fda4af'}
                                        size={44}
                                    />
                                    <div style={{ marginLeft: '12px', flex: 1 }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <span
                                                    style={{
                                                        fontWeight: 'bold',
                                                        color: '#1f2937',
                                                        fontSize: '15px',
                                                    }}
                                                >
                                                    {review.user?.name || 'Anonymous'}
                                                </span>
                                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '8px' }}>
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <Star
                                                            key={i}
                                                            size={10}
                                                            fill={i <= review.rating ? '#fbbf24' : '#e5e7eb'}
                                                            color={i <= review.rating ? '#fbbf24' : '#e5e7eb'}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <span style={{ color: '#9ca3af', fontSize: '12px' }}>
                                                {new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                color: '#6b7280',
                                                marginTop: '4px',
                                                fontSize: '13px',
                                                lineHeight: '18px',
                                            }}
                                        >
                                            {review.comment}
                                        </div>
                                    </div>
                                    <ChevronRight size={16} color="#9ca3af" style={{ marginLeft: '4px' }} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
                            No recent reviews
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Navigation */}
            <MobileBottomNav />
        </div>
    );
}
