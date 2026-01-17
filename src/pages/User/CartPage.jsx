import React, { useEffect, useState } from "react";
import { Trash2, ChevronRight, ShoppingBag, Clock, MapPin, Home, Store, Scissors, Sparkles } from "lucide-react";
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
          ? { ...salon, services: salon.services.filter((s) => s._id !== serviceId) }
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

  // Calculation Logic
  const calculateTotals = () => {
    let salonTotal = 0;
    let homeTotal = 0;
    cart.forEach(salon => {
      salon.services.forEach(s => {
        const price = Number(s.price) || 0;
        const charge = s.bookedMode === "home" ? (Number(s.homeServiceCharge) || 40) : 0;
        if (s.bookedMode === "home") homeTotal += (price + charge);
        else salonTotal += price;
      });
    });
    return { salonTotal, homeTotal, grandTotal: salonTotal + homeTotal };
  };

  const { salonTotal, homeTotal, grandTotal } = calculateTotals();
  const requiredSlotsCount = cart.reduce((acc, salon) => 
    acc + new Set(salon.services.map(s => s.bookedMode || "salon")).size, 0);
  const scheduledSlotsCount = Object.keys(bookings).length;

  if (!cart.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-12 rounded-[40px] shadow-xl text-center max-w-md">
          <div className="bg-pink-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Empty Glow-up Box</h2>
          <p className="text-slate-500 mt-3 mb-8">Add some magic to your cart to see them here!</p>
          <button onClick={() => navigate("/salons")} className="w-full py-4 bg-pink-500 text-white rounded-2xl font-bold hover:bg-pink-600 transition-all">
            Browse Salons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FE] py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold italic">G</div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">Glownify</span>
          </div>
          <h1 className="text-3xl font-extrabold text-pink-500">Booking Summary</h1>
        </div>

        <div className="space-y-6">
          {cart.map((salon) => {
            const groups = [
              { mode: "salon", label: "At Salon", icon: <Store size={18}/>, services: salon.services.filter(s => s.bookedMode !== "home") },
              { mode: "home", label: "At Home", icon: <Home size={18}/>, services: salon.services.filter(s => s.bookedMode === "home") }
            ].filter(g => g.services.length > 0);

            return (
              <div key={salon.salonId} className="space-y-4">
                <button className="flex items-center gap-2 text-indigo-900 font-bold text-lg px-2 hover:opacity-70">
                  <Store size={20} className="text-pink-500" />
                  {salon.salonName}
                  <ChevronRight size={18} />
                </button>

                {groups.map((group) => {
                  const slotKey = `${salon.salonId}-${group.mode}`;
                  const timeData = bookings[slotKey];
                  const groupPrice = group.services.reduce((sum, s) => {
                    const base = Number(s.price) || 0;
                    const fee = group.mode === "home" ? (Number(s.homeServiceCharge) || 40) : 0;
                    return sum + base + fee;
                  }, 0);

                  return (
                    <div key={group.mode} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                      <div className="p-5 space-y-6">
                        {group.services.map((service) => (
                          <div key={service._id} className="relative group">
                            <div className="flex justify-between items-start">
                              <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
                                  {service.name.toLowerCase().includes("hair") ? <Scissors size={24}/> : <Sparkles size={24}/>}
                                </div>
                                <div>
                                  <h3 className="font-bold text-slate-800 text-lg">{service.name} {group.mode === "home" && "(Home)"}</h3>
                                  <ul className="mt-2 space-y-1">
                                    <li className="text-slate-500 text-sm flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                                      Service Price: <span className="font-bold text-slate-700">₹{service.price}</span>
                                    </li>
                                    {group.mode === "home" && (
                                      <li className="text-slate-500 text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                                        Home Service Charge: <span className="font-bold text-slate-700">₹{service.homeServiceCharge || 40}</span>
                                      </li>
                                    )}
                                    <li className="text-slate-500 text-sm flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                                      Location: <span className="font-bold text-indigo-900">{group.label}</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <button 
                                  onClick={() => { setActiveSlotInfo({ salonId: salon.salonId, mode: group.mode }); setIsModalOpen(true); }}
                                  className="flex items-center gap-1.5 text-slate-500 text-sm hover:text-pink-500 transition-colors mb-2"
                                >
                                  <Clock size={16} />
                                  {timeData ? `${timeData.day} ${timeData.month}, ${timeData.time}` : "Select Slot"}
                                </button>
                                <button onClick={() => removeService(salon.salonId, service._id)} className="p-2 text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Group Footer */}
                      <div className="bg-slate-50/50 px-6 py-4 flex justify-between items-center border-t border-slate-100">
                         <span className="text-slate-500 text-sm font-medium">Pay {group.mode === 'home' ? 'at Home' : 'at Salon'}: <span className="text-slate-900 font-bold">₹{groupPrice}</span></span>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total to Pay</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Floating Bottom Summary */}
        <div className="mt-8 bg-white rounded-t-[32px] rounded-b-xl shadow-2xl border border-slate-100 p-1 overflow-hidden">
          <div className="flex divide-x divide-slate-100 border-b border-slate-100">
            <div className="flex-1 p-4 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Pay at Salon</p>
              <p className="text-lg font-black text-slate-800">₹{salonTotal}</p>
            </div>
            <div className="flex-1 p-4 text-center group cursor-pointer hover:bg-slate-50">
              <p className="text-[10px] text-slate-400 font-bold uppercase flex justify-center items-center gap-1">
                Pay at Home <ChevronRight size={12}/>
              </p>
              <p className="text-lg font-black text-slate-800">₹{homeTotal}</p>
            </div>
          </div>
          
          <button
            disabled={scheduledSlotsCount < requiredSlotsCount}
            onClick={handleSubmit}
            className={`w-full py-5 text-lg font-extrabold transition-all ${
              scheduledSlotsCount < requiredSlotsCount
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-pink-500 text-white hover:bg-pink-600 active:scale-[0.99]"
            }`}
          >
            {scheduledSlotsCount < requiredSlotsCount ? "Finish Selecting Slots" : "Confirm Booking"}
          </button>
        </div>
      </div>

      <DateTimePicker isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmDateTime} />
    </div>
  );
};

export default CartPage;