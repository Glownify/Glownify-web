import React, { useState } from "react";
import { ArrowRight } from 'lucide-react';

const BasicInfoRegistrationForm = ({ onNext, data, onChange, theme }) => {
  const isPurple = theme === "purple";

  // Themed styles
  const inputStyle = isPurple
    ? "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50/50 hover:bg-white"
    : "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500";

  const btnPrimary = isPurple
    ? "flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-purple-200 active:scale-95"
    : "w-full sm:w-40 py-2 rounded-md text-white font-medium text-sm bg-linear-to-r from-[#5F3DC4] via-[#6D4BCF] to-[#7B5DE8] shadow-lg hover:opacity-90 transition active:scale-95 tracking-wide";

  if (isPurple) {
    return (
      <div className="w-full">
        {/* Section header */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Basic Salon Information</h2>
          <p className="text-gray-400 text-sm">Enter your salon details to get started</p>
        </div>

        {/* Form card with grey bg + border */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Owner Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Owner Name</label>
              <input
                name="ownerName"
                value={data.ownerName || ""}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                type="text"
                placeholder="Enter Full Name"
                className={inputStyle}
              />
            </div>

            {/* Salon Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Salon Name</label>
              <input
                name="salonname"
                value={data.salonname}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                type="text"
                placeholder="Enter Salon Name"
                className={inputStyle}
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Password</label>
              <input
                name="password"
                value={data.password || ""}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                type="password"
                placeholder="Enter Password"
                className={inputStyle}
              />
            </div>

            {/* Salon Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Salon Type</label>
              <select
                name="salonType"
                value={data.salonType || "Unisex"}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className={inputStyle}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            {/* Shop Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Shop Ownership Type</label>
              <select
                name="shopType"
                value={data.shopType}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange("shopType", val);
                  if (val === "partnership" && (!data.partners || data.partners.length === 0)) {
                    onChange("partners", [{ name: "", contactNumber: "", whatsappNumber: "" }]);
                  }
                }}
                className={inputStyle}
              >
                <option value="personal">Personal</option>
                <option value="partnership">Partnership</option>
              </select>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Mobile Number</label>
              <input
                name="mobileno"
                value={data.mobileno}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                type="text"
                placeholder="Enter Mobile Number"
                className={inputStyle}
              />
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">WhatsApp Number</label>
              <input
                name="watsupno"
                value={data.watsupno}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                type="text"
                placeholder="Enter WhatsApp Number"
                className={inputStyle}
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                Email <span className="text-gray-400 normal-case">(Optional)</span>
              </label>
              <input
                name="email"
                value={data.email}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                type="email"
                placeholder="Enter Email Address"
                className={inputStyle}
              />
            </div>

            {/* Offers Home Service */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Offers Home Service?</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="offersHomeService"
                    checked={data.offersHomeService === true}
                    onChange={() => onChange("offersHomeService", true)}
                    className="accent-purple-600"
                  />
                  <span className="text-sm font-bold text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="offersHomeService"
                    checked={data.offersHomeService === false}
                    onChange={() => onChange("offersHomeService", false)}
                    className="accent-purple-600"
                  />
                  <span className="text-sm font-bold text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>

          {/* Partners Section (Only if Shop Type is Partnership) */}
          {data.shopType === "partnership" && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Partners Details</h3>
                <button
                  type="button"
                  onClick={() => {
                    const newPartners = [...(data.partners || []), { name: "", contactNumber: "", whatsappNumber: "" }];
                    onChange("partners", newPartners);
                  }}
                  className="text-sm font-bold text-purple-600 hover:text-purple-700"
                >
                  + Add Partner
                </button>
              </div>

              <div className="space-y-4">
                {(data.partners || []).map((partner, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Partner Name</label>
                        <input
                          value={partner.name}
                          onChange={(e) => {
                            const newPartners = [...data.partners];
                            newPartners[index] = { ...newPartners[index], name: e.target.value };
                            onChange("partners", newPartners);
                          }}
                          placeholder="Partner Name"
                          className="w-full text-sm border-b border-gray-200 py-1 focus:border-purple-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Contact Number</label>
                        <input
                          value={partner.contactNumber}
                          onChange={(e) => {
                            const newPartners = [...data.partners];
                            newPartners[index] = { ...newPartners[index], contactNumber: e.target.value };
                            onChange("partners", newPartners);
                          }}
                          placeholder="Contact Number"
                          className="w-full text-sm border-b border-gray-200 py-1 focus:border-purple-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">WhatsApp</label>
                        <input
                          value={partner.whatsappNumber}
                          onChange={(e) => {
                            const newPartners = [...data.partners];
                            newPartners[index] = { ...newPartners[index], whatsappNumber: e.target.value };
                            onChange("partners", newPartners);
                          }}
                          placeholder="WhatsApp Number"
                          className="w-full text-sm border-b border-gray-200 py-1 focus:border-purple-500 outline-none"
                        />
                      </div>
                    </div>
                    {data.partners.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newPartners = data.partners.filter((_, i) => i !== index);
                          onChange("partners", newPartners);
                        }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-sm"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => onNext(data)}
            className={btnPrimary}
          >
            Continue <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ── Original (non-themed) layout ──
  return (
    <div className="w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-md px-4 sm:px-6 py-6">

      {/* Form Header */}
      <div className="mt-6 sm:mt-8 mb-4">
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-2 mb-6">
          Enter your salon details to get started.
        </p>
      </div>

      {/* Form */}
      <div className="pt-6 sm:pt-8 py-6">
        {/* Salon Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-700 font-medium">Salon Name</label>
          <input
            name="salonname"
            value={data.salonname}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            type="text"
            placeholder="Enter Salon Name"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Salon Type */}
        <div className="mb-4">
          <label className="text-sm text-gray-700 font-medium block mb-2">
            Salon Type
          </label>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-700">
            {["Male", "Female", "Unisex"].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="salonType"
                  value={type}
                  checked={data.salonType === type}
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                  className="accent-purple-600"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label className="text-sm text-gray-700 font-medium">Mobile Number</label>
          <div className="mt-1 flex w-full">
            <select className="border border-gray-300 rounded-l-md px-2 text-sm focus:outline-none bg-gray-50">
              <option>+91</option>
            </select>
            <input
              name="mobileno"
              value={data.mobileno}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              type="text"
              placeholder="Enter Mobile Number"
              className="w-full border border-gray-300 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Used for Contact & WhatsApp</p>
        </div>

        {/* Whatsapp Number */}
        <div className="mb-4">
          <label className="text-sm text-gray-700 font-medium">Whatsapp Number</label>
          <div className="mt-1 flex w-full">
            <select className="border border-gray-300 rounded-l-md px-2 text-sm focus:outline-none bg-gray-50">
              <option>+91</option>
            </select>
            <input
              name="watsupno"
              value={data.watsupno}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              type="text"
              placeholder="Enter Whatsapp Number"
              className="w-full border border-gray-300 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Same as Mobile or Enter Different Number</p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="text-sm text-gray-700 font-medium">
            Email <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            name="email"
            value={data.email}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            type="email"
            placeholder="Enter Email Address"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
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

export default BasicInfoRegistrationForm;