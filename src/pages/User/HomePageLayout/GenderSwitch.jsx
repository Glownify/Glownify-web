import React from 'react';
import men from '../../../assets/men.png';
import woman from '../../../assets/woman.png';

export const GenderSwitch = ({ gender, setGender }) => {
  return (
    <div className="flex justify-center mt-6 w-full">
      {/* Main Container (Increased Width) */}
      <div className="relative flex w-full max-w-[480px] p-1.5 bg-gray-100/90 backdrop-blur-xl rounded-2xl border border-gray-200/60 shadow-md">
        
        {/* Sliding Indicator */}
        <div
          className={`absolute top-1.5 bottom-1.5 left-1.5 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-white rounded-[0.95rem] shadow-md border border-gray-100 ${
            gender === 'women'
              ? 'w-[calc(50%-6px)] translate-x-0'
              : 'w-[calc(50%-6px)] translate-x-full'
          }`}
        />

        {/* Women Tab */}
        <button
          onClick={() => setGender('women')}
          className={`relative z-10 flex flex-1 items-center justify-center gap-3 px-6 py-4 rounded-xl text-[18px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
            gender === 'women'
              ? 'text-rose-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <img className="w-14 h-14" src={woman} alt="Women" />
          <span>Women</span>
        </button>

        {/* Men Tab */}
        <button
          onClick={() => setGender('men')}
          className={`relative z-10 flex flex-1 items-center justify-center gap-3 px-6 py-4 rounded-xl text-[18px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
            gender === 'men'
              ? 'text-slate-900'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <img className="w-14 h-14" src={men} alt="Men" />
          <span>Men</span>
        </button>

      </div>
    </div>
  );
};
