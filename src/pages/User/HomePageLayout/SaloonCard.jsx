import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, ShieldCheck, Heart } from "lucide-react";

const SaloonCard = ({ salon }) => {
    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate(`/saloon/${salon._id}`, { state: { salon } });
    };

  return (
    // Reduced min-width from 320px to 260px for a sleeker look
    <div className="min-w-[260px] md:min-w-[280px] snap-start group/card">
      
      {/* Image Card - Adjusted aspect ratio to 4:5 for a more compact height */}
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 shadow-sm border border-rose-50">
        <img
          src={
            salon.galleryImages?.[0] ||
            "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop"
          }
          alt={salon.shopName}
          className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

        {/* Wishlist - Made smaller */}
        <button className="absolute top-4 right-4 w-8 h-8 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-rose-500 transition-colors shadow-lg">
          <Heart size={16} />
        </button>

        {/* Category + Verified - Scaled down */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
          <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase text-slate-800 shadow-lg tracking-wider">
            {salon.salonCategory?.replace(/([A-Z])/g, " $1").trim() || "Beauty Salon"}
          </span>

          {salon.verifiedByAdmin && (
            <div className="bg-emerald-500 text-white p-1 rounded-full shadow-lg">
              <ShieldCheck size={14} />
            </div>
          )}
        </div>
      </div>

      {/* Details - More compact spacing */}
      <div className="px-1">
        <div className="flex justify-between items-center mb-0.5">
          <h3 className="text-lg font-bold text-slate-800 truncate pr-2 tracking-tight">
            {salon.shopName}
          </h3>

          <div className="flex items-center gap-1 shrink-0">
            <Star size={12} className="fill-rose-400 text-rose-400" />
            <span className="text-xs font-bold text-slate-700">
              {salon.averageRating || "4.8"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
          <MapPin size={12} className="text-rose-300" />
          <span className="truncate">{salon.location?.city || "New Delhi"}</span>
        </div>

        {/* Button - Slimmer padding */}
        <button onClick={handleBookClick} className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-rose-600 transition-all shadow-md hover:shadow-rose-100 active:scale-95">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default SaloonCard;