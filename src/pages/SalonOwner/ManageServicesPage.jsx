import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  fetchAllServiceItems,
} from "../../redux/slice/saloonownerSlice";
import { 
  Clock, 
  Pencil, 
  Trash2, 
  Plus, 
  Search, 
  Bell, 
  HelpCircle,
  Scissors,
  Droplets,
  Palette,
  Sparkles,
  Heart,
  ChevronDown,
  Building,
  Tag,
  PlusCircle,
  Star,
  RefreshCcw,
  Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import MobileManageServicesScreen from "./Mobile/MobileManageServicesScreen";

import AddServiceConfig from "./AddServiceConfig";

const ManageServicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const { serviceItems = [], categories = [], loading } = useSelector((state) => state.saloonowner);
  const [activeTab, setActiveTab] = useState("All Services");
  const [isAddingService, setIsAddingService] = useState(false);

  useEffect(() => {
    dispatch(fetchAllServiceItems());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const tabs = ["All Services", "Hair Care", "Nail Care", "Skin Therapy", "Bridal Packages"];

  // Existing mock data as fallback
  const MOCK_SERVICES = [
    {
      id: 1,
      name: "Classic Haircut",
      description: "A clean, classic haircut styled to your preference.",
      duration: "30 mins",
      price: "350",
      status: "ACTIVE",
      category: { name: "Hair Care" },
      gender: "UNISEX",
      serviceMode: "Salon",
      discountPercent: 10,
      addOns: [
        { id: "a1", name: "Hair Wash", price: 100, isRecommended: true },
        { id: "a2", name: "Blow Dry", price: 150, isRecommended: false },
      ],
    },
    {
      id: 2,
      name: "Botanical Scalp Therapy",
      description: "A restorative treatment using organic oils to rejuvenate follicles.",
      duration: "60 mins",
      price: "1200",
      status: "ACTIVE",
      category: { name: "Skin Therapy" },
      gender: "WOMEN",
      serviceMode: "Both",
      discountPercent: 15,
      addOns: [
        { id: "a3", name: "Extra Massage", price: 200, isRecommended: true },
      ],
    },
    {
      id: 3,
      name: "Beard Shaping",
      description: "Precision beard trim and shaping with hot towel finish.",
      duration: "20 mins",
      price: "200",
      status: "INACTIVE",
      category: { name: "Beard Grooming" },
      gender: "MEN",
      serviceMode: "Salon",
      discountPercent: 0,
      addOns: [],
    },
  ];

  const displayServices = serviceItems.length > 0 ? serviceItems : MOCK_SERVICES;

  if (isMobile) {
    return <MobileManageServicesScreen />;
  }

  if (isAddingService) {
    return (
      <AddServiceConfig 
        onCancel={() => setIsAddingService(false)} 
        onSave={() => setIsAddingService(false)} 
      />
    );
  }

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Services</h1>
          <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
            Manage your salon's editorial offerings. Adjust pricing, duration, and status to reflect your current atelier portfolio.
          </p>
        </div>
        <button 
          onClick={() => setIsAddingService(true)}
          className="flex items-center gap-3 bg-[#D81159] hover:bg-[#B00E48] text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest shadow-2xl shadow-rose-500/20 transition-all hover:-translate-y-1 active:scale-95 uppercase"
        >
          <Plus size={20} strokeWidth={3} />
          Add Service
        </button>
      </div>

      {/* ── Filters & Tabs ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-1 p-1.5 bg-slate-50 border border-slate-100 rounded-2xl overflow-x-auto no-scrollbar w-full md:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3.5 rounded-xl text-[13px] font-black transition-all whitespace-nowrap ${
                activeTab === tab 
                ? "bg-white text-[#D81159] shadow-md ring-1 ring-slate-100" 
                : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
          <span>Sort by:</span>
          <button className="flex items-center gap-2 text-slate-800 font-black px-4 py-2 hover:bg-white rounded-lg transition-all">
            Price: High to Low <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {displayServices.map((service) => {
          const catName = typeof service.category === "object" ? service.category?.name : categories.find(c => c._id === service.category)?.name || "Category";
          const gender = (service.gender || "UNISEX").toUpperCase();
          const mode = service.serviceMode || "Salon";

          return (
            <div 
              key={service.id || service._id} 
              className="group bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-rose-500/5 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight transition-colors">
                  {service.name}
                </h3>
                <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full ${
                  service.status?.toUpperCase() === 'ACTIVE' 
                  ? 'bg-emerald-50 text-emerald-600' 
                  : 'bg-slate-50 text-slate-400'
                }`}>
                  {service.status?.toUpperCase() === 'ACTIVE' ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Tags Row */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="flex items-center gap-1.5 text-teal-700">
                  <Scissors size={14} strokeWidth={2.5} />
                  <span className="text-xs font-bold">{catName}</span>
                </div>
                <div className="bg-[#A855F7] px-3 py-1 rounded-full">
                  <span className="text-white text-[10px] font-black uppercase">{gender}</span>
                </div>
                <div className="bg-[#10B981] flex items-center gap-1.5 px-3 py-1 rounded-full">
                  <Building size={10} className="text-white" />
                  <span className="text-white text-[10px] font-black uppercase">{mode}</span>
                </div>
              </div>

              {/* Price & Duration Row */}
              <div className="flex items-center gap-4 mb-6 pt-4 border-t border-slate-50">
                <div className="text-3xl font-black text-slate-900 tracking-tighter">
                  ₹{service.price}
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm">
                  <Clock size={16} /> {service.duration || `${service.durationMins} mins`}
                </div>
                {service.discountPercent > 0 && (
                  <div className="bg-emerald-50 px-2.5 py-1 rounded-lg ml-auto flex items-center gap-1.5">
                    <Tag size={12} className="text-emerald-500" />
                    <span className="text-[11px] font-black text-emerald-500">{service.discountPercent}% off</span>
                  </div>
                )}
              </div>

              {/* Add-ons Section */}
              {service.addOns?.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-1.5 mb-3 text-teal-700">
                    <PlusCircle size={16} strokeWidth={2.5} />
                    <span className="text-xs font-black">{service.addOns.length} Add-ons</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.addOns.map((addon, idx) => (
                      <div key={idx} className="bg-cyan-50 border border-cyan-100/50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-cyan-700">{addon.name} (+₹{addon.price})</span>
                        {addon.isRecommended && <Star size={10} fill="#F59E0B" className="text-amber-500" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-slate-500 font-medium text-[13px] leading-relaxed mb-8 flex-1">
                {service.description}
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
                <button className="flex-1 h-12 bg-[#0F766E] rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-teal-900/10">
                  <Pencil size={16} strokeWidth={2.5} />
                  <span>Edit</span>
                </button>
                <button className="flex-1 h-12 bg-[#10B981] rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-900/10">
                  <RefreshCcw size={16} strokeWidth={2.5} />
                  <span>Toggle</span>
                </button>
                <button className="flex-1 h-12 bg-[#EF4444] rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-900/10">
                  <Trash2 size={16} strokeWidth={2.5} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Add New Service Card */}
        <div 
          onClick={() => setIsAddingService(true)}
          className="rounded-[40px] border-2 border-dashed border-slate-200 p-10 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-[#D81159]/30 hover:bg-slate-50/50 transition-all duration-500 relative min-h-[500px]"
        >
           <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-[#D81159]/10 group-hover:text-[#D81159] transition-all">
             <Plus size={32} />
           </div>
           <div className="text-center space-y-1">
              <h4 className="text-xl font-black text-slate-800">Add New Service</h4>
              <p className="text-sm font-medium text-slate-400">Expand your atelier menu</p>
           </div>
        </div>
      </div>

      {/* ── Optimization Insight Banner ── */}
      <div className="relative overflow-hidden rounded-[50px] bg-[#E2DFFF] p-16 border border-white/50 shadow-2xl shadow-purple-500/10 group">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/20 via-rose-300/10 to-transparent blur-[120px] rounded-full -mr-[200px] -mt-[200px] transition-transform duration-1000 group-hover:scale-110"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-3xl text-center md:text-left">
               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#D81159] opacity-70">Optimization Insight</span>
               <h2 className="text-4xl md:text-5xl font-black text-[#1a0b3a] tracking-tighter leading-tight">
                  Your 'Bridal Suite' packages are performing <span className="text-[#D81159]">24% better</span> than last month.
               </h2>
               <p className="text-slate-600 font-medium text-lg leading-relaxed">
                  Consider adding a "Rehearsal Styling" sub-service to capture early wedding bookings.
               </p>
               <button className="bg-[#1a0b3a] hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-1 active:scale-95 shadow-2xl">
                  View Analytics
               </button>
            </div>
            
            <div className="hidden lg:block relative">
               <div className="w-64 h-64 bg-white/20 backdrop-blur-2xl rounded-[40px] border border-white/30 p-8 shadow-xl flex items-center justify-center rotate-6 group-hover:rotate-12 transition-transform duration-1000">
                  <div className="text-center space-y-2">
                     <span className="text-4xl font-black text-[#D81159]">+24%</span>
                     <p className="text-[10px] font-black uppercase tracking-widest text-[#1a0b3a] opacity-40">Growth Rate</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ManageServicesPage;