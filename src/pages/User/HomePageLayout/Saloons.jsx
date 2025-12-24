import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import {
  MapPin,
  Star,
  ShieldCheck,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* -------------------- Salon Card -------------------- */
const SaloonCard = ({ salon }) => {
  const navigate = useNavigate();

  return (
    <div className="min-w-[260px] md:min-w-[280px] snap-start group/card">
      {/* Image */}
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 shadow-sm border border-rose-50">
        <img
          src={
            salon.galleryImages?.[0] ||
            "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop"
          }
          alt={salon.shopName}
          className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

        {/* Wishlist */}
        <button className="absolute top-4 right-4 w-8 h-8 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-rose-500 transition shadow-lg">
          <Heart size={16} />
        </button>

        {/* Category + Verified */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
          <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase text-slate-800 shadow-lg tracking-wider">
            {salon.salonCategory?.replace(/([A-Z])/g, " $1").trim() ||
              "Beauty Salon"}
          </span>

          {salon.verifiedByAdmin && (
            <div className="bg-emerald-500 text-white p-1 rounded-full shadow-lg">
              <ShieldCheck size={14} />
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="px-1">
        <div className="flex justify-between items-center mb-0.5">
          <h3 className="text-lg font-bold text-slate-800 truncate pr-2">
            {salon.shopName}
          </h3>

          <div className="flex items-center gap-1 shrink-0">
            <Star size={12} className="fill-rose-400 text-rose-400" />
            <span className="text-xs font-bold text-slate-700">
              {salon.averageRating || "4.8"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
          <MapPin size={12} className="text-rose-300" />
          <span className="truncate">
            {salon.location?.city || "New Delhi"}
          </span>
        </div>

        <button
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-rose-600 transition-all shadow-md active:scale-95"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

/* -------------------- Featured Salons -------------------- */
const Saloons = ({ salons = [], gender, loading = false }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  console.log("Featured Salons:", salons);
  console.log(gender);

  return (
    <>
      {/* Section Header */}
      <section className="px-6 pt-16 pb-12 text-center">
        <span className="text-rose-500 font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
          Premium Selection
        </span>
        <h1 className="text-4xl md:text-6xl font-light text-slate-900">
          Featured{" "}
          <span className="font-serif italic text-rose-500">Salons</span>
        </h1>
      </section>

      {/* Slider */}
      <div className="max-w-7xl mx-auto px-6 relative group">
        {/* Navigation */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-xl text-rose-500 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-xl text-rose-500 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Embla */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6 pb-10">
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="min-w-[280px] h-[400px] bg-rose-50/50 animate-pulse rounded-[2.5rem]"
                  />
                ))
              : salons.map((salon) => (
                  <SaloonCard key={salon._id} salon={salon} gender={gender} />
                ))}
          </div>
        </div>

        {/* Progress Bar (static for now) */}
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-4 max-w-xs mx-auto">
          <div className="h-full bg-rose-500 w-1/3 rounded-full" />
        </div>
      </div>
    </>
  );
};

export default Saloons;
