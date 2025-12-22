import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Categories = ({ categories, gender }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    emblaApi?.scrollTo(0);
  }, [categories, emblaApi]);

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto group/cat-section">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          {gender === 'women' ? 'For Her' : 'For Him'}{' '}
          <span className="text-rose-500 font-serif italic font-light">
            Categories
          </span>
        </h2>
      </div>

      <div className="relative">
        <button
          onClick={scrollPrev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg border border-rose-50 rounded-full flex items-center justify-center text-rose-500 opacity-0 group-hover/cat-section:opacity-100"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={scrollNext}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg border border-rose-50 rounded-full flex items-center justify-center text-rose-500 opacity-0 group-hover/cat-section:opacity-100"
        >
          <ChevronRight size={20} />
        </button>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6 px-2">
            {categories.map((category) => (
              <div
                key={category._id}
                className="flex-[0_0_160px] flex flex-col items-center group"
              >
                <div className="relative w-full aspect-square bg-white border border-rose-50 rounded-[2.5rem] flex items-center justify-center mb-4 group-hover:shadow-xl">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-14 h-14 object-contain"
                  />
                </div>

                <p className="text-slate-700 font-bold text-sm">
                  {category.name}
                </p>

                <p className="text-[10px] text-slate-400 uppercase mt-1">
                  {category.gender === 'unisex' ? 'Everyone' : gender === 'women' ? 'For Her' : 'For Him'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;