import React from "react";
import { ChevronLeft, ArrowRight } from 'lucide-react';

const SalonAddressRegistrationForm = ({ onNext, onBack, data, onChange, theme }) => {
  const isPurple = theme === "purple";

  // Themed styles
  const inputStyle = isPurple
    ? "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50/50 hover:bg-white"
    : "mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500";

  const btnPrimary = isPurple
    ? "flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-purple-200 active:scale-95"
    : "flex-[1.5] py-2 rounded-md text-white text-sm font-medium bg-linear-to-r from-[#5F3DC4] to-[#7B5DE8] shadow-md transition active:scale-95";

  const btnSecondary = isPurple
    ? "flex items-center gap-2 text-gray-500 hover:text-purple-600 font-semibold transition-colors"
    : "flex-1 py-2 rounded-md border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition active:scale-95";

  if (isPurple) {
    return (
      <div className="w-full">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Salon Address</h2>
          <p className="text-gray-400">Pin your location and confirm details</p>
        </header>

        <div className="space-y-6">
          {/* Map Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search your salon location"
              className={inputStyle}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-600 cursor-pointer">📍</span>
          </div>

          {/* Map Preview */}
          <div className="relative w-full h-45 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-inner">
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-gray-400 text-xs text-center px-4 py-8">
              Interactive Map Preview
            </div>
            <button
              type="button"
              className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-xl border text-[10px] font-bold text-purple-600 shadow-sm flex items-center gap-1 hover:bg-gray-50"
            >
              📍 USE CURRENT
            </button>
          </div>

          {/* Address Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Country</label>
              <select
                name="country"
                value={data.country}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={inputStyle}
              >
                <option>India</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">State</label>
              <input
                name="state"
                placeholder="e.g. Delhi"
                value={data.state}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={inputStyle}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">City</label>
              <input
                name="city"
                value={data.city}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={inputStyle}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Pincode</label>
              <input
                name="pincode"
                value={data.pincode}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={inputStyle}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Full Address</label>
            <textarea
              name="fullAddress"
              rows="2"
              value={data.fullAddress}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className={`${inputStyle} resize-none`}
              placeholder="Shop no, Building, Street..."
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-12">
          <button type='button' onClick={onBack} className={btnSecondary}>
            <ChevronLeft size={20} /> Back
          </button>
          <button type='button' onClick={() => onNext(data)} className={btnPrimary}>
            Continue <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ── Original (non-themed) layout ──
  return (
    <div className="w-full">
      <div className="mt-4 mb-4">
        <p className="text-center text-xs text-gray-500 mt-2 mb-6">
          Pin your location and confirm details.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search your salon location"
            className="w-full rounded-md border border-gray-300 pl-9 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 cursor-pointer">📍</span>
        </div>

        <div className="relative w-full h-45 rounded-md overflow-hidden border border-gray-200 shadow-inner">
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-gray-400 text-xs text-center px-4">
            Interactive Map Preview
          </div>
          <button
            type="button"
            className="absolute top-2 right-2 bg-white px-2 py-1 rounded border text-[10px] font-bold text-purple-600 shadow-sm flex items-center gap-1 hover:bg-gray-50"
          >
            📍 USE CURRENT
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1">
            <label className="text-xs text-gray-700 font-medium">Country</label>
            <select
              name="country"
              value={data.country}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className={inputStyle}
            >
              <option>India</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="text-xs text-gray-700 font-medium">State</label>
            <input
              name="state"
              placeholder="e.g. Delhi"
              value={data.state}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-700 font-medium">City</label>
            <input
              name="city"
              value={data.city}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="text-xs text-gray-700 font-medium">Pincode</label>
            <input
              name="pincode"
              value={data.pincode}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-700 font-medium">Full Address</label>
          <textarea
            name="fullAddress"
            rows="2"
            value={data.fullAddress}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className={inputStyle}
            placeholder="Shop no, Building, Street..."
          />
        </div>

        <div className="flex justify-between gap-3 pt-2">
          <button
            onClick={onBack}
            className="flex-1 py-2 rounded-md border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition active:scale-95"
          >
            ← Back
          </button>
          <button
            onClick={() => onNext(data)}
            className={btnPrimary}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalonAddressRegistrationForm;