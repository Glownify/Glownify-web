import React from "react";
import { MapPin, Star, ShieldCheck, Sparkles, Calendar, Scissors } from "lucide-react";

const HeroSection2 = () => {
  const steps = [
    { icon: <MapPin size={22} />, title: "Find Salon from home", desc: "Top rated spots near you" },
    { icon: <Scissors size={22} />, title: "Pick Service from home", desc: "Hair, Skin & Grooming" },
    { icon: <Calendar size={22} />, title: "Book Slot from home", desc: "Instant confirmation" },
  ];

  return (
    <section className="relative bg-white pb-20 overflow-hidden font-[Poppins]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles size={14} />
            <span>Premium Salon Experience</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Elevate Your <br />
            <span className="text-rose-500 italic font-serif font-light">
              Style
            </span>{" "}
            Instantly
          </h1>

          <p className="mb-8 text-slate-500 text-lg md:text-xl font-medium">
            Book your salon appointment in just 3 easy steps
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className="p-4 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-rose-200 transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-rose-500 shadow-sm group-hover:bg-rose-500 group-hover:text-white transition-all mb-3">
                  {step.icon}
                </div>
                <h4 className="font-bold text-slate-800 text-sm">
                  {step.title}
                </h4>
                <p className="text-slate-400 text-[11px] font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <button className="px-10 py-5 bg-slate-900 text-white rounded-4xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-rose-600 hover:-translate-y-1 transition-all active:scale-95">
            Explore All Salons
          </button>
        </div>

        {/* Right Side */}
        <div className="relative flex justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rose-50 rounded-full blur-3xl opacity-50 -z-10"></div>

          {/* Phone Mockup */}
          <div className="w-72 h-137.5 bg-slate-900 rounded-[3rem] p-3 shadow-2xl relative border-[6px] border-slate-800">
            <div className="w-24 h-6 bg-slate-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl z-20"></div>

            <div className="bg-white w-full h-full rounded-[2.2rem] overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-50">
                <p className="text-[10px] font-black uppercase text-rose-500 tracking-widest">
                  Trending Now
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {[
                  {
                    name: "Glow Up Studio",
                    rate: "4.9",
                    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
                  },
                  {
                    name: "Stylista Salon",
                    rate: "4.8",
                    img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-3xl overflow-hidden border border-slate-50 bg-white shadow-sm"
                  >
                    <img
                      src={s.img}
                      alt={s.name}
                      className="h-28 w-full object-cover"
                    />
                    <div className="p-3">
                      <div className="flex justify-between items-center">
                        <h5 className="font-bold text-slate-800 text-xs">
                          {s.name}
                        </h5>
                        <div className="flex items-center gap-0.5 text-rose-500 text-[10px] font-bold">
                          <Star size={10} fill="currentColor" /> {s.rate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-6 md:right-0 bg-white p-4 rounded-4xl shadow-2xl border border-rose-50 flex items-center gap-3 animate-bounce-slow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Verified
              </p>
              <p className="font-black text-slate-800">100+ Salons</p>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      {/* <div className="mt-20 py-6 bg-slate-900 -rotate-1 w-[110%] -ml-[5%] shadow-2xl">
        <marquee scrollamount="10">
          <div className="flex gap-20 text-white/90 font-bold uppercase tracking-[0.4em] text-xs">
            <span>• INSTANT BOOKING</span>
            <span className="text-rose-400">• VERIFIED PROFESSIONALS</span>
            <span>• NO WAITING TIME</span>
            <span className="text-rose-400">• 5-STAR SERVICE</span>
            <span>• LUXURY EXPERIENCE</span>
          </div>
        </marquee>
      </div> */}
    </section>
  );
};

export default HeroSection2;
