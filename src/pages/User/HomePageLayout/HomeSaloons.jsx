import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeSaloonsByCategory } from "../../../redux/slice/userSlice";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeSaloons = ({ category, lat, lng }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { homeSaloonsByCategory = [], loading, error } = useSelector(
    (state) => state.user
  );
  const mockServices = [
    { name: "Haircut", price: 299 },
    { name: "Facial", price: 599 },
    { name: "Hair Spa", price: 899 },
  ];


  useEffect(() => {
    if (category && lat && lng) {
      dispatch(fetchHomeSaloonsByCategory({ category, lat, lng }));
    }
  }, [dispatch, category, lat, lng]);

  const handleSalonClick = (salonId) => {
    navigate(`/salon/${salonId}`);
  };

  if (loading) {
    return (
      <div className="px-6 py-10 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (homeSaloonsByCategory.length === 0) {
    return (
      <div className="px-6 py-12 text-center border-2 border-dashed border-gray-100 rounded-3xl mx-4">
        <p className="text-gray-400 font-medium">No salons found in {category}.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 capitalize">
            {category} <span className="text-indigo-600">Salons</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">Discover the best rated services near you</p>
        </div>
        <button onClick={()=>{navigate('/salons')}} className="text-indigo-600 text-sm hover:cursor-pointer font-semibold flex items-center gap-1 hover:underline">
          View all <ArrowRight size={16} />
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {homeSaloonsByCategory.map((salon) => (
          <div
            key={salon._id}
            onClick={() => handleSalonClick(salon._id)}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              {salon.galleryImages?.length > 0 ? (
                <img
                  src={salon.galleryImages[0]}
                  alt={salon.shopName}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm italic">
                  No Image Available
                </div>
              )}
              {/* Optional Rating Badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-slate-800">4.8</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                  {salon.shopName}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {salon.salonCategory}
                </span>
                {/* <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {salon.shopType}
                </span> */}
              </div>

              <div className="flex items-center gap-1.5 text-slate-500">
                <MapPin size={16} className="text-slate-400" />
                <span className="text-sm truncate">
                  {salon.location?.city}, {salon.location?.state}
                </span>
              </div>

              {/* Services */}
                <div className="mb-4">
                  <div className="space-y-2">
                    {mockServices.map((service, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm font-medium text-gray-700"
                      >
                        <span>{service.name}</span>
                        <span className="font-bold text-gray-900">
                          ₹{service.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase font-semibold tracking-tighter">Available Now</span>
                <span className="text-indigo-600 font-bold text-sm">Book Visit</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSaloons;