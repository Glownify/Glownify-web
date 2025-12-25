import React from 'react';
import { 
  Scissors, 
  Sparkles, 
  Wind, 
  Smile, 
  Zap, 
  ChevronRight, 
  Clock, 
  Star 
} from 'lucide-react';

// --- DUMMY DATA ---
const CATEGORIES = [
  { id: 1, name: "Hair Styling", icon: Scissors, count: "12 Services", color: "bg-blue-100 text-blue-600" },
  { id: 2, name: "Facial & Skin", icon: Sparkles, count: "8 Services", color: "bg-purple-100 text-purple-600" },
  { id: 3, name: "Manicure", icon: Zap, count: "5 Services", color: "bg-pink-100 text-pink-600" },
  { id: 4, name: "Massage", icon: Smile, count: "10 Services", color: "bg-green-100 text-green-600" },
];

const FEATURED_SERVICES = [
  {
    id: 101,
    title: "Signature Haircut & Style",
    description: "A customized haircut including a relaxing shampoo and blow-dry style.",
    price: 899,
    duration: "60 min",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80"
  },
  {
    id: 102,
    title: "Deep Cleansing Facial",
    description: "Hydrating treatment that removes impurities and restores natural glow.",
    price: 1299,
    duration: "45 min",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80"
  },
  {
    id: 103,
    title: "Gel Manicure Luxe",
    description: "Long-lasting gel polish with detailed cuticle care and hand massage.",
    price: 599,
    duration: "40 min",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1604654894610-df4906b2450c?w=400&q=80"
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of professional beauty and wellness treatments designed to make you look and feel your best.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-10">
        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer group">
              <div className={`${cat.color} p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon size={28} />
              </div>
              <h3 className="font-bold text-gray-800">{cat.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{cat.count}</p>
            </div>
          ))}
        </div>

        {/* Featured Services */}
        <section className="pb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Popular Treatments</h2>
              <p className="text-gray-500">The most loved services by our community</p>
            </div>
            <button className="text-indigo-600 font-semibold flex items-center gap-1 hover:underline">
              View All <ChevronRight size={18} />
            </button>
          </div>

          <div className="space-y-6">
            {FEATURED_SERVICES.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full md:w-40 h-40 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-700 text-sm font-bold">
                      <Star size={14} className="fill-yellow-500 text-yellow-500" /> {service.rating}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <span className="flex items-center gap-1"><Clock size={16} /> {service.duration}</span>
                    <span className="font-bold text-gray-900 text-lg">₹{service.price}</span>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <button className="w-full md:w-auto bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white mb-20">
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="mb-8 opacity-90">Our consultants are ready to help you find the perfect treatment.</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
            Contact Us
          </button>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;