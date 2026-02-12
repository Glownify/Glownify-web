import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUnisexSalonServices } from "../../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { MapPin, Star, ChevronRight, ChevronLeft, Zap } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const UnisexSalon = ({ lat, lng }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { unisexSalonServices, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUnisexSalonServices({ lat, lng }));
  }, [dispatch, lat, lng]);

  const mockServices = [
    { name: "Haircut", price: 299 },
    { name: "Facial", price: 599 },
    { name: "Hair Spa", price: 899 },
  ];

  if (loading) {
    return (
      <div className="px-4 md:px-8 lg:px-12 py-12 w-full mx-auto group">
        <div className="h-8 w-56 bg-slate-100 animate-pulse rounded mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-100 bg-slate-50 animate-pulse rounded-2xl border" />
          ))}
        </div>
      </div>
    );
  }

  if (!unisexSalonServices?.length) return null;

  return (
    <div className="px-4 md:px-8 lg:px-12 w-full mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Unisex Salon
          </h1>
        </div>

        {/* Custom Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <button
            ref={prevRef}
            className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all disabled:opacity-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            ref={nextRef}
            className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all disabled:opacity-20"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative group">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={24}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1.4, slidesPerGroup: 1, spaceBetween: 16 },
            640: { slidesPerView: 2.5, slidesPerGroup: 2 },
            1024: { slidesPerView: 5, slidesPerGroup: 5 },
          }}
          loop={unisexSalonServices.length > 5}
          className="pb-12!"
        >
          {unisexSalonServices.map((items) => (
            <SwiperSlide key={items._id}>
              <div
                onClick={() => navigate(`/salon/${items._id}`)}
                className="group/card flex flex-col h-87.5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative h-44 overflow-hidden">
                  {items.galleryImages?.length > 0 ? (
                    <img
                      src={items.galleryImages[0]}
                      alt={items.shopName}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300 uppercase text-[10px] tracking-widest font-bold">
                      Unisex Salon
                    </div>
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80" />

                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star size={10} className="text-amber-500 fill-amber-500" />
                    <span className="text-[11px] font-bold text-slate-800">4.8</span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">
                      {items.salonCategory}
                    </span>
                    <h3 className="font-bold text-white text-base leading-tight truncate mt-0.5">
                      {items.shopName}
                    </h3>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col grow">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-4">
                    <MapPin size={12} className="text-indigo-500" />
                    <span className="font-medium">
                      Nearby ({Math.round(items.distanceInMeters / 1000)} km)
                    </span>
                  </div>

                  <div className="space-y-2 grow">
                    {mockServices.map((s, i) => (
                      <div key={i} className="flex justify-between items-center text-xs">
                        <span className="text-slate-600">{s.name}</span>
                        <span className="font-bold text-slate-900">₹{s.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tight">Available</span>
                    </div>
                    <span className="text-indigo-600 text-[11px] font-extrabold uppercase flex items-center gap-1 group-hover/card:gap-2 transition-all">
                      Book Now <ChevronRight size={14} />
                    </span>
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

export default UnisexSalon;