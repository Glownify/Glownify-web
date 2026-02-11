import React from 'react';
import { Store, Sparkles, ArrowRight, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesBanner = () => {
  return (
    <div className="w-full px-4 py-8 bg-white">
      {/* Container with forced equal height for children */}
      <div className="w-full mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-6 items-stretch">

        {/* Left Section - Salon Owner */}
        <div
          data-aos="fade-right"
          className="group relative flex flex-col justify-between bg-[#5A2C1E] rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-300 hover:shadow-xl shadow-md"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Store size={120} className="text-white" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-xl mb-4">
              <Store className="text-[#FFBC86]" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Are You a Salon Owner?
            </h3>
            <p className="text-white/80 text-sm md:text-base max-w-xs leading-relaxed">
              Join our premium network to manage bookings and reach more customers effortlessly.
            </p>
          </div>

          <div className="relative z-10 mt-6">
            <Link
              to="/partner-with-us"
              className="group inline-flex items-center gap-2 
             bg-[#FFBC86] text-[#5A2C1E]
             font-bold py-2.5 px-6 rounded-xl
             text-sm transition-all duration-300
             hover:bg-white focus:outline-none
             focus:ring-2 focus:ring-[#FFBC86]"
            >
              Partner With Us
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Right Section - Customer */}
        <div
          data-aos="fade-left"
          className="group relative flex flex-col justify-between bg-[#FFF7F1] border border-[#FFEDE2] rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-300 hover:shadow-xl shadow-sm"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Smartphone size={120} className="text-[#5A2C1E]" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center p-2 bg-[#5A2C1E]/5 rounded-xl mb-4">
              <Sparkles className="text-[#5A2C1E]" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-[#5A2C1E] mb-3">
              Ready to Glow?
            </h3>
            <p className="text-gray-600 text-sm md:text-base max-w-xs leading-relaxed">
              Book your favorite beauty services today and experience the luxury you deserve.
            </p>
          </div>

          <div className="relative z-10 mt-6">
            <button className="flex items-center gap-2 bg-[#5A2C1E] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-[#3d1e15] transition-colors text-sm">
              Download App
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesBanner;