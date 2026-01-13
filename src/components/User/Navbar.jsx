import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Added to track active state for custom button
  const dispatch = useDispatch();

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

  const navLinkStyles = ({ isActive }) =>
    `transition-all duration-300 hover:text-rose-500 ${
      isActive
        ? "text-rose-600 font-bold border-b-2 border-rose-600"
        : "text-gray-600"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="rounded-lg transition-transform group-hover:rotate-12">
            <img
              src="/GlownifyLogoPng.png"
              alt="Logo"
              className="h-12 object-contain"
            />
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/" className={navLinkStyles}>
            Home
          </NavLink>
          
          <button
            onClick={goToSalons}
            className={`transition-all cursor-pointer duration-300 hover:text-rose-500 ${
              isSalonsActive 
                ? "text-rose-600 font-bold border-b-2 border-rose-600" 
                : "text-gray-600"
            }`}
          >
            Salons
          </button>

          <NavLink to="/bookings" className={navLinkStyles}>
            My Bookings
          </NavLink>

          {!user && (
            <NavLink 
              to="/partner-with-us" 
              className={({ isActive }) => 
                `${navLinkStyles({ isActive })} font-extrabold text-rose-600`
              }
            >
              Partner With Us
            </NavLink>
          )}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <NavLink to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-rose-600 transition" />
              </NavLink>
              <NavLink to="/profile">
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100 hover:bg-rose-100 transition cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-linear-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md">
                    <span className="text-xs font-bold">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-rose-900">
                    {user?.name}
                  </span>
                </div>
              </NavLink>

              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-rose-600 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-5 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-rose-50 text-rose-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-rose-100 px-6 py-8 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-5 text-lg font-medium">
            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <button 
              onClick={goToSalons} 
              className={`text-left ${isSalonsActive ? "text-rose-600 font-bold" : "text-gray-600"}`}
            >
              Salons
            </button>

            <NavLink to="/bookings" onClick={() => setOpen(false)}>
              My Bookings
            </NavLink>

            {!user && (
              <NavLink 
                to="/partner-with-us" 
                onClick={() => setOpen(false)} 
                className="font-bold text-rose-600"
              >
                Partner With Us
              </NavLink>
            )}
          </nav>

          <div className="border-t border-rose-100 pt-6">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="font-semibold text-gray-800">
                    {user?.name}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-bold text-sm flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="w-full text-center px-4 py-3 bg-rose-500 text-white rounded-xl font-bold text-sm"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;