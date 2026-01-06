import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  User, 
  ExternalLink, 
  Filter, 
  MoreVertical, 
  Phone,
  MessageSquare,
  Building2
} from 'lucide-react';

const MySaloonsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy Data for onboarded salons
  const salons = [
    {
      id: 1,
      name: "Velvet Cut Salon & Spa",
      owner: "Sarah Jenkins",
      address: "123 Fashion Street, Downtown",
      status: "Active",
      joinedDate: "Oct 12, 2023",
      commission: "$450.00",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 2,
      name: "Urban Edge Barber Shop",
      owner: "Michael Ross",
      address: "45 Baker Avenue, Westside",
      status: "Pending",
      joinedDate: "Nov 05, 2023",
      commission: "$0.00",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 3,
      name: "Glow Beauty Lounge",
      owner: "Elena Rodriguez",
      address: "88 Pearl Road, North End",
      status: "Active",
      joinedDate: "Sep 28, 2023",
      commission: "$320.50",
      image: "https://images.unsplash.com/photo-1522337360788-8b13df772ad2?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Onboarded Salons</h1>
            <p className="text-slate-500">Manage and track all salons registered through your referral.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search salons..." 
                className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white w-full md:w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Salons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salons.map((salon) => (
            <div key={salon.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group">
              {/* Salon Header Image/Cover */}
              <div className="relative h-32 bg-slate-200">
                <img 
                  src={salon.image} 
                  alt={salon.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm ${
                    salon.status === 'Active' 
                    ? 'bg-emerald-500 text-white border-emerald-400' 
                    : 'bg-amber-400 text-white border-amber-300'
                  }`}>
                    {salon.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900 leading-tight">{salon.name}</h3>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <User size={14} className="shrink-0" />
                    <span>Owner: {salon.owner}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={14} className="shrink-0" />
                    <span className="truncate">{salon.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Building2 size={14} className="shrink-0" />
                    <span>Joined: {salon.joinedDate}</span>
                  </div>
                </div>

                {/* Performance Mini-Stat */}
                <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center mb-5">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Commission</span>
                   <span className="text-indigo-600 font-bold">{salon.commission}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors">
                    <ExternalLink size={14} /> View Details
                  </button>
                  <button className="p-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                    <Phone size={18} />
                  </button>
                  <button className="p-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                    <MessageSquare size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (Conditional) */}
        {salons.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <Building2 size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No salons found</h3>
            <p className="text-slate-500">Start onboarding salons to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySaloonsPage;