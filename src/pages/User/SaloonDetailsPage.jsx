import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  MapPin, Star, ShieldCheck, Heart, ArrowLeft, 
  Scissors, Gift, Clock, Phone, Share2, CheckCircle2 
} from "lucide-react";

const SaloonDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const salon = state?.salon;

  // Scroll to top on mount
  useEffect(() => window.scrollTo(0, 0), []);

  if (!salon) return <div className="p-20 text-center">Salon not found...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-rose-50 px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-rose-50 rounded-full text-slate-600 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-rose-50 rounded-full text-slate-600"><Share2 size={20} /></button>
          <button className="p-2 hover:bg-rose-50 rounded-full text-rose-500"><Heart size={20} /></button>
        </div>
      </nav>

      {/* 2. Hero Gallery */}
      <div className="pt-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[300px] md:h-[500px]">
          <div className="md:col-span-2 h-full rounded-[2.5rem] overflow-hidden border border-rose-100">
            <img src={salon.galleryImages?.[0] || "https://images.unsplash.com/photo-1560066984-138dadb4c035"} className="w-full h-full object-cover" alt="Main" />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-4 md:col-span-1">
             <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702" className="w-full h-full object-cover rounded-[2rem]" alt="Sub 1" />
             <img src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6" className="w-full h-full object-cover rounded-[2rem]" alt="Sub 2" />
          </div>
          <div className="hidden md:block md:col-span-1 h-full rounded-[2.5rem] overflow-hidden relative">
             <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df" className="w-full h-full object-cover" alt="Sub 3" />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold cursor-pointer">View all 12 photos</div>
          </div>
        </div>
      </div>

      {/* 3. Main Content Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left: Info & Features */}
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                   {salon.salonCategory || "Luxury Salon"}
                </span>
                {salon.verifiedByAdmin && <ShieldCheck className="text-emerald-500" size={18} />}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{salon.shopName}</h1>
              <p className="text-slate-500 flex items-center gap-1 mt-3 font-medium text-lg">
                <MapPin className="text-rose-500" size={20} /> {salon.location?.address}, {salon.location?.city}
              </p>
            </div>
            <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-2xl font-black text-slate-800">
                    <Star className="fill-rose-500 text-rose-500" size={24} /> {salon.averageRating || "4.8"}
                </div>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-tighter mt-1">{salon.totalReviews || "850"} Reviews</p>
            </div>
          </div>

          {/* Special Promo */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-[2rem] p-8 text-white flex items-center justify-between mb-10 shadow-xl shadow-rose-100">
            <div className="flex items-center gap-5">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md"><Gift size={32} /></div>
              <div>
                <h3 className="text-xl font-bold">First Time Visit?</h3>
                <p className="opacity-90">Get a complimentary hair spa with any service over ₹1999</p>
              </div>
            </div>
            <button className="hidden md:block bg-white text-rose-600 px-6 py-3 rounded-xl font-black text-sm uppercase">Claim Offer</button>
          </div>

          {/* Features Grid */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-widest">Amenities & Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                 { icon: <Clock size={20}/>, label: "Open Now", detail: "9 AM - 9 PM" },
                 { icon: <CheckCircle2 size={20}/>, label: "Safety First", detail: "Sanitized tools" },
                 { icon: <Scissors size={20}/>, label: "Top Artists", detail: "Pro Certified" },
                 { icon: <Phone size={20}/>, label: "Call Us", detail: salon.contactNumber },
               ].map((item, i) => (
                 <div key={i} className="p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-rose-200 transition-colors">
                    <div className="text-rose-500 mb-2">{item.icon}</div>
                    <p className="font-bold text-slate-800 text-sm">{item.label}</p>
                    <p className="text-slate-400 text-xs mt-1">{item.detail}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-widest">Our Services</h2>
            <div className="space-y-4">
               {['Premium Haircut', 'Bridal Makeup', 'Deep Tissue Massage', 'O3+ Facial'].map((service, i) => (
                 <div key={i} className="flex justify-between items-center p-6 rounded-3xl border border-slate-50 hover:bg-rose-50/30 transition-all cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-bold text-slate-700 text-lg">{service}</span>
                   </div>
                   <div className="flex items-center gap-6">
                      <span className="text-slate-400 font-medium">45 Mins</span>
                      <span className="font-black text-slate-900">₹899</span>
                   </div>
                 </div>
               ))}
            </div>
          </section>
        </div>

        {/* Right: Sticky Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 p-8 rounded-[2.5rem] bg-white border border-rose-100 shadow-2xl shadow-rose-100">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Book a Visit</h3>
            <p className="text-slate-400 text-sm mb-8 font-medium">Instantly confirm your slot for today or later.</p>
            
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400">Select Date</label>
                  <input type="date" className="w-full p-4 rounded-2xl bg-rose-50/50 border border-rose-100 font-bold text-slate-700 outline-none focus:ring-2 ring-rose-500" />
               </div>
               
               <div className="bg-rose-50 p-6 rounded-3xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500 font-medium text-sm">Service Fee</span>
                    <span className="font-bold text-slate-800">₹499</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-rose-100">
                    <span className="text-slate-900 font-black">Total Payable</span>
                    <span className="text-2xl font-black text-rose-600">₹499</span>
                  </div>
               </div>

               <button className="w-full py-5 bg-rose-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-rose-200 hover:bg-rose-700 hover:-translate-y-1 transition-all">
                 Confirm Appointment
               </button>
               
               <p className="text-center text-[10px] text-slate-400 font-bold uppercase">Free cancellation 2 hours before</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default SaloonDetailsPage;