import React, { memo, useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchSalonOwnerDashboard, updateBookingStatus } from "../../redux/slice/saloonownerSlice";
import { checkSubscription } from "../../utils/checkSubscription";
import MobileSalonAdminDashboard from "./Mobile/MobileSalonAdminDashboard";
import {
  Search,
  Bell,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Store,
  Check,
  Mail,
  Eye,
  Plus,
  Gift,
  FileText,
  Share2,
  BookOpen,
  Clock,
  Wallet,
  Users,
  Star,
  CheckCircle,
  User,
} from "lucide-react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const actionCards = [
  { label: "Add Service", icon: Plus, bg: "#f4c9d5", text: "#a63b61", path: "/salon-owner/manage-services", active: true },
  { label: "Salon View", icon: Eye, bg: "#c8e5f6", text: "#2f7ea3", path: "/salon-owner/my-view", active: true },
  { label: "Create Offer", icon: Gift, bg: "#f3cad9", text: "#b84879", path: "/salon-owner/manage-add-ons", active: true },
  { label: "View Reports", icon: FileText, bg: "#caead1", text: "#2a8a57", path: "/salon-owner/reports", active: true },
  { label: "Share", icon: Share2, bg: "#f7dfab", text: "#b87814", path: "/salon-owner/marketing", active: true },
  { label: "Courses", icon: BookOpen, bg: "#f1c9dc", text: "#ba4c7f", path: "#", disabled: true },
];

const metricCards = [
  { title: "Booked Today", value: "23", icon: BookOpen, iconWrap: "bg-[#d7f0e1] text-[#4ba57f]" },
  { title: "Pending Requests", value: "05", icon: Clock, iconWrap: "bg-[#ffe5c8] text-[#da8e48]" },
  { title: "Total Customers", value: "863", icon: Users, iconWrap: "bg-[#e0d4ff] text-[#7452df]" },
];

const activityData = [
  { name: "Mon", revenue: 1800, bookings: 12 },
  { name: "Tue", revenue: 2600, bookings: 18 },
  { name: "Wed", revenue: 3400, bookings: 24 },
  { name: "Thu", revenue: 3800, bookings: 20 },
  { name: "Fri", revenue: 4500, bookings: 32 },
  { name: "Sat", revenue: 6000, bookings: 45 },
  { name: "Sun", revenue: 5000, bookings: 38 },
];

const pieData = [
  { name: "Used", value: 43, color: "#9b5cf6" },
  { name: "Left", value: 57, color: "#eadcff" },
];

const alertsData = [
  { id: "SP-SAL-331", name: "Golden Mirror Salon", location: "Jayanagar", score: 42 },
  { id: "SP-MAL-215", name: "StyleLight Salon", location: "Malleswaram", score: 37 },
  { id: "SP-SAL-235", name: "SimplyStrands Unisex", location: "Banaswadi", score: 31 },
];

const recentBookingsData = [
  { name: "Amit K.", id: "BK-HRC-001", service: "Hair Color", duration: "1 hr", amount: "₹ 2,500", status: "Pending", time: "11:30 AM", statusClass: "bg-[#fcd34d] text-slate-800" },
  { name: "Mehak S.", id: "BK-MSC-002", service: "Full Body Massage", duration: "1.5 hr", amount: "₹ 2,000", status: "Confirmed", time: "12:45 PM", statusClass: "bg-[#9bc5ba] text-white" },
  { name: "Riya", id: "BK-MKP-003", service: "Bridal Makeup", duration: "2 hr", amount: "₹ 5,000", status: "Pending", time: "02:15 PM", statusClass: "bg-[#fcd34d] text-slate-800" },
  { name: "Sneha T.", id: "BK-PKT-004", service: "Facial Care", duration: "45 mins", amount: "₹ 1,200", status: "Completed", time: "09:30 AM", statusClass: "bg-[#9bc5ba] text-white" },
  { name: "Vikram P.", id: "BK-CUT-005", service: "Signature Haircut", duration: "30 mins", amount: "₹ 800", status: "Cancelled", time: "04:00 PM", statusClass: "bg-rose-500 text-white" },
];

