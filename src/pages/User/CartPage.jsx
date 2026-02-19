import React, { useEffect, useState } from "react";
import {
  Trash2,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  Clock,
  Home,
  Store,
  Scissors,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  Heart,
  MapPin,
  Phone,
  Plus,
  Gift,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createBooking } from "../../redux/slice/userSlice";
import DateTimePicker from "../../utils/DateTimePicker";
import toast from "react-hot-toast";
import { calculateTimeSlot } from "../../utils/TimeSlot";

const getCartKey = (userId) => `@user_cart_${userId}`;

// Free offer config
const FREE_OFFER_THRESHOLD = 999;
const FREE_OFFER_NAME = "Nail Polish";
const FREE_OFFER_VALUE = 99;

// Service image mapping
const SERVICE_IMAGES = {
  hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop&crop=face",
  facial: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&h=200&fit=crop&crop=face",
  wax: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop&crop=face",
  makeup: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=200&h=200&fit=crop&crop=face",
  nail: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop&crop=face",
  spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop&crop=face",
};

const getServiceImage = (name) => {
  const lower = name?.toLowerCase() || "";
  for (const [key, url] of Object.entries(SERVICE_IMAGES)) {
    if (lower.includes(key)) return url;
  }
  return SERVICE_IMAGES.hair;
};

