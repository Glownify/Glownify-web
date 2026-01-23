import React from "react";
import {
  MapPin,
  ShieldCheck,
  Sparkles,
  Calendar,
  Scissors,
} from "lucide-react";
import { PhoneMockup } from "../../components/User/MockPhone";

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
      <div className="md:hidden px-5 pt-14 pb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-widest mb-5">
          <Sparkles size={12} />
          Home Service Available
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 mb-6 leading-snug">
          Salon at your <br />
          <span className="text-rose-500">Doorstep</span>
        </h2>

        <div className="relative pl-6 pb-16 space-y-8">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-1 bottom-1 w-px bg-rose-200" />

          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                {step.icon}
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  {step.title}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* <button className="mt-10 w-full py-4 bg-rose-600 text-white rounded-full font-black text-sm uppercase tracking-widest shadow-lg">
          Book Home Service
        </button> */}
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
