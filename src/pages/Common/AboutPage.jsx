import React, { memo } from "react";
import { CheckCircle2, Facebook, Twitter, Linkedin } from "lucide-react";

function AboutPage() {
  return (
    <div className="px-4 md:px-20 py-16 space-y-20 bg-gray-50">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">About Us – Glownify</h1>
        <p className="mt-2 text-lg text-rose-600 font-medium">
          India’s Modern Beauty & Grooming Platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-3 shadow-sm hover:shadow-md transition-shadow bg-rose-50 border border-rose-100 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-800">Who We Are</h2>
          <p className="text-gray-700">
            Glownify is India’s modern beauty and grooming platform built for
            everyone — men, women, and unisex users.
          </p>
          <p className="text-gray-700">
            We bring verified salons and skilled professionals together on a
            single digital platform.
          </p>
          <p className="text-gray-700">
            Whether you prefer salon visits or home services, Glownify ensures a
            smooth and delightful grooming experience.
          </p>
        </div>

        <div className="space-y-3 shadow-sm hover:shadow-md transition-shadow bg-rose-50 border border-rose-100 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-800">Our Purpose</h2>
          <p className="text-gray-700">
            To make beauty & grooming accessible, organised, and trusted for
            every Indian.
          </p>
          <p className="font-semibold text-rose-700">We solve two real problems:</p>
          <ol className="list-decimal ml-6 space-y-2 text-gray-700">
            <li>Customers struggle to find trusted salons & professionals</li>
            <li>Local salons lack online presence</li>
          </ol>
          <p className="text-gray-700 italic">Glownify connects both sides through technology and trust.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-3 shadow-sm hover:shadow-md transition-shadow bg-rose-50 border border-rose-100 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-700">
            To deliver easy, transparent, hygienic, and time-saving beauty
            services — anytime, anywhere.
          </p>
        </div>

        <div className="space-y-3 shadow-sm hover:shadow-md transition-shadow bg-rose-50 border border-rose-100 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
          <p className="text-gray-700">
            To become India’s most trusted beauty-service marketplace where
            users feel confident and valued.
          </p>
        </div>
      </div>

      <div className="space-y-4 shadow-sm hover:shadow-md transition-shadow bg-rose-50 border border-rose-100 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800">What We Offer</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Salon booking for men & women",
            "At-home beauty & grooming services",
            "Verified, trained professionals",
            "Transparent pricing with no hidden fees",
            "Easy appointment scheduling",
            "Real customer reviews & ratings",
          ].map((item, i) => (
            <p key={i} className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 size={18} className="text-rose-600" /> {item}
            </p>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="space-y-3 shadow-sm hover:shadow-md transition-shadow bg-rose-50 border border-rose-100 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800">Our Philosophy</h2>
        <p className="text-gray-700 italic">
          "Grooming is not a luxury — it is self-care, confidence, and comfort."
        </p>
        <p className="text-gray-800 font-medium">Every Glownify service is designed to be:</p>
        <ul className="ml-4 space-y-2 list-disc text-gray-700">
          <li>Convenient – because your time matters</li>
          <li>Affordable – no hidden charges</li>
          <li>Safe & Hygienic – trained, verified experts</li>
          <li>Inclusive – services for all genders</li>
        </ul>
      </div>

      {/* FOUNDER CARD */}
      <div className="p-6 md:p-10 space-y-6 shadow-sm hover:shadow-md transition-shadow bg-rose-50 border border-rose-100 rounded-xl flex flex-col md:flex-row items-center">
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">
            Meet the Founder – Abhishek Kumar
          </h3>
          <p className="text-rose-600 italic font-medium">"Empowering the beauty ecosystem through technology."</p>
          <div className="space-y-3 text-gray-700">
            <p>
              Abhishek Kumar, from IIIT Lucknow, is a technology-driven
              entrepreneur.
            </p> 
            <p>
              He discovered that most local salons provide great service but lack
              digital presence.
            </p>
            <p>
              To bridge this gap, he created Glownify — a platform that empowers
              salons & connects customers to trusted professionals.
            </p>
          </div>
          <p className="font-bold text-gray-900">His vision is to organise and modernize India’s beauty industry.</p>
        </div>

        <div className="py-6 md:py-0 md:ml-12">
          <div className="w-72 sm:w-80 bg-white border border-rose-100 rounded-2xl shadow-lg overflow-hidden text-center">
            <div className="p-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                alt="Abhishek Kumar"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
            <div className="px-4 pb-6">
              <h3 className="text-lg font-bold text-gray-800">Abhishek Kumar</h3>
              <p className="text-xs uppercase tracking-widest text-rose-500 mt-1 font-semibold">
                Founder & CEO
              </p>
              <div className="w-full h-px bg-gray-100 my-4"></div>
              <div className="flex justify-center gap-6">
                <a href="#" className="text-blue-600 hover:scale-110 transition-transform">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-sky-500 hover:scale-110 transition-transform">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-blue-700 hover:scale-110 transition-transform">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commitment */}
      <div className="space-y-3 shadow-sm hover:shadow-md transition-shadow bg-rose-50 border border-rose-100 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800">Our Commitment</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>A trusted platform for customers</li>
          <li>A digital growth ecosystem for salons</li>
          <li>Better earning opportunities for beauticians</li>
          <li>A safe, hygienic grooming experience</li>
        </ul>
        <div className="pt-4">
          <p className="text-lg font-semibold text-gray-900 italic">
            "Glownify is not just an app — It is a mission to upgrade India’s beauty & grooming experience."
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(AboutPage);