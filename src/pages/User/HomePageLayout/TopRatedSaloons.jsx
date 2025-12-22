import React, { memo, useState } from "react";
import { 
  Star, 
  IndianRupee, 
  MapPin, 
  Clock, 
  Filter, 
  X 
} from "lucide-react";

// --- DUMMY DATA ---
const DUMMY_CATEGORIES = [
  { _id: "1", name: "Haircut & Styling" },
  { _id: "2", name: "Facial & Clean-up" },
  { _id: "3", name: "Manicure & Pedicure" },
  { _id: "4", name: "Hair Coloring" },
  { _id: "5", name: "Massage Therapy" },
];

const DUMMY_SALONS = [
  {
    id: 1,
    name: "Elegance Beauty Lounge",
    distance: "1.4 km",
    rating: 4.8,
    image: "https://img.freepik.com/premium-photo/hairdressers-makeup-artist-working-beauty-salon_10069-11140.jpg?w=740",
    services: [
      { name: "Women's Haircut", price: 499 },
      { name: "Balayage", price: 399 },
    ],
  },
  {
    id: 2,
    name: "Modern Cut Studio",
    distance: "2.1 km",
    rating: 4.8,
    image: "https://img.freepik.com/free-photo/client-doing-hair-cut-barber-shop-salon_1303-20861.jpg?w=740",
    services: [
      { name: "Men's Haircut", price: 299 },
      { name: "Beard Trim", price: 199 },
    ],
  },
  {
    id: 3,
    name: "Serene Spa & Wellness",
    distance: "3.5 km",
    rating: 4.9,
    image: "https://img.freepik.com/free-photo/spa-treatment-concept-recreation-dayspa_1150-10731.jpg?w=740",
    services: [
      { name: "Swedish Massage", price: 999 },
      { name: "Facial Treatment", price: 499 },
    ],
  },
  {
    id: 4,
    name: "Glow Nail Bar",
    distance: "0.8 km",
    rating: 4.9,
    image: "https://img.freepik.com/free-photo/manicure-process-nail-salon_1303-16335.jpg?w=740",
    services: [
      { name: "Gel Manicure", price: 499 },
      { name: "Pedicure", price: 599 },
    ],
  },
];

const TopRatedSalons = () => {
  const [priceRange, setPriceRange] = useState(1500);
  const [selectedGender, setSelectedGender] = useState("men");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sub-component for Filter UI
  const FilterSidebar = () => (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Reset All</button>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Location</h3>
        <div className="relative">
          <MapPin className="absolute left-2 top-2.5 text-gray-400 size-4" />
          <input
            type="text"
            placeholder="Search location..."
            className="w-full border border-gray-300 rounded-md py-2 pl-8 pr-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Gender Selection */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Services For</h3>
        <div className="flex gap-4 items-center">
          {["men", "women"].map((g) => (
            <label key={g} className="flex gap-2 items-center cursor-pointer capitalize text-sm">
              <input
                type="radio"
                name="gender"
                checked={selectedGender === g}
                onChange={() => setSelectedGender(g)}
                className="accent-indigo-600 size-4"
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
          {DUMMY_CATEGORIES.map((cat) => (
            <div key={cat._id} className="flex items-center gap-2">
              <input type="checkbox" id={cat._id} className="accent-indigo-600 size-4 rounded" />
              <label htmlFor={cat._id} className="text-sm text-gray-700 cursor-pointer">{cat.name}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-medium">Max Price</h3>
          <span className="text-sm font-semibold text-indigo-600">₹{priceRange}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full accent-indigo-600 cursor-pointer"
        />
      </div>

      <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-black transition-all active:scale-[0.98]">
        Apply Filters
      </button>
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto min-h-screen">
      <header className="mb-6">
        <h1 className="font-bold text-2xl text-gray-900">Top Rated Salons</h1>
        <p className="text-gray-500 text-sm">Find the best grooming experts near you</p>
      </header>

      {/* Mobile Filter Toggle */}
      <button 
        onClick={() => setIsFilterOpen(true)} 
        className="md:hidden flex items-center justify-center gap-2 bg-white border border-gray-200 w-full py-2.5 rounded-xl font-medium mb-6 shadow-sm active:bg-gray-50 transition-colors"
      >
        <Filter className="size-4" /> Filter
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-6">
          <FilterSidebar />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-sm flex justify-end">
            <div className="w-[85%] bg-white h-full p-6 relative shadow-2xl animate-in slide-in-from-right duration-300">
              <button 
                onClick={() => setIsFilterOpen(false)} 
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="size-6 text-gray-500" />
              </button>
              <div className="mt-8">
                <FilterSidebar />
              </div>
            </div>
          </div>
        )}

        {/* Salon Grid */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_SALONS.map((salon) => (
            <div key={salon.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={salon.image} 
                  alt={salon.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-yellow-600 shadow-sm">
                  <Star className="size-3 fill-yellow-500 text-yellow-500" /> {salon.rating}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{salon.name}</h3>
                
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <MapPin className="size-3 mr-1" /> {salon.distance} away
                </div>

                <div className="space-y-2 mb-5 border-t border-gray-50 pt-4">
                  {salon.services.map((srv, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">{srv.name}</span>
                      <span className="font-bold text-gray-900 flex items-center">
                        <IndianRupee className="size-3" />{srv.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                    <Clock className="size-3" /> 30–60 min
                  </div>
                  <button className="text-indigo-600 text-sm font-bold hover:text-indigo-700 transition-colors underline underline-offset-4">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default memo(TopRatedSalons);