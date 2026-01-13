import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIndependentProfessionals } from '../../../redux/slice/userSlice';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const IndependentProfessionals = () => {
  const dispatch = useDispatch();
  const { independentProfessionals, loading } = useSelector((state) => state.user);
  
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperLoaded, setSwiperLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchIndependentProfessionals());
  }, [dispatch]);

  // IMPORTANT: This effect forces Swiper to recognize the buttons after they mount
  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setSwiperLoaded(true);
    }
  }, []);

  if (loading) return <div className="py-20 text-center animate-pulse">Loading professionals...</div>;
  if (!independentProfessionals?.length) return null;

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <h1 className='text-2xl px-6 py-5 md:text-3xl font-bold text-slate-900 capitalize'>
        Independent Professionals
      </h1>

      <div className="relative group px-6">
        
        {/* Navigation Buttons - Added z-40 and pointer-events-auto */}
        <button
          ref={prevRef}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 bg-white shadow-xl border border-slate-200 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-20"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          ref={nextRef}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 bg-white shadow-xl border border-slate-200 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-20"
        >
          <ChevronRight size={24} />
        </button>

        {/* FIX: We only pass the navigation config once swiperLoaded is true 
            to ensure prevRef.current is not null 
        */}
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={24}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          // This re-links the navigation after the swiper instance is created
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper.params.navigation) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              }
            });
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-14 pt-4"
        >
          {independentProfessionals.map((pro) => (
            <SwiperSlide key={pro._id} className="h-full">
              <div className="flex flex-col h-[400px] bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  {pro.profilePhoto ? (
                    <img src={pro.profilePhoto} alt={pro.user?.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-white/95 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-800 shadow-sm">
                    {pro.experienceYears} yrs exp
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-base truncate">{pro.user?.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-1.5 py-0.5 bg-indigo-600 text-[9px] font-bold uppercase rounded">{pro.gender}</span>
                      <div className="flex items-center gap-1 text-[10px] text-white/90">
                        <MapPin size={10} />
                        <span>{pro.location?.radiusInKm || 0} km</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="space-y-2 flex-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase">Specializations</p>
                    {pro.specializations?.slice(0, 3).map((spec) => (
                      <div key={spec._id} className="flex justify-between text-xs text-slate-600">
                        <span className="truncate">{spec.name}</span>
                        <span className="text-slate-400 italic">{spec.gender}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-[10px] text-green-600 font-medium flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                       Available
                    </span>
                    <span className="text-indigo-600 text-xs font-bold">Book Now</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default IndependentProfessionals;