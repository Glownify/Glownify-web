import React, { memo } from 'react';
import { Check, User, Clock, ShieldCheck } from 'lucide-react';

const IndependentHeader = ({ green, icon1, green2, icon2 }) => {
  return (
    <div className="w-full bg-white">
      {/* Banner Header - Modernized with better spacing and subtle shadow */}
      <header 
        className="px-8 py-10 text-white shadow-inner relative overflow-hidden" 
        style={{ background: "var(--pink-gradient, linear-gradient(135deg, #db2777 0%, #f472b6 100%))" }}
      >
        {/* Subtle decorative element for a modern look */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight">Earn with Us</h1>
          <p className="text-pink-100 font-medium mt-2 max-w-md leading-relaxed">
            Professional Registration — Join our community of experts and grow your career.
          </p>
        </div>
      </header>

      {/* Progress Navigation - Stepper Style */}
      <nav className="px-6 py-8 relative">
        {/* Progress Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden md:block px-20">
            <div className="h-full bg-pink-200 transition-all duration-500" style={{ width: green2 ? '100%' : green ? '50%' : '0%' }}></div>
        </div>

        <div className="grid grid-cols-3 relative z-10">
          
          {/* Step 1: Professional Details */}
          <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
            <div className={`flex items-center justify-center w-12 h-12 rounded-2xl shadow-sm transition-all duration-300 border-2 ${green ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-pink-600 text-pink-600'}`}>
              {icon1 ? <Check size={24} strokeWidth={2.5} /> : <User size={24} strokeWidth={2} />}
            </div>
            <div className="mt-2 md:mt-0">
              <p className={`text-sm font-bold ${green ? 'text-green-600' : 'text-gray-800'}`}>Details</p>
              <p className="hidden md:block text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Step 01</p>
            </div>
          </div>

          {/* Step 2: Availability */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left">
            <div className={`flex items-center justify-center w-12 h-12 rounded-2xl shadow-sm transition-all duration-300 border-2 ${green2 ? 'bg-green-500 border-green-500 text-white' : green ? 'bg-white border-pink-600 text-pink-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
              {icon2 ? <Check size={24} strokeWidth={2.5} /> : <Clock size={24} strokeWidth={2} />}
            </div>
            <div className="mt-2 md:mt-0">
              <p className={`text-sm font-bold ${green2 ? 'text-green-600' : green ? 'text-gray-800' : 'text-gray-400'}`}>Availability</p>
              <p className="hidden md:block text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Step 02</p>
            </div>
          </div>

          {/* Step 3: Verification */}
          <div className="flex flex-col md:flex-row items-center justify-end gap-3 text-center md:text-left">
            <div className={`flex items-center justify-center w-12 h-12 rounded-2xl shadow-sm border-2 ${green2 ? 'bg-white border-pink-600 text-pink-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
              <ShieldCheck size={24} strokeWidth={2} />
            </div>
            <div className="mt-2 md:mt-0">
              <p className={`text-sm font-bold ${green2 ? 'text-gray-800' : 'text-gray-400'}`}>Verification</p>
              <p className="hidden md:block text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Step 03</p>
            </div>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default memo(IndependentHeader);