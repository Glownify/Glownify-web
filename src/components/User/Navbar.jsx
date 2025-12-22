import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Scissors } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  // Modern active link styling
  const navLinkStyles = ({ isActive }) =>
    `transition-all duration-300 hover:text-rose-500 ${
      isActive ? "text-rose-600 font-bold border-b-2 border-rose-600" : "text-gray-600"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <div
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-rose-500 p-1.5 rounded-lg transition-transform group-hover:rotate-12">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
            SalonApp
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/home" className={navLinkStyles}>Home</NavLink>
          <NavLink to="/services" className={navLinkStyles}>Services</NavLink>
          <NavLink to="/bookings" className={navLinkStyles}>My Bookings</NavLink>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
            <NavLink to="/profile" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors">
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100 group cursor-pointer transition-all hover:bg-rose-100">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md">
              <span className="text-xs font-bold">{user?.name?.[0].toUpperCase() || "U"}</span>
            </div>
            <span className="text-sm font-semibold text-rose-900">{user?.name || "User"}</span>
          </div>
            </NavLink>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-rose-50 text-rose-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Glassmorphism Overlay) */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-rose-100 px-6 py-8 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-5 text-lg font-medium">
            <NavLink to="/home" onClick={() => setOpen(false)} className="hover:text-rose-500">Home</NavLink>
            <NavLink to="/services" onClick={() => setOpen(false)} className="hover:text-rose-500">Services</NavLink>
            <NavLink to="/bookings" onClick={() => setOpen(false)} className="hover:text-rose-500">My Bookings</NavLink>
          </nav>

          <div className="border-t border-rose-100 pt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold">
                {user?.name?.[0].toUpperCase() || "U"}
              </div>
              <span className="font-semibold text-gray-800">{user?.name || "User"}</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-bold text-sm flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;