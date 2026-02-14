import React, { memo } from 'react';
import { Check, User, Clock, ShieldCheck } from 'lucide-react';

const IndependentHeader = ({ green, icon1, green2, icon2 }) => {
  return (
    <div className="w-full bg-white">
      {/* Banner Header - Modernized with better spacing and subtle shadow */}
      <header
        className="px-5 py-7 sm:px-8 sm:py-10 text-white shadow-inner relative overflow-hidden"
        style={{ background: "var(--pink-gradient, linear-gradient(135deg, #db2777 0%, #f472b6 100%))" }}
      >
        {/* Subtle decorative element for a modern look */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Earn with Us</h1>
          <p className="text-pink-100 font-medium mt-1 sm:mt-2 max-w-md leading-relaxed text-sm sm:text-base">
            Professional Registration — Join our community of experts and grow your career.
          </p>
        </div>
      </header>

      {/* Progress Navigation - Stepper Style */}
      <nav className="px-2 sm:px-4 py-4 sm:py-6 relative">
        {/* Progress Line Background — sits behind the icons */}
        <div className="absolute top-8 sm:top-10 left-[16.6%] right-[16.6%] h-0.5 bg-gray-100">
          <div className="h-full bg-pink-200 transition-all duration-500" style={{ width: green2 ? '100%' : green ? '50%' : '0%' }}></div>
        </div>

        <div className="grid grid-cols-3 relative z-10">

          {/* Step 1: Details */}
          <div className="flex flex-col items-center text-center gap-1 sm:gap-2">
            <div className={`flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl shadow-sm transition-all duration-300 border-2 ${green ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-pink-600 text-pink-600'}`}>
              {icon1 ? <Check size={18} strokeWidth={2.5} /> : <User size={18} strokeWidth={2} />}
            </div>
            <div>
              <p className={`text-[10px] sm:text-xs font-bold ${green ? 'text-green-600' : 'text-gray-800'}`}>Details</p>
              <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-400 font-semibold hidden sm:block">Step 01</p>
            </div>
          </div>

          {/* Step 2: Availability */}
          <div className="flex flex-col items-center text-center gap-1 sm:gap-2">
            <div className={`flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl shadow-sm transition-all duration-300 border-2 ${green2 ? 'bg-green-500 border-green-500 text-white' : green ? 'bg-white border-pink-600 text-pink-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
              {icon2 ? <Check size={18} strokeWidth={2.5} /> : <Clock size={18} strokeWidth={2} />}
            </div>
            <div>
              <p className={`text-[10px] sm:text-xs font-bold ${green2 ? 'text-green-600' : green ? 'text-gray-800' : 'text-gray-400'}`}>Availability</p>
              <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-400 font-semibold hidden sm:block">Step 02</p>
            </div>
          </div>

          {/* Step 3: Verification */}
          <div className="flex flex-col items-center text-center gap-1 sm:gap-2">
            <div className={`flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl shadow-sm border-2 ${green2 ? 'bg-white border-pink-600 text-pink-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
              <ShieldCheck size={18} strokeWidth={2} />
            </div>
            <div>
              <p className={`text-[10px] sm:text-xs font-bold ${green2 ? 'text-gray-800' : 'text-gray-400'}`}>Verification</p>
              <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-400 font-semibold hidden sm:block">Step 03</p>
            </div>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default memo(IndependentHeader);