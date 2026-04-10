import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Edit2,
  HelpCircle,
  Home,
  LogOut,
  Mail,
  MapPin,
  Scissors,
  ShieldCheck,
  Star,
} from "lucide-react";
import useMobile from "../../hooks/useMobile";
import Avatar from "../../components/common/Avatar";
import { logout } from "../../redux/slice/authSlice";
import MobileSalonProfileScreen from "./Mobile/MobileSalonProfileScreen";

const SalonOwnerProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isMobile = useMobile(1024);

  if (isMobile) {
    return <MobileSalonProfileScreen />;
  }

  const handleEdit = () => navigate("/salon-owner/my-view");
  const handleUpgrade = () => navigate("/subscription");
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
    }
  };

  const currentUser = user || {
    name: "Glamour Salon",
    email: "salonowner1@gmail.com",
    roleDetails: {
      shopName: "Glamour Salon",
      location: { address: "MG Road, Bangalore" },
    },
  };

  const menuItems = [
    {
      label: "Edit Profile",
      icon: Edit2,
      bg: "bg-rose-50",
      color: "text-rose-500",
      onClick: handleEdit,
    },
    {
      label: "Notifications",
      icon: Bell,
      bg: "bg-blue-50",
      color: "text-blue-500",
    },
    {
      label: "Privacy & Security",
      icon: ShieldCheck,
      bg: "bg-emerald-50",
      color: "text-emerald-500",
    },
    {
      label: "Help & Support",
      icon: HelpCircle,
      bg: "bg-purple-50",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fff7f8] px-0 py-0 sm:px-2 sm:py-2 lg:px-4 lg:py-4">
      <div className="min-h-screen w-full rounded-none border-0 bg-white shadow-none sm:rounded-[2rem] sm:border sm:border-rose-100/60 sm:shadow-sm lg:rounded-[2.5rem]">
        <div className="flex items-center justify-between border-b border-rose-100/60 px-8 py-5">
          <h1 className="text-2xl font-black tracking-tight text-slate-800">
            My Profile
          </h1>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-xs font-bold text-rose-500 transition-colors hover:bg-rose-100"
          >
            <Edit2 size={14} />
            Edit
          </button>
        </div>

        <div className="border-b border-rose-100/60 px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5">
              <Avatar 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Glamour" 
                initials="GS" 
                size={144} 
                color="#fff1f2" 
                textColor="#f43f5e" 
              />
              <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-emerald-500 text-white shadow-lg">
                <CheckCircle2 size={14} />
              </div>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-900 lg:text-4xl">
              {currentUser.roleDetails?.shopName || currentUser.name}
            </h2>
            <div className="mt-2 flex items-center gap-1.5">
              <Star size={16} className="fill-amber-500 text-amber-500" />
              <span className="text-sm font-bold text-slate-500">
                4.8{" "}
                <span className="font-medium text-slate-400">(245 reviews)</span>
              </span>
            </div>
          </div>
        </div>

        <div className="border-b border-rose-100/60 px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
          <h3 className="mb-5 text-xl font-black tracking-tight text-slate-800">
            Shop Details
          </h3>

          <div className="overflow-hidden rounded-[2rem] bg-rose-50/30 p-3">
            <div className="grid grid-cols-1 divide-y divide-rose-100/80 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <StatItem icon={Building2} value="Personal" label="Shop Type" />
              <StatItem icon={Scissors} value="N/A" label="Category" />
              <StatItem icon={Home} value="No" label="Home Service" />
            </div>
          </div>
        </div>

        <div className="border-b border-rose-100/60 px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
          <h3 className="mb-5 text-xl font-black tracking-tight text-slate-800">
            Subscription
          </h3>

          <div className="rounded-[2rem] bg-rose-50/30 p-4">
            <div className="mb-4 rounded-[1.5rem] border border-rose-100/50 bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                  Current Plan
                </span>
                <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-amber-600">
                  <Clock size={12} className="text-amber-500" />
                  Pending
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">
                No Active Plan
              </div>
            </div>

            <button
              onClick={handleUpgrade}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#E91E63] text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-rose-500/20 transition-all hover:bg-rose-600"
            >
              <CreditCard size={18} />
              Upgrade Plan
            </button>
          </div>
        </div>

        <div className="border-b border-rose-100/60 px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
          <h3 className="mb-5 text-xl font-black tracking-tight text-slate-800">
            Contact & Location
          </h3>

          <div className="space-y-4 rounded-[2rem] border border-rose-100/50 bg-white p-6 shadow-sm">
            <ContactRow
              icon={MapPin}
              label="Address"
              value={currentUser.roleDetails?.location?.address || "MG Road, Bangalore"}
            />
            <ContactRow icon={Mail} label="Email" value={currentUser.email} />
          </div>
        </div>

        <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
          <h3 className="mb-5 text-xl font-black tracking-tight text-slate-800">
            Account
          </h3>

          <div className="overflow-hidden rounded-[2rem] border border-rose-100/50 bg-white shadow-sm">
            {menuItems.map((item, index) => (
              <AccountLink
                key={item.label}
                icon={item.icon}
                label={item.label}
                bg={item.bg}
                color={item.color}
                onClick={item.onClick}
                hasBorder={index !== menuItems.length - 1}
              />
            ))}
            <AccountLink
              icon={LogOut}
              label="Logout"
              bg="bg-rose-50"
              color="text-rose-600"
              onClick={handleLogout}
              logout
            />
          </div>
        </div>

        <div className="flex justify-center pb-8 pt-2 opacity-30">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Glownify v1.0.0
          </span>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ icon, value, label }) => (
  <div className="flex flex-col items-center gap-3 px-4 py-6 text-center lg:py-8">
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-rose-500 shadow-sm lg:h-12 lg:w-12">
      {React.createElement(icon, { size: 18 })}
    </div>
    <div>
      <p className="text-xl font-black leading-tight text-slate-900">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
    </div>
  </div>
);

const ContactRow = ({ icon, label, value }) => (
  <div className="flex gap-4">
    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
      {React.createElement(icon, { size: 18 })}
    </div>
    <div>
      <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        {label}
      </div>
      <div className="text-sm font-bold text-slate-800">{value}</div>
    </div>
  </div>
);

const AccountLink = ({ icon, label, bg, color, onClick, hasBorder, logout }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-slate-50/50 ${
      hasBorder ? "border-b border-slate-50" : ""
    }`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${bg} ${color}`}
      >
        {React.createElement(icon, { size: 18 })}
      </div>
      <span className={`text-sm font-bold ${logout ? "text-rose-600" : "text-slate-700"}`}>
        {label}
      </span>
    </div>
    <ChevronRight size={18} className={logout ? "text-rose-300" : "text-slate-300"} />
  </button>
);

export default SalonOwnerProfilePage;
