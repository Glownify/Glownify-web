import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIndependentProfessionals } from '../../../redux/slice/userSlice'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import  { MapPin, Star, ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";



const IndependentProfessionals = () => {
const dispatch=useDispatch();
const {independentProfessionals,loading,error}=useSelector((state)=>state.user);
useEffect(()=>{
  dispatch(fetchIndependentProfessionals());
},[dispatch]);
// console.log(independentProfessionals,"independentProfessionals");


  if (loading) {
    return (
      <div className="w-full py-10 text-center text-slate-500">
        Loading nearby professionals...
      </div>
    );
  }

  if (!independentProfessionals.length) {
    return (
      <div className="w-full py-10 text-center text-slate-500">
        No professionals found
      </div>
    );
  }
  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <div>
      <h1 className='text-2xl  px-6 py-5 md:text-3xl font-bold text-slate-900 capitalize'>Independent Professionals</h1>
       <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={24}
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
      loop
      className="w-full"
    >
      {independentProfessionals&&independentProfessionals.map((pro) => (
        <SwiperSlide className='h-auto' key={pro._id}>
          {/* {console.log
          (pro,"proooo")} */}
          <div className="h-[420px]    flex flex-col px-3 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full cursor-pointer">
            
            {/* IMAGE SECTION */}
            <div className="relative h-[160px] overflow-hidden rounded-t-2xl">
              {pro.profilePhoto ? (
                <img
                  src={pro.profilePhoto}
                  alt={pro.user?.name || "Professional"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400 text-sm">
                  No Image Available
                </div>
              )}

              {/* DARK GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* EXPERIENCE */}
              <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg text-xs font-bold">
                {pro.experienceYears} yrs
              </div>

              {/* OVERLAY CONTENT */}
              <div className="absolute bottom-3 left-3 text-white space-y-1 max-w-[85%]">
                <h3 className="font-bold text-base truncate">
                  {pro.user?.name}
                </h3>

                <span className="inline-block px-2 py-0.5 bg-indigo-600/90 text-[10px] font-semibold rounded">
                  {pro.gender}
                </span>

                <div className="flex items-center gap-1 text-xs text-white/90">
                   <MapPin size={12} />
                  <span>
                    Nearby ({pro.location?.radiusInKm || 0} km)
                  </span>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5  flex flex-col flex-1">
              <div className="space-y-1 h-[72px] overflow-hidden">
                {pro.specializations?.map((spec) => (
                  <div
                    key={spec._id}
                    className="flex justify-between text-sm"
                  >
                    <span>{spec.name}</span>
                    <span className="text-slate-400 text-xs">
                      {spec.gender}
                    </span>
                  </div>
                ))}
              </div>

              <div className=" mt-auto  pt-4 border-t flex justify-between text-sm">
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
  )
}

export default IndependentProfessionals