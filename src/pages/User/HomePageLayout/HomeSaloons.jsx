import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeSaloonsByCategory } from "../../../redux/slice/userSlice";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const HomeSaloons = ({ category, lat, lng }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    homeSaloonsByCategory = [],
    loading,
    error,
  } = useSelector((state) => state.user);
  const mockServices = [
    { name: "Haircut", price: 299 },
    { name: "Facial", price: 599 },
    { name: "Hair Spa", price: 899 },
  ];

  useEffect(() => {
    if (category && lat && lng) {
      dispatch(fetchHomeSaloonsByCategory({ category, lat, lng }));
    }
  }, [dispatch, category, lat, lng]);

  const handleSalonClick = (salonId) => {
    navigate(`/salon/${salonId}`);
  };

  if (loading) {
    return (
      <div className="px-6 py-10 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (homeSaloonsByCategory.length === 0) {
    return (
      <div className="px-6 py-12 text-center border-2 border-dashed border-gray-100 rounded-3xl mx-4">
        <p className="text-gray-400 font-medium">
          No salons found in {category}.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 capitalize">
            {category} <span className="text-indigo-600">Salons</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Discover the best rated services near you
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/salons");
          }}
          className="text-indigo-600 text-sm hover:cursor-pointer font-semibold flex items-center gap-1 hover:underline"
        >
          View all <ArrowRight size={16} />
        </button>
      </div>
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
        {homeSaloonsByCategory.map((salon) => (
          <SwiperSlide key={salon._id}>
            <div
              onClick={() => handleSalonClick(salon._id)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                {/* Image */}
                {salon.galleryImages?.length > 0 ? (
                  <img
                    src={salon.galleryImages[0]}
                    alt={salon.shopName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-sm italic bg-slate-100">
                    No Image Available
                  </div>
                )}

                {/* Dark gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* ⭐ Rating (top-right) */}
                <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold">
                  ⭐ 4.8
                </div>

               
                <div className="absolute bottom-3 left-3 text-white space-y-1 max-w-[85%]">
                  {/* Name */}
                  <h3 className="font-bold text-base leading-tight truncate">
                    {salon.shopName}
                  </h3>

                  {/* Category */}
                  <span className="inline-block px-2 py-0.5 bg-indigo-600/90 text-[10px] font-semibold rounded">
                    {salon.salonCategory}
                  </span>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-xs text-white/90">
                    <MapPin size={12} />
                    <span className="truncate">
                      {salon.location?.city}, {salon.location?.state}
                    </span>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div className="mt-4 space-y-1">
                  {mockServices.map((s, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{s.name}</span>
                      <span className="font-bold">₹{s.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between text-sm">
                  <span className="text-slate-400">Available Now</span>
                  <span className="text-indigo-600 font-bold">Book Visit</span>
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
