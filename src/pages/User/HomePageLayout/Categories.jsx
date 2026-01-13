import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

const Categories = ({ categories, gender }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto group/cat-section">
      {/* Header */}
      <div className="mb-10 flex justify-between items-end">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          {gender === "women" ? "For Her" : "For Him"}{" "}
          <span className="text-rose-500 font-serif italic font-light">
            Categories
          </span>
        </h2>
      </div>

      <div className="relative">
        {/* Custom Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg border border-rose-50 rounded-full flex items-center justify-center text-rose-500 opacity-0 group-hover/cat-section:opacity-100 transition-opacity disabled:opacity-0"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          ref={nextRef}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg border border-rose-50 rounded-full flex items-center justify-center text-rose-500 opacity-0 group-hover/cat-section:opacity-100 transition-opacity disabled:opacity-0"
        >
          <ChevronRight size={20} />
        </button>

        <Swiper
          modules={[Navigation, FreeMode]}
          onInit={(swiper) => {
            // Link custom buttons to swiper instance
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={24}
          slidesPerView="auto"
          freeMode={true}
          className="categories-swiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id} className="!w-[160px]">
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="relative w-full aspect-square bg-white border border-rose-50 rounded-[2.5rem] flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-xl group-hover:border-rose-100 group-hover:-translate-y-1">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <p className="text-slate-700 font-bold text-lg text-center">
                  {category.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;