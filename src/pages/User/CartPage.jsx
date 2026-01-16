import React, { useEffect, useState } from "react";
import { Scissors, Hand, Smile, Trash2, Calendar, ChevronRight, ShoppingBag, Clock } from "lucide-react";
import { MdSpa } from "react-icons/md";
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
  
  // Track specific service being edited
  const [activeServiceInfo, setActiveServiceInfo] = useState(null); 
  const [bookings, setBookings] = useState({}); // Keyed by serviceId

  useEffect(() => {
    if (!userId) return;
    const data = localStorage.getItem(getCartKey(userId));
    setCart(data ? JSON.parse(data) : []);
  }, [userId]);

  const removeService = (salonId, serviceId) => {
    const updated = cart
      .map((salon) =>
        salon.salonId === salonId
          ? { ...salon, services: salon.services.filter((s) => s._id !== serviceId) }
          : salon
      )
      .filter((salon) => salon.services.length > 0);

    setCart(updated);
    localStorage.setItem(getCartKey(userId), JSON.stringify(updated));
    
    // Clean up booking state if service removed
    const newBookings = { ...bookings };
    delete newBookings[serviceId];
    setBookings(newBookings);
  };

  const handleConfirmDateTime = (data) => {
    if (activeServiceInfo) {
      setBookings({ ...bookings, [activeServiceInfo.serviceId]: data });
    }
    setIsModalOpen(false);
  };

  const grandTotal = cart.reduce((acc, salon) => 
    acc + salon.services.reduce((sum, s) => sum + s.price, 0), 0
  );

  // Validation: Count total services vs scheduled services
  const totalServicesInCart = cart.reduce((acc, salon) => acc + salon.services.length, 0);
  const scheduledServicesCount = Object.keys(bookings).length;

  const handleSubmit = async () => {
    const payload = {
      userId,
      salons: cart.map((salon) => ({
        salonId: salon.salonId,
        // Map individual services with their specific times
        services: salon.services.map((s) => ({
          serviceId: s._id,
          bookingDateTime: bookings[s._id]
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
    } catch (e) { console.error(e); }
  };

  if (!cart.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <button onClick={() => navigate('/salons')} className="mt-6 px-8 py-3 bg-purple-900 text-white rounded-full font-semibold">
          Explore Salons
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
        
        <div className="bg-white rounded-[28px] shadow-2xl p-5 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 px-2">Your Selections</h1>
          
          {cart.map((salon) => (
            <div key={salon.salonId} className="mb-10 last:mb-0">
              <div className="flex items-center gap-2 text-purple-900 font-bold mb-4 px-2">
                <span className="text-xl">🏪</span>
                <span className="text-xl">{salon.salonName}</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>

              <div className="rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.15)] overflow-hidden bg-white border border-gray-100">
                {salon.services.map((service, idx) => (
                  <div key={service._id}>
                    {idx > 0 && <div className="w-full border-t border-gray-100"></div>}
                    
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
                            {service?.image}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{service.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                              <Clock size={12} /> {service.durationMins} mins
                            </div>
                          </div>
                        </div>

                        <div className="text-xs sm:text-sm text-gray-600 flex flex-col items-end gap-2">
                            <button 
                                onClick={() => {
                                    setActiveServiceInfo({ salonId: salon.salonId, serviceId: service._id });
                                    setIsModalOpen(true);
                                }}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                                    bookings[service._id] 
                                    ? "bg-purple-50 text-purple-700 border border-purple-100" 
                                    : "bg-gray-50 text-rose-500 border border-rose-100"
                                }`}
                            >
                                📅 <span>{bookings[service._id] ? `${bookings[service._id].day} ${bookings[service._id].month}, ${bookings[service._id].time}` : "Set Time"}</span>
                            </button>
                            <button onClick={() => removeService(salon.salonId, service._id)} className="text-gray-300 hover:text-red-500 transition-colors pt-1">
                                <Trash2 size={18} />
                            </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between items-end sm:items-center bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-200">
                        <ul className="space-y-1 text-gray-500 text-sm list-disc marker:text-rose-500 ml-4">
                          <li>Service Price: ₹{service.price}</li>
                          <li>Location: {service?.location || "At Salon"}</li>
                        </ul>
                        <div className="text-right mt-3 sm:mt-0">
                          <div className="text-purple-700 font-bold text-lg">₹{service.price}</div>
                          <div className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold">Amount to Pay</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-8">
          <div className="bg-white rounded-[28px] shadow-2xl p-6 border border-gray-50">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {cart.map((salon) => (
                <div key={salon.salonId} className="pb-4 border-b border-gray-50 last:border-0">
                  <p className="text-sm font-bold text-gray-800 mb-2">{salon.salonName}</p>
                  {salon.services.map(s => (
                    <div key={s._id} className="flex justify-between items-center mb-1">
                        <p className="text-xs text-gray-500 truncate max-w-[150px]">{s.name}</p>
                        <p className="text-[10px] font-medium text-purple-600">
                            {bookings[s._id] ? `${bookings[s._id].day} ${bookings[s._id].month.substring(0,3)}` : "⚠️ Missing Time"}
                        </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-500 font-medium">Grand Total</span>
                <span className="text-3xl font-black text-purple-900">₹{grandTotal}</span>
              </div>
              
              <button
                disabled={scheduledServicesCount < totalServicesInCart}
                onClick={handleSubmit}
                className={`w-full mt-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                  scheduledServicesCount < totalServicesInCart
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-purple-900 text-white hover:bg-purple-950 active:scale-[0.98]"
                }`}
              >
                Confirm & Pay
                <ChevronRight size={20} />
              </button>

              {scheduledServicesCount < totalServicesInCart && (
                <p className="text-center text-[10px] text-rose-500 font-bold mt-4 uppercase tracking-tighter">
                  ⚠ Schedule all {totalServicesInCart} services to continue
                </p>
              )}
            </div>
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