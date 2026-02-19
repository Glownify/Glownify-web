import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSaloonDetailsById } from "../../../redux/slice/userSlice";
import {
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  ChevronRight,
  Pencil,
  Sparkles,
} from "lucide-react";

// ─── Fallback data for placeholder/demo salon IDs ───
const FALLBACK_SALON = {
  _id: "demo",
  shopName: "Glamour Salon & Spa",
  coverImage:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
  galleryImages: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1521590832167-7228fcb728e7?w=400&h=300&fit=crop",
  ],
  location: {
    address: "Gomti Nagar",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226010",
  },
  homeService: true,
  rating: "4.5",
  reviewCount: "120",
  distance: "2.3",
  serviceCategories: [
    { _id: "cat-1", name: "Hair" },
    { _id: "cat-2", name: "Facial" },
    { _id: "cat-3", name: "Wax" },
    { _id: "cat-4", name: "Makeup" },
  ],
  specialistsData: [],
};

// Category image mapping
const CATEGORY_IMAGES = {
  hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop&crop=face",
  facial: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&h=200&fit=crop&crop=face",
  wax: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop&crop=face",
  makeup: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=200&h=200&fit=crop&crop=face",
  nail: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop&crop=face",
  spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop&crop=face",
  beard: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop&crop=face",
};

const getCategoryImage = (name) => {
  const lower = name?.toLowerCase() || "";
  for (const [key, url] of Object.entries(CATEGORY_IMAGES)) {
    if (lower.includes(key)) return url;
  }
  return CATEGORY_IMAGES.hair;
};

// ─── Shared horizontal padding classes ───
const PX = "px-5 md:px-8 lg:px-12 xl:px-16";

const HomeSaloonsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { saloonDetails, loading, error } = useSelector(
    (state) => state.user
  );

  const [isFavorited, setIsFavorited] = useState(false);
  const [serviceMode, setServiceMode] = useState("salon");

  const isPlaceholder = id?.startsWith("placeholder");

  useEffect(() => {
    if (id && !isPlaceholder) {
      dispatch(getSaloonDetailsById(id));
    }
  }, [dispatch, id, isPlaceholder]);

  const salon = isPlaceholder
    ? FALLBACK_SALON
    : saloonDetails || FALLBACK_SALON;

  const categories = salon.serviceCategories || [];
  const categoryNames = categories.map((cat) => cat.name);

  if (loading && !isPlaceholder)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-pink-50 to-white">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
          <Sparkles className="w-6 h-6 text-pink-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">
          Loading salon details...
        </p>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-pink-50/70">
      {/* ─── HEADER BAR ─── */}
      <div className="sticky top-0 z-50 bg-pink-50/90 backdrop-blur-lg border-b border-pink-100/50">
        <div className={`flex items-center justify-between ${PX} py-3`}>
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>
          <h1 className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 truncate max-w-[60%]">
            {salon.shopName}
          </h1>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-100 transition-colors"
          >
            <Heart
              className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${isFavorited
                ? "text-rose-500 fill-rose-500"
                : "text-rose-400 fill-rose-400"
                }`}
            />
          </button>
        </div>
      </div>

      {/* ─── HERO IMAGE ─── */}
      <div className="relative w-full h-52 sm:h-60 md:h-72 lg:h-80 xl:h-[24rem] overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={
            salon.coverImage ||
            salon.galleryImages?.[0] ||
            "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop"
          }
          alt={salon.shopName}
        />
        {/* Dark gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Rating · Distance · View on Map — overlaid on image */}
        <div className={`absolute bottom-0 left-0 right-0 ${PX} pb-4 md:pb-5`}>
          <div className="flex items-center gap-2 md:gap-3 text-white text-xs md:text-sm lg:text-base font-medium flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="bg-amber-500 text-white text-[11px] md:text-xs px-2 py-0.5 md:px-2.5 md:py-1 rounded-full font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" />
                {salon.rating || "4.5"}
              </span>
              <span className="text-white/90">
                ({salon.reviewCount || "120"} Reviews)
              </span>
            </div>

            <span className="text-white/40">|</span>

            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{salon.distance || "2.3"} km away</span>
            </div>

            <span className="text-white/40">|</span>

            <NavLink
              to="map"
              className="flex items-center gap-1 text-white/95 hover:text-white hover:underline"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>View on Map</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* ─── CONTENT PANEL ─── */}
      <div className="bg-pink-50/80 rounded-t-3xl -mt-5 relative z-10">
        {/* ── Address Row ── */}
        <div className={`${PX} pt-6 md:pt-7 pb-4 md:pb-5 border-b border-pink-100`}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-rose-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base lg:text-lg text-gray-800 font-medium leading-snug">
                You are booking from:{" "}
                <span className="text-gray-900 font-bold">
                  {salon.location?.address || "Your location"}
                  {salon.location?.city ? `, ${salon.location.city}` : ""}
                </span>
              </p>
              {salon.homeService && (
                <p className="text-xs md:text-sm text-gray-400 mt-1">
                  For home service, professional will visit this address.
                </p>
              )}
            </div>
            <button className="flex items-center gap-1.5 text-rose-500 text-xs md:text-sm font-bold border border-rose-200 rounded-xl px-3 md:px-4 py-1.5 md:py-2 hover:bg-rose-50 transition-colors shrink-0">
              <Pencil className="w-3 h-3 md:w-3.5 md:h-3.5" /> Edit
            </button>
          </div>
        </div>

        {/* ── Toggle Buttons + Category Circles ── */}
        <div className={`${PX} py-5 md:py-6 border-b border-pink-50`}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-0 md:justify-between">
            {/* Mode Toggle */}
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => setServiceMode("salon")}
                className={`px-7 md:px-8 lg:px-10 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-bold transition-all duration-300 ${serviceMode === "salon"
                  ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg shadow-pink-200/50"
                  : "bg-white text-gray-600 border-2 border-gray-200 hover:border-pink-300"
                  }`}
              >
                Visit Salon
              </button>
              {salon.homeService && (
                <button
                  onClick={() => setServiceMode("home")}
                  className={`px-7 md:px-8 lg:px-10 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-bold transition-all duration-300 ${serviceMode === "home"
                    ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg shadow-pink-200/50"
                    : "bg-white text-gray-600 border-2 border-gray-200 hover:border-pink-300"
                    }`}
                >
                  Service at Home
                </button>
              )}
            </div>

            {/* Category Circles */}
            {categories.length > 0 && (
              <div className="flex items-center gap-3 md:gap-0 md:ml-auto">
                <div className="flex gap-5 md:gap-6 lg:gap-7 overflow-x-auto no-scrollbar">
                  {categories.map((cat) => (
                    <div
                      key={cat._id}
                      className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
                    >
                      <div className="w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] lg:w-20 lg:h-20 rounded-full overflow-hidden border-[2.5px] border-pink-200 group-hover:border-pink-400 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                        <img
                          src={getCategoryImage(cat.name)}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] md:text-xs lg:text-sm font-semibold text-gray-600 text-center">
                        {cat.name}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-9 h-9 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0 hover:bg-gray-200 transition-colors ml-2">
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Our Services + Customer Reviews (side by side on md+) ── */}
        <div className={`${PX} py-5 md:py-6`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-start">
            {/* Our Services Card */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border-l-4 border-l-pink-300 border border-pink-100/60 shadow-sm">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                Our Services
              </h3>
              {/* Sparkle banner */}
              <div
                className="text-white rounded-xl px-5 py-3 md:py-3.5 mb-3 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #f9a8d4 0%, #f472b6 30%, #e8a87c 70%, #d4a574 100%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(circle at 60% 80%, rgba(255,255,255,0.25) 1px, transparent 1px)",
                    backgroundSize: "30px 30px, 40px 40px, 25px 25px",
                  }}
                />
                <p className="text-sm md:text-base lg:text-lg font-bold relative z-10">
                  ✨ Services starting from ₹199
                </p>
              </div>
              <p className="text-sm md:text-base text-gray-500">
                {categoryNames.length > 0
                  ? categoryNames.join(" · ")
                  : "Hair · Facial · Makeup · Waxing"}
              </p>
            </div>

            {/* Customer Reviews Card */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                Customer Reviews
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg md:text-xl">👑</span>
                <span className="text-2xl md:text-3xl font-black text-rose-500">
                  {salon.rating || "4.5"}
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 md:w-5 md:h-5 ${star <= Math.round(salon.rating || 4.5)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200 fill-gray-200"
                        }`}
                    />
                  ))}
                </div>
              </div>
              {/* Reviews */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs md:text-sm font-bold text-pink-600">
                      P
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm md:text-base font-bold text-gray-800">
                      Pooja S:
                    </span>
                    <span className="text-sm md:text-base text-gray-500 ml-1">
                      "Great service and very clean!"
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs md:text-sm font-bold text-blue-600">
                      A
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm md:text-base font-bold text-gray-800">
                      Amit K:
                    </span>
                    <span className="text-sm md:text-base text-gray-500 ml-1">
                      "Loved the facial, will book again!"
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── NAVIGATION TABS ── */}
        <div className="sticky top-[57px] z-40 bg-white/95 backdrop-blur-md border-y border-gray-100">
          <div className={`flex overflow-x-auto no-scrollbar ${PX} gap-1`}>
            {[
              { to: "services", label: "Services" },
              { to: "gallery", label: "Gallery" },
              { to: "map", label: "Map & Location" },
              { to: "reviews", label: "Reviews" },
              { to: "specialists", label: "Specialists" },
            ].map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  `px-5 py-3.5 text-sm md:text-base font-bold whitespace-nowrap transition-all duration-200 border-b-2 ${isActive
                    ? "text-rose-500 border-rose-500"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* ── TAB CONTENT AREA ── */}
        <div className={`${PX} py-6 md:py-8 min-h-[400px]`}>
          <Outlet context={{ saloonDetails: salon, serviceMode }} />
        </div>
      </div>
    </div>
  );
};

export default HomeSaloonsDetails;