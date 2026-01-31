import React from "react";
import {
  MapPin,
  ShieldCheck,
  Sparkles,
  Calendar,
  Scissors,
} from "lucide-react";
import { PhoneMockup } from "../../components/User/MockPhone";
import MockPhoneMobile from "./MockPhoneMobile";

export const HeroSection2 = () => {
  const steps = [
    {
      icon: <MapPin size={18} />,
      title: "Find Salon from home",
      desc: "Top rated spots near you",
    },
    {
      icon: <Scissors size={18} />,
      title: "Pick Service from home",
      desc: "Hair, Skin & Grooming",
    },
    {
      icon: <Calendar size={18} />,
      title: "Book Slot from home",
      desc: "Instant confirmation",
    },
  ];

  return (
    <section className="relative bg-white font-[Poppins]">
      {/* ================= MOBILE ================= */}
<div className="md:hidden px-4 mb-30">
  <div className="flex items-start justify-between gap-4">
    
    {/* LEFT CONTENT */}
    <div className="w-1/2">
      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-50 text-rose-600 text-[9px] font-bold uppercase tracking-widest mb-3">
        <Sparkles size={10} />
        Home Service
      </div>

      <h2 className="text-lg font-extrabold text-slate-900 mb-4 leading-snug">
        Salon at your <br />
        <span className="text-rose-500">Doorstep</span>
      </h2>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
              {React.cloneElement(step.icon, { size: 12 })}
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xs">
                {step.title}
              </h4>
              <p className="text-slate-500 text-[10px] leading-tight">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* RIGHT PHONE */}
    
        <MockPhoneMobile />


  </div>
</div>


      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block pt-12 pb-32 lg:pt-5 lg:pb-40">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles size={14} />
              <span>Home Service Available</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
              Salon at your <br />
              <span className="text-rose-500 italic font-serif font-light">
                Doorstep
              </span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="p-4 rounded-3xl bg-slate-50 border border-slate-100"
                >
                  <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center mb-3">
                    {step.icon}
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    {step.title}
                  </h4>
                  <p className="text-slate-400 text-[11px]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <button className="px-10 py-5 bg-rose-600 text-white rounded-full font-black text-sm uppercase tracking-widest shadow-xl">
              Book Home Service
            </button>
          </div>

          <div className="relative flex justify-center">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};
