import React, { memo } from "react";
import img1 from "../../../assets/salon.png";
import img2 from "../../../assets/salon_service.png";
import img3 from "../../../assets/haircut.png";
import img4 from "../../../assets/facial.png";
import img5 from "../../../assets/waxing.png";
import img6 from "../../../assets/makeup.png";

const services = [
  {
    icon: img1,
    title: "Book Salon Appointment",
    desc: "Find nearby men's & women's salons and book instantly",
  },
  {
    icon: img2,
    title: "Salon Services at Home",
    desc: "Get grooming services at home by professional beauticians",
  },
  {
    icon: img3,
    title: "Haircut & Grooming",
    desc: "Professional haircut & styling for men, women & kids",
  },
  {
    icon: img4,
    title: "Facial & Skincare",
    desc: "Glow-boosting facials & skincare for everyone",
  },
  {
    icon: img5,
    title: "Waxing & Threading",
    desc: "Hygienic waxing & threading services for men & women",
  },
  {
    icon: img6,
    title: "Makeup & Styling",
    desc: "Party & bridal makeup by professionals",
  },
];

export const Services = memo(() => {
  return (
    <div id="services" className="w-full bg-[#FFF7F1] py-16 px-4 md:px-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-[#5A2C1E]">Our Services</h2>
        <p className="text-lg mt-2 text-[#6F4F44]">
          Salon & Home Services for Everyone.
        </p>
        <p className="text-sm mt-1 text-[#6F4F44]">
          Men | Women | Kids — All Services Available
        </p>
      </div>

      {/* Service Cards */}
      <div 
        data-aos="fade-up" 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
      >
        {services.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm text-center hover:shadow-md transition-all overflow-hidden"
          >
            <div className="text-[#F7A97E]">
              <img 
                className="h-60 w-full object-cover" 
                src={item.icon} 
                alt={item.title} 
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#5A2C1E]">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Services;