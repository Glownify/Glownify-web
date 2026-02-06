import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../redux/slice/saloonownerSlice";
import { Calendar, Clock, Mail, Phone, CreditCard, ChevronRight } from "lucide-react";

const ManageBookingsPage = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.saloonowner);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "confirmed": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending": return "bg-amber-50 text-amber-700 border-amber-200";
      case "cancelled": return "bg-rose-50 text-rose-700 border-rose-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Bookings</h1>
          <p className="text-gray-500 mt-1">Review and manage your salon appointments</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
           <span className="font-semibold text-indigo-600">{bookings?.length || 0}</span> Total Bookings
        </div>
      </div>

      {bookings?.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No bookings found for your salon.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Section: Time & Status */}
                <div className="md:w-64 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-1">
                    <Calendar size={16} />
                    {new Date(booking.bookingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                    <Clock size={16} />
                    {booking.timeSlot?.start}
                  </div>
                  <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                {/* Middle Section: Customer & Services */}
                <div className="grow p-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Customer Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-900 font-medium truncate">Name: {booking.customer.name.toUpperCase()}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} /> {booking.customer?.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} /> {booking.customer?.phone}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {booking.serviceItems.map((item, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {item.service?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Section: Payment */}
                <div className="md:w-52 p-6 bg-white flex flex-col justify-center items-end border-t md:border-t-0">
                  <div className="text-right mb-4">
                    <p className="text-2xl font-bold text-gray-900">₹{booking.totalAmount}</p>
                    <div className="flex items-center justify-end gap-1 text-xs mt-1">
                      <CreditCard size={12} className="text-gray-400" />
                      <span className={`font-medium ${booking.paymentStatus === 'pending' ? 'text-orange-500' : 'text-emerald-600'}`}>
                        {booking.paymentMethod.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                    View Details <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBookingsPage;