import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServiceItemByCategory } from "../../../../redux/slice/userSlice";
import { useOutletContext } from "react-router-dom";
import {
  Clock,
  Plus,
  Info,
  Minus,
  Home,
  Store,
  Smartphone,
} from "lucide-react";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../../../../utils/CartStorage";

const SalonServices = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?._id);
  const { saloonDetails } = useOutletContext();

  const [activeTab, setActiveTab] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const categories = saloonDetails?.serviceCategories || [];
  const selectedSalonId = saloonDetails?._id;
  const { serviceItems, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) setCartItems(getCart(userId));
  }, [userId]);

  // useEffect(() => {
  //   if (categories.length > 0 && !activeTab) {
  //     handleTabClick(categories[0]._id);
  //   }
  // }, [categories]);

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
    dispatch(
      fetchServiceItemByCategory({ salonId: selectedSalonId, categoryId }),
    );
  };

  const handleUpdateCart = (service, action) => {
    let updated;
    if (action === "add") {
      updated = addToCart(userId, saloonDetails, service);
    } else {
      updated = removeFromCart(userId, selectedSalonId, service._id);
    }
    setCartItems(updated);
  };

  const getServiceQuantity = (serviceId) => {
    const salon = cartItems.find((s) => s.salonId === selectedSalonId);
    const service = salon?.services.find((s) => s._id === serviceId);
    return service ? service.quantity || 1 : 0;
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* 🔹 Full-Width Sticky Tabs */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b w-full">
        <div className="w-full px-6">
          <div className="flex overflow-x-auto no-scrollbar gap-8">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleTabClick(category._id)}
                className={`relative py-5 text-xs font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all
                  ${activeTab === category._id ? "text-[#5A2C1E]" : "text-gray-400 hover:text-gray-600"}`}
              >
                {category.name}
                {activeTab === category._id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5A2C1E]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Services Grid */}
      <div className="w-full p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-60 bg-gray-50 animate-pulse rounded-3xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {serviceItems?.map((service) => {
              const qty = getServiceQuantity(service._id);

              return (
                <div
                  key={service._id}
                  className="flex flex-col bg-white border border-gray-100 rounded-[2rem] p-6 transition-all hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1"
                >
                  {/* Mode Badge Logic */}
                  <div className="mb-4">
                    {service.serviceMode === "both" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold uppercase border border-purple-100">
                        <Smartphone className="w-3 h-3" /> Home & Salon
                      </span>
                    ) : service.serviceMode === "home" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase border border-blue-100">
                        <Home className="w-3 h-3" /> At Home
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-[10px] font-bold uppercase border border-orange-100">
                        <Store className="w-3 h-3" /> In Salon
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-800 leading-tight">
                      {service.name}
                    </h4>
                    {service.discountPercent > 0 && (
                      <span className="text-green-600 font-black text-sm">
                        {service.discountPercent}%
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {service.durationMins}m
                    </div>
                    <button className="flex items-center gap-1 text-[#5A2C1E]/60 text-xs font-bold hover:underline">
                      <Info className="w-3.5 h-3.5" /> Details
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider">
                        Price
                      </span>
                      <p className="text-2xl font-black text-gray-900">
                        ₹{service.price}
                      </p>
                    </div>

                    {/* 🔹 Add / Remove Action Toggle */}
                    <div className="flex items-center">
                      {qty > 0 ? (
                        <button
                          onClick={() => handleUpdateCart(service, "remove")}
                          className="group/btn flex items-center gap-2 px-5 py-2.5 bg-red-50 border-2 border-red-200 text-red-600 font-black rounded-2xl hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-200 active:scale-95 shadow-sm"
                        >
                          <Minus className="w-4 h-4" />
                          <span className="text-xs tracking-wider">REMOVE</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateCart(service, "add")}
                          className="group/btn flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-[#5A2C1E] text-[#5A2C1E] font-black rounded-2xl hover:bg-[#5A2C1E] hover:text-white transition-all duration-200 active:scale-95 shadow-sm"
                        >
                          <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" />
                          <span className="text-xs tracking-wider">ADD</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonServices;
