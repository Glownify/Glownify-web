import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServiceItemByCategory } from "../../../../redux/slice/userSlice";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import {
  Clock,
  Plus,
  Minus,
  Home,
  Store,
  Smartphone,
  X,
  ShoppingCart,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../../../../utils/CartStorage";

// Placeholder images for service categories
const SERVICE_IMAGES = {
  hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop&crop=face",
  facial: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&h=200&fit=crop&crop=face",
  wax: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop&crop=face",
  makeup: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=200&h=200&fit=crop&crop=face",
  nail: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop&crop=face",
  spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop&crop=face",
  beard: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop&crop=face",
  color: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=200&h=200&fit=crop&crop=face",
};

const getServiceImage = (name) => {
  const lower = name?.toLowerCase() || "";
  for (const [key, url] of Object.entries(SERVICE_IMAGES)) {
    if (lower.includes(key)) return url;
  }
  return SERVICE_IMAGES.hair;
};

const formatDuration = (mins) => {
  if (!mins) return "45 min";
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h} hour ${m} min` : `${h} hour`;
};

// ─── Fallback demo services for placeholder salons ───
const DEMO_SERVICES = {
  "cat-1": [ // Hair
    { _id: "demo-h1", name: "Hair Cut & Style", price: 299, durationMins: 45, serviceMode: "both", homeServiceCharge: 50 },
    { _id: "demo-h2", name: "Hair Spa Treatment", price: 799, durationMins: 60, serviceMode: "both", homeServiceCharge: 80 },
    { _id: "demo-h3", name: "Hair Coloring", price: 1499, durationMins: 90, serviceMode: "salon", homeServiceCharge: 0 },
    { _id: "demo-h4", name: "Hair Straightening", price: 2499, durationMins: 120, serviceMode: "salon", homeServiceCharge: 0 },
  ],
  "cat-2": [ // Facial
    { _id: "demo-f1", name: "Classic Facial", price: 499, durationMins: 45, serviceMode: "both", homeServiceCharge: 60 },
    { _id: "demo-f2", name: "Gold Facial", price: 999, durationMins: 60, serviceMode: "both", homeServiceCharge: 80 },
    { _id: "demo-f3", name: "Diamond Facial", price: 1499, durationMins: 75, serviceMode: "both", homeServiceCharge: 100 },
  ],
  "cat-3": [ // Wax
    { _id: "demo-w1", name: "Full Arms Waxing", price: 199, durationMins: 30, serviceMode: "both", homeServiceCharge: 40 },
    { _id: "demo-w2", name: "Full Legs Waxing", price: 299, durationMins: 40, serviceMode: "both", homeServiceCharge: 50 },
    { _id: "demo-w3", name: "Full Body Waxing", price: 899, durationMins: 90, serviceMode: "both", homeServiceCharge: 100 },
  ],
  "cat-4": [ // Makeup
    { _id: "demo-m1", name: "Party Makeup", price: 1999, durationMins: 60, serviceMode: "both", homeServiceCharge: 150 },
    { _id: "demo-m2", name: "Bridal Makeup", price: 4999, durationMins: 120, serviceMode: "both", homeServiceCharge: 200 },
    { _id: "demo-m3", name: "Engagement Makeup", price: 3499, durationMins: 90, serviceMode: "both", homeServiceCharge: 180 },
  ],
};

// Free offer threshold
const FREE_OFFER_THRESHOLD = 999;
const FREE_OFFER_NAME = "Nail Polish Service";

const SalonServices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = useSelector((state) => state?.auth?.user?._id);
  const { saloonDetails } = useOutletContext();

  const isPlaceholder = id?.startsWith("placeholder");

  const [activeTab, setActiveTab] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [demoItems, setDemoItems] = useState([]);

  // Modal State
  const [showModeModal, setShowModeModal] = useState(false);
  const [pendingService, setPendingService] = useState(null);

  const categories = saloonDetails?.serviceCategories || [];
  const selectedSalonId = saloonDetails?._id;
  const { serviceItems, loading } = useSelector((state) => state.user);

  // Use demo items for placeholder salons, real items for real salons
  const displayItems = isPlaceholder ? demoItems : serviceItems;

  useEffect(() => {
    if (userId) setCartItems(getCart(userId));
  }, [userId]);

  // Auto-select first category
  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      const firstCat = categories[0]._id;
      setActiveTab(firstCat);
      if (isPlaceholder) {
        setDemoItems(DEMO_SERVICES[firstCat] || []);
      } else {
        dispatch(fetchServiceItemByCategory({ salonId: selectedSalonId, categoryId: firstCat }));
      }
    }
  }, [categories, activeTab, selectedSalonId, dispatch, isPlaceholder]);

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
    if (isPlaceholder) {
      setDemoItems(DEMO_SERVICES[categoryId] || []);
    } else {
      dispatch(fetchServiceItemByCategory({ salonId: selectedSalonId, categoryId }));
    }
  };

  const initiateAddToCart = (service) => {
    if (service.serviceMode === "both") {
      setPendingService(service);
      setShowModeModal(true);
    } else {
      confirmAddToCart(service, service.serviceMode);
    }
  };

  const confirmAddToCart = (service, selectedMode) => {
    const updated = addToCart(userId, saloonDetails, service, selectedMode);
    setCartItems(updated);
    setShowModeModal(false);
    setPendingService(null);
  };

  const handleRemoveFromCart = (serviceId) => {
    const updated = removeFromCart(userId, selectedSalonId, serviceId);
    setCartItems(updated);
  };

  const getServiceQuantity = (serviceId) => {
    const salon = cartItems.find((s) => s.salonId === selectedSalonId);
    const service = salon?.services.find((s) => s._id === serviceId);
    return service ? service.quantity || 1 : 0;
  };

  // Calculate cart totals for this salon
  const currentSalonCart = cartItems.find((s) => s.salonId === selectedSalonId);
  const cartServiceCount = currentSalonCart?.services?.length || 0;
  const cartTotal = currentSalonCart?.services?.reduce((sum, s) => sum + (Number(s.price) || 0), 0) || 0;

  // Free offer progress
  const amountToFreeOffer = Math.max(0, FREE_OFFER_THRESHOLD - cartTotal);
  const offerProgress = Math.min(1, cartTotal / FREE_OFFER_THRESHOLD);
  const offerUnlocked = cartTotal >= FREE_OFFER_THRESHOLD;

  const isLoading = loading && !isPlaceholder;

  return (
    <div className="w-full min-h-[400px] relative pb-24">
      {/* Mode Selection Modal */}
      {showModeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModeModal(false)} />
          <div className="relative bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowModeModal(false)}
              className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Choose Service Mode</h3>
              <p className="text-gray-500 text-sm mt-2">Where would you like this service?</p>
            </div>

            <div className="grid gap-4">
              <button
                onClick={() => confirmAddToCart(pendingService, "salon")}
                className="flex items-center justify-between p-5 border-2 border-gray-100 rounded-2xl hover:border-rose-300 hover:bg-pink-50/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <Store className="w-6 h-6 text-rose-500" />
                  <span className="font-bold text-gray-800">At Salon</span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-rose-400 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>

              <button
                onClick={() => confirmAddToCart(pendingService, "home")}
                className="flex items-center justify-between p-5 border-2 border-gray-100 rounded-2xl hover:border-rose-300 hover:bg-pink-50/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <Home className="w-6 h-6 text-rose-500" />
                  <span className="font-bold text-gray-800">At Home</span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-rose-400 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Pill Tabs */}
      <div className="sticky top-0 z-20 bg-pink-50/95 backdrop-blur-sm px-4 md:px-6 lg:px-8 py-3">
        <div className="flex overflow-x-auto no-scrollbar gap-2.5">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleTabClick(category._id)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border ${activeTab === category._id
                  ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white border-transparent shadow-md shadow-pink-200/50"
                  : "bg-white text-gray-600 border-pink-200 hover:border-pink-300 hover:text-gray-800"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Service List */}
      <div className="px-4 md:px-6 lg:px-8 py-4 space-y-3">
        {isLoading ? (
          // Skeleton loading
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/70 rounded-2xl p-4 animate-pulse flex gap-4">
                <div className="w-20 h-20 bg-pink-100 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-pink-100 rounded w-2/3" />
                  <div className="h-3 bg-pink-50 rounded w-1/3" />
                  <div className="h-5 bg-pink-100 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {displayItems?.map((service) => {
              const qty = getServiceQuantity(service._id);
              return (
                <div
                  key={service._id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-pink-100/60 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex gap-4 items-center">
                    {/* Service Thumbnail */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 shadow-sm">
                      <img
                        src={getServiceImage(service.name)}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Service Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                        {service.name}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(service.durationMins)}
                      </p>
                      <p className="text-lg md:text-xl font-black text-gray-900 mt-1">
                        ₹ {service.price?.toLocaleString?.() || service.price}
                      </p>
                    </div>

                    {/* Add / Qty Controls */}
                    <div className="shrink-0">
                      {qty > 0 ? (
                        <div className="flex items-center gap-0 border border-pink-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => handleRemoveFromCart(service._id)}
                            className="w-9 h-9 flex items-center justify-center bg-pink-50 hover:bg-pink-100 transition-colors text-rose-500"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-9 h-9 flex items-center justify-center text-sm font-bold text-gray-800 bg-white">
                            {qty}
                          </span>
                          <button
                            onClick={() => initiateAddToCart(service)}
                            className="w-9 h-9 flex items-center justify-center bg-pink-50 hover:bg-pink-100 transition-colors text-rose-500"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => initiateAddToCart(service)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border-2 border-rose-300 text-rose-500 bg-white hover:bg-rose-50 transition-all active:scale-95"
                        >
                          <Plus className="w-4 h-4" /> Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* No services message */}
            {(!displayItems || displayItems.length === 0) && !isLoading && activeTab && (
              <div className="text-center py-12">
                <Sparkles className="w-10 h-10 text-pink-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No services in this category yet</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Free Offer Progress Banner */}
      {cartServiceCount > 0 && (
        <div className="px-4 md:px-6 lg:px-8 pb-4">
          <div
            className="rounded-2xl px-5 py-3 relative overflow-hidden"
            style={{
              background: offerUnlocked
                ? "linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%)"
                : "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 30%, #e8a87c 70%, #f5d0a9 100%)",
            }}
          >
            {!offerUnlocked && (
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 15% 50%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 75% 25%, rgba(255,255,255,0.3) 1px, transparent 1px), radial-gradient(circle at 50% 75%, rgba(255,255,255,0.35) 1px, transparent 1px)",
                  backgroundSize: "25px 25px, 35px 35px, 20px 20px",
                }}
              />
            )}
            <div className="relative z-10">
              <p className="text-sm font-bold text-gray-800">
                {offerUnlocked
                  ? `✅ Offer Unlocked! You saved ₹99 — FREE ${FREE_OFFER_NAME}`
                  : `✨ ₹${amountToFreeOffer} away from FREE ${FREE_OFFER_NAME}`}
              </p>
              {!offerUnlocked && (
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: `${offerProgress * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-700 shrink-0">
                    ₹{cartTotal} / ₹{FREE_OFFER_THRESHOLD}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Cart Bar */}
      {cartServiceCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-pink-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between px-5 md:px-10 py-3.5 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-gray-800">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="text-base font-bold">
                {cartServiceCount} Service{cartServiceCount > 1 ? "s" : ""} |{" "}
                <span className="text-gray-900">₹{cartTotal.toLocaleString()}</span>
              </span>
            </div>
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold text-sm shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-300/50 active:scale-95 transition-all"
            >
              Review Booking <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonServices;