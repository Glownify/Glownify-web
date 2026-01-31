import {
  MapPin,
  Scissors,
  Calendar,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { PhoneMockup } from "../../components/User/MockPhone";
import MockPhoneMobile from "./MockPhoneMobile";

export const HeroSection1 = () => {
  const steps = [
    {
      icon: <MapPin size={18} />,
      title: "Choose Your Salon",
      desc: "Browse nearby salons and pick your favorite one.",
    },
    {
      icon: <Scissors size={18} />,
      title: "Select Your Services",
      desc: "Haircut, grooming, facial & more.",
    },
    {
      icon: <Calendar size={18} />,
      title: "Book Your Slot",
      desc: "Instant confirmation",
    },
  ];

  return (
    <section className="relative font-[Poppins]">
      {/* ================= MOBILE VERSION ================= */}
<div className="md:hidden w-full bg-white flex items-center justify-center px-4">
  <div className="w-full flex items-center justify-between gap-4">
    
    {/* LEFT SIDE TEXT */}
    <div className="w-1/2">
      <h2 className="text-lg font-bold leading-tight mb-4">
        Book a Beautician/Barber at Home
      </h2>

      <div className="flex items-start gap-3">
        <div className="bg-purple-100 text-lg p-2 rounded-lg">👩</div>
        <div>
          <p className="text-purple-600 font-semibold text-sm">
            Step 1 Choose Your Beautician
          </p>
          <p className="text-gray-500 mt-1 text-xs">
            Browse beauticians and pick your favorite.
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE PHONE */}
    <MockPhoneMobile />
  </div>
</div>


      {/* ================= DESKTOP VERSION ================= */}
      <div className="hidden md:block pt-20 pb-32 lg:pt-5 lg:pb-40">
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

            <button className="px-10 py-5 bg-slate-900 text-white rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-rose-600 hover:-translate-y-1 transition-all active:scale-95">
              Explore All Salons
            </button>
          </div>

          {/* Right Side */}
          <div className="relative flex justify-center lg:mt-0 mt-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rose-50 rounded-full blur-3xl opacity-50 -z-10"></div>
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
      </div>
    </section>
  );
};
