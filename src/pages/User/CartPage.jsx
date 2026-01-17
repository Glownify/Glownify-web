import React, { useEffect, useState } from "react";
import {
  Trash2,
  ChevronRight,
  ShoppingBag,
  Clock,
  MapPin,
  Home,
  Store,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createBooking } from "../../redux/slice/userSlice";
import DateTimePicker from "../../utils/DateTimePicker";
import toast from "react-hot-toast";

const getCartKey = (userId) => `@user_cart_${userId}`;

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlotInfo, setActiveSlotInfo] = useState(null);
  const [bookings, setBookings] = useState({});

  useEffect(() => {
    if (!userId) return;
    const data = localStorage.getItem(getCartKey(userId));
    setCart(data ? JSON.parse(data) : []);
  }, [userId]);

  const removeService = (salonId, serviceId) => {
    const updated = cart
      .map((salon) =>
        salon.salonId === salonId
          ? {
              ...salon,
              services: salon.services.filter((s) => s._id !== serviceId),
            }
          : salon
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

  const grandTotal = cart.reduce(
    (acc, salon) => acc + salon.services.reduce((sum, s) => sum + s.price, 0),
    0
  );

  const requiredSlotsCount = cart.reduce((acc, salon) => {
    const uniqueModesInSalon = new Set(salon.services.map((s) => s.bookedMode));
    return acc + uniqueModesInSalon.size;
  }, 0);

  const scheduledSlotsCount = Object.keys(bookings).length;

  const handleSubmit = async () => {
    const payload = {
      userId,
      salons: cart.map((salon) => ({
        salonId: salon.salonId,
        services: salon.services.map((s) => ({
          serviceId: s._id,
          bookingDateTime: bookings[`${salon.salonId}-${s.bookedMode}`],
        })),
      })),
    };

    try {
      await toast.promise(dispatch(createBooking(payload)).unwrap(), {
        loading: "Processing booking...",
        success: "Confirmed! 🎉",
        error: "Failed to book.",
      });
      setCart([]);
      localStorage.removeItem(getCartKey(userId));
      navigate("/bookings");
    } catch (e) {
      console.error(e);
    }
  };

  if (!cart.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-10 rounded-[40px] shadow-sm flex flex-col items-center border border-gray-100">
          <ShoppingBag size={80} className="text-purple-200 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
          <p className="text-gray-500 mt-2 mb-8 text-center max-w-[250px]">
            Looks like you haven't added any beauty services yet.
          </p>
          <button
            onClick={() => navigate("/salons")}
            className="px-10 py-3 bg-purple-900 text-white rounded-2xl font-semibold hover:bg-purple-950 transition-all shadow-lg shadow-purple-200"
          >
            Explore Salons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        
        {/* LEFT COLUMN: SALON CARDS */}
        <div className="space-y-8">
          <h1 className="text-3xl font-black text-gray-900 px-2">Your Selections</h1>
          
          {cart.map((salon) => {
            const homeServices = salon.services.filter(s => s.bookedMode === "home");
            const salonServices = salon.services.filter(s => s.bookedMode === "salon" || !s.bookedMode);
            
            const groups = [
              { mode: "home", label: "Home Service", icon: <Home size={16}/>, services: homeServices },
              { mode: "salon", label: "In-Salon", icon: <MapPin size={16}/>, services: salonServices }
            ].filter(g => g.services.length > 0);

            return (
              <div 
                key={salon.salonId} 
                className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Salon Header */}
                <div className="bg-purple-50/50 px-6 py-5 flex items-center justify-between border-b border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-purple-100">
                      <Store className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{salon.salonName}</h2>
                      <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider">Professional Studio</p>
                    </div>
                  </div>
                </div>

                {/* Service Groups (Home vs Salon) */}
                <div className="p-6 space-y-6">
                  {groups.map((group) => {
                    const slotKey = `${salon.salonId}-${group.mode}`;
                    const timeData = bookings[slotKey];

                    return (
                      <div key={group.mode} className="rounded-2xl border border-gray-100 bg-gray-50/30 overflow-hidden">
                        {/* Group Sub-Header */}
                        <div className="px-4 py-3 bg-white border-b border-gray-100 flex justify-between items-center">
                          <div className="flex items-center gap-2 text-gray-600 font-bold text-xs uppercase tracking-tight">
                            {group.icon}
                            {group.label}
                          </div>
                          
                          <button
                            onClick={() => {
                              setActiveSlotInfo({ salonId: salon.salonId, mode: group.mode });
                              setIsModalOpen(true);
                            }}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                              timeData 
                                ? "bg-green-50 text-green-700 border-green-100" 
                                : "bg-rose-50 text-rose-600 border-rose-100 animate-pulse"
                            }`}
                          >
                            {timeData ? `📅 ${timeData.day} ${timeData.month}, ${timeData.time}` : "🕒 Select Time"}
                          </button>
                        </div>

                        {/* Services List */}
                        <div className="divide-y divide-gray-100">
                          {group.services.map((service) => (
                            <div key={service._id} className="p-4 flex items-center justify-between group">
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-2xl shadow-sm">
                                  {service?.image || "✨"}
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-800">{service.name}</h3>
                                  <div className="flex items-center gap-3 mt-1">
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                      <Clock size={12} /> {service.durationMins}m
                                    </span>
                                    <span className="text-purple-700 font-bold text-sm">₹{service.price}</span>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => removeService(salon.salonId, service._id)}
                                className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: STICKY SUMMARY */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-6">Summary</h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Total Services</span>
                <span className="font-bold text-gray-800">
                  {cart.reduce((acc, s) => acc + s.services.length, 0)}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-gray-500 text-sm">Amount Payable</span>
                <span className="text-3xl font-black text-purple-900 leading-none">₹{grandTotal}</span>
              </div>
            </div>

            <button
              disabled={scheduledSlotsCount < requiredSlotsCount}
              onClick={handleSubmit}
              className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                scheduledSlotsCount < requiredSlotsCount
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                  : "bg-purple-900 text-white hover:bg-purple-950 active:scale-[0.98] shadow-purple-200"
              }`}
            >
              Confirm & Pay
              <ChevronRight size={20} />
            </button>
            
            {scheduledSlotsCount < requiredSlotsCount && (
              <div className="mt-6 p-4 bg-rose-50 rounded-2xl border border-rose-100">
                <p className="text-[11px] text-rose-600 font-bold text-center uppercase tracking-wider">
                  Action Required:
                </p>
                <p className="text-[10px] text-rose-500 text-center mt-1">
                  Please select dates for all {requiredSlotsCount} service groups.
                </p>
              </div>
            )}
          </div>
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