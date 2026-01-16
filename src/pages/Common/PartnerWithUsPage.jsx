import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRound, BriefcaseBusiness, CheckCircle2, ChevronRight } from 'lucide-react';

const PartnerWithUsPage = () => {
  const navigate = useNavigate();

  // Unified navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  const benefits = [
    {
      title: "Easy Setup",
      description: "Complete registration in just 3 steps",
    },
    {
      title: "Instant Bookings",
      description: "Start receiving customer bookings immediately",
    },
    {
      title: "Secure & Verified",
      description: "All professionals are verified for quality assurance",
    },
    {
      title: "Dedicated Support",
      description: "24/7 customer support for all your needs",
    },
  ];

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-50 py-10">
      <div className="w-187.5 bg-white p-10 rounded-xl shadow-md">
        
        {/* Heading */}
        <header>
          <h1 className="text-4xl font-bold text-gray-800">Choose Your Role</h1>
          <p className="text-gray-500 mt-2">
            Select how you'd like to join our platform
          </p>
        </header>

        {/* Role Options */}
        <div className="space-y-5 mt-8">
          {/* Salon Owner */}
          <div 
            onClick={() => handleNavigation('/partner-with-us/salon-owner-register')} 
            className="flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 rounded-xl border cursor-pointer transition group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full">
                <BriefcaseBusiness size={28} />
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-800">Salon Owner</p>
                <p className="text-gray-500 text-sm">
                  Register your salon and manage bookings, staff, and services
                </p>
              </div>
            </div>
            <ChevronRight className="text-blue-600 transition-transform group-hover:translate-x-1" strokeWidth={3} />
          </div>

          {/* Independent Professional */}
          <div 
            onClick={() => handleNavigation('/partner-with-us/independent-professional-register')} 
            className="flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 rounded-xl border cursor-pointer transition group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-pink-100 text-pink-700 rounded-full">
                <UserRound size={28} />
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-800">Independent Professional</p>
                <p className="text-gray-500 text-sm">
                  Freelance beautician/barber. Work independently and manage your schedule
                </p>
              </div>
            </div>
            <ChevronRight className="text-pink-600 transition-transform group-hover:translate-x-1" strokeWidth={3} />
          </div>
        </div>

        {/* Why Register Section */}
        <section className="mt-10 bg-gray-50 p-6 rounded-xl border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Register With Us?</h2>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="text-green-600 mt-0.5" size={24} />
                <div>
                  <p className="font-semibold">{benefit.title}</p>
                  <p className="text-gray-500 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sign In Link */}
        <p className="text-center mt-8 text-gray-500">
          Already registered?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PartnerWithUsPage;