import React, { useState } from "react";
import BasicInfoRegistrationForm from "./BasicInfoRegistrationForm";

const SalonAddressRegistrationForm = ({ onNext, onBack,data,onChange }) => {
  // const [addressData, setAddressData] = useState({
  //   country: "India",
  //   state: "",
  //   city: "",
  //   area: "",
  //   pincode: "",
  //   fullAddress: ""
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full">
     
      {/* Form Header */}
      <div className="mt-4 mb-4">
        {/* Progress bar */}
        {/* <div className="w-full h-[3px] bg-gray-200 rounded-full mb-6">
          <div className="h-[3px] w-2/3 bg-purple-600 rounded-full"></div>
        </div>

        <h2 className="text-center font-semibold text-gray-800 text-sm sm:text-base">
          Step 2 of 3: Salon Address
        </h2> */}
        <p className="text-center text-xs text-gray-500 mt-2 mb-6">
          Pin your location and confirm details.
        </p> 
      </div>

      {/* Map Section */}
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

        {/* Address Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1">
            <label className="text-xs text-gray-700 font-medium">Country</label>
            <select
              name="country"
              value={data.country}
              onChange={(e)=>onChange(e.target.name, e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              onChange={(e)=>onChange(e.target.name, e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-700 font-medium">City</label>
            <input
              name="city"
              value={data.city}
              onChange={(e)=>onChange(e.target.name, e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-700 font-medium">Pincode</label>
            <input
              name="pincode"
              value={data.pincode}
              onChange={(e)=>onChange(e.target.name, e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-700 font-medium">Full Address</label>
          <textarea
            name="fullAddress"
            rows="2"
            value={data.fullAddress}
            onChange={(e)=>onChange(e.target.name, e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Shop no, Building, Street..."
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-3 pt-2">
          <button
            onClick={onBack}
            className="flex-1 py-2 rounded-md border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition active:scale-95"
          >
            ← Back
          </button>
          <button
            onClick={() => onNext(data)}
            className="flex-[1.5] py-2 rounded-md text-white text-sm font-medium bg-linear-to-r from-[#5F3DC4] to-[#7B5DE8] shadow-md transition active:scale-95"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalonAddressRegistrationForm;