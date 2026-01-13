import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSalonsforhomeServices } from "../../../redux/slice/userSlice";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const SalonHomeServices = ({ category, lat, lng }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const dispatch = useDispatch();
  const { salonsforhomeServices, loading, error } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(fetchAllSalonsforhomeServices({ category, lat, lng }));
  }, [dispatch, category, lat, lng]);

  const mockServices = [
    { name: "Haircut", price: 299 },
    { name: "Facial", price: 599 },
    { name: "Hair Spa", price: 899 },
  ];

  if (loading) {
    return (
      <div className="w-full py-10 text-center text-slate-500">
        Loading nearby home salons services...
      </div>
    );
  }

  if (!salonsforhomeServices.length) {
    return (
      <div className="w-full py-10 text-center text-slate-500">
        No home salon services found
      </div>
    );
  }

  return (
     <div className="max-w-7xl mx-auto px-4">
      <h1 className="py-5 text-2xl md:text-3xl font-bold text-slate-900 capitalize">
        Home Salon Services
      </h1>

      {/* SLIDER SECTION */}
      <div className="relative group/cat-section">
        {/* LEFT ARROW */}
        <button
          ref={prevRef}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20
                     w-10 h-10 bg-white shadow-lg border rounded-full
                     flex items-center justify-center text-rose-500
                     opacity-0 group-hover/cat-section:opacity-100
                     transition-opacity"
        >
          <ChevronLeft size={20} />
        </button>

        {/* RIGHT ARROW */}
        <button
          ref={nextRef}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20
                     w-10 h-10 bg-white shadow-lg border rounded-full
                     flex items-center justify-center text-rose-500
                     opacity-0 group-hover/cat-section:opacity-100
                     transition-opacity"
        >
          <ChevronRight size={20} />
        </button>

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={24}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            0: { slidesPerView: 2, slidesPerGroup: 2 },
            640: { slidesPerView: 3, slidesPerGroup: 3 },
            1024: { slidesPerView: 5, slidesPerGroup: 5 },
          }}
          loop
          className="w-full"
        >
          {salonsforhomeServices.map((items) => (
            <SwiperSlide key={items._id}>
              {/* CARD (FIXED HEIGHT) */}
              <div
                className="h-[420px] flex flex-col bg-white rounded-2xl
                           border border-slate-100 shadow-sm
                           hover:shadow-2xl hover:-translate-y-1
                           transition-all cursor-pointer"
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
                <div className="p-5 flex flex-col flex-1">
                  {/* SERVICES (FIXED SPACE) */}
                  <div className="space-y-1 h-[72px] overflow-hidden">
                    {mockServices.map((s, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>{s.name}</span>
                        <span className="font-bold">₹{s.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* BOTTOM */}
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

export default SalonHomeServices;
