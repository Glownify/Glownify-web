import {
  MapPin,
  Scissors,
  Calendar,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { PhoneMockup } from "../../components/User/MockPhone";

export const HeroSection1 = () => {
  const steps = [
    {
      icon: <MapPin size={22} />,
      title: "Find Salon",
      desc: "Top rated spots near you",
    },
    {
      icon: <Scissors size={22} />,
      title: "Pick Service",
      desc: "Hair, Skin & Grooming",
    },
    {
      icon: <Calendar size={22} />,
      title: "Book Slot",
      desc: "Instant confirmation",
    },
  ];
  return (
    <section className="relative pt-10 md:pt-20 pb-20 md:pb-32 lg:pt-5 lg:pb-40 font-[Poppins] overflow-hidden">
      <div className="w-full mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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

          <button className="px-10 py-5 bg-slate-900 text-white rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-rose-600 hover:-translate-y-1 transition-all active:scale-95">
            Explore All Salons
          </button>
        </div>

        {/* Right Side (Phone) */}
        <div className="relative flex justify-center lg:mt-0 mt-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rose-50 rounded-full blur-3xl opacity-50 -z-10 hidden md:block"></div>
          <PhoneMockup />

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-6 md:right-0 bg-white p-4 rounded-3xl shadow-2xl border border-rose-50 flex items-center gap-3 animate-bounce">
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
    </section>
  );
};

