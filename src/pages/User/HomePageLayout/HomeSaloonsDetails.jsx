import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSaloonDetailsById } from "../../../redux/slice/userSlice";

const HomeSaloonsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { saloonDetails, loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (id) {
      dispatch(getSaloonDetailsById(id));
    }
  }, [dispatch, id]);

 

  
  if (loading) return <p className="p-4">Loading salon details...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!saloonDetails) return null;

  return (
    <div className="p-5">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-4 border border-gray-100">

        {/* TOP DETAILS CARD */}
        <div>
          {/* Image */}
          <div className="h-65 rounded-xl overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              src={
                saloonDetails.coverImage ||
                "https://img.freepik.com/premium-photo/hairdressers-makeup-artist-working-beauty-salon_10069-11140.jpg"
              }
              alt={saloonDetails.shopName}
            /> 
           {/* Book Now Button */}
            <Link to="/bookappoitment">
              <button  className="px-5 font-medium p-2 rounded-lg bg-white absolute right-6 bottom-5">
                Book Now
              </button>
            </Link>
          </div>

          {/* Info */}
          <div className="mt-3">
            <h3 className="font-semibold text-lg text-gray-800">
              {saloonDetails.shopName}
            </h3>

            <p className="text-sm text-gray-600 pt-1">
              {saloonDetails.location?.address}
            </p>

            <p className="text-sm text-gray-600">
              {saloonDetails.location?.city},{" "}
              {saloonDetails.location?.state}{" "}
              {saloonDetails.location?.pincode}
            </p>

            <div className="mt-2 flex gap-4 flex-wrap">
              {saloonDetails.homeService && (
                <span className="px-3 py-1 rounded-lg bg-gray-600 text-white text-sm">
                  Home Service Available
                </span>
              )}
              <span className="px-3 py-1 rounded-lg bg-gray-600 text-white text-sm">
                Open Now
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              Premium salon offering world-class hair and beauty services
            </p>
          </div>
        </div>

        {/* TABS */}
        <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-3 p-3 font-medium md:text-lg">
          {[
            { to: "services", label: "Services" },
            { to: "gallery", label: "Gallery" },
            { to: "map", label: "Map & Location" },
            { to: "reviews", label: "Reviews" },
            { to: "specialists", label: "Specialists" },
          ].map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                isActive ? "border-b p-2" : "p-2 text-gray-600"
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>

        {/* TAB CONTENT */}
        <Outlet context={{ saloonDetails }} />
      </div>
    </div>
  );
};

export default HomeSaloonsDetails;
