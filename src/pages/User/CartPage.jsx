// import React, { useEffect, useState } from "react";
// import { Trash2, Clock, Calendar, ChevronRight, ShoppingBag, ChevronLeft, X } from "lucide-react";
// import DateTimePicker from "../../utils/DateTimePicker";
// import { useNavigate } from "react-router-dom";
// import { useSelector,useDispatch } from "react-redux";
// import { createBooking } from "../../redux/slice/userSlice";
// import toast from "react-hot-toast";
// const getCartKey = (userId) => `@user_cart_${userId}`;

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userId = useSelector((state) => state.auth.user._id);
//   const [cart, setCart] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activeSalon, setActiveSalon] = useState(null);
//   const [bookings, setBookings] = useState({}); // Stores { salonId: { day, month, year, time } }

// useEffect(() => {
//   if (!userId) return;

//   const data = localStorage.getItem(getCartKey(userId));
//   setCart(data ? JSON.parse(data) : []);
// }, [userId]);

// const removeSalon = (salonId) => {
//   const updated = cart.filter((s) => s.salonId !== salonId);
//   setCart(updated);
//   localStorage.setItem(getCartKey(userId), JSON.stringify(updated));

//   const newBookings = { ...bookings };
//   delete newBookings[salonId];
//   setBookings(newBookings);
// };

// const removeService = (salonId, serviceId) => {
//   const updated = cart
//     .map((salon) =>
//       salon.salonId === salonId
//         ? { ...salon, services: salon.services.filter((s) => s._id !== serviceId) }
//         : salon
//     )
//     .filter((salon) => salon.services.length > 0);

//   setCart(updated);
//   localStorage.setItem(getCartKey(userId), JSON.stringify(updated));
// };

//   const openPicker = (salon) => {
//     setActiveSalon(salon);
//     setIsModalOpen(true);
//   };

//   // FIX 1: Updated to receive the full data object from the picker
//   const handleConfirmDateTime = (data) => {
//     setBookings({
//       ...bookings,
//       [activeSalon.salonId]: data // 'data' is { day, month, year, time }
//     });
//     setIsModalOpen(false);
//   };

//   const grandTotal = cart.reduce((acc, salon) =>
//     acc + salon.services.reduce((sum, s) => sum + s.price, 0), 0
//   );

//   const handleSubmit = async () => {
//   const payload = {
//     userId,
//     salons: cart.map((salon) => ({
//       salonId: salon.salonId,
//       bookingDateTime: bookings[salon.salonId],
//       services: salon.services.map((service) => service._id),
//     })),
//   };

//   try {
//     await toast.promise(
//       dispatch(createBooking(payload)).unwrap(),
//       {
//         loading: "Processing your booking...",
//         success: "Booking confirmed! 🎉",
//         error: "Booking failed. Please try again.",
//       }
//     );

//     // ✅ CLEAR CART FIRST
//     setCart([]);
//     setBookings({});
//     localStorage.removeItem(getCartKey(userId));

//     // ✅ THEN NAVIGATE
//     navigate("/bookings");

//   } catch (error) {
//     console.error("Booking Error:", error);
//   }
// };

//   if (!cart.length) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
//         <div className="bg-white p-8 rounded-full mb-6 shadow-sm">
//           <ShoppingBag size={48} className="text-gray-300" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
//         <p className="text-gray-500 mt-2 mb-8">Looks like you haven't added any services yet.</p>
//         <button onClick={()=>{navigate('/salons')}} className="px-8 py-3 bg-[#5A2C1E] text-white rounded-full font-semibold hover:bg-[#452117] transition-all">
//           Explore Salons
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-full mx-auto p-6 md:p-10 bg-gray-50 min-h-screen font-sans">
//       <header className="mb-10">
//         <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
//         <p className="text-gray-500 mt-1">Review your selected services and proceed to booking.</p>
//       </header>

//       <div className="flex flex-col lg:flex-row gap-10">
//         <div className="flex-1 space-y-8">
//           {cart.map((salon) => {
//             const totalDuration = salon.services.reduce((sum, s) => sum + s.durationMins, 0);
//             const totalPrice = salon.services.reduce((sum, s) => sum + s.price, 0);
//             const booking = bookings[salon.salonId];

//             return (
//               <div key={salon.salonId} className="group transition-all">
//                 <div className="flex justify-between items-end mb-4 px-1">
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                       {salon.salonName}
//                     </h2>
//                   </div>
//                   <button
//                     onClick={() => removeSalon(salon.salonId)}
//                     className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors flex items-center gap-1"
//                   >
//                     <Trash2 size={15} />
//                     Clear All
//                   </button>
//                 </div>

