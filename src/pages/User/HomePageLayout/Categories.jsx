import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

const Categories = ({ categories }) => {
  const [activeTab, setActiveTab] = useState('women');
  
  // Embla setup for Categories
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Re-initialize or scroll to start when tab changes
  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0);
  }, [activeTab, emblaApi]);

  const filteredCategories = categories?.filter(
    (cat) => cat.gender === activeTab || cat.gender === 'unisex'
  );

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto group/cat-section">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">
            <Sparkles size={14} /> <span>Explore Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Top <span className="text-rose-500 font-serif italic font-light">Categories</span>
          </h2>
        </div>

        <div className="flex p-1.5 bg-slate-100 rounded-[2rem] w-fit border border-slate-200 shadow-inner">
          {['women', 'men'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-white text-rose-600 shadow-md'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg border border-rose-50 rounded-full flex items-center justify-center text-rose-500 opacity-0 group-hover/cat-section:opacity-100 transition-all hover:bg-rose-50"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg border border-rose-50 rounded-full flex items-center justify-center text-rose-500 opacity-0 group-hover/cat-section:opacity-100 transition-all hover:bg-rose-50"
        >
          <ChevronRight size={20} />
        </button>

        {/* Embla Viewport */}
        <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <div className="flex gap-6 px-2">
            {filteredCategories?.map((category) => (
              <div
                key={category._id}
                className="flex-[0_0_140px] sm:flex-[0_0_160px] md:flex-[0_0_180px] flex flex-col items-center group"
              >
                {/* Icon Container */}
                <div className="relative w-full aspect-square bg-white border border-rose-50 rounded-[2.5rem] flex items-center justify-center mb-4 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-rose-100 group-hover:-translate-y-2 group-hover:border-rose-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-12 h-12 md:w-14 md:h-14 object-contain relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <p className="text-slate-700 font-bold text-sm tracking-tight group-hover:text-rose-600 transition-colors">
                  {category.name}
                </p>
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter mt-1">
                  {category.gender === 'unisex' ? 'Everyone' : activeTab === 'women' ? 'For Her' : 'For Him'}
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