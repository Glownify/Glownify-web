import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeSaloonsByCategory } from "../../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Star, Clock } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomeSaloons = ({ category, lat, lng }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { homeSaloonsByCategory = [], loading } = useSelector((state) => state.user);

  const mockServices = [
    { name: "Haircut", price: 299 },
    { name: "Facial", price: 599 },
    { name: "Shaving", price: 199 },
  ];

  useEffect(() => {
    if (category && lat && lng) {
      dispatch(fetchHomeSaloonsByCategory({ category, lat, lng }));
    }
  }, [dispatch, category, lat, lng]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="h-8 w-64 bg-slate-100 animate-pulse rounded mb-8" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="min-w-55 h-100 bg-slate-50 animate-pulse rounded-2xl border" />
          ))}
        </div>
      </div>
    );
  }

  // Hide component if no data to keep the landing page clean
  if (!homeSaloonsByCategory?.length) return null;

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto group">
      {/* Header Section */}
      <div className="flex items-end justify-between mb-8 px-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight capitalize">
            {category} <span className="text-indigo-600">Salons</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">Premium grooming services in your area</p>
        </div>
        <button 
          onClick={() => navigate("/salons")} 
          className="group/btn flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300"
        >
          View All <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Custom Navigation */}
        <button
          ref={prevRef}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white shadow-xl rounded-full flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:text-white disabled:hidden"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          ref={nextRef}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white shadow-xl rounded-full flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:text-white disabled:hidden"
        >
          <ChevronRight size={22} />
        </button>

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={20}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1.3, spaceBetween: 15 },
            640: { slidesPerView: 2.3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-10! pt-2!"
        >
          {homeSaloonsByCategory.map((salon) => (
            <SwiperSlide key={salon._id}>
              <div
                onClick={() => navigate(`/salon/${salon._id}`)}
                className="flex flex-col h-87.5 group/card bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative h-44 overflow-hidden">
                  {salon.galleryImages?.length > 0 ? (
                    <img
                      src={salon.galleryImages[0]}
                      alt={salon.shopName}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-slate-50 text-slate-300">
                       <Star size={32} strokeWidth={1} />
                    </div>
                  )}
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star size={10} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-bold text-slate-800">4.7</span>
                  </div>

                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-bold text-white text-base leading-tight truncate">
                      {salon.shopName}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-white/80 mt-1 uppercase font-medium tracking-wide">
                      <MapPin size={10} className="text-indigo-400" /> 
                      {salon.location?.city}
                    </div>
                  </div>
                </div>

                {/* Body Section */}
                <div className="p-5 flex flex-col grow bg-white">
                  <div className="space-y-2.5 grow">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Service Menu</p>
                    {mockServices.map((s, i) => (
                      <div key={i} className="flex justify-between items-center text-xs group/item">
                        <span className="text-slate-600">{s.name}</span>
                        <div className="h-px grow mx-2 border-b border-dotted border-slate-200" />
                        <span className="font-bold text-slate-900">₹{s.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Section */}
                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">Open Now</span>
                    </div>
                    <div className="text-indigo-600 text-xs font-bold flex items-center gap-1 group-hover/card:translate-x-1 transition-transform">
                      Book <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSaloons;