import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../redux/slice/salonownerSlice";
import {
  Calendar,
  Clock,
  Phone,
  ChevronRight,
  Search,
  Bell,
  HelpCircle,
  Download,
  MoreVertical,
  Star,
  Plus,
  ArrowRight,
  TrendingUp,
  ChevronLeft,
  Filter,
} from "lucide-react";

const DUMMY_BOOKINGS = [
  {
    _id: "d1",
    customer: { name: "Julian Marc", email: "julian@example.com", phone: "+91 98765 43210" },
    bookingDate: "2024-10-24",
    timeSlot: { start: "10:30 AM" },
    status: "pending",
    totalAmount: 85.00,
    serviceItems: [{ service: { name: "The Signature Cut" } }],
    assignedSpecialist: { initials: "J", name: "Janet D." }
  },
  {
    _id: "d2",
    customer: { name: "Sophia Chen", email: "sophia@example.com", phone: "+91 98765 43211" },
    bookingDate: "2024-10-24",
    timeSlot: { start: "11:45 AM" },
    status: "pending",
    totalAmount: 210.00,
    serviceItems: [{ service: { name: "Balayage Revitalize" } }],
    assignedSpecialist: { initials: "SK", name: "Sunita K." }
  },
  {
    _id: "d3",
    customer: { name: "Isabella Wright", email: "isabella@example.com", phone: "+91 98765 43212" },
    bookingDate: "2024-10-25",
    timeSlot: { start: "09:00 AM" },
    status: "pending",
    totalAmount: 45.00,
    serviceItems: [{ service: { name: "Classic Manicure" } }],
    assignedSpecialist: null // Unassigned
  },
  {
    _id: "d4",
    customer: { name: "David Miller", email: "david@example.com", phone: "+91 98765 43213" },
    bookingDate: "2024-10-25",
    timeSlot: { start: "01:30 PM" },
    status: "pending",
    totalAmount: 40.00,
    serviceItems: [{ service: { name: "Beard Sculpting" } }],
    assignedSpecialist: { initials: "MV", name: "Marcus V." }
  }
];