//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                   <div className="divide-y divide-gray-50">
//                     {salon.services.map((service) => (
//                       <div key={service._id} className="p-5 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
//                         <div className="space-y-1">
//                           <p className="font-semibold text-gray-800">{service.name}</p>
//                           <div className="flex items-center gap-3 text-gray-400 text-sm">
//                             <span className="flex items-center gap-1">
//                               <Clock size={14} /> {service.durationMins} mins
//                             </span>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-6">
//                           <p className="text-lg font-bold text-gray-900">₹{service.price}</p>
//                           <button
//                             onClick={() => removeService(salon.salonId, service._id)}
//                             className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="bg-[#FAF8F7] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-gray-100">
//                     <div className="flex gap-6 text-sm">
//                       <div>
//                         <span className="text-gray-500 block">Total Time</span>
//                         <span className="font-bold text-gray-800">{totalDuration} mins</span>
//                       </div>
//                       <div>
//                         <span className="text-gray-500 block">Subtotal</span>
//                         <span className="font-bold text-gray-800">₹{totalPrice}</span>
//                       </div>

//                       {/* FIX 2: Render individual properties of the booking object */}
//                       {booking && (
//                         <div className="border-l border-gray-200 pl-6">
//                           <span className="text-purple-500 block font-medium">Scheduled</span>
//                           <span className="font-bold text-gray-800">
//                             {booking.month} {booking.day}, {booking.year} at {booking.time}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     <button
//                       onClick={() => openPicker(salon)}
//                       className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-95 border ${
//                         booking
//                         ? "bg-purple-50 border-purple-200 text-purple-700"
//                         : "bg-white border-[#5A2C1E] text-[#5A2C1E] hover:bg-[#5A2C1E] hover:text-white"
//                       }`}
//                     >
//                       <Calendar size={18} />
//                       {booking ? "Change Date & Time" : "Select Date & Time"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="w-full lg:w-96">
//           <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-10">
//             <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>

//             <div className="space-y-6">
//               {cart.map((salon) => {
//                 const b = bookings[salon.salonId];
//                 return (
//                   <div key={salon.salonId} className="flex justify-between items-start group">
//                     <div className="max-w-[70%]">
//                       <p className="text-sm font-bold text-gray-800 truncate">{salon.salonName}</p>

//                       {/* FIX 3: Correct object property rendering in the sidebar */}
//                       <p className="text-xs text-gray-400">
//                         {b
//                           ? `${b.month} ${b.day} at ${b.time}`
//                           : `${salon.services.length} services selected`}
//                       </p>
//                     </div>
//                     <p className="font-semibold text-gray-900">
//                       ₹{salon.services.reduce((sum, s) => sum + s.price, 0)}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="my-8 pt-6 border-t border-dashed border-gray-200">
//               <div className="flex justify-between items-center mb-1">
//                 <span className="text-gray-500">Total Amount</span>
//                 <span className="text-2xl font-black text-[#5A2C1E]">₹{grandTotal}</span>
//               </div>
//               <p className="text-xs text-green-600 font-medium">Inclusive of all taxes</p>
//             </div>

//             <button
//               disabled={Object.keys(bookings).length < cart.length}
//               onClick={handleSubmit}
//               className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg ${
//                 Object.keys(bookings).length < cart.length
//                 ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
//                 : "bg-[#5A2C1E] text-white hover:bg-[#452117] shadow-[#5a2c1e44]"
//               }`}
//             >
//               Proceed to Payment
//               <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
//             </button>

//             {Object.keys(bookings).length < cart.length && (
//               <p className="text-center text-[10px] text-orange-500 font-bold mt-3 uppercase tracking-tighter">
//                 Please select date & time for all salons
//               </p>
//             )}

//             <p className="text-center text-xs text-gray-400 mt-6">
//               Secure Checkout • Fast Booking
//             </p>
//           </div>
//         </div>
//       </div>

//       <DateTimePicker
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleConfirmDateTime}
//       />
//     </div>
//   );
// };

// export default CartPage;

import React from "react";
import { Scissors, Flower, Hand, Smile } from "lucide-react";
import { MdSpa } from "react-icons/md";

const CartPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-[28px] shadow-2xl p-5  sm:p-6">
        <>
          {/* Header */}
          <div className="flex items-center gap-2 text-purple-900 font-bold mb-4 text-sm sm:text-base px-5 py-5">
            <span>🏪</span>
            <span className="text-xl">Salon Radiance</span>
            <span className="text-gray-500 h-5 w-5">{">"}</span>
          </div>

          {/* Service Card */}
          <div className=" rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.30)] overflow-hidden bg-white">
            <div>
              {/* Service Header */}
              <div className="flex items-start justify-between p-4 sm:p-5 gap-3">
                {/* Left: Icon + Title */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
                    <Scissors size={20} className="-rotate-90" />
                  </div>

                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                    Haircut
                  </h3>
                </div>

                {/* Right: Date */}
                <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap flex items-center gap-1 ">
                  📅 <span>24 Apr 2024, 11 AM</span>
                </div>
              </div>

              <div className="w-full  border-t border-gray-200"></div>

              {/* Service Details */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 p-4 sm:p-5 text-sm">
                {/* Left Info */}
                <ul className="space-y-1 text-gray-500 list-disc  marker:text-rose-500 m-2">
                  <li>Service Price: ₹100</li>
                  <li> Location: At Salon</li>
                </ul>

                {/* Right Info */}
                <div className="sm:text-right gap-1">
                  <div className="text-purple-700 font-semibold mb-2">
                    Pay at Salon: ₹100
                  </div>
                  <div className="text-gray-500 text-xs ">Total to Pay</div>
                </div>
              </div>
            </div>
            <div>
              <div className="w-full  border-t border-gray-200"></div>
              {/* Service Header */}
              <div className="flex items-start justify-between p-4 sm:p-5 gap-3">
                {/* Left: Icon + Title */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
                    <MdSpa size={20} className="-rotate-45" />
                  </div>

                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                    Massage
                  </h3>
                </div>

                {/* Right: Date */}
                <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap flex items-center gap-1 ">
                  📅 <span>24 Apr 2024, 2PM</span>
                </div>
              </div>

              <div className="w-full  border-t border-gray-200"></div>

              {/* Service Details */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 p-4 sm:p-5 text-sm">
                {/* Left Info */}
                <ul className="space-y-1 text-gray-500 list-disc  marker:text-rose-500 m-2">
                  <li>Service Price: ₹100</li>
                  <li>Home Service Charges: ₹100</li>
                  <li> Location: At Salon</li>
                </ul>

                {/* Right Info */}
                <div className="sm:text-right gap-1">
                  <div className="text-purple-700 font-semibold mb-2">
                    Pay at Salon: ₹100
                  </div>
                  <div className="text-gray-500 text-xs ">Total to Pay</div>
                </div>
              </div>
              <div className="w-full  border-t border-gray-200"></div>
              <div className="items-center m-6 place-items-center text-center font-semibold text-gray-500">
                Pay At Home: ₹190
                <span className="text-rose-500 font-medium">
                  (Total To Pay)
                </span>
              </div>
              {/* <div className="w-full  border-t border-gray-200"></div> */}
            </div>
          </div>
        </>
        <>
          <div className="w-full h-px bg-gray-300 my-4"></div>
          <div className="flex items-center gap-2 text-purple-900 font-bold mb-4 text-sm sm:text-base px-5 py-2">
            {/* <div className="w-full  border-t border-gray-200"></div> */}
            <span>🏪</span>
            <span className="text-xl">Bliss Beauty Salon</span>
            <span className="text-gray-500 h-5 w-5">{">"}</span>
          </div>
          <div className=" rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.30)] overflow-hidden bg-white">
            <div>
              {/* Service Header */}
              <div className="flex items-start justify-between p-4 sm:p-5 gap-3">
                {/* Left: Icon + Title */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
                    <Hand size={20} className="-rotate-90" />
                  </div>

                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                    Manicure
                  </h3>
                </div>

                {/* Right: Date */}
                <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap flex items-center gap-1 ">
                  📅 <span>24 Apr 2024, 11 AM</span>
                </div>
              </div>

              <div className="w-full  border-t border-gray-200"></div>

              {/* Service Details */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 p-4 sm:p-5 text-sm">
                {/* Left Info */}
                <ul className="space-y-1 text-gray-500 list-disc  marker:text-rose-500 m-2">
                  <li>Service Price: ₹100</li>
                  <li> Location: At Salon</li>
                </ul>

                {/* Right Info */}
                <div className="sm:text-right gap-1">
                  <div className="text-purple-700 font-semibold mb-2">
                    Pay at Salon: ₹100
                  </div>
                  <div className="text-gray-500 text-xs ">Total to Pay</div>
                </div>
              </div>
            </div>
            <div>
              <div className="w-full  border-t border-gray-200"></div>
              {/* Service Header */}
              <div className="flex items-start justify-between p-4 sm:p-5 gap-3">
                {/* Left: Icon + Title */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
                    <Smile size={20} className="-rotate-45" />
                  </div>

                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                    Facial (Home)
                  </h3>
                </div>

                {/* Right: Date */}
                <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap flex items-center gap-1 ">
                  📅 <span>24 Apr 2024, 2PM</span>
                </div>
              </div>

              <div className="w-full  border-t border-gray-200"></div>

              {/* Service Details */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 p-4 sm:p-5 text-sm">
                {/* Left Info */}
                <ul className="space-y-1 text-gray-500 list-disc  marker:text-rose-500 m-2">
                  <li>Service Price: ₹100</li>
                  <li>Home Service Charges: ₹100</li>
                  <li> Location: At Salon</li>
                </ul>

                {/* Right Info */}
                <div className="sm:text-right gap-1">
                  <div className="text-purple-700 font-semibold mb-2">
                    Pay at Salon: ₹100
                  </div>
                  <div className="text-gray-500 text-xs ">Total to Pay</div>
                </div>
              </div>
              <div className="w-full  border-t border-gray-200"></div>
              <div className="items-center m-6 place-items-center text-center font-semibold text-gray-500">
                Pay At Home: ₹190
                <span className="text-rose-500 font-medium">
                  (Total To Pay)
                </span>
              </div>
              {/* <div className="w-full  border-t border-gray-200"></div> */}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default CartPage;
