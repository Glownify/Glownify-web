import React ,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchAllSalonsforhomeServices} from '../../../redux/slice/userSlice';
import  { MapPin, Star, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


const SalonHomeServices = ({ category, lat, lng }) => {

  const dispatch=useDispatch();
  const {salonsforhomeServices,loading,error}=useSelector((state)=>state.user);
  useEffect(()=>{
    dispatch(fetchAllSalonsforhomeServices({ category, lat, lng }));
  },[dispatch,category,lat,lng]);
 
  
const mockServices = [
    { name: "Haircut", price: 299 },
    { name: "Facial", price: 599 },
    { name: "Hair Spa", price: 899 },
  ];

 if (loading) {
    return (
      <div className="w-full py-10 text-center text-slate-500">
        Loading nearby  home salons services...
      </div>
    );
  }

  if (!salonsforhomeServices.length) {
    return (
      <div className="w-full py-10 text-center text-slate-500">
        No  home  salon services found
      </div>
    );
  }

  return (
    <div className=" max-w-7xl mx-auto">
      <div >
      <h1 className=' px-6 py-5 text-2xl md:text-3xl font-bold text-slate-900 capitalize'>Home Salon Services</h1>
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
        {salonsforhomeServices.map((items) => (
          <SwiperSlide key={items._id}>
            <div
              onClick={() => handleSalonClick(items._id)}
              className="px-3 py-3 group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                {/* Image */}
                {items.galleryImages?.length > 0 ? (
                  <img
                    src={items.galleryImages[0]}
                    alt={items.shopName}
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
                    {items.shopName}
                  </h3>

                  {/* Category */}
                  <span className="inline-block px-2 py-0.5 bg-indigo-600/90 text-[10px] font-semibold rounded">
                    {items.salonCategory}
                  </span>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-xs text-white/90">
                    <MapPin size={12} />
                    <span className="truncate">
                      {items.location?.city}, {items.location?.state}
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

    </div>

   
  )
}

export default SalonHomeServices