import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeSaloonsByCategory } from "../../../redux/slice/userSlice";
import { MapPin } from "lucide-react";

const HomeSaloons = ({ category }) => {
  const dispatch = useDispatch();
  const { homeSaloonsByCategory = [], loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (category) {
      dispatch(fetchHomeSaloonsByCategory(category));
    }
  }, [dispatch, category]);

  if (loading) return <p className="p-4">Loading salons...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="px-4 py-6">
      {/* Section Title */}
      <h2 className="text-xl font-semibold mb-4 capitalize">
        {category} Salons
      </h2>

      {/* Salon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {homeSaloonsByCategory.map((salon) => (
          <div
            key={salon._id}
            className="bg-white rounded-xl shadow hover:shadow-md transition p-4"
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
                <span className="text-gray-400 text-sm">
                  No Image
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="font-semibold text-lg truncate">
              {salon.shopName}
            </h3>

            {/* Category */}
            <p className="text-sm text-gray-500 capitalize">
              {salon.salonCategory} • {salon.shopType}
            </p>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
              <MapPin size={14} />
              <span className="truncate">
                {salon.location?.city}, {salon.location?.state}
              </span>
            </div>

            {/* Service Categories */}
            {salon.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {salon.categories.map((cat) => (
                  <span
                    key={cat._id}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {homeSaloonsByCategory.length === 0 && (
        <p className="text-gray-500 text-sm mt-4">
          No salons available for this category.
        </p>
      )}
    </div>
  );
};

export default HomeSaloons;
