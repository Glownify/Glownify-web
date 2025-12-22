import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  MoreVertical, 
  CheckCircle2, 
  Timer, 
  History 
} from 'lucide-react';

// --- DUMMY DATA ---
const BOOKINGS = [
  {
    id: "BK-8821",
    salonName: "Elegance Beauty Lounge",
    service: "Signature Haircut & Style",
    date: "Oct 24, 2023",
    time: "10:30 AM",
    status: "Confirmed", // Confirmed, Pending, Completed, Cancelled
    price: 899,
    address: "123 Metro Plaza, New Delhi",
    image: "https://img.freepik.com/premium-photo/hairdressers-makeup-artist-working-beauty-salon_10069-11140.jpg?w=740"
  },
  {
    id: "BK-7712",
    salonName: "Modern Cut Studio",
    service: "Beard Trim & Facial",
    date: "Oct 28, 2023",
    time: "02:00 PM",
    status: "Pending",
    price: 499,
    address: "Block B, Green Park, Delhi",
    image: "https://img.freepik.com/free-photo/client-doing-hair-cut-barber-shop-salon_1303-20861.jpg?w=740"
  },
  {
    id: "BK-5540",
    salonName: "Glow Nail Bar",
    service: "Gel Manicure",
    date: "Oct 15, 2023",
    time: "11:00 AM",
    status: "Completed",
    price: 599,
    address: "Civic Center, Shop 42, Delhi",
    image: "https://img.freepik.com/free-photo/manicure-process-nail-salon_1303-16335.jpg?w=740"
  }
];

const MyBookingsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const statusStyles = {
    Confirmed: "bg-green-50 text-green-600 border-green-100",
    Pending: "bg-orange-50 text-orange-600 border-orange-100",
    Completed: "bg-blue-50 text-blue-600 border-blue-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
  };

  const filteredBookings = activeTab === 'upcoming' 
    ? BOOKINGS.filter(b => b.status === 'Confirmed' || b.status === 'Pending')
    : BOOKINGS.filter(b => b.status === 'Completed' || b.status === 'Cancelled');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pt-10 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>
          
          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-100">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`pb-3 text-sm font-semibold transition-all relative ${
                activeTab === 'upcoming' ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              Upcoming
              {activeTab === 'upcoming' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`pb-3 text-sm font-semibold transition-all relative ${
                activeTab === 'past' ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              Past History
              {activeTab === 'past' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4">
                    <img 
                      src={booking.image} 
                      alt={booking.salonName} 
                      className="size-16 md:size-20 rounded-xl object-cover"
                    />
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${statusStyles[booking.status]}`}>
                        {booking.status}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-1">{booking.salonName}</h3>
                      <p className="text-sm text-gray-500">{booking.service}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-gray-50 my-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar size={16} className="text-indigo-500" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock size={16} className="text-indigo-500" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin size={16} className="text-indigo-500" />
                    <span className="truncate">{booking.address}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-400">Total Paid: </span>
                    <span className="font-bold text-gray-900">₹{booking.price}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    {activeTab === 'upcoming' ? (
                      <>
                        <button className="text-sm font-bold text-red-500 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors">
                          Cancel
                        </button>
                        <button className="text-sm font-bold bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                          Reschedule
                        </button>
                      </>
                    ) : (
                      <button className="text-sm font-bold border border-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        Rebook
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="bg-gray-50 size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'upcoming' ? <Timer className="text-gray-300" /> : <History className="text-gray-300" />}
              </div>
              <h3 className="font-bold text-gray-900">No {activeTab} bookings</h3>
              <p className="text-sm text-gray-500 mt-1">You haven't made any appointments yet.</p>
              <button className="mt-6 text-indigo-600 font-bold hover:underline">
                Book a Salon Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;