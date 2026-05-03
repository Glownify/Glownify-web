import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  fetchProviderServiceItems,
  deleteServiceItem,
  editServiceItem
} from "../../redux/slice/salonownerSlice";
import { toast } from "react-hot-toast";
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
import MobileAddServiceScreen from "./Mobile/MobileAddServiceScreen";

import AddServiceConfig from "./AddServiceConfig";
import EditServiceConfig from "./EditServiceConfig";

import { MOCK_SERVICES } from "../../utils/constants";

const genderBadge = (gender) => {
  const g = (gender || "").toLowerCase();
  switch (g) {
    case "men": return { bg: "bg-blue-500", text: "text-white" };
    case "women": return { bg: "bg-[#F43F5E]", text: "text-white" };
    case "unisex": return { bg: "bg-purple-500", text: "text-white" };
    default: return { bg: "bg-gray-400", text: "text-white" };
  }
};

const modeBadge = (mode) => {
  const m = (mode || "").toLowerCase();
  switch (m) {
    case "salon": return { bg: "bg-emerald-500", icon: <Building size={10} /> };
    case "home": return { bg: "bg-orange-500", icon: <Home size={10} /> };
    case "both": return { bg: "bg-blue-500", icon: <Building size={10} /> };
    default: return { bg: "bg-emerald-500", icon: <Building size={10} /> };
  }
};

const ManageServicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const { serviceItems = [], categories = [], loading } = useSelector((state) => state.saloonowner);
  const [activeGender, setActiveGender] = useState("all");
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    dispatch(fetchProviderServiceItems({ gender: activeGender, page: 1, limit: 20 }));
    dispatch(fetchAllCategories());
  }, [dispatch, activeGender]);

  const tabs = [
    { id: "all", label: "All Services" },
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "unisex", label: "Unisex" },
  ];

  const displayServices = serviceItems;

  const handleDelete = (service) => {
    if (window.confirm("Are you sure you want to deactivate this service?")) {
      toast.promise(
        dispatch(editServiceItem({
          serviceId: service._id,
          serviceData: { status: 'inactive' }
        })).unwrap(),
        {
          loading: "Deactivating service...",
          success: "Service deactivated!",
          error: "Failed to deactivate service"
        }
      );
    }
  };

  const handleToggleStatus = async (service) => {
    try {
      await toast.promise(
        dispatch(editServiceItem({
          serviceId: service._id,
          serviceData: { status: service.status === "active" ? "inactive" : "active" }
        })).unwrap(),
        {
          loading: "Updating status...",
          success: "Status updated!",
          error: "Failed to update status"
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Add Service state for both Desktop and Mobile
  if (isAddingService) {
    if (isMobile) {
      return (
        <MobileAddServiceScreen
          onCancel={() => setIsAddingService(false)}
          onSave={() => {
            setIsAddingService(false);
            dispatch(fetchProviderServiceItems({ gender: activeGender, page: 1, limit: 20 })); // Refresh list
          }}
        />
      );
    }
    return (
      <AddServiceConfig
        onCancel={() => setIsAddingService(false)}
        onSave={() => setIsAddingService(false)}
      />
    );
  }

  // Handle Edit Service state
  if (editingService) {
    return (
      <EditServiceConfig
        service={editingService}
        onCancel={() => setEditingService(null)}
        onSave={() => {
          setEditingService(null);
          dispatch(fetchProviderServiceItems({ gender: activeGender, page: 1, limit: 20 }));
        }}
      />
    );
  }

  // Mobile List View
  if (isMobile) {
    return (
      <MobileManageServicesScreen
        setIsAddingService={setIsAddingService}
        setEditingService={setEditingService}
      />
    );
  }

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-700">
      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-0">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tighter uppercase">Manage Services</h1>
        </div>
      </div>

      {/* ── Filters & Tabs ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-1 p-1.5 bg-slate-50 border border-slate-100 rounded-2xl overflow-x-auto no-scrollbar w-full md:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveGender(tab.id)}
              className={`px-5 py-2 rounded-xl text-[11px] font-black transition-all whitespace-nowrap ${activeGender === tab.id
                ? "bg-white text-[#D81159] shadow-md ring-1 ring-slate-100"
                : "text-slate-400 hover:text-slate-600"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAddingService(true)}
          className="flex items-center gap-2 bg-[#D81159] hover:bg-[#B00E48] text-white px-5 py-2.5 rounded-xl font-black text-[10px] tracking-widest shadow-xl shadow-rose-500/20 transition-all hover:-translate-y-1 active:scale-95 uppercase"
        >
          <Plus size={16} strokeWidth={3} />
          Add Service
        </button>
      </div>

      {/* ── Services Grid ── */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-[#D81159] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {displayServices.length === 0 ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-[40px] border border-slate-100 shadow-sm">
              <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-[#D81159] mb-6">
                <Scissors size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">No services found</h3>
              <p className="text-slate-500 font-medium mb-8">
                {activeGender === 'all' ? "You haven't added any services yet." : `No ${activeGender} services found in your menu.`}
              </p>
              <button
                onClick={() => setIsAddingService(true)}
                className="bg-[#D81159] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2"
              >
                <Plus size={20} /> Add Your First Service
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {displayServices.map((service) => {
                const catName = typeof service.category === "object"
                  ? service.category?.name
                  : categories.find(c => c._id === service.category)?.name || "Category";

                // Check gender from service or its category
                const genderValue = service.gender
                  || (typeof service.category === "object" ? service.category?.gender : categories.find(c => c._id === service.category)?.gender)
                  || "unisex";

                const gender = genderValue.toUpperCase();
                const gs = genderBadge(genderValue);
                const ms = modeBadge(service.serviceMode);

                return (
                  <div
                    key={service.id || service._id}
                    className="bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="p-6 flex flex-col flex-1">
                      {/* Header Section */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 mr-3">
                          <div className="flex items-center gap-3 mb-2">
                            {service.imageURL && (
                              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
                                <img src={service.imageURL} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}
                            <h3 className="text-xl font-black text-gray-800 tracking-tight">{service.name}</h3>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            <Scissors size={12} className="text-teal-700" />
                            <span className="text-[11px] font-bold text-teal-700 mr-1">{catName}</span>
                            <div className={`${gs.bg} px-2 py-0.5 rounded-full`}>
                              <span className={`${gs.text} text-[9px] font-black uppercase`}>{gender}</span>
                            </div>
                            {service.serviceMode && (
                              <div className={`${ms.bg} flex items-center gap-1 px-2.5 py-0.5 rounded-full`}>
                                <span className="text-white">{ms.icon}</span>
                                <span className="text-white text-[10px] font-black uppercase tracking-tighter">{service.serviceMode}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className={`px-3 py-1 rounded-full flex-shrink-0 ${service.status === "active" ? "bg-emerald-50" : "bg-gray-100"}`}>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${service.status === "active" ? "text-emerald-500" : "text-gray-400"}`}>
                            {service.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>

                      {/* Info Row: Price, Duration, Discount */}
                      <div className="flex items-center gap-4 py-4 border-t border-gray-100 border-b border-gray-100 my-4">
                        <span className="text-2xl font-black text-gray-900 tracking-tighter">₹{service.price}</span>
                        <div className="h-4 w-[1px] bg-gray-200"></div>
                        <span className="text-xs text-gray-400 font-bold flex items-center gap-1.5">
                          <Clock size={14} className="text-[#D81159]" /> {service.durationMins} mins
                        </span>
                        {service.discountPercent > 0 && (
                          <div className="bg-emerald-50 px-2.5 py-1 rounded-lg ml-auto flex items-center gap-1">
                            <Tag size={12} className="text-emerald-500" />
                            <span className="text-[10px] font-black text-emerald-500 tracking-tight">{service.discountPercent}% OFF</span>
                          </div>
                        )}
                      </div>

                      {/* Add-ons Section */}
                      {(() => {
                        const addOns = Array.isArray(service.addOns) && service.addOns.length > 0
                          ? service.addOns
                          : Array.isArray(service.addons) && service.addons.length > 0
                            ? service.addons
                            : [];

                        if (addOns.length === 0) return null;

                        return (
                          <div className="mb-5">
                            <div className="flex items-center gap-1.5 mb-3">
                              <PlusCircle size={14} className="text-teal-700" />
                              <span className="text-[11px] font-black text-teal-700 uppercase tracking-widest">
                                {addOns.length} Add-on{addOns.length > 1 ? "s" : ""}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {addOns.map((a, idx) => (
                                <div key={a._id || a.id || idx} className="flex items-center bg-cyan-50/50 border border-cyan-100 px-3 py-1.5 rounded-full gap-2 transition-colors hover:bg-cyan-50">
                                  {a.imageURL && (
                                    <img src={a.imageURL} alt="" className="w-5 h-5 rounded-full object-cover border border-white shadow-sm" />
                                  )}
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-cyan-800 font-black leading-tight">{a.name}</span>
                                    <span className="text-[9px] text-cyan-600/70 font-black uppercase tracking-tighter leading-none">
                                      +₹{a.price} • {a.duration || 0}m
                                    </span>
                                  </div>
                                  {a.isRecommended && (
                                    <span className="bg-amber-100 text-amber-600 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ml-1 shadow-sm">
                                      Recommended
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      {service.description && (
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-2 font-medium italic">
                          "{service.description}"
                        </p>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 mt-auto">
                        <button
                          className="flex-1 h-11 bg-[#0F766E] rounded-xl flex items-center justify-center gap-2 text-white font-bold text-sm transition-all hover:bg-[#0d635c] active:scale-95"
                          onClick={() => setEditingService(service)}
                        >
                          <Pencil size={15} strokeWidth={2.5} />
                          <span>Edit</span>
                        </button>

                        {service.status === 'active' ? (
                          <button
                            className="flex-1 h-11 bg-[#EF4444] rounded-xl flex items-center justify-center gap-2 text-white font-bold text-sm transition-all hover:bg-red-600 active:scale-95"
                            onClick={() => handleDelete(service)}
                          >
                            <Trash2 size={15} strokeWidth={2.5} />
                            <span>Delete</span>
                          </button>
                        ) : (
                          <button
                            className="flex-1 h-11 bg-[#10B981] rounded-xl flex items-center justify-center gap-2 text-white font-bold text-sm transition-all hover:bg-emerald-600 active:scale-95"
                            onClick={() => handleToggleStatus(service)}
                          >
                            <RefreshCcw size={15} strokeWidth={2.5} />
                            <span>Activate</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

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
    </div >
  );
};

export default ManageServicesPage;
