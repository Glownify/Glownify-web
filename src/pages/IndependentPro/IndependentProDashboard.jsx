import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  CalendarCheck,
  CheckCircle,
  Clock,
  Home,
  Phone,
  Scissors,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Wallet,
} from "lucide-react";
import { useIndependentProWorkspace } from "./useIndependentProWorkspace";

const statusStyles = {
  pending: "bg-amber-50 text-amber-600 border-amber-100",
  confirmed: "bg-teal-50 text-teal-600 border-teal-100",
  rescheduled: "bg-indigo-50 text-indigo-600 border-indigo-100",
  completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
  cancelled: "bg-rose-50 text-rose-600 border-rose-100",
};

const IndependentProDashboard = () => {
  const navigate = useNavigate();
  const { bookings, profile, serviceAreas, updateBookingStatus } = useIndependentProWorkspace();
  const [showAvailability, setShowAvailability] = useState(false);

  const stats = useMemo(() => {
    const activeBookings = bookings.filter((booking) =>
      ["pending", "confirmed", "rescheduled"].includes(booking.status)
    );

    return {
      newRequests: bookings.filter((booking) => booking.status === "pending").length,
      upcoming: bookings.filter((booking) =>
        ["confirmed", "rescheduled"].includes(booking.status)
      ).length,
      completed: bookings.filter((booking) => booking.status === "completed").length,
      total: bookings.length,
      active: activeBookings.length,
      earnings: bookings
        .filter((booking) => booking.status === "completed")
        .reduce((sum, booking) => sum + booking.amount, 0),
    };
  }, [bookings]);

  const updateStatus = (id, status) => {
    updateBookingStatus(id, status);
    toast.success(status === "confirmed" ? "Booking accepted" : "Booking rejected");
  };

  const pendingBookings = bookings.filter((booking) => booking.status === "pending");
  const upcomingBookings = bookings.filter((booking) =>
    ["confirmed", "rescheduled"].includes(booking.status)
  );

  const metricCards = [
    {
      title: "New Requests",
      value: stats.newRequests,
      note: "Need accept or reject",
      icon: UserCheck,
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Upcoming Services",
      value: stats.upcoming,
      note: "Home visits scheduled",
      icon: CalendarCheck,
      color: "bg-teal-100 text-teal-700",
    },
    {
      title: "Completed",
      value: stats.completed,
      note: "Verified deliveries",
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Active Bookings",
      value: stats.active,
      note: `${stats.total} total bookings`,
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-500">
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 rounded-[36px] bg-white border border-purple-100/50 p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-black text-[#8B5CF6] uppercase tracking-[0.2em]">
                Individual Professional
              </p>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-2">
                Welcome back, {profile.name}
              </h1>
              <p className="text-sm font-bold text-slate-400 mt-3 max-w-2xl">
                Track new requests, upcoming home visits, completed services, and approval readiness from one place.
              </p>
            </div>
            <button
              onClick={() => setShowAvailability((prev) => !prev)}
              className="h-14 px-8 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
            >
              {showAvailability ? "Hide Status" : "Today Status"}
            </button>
          </div>

          {showAvailability && (
            <div className="mt-6 rounded-[28px] bg-purple-50 border border-purple-100 p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-slate-900">
                    {profile.acceptingBookings ? "Accepting new bookings today" : "Bookings paused"}
                  </p>
                  <p className="text-xs font-bold text-slate-500 mt-1">
                    Service areas: {serviceAreas.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/independent-pro/profile")}
                  className="h-11 px-5 rounded-xl bg-white text-[#8B5CF6] font-black text-xs uppercase tracking-widest"
                >
                  Update Profile
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
            {metricCards.map((card) => (
              <div key={card.title} className="rounded-[28px] bg-slate-50/70 border border-slate-100 p-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.color}`}>
                  <card.icon size={22} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-5">
                  {card.title}
                </p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{card.value}</h3>
                <p className="text-xs font-bold text-slate-400 mt-1">{card.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 rounded-[36px] bg-slate-900 text-white p-8 shadow-xl shadow-slate-900/10">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <ShieldCheck size={26} />
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-200 text-[10px] font-black uppercase tracking-widest">
              Approved
            </span>
          </div>
          <h2 className="text-3xl font-black mt-8">Service access active</h2>
          <p className="text-sm font-bold text-slate-300 mt-3 leading-6">
            You can receive home-service requests in selected areas. Keep service pricing and availability updated.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="rounded-2xl bg-white/10 p-5">
              <Wallet className="text-emerald-200" size={20} />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-3">Earnings</p>
              <p className="text-2xl font-black mt-1">Rs. {stats.earnings.toLocaleString("en-IN")}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <Home className="text-pink-200" size={20} />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-3">Areas</p>
              <p className="text-2xl font-black mt-1">{serviceAreas.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 rounded-[36px] bg-white border border-purple-100/50 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">New Booking Requests</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                Accept, reject, or call customer before confirming
              </p>
            </div>
            <button
              onClick={() => navigate("/independent-pro/bookings")}
              className="px-5 h-11 rounded-xl bg-purple-50 text-[#8B5CF6] font-black text-xs uppercase tracking-widest"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {pendingBookings.length === 0 && (
              <div className="rounded-[28px] bg-slate-50 border border-slate-100 p-8 text-center">
                <CheckCircle className="mx-auto text-emerald-500" size={30} />
                <h3 className="text-lg font-black text-slate-900 mt-3">No pending requests</h3>
                <p className="text-sm font-bold text-slate-400 mt-1">
                  New customer requests will appear here as soon as they arrive.
                </p>
              </div>
            )}

            {pendingBookings.map((booking) => (
                <div key={booking.id} className="rounded-[28px] bg-slate-50 border border-slate-100 p-6">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#8B5CF6] font-black shadow-sm">
                        {booking.customerName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900">{booking.customerName}</h3>
                        <p className="text-xs font-bold text-slate-400 mt-1">
                          {booking.service} at {booking.area}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`tel:${booking.phone}`}
                        className="h-11 px-5 rounded-xl bg-white border border-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest flex items-center gap-2"
                      >
                        <Phone size={15} /> Call
                      </a>
                      <button
                        onClick={() => updateStatus(booking.id, "cancelled")}
                        className="h-11 px-5 rounded-xl bg-rose-50 text-rose-600 font-black text-xs uppercase tracking-widest"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "confirmed")}
                        className="h-11 px-5 rounded-xl bg-teal-500 text-white font-black text-xs uppercase tracking-widest"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="xl:col-span-4 rounded-[36px] bg-white border border-purple-100/50 p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Upcoming Services</h2>
          <div className="space-y-4 mt-6">
            {upcomingBookings.length === 0 && (
              <div className="rounded-[24px] border border-dashed border-slate-200 p-6 text-center">
                <p className="text-sm font-black text-slate-700">No upcoming services</p>
                <p className="text-xs font-bold text-slate-400 mt-1">Accepted bookings will show here.</p>
              </div>
            )}

            {upcomingBookings.map((booking) => (
                <div key={booking.id} className="rounded-[24px] border border-slate-100 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-black text-slate-900">{booking.service}</h3>
                      <p className="text-xs font-bold text-slate-400 mt-2">{booking.customerName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mt-5">
                    <Clock size={15} className="text-[#8B5CF6]" />
                    {booking.displayDate || booking.date}, {booking.displayTime}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mt-3">
                    <Scissors size={15} className="text-pink-500" />
                    Rs. {booking.amount.toLocaleString("en-IN")} / {booking.duration}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndependentProDashboard;
