import React from 'react';

const Services2 = () => {
  return (
    <div className="bg-gradient-to-r from-[#FFF7F1] to-[#FFEDE2] mt-4 md:p-6 p-4">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        
        {/* Left Section - Salon Owner */}
        <div 
          data-aos="fade-right" 
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h3 className="text-2xl font-bold text-[#5A2C1E]">Are You a Salon Owner?</h3>
            <button className="bg-[#FFBC86] text-white font-medium py-2 px-6 rounded-full shadow hover:bg-[#ffad6a] transition-all cursor-pointer">
              Partner With Us
            </button>
          </div>
          <p className="text-gray-600">
            Join our platform and grow your salon business. Reach more customers effortlessly!
          </p>
        </div>

        {/* Right Section - Customer */}
        <div 
          data-aos="fade-left" 
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h3 className="text-2xl font-bold text-[#5A2C1E]">Ready to Glow?</h3>
            <button className="bg-[#FFBC86] text-white font-medium py-2 px-6 rounded-full shadow hover:bg-[#ffad6a] transition-all cursor-pointer">
              Download App
            </button>
          </div>
          <p className="text-gray-600">
            Book your beauty service today and experience the glow you deserve!
          </p>
        </div>

      </div>
    </div>
  );
};

export default Services2;