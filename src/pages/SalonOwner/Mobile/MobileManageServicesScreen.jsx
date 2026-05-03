import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllCategories,
  fetchProviderServiceItems,
  deleteServiceItem,
  editServiceItem
} from "../../../redux/slice/salonownerSlice";
import toast from "react-hot-toast";
import {
  Scissors,
  PlusCircle,
  Star,
  Edit,
  RefreshCcw,
  Plus,
  ChevronLeft,
  Building,
  Home,
  Trash2,
  Clock,
  Tag
} from "lucide-react";
import MobileBottomNav from './MobileBottomNav';

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

export default function MobileManageServicesScreen({ setIsAddingService, setEditingService }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { serviceItems = [], loading, error, categories = [] } = useSelector(
    (state) => state.saloonowner
  );

  const [genderFilter, setGenderFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchProviderServiceItems({ gender: genderFilter, page: 1, limit: 20 }));
    dispatch(fetchAllCategories());
  }, [dispatch, genderFilter]);

  const activeServices = serviceItems;
  const safeCategories = Array.isArray(categories) ? categories : [];

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

  const toggleStatus = async (service) => {
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

  const renderCard = (service) => {
    const catObj = typeof service.category === "object"
      ? service.category
      : safeCategories.find((c) => c._id === service.category);
    const gender = (service.gender || catObj?.gender || "unisex").toUpperCase();
    const gs = genderBadge(gender);
    const ms = modeBadge(service.serviceMode);

    return (
      <div key={service._id} className="bg-white rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-100">
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 mr-3">
              <div className="flex items-center gap-3 mb-2">
                {service.imageURL && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
                    <img src={service.imageURL} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <h3 className="text-lg font-extrabold text-gray-800 m-0">{service.name}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <Scissors size={12} className="text-teal-700" />
                <span className="text-[11px] font-medium text-teal-700 mr-1">{catObj?.name || 'Category'}</span>
                <div className={`${gs.bg} px-2 py-0.5 rounded-full`}>
                  <span className={`${gs.text} text-[9px] font-black uppercase`}>{gender}</span>
                </div>
                {service.serviceMode && (
                  <div className={`${ms.bg} flex items-center gap-1 px-2 py-0.5 rounded-full`}>
                    <span className="text-white">{ms.icon}</span>
                    <span className="text-white text-[10px] font-bold capitalize">{service.serviceMode}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={`px-2.5 py-1 rounded-full flex-shrink-0 ${service.status === "active" ? "bg-emerald-50" : "bg-gray-100"}`}>
              <span className={`text-[11px] font-black ${service.status === "active" ? "text-emerald-500" : "text-gray-400"}`}>
                {service.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 py-3 border-t border-gray-100 border-b border-b-gray-100 my-3">
            <span className="text-[17px] font-black text-gray-900">₹{service.price}</span>
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
              <Clock size={12} /> {service.durationMins} mins
            </span>
            {service.discountPercent > 0 && (
              <div className="bg-emerald-50 px-2 py-0.5 rounded ml-auto flex items-center gap-1">
                <Tag size={12} className="text-emerald-500" />
                <span className="text-[11px] font-bold text-emerald-500">{service.discountPercent}% off</span>
              </div>
            )}
          </div>

          {(() => {
            const addOns = Array.isArray(service.addOns) && service.addOns.length > 0
              ? service.addOns
              : Array.isArray(service.addons) && service.addons.length > 0
                ? service.addons
                : [];

            if (addOns.length === 0) return null;

            return (
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  <PlusCircle size={14} className="text-teal-700" />
                  <span className="text-xs font-black text-teal-700">
                    {addOns.length} Add-on{addOns.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {addOns.map((a, idx) => (
                    <div key={a._id || a.id || idx} className="flex items-center bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full gap-2">
                      {a.imageURL && (
                        <img src={a.imageURL} alt="" className="w-4 h-4 rounded-full object-cover border border-white" />
                      )}
                      <div className="flex flex-col">
                        <span className="text-[10px] text-cyan-700 font-bold leading-tight">{a.name}</span>
                        <span className="text-[8px] text-cyan-600/70 font-black uppercase tracking-tighter leading-none">
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
            <p className="text-[13px] text-gray-500 mb-4 leading-relaxed line-clamp-2">
              {service.description}
            </p>
          )}

          <div className="flex gap-2">
            <button
              className="flex-1 flex justify-center items-center gap-1.5 bg-[#0f766e] py-2.5 rounded-lg transition-transform active:scale-95 shadow-sm"
              onClick={() => setEditingService(service)}
            >
              <Edit size={14} className="text-white" />
              <span className="text-white text-[13px] font-bold">Edit</span>
            </button>
            {service.status === 'active' ? (
              <button
                className="flex-1 flex justify-center items-center gap-1.5 bg-[#ef4444] py-2.5 rounded-lg transition-transform active:scale-95 shadow-sm"
                onClick={() => handleDelete(service)}
              >
                <Trash2 size={14} className="text-white" />
                <span className="text-white text-[13px] font-bold">Delete</span>
              </button>
            ) : (
              <button
                className="flex-1 flex justify-center items-center gap-1.5 bg-emerald-500 py-2.5 rounded-lg transition-transform active:scale-95 shadow-sm"
                onClick={() => toggleStatus(service)}
              >
                <RefreshCcw size={14} className="text-white" />
                <span className="text-white text-[13px] font-bold">Activate</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5F6] pb-24 font-sans">
      <div className="bg-[#F43F5E] px-4 pt-3 pb-3 flex items-center gap-4 shadow-sm relative sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-white hover:opacity-80 transition-opacity p-1">
          <ChevronLeft size={28} />
        </button>
        <div>
          <h1 className="text-[28px] font-semibold text-white m-0 leading-tight tracking-tight">Services</h1>
          <p className="text-sm font-medium text-rose-100 m-0 mt-0.5">{activeServices.length} Total</p>
        </div>
      </div>

      <div className="bg-white px-5 py-3 shadow-sm border-b border-rose-100 sticky top-[81px] z-10">
        <p className="text-xs font-medium text-gray-400 mb-3 tracking-wide">Filter by Gender</p>
        <div className="flex gap-3">
          {["all", "men", "women", "unisex"].map((g) => {
            const active = genderFilter === g;
            return (
              <button
                key={g}
                className={`flex-1 flex items-center justify-center py-2 rounded-full border text-[13px] font-bold capitalize transition-all ${active ? "bg-[#F43F5E] border-[#F43F5E] text-white shadow-md shadow-rose-200" : "bg-white border-gray-200 text-teal-700 hover:bg-gray-50"}`}
                onClick={() => setGenderFilter(g)}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 p-5 overflow-y-auto">
        <button
          className="w-full flex justify-center items-center gap-2 bg-[#F43F5E] rounded-xl py-3.5 mb-5 shadow-md shadow-rose-200 transition-transform active:scale-[0.98]"
          onClick={() => setIsAddingService(true)}
        >
          <PlusCircle size={20} className="text-white" />
          <span className="text-white font-bold text-[15px]">Add Service</span>
        </button>

        {error && <p className="text-red-500 text-center text-sm py-4">{error}</p>}
        {loading && <div className="text-center py-8"><span className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-[#F43F5E] rounded-full"></span></div>}

        {!loading && !error && (
          activeServices.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center bg-white rounded-[32px] border border-rose-50 shadow-sm px-6 text-center">
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-[#F43F5E] mb-6">
                <Scissors size={32} />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed">
                {genderFilter === 'all' ? "You haven't added any services yet." : `No ${genderFilter} services found in your menu.`}
              </p>
              <button
                onClick={() => setIsAddingService(true)}
                className="w-full bg-[#F43F5E] text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-rose-200 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={18} strokeWidth={3} /> Add Your First Service
              </button>
            </div>
          ) : (
            activeServices.map(renderCard)
          )
        )}
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
