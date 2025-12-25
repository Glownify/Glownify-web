import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeSaloonsByCategory } from "../../../redux/slice/userSlice";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeSaloons = ({ category, lat, lng }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { homeSaloonsByCategory = [], loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (category) {
      dispatch(fetchHomeSaloonsByCategory({ category, lat, lng }));
    }
  }, [dispatch, category, lat, lng]);

  const handleSalonClick = (salonId) => {
    navigate(`/salon/${salonId}`);
  };

  console.log("Home Saloons lat long", lat, lng);

  if (loading) return <p className="p-4">Loading salons...</p>;
  // if (error) return <p className="p-4 text-red-500">{error}</p>;
  if(homeSaloonsByCategory.length === 0) return <p className="p-4">No salons available in this category.</p>; 

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4 capitalize">
        {category} Salons
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {homeSaloonsByCategory.map((salon) => (
          <div
            key={salon._id}
            onClick={() => handleSalonClick(salon._id)}
            className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition p-4"
          >
            {/* Image */}
            <div className="h-40 w-full bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
              {salon.galleryImages?.length > 0 ? (
                <img
                  src={salon.galleryImages[0]}
                  alt={salon.shopName}
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>

            <h3 className="font-semibold text-lg truncate">
              {salon.shopName}
            </h3>

            <p className="text-sm text-gray-500 capitalize">
              {salon.salonCategory} • {salon.shopType}
            </p>

            <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
              <MapPin size={14} />
              <span className="truncate">
                {salon.location?.city}, {salon.location?.state}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSaloons;
