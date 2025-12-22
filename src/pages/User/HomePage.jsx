import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFeaturedSaloons } from "../../redux/slice/userSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import SaloonCard from "../User/HomePageLayout/SaloonCard";
import Hero from "./HomePageLayout/Hero";
import { fetchAllCategories } from "../../redux/slice/userSlice";
import Categories from "./HomePageLayout/Categories";

const HomePage = () => {
  const dispatch = useDispatch();
  const { salons, loading } = useSelector((state) => state.user);
  const { categories} = useSelector((state) => state.user);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    skipSnaps: false,
  });

  useEffect(() => {
    dispatch(fetchAllFeaturedSaloons());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  console.log("Categories:", categories);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <Hero />

        {/* Featured Salons Slider */}
      <section className="px-6 pt-16 pb-12 text-center">
        <span className="text-rose-500 font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
          Premium Selection
        </span>
        <h1 className="text-4xl md:text-6xl font-light text-slate-900 tracking-tight">
          Featured <span className="font-serif italic text-rose-500">Salons</span>
        </h1>
      </section>

      <div className="max-w-7xl mx-auto px-6 relative group">
        {/* Navigation */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-xl text-rose-500 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-xl text-rose-500 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>

        {/* Embla Slider */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6 pb-10">
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="min-w-[300px] h-[400px] bg-rose-50/50 animate-pulse rounded-[2.5rem]"
                  />
                ))
              : salons?.map((salon) => (
                  <SaloonCard key={salon._id} salon={salon} />
                ))}
          </div>
        </div>

        {/* Progress */}
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-4 max-w-xs mx-auto">
          <div className="h-full bg-rose-500 w-1/3 rounded-full" />
        </div>

      </div>
        <Categories categories={categories} />
    </div>
  );
};

export default HomePage;
