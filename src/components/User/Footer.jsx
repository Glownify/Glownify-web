import React from 'react';
import { Instagram, Facebook, MessageCircle, Globe } from 'lucide-react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='mt-6 p-6 bg-gradient-to-r from-[#FFF7F1] to-[#FFEDE2] text-black'>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-3 text-black gap-8'>
        
        {/* Branding Section */}
        <div className='space-y-3'>
          <img className="w-16 h-16 object-contain" src="/GlownifyLogoPng.png" alt="Logo" />
          <p className='text-sm leading-relaxed'>
            Book your next beauty appointment with the best salons in your area.
          </p>
          {/* Social Icons using Lucide */}
          <div className='flex gap-4 pt-2'>
            <Instagram size={20} className="cursor-pointer hover:opacity-70 transition-opacity" />
            <Facebook size={20} className="cursor-pointer hover:opacity-70 transition-opacity" />
            <MessageCircle size={20} className="cursor-pointer hover:opacity-70 transition-opacity" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className='font-semibold text-2xl mb-3'>Quick Links</p>
          <ul className='space-y-1.5'>
            <li><Link to='/about' className="hover:underline">About Us</Link></li>
            <li>
              <Link to='/contact' className="hover:underline">Contact</Link>
            </li>
             <li>
              <Link to='/partner-with-us' className="hover:underline">Career</Link>
            </li>
             <li>
              <Link to='/blogs' className="hover:underline">Blog</Link>
            </li>
            {/* <li>Blog</li> */}
          </ul>
        </div>

        {/* Services */}
        <div>
          <p className='font-semibold text-2xl mb-3'>Services</p>
          <ul className='space-y-1.5'>
            <li>Haircut & Styling</li>
            <li>Nail Care</li>
            <li>Skin Care</li>
            <li>Massage</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className='font-semibold text-2xl mb-3'>Legal</p>
          <ul className='space-y-1.5'>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>

      <hr className='mt-8 border-black/10' />

      {/* Bottom Bar */}
      <div className='grid md:grid-cols-2 mt-4 text-sm opacity-80'>
        <p>© 2025 Glownify Studio. All rights reserved.</p>
        <p className='md:text-end'>Powered by VaishaliTech</p>
      </div>
    </footer>
  );
};

export default Footer;