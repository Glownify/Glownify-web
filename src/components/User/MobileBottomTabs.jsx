import { NavLink, useNavigate } from "react-router-dom";
import { Home, Scissors, Calendar, ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";

const MobileBottomTabs = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { selectedCategory, lat, lng } = useSelector((state) => state.user);

  const goToSalons = () => {
    if (selectedCategory && lat && lng) {
      navigate(`/salons?category=${selectedCategory}&lat=${lat}&lng=${lng}`);
    } else {
      navigate("/salons");
    }
  };

  const tabStyle = ({ isActive }) =>
    `flex flex-col items-center justify-center text-[11px] font-medium transition ${
      isActive ? "text-rose-600" : "text-gray-400"
    }`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      
      <NavLink to="/" className={tabStyle}>
        <Home size={20} />
        Home
      </NavLink>

      <button onClick={goToSalons} className="flex flex-col items-center text-gray-400">
        <Scissors size={20} />
        Salons
      </button>

      <NavLink to="/bookings" className={tabStyle}>
        <Calendar size={20} />
        Bookings
      </NavLink>

      <NavLink to="/cart" className={tabStyle}>
        <ShoppingCart size={20} />
        Cart
      </NavLink>

      <NavLink to={user ? "/profile" : "/login"} className={tabStyle}>
        <User size={20} />
        {user ? "Profile" : "Login"}
      </NavLink>
    </div>
  );
};

export default MobileBottomTabs;
