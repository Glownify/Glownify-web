import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

const Categories = ({ categories, gender }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!categories?.length) return null;

  // Dynamic Theme Colors
  const isMen = gender?.toLowerCase() === "men";
  const themeColor = isMen ? "blue" : "rose";

  // Tailwind class mappings to ensure stability
  const styles = {
    text: isMen ? "text-blue-500" : "text-rose-500",
    bg: isMen ? "bg-blue-500" : "bg-rose-500",
    bgLight: isMen ? "bg-blue-50" : "bg-rose-50",
    border: isMen ? "border-blue-50" : "border-rose-50",
    borderHover: isMen ? "group-hover:border-blue-200" : "group-hover:border-rose-200",
    shadow: isMen ? "group-hover:shadow-blue-100" : "group-hover:shadow-rose-100",
    hoverText: isMen ? "group-hover:text-blue-600" : "group-hover:text-rose-600",
  };

  return (
    <section className="py-12 px-6 lg:px-12 w-full mx-auto group/cat-section">
      <div className="mb-8 flex justify-between items-center px-2">
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">
            {gender.toUpperCase() + " "}
            <span className={`${styles.text} font-serif italic font-light block md:inline`}>
              Categories
            </span>
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className={`h-px w-12 ${styles.bgLight} mr-2`} />
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-60 text-slate-500`}>Select Style</p>
        </div>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          ref={prevRef}
          className={`absolute -left-2 top-[30%] -translate-y-1/2 z-30 w-10 h-10 bg-white shadow-lg border ${styles.border} rounded-full flex items-center justify-center ${styles.text} opacity-0 group-hover/cat-section:opacity-100 transition-all hover:${styles.bg} hover:text-white disabled:hidden scale-90 hover:scale-100`}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          ref={nextRef}
          className={`absolute -right-2 top-[30%] -translate-y-1/2 z-30 w-10 h-10 bg-white shadow-lg border ${styles.border} rounded-full flex items-center justify-center ${styles.text} opacity-0 group-hover/cat-section:opacity-100 transition-all hover:${styles.bg} hover:text-white disabled:hidden scale-90 hover:scale-100`}
        >
          <ChevronRight size={20} />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          spaceBetween={16}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 4, },
            640: { slidesPerView: 6 },
            1024: { slidesPerView: 8 },
            1280: { slidesPerView: 10 },
          }}
          slidesPerView="auto"
          className="categories-swiper pb-4!"
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id} className="w-25! md:w-32.5!">
              <div className="flex flex-col items-center group cursor-pointer">
                {/* Smaller Squircle Container */}
                <div className={`relative w-full aspect-square bg-white border ${styles.border} rounded-4xl md:rounded-[2.5rem] flex items-center justify-center mb-3 transition-all duration-500 group-hover:shadow-xl ${styles.shadow} ${styles.borderHover} group-hover:-translate-y-1 overflow-hidden`}>

                  <div className={`absolute inset-0 ${styles.bgLight} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${styles.bg} translate-y-full group-hover:translate-y-0 transition-transform duration-300`} />
                </div>

                <h3 className={`text-slate-800 font-bold text-xs md:text-sm text-center tracking-tight transition-colors ${styles.hoverText}`}>
                  {category.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;