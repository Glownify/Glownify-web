import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, ShoppingCart, MapPin, User, ChevronRight, Search } from "lucide-react";
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
    `relative py-2 transition-all duration-300 hover:text-rose-500 font-medium ${isActive ? "text-rose-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-rose-500 after:rounded-full" : "text-gray-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-rose-100/50 shadow-sm">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">

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
            className={`relative py-2 font-medium transition-colors hover:text-rose-500 ${isSalonsActive ? "text-rose-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-rose-500" : "text-gray-600"
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
            <Search className="w-5 h-5 text-gray-600 text-rose-600 hover:bg-rose-80 cursor-pointer" />
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

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 top-20 bg-white z-50 animate-in fade-in slide-in-from-right-10 duration-300">
          <div className="p-6 flex flex-col h-full">

            {/* Mobile Location Badge */}
            {lat && lng && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl mb-8">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <MapPin className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Current Location</p>
                  <p className="text-sm text-gray-800 font-bold">{cityName}</p>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-2">
              <MobileNavLink to="/" label="Home" icon={<ChevronRight size={18} />} onClick={() => setOpen(false)} />
              <button
                onClick={goToSalons}
                className={`flex items-center justify-between p-4 rounded-xl text-lg font-semibold transition-colors ${isSalonsActive ? "bg-rose-50 text-rose-600" : "text-gray-700 hover:bg-gray-50"}`}
              >
                Salons <ChevronRight size={18} />
              </button>
              <MobileNavLink to="/bookings" label="My Bookings" icon={<ChevronRight size={18} />} onClick={() => setOpen(false)} />
              {!user && <MobileNavLink to="/partner-with-us" label="Partner With Us" highlight onClick={() => setOpen(false)} />}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto pb-10 border-t border-gray-100 pt-6">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-2">
                    <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold text-lg">
                      {user?.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{user?.name}</p>
                      <NavLink to="/profile" onClick={() => setOpen(false)} className="text-xs text-rose-500 font-medium">View Profile</NavLink>
                    </div>
                  </div>
                  <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold hover:bg-rose-50 hover:text-rose-600 transition-colors">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <NavLink to="/login" onClick={() => setOpen(false)} className="block w-full text-center py-4 bg-rose-500 text-white rounded-2xl font-bold shadow-lg shadow-rose-100">
                  Login to Account
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Helper component for Mobile Links
const MobileNavLink = ({ to, label, onClick, highlight, icon }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => `
      flex items-center justify-between p-4 rounded-xl text-lg font-semibold transition-all
      ${isActive ? "bg-rose-50 text-rose-600" : highlight ? "text-rose-600" : "text-gray-700 hover:bg-gray-50"}
    `}
  >
    {label}
    {icon}
  </NavLink>
);

export default Navbar;