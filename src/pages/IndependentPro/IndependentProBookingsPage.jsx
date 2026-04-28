import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Calendar,
  CheckCircle,
  Clock,
  Home,
  KeyRound,
  MapPin,
  Phone,
  RotateCcw,
  Search,
  XCircle,
} from "lucide-react";
import { useIndependentProWorkspace } from "./useIndependentProWorkspace";

const tabs = ["All", "Pending", "Confirmed", "Rescheduled", "Completed", "Cancelled"];

const statusStyles = {
  pending: "bg-amber-50 text-amber-600 border-amber-100",
  confirmed: "bg-teal-50 text-teal-600 border-teal-100",
  rescheduled: "bg-indigo-50 text-indigo-600 border-indigo-100",
  completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
  cancelled: "bg-rose-50 text-rose-600 border-rose-100",
};

const IndependentProBookingsPage = () => {
  const { bookings, updateBookingStatus, rescheduleBooking } = useIndependentProWorkspace();
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [rescheduleDraft, setRescheduleDraft] = useState(null);
  const [completionDraft, setCompletionDraft] = useState({ id: null, code: "" });

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const statusMatch = activeTab === "All" || booking.status === activeTab.toLowerCase();
      const queryMatch = [
        booking.customerName,
        booking.service,
        booking.area,
        booking.address,
        booking.id,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      return statusMatch && queryMatch;
    });
  }, [activeTab, bookings, query]);

  const counts = useMemo(() => {
    return tabs.reduce((acc, tab) => {
      acc[tab] =
        tab === "All"
          ? bookings.length
          : bookings.filter((booking) => booking.status === tab.toLowerCase()).length;
      return acc;
    }, {});
  }, [bookings]);

  const updateStatus = (id, status) => {
    updateBookingStatus(id, status);
    toast.success(
      status === "confirmed"
        ? "Booking accepted"
        : status === "cancelled"
          ? "Booking rejected"
          : "Booking updated"
    );
  };

  const startReschedule = (booking) => {
    setCompletionDraft({ id: null, code: "" });
    setRescheduleDraft({
      id: booking.id,
      date: booking.date,
      time: booking.time,
    });
  };

  const saveReschedule = () => {
    if (!rescheduleDraft?.date || !rescheduleDraft?.time) {
      toast.error("Select both date and time");
      return;
    }

    rescheduleBooking(rescheduleDraft.id, rescheduleDraft.date, rescheduleDraft.time);
    setRescheduleDraft(null);
    toast.success("Booking rescheduled");
  };

  const verifyAndComplete = (booking) => {
    if (booking.status === "completed") {
      toast.success("This booking is already complete");
      return;
    }

    if (completionDraft.id !== booking.id) {
      setRescheduleDraft(null);
      setCompletionDraft({ id: booking.id, code: "" });
      return;
    }

    if (completionDraft.code.trim() === booking.code) {
      updateBookingStatus(booking.id, "completed");
      setCompletionDraft({ id: null, code: "" });
      toast.success("Service code verified");
    } else {
      toast.error("Incorrect service code");
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-500">
      <section className="rounded-[36px] bg-white border border-purple-100/50 p-8 shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-black text-[#8B5CF6] uppercase tracking-[0.2em]">
              Individual Booking Handling
            </p>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-2">
              Home Service Bookings
            </h1>
            <p className="text-sm font-bold text-slate-400 mt-3 max-w-2xl">
              Accept or reject new requests, call customers, reschedule unavailable slots, and verify service codes before completion.
            </p>
          </div>

          <div className="relative w-full xl:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search booking, customer, area..."
              className="w-full h-14 rounded-2xl border border-slate-100 bg-slate-50 pl-14 pr-5 text-sm font-bold outline-none focus:ring-4 focus:ring-purple-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-12 px-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-slate-500 hover:bg-purple-50 hover:text-[#8B5CF6]"
              }`}
            >
              {tab} ({counts[tab]})
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredBookings.length === 0 && (
          <div className="xl:col-span-2 rounded-[34px] bg-white border border-dashed border-purple-100 p-10 text-center">
            <Search className="mx-auto text-slate-300" size={34} />
            <h2 className="text-xl font-black text-slate-900 mt-4">No bookings found</h2>
            <p className="text-sm font-bold text-slate-400 mt-2">
              Try a different status tab or search term.
            </p>
            <button
              onClick={() => {
                setActiveTab("All");
                setQuery("");
              }}
              className="mt-5 h-11 px-5 rounded-xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest"
            >
              Reset Filters
            </button>
          </div>
        )}

        {filteredBookings.map((booking) => (
          <div key={booking.id} className="rounded-[34px] bg-white border border-purple-100/50 p-7 shadow-sm">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 text-[#8B5CF6] flex items-center justify-center font-black text-xl">
                  {booking.customerName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">{booking.customerName}</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {booking.id}
                  </p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${statusStyles[booking.status]}`}>
                {booking.status}
              </span>
            </div>

            <div className="rounded-[28px] bg-slate-50/80 border border-slate-100 p-6 mt-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-lg font-black text-slate-900">{booking.service}</p>
                <p className="text-2xl font-black text-slate-900">
                  Rs. {booking.amount.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-slate-500">
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#8B5CF6]" /> {booking.displayDate || booking.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-pink-500" /> {booking.displayTime} ({booking.duration})
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-teal-500" /> {booking.area}
                </span>
                <span className="flex items-center gap-2">
                  <Home size={16} className="text-emerald-500" /> {booking.address}
                </span>
              </div>
            </div>

            {rescheduleDraft?.id === booking.id && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 rounded-[24px] bg-indigo-50 p-4">
                <input
                  type="date"
                  value={rescheduleDraft.date}
                  onChange={(event) =>
                    setRescheduleDraft((prev) => ({ ...prev, date: event.target.value }))
                  }
                  className="h-11 rounded-xl bg-white px-3 text-xs font-bold outline-none"
                />
                <input
                  type="time"
                  value={rescheduleDraft.time}
                  onChange={(event) =>
                    setRescheduleDraft((prev) => ({ ...prev, time: event.target.value }))
                  }
                  className="h-11 rounded-xl bg-white px-3 text-xs font-bold outline-none"
                />
                <button
                  onClick={saveReschedule}
                  className="h-11 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setRescheduleDraft(null)}
                  className="sm:col-span-3 h-10 rounded-xl bg-white text-indigo-600 font-black text-xs uppercase tracking-widest"
                >
                  Cancel Reschedule
                </button>
              </div>
            )}

            {completionDraft.id === booking.id && booking.status !== "completed" && (
              <div className="flex flex-col sm:flex-row gap-3 mt-5 rounded-[24px] bg-emerald-50 p-4">
                <input
                  value={completionDraft.code}
                  onChange={(event) =>
                    setCompletionDraft((prev) => ({ ...prev, code: event.target.value }))
                  }
                  placeholder="Enter customer service code"
                  className="h-11 flex-1 rounded-xl bg-white px-4 text-xs font-bold outline-none"
                />
                <button
                  onClick={() => verifyAndComplete(booking)}
                  className="h-11 px-5 rounded-xl bg-emerald-600 text-white font-black text-xs uppercase tracking-widest"
                >
                  Verify
                </button>
                <button
                  type="button"
                  onClick={() => setCompletionDraft({ id: null, code: "" })}
                  className="h-11 px-5 rounded-xl bg-white text-emerald-600 font-black text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href={`tel:${booking.phone}`}
                className="h-11 px-5 rounded-xl bg-white border border-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest flex items-center gap-2"
              >
                <Phone size={15} /> Call
              </a>

              {booking.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus(booking.id, "cancelled")}
                    className="h-11 px-5 rounded-xl bg-rose-50 text-rose-600 font-black text-xs uppercase tracking-widest flex items-center gap-2"
                  >
                    <XCircle size={15} /> Reject
                  </button>
                  <button
                    onClick={() => updateStatus(booking.id, "confirmed")}
                    className="h-11 px-5 rounded-xl bg-teal-500 text-white font-black text-xs uppercase tracking-widest flex items-center gap-2"
                  >
                    <CheckCircle size={15} /> Accept
                  </button>
                </>
              )}

              {["pending", "confirmed", "rescheduled"].includes(booking.status) && (
                <button
                  onClick={() => startReschedule(booking)}
                  className="h-11 px-5 rounded-xl bg-indigo-50 text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center gap-2"
                >
                  <RotateCcw size={15} /> Reschedule
                </button>
              )}

              {["confirmed", "rescheduled"].includes(booking.status) && (
                <button
                  onClick={() => verifyAndComplete(booking)}
                  className="h-11 px-5 rounded-xl bg-emerald-50 text-emerald-600 font-black text-xs uppercase tracking-widest flex items-center gap-2"
                >
                  <KeyRound size={15} /> Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default IndependentProBookingsPage;
