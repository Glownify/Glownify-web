import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeSaloonsByCategory } from "../../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

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

  if (loading) return <div className="p-10 animate-pulse bg-gray-50 h-64 rounded-xl" />;

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto relative group">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 capitalize">
            {category} <span className="text-indigo-600">Salons</span>
          </h2>
        </div>
        <button onClick={() => navigate("/salons")} className="text-indigo-600 text-sm font-semibold flex items-center gap-1">
          View all <ArrowRight size={16} />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity disabled:hidden"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity disabled:hidden"
      >
        <ChevronRight size={24} />
      </button>

      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={20}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          0: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 5 },
        }}
        loop={homeSaloonsByCategory.length > 4}
        className="w-full"
      >
        {homeSaloonsByCategory.map((salon) => (
          <SwiperSlide key={salon._id} className="h-full">
            <div
              onClick={() => navigate(`/salon/${salon._id}`)}
              /* h-[380px]: Sets a specific fixed height 
                 flex flex-col: Allows us to use justify-between 
              */
              className="flex flex-col h-[400px] group/card bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer mb-4"
            >
              {/* Image Section - Fixed height */}
              <div className="relative h-48 min-h-[192px] overflow-hidden">
                {salon.galleryImages?.length > 0 ? (
                  <img
                    src={salon.galleryImages[0]}
                    alt={salon.shopName}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400">No Image</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-bold text-sm truncate w-40">{salon.shopName}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-white/80">
                    <MapPin size={10} /> {salon.location?.city}
                  </div>
                </div>
              </div>

              {/* Content Section - Flex grow takes up remaining space */}
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Top Services</p>
                  {mockServices.map((s, i) => (
                    <div key={i} className="flex justify-between text-xs text-slate-600">
                      <span>{s.name}</span>
                      <span className="font-bold text-slate-900">₹{s.price}</span>
                    </div>
                  ))}
                </div>

                {/* Footer - Always at the bottom due to flex-grow above */}
                <div className="pt-3 border-t flex justify-between items-center">
                  <span className="text-[10px] font-bold text-green-500 uppercase">Open</span>
                  <span className="text-indigo-600 text-xs font-bold">Book Now →</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSaloons;