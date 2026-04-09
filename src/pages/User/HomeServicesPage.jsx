import { useSelector, useDispatch } from "react-redux";
import { fetchHomeIndependentProfessionals } from "../../redux/slice/userSlice";
import { useEffect, useState, useMemo, useRef } from "react";
import { MapPin, Star, RefreshCw, Frown, Scissors, UserCheck, ShieldCheck, CheckCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ─── Cards ─────────────────────────────────────────────────────────────────

const ProCard = ({ pro, onNavigate }) => {
  const isAvail = pro.availabilityStatus === "available";
  const name = pro.user?.name || "Professional";
  const exp = `${pro.experienceYears || 2} yrs Exp`;
  const spec = pro.specializations?.[0] || pro.salonCategory || "Expert";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group h-full">
      {/* ── Image Section ── */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={pro.profilePhoto || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Availability Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-lg ${isAvail ? "bg-rose-600" : "bg-slate-500"}`}>
          {isAvail ? "● Available" : "● Busy"}
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-white/20">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span className="text-sm font-bold text-slate-900">{pro.avgRating || "4.8"}</span>
        </div>
      </div>

      {/* ── Info Section ── */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">{name}</h3>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
            {pro.user?.gender || "Verified"}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <UserCheck size={14} className="text-rose-600" />
            <span>{exp}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Scissors size={14} className="text-rose-600" />
            <span className="truncate">{spec}</span>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex gap-2 pt-4 border-t border-slate-50">
          <button
            onClick={() => onNavigate(pro)}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-md shadow-rose-100 text-sm"
          >
            Book Now
          </button>
          <button
            onClick={() => onNavigate(pro)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-bold"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

const HomeServicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { independentProfessionals, homeLoading, lat, lng } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  const lastFetched = useRef({ lat: null, lng: null });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // 1. Check for browser geolocation
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        
        // Only fetch if coordinates changed significantly (roughly 100m)
        const diffLat = Math.abs(latitude - (lastFetched.current.lat || 0));
        const diffLng = Math.abs(longitude - (lastFetched.current.lng || 0));
        
        if (diffLat > 0.001 || diffLng > 0.001) {
          lastFetched.current = { lat: latitude, lng: longitude };
          dispatch(fetchHomeIndependentProfessionals({ lat: latitude, lng: longitude, category: "unisex" }));
        }
      },
      () => {
        // Fallback to Bangalore if blocked/error
        if (!lastFetched.current.lat) {
          lastFetched.current = { lat: 12.9716, lng: 77.5454 };
          dispatch(fetchHomeIndependentProfessionals({ lat: 12.9716, lng: 77.5454, category: "unisex" }));
        }
      }
    );
  }, [dispatch]);

  const professionals = useMemo(() => {
    // independentProfessionals now already includes dummy data merged via Redux
    const list = Array.isArray(independentProfessionals) ? independentProfessionals : [];

    if (!searchQuery) return list;
    return list.filter(p => 
      p.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specializations?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [independentProfessionals, searchQuery]);

  const handleNavigate = (pro) => {
    localStorage.setItem("selectedSalon", JSON.stringify(pro));
    navigate("/independentprofessionaldetailspage");
  };

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* ─── Header ───────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm uppercase tracking-widest">
                <ShieldCheck size={18} />
                <span>Verified Partners</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Home Services <span className="text-rose-600">&</span> Professionals
              </h1>
              <p className="text-slate-500 text-lg max-w-2xl">
                Premium beauty and grooming services delivered to your doorstep by verified experts.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search professionals or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {homeLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-[450px] animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : professionals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {professionals.map((pro) => (
              <ProCard key={pro._id} pro={pro} onNavigate={handleNavigate} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
              <Frown size={40} className="text-rose-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No professionals found</h2>
            <p className="text-slate-500 mb-8">Try adjusting your search or check back later.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-rose-600 font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* ─── Footer Highlight ──────────────────────────────────────────────────── */}
      <div className="bg-rose-900 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose Glownify Home Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Background Checked", desc: "Every professional undergoes strict verification." },
              { title: "Expert Services", desc: "Top-tier quality at the comfort of your home." },
              { title: "Secure Booking", desc: "Hassle-free scheduling with instant confirmation." }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <CheckCircle className="text-rose-400 mx-auto mb-4" size={24} />
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-rose-100/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeServicesPage;