const quickActions = [
  { icon: Plus, label: "Add Service", bg: "#fecdd3", color: "#ef476f", path: "/salon-owner/manage-services" },
  { icon: Eye, label: "Salon View", bg: "#dbeefe", color: "#1d9bf0", path: "/salon-owner/my-view" },
  { icon: Gift, label: "Create Offer", bg: "#fce7f3", color: "#ec4899", path: "/salon-owner/manage-add-ons" },
  { icon: FileText, label: "View Reports", bg: "#dcfce7", color: "#22c55e", path: "/salon-owner/reports" },
  { icon: Share2, label: "Share", bg: "#ffedd5", color: "#f97316", path: "#" },
  { icon: BookOpen, label: "Courses", bg: "#f8d3e0", color: "#c54f82", path: "#" },
];

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

const SalonOwnerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [filterActive, setFilterActive] = useState(false);
  const [filterMonth, setFilterMonth] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState([]);

  const dispatch = useDispatch();
  const { dashboardData, loading } = useSelector((state) => state.saloonowner);

  useEffect(() => {
    dispatch(fetchSalonOwnerDashboard());
  }, [dispatch]);

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

  const stats = dashboardData?.stats || {
    bookedToday: 0,
    pendingBookings: 0,
    totalCustomers: 0
  };

  const metricCards = [
    { title: "Booked Today", value: stats.bookedToday, icon: Calendar, iconWrap: "bg-[#d7f0e1] text-[#4ba57f]" },
    { title: "Pending Requests", value: stats.pendingBookings, icon: Clock, iconWrap: "bg-[#ffe5c8] text-[#da8e48]" },
    { title: "Total Customers", value: stats.totalCustomers, icon: Users, iconWrap: "bg-[#e0d4ff] text-[#7452df]" },
  ];

  const recentBookings = dashboardData?.recentBookings || [];

  useEffect(() => {
    let filtered = [...recentBookings];
    if (filterActive) {
      filtered = filtered.filter(b => b.status === "Accepted" || b.status === "In Service");
    }
    if (filterMonth) {
      filtered = filtered.slice(0, 3);
    }
    setBookings(filtered);
  }, [filterActive, filterMonth, dashboardData]);

  if (isMobile) return <MobileSalonAdminDashboard />;
  const PINK_BRAND = "#D946EF";
  const PURPLE_BRAND = "#8B5CF6";

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">

      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {actionCards.map((item) => (
          <button
            key={item.label + item.bg}
            onClick={() => item.path !== "#" && navigate(item.path)}
            className="h-[64px] rounded-full bg-white border border-slate-50 flex items-center justify-center gap-4 px-6 font-black text-[13px] text-slate-700 hover:scale-[1.03] transition-all hover:shadow-[0_15px_30px_rgba(139,92,246,0.06)] group"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center`} style={{ backgroundColor: item.bg }}>
              <item.icon size={16} style={{ color: item.text }} />
            </div>
            <span className="tracking-tight">{item.label}</span>
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {metricCards.map((card) => (
          <div key={card.title} className="bg-white rounded-[45px] border border-purple-50/50 px-8 py-8 shadow-[0_15px_40px_rgba(0,0,0,0.02)] flex items-center justify-between min-h-[140px] hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2">{card.title}</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">{card.value}</h3>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${card.iconWrap} bg-opacity-40`}>
              <card.icon size={26} />
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-12 xl:col-span-12 2xl:col-span-5 bg-white border border-purple-100/20 rounded-[45px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] min-h-[460px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Revenue Overview</h3>
            <div className="flex items-center gap-3 bg-purple-50 p-1 rounded-xl">
              <button className="px-4 py-1.5 rounded-lg bg-white text-[#8B5CF6] font-bold text-xs shadow-sm">Monthly</button>
              <button className="px-4 py-1.5 rounded-lg text-slate-400 font-bold text-xs">Yearly</button>
            </div>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={activityData} margin={{ top: 10, right: 5, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#94a3b8", fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#94a3b8", fontWeight: 700 }} />
                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="revenue" fill="#8B5CF6" radius={[6, 6, 0, 0]} maxBarSize={32} />
                <Line dataKey="bookings" type="monotone" stroke="#D946EF" strokeWidth={4} dot={{ r: 6, fill: "#fff", stroke: "#D946EF", strokeWidth: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-400 mt-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /> Total Revenue
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D946EF]" /> Bookings
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 xl:col-span-6 2xl:col-span-4 bg-white border border-purple-100/20 rounded-[45px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] min-h-[460px] overflow-hidden">
          <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Service Mix</h3>
          <div className="space-y-8 text-[12px] text-[#6c588f]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-purple-50 pb-8">
              <div className="space-y-4 text-center sm:text-left">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Payout</p>
                  <h4 className="text-2xl font-black text-[#8B5CF6]">₹ 1,85,000</h4>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Platform Fee</p>
                  <h4 className="text-2xl font-black text-[#D946EF]">10%</h4>
                </div>
              </div>
              <div className="w-24 h-24 sm:w-28 sm:h-28 relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={35} outerRadius={50} dataKey="value" stroke="none">
                      {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#8B5CF6]">
                  <span className="text-[18px] font-black">43%</span>
                  <span className="text-[7px] font-bold uppercase tracking-tighter opacity-60">Payout</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[14px] font-black text-slate-700"><span>Paid</span><span>₹1,80,000</span></div>
              <div className="flex items-center justify-between text-[14px] font-black text-slate-700"><span>Pending</span><span>₹85,000</span></div>
              <div className="pt-6 border-t border-purple-50">
                <div className="flex justify-between items-end mb-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Progress</p>
                  <p className="text-[12px] font-black text-[#8B5CF6]">62%</p>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                  <div className="h-full w-[62%] bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] rounded-full shadow-lg transition-all duration-1000" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 xl:col-span-6 2xl:col-span-3 space-y-6">
          <div className="bg-white/84 border border-[#dacaf4] rounded-[22px] px-6 py-5 shadow-sm flex items-center justify-between">
            <h3 className="text-[18px] font-black text-[#2c1e4c] tracking-tight">Advertisements</h3>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]/30" />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[40px] border border-[#f5d29b] bg-gradient-to-br from-[#ffcf3b] via-[#ffb324] to-[#ff7a1b] min-h-[340px] shadow-[0_20px_50px_rgba(255,166,0,0.22)] p-8 flex flex-col justify-center">
            <div className="relative z-10 max-w-[80%]">
              <p className="text-[18px] md:text-[24px] italic font-extrabold text-[#212145]">Special Offer!</p>
              <h4 className="text-[24px] lg:text-[28px] xl:text-[34px] font-extrabold leading-[1.1] text-[#24315d] mt-4">Get 30% OFF on Website Design</h4>
              <p className="text-[14px] font-semibold text-[#6b3d00] mt-4">Valid till: 30 March</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <button className="px-5 h-11 rounded-xl bg-[#3554b8] text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-blue-900/20">View Details</button>
                <button className="px-5 h-11 rounded-xl bg-[#ff7a1b] border border-white/40 text-white font-bold hover:scale-105 transition-transform">Contact Now</button>
              </div>
            </div>
            <div className="absolute right-4 bottom-4 text-[120px] font-black text-white/10 select-none pointer-events-none rotate-12 leading-none uppercase">%</div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 blur-3xl rounded-full" />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              <button className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#ff7a1b] transition-all"><ChevronLeft size={18} /></button>
              <button className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#ff7a1b] transition-all"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 bg-white/84 border border-[#dacaf4] rounded-[22px] px-5 py-5 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h4 className="text-[20px] font-black text-[#2c1e4c] tracking-tight">Recent Bookings</h4>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">Awaiting Management</p>
            </div>
            <button
              onClick={() => navigate("/salon-owner/bookings")}
              className="px-6 h-10 rounded-full bg-[#D946EF] text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-pink-200 hover:scale-105 transition-all"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {bookings.map((booking) => {
              const status = booking.status?.toLowerCase();
              const isPending = status === "pending";
              const avatar = booking.customer?.avatar || `https://i.pravatar.cc/150?u=${booking._id}`;
              const customerName = booking.customer?.name || "Guest";
              const firstItem = booking.serviceItems?.[0];
              const svc = firstItem?.service;
              const serviceName = (typeof svc === 'object' ? svc?.name : svc) || firstItem?.name || "Service";
              const serviceSubtitle = booking.serviceItems?.length > 1 ? `+ ${booking.serviceItems.length - 1} more` : "";
              const specialistName = booking.specialist?.name || "Not Assigned";
              const date = new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
              const time = formatTime(booking.timeSlot?.start);
              const amount = booking.totalAmount || booking.totalPrice || booking.amount || 0;

              return (
                <div
                  key={booking._id}
                  onClick={() => navigate("/salon-owner/booking-detail", { state: { booking } })}
                  className="bg-white rounded-[24px] p-6 shadow-sm hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-300 cursor-pointer border border-[#fef2f2] group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-[64px] h-[64px] rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-500">
                      <img src={avatar} className="w-full h-full object-cover" alt="avatar" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h1 className="font-black text-[18px] text-slate-800 leading-tight truncate tracking-tight">{customerName}</h1>
                        {isPending && (
                          <div className="bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">New</span>
                          </div>
                        )}
                      </div>
                      <p className="text-[14px] text-slate-500 mt-1 font-bold">{serviceName}</p>
                      {serviceSubtitle && (
                        <p className="text-[11px] text-slate-400 mt-0.5 font-semibold">{serviceSubtitle}</p>
                      )}

                      <div className="flex flex-wrap items-center gap-x-4 mt-4">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Calendar size={14} className="text-pink-400" />
                          <span className="text-[12px] text-slate-400 font-bold whitespace-nowrap">{date}, {time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 min-w-0">
                          <User size={14} className="text-purple-400" />
                          <span className="text-[12px] text-slate-400 font-bold truncate max-w-[100px]">{specialistName}</span>
                        </div>
                        <span className="text-[18px] font-black text-slate-800 ml-auto">₹{amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-50">
                    <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                      <span className="text-[11px] uppercase tracking-wider">Total</span>
                      <span className="text-[15px] text-slate-700">₹{amount.toLocaleString()}</span>
                      <span className="mx-1 text-slate-100">|</span>
                      <span className="text-[11px] uppercase tracking-wider">{booking.bookingType === 'in_salon' ? 'Salon Visit' : 'Home Service'}</span>
                    </div>

                    {isPending ? (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAccept(booking._id); }}
                          className="bg-teal-500 text-white px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-teal-600 active:scale-95 transition-all shadow-lg shadow-teal-500/20"
                        >
                          Accept
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDecline(booking._id); }}
                          className="bg-rose-500 text-white px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-rose-600 active:scale-95 transition-all shadow-lg shadow-rose-500/20"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${status === 'accepted' || status === 'confirmed' ? 'bg-teal-50 text-teal-600'
                        : status === 'completed' ? 'bg-blue-50 text-blue-600'
                          : 'bg-rose-50 text-rose-600'
                        }`}>
                        {status}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white border border-[#dacaf4]/20 rounded-[35px] px-8 py-8 shadow-[0_15px_40px_rgba(0,0,0,0.02)] flex flex-col min-h-[460px]">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-black text-slate-800 tracking-tight">Recent Reviews</h4>
            <button className="text-[12px] font-black text-[#D946EF] uppercase tracking-widest hover:underline transition-all">View All</button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar pr-1">
            {dashboardData?.recentReviews?.length > 0 ? (
              dashboardData.recentReviews.map((review) => (
                <div key={review._id} className="p-5 rounded-[28px] bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-purple-500/5 transition-all group">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center font-black text-[#8B5CF6] text-lg uppercase shadow-sm">
                      {review.user?.name?.charAt(0) || "A"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h5 className="text-[14px] font-black text-slate-800 truncate">{review.user?.name || "Anonymous"}</h5>
                        <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                          {new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            size={10}
                            className={`${i <= review.rating ? "fill-[#fbbf24] text-[#fbbf24]" : "fill-slate-200 text-slate-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] font-bold text-slate-500 leading-relaxed italic line-clamp-2 uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                    "{review.comment || review.text || "No comment provided."}"
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                  <Star size={24} className="text-slate-200" />
                </div>
                <p className="text-[13px] font-black text-slate-300 uppercase tracking-widest">No reviews yet</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(SalonOwnerDashboard);

