import React, { memo } from 'react';
import { Check, Store, MapPin, FileImage, Clock } from 'lucide-react';

const SalonOwnerHeader = ({ step }) => {
    return (
        <div className="w-full bg-white">
            {/* Progress Navigation - Stepper Style */}
            <nav className="px-2 sm:px-4 py-4 sm:py-6 relative">
                {/* Progress Line Background — sits behind the icons */}
                <div className="absolute top-8 sm:top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gray-100">
                    <div 
                        className="h-full bg-purple-600 transition-all duration-700 ease-out" 
                        style={{ 
                            width: `${Math.max(0, (Number(step) - 1) * 33.33)}%` 
                        }}
                    ></div>
                </div>

                <div className="grid grid-cols-4 relative z-10">

                    {/* Step 1: Basic Info */}
                    <div className="flex flex-col items-center text-center gap-1 sm:gap-2">
                        <div className={`flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl shadow-sm transition-all duration-300 border-2 ${step > 1 ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-purple-600 text-purple-600'}`}>
                            {step > 1 ? <Check size={18} strokeWidth={2.5} /> : <Store size={18} strokeWidth={2} />}
                        </div>
                        <div>
                            <p className={`text-[10px] sm:text-xs font-bold ${step > 1 ? 'text-green-600' : 'text-gray-800'}`}>Basic Info</p>
                            <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-400 font-semibold hidden sm:block">Step 01</p>
                        </div>
                    </div>

                    {/* Step 2: Address */}
                    <div className="flex flex-col items-center text-center gap-1 sm:gap-2">
                        <div className={`flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl shadow-sm transition-all duration-300 border-2 ${step > 2 ? 'bg-green-500 border-green-500 text-white' : step === 2 ? 'bg-white border-purple-600 text-purple-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                            {step > 2 ? <Check size={18} strokeWidth={2.5} /> : <MapPin size={18} strokeWidth={2} />}
                        </div>
                        <div>
                            <p className={`text-[10px] sm:text-xs font-bold ${step > 2 ? 'text-green-600' : step === 2 ? 'text-gray-800' : 'text-gray-400'}`}>Address</p>
                            <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-400 font-semibold hidden sm:block">Step 02</p>
                        </div>
                    </div>

                    {/* Step 3: Hours & Partners */}
                    <div className="flex flex-col items-center text-center gap-1 sm:gap-2">
                        <div className={`flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl shadow-sm transition-all duration-300 border-2 ${step > 3 ? 'bg-green-500 border-green-500 text-white' : step === 3 ? 'bg-white border-purple-600 text-purple-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                            {step > 3 ? <Check size={18} strokeWidth={2.5} /> : <Clock size={18} strokeWidth={2} />}
                        </div>
                        <div>
                            <p className={`text-[10px] sm:text-xs font-bold ${step > 3 ? 'text-green-600' : step === 3 ? 'text-gray-800' : 'text-gray-400'}`}>Hours</p>
                            <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-400 font-semibold hidden sm:block">Step 03</p>
                        </div>
                    </div>

                    {/* Step 4: Documents */}
                    <div className="flex flex-col items-center text-center gap-1 sm:gap-2">
                        <div className={`flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl shadow-sm border-2 ${step === 4 ? 'bg-white border-purple-600 text-purple-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                            <FileImage size={18} strokeWidth={2} />
                        </div>
                        <div>
                            <p className={`text-[10px] sm:text-xs font-bold ${step === 4 ? 'text-gray-800' : 'text-gray-400'}`}>Docs</p>
                            <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-400 font-semibold hidden sm:block">Step 04</p>
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    );
};

export default memo(SalonOwnerHeader);
