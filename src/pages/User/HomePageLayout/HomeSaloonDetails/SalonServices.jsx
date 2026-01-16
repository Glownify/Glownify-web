import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServiceItemByCategory } from "../../../../redux/slice/userSlice";
import { useOutletContext } from "react-router-dom";
import { Clock, Plus, Info, Check } from "lucide-react";
import { addToCart, getCart } from "../../../../utils/CartStorage";

const SalonServices = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?._id);
  const { saloonDetails } = useOutletContext();

  const [activeTab, setActiveTab] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const categories = saloonDetails?.serviceCategories || [];
  const selectedSalonId = saloonDetails?._id;

  const { serviceItems, loading } = useSelector((state) => state.user);

  /* 🔹 Load cart on mount */
  useEffect(() => {
    if(userId){
      setCartItems(getCart(userId));
    }
  }, [userId]);

  /* 🔹 Auto select first category */
  // useEffect(() => {
  //   if (categories.length && !activeTab) {
  //     handleTabClick(categories[0]._id);
  //   }
  // }, [categories]);

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
    dispatch(
      fetchServiceItemByCategory({
        salonId: selectedSalonId,
        categoryId,
      })
    );
  };

  const handleAddToCart = (service) => {
    const updatedCart = addToCart(userId, saloonDetails, service);
    setCartItems(updatedCart);
  };

  const isInCart = (serviceId) =>
    cartItems.some(
      (salon) =>
        salon.salonId === selectedSalonId &&
        salon.services.some((s) => s._id === serviceId)
    );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 🔹 Sticky Tabs */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="flex overflow-x-auto no-scrollbar px-4 py-3 gap-8">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleTabClick(category._id)}
              className={`relative pb-2 text-sm font-semibold whitespace-nowrap
                ${
                  activeTab === category._id
                    ? "text-[#5A2C1E]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
            >
              {category.name}
              {activeTab === category._id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5A2C1E]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 Services */}
      <div className="p-4 overflow-y-auto">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-50 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : serviceItems?.length > 0 ? (
          <div className="divide-y">
            {serviceItems.map((service) => {
              const added = isInCart(service._id);

              return (
                <div
                  key={service._id}
                  className="py-5 flex justify-between items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-800">
                        {service.name}
                      </h4>
                      {service.discountPercent > 0 && (
                        <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold">
                          {service.discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {service.durationMins} mins
                      </span>
                      <span className="text-gray-300">|</span>
                      <button className="flex items-center gap-1 text-[#5A2C1E]/70 hover:underline">
                        <Info className="w-3.5 h-3.5" />
                        Details
                      </button>
                    </div>

                    <p className="text-sm font-bold text-gray-900">
                      ₹{service.price}
                    </p>
                  </div>

                  {/* 🔹 Add / Added Button */}
                  <button
                    disabled={added}
                    onClick={() => handleAddToCart(service)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                      ${
                        added
                          ? "bg-green-100 border-green-500 text-green-600 cursor-default"
                          : "border-[#FFBC86] text-[#5A2C1E] hover:bg-[#FFBC86]"
                      }`}
                  >
                    {added ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center py-20 text-center">
            <Info className="w-8 h-8 text-gray-300 mb-3" />
            <p className="text-gray-400 text-sm">
              No services available in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonServices;
