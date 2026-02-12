import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Assuming your image imports remain the same
import img1 from "../../../assets/salon.png";
import img2 from "../../../assets/salon_service.png";
import img3 from "../../../assets/haircut.png";
import img4 from "../../../assets/facial.png";
import img5 from "../../../assets/waxing.png";
import img6 from "../../../assets/makeup.png";

const services = [
  { icon: img1, title: "Salon Appointment", desc: "Instantly book nearby top-rated men's & women's salons." },
  { icon: img2, title: "Home Services", desc: "Professional grooming and beauty care in your own space." },
  { icon: img3, title: "Haircut & Grooming", desc: "Expert styling tailored for men, women, and children." },
  { icon: img4, title: "Facial & Skincare", desc: "Revitalizing treatments for a natural, healthy glow." },
  { icon: img5, title: "Waxing & Threading", desc: "Precise and hygienic hair removal by specialists." },
  { icon: img6, title: "Makeup & Styling", desc: "Exquisite bridal and party transformations." },
];

export const Services = memo(() => {
  return (
    <section id="services" className="w-full bg-[#FCF9F7] py-16 px-4 md:px-8 lg:px-12">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-widest text-[#F7A97E] mb-3 block">
            Premium Care
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3D1E14] mb-4">
            Our Services
          </h2>
          <div className="w-20 h-1 bg-[#F7A97E] mx-auto mb-6"></div>
        </div>

        {/* Swiper Slider */}
        <div data-aos="fade-up">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            /* Show 3 slides, scroll 1 */
            slidesPerView={1}
            slidesPerGroup={1}
            breakpoints={{
              0: { slidesPerView: 1.1, spaceBetween: 16 },
              480: { slidesPerView: 1.3, spaceBetween: 20 },
              768: { slidesPerView: 2.3, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          // pagination={{ clickable: true, dynamicBullets: true }}
          // className="pb-14"
          >
            {services.map((item, i) => (
              <SwiperSlide key={i} className="h-75">
                <div className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 mb-4 border border-gray-100 h-87.5">

                  {/* Top Half: Image (50% height) */}
                  <div className="h-1/2 overflow-hidden relative">
                    <img
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={item.icon}
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Bottom Half: Content (50% height) */}
                  <div className="h-1/2 p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#3D1E14] mb-3 group-hover:text-[#F7A97E] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <button className="text-xs font-bold uppercase tracking-wider text-[#F7A97E] flex items-center gap-2 group/btn mt-4">
                      Explore More
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
});

export default Services;