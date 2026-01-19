import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const BasicInfoRegistrationForm = ({onNext}) => {
    
  const [form,setForm]=useState({salonname:"",salonType:"",mobileno:"",watsupno:"",email:""})
  const navigate = useNavigate();

  
  return (
   <div className="w-full  max-w-md sm:max-w-lg bg-white rounded-lg shadow-md px-4 sm:px-6 py-6">
        {/* Form Header */}
        <div className="mt-6 sm:mt-8 mb-4">
          {/* Progress bar */}
          <div className="w-full h-[3px] bg-gray-200 rounded-full mb-6">
            <div className="h-[3px] w-1/3 bg-purple-600 rounded-full"></div>
          </div>

          <h2 className="text-center font-semibold text-gray-800 text-sm sm:text-base">
            Step 1 of 3: Basic Salon Information
          </h2>

          <p className="text-center text-xs sm:text-sm text-gray-500 mt-2 mb-6">
            Enter your salon details to get started.
          </p>
        </div>
        {/* Form */}
        <div className="pt-6 sm:pt-8 py-6">
                      <button
              onClick={()=>console.log("abcd")}
              className="
      w-full sm:w-40
      py-2
      rounded-md
      text-white
      font-medium
      text-sm
      bg-gradient-to-r from-[#5F3DC4] via-[#6D4BCF] to-[#7B5DE8]
      shadow-lg
      hover:opacity-90 transition active:scale-95 tracking-wide
    "
            >
              Next
            </button>
          <div className="mb-4 ">
            <label className="text-sm text-gray-700 font-medium">
              Salon Name
            </label>
            <input
              value={form.salonname}
              onChange={()=>setForm(e.target.value)}
              type="text"
              placeholder="Enter Salon Name"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-700 font-medium block mb-2">
              Salon Type
            </label>

            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-700">
              <label className="flex items-center gap-2">
                <input type="radio" name="type" className="accent-purple-600" />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="type" className="accent-purple-600" />
                Female
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  checked
                  className="accent-purple-600"
                />
                Unisex
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-700 font-medium">
              Mobile Number
            </label>

            <div className="mt-1 flex w-full">
              <select className="border border-gray-300 rounded-l-md px-2 text-sm focus:outline-none">
                <option>+91</option>
              </select>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                className="w-full border border-gray-300 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Used for Contact & WhatsApp
            </p>
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-700 font-medium">
              Whatsapp Number
            </label>

            <div className="mt-1 flex w-full">
              <select className="border border-gray-300 rounded-l-md px-2 text-sm focus:outline-none">
                <option>+91</option>
              </select>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                className="w-full border border-gray-300 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Same as Mobile or Enter Different Number
            </p>
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-700 font-medium">
              Email <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={onNext}
              className="
      w-full sm:w-40
      py-2
      rounded-md
      text-white
      font-medium
      text-sm
      bg-gradient-to-r from-[#5F3DC4] via-[#6D4BCF] to-[#7B5DE8]
      shadow-lg
      hover:opacity-90 transition active:scale-95 tracking-wide
    "
            >
              Next
            </button>
          </div>
        </div>
      </div>
  );
};

export default BasicInfoRegistrationForm;
