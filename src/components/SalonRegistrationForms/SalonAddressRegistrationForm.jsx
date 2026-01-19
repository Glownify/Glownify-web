import React from "react";
import { useNavigate } from "react-router-dom";

const SalonAddressRegistrationForm = ({onNext,onBack}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center px-4 sm:px-6 lg:px-8 py-4 ">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-md px-4 sm:px-6 py-6">
        {/* Form Header */}
        <div className="mt-6 sm:mt-8 mb-4">
          {/* <!-- Progress bar --> */}

          <div className="w-full h-[3px] bg-gray-200 rounded-full mb-6">
            <div className="h-[3px] w-2/3 bg-purple-600 rounded-full"></div>
          </div>

          <h2 className="text-center font-semibold text-gray-800 text-sm sm:text-base">
            Step 2 of 3: Salon Address & Location
          </h2>

          <p className="text-center text-xs sm:text-sm text-gray-500 mt-2 mb-6">
            Enter your salon address and pin its exact location on the map.
          </p>
        </div>
        {/* Form */}
        <div className="pt-6 sm:pt-8 py-6">
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search your salon location"
              className="w-full rounded-md border border-gray-300
               pl-9 pr-10 py-2 text-sm text-gray-700
               focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 text-sm cursor-pointer">
              📍
            </span>
          </div>

          <div className="mb-6 relative w-full h-[210px] rounded-md overflow-hidden border border-gray-200">
            {/* Map placeholder */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              Google Map Preview
            </div>

            {/* Use Current Location – overlay */}
            <button
              className="absolute top-3 right-3 bg-white px-3 py-1.5
               rounded-md border text-xs font-medium
               text-purple-600 shadow-sm flex items-center gap-1"
            >
              📍 Use Current Location
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-4">
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Country
              </label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300
           px-3 py-2 text-sm text-gray-700
           focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>India</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium">
                State / Province
              </label>
              <input
                type="text"
                placeholder="Delhi"
                className="mt-1 w-full rounded-md border border-gray-300
           px-3 py-2 text-sm text-gray-700
           focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-700 font-medium">City</label>
              <input
                className="mt-1 w-full rounded-md border border-gray-300
           px-3 py-2 text-sm text-gray-700
           focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium">
                Area / Locality
              </label>
              <input
                className="mt-1 w-full rounded-md border border-gray-300
           px-3 py-2 text-sm text-gray-700
           focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-700 font-medium">
              Pincode / Zip
            </label>
            <input
              className="mt-1 w-full rounded-md border border-gray-300
           px-3 py-2 text-sm text-gray-700
           focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-700 font-medium">
              Full Address
            </label>
            <input
              className="mt-1 w-full rounded-md border border-gray-300
           px-3 py-2 text-sm text-gray-700
           focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={onBack}
              className="px-6 py-2 rounded-md border border-gray-300
               text-sm text-gray-600 hover:bg-gray-50
               flex items-center gap-1 w-full sm:w-auto"
            >
              ← Back
            </button>

            <button
              onClick={onNext}
              className="px-8 py-2 rounded-md text-white text-sm font-medium
               bg-gradient-to-r from-[#5F3DC4] to-[#7B5DE8]
               shadow-md shadow-purple-300/40 w-full sm:w-auto"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonAddressRegistrationForm;
