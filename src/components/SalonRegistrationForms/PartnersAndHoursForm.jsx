import React, { useState, useEffect } from "react";
import { ChevronLeft, ArrowRight, Plus, Trash2, Clock } from 'lucide-react';

const DAY_LIST = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PartnersAndHoursForm = ({ onNext, onBack, data, onChange, theme }) => {
  const isPurple = theme === "purple";

  // Debugging log to see what data is being received
  console.log("PartnersAndHoursForm Data:", data);

  const inputStyle = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50/50 hover:bg-white";
  const btnPrimary = "flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-purple-200 active:scale-95";
  const btnSecondary = "flex items-center gap-2 text-gray-500 hover:text-purple-600 font-semibold transition-colors";

  const [openingHours, setOpeningHours] = useState(data.openingHours || DAY_LIST.map(day => ({
    day,
    start: "09:00",
    end: "20:00",
    isActive: true
  })));

  // Sync state if props change (e.g., user goes back and forward)
  useEffect(() => {
    if (data.openingHours) {
      // Map data.openingHours back to our local state format with isActive
      const hoursWithActive = DAY_LIST.map(day => {
        const existing = data.openingHours.find(h => h.day === day);
        return existing
          ? { ...existing, isActive: true }
          : { day, start: "09:00", end: "20:00", isActive: false };
      });
      setOpeningHours(hoursWithActive);
    }
  }, [data.openingHours]);

  const toggleDay = (day) => {
    setOpeningHours(prev => {
      const updated = prev.map(h => h.day === day ? { ...h, isActive: !h.isActive } : h);
      onChange("openingHours", updated.filter(h => h.isActive).map(({ day, start, end }) => ({ day, start, end })));
      return updated;
    });
  };

  const updateHour = (day, field, value) => {
    setOpeningHours(prev => {
      const updated = prev.map(h => h.day === day ? { ...h, [field]: value } : h);
      onChange("openingHours", updated.filter(h => h.isActive).map(({ day, start, end }) => ({ day, start, end })));
      return updated;
    });
  };

  return (
    <div className="w-full">
      <header className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Opening Hours</h2>
        <p className="text-gray-400">Manage your salon's schedule</p>
      </header>

      {/* Opening Hours Section */}
      <div className="mb-10 w-full overflow-x-hidden">
        <h3 className="text-sm font-bold text-purple-600 uppercase mb-4 flex items-center gap-2">
          <Clock size={16} /> Opening Hours
        </h3>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-4 w-full min-w-0">
          {openingHours.map((item) => (
            <div key={item.day} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm transition-all hover:border-purple-200">
              <div className="flex flex-col gap-3 pb-2 border-b border-gray-100 last:border-0 last:pb-0">
                {/* Day Toggle */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => toggleDay(item.day)}
                    className={`h-8 w-20 shrink-0 flex items-center justify-center font-bold rounded-lg border transition-all text-xs uppercase tracking-wider ${item.isActive
                        ? "bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-100"
                        : "border-gray-200 bg-gray-50 text-gray-400 hover:border-purple-300"
                      }`}
                  >
                    {item.day}
                  </button>
                </div>

                {item.isActive ? (
                  <div className="flex flex-row items-center gap-2 flex-1 animate-in fade-in slide-in-from-top-1 duration-300 w-full min-w-0">
                    {/* Start Time */}
                    <div className="w-1/2 min-w-0">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1 text-center">Open</p>
                      <div className="relative group">
                        <Clock className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-400 group-hover:text-purple-600 transition-colors" />
                        <input
                          type="time"
                          value={item.start}
                          onChange={(e) => updateHour(item.day, "start", e.target.value)}
                          className="w-full pl-7 pr-1 py-1.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-1 outline-none text-xs font-semibold bg-gray-50/50 hover:bg-white transition-all cursor-pointer min-w-0"
                        />
                      </div>
                    </div>

                    {/* End Time */}
                    <div className="w-1/2 min-w-0">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1 text-center">Close</p>
                      <div className="relative group">
                        <Clock className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-400 group-hover:text-purple-600 transition-colors" />
                        <input
                          type="time"
                          value={item.end}
                          onChange={(e) => updateHour(item.day, "end", e.target.value)}
                          className="w-full pl-7 pr-1 py-1.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-1 outline-none text-xs font-semibold bg-gray-50/50 hover:bg-white transition-all cursor-pointer min-w-0"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 py-2 px-4 rounded-lg border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
                    <span className="text-[10px] text-gray-400 font-medium italic">Shop Closed on {item.day}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-12">
        <button type='button' onClick={onBack} className={btnSecondary}>
          <ChevronLeft size={20} /> Back
        </button>
        <button type='button' onClick={onNext} className={btnPrimary}>
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PartnersAndHoursForm;
