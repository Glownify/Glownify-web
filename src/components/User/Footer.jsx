import React from "react";
import {
  Instagram,
  Facebook,
  MessageCircle,
  Twitter,
  Youtube,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import playstore from "../../assets/google-playstore-badge.png";
import appstore from "../../assets/apple-appstore-badge.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 bg-gradient-to-br from-[#FFF7F1] via-[#FFEDE2] to-[#FFF7F1] text-slate-800 border-t border-orange-100">
      <div className="w-full mx-auto px-4 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Branding Section */}
          <div className="space-y-6">
            <Link to="/" className="inline-block transition-transform hover:scale-105">
              <img
                className="w-20 h-20 object-contain drop-shadow-sm"
                src="/GlownifyLogoPng.png"
                alt="Glownify Logo"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-600">
              Glownify helps you find nearby salons and book appointments easily.
              Compare prices, read reviews, and choose between in-salon or
              professional home services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h4 className="font-bold text-lg mb-6 text-slate-900">Company</h4>
            <ul className="space-y-3 text-sm">
              {["About Us", "Terms and Conditions", "Privacy Policy", "Blogs"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-slate-600 hover:text-orange-600 transition-colors hover:translate-x-1 inline-block transform"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Professionals Section */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-900 leading-tight">
              For Salons & Professionals
            </h4>
            <ul className="space-y-3 text-sm mb-6">
              <li>
                <Link to="/partner-with-us/salon-owner-register" className="text-slate-600 hover:text-orange-600 transition-colors">
                  Register as a Salon
                </Link>
              </li>
              <li>
                <Link to="/partner-with-us/independent-professional-register" className="text-slate-600 hover:text-orange-600 transition-colors">
                  Register as a Professional
                </Link>
              </li>
            </ul>

            {/* Contact Support Box */}
            <div className="p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-sm shadow-sm">
              <p className="text-xs font-medium text-slate-500 mb-1">Facing issues?</p>
              <Link
                to="/contact-us"
                className="text-orange-600 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
              >
                Contact Support <Send size={14} />
              </Link>
            </div>
          </div>

          {/* App & Social Section */}
          <div className="space-y-6">
            <div>
              <p className="font-bold text-sm mb-4 uppercase tracking-wider text-slate-400">
                Experience our App
              </p>
              <div className="flex flex-col gap-3">
                <img
                  src={playstore}
                  alt="Get it on Google Play"
                  className="h-10 w-fit cursor-pointer hover:opacity-80 transition-opacity"
                />
                <img
                  src={appstore}
                  alt="Download on App Store"
                  className="h-10 w-fit cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            </div>

            <div className="pt-2">
              <p className="font-bold text-sm mb-4 text-slate-900">Follow our journey</p>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram size={20} />, color: "hover:text-pink-600", link: "#" },
                  { icon: <Facebook size={20} />, color: "hover:text-blue-600", link: "#" },
                  { icon: <MessageCircle size={20} />, color: "hover:text-green-500", link: "#" },
                  { icon: <Twitter size={20} />, color: "hover:text-sky-500", link: "#" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className={`p-2 rounded-full bg-white shadow-sm border border-slate-100 transition-all hover:-translate-y-1 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} Glownify Studio. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="font-bold text-slate-800">VaishaliTech</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;