import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, ShoppingCart, MapPin, User, ChevronRight ,Search} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState("Detecting...");

  const { user } = useSelector((state) => state.auth);
  const { selectedCategory, lat, lng } = useSelector((state) => state.user);

  const isSalonsActive = location.pathname.startsWith("/salons");

  const goToSalons = () => {
    if (selectedCategory && lat && lng) {
      navigate(`/salons?category=${selectedCategory}&lat=${lat}&lng=${lng}`);
    } else {
      navigate("/salons");
    }
    setOpen(false);
  };

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
    setOpen(false);
  };

  useEffect(() => {
    const getCity = async () => {
      if (!lat || !lng) return;
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
        );
        const data = await response.json();
        const city = data.address.city || data.address.town || data.address.village || "Unknown Location";
        setCityName(city);
      } catch (error) {
        setCityName("Location Set");
      }
    };
    getCity();
  }, [lat, lng]);

  const navLinkStyles = ({ isActive }) =>
    `relative py-2 transition-all duration-300 hover:text-rose-500 font-medium ${
      isActive ? "text-rose-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-rose-500 after:rounded-full" : "text-gray-600"
    }`;

  return (
    <header className="hidden md:block sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-rose-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div 
          className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95" 
          onClick={() => navigate("/")}
        >
          <img src="/GlownifyLogoPng.png" alt="Logo" className="h-10 md:h-12 w-auto object-contain" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <NavLink to="/" className={navLinkStyles}>Home</NavLink>
          
          <button
            onClick={goToSalons}
            className={`relative py-2 font-medium transition-colors hover:text-rose-500 ${
              isSalonsActive ? "text-rose-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-rose-500" : "text-gray-600"
            }`}
          >
            Salons
          </button>

          <NavLink to="/bookings" className={navLinkStyles}>My Bookings</NavLink>

          {!user && (
            <NavLink to="/partner-with-us" className="text-rose-600 font-bold hover:text-rose-700 transition-colors">
              Partner With Us
            </NavLink>
          )}
          <div>
            <Search className="w-5 h-5 text-gray-600 text-rose-600 hover:bg-rose-80 cursor-pointer"/>
            <span className="absolute top-1 right-1 w-2 h-2  hover:bg-rose-500 rounded-full border-2 border-white"></span>
          </div>
          
        </nav>

        {/* Action Center */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Desktop Location */}
          {user && lat && lng && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-rose-50/50 border border-rose-100 rounded-full group transition-all hover:bg-rose-50">
              <MapPin className="w-4 h-4 text-rose-500 group-hover:animate-bounce" />
              <span className="text-xs text-rose-900 font-semibold">{cityName}</span>
            </div>
          )}
      

          {user ? (
            <div className="flex items-center gap-4">
              <NavLink to="/cart" className="relative p-2 hover:bg-rose-50 rounded-full transition-colors group">
                <ShoppingCart className="w-5 h-5 group-hover:text-rose-600" />
                <span className=" top-1 right-1 w-2 h-2 bg-rose-500 rounded-full "></span>
              </NavLink>

              <div className="hidden md:flex items-center gap-3 border-l border-gray-200 pl-6">
                <NavLink to="/profile" className="flex items-center gap-2 p-1 pr-4 rounded-full bg-white border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-rose-100">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{user?.name}</span>
                </NavLink>
                
                <button onClick={logout} className="p-2 text-gray-400 hover:text-rose-600 transition-colors" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          ) : (
            <NavLink 
              to="/login" 
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:scale-105 transition-all active:scale-95"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;