const ManageBookingsPage = () => {
  const dispatch = useDispatch();
  const { bookings: reduxBookings, loading } = useSelector((state) => state.saloonowner);
  const [activeTab, setActiveTab] = useState("Pending");

  // Merge redux bookings with dummy data for presentation
  const bookings = [...(reduxBookings || []), ...DUMMY_BOOKINGS];

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#E91E63]"></div>
      </div>
    );
  }

  // Helper for status badge colors on desktop
  const getStatusBadge = (status) => {
    const s = status?.toLowerCase() || "";
    switch (s) {
      case "pending":
        return "bg-rose-50 text-rose-500 ring-1 ring-rose-100";
      case "confirmed":
        return "bg-emerald-50 text-emerald-500 ring-1 ring-emerald-100";
      case "completed":
        return "bg-blue-50 text-blue-500 ring-1 blue-emerald-100";
      default:
        return "bg-gray-50 text-gray-500 ring-1 ring-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 font-inter text-[#2D1B4E] md:p-8">
      {/* ── MOBILE VERSION (Existing logic maintained) ── */}
      <div className="md:hidden">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">Manage Bookings</h1>
            <p className="mt-1 text-xs text-gray-500">
              Review and manage appointments
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white px-3 py-1.5 shadow-sm">
            <span className="font-bold text-[#E91E63]">
              {bookings?.length || 0}
            </span>{" "}
            Total
          </div>
        </div>

        <div className="grid gap-4">
          {bookings?.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-black uppercase text-gray-400">
                      {new Date(booking.bookingDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900">
                      {booking.customer?.name || "Customer"}
                    </h3>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${getStatusBadge(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="space-y-1.5 border-t border-gray-50 pt-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={12} /> {booking.timeSlot?.start}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E91E63]">
                    ₹{booking.totalAmount}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center font-bold text-gray-400">
              No bookings found.
            </div>
          )}
        </div>
      </div>

      {/* ── DESKTOP VERSION (New Design) ── */}
      <div className="hidden flex-col gap-8 md:flex">
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-[#1a0b3a]">
              Booking Management
            </h1>
            <p className="text-sm font-medium text-gray-500">
              You have <span className="font-bold text-[#E91E63]">{bookings?.length || 0}</span> new appointment requests for today.
            </p>
          </div>

          {/* Daily Capacity Card */}
          <div className="relative overflow-hidden rounded-[2rem] bg-[#5FF3CD] p-6 shadow-lg shadow-[#5FF3CD]/20 min-w-[280px]">
             <div className="flex flex-col gap-1 relative z-10">
                <p className="text-xs font-bold uppercase tracking-wider text-teal-800/60">Daily Capacity</p>
                <h2 className="text-4xl font-black text-teal-900">84%</h2>
                <p className="text-[11px] font-bold text-teal-800/40 mt-1">Fully booked until 5:30 PM</p>
             </div>
             {/* Decorative Background Icon */}
             <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-20 transform rotate-12">
                <Plus size={80} className="text-teal-900" />
             </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-3">
            {[`Pending (${bookings?.filter(b => b.status === 'pending').length || 0})`, "Confirmed", "Completed", "Cancelled"].map((tab) => {
                const isActive = activeTab === tab || (tab.startsWith("Pending") && activeTab === "Pending");
                return (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.split(" (")[0])}
                        className={`px-6 py-2.5 rounded-full text-xs font-black transition-all ${
                            isActive 
                            ? "bg-[#E91E63] text-white shadow-lg shadow-[#E91E63]/30" 
                            : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
                        }`}
                    >
                        {tab}
                    </button>
                )
            })}
        </div>

        {/* Filter Bar & Main Content */}
        <div className="space-y-4">
            <div className="flex items-center justify-between bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-white/80">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-xs font-black text-[#1a0b3a] hover:text-[#E91E63]">
                        <Filter size={14} className="text-[#E91E63]" /> Sort by: <span className="text-gray-400">Newest</span>
                    </button>
                    <button className="flex items-center gap-2 text-xs font-black text-[#1a0b3a] hover:text-[#E91E63]">
                        <Calendar size={14} className="text-[#E91E63]" /> All Dates
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
                        <Download size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
                        <MoreVertical size={18} />
                    </button>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-50">
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400">Client & Service</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400">Date & Time</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400">Assigned Specialist</th>
                            <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400">Status</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {bookings?.length > 0 ? (
                            bookings.map((booking, idx) => (
                                <tr key={booking._id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl overflow-hidden shadow-sm">
                                                <img 
                                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.customer?.name || idx}`} 
                                                    alt="avatar" 
                                                    className="h-full w-full bg-gray-100"
                                                />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-black text-[#1a0b3a]">{booking.customer?.name || "Customer"}</p>
                                                    {(() => {
                                                        const item = booking.serviceItems?.[0];
                                                        const svc = item?.service;
                                                        return (typeof svc === 'object' ? svc?.name : svc) || item?.name || "General Service";
                                                    })()} • <span className="text-[#E91E63]">₹{booking.totalAmount}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-black text-[#1a0b3a]">
                                                {new Date(booking.bookingDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}
                                            </p>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                                                {booking.timeSlot?.start || "10:30 AM"}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-3">
                                            {booking.assignedSpecialist ? (
                                                 <div className="flex items-center gap-3">
                                                     <div className="h-8 w-8 rounded-full bg-[#1a0b3a] border border-white/20 flex items-center justify-center text-[9px] font-black text-white uppercase shadow-sm">
                                                         {booking.assignedSpecialist.initials}
                                                     </div>
                                                     <div className="space-y-0.5">
                                                         <p className="text-sm font-black text-[#1a0b3a] leading-none">{booking.assignedSpecialist.name}</p>
                                                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Specialist</p>
                                                     </div>
                                                 </div>
                                            ) : (
                                                <p className="text-[10px] font-black text-gray-400 uppercase bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">Unassigned</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${getStatusBadge(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors">
                                                <Phone size={16} />
                                            </button>
                                            <button className="text-xs font-black text-gray-400 hover:text-gray-600 px-4 py-2 uppercase tracking-widest">
                                                Reject
                                            </button>
                                            <button className="bg-[#E91E63] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#E91E63]/20 hover:scale-[1.02] transition-all uppercase tracking-widest">
                                                Accept
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-20 text-center text-gray-400 font-bold">
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                
                {/* Pagination */}
                <div className="p-8 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-400">Showing {bookings?.length > 0 ? `1-${bookings.length}` : '0'} of {bookings?.length || 0} requests</p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-300 hover:text-gray-500"><ChevronLeft size={16}/></button>
                        <button className="h-8 w-8 rounded-lg bg-[#E91E63] text-white text-xs font-black">1</button>
                        <button className="h-8 w-8 rounded-lg text-gray-400 hover:bg-gray-50 text-xs font-bold">2</button>
                        <button className="h-8 w-8 rounded-lg text-gray-400 hover:bg-gray-50 text-xs font-bold">3</button>
                        <button className="p-2 text-gray-300 hover:text-gray-500"><ChevronRight size={16}/></button>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Summary Cards */}
        <div className="grid grid-cols-3 gap-8">
            <SummaryCard 
                icon={<Clock size={20} className="text-rose-500" />}
                title="Avg. Response Time"
                value="14 mins"
                subtext={<> <span className="text-emerald-500 font-bold">1.12%</span> faster than last week </>}
                bg="bg-rose-50/30"
            />
            <SummaryCard 
                icon={<Star size={20} className="text-teal-500" />}
                title="Top Specialist"
                value="Marcus V."
                subtext="98% customer satisfaction"
                bg="bg-teal-50/30"
            />
            <SummaryCard 
                icon={<TrendingUp size={20} className="text-indigo-500" />}
                title="Projected Revenue"
                value="$1,420.00"
                subtext="For today's confirmed slots"
                bg="bg-indigo-50/30"
            />
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-[#E91E63] text-white shadow-2xl shadow-[#E91E63]/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-20">
        <Plus size={28} strokeWidth={3} />
      </button>
    </div>
  );
};

const SummaryCard = ({ icon, title, value, subtext, bg }) => (
    <div className={`p-8 rounded-[2rem] border border-white shadow-sm flex items-start gap-5 bg-white`}>
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${bg}`}>
            {icon}
        </div>
        <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{title}</p>
            <h3 className="text-2xl font-black text-[#1a0b3a]">{value}</h3>
            <p className="text-[11px] font-medium text-gray-400">{subtext}</p>
        </div>
    </div>
);

export default ManageBookingsPage;
