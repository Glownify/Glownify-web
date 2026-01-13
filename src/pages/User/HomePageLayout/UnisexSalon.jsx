import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUnisexSalonServices } from "../../../redux/slice/userSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const UnisexSalon = ({ lat, lng }) => {
  const dispatch = useDispatch();
  const { unisexSalonServices, loading, error } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(fetchAllUnisexSalonServices({ lat, lng }));
  }, [dispatch, lat, lng]);
  

  if (loading) {
    return (
      <div className="w-full py-10 text-center text-slate-500">
        Loading nearby home salons services...
      </div>
    );
  }
 
  
const mockServices = [
    { name: "Haircut", price: 299 },
    { name: "Facial", price: 599 },
    { name: "Hair Spa", price: 899 },
  ];


  
  return (
    <div className=" max-w-7xl mx-auto">
      <div>
        <h1 className=" px-6 py-5 text-2xl md:text-3xl font-bold text-slate-900 capitalize">
          Unisex Salon Services
        </h1>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerGroup={3} // 👈 ek swipe me 3 cards move
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: { slidesPerView: 2, slidesPerGroup: 2 },
            640: { slidesPerView: 3, slidesPerGroup: 3 },
            1024: { slidesPerView: 5, slidesPerGroup: 5 },
          }}
          loop={true}
          className="w-full"
        >
          {unisexSalonServices.map((items) => (
            <SwiperSlide key={items._id}>
              <div
                onClick={() => handleSalonClick(items._id)}
                className="px-3 py-3 bg-white rounded-2xl border shadow-sm hover:shadow-2xl transition-all h-full cursor-pointer"
              >
                {/* IMAGE */}
                <div className="relative h-[160px] overflow-hidden rounded-t-2xl">
                  {items.galleryImages?.length > 0 ? (
                    <img
                      src={items.galleryImages[0]}
                      alt={items.shopName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400 text-sm">
                      No Image Available
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                   <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold">
                  ⭐ 4.8
                </div>
                  <div className="absolute bottom-3 left-3 text-white space-y-1">
                    <h3 className="font-bold text-base truncate">
                      {items.shopName}
                    </h3>

                    <span className="inline-block px-2 py-0.5 bg-indigo-600/90 text-[10px] font-semibold rounded">
                      {items.salonCategory}
                    </span>

                    <div className="flex items-center gap-1 text-xs">
                      <MapPin size={12} />
                      Nearby ({Math.round(items.distanceInMeters / 1000)} km)
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col h-[220px]">
                  <div className="space-y-1 h-[72px] overflow-hidden">
                    {mockServices.map((s, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>{s.name}</span>
                        <span className="font-bold">₹{s.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t flex justify-between text-sm">
                    <span className="text-slate-400">Available Now</span>
                    <span className="text-indigo-600 font-bold">
                      Book Visit
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