const formatDuration = (mins) => {
  if (!mins) return "";
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h} hour ${m} min` : `${h} hour`;
};

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlotInfo, setActiveSlotInfo] = useState(null);
  const [bookings, setBookings] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const data = localStorage.getItem(getCartKey(userId));
    setCart(data ? JSON.parse(data) : []);
  }, [userId]);

  // Initialize all sections as expanded
  useEffect(() => {
    const sections = {};
    cart.forEach((salon) => {
      const modes = [...new Set(salon.services.map((s) => s.bookedMode || "salon"))];
      modes.forEach((mode) => {
        sections[`${salon.salonId}-${mode}`] = true;
      });
    });
    setExpandedSections(sections);
  }, [cart]);

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const removeService = (salonId, serviceId) => {
    const updated = cart
      .map((salon) =>
        salon.salonId === salonId
          ? {
            ...salon,
            services: salon.services.filter((s) => s._id !== serviceId),
          }
          : salon,
      )
      .filter((salon) => salon.services.length > 0);

    setCart(updated);
    localStorage.setItem(getCartKey(userId), JSON.stringify(updated));
  };

  const handleConfirmDateTime = (data) => {
    if (activeSlotInfo) {
      const key = `${activeSlotInfo.salonId}-${activeSlotInfo.mode}`;
      setBookings({ ...bookings, [key]: data });
    }
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    const bookingsPayload = [];

    cart.forEach((salon) => {
      const salonServicesByMode = {};

      salon.services.forEach((service) => {
        const mode = service.bookedMode || "salon";
        if (!salonServicesByMode[mode]) {
          salonServicesByMode[mode] = [];
        }
        salonServicesByMode[mode].push(service);
      });

      Object.entries(salonServicesByMode).forEach(([mode, services]) => {
        const slotKey = `${salon.salonId}-${mode}`;
        const slotData = bookings[slotKey];

        if (!slotData) return;

        const timeSlot = calculateTimeSlot(slotData.time, services);

        bookingsPayload.push({
          providerId: salon.salonId,
          services: services.map((s) => s._id),
          bookingDate: new Date(
            `${slotData.year}-${String(
              new Date(`${slotData.month} 1`).getMonth() + 1
            ).padStart(2, "0")}-${slotData.day}T00:00:00`
          ),
          timeSlot,
          bookingType: mode === "home" ? "home_service" : "in_salon",
          serviceLocation:
            mode === "home"
              ? {
                address: slotData.address || "User Address",
                coordinates: {
                  type: "Point",
                  coordinates: [
                    Number(slotData.lng) || 0,
                    Number(slotData.lat) || 0,
                  ],
                },
              }
              : undefined,
        });
      });
    });

    if (!bookingsPayload.length) {
      toast.error("Please schedule all slots");
      return;
    }

    try {
      await toast.promise(
        dispatch(createBooking({ bookings: bookingsPayload })).unwrap(),
        {
          loading: "Processing booking...",
          success: "Confirmed!",
          error: "Failed to book.",
        },
      );

      setCart([]);
      localStorage.removeItem(getCartKey(userId));
      navigate("/bookings");
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotals = () => {
    let salonTotal = 0;
    let homeTotal = 0;
    cart.forEach((salon) => {
      salon.services.forEach((s) => {
        const price = Number(s.price) || 0;
        const charge =
          s.bookedMode === "home" ? Number(s.homeServiceCharge) || 40 : 0;
        if (s.bookedMode === "home") homeTotal += price + charge;
        else salonTotal += price;
      });
    });
    return { salonTotal, homeTotal, grandTotal: salonTotal + homeTotal };
  };

  const { salonTotal, homeTotal, grandTotal } = calculateTotals();
  const totalServices = cart.reduce((acc, s) => acc + s.services.length, 0);

  // Free offer
  const offerUnlocked = grandTotal >= FREE_OFFER_THRESHOLD;
  const amountToFreeOffer = Math.max(0, FREE_OFFER_THRESHOLD - grandTotal);
  const discount = offerUnlocked ? FREE_OFFER_VALUE : 0;
  const finalTotal = grandTotal - discount;

  const requiredSlotsCount = cart.reduce(
    (acc, salon) =>
      acc + new Set(salon.services.map((s) => s.bookedMode || "salon")).size,
    0,
  );
  const scheduledSlotsCount = Object.keys(bookings).length;

  // Empty cart state
  if (!cart.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50/60 p-6">
        <div className="bg-white p-12 rounded-3xl shadow-sm text-center max-w-md border border-pink-100">
          <div className="bg-pink-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={48} className="text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mt-3 mb-8">
            Time to add some sparkle! Browse our top-rated salons.
          </p>
          <button
            onClick={() => navigate("/salons")}
            className="w-full py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-pink-200/50 transition-all"
          >
            Explore Salons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50/60 pb-28">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-pink-50/90 backdrop-blur-lg">
        <div className="flex items-center justify-between px-5 md:px-10 py-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Review Booking
          </h1>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-100 transition-colors"
          >
            <Heart
              className={`w-6 h-6 transition-colors ${isFavorited
                  ? "text-rose-500 fill-rose-500"
                  : "text-rose-400 fill-rose-400"
                }`}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-10 py-4 space-y-4 max-w-4xl mx-auto">
        {cart.map((salon) => {
          const groups = [
            {
              mode: "salon",
              label: "Visit Salon",
              icon: <Store size={18} className="text-rose-500" />,
              services: salon.services.filter((s) => s.bookedMode !== "home"),
            },
            {
              mode: "home",
              label: "Service at Home",
              icon: <Home size={18} className="text-rose-500" />,
              services: salon.services.filter((s) => s.bookedMode === "home"),
            },
          ].filter((g) => g.services.length > 0);

          return groups.map((group) => {
            const sectionKey = `${salon.salonId}-${group.mode}`;
            const isExpanded = expandedSections[sectionKey] !== false;
            const timeData = bookings[sectionKey];
            const groupTotal = group.services.reduce(
              (sum, s) => sum + (Number(s.price) || 0),
              0
            );

            return (
              <div
                key={sectionKey}
                className="bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-100/60 shadow-sm overflow-hidden"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(sectionKey)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-pink-50/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-rose-50 rounded-full flex items-center justify-center">
                      {group.icon}
                    </div>
                    <span className="text-base font-bold text-gray-900">
                      {group.label}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? "" : "-rotate-90"
                      }`}
                  />
                </button>

                {isExpanded && (
                  <div className="border-t border-pink-50">
                    {/* Salon Info */}
                    <div className="px-5 py-3 flex items-center gap-3 border-b border-pink-50">
                      <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                        <Scissors className="w-5 h-5 text-rose-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">{salon.salonName}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Gomti Nagar, Lucknow
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" /> +91 987654210
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Services List */}
                    <div className="px-5 py-3 space-y-3">
                      {group.services.map((service) => (
                        <div
                          key={service._id}
                          className="flex items-center gap-3"
                        >
                          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
                            <img
                              src={getServiceImage(service.name)}
                              alt={service.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900">{service.name}</p>
                            <p className="text-xs text-gray-400">
                              {formatDuration(service.durationMins)}
                            </p>
                          </div>
                          <p className="text-base font-bold text-gray-900 shrink-0">
                            ₹ {service.price}
                          </p>
                          <button
                            onClick={() => removeService(salon.salonId, service._id)}
                            className="ml-1 text-rose-300 hover:text-rose-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      {/* Free offer row */}
                      {offerUnlocked && (
                        <div className="flex items-center gap-3 bg-green-50 rounded-xl px-3 py-2">
                          <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                            <Gift className="w-6 h-6 text-green-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-green-700">
                              🎁 FREE {FREE_OFFER_NAME} Service Unlocked!
                            </p>
                            <p className="text-xs text-green-500">Discount Applied: ₹0</p>
                          </div>
                          <p className="text-base font-bold text-green-600 shrink-0">₹ 0</p>
                        </div>
                      )}
                    </div>

                    {/* Schedule Slot */}
                    <div className="px-5 py-3 border-t border-pink-50">
                      <button
                        onClick={() => {
                          setActiveSlotInfo({
                            salonId: salon.salonId,
                            mode: group.mode,
                          });
                          setIsModalOpen(true);
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${timeData
                            ? "bg-green-50 text-green-600 border border-green-200"
                            : "bg-pink-50 text-rose-500 border border-pink-200 hover:bg-pink-100"
                          }`}
                      >
                        <Clock size={16} />
                        {timeData
                          ? `${timeData.day} ${timeData.month}, ${timeData.time}`
                          : "Schedule Slot"}
                      </button>
                    </div>

                    {/* Section Subtotal */}
                    <div className="px-5 py-3 bg-pink-50/50 border-t border-pink-100/60 flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Subtotal</span>
                      <span className="text-lg font-bold text-gray-900">₹ {groupTotal}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          });
        })}

        {/* Free Offer Progress Banner */}
        {!offerUnlocked && grandTotal > 0 && (
          <div
            className="rounded-2xl px-5 py-3.5 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 30%, #e8a87c 70%, #f5d0a9 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 50%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 75% 25%, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "25px 25px, 35px 35px",
              }}
            />
            <p className="text-sm font-bold text-gray-800 relative z-10">
              ✨ Spend ₹{FREE_OFFER_THRESHOLD} & Get {FREE_OFFER_NAME} FREE
            </p>
            <div className="mt-2 flex items-center gap-3 relative z-10">
              <div className="flex-1 h-2 bg-white/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(1, grandTotal / FREE_OFFER_THRESHOLD) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-gray-700 shrink-0">
                ₹{grandTotal} / ₹{FREE_OFFER_THRESHOLD}
              </span>
            </div>
          </div>
        )}

        {offerUnlocked && (
          <div className="flex items-center gap-3 bg-green-50 rounded-2xl px-5 py-3 border border-green-200">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            <span className="text-sm font-bold text-green-700">
              Offer Unlocked! You saved ₹{FREE_OFFER_VALUE}
            </span>
            <span className="ml-auto text-sm font-bold text-green-600 flex items-center gap-1">
              🎁 FREE {FREE_OFFER_NAME}
            </span>
          </div>
        )}

        {/* Price Summary */}
        <div className="bg-white/90 rounded-2xl border border-pink-100/60 p-5 space-y-2.5">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Services ({totalServices})</span>
            <span className="text-gray-800 font-medium">₹{grandTotal}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({FREE_OFFER_NAME})</span>
              <span className="font-medium">- ₹{discount}</span>
            </div>
          )}
          <div className="pt-2 border-t border-pink-100 flex justify-between">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-xl font-black text-rose-500">₹{finalTotal}</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-pink-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between px-5 md:px-10 py-3.5 max-w-4xl mx-auto">
          <div className="text-gray-800">
            <span className="text-sm font-medium text-gray-500">
              {totalServices} Service{totalServices > 1 ? "s" : ""} | ₹{grandTotal}
            </span>
            {discount > 0 && (
              <span className="ml-3 text-lg font-black text-rose-500">₹{finalTotal}</span>
            )}
          </div>
          <button
            disabled={scheduledSlotsCount < requiredSlotsCount}
            onClick={handleSubmit}
            className={`px-8 py-3 rounded-2xl text-base font-bold transition-all shadow-lg ${scheduledSlotsCount < requiredSlotsCount
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:shadow-xl hover:shadow-pink-300/50 active:scale-95"
              }`}
          >
            {scheduledSlotsCount < requiredSlotsCount
              ? `Set ${requiredSlotsCount - scheduledSlotsCount} More Slot(s)`
              : "Confirm Booking"}
          </button>
        </div>
      </div>

      <DateTimePicker
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDateTime}
      />
    </div>
  );
};

export default CartPage;
