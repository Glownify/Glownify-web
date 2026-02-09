import React, { useState } from "react";

const BasicInfoRegistrationForm = ({ onNext,data,onChange }) => {
  // const [form, setForm] = useState({
  //   salonname: "",
  //   salonType: "Unisex",
  //   mobileno: "",
  //   watsupno: "",
  //   email: "",
  // });


  return (
    <div className="w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-md px-4 sm:px-6 py-6">
      
      {/* Form Header */}
      <div className="mt-6 sm:mt-8 mb-4">
        {/* Progress bar */}
        {/* <div className="w-full h-[3px] bg-gray-200 rounded-full mb-6">
          <div className="h-[3px] w-1/3 bg-purple-600 rounded-full"></div>
        </div>

        <h2 className="text-center font-semibold text-gray-800 text-sm sm:text-base">
          Step 1 of 3: Basic Salon Information
        </h2> */}

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
            onChange={(e)=>onChange(e.target.name, e.target.value)}
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
                  onChange={(e)=>onChange(e.target.name, e.target.value)}
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
              onChange={(e)=>onChange(e.target.name, e.target.value)}
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
              onChange={(e)=>onChange(e.target.name, e.target.value)}
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
            onChange={(e)=>onChange(e.target.name, e.target.value)}
            type="email"
            placeholder="Enter Email Address"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={() => onNext(data)} // Passing the form data back to parent
            className="w-full sm:w-40 py-2 rounded-md text-white font-medium text-sm bg-linear-to-r from-[#5F3DC4] via-[#6D4BCF] to-[#7B5DE8] shadow-lg hover:opacity-90 transition active:scale-95 tracking-wide"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoRegistrationForm;