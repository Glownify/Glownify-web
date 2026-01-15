import React from "react";
import {
  Instagram,
  Facebook,
  MessageCircle,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import playstore from "../../assets/google-playstore-badge.png";
import appstore from "../../assets/apple-appstore-badge.png";

const Footer = () => {
  return (
    <footer className="mt-6 p-6 px-24 py-16 bg-linear-to-r from-[#FFF7F1] to-[#FFEDE2] text-black">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-11 md:gap-14 max-w-5xl ">
        {/* Branding Section */}
        <div className="space-y-3">
          <img
            className="w-16 h-16 object-contain"
            src="/GlownifyLogoPng.png"
            alt="Logo"
          />
          <p className="text-sm leading-relaxed leading-7">
            Glownify helps you find nearby salons and book appointments easily.
            You can compare salons based on price, affordability, and ratings,
            then book services at the salon or choose professional home
            services. Glownify makes salon booking simple, reliable, and
            convenient.
          </p>
        </div>

        {/* Company Section */}
        <div>
          <p className="font-semibold text-xl mb-3 ">Company</p>
          <ul className="space-y-1.5 text-sm">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:underline">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* For Salons / Professionals Section */}
        <div className="flex flex-col h-full -ml-4">
          <p className="font-semibold text-xl mb-3 leading-7">
            For Salons / Professionals
          </p>
          <ul className="space-y-1.5 text-sm mb-4">
            <li>
              <Link
                to="/partner-with-us/salon-owner-register"
                className="hover:underline"
              >
                Register as a Salon
              </Link>
            </li>
            <li>
              <Link
                to="/partner-with-us/independent-professional-register"
                className="hover:underline"
              >
                Register as a Professional
              </Link>
            </li>
          </ul>

          {/* Contact Box */}
          <div className="mt-auto p-3 border border-black/10 rounded-lg bg-white/30 text-xs">
            <p className="font-medium leading-7">Facing issues? Reach out to us at:</p>
            <Link
              to="/contact-us"
              className="text-blue-600 font-bold hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Mobile App & Social Section (Replaced Legal) */}
        <div className="space-y-4">
          {/* App Box */}
          <div className="p-4 bg-white/50 rounded-xl border border-black/5  ">
            <p className="font-semibold text-sm mb-3 leading-6">
              Experience the Glownify Mobile App
            </p>
            <div className="flex flex-wrap gap-3">
              <img
                src={playstore}
                alt="Play Store"
                className="h-11 cursor-pointer object-contain max-w-full"
              />
              <img
                src={appstore}
                alt="App Store"
                className="h-11 cursor-pointer object-contain max-w-full "
              />
            </div>
          </div>

          {/* Social Love Box */}
          <div className="p-4 bg-white/50 rounded-xl border border-black/5">
            <p className="font-semibold text-sm mb-2 leading-7">
              Show some love 🩷 on social media
            </p>
            <div className="flex gap-4 rounded-xl p-4">
              <Instagram
                size={20}
                className="hover:text-pink-600 cursor-pointer transition-colors"
              />
              <Facebook
                size={20}
                className="hover:text-blue-600 cursor-pointer transition-colors"
              />
              <MessageCircle
                size={20}
                className="hover:text-green-600 cursor-pointer transition-colors"
              />
              <Twitter
                size={20}
                className="hover:text-blue-400 cursor-pointer transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-8 border-black/10" />

      {/* Bottom Bar */}
      <div className="
       grid md:grid-cols-2 mt-4 text-sm opacity-80 
      border-t mt-10 pt-6  md:flex-row justify-between 
      ">
        <p>© 2025 Glownify Studio. All rights reserved.</p>
        <p className="md:text-end">Powered by VaishaliTech</p>
      </div>
    </footer>
  );
};

export default Footer;
