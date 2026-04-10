import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllCategories,
  fetchAllServiceItems,
  createServiceItem,
  editServiceItem,
  deleteServiceItem,
} from "../../../redux/slice/saloonownerSlice";
import toast from "react-hot-toast";
import {
  Scissors,
  PlusCircle,
  Star,
  Trash,
  XCircle,
  Edit,
  RefreshCcw,
  Plus,
  ChevronLeft,
  Building,
  Home,
  CheckCircle,
  Trash2,
  Clock,
  Tag
} from "lucide-react";

// Fallback dummy data if Redux store is empty
const DUMMY_SERVICES = [
  {
    _id: "s1", name: "Classic Haircut",
    category: { _id: "c1", name: "Hair Care", gender: "UNISEX" },
    price: 350, durationMins: 30, discountPercent: 10,
    description: "A clean, classic haircut styled to your preference.",
    serviceMode: "Salon", status: "active", gender: "unisex",
    addOns: [
      { id: "a1", name: "Hair Wash", price: 100, duration: 10, isRecommended: true },
      { id: "a2", name: "Blow Dry",  price: 150, duration: 15, isRecommended: false },
    ],
  },
  {
    _id: "s2", name: "Balayage Coloring",
    category: { _id: "c2", name: "Hair Care", gender: "WOMEN" },
    price: 2500, durationMins: 120, discountPercent: 0,
    description: "Hand-painted highlights for a natural sun-kissed look.",
    serviceMode: "Salon", status: "active", gender: "women", addOns: [],
  },
  {
    _id: "s3", name: "Beard Shaping",
    category: { _id: "c3", name: "Beard Grooming", gender: "MEN" },
    price: 200, durationMins: 20, discountPercent: 0,
    description: "Precision beard trim and shaping with hot towel finish.",
    serviceMode: "Both", status: "inactive", gender: "men",
    addOns: [{ id: "a3", name: "Hot Towel", price: 50, duration: 5, isRecommended: true }],
  },
];

const EMPTY_FORM = {
  name: "", category: "", price: "", durationMins: "30",
  discountPercent: "0", description: "", serviceMode: "salon", addOns: [],
};

const genderBadge = (gender) => {
  const g = (gender || "").toLowerCase();
  switch (g) {
    case "men":    return { bg: "bg-blue-500", text: "text-white" };
    case "women":  return { bg: "bg-[#F43F5E]", text: "text-white" };
    case "unisex": return { bg: "bg-purple-500", text: "text-white" };
    default:       return { bg: "bg-gray-400", text: "text-white" };
  }
};

const modeBadge = (mode) => {
  const m = (mode || "").toLowerCase();
  switch (m) {
    case "salon": return { bg: "bg-emerald-500", icon: <Building size={10} /> };
    case "home":  return { bg: "bg-orange-500", icon: <Home size={10} /> };
    case "both":  return { bg: "bg-blue-500", icon: <Building size={10} /> };
    default:      return { bg: "bg-emerald-500", icon: <Building size={10} /> };
  }
};

export default function MobileManageServicesScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { serviceItems = [], loading, error, categories = [] } = useSelector(
    (state) => state.saloonowner
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [genderFilter, setGenderFilter] = useState("all");
  const [form, setForm] = useState(EMPTY_FORM);
  const [showAddOnForm, setShowAddOnForm] = useState(false);

  // If redux is empty and not loading, we use our DUMMY_SERVICES as a fallback layer
  const activeServices = serviceItems.length > 0 ? serviceItems : DUMMY_SERVICES;

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  // ── Add-on helpers ──────────────────────────────────────────────────────
  const addNewAddOn = () => {
    setField("addOns", [
      ...form.addOns,
      { id: Date.now().toString(), name: "", price: "", duration: "0", isRecommended: false },
    ]);
    setShowAddOnForm(true);
  };

  const updateAddOn = (i, field, value) => {
    const updated = form.addOns.map((a, idx) => idx === i ? { ...a, [field]: value } : a);
    setField("addOns", updated);
  };

  const removeAddOn = (i) => {
    if (window.confirm("Are you sure you want to remove this add-on?")) {
      const updated = form.addOns.filter((_, idx) => idx !== i);
      setField("addOns", updated);
      if (updated.length === 0) setShowAddOnForm(false);
    }
  };

  const toggleRecommended = (i) => {
    const updated = form.addOns.map((a, idx) =>
      idx === i ? { ...a, isRecommended: !a.isRecommended } : a
    );
    setField("addOns", updated);
  };

  // ── Open / close modal ──────────────────────────────────────────────────
  const openModal = (service = null) => {
    if (service) {
      const catId = typeof service.category === "string"
        ? service.category : service.category?._id;
      setEditingService(service);
      setForm({
        name:            service.name || "",
        category:        catId || "",
        price:           service.price != null ? String(service.price) : "",
        durationMins:    service.durationMins != null ? String(service.durationMins) : "30",
        discountPercent: service.discountPercent != null ? String(service.discountPercent) : "0",
        description:     service.description || "",
        serviceMode:     (service.serviceMode || "salon").toLowerCase(),
        addOns: (service.addOns || []).map((a) => ({
          id:            a._id || a.id || Date.now().toString(),
          name:          a.name || "",
          price:         a.price != null ? String(a.price) : "",
          duration:      a.duration != null ? String(a.duration) : "0",
          isRecommended: a.isRecommended || false,
        })),
      });
      setShowAddOnForm((service.addOns || []).length > 0);
    } else {
      setEditingService(null);
      setForm(EMPTY_FORM);
      setShowAddOnForm(false);
    }
    setModalVisible(true);
  };

  const closeModal = () => { setModalVisible(false); setEditingService(null); };

  // ── Save ────────────────────────────────────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) {
      toast.error("Please fill all required fields.");
      return;
    }

    const validAddOns = form.addOns.filter((addon) => addon.name && addon.price);
    const formattedAddOns = validAddOns.map((addon) => ({
      ...(addon.id && !addon.id.startsWith(Date.now().toString().substring(0,5)) && { _id: addon.id }),
      name: addon.name,
      price: Number(addon.price),
      duration: Number(addon.duration) || 0,
      isRecommended: addon.isRecommended,
    }));

    const serviceData = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      durationMins: Number(form.durationMins),
      discountPercent: Number(form.discountPercent) || 0,
      description: form.description,
      serviceMode: form.serviceMode,
      providerType: "Salon",
      addOns: formattedAddOns,
    };

    try {
      const actionPromise = editingService
        ? dispatch(editServiceItem({ serviceId: editingService._id, serviceData })).unwrap()
        : dispatch(createServiceItem(serviceData)).unwrap();

      await toast.promise(actionPromise, {
        loading: editingService ? "Updating service..." : "Creating service...",
        success: editingService ? "Service updated!" : "Service added!",
        error: "Error saving service",
      });

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  // ── Delete ──────────────────────────────────────────────────────────────
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      toast.promise(dispatch(deleteServiceItem(id)).unwrap(), {
        loading: "Deleting service...",
        success: "Service deleted!",
        error: "Failed to delete service"
      });
    }
  };

  // ── Toggle status ───────────────────────────────────────────────────────
  const toggleStatus = async (service) => {
    if (service._id.startsWith("s")) {
      toast.success("Toggled dummy data status visually");
      return; // Cannot interact backend with mock data
    }
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

  // ── Filter ──────────────────────────────────────────────────────────────
  const filteredServices = genderFilter === "all" ? activeServices : activeServices.filter((s) => {
    const g = (s.gender
      || (typeof s.category === "object" && s.category?.gender)
      || categories.find((c) => c._id === s.category)?.gender || "").toLowerCase();
    return g === genderFilter || g === "unisex";
  });

  // ─── SERVICE CARD ─────────────────────────────────────────────────────────
  const renderCard = (service) => {
    const catObj   = typeof service.category === "object"
      ? service.category
      : categories.find((c) => c._id === service.category);
    const gender   = (service.gender || catObj?.gender || "unisex").toUpperCase();
    const gs       = genderBadge(gender);
    const ms       = modeBadge(service.serviceMode);

    return (
      <div key={service._id} className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100">

        {/* Top row */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 mr-3">
            <h3 className="text-lg font-extrabold text-gray-800 m-0">{service.name}</h3>
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <Scissors size={12} className="text-teal-700" />
              <span className="text-[11px] font-medium text-teal-700 mr-1">{catObj?.name || 'Category'}</span>

              <div className={`${gs.bg} px-2 py-0.5 rounded-full`}>
                <span className={`${gs.text} text-[9px] font-black uppercase`}>{gender}</span>
              </div>

              {service.serviceMode && (
                <div className={`${ms.bg} flex items-center gap-1 px-2 py-0.5 rounded-full ml-1`}>
                  <span className="text-white">{ms.icon}</span>
                  <span className="text-white text-[10px] font-bold capitalize">
                    {service.serviceMode}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className={`px-2.5 py-1 rounded-full ${service.status === "active" ? "bg-emerald-50" : "bg-gray-100"}`}>
            <span className={`text-[11px] font-black ${service.status === "active" ? "text-emerald-500" : "text-gray-400"}`}>
              {service.status === "active" ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Price / duration / discount */}
        <div className="flex items-center gap-4 py-3 border-t border-gray-100 border-b border-b-gray-100 my-3">
          <span className="text-[17px] font-black text-gray-900">₹{service.price}</span>
          <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
            <Clock size={12} /> {service.durationMins} mins
          </span>
          {service.discountPercent > 0 && (
            <div className="bg-emerald-50 px-2 py-0.5 rounded ml-auto flex items-center gap-1">
              <Tag size={12} className="text-emerald-500"/>
              <span className="text-[11px] font-bold text-emerald-500">{service.discountPercent}% off</span>
            </div>
          )}
        </div>

        {/* Add-ons preview */}
        {service.addOns?.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2">
              <PlusCircle size={14} className="text-teal-700" />
              <span className="text-xs font-black text-teal-700">
                {service.addOns.length} Add-on{service.addOns.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.addOns.map((a, idx) => (
                <div key={idx} className="flex items-center bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full gap-1">
                  <span className="text-[11px] text-cyan-700 font-semibold">{a.name} (+₹{a.price})</span>
                  {a.isRecommended && <Star fill="#f59e0b" size={12} className="text-amber-500 ml-1" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {service.description && (
          <p className="text-[13px] text-gray-500 mb-4 leading-relaxed line-clamp-2">
            {service.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            className="flex-1 flex justify-center items-center gap-1.5 bg-[#0f766e] py-2.5 rounded-lg transition-transform active:scale-95 shadow-sm"
            onClick={() => openModal(service)}
          >
            <Edit size={14} className="text-white" />
            <span className="text-white text-[13px] font-bold">Edit</span>
          </button>
          <button
            className="flex-1 flex justify-center items-center gap-1.5 bg-emerald-500 py-2.5 rounded-lg transition-transform active:scale-95 shadow-sm"
            onClick={() => toggleStatus(service)}
          >
            <RefreshCcw size={14} className="text-white" />
            <span className="text-white text-[13px] font-bold">Toggle</span>
          </button>
          <button
            className="flex-1 flex justify-center items-center gap-1.5 bg-[#ef4444] py-2.5 rounded-lg transition-transform active:scale-95 shadow-sm"
            onClick={() => handleDelete(service._id)}
          >
            <Trash2 size={14} className="text-white" />
            <span className="text-white text-[13px] font-bold">Delete</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5F6] pb-24 font-sans">
      {/* Header */}
      <div className="bg-[#F43F5E] px-4 pt-10 pb-6 flex items-center gap-4 shadow-sm relative sticky top-0 z-10">
         <button onClick={() => navigate(-1)} className="text-white hover:opacity-80 transition-opacity p-1">
            <ChevronLeft size={28} />
         </button>
         <div>
            <h1 className="text-[28px] font-extrabold text-white m-0 leading-tight tracking-tight">Services</h1>
            <p className="text-sm font-medium text-rose-100 m-0 mt-0.5">{activeServices.length} Total</p>
         </div>
      </div>

      {/* Gender filter */}
      <div className="bg-white px-5 py-4 shadow-sm border-b border-rose-100 sticky top-[92px] z-10">
        <p className="text-xs font-medium text-gray-400 mb-3 tracking-wide">Filter by Gender</p>
        <div className="flex gap-3">
          {["all", "men", "women", "unisex"].map((g) => {
            const active = genderFilter === g;
            return (
              <button
                key={g}
                className={`flex-1 flex items-center justify-center py-2 rounded-full border text-[13px] font-bold capitalize transition-all ${
                  active ? "bg-[#F43F5E] border-[#F43F5E] text-white shadow-md shadow-rose-200" : "bg-white border-gray-200 text-teal-700 hover:bg-gray-50"
                }`}
                onClick={() => setGenderFilter(g)}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error / Content */}
      <div className="flex-1 p-5 overflow-y-auto">
        <button
          className="w-full flex justify-center items-center gap-2 bg-[#F43F5E] rounded-xl py-3.5 mb-5 shadow-md shadow-rose-200 transition-transform active:scale-[0.98]"
          onClick={() => openModal(null)}
        >
          <PlusCircle size={20} className="text-white" />
          <span className="text-white font-bold text-[15px]">Add Service</span>
        </button>

        {error && <p className="text-red-500 text-center text-sm py-4">{error}</p>}
        {loading && <div className="text-center py-8"><span className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-[#F43F5E] rounded-full"></span></div>}

        {!loading && !error && (
          filteredServices.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                 <Scissors size={32} className="text-gray-300" />
              </div>
              <p className="text-gray-400 text-[15px] font-medium text-center">
                {genderFilter === "all" ? "No services created yet" : `No ${genderFilter} services found`}
              </p>
            </div>
          ) : (
            filteredServices.map(renderCard)
          )
        )}
      </div>

      {/* ─── Add / Edit Modal ──────────────────────────────────────────────── */}
      {modalVisible && (
        <div className="fixed inset-0 bg-white z-[9999] overflow-y-auto flex flex-col font-sans">
          {/* Modal header */}
          <div className="flex justify-between items-center px-4 pt-12 pb-4 border-b border-gray-100 shrink-0 sticky top-0 bg-white z-20">
            <h2 className="text-[22px] font-bold text-[#0f766e] m-0 tracking-tight">
              {editingService ? "Edit Service" : "Add Service"}
            </h2>
            <button onClick={closeModal} className="p-1.5 bg-red-50 hover:bg-red-100 rounded-full transition-colors">
              <XCircle size={24} className="text-[#ef4444]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pb-6">
            <form onSubmit={handleSave}>
              {/* Basic Info */}
              <div className="px-5 py-6 border-b border-gray-100">
                <h3 className="text-[17px] font-bold text-gray-900 mb-4 m-0">Basic Information</h3>

                <input
                  placeholder="Service Name *"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-4 text-[15px] text-gray-900 focus:outline-[#0f766e] focus:border-[#0f766e] placeholder-gray-400 shadow-sm transition-all"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                />

                <label className="block text-[13px] font-medium text-gray-500 mb-1.5 ml-1">Select Category *</label>
                <div className="relative mb-3">
                  <select
                    className="w-full border border-gray-200 rounded-xl bg-white px-4 py-3 text-[15px] text-gray-900 focus:outline-[#0f766e] appearance-none shadow-sm transition-all dropdown-select"
                    value={form.category}
                    onChange={(e) => setField("category", e.target.value)}
                  >
                    <option value="" disabled className="text-gray-400">-- Select Category --</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name} ({cat.gender})</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>

                {/* Selected category pill */}
                {form.category && (() => {
                  const cat = categories.find((c) => c._id === form.category);
                  const gs  = genderBadge(cat?.gender);
                  return (
                     <div className="flex items-center gap-2 bg-teal-50/60 border border-teal-100 px-3 py-2.5 rounded-xl mb-4">
                       <Info size={16} className="text-[#0f766e]" />
                       <span className="text-[13px] font-bold text-[#0f766e]">{cat?.name}</span>
                       <div className={`${gs.bg} px-2 py-0.5 rounded-full`}>
                         <span className={`${gs.text} text-[10px] font-bold uppercase`}>{cat?.gender}</span>
                       </div>
                     </div>
                  );
                })()}

                {/* Price + Duration */}
                <div className="flex gap-3 mb-4">
                  <input
                    placeholder="Price (₹) *"
                    type="number"
                    className="flex-[1.5] border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 focus:outline-[#0f766e] shadow-sm transition-all"
                    value={form.price}
                    onChange={(e) => setField("price", e.target.value)}
                  />
                  <input
                    placeholder="Duration(mins)"
                    type="number"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 focus:outline-[#0f766e] shadow-sm transition-all"
                    value={form.durationMins}
                    onChange={(e) => setField("durationMins", e.target.value)}
                  />
                </div>

                <input
                  placeholder="Discount %"
                  type="number"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-4 text-[15px] text-gray-900 focus:outline-[#0f766e] shadow-sm transition-all"
                  value={form.discountPercent}
                  onChange={(e) => setField("discountPercent", e.target.value)}
                />

                <textarea
                  placeholder="Description"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-4 text-[15px] text-gray-900 resize-none h-24 focus:outline-[#0f766e] shadow-sm transition-all"
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                />

                {/* Service mode */}
                <label className="block text-[13px] font-medium text-gray-500 mb-2 ml-1">Service Mode *</label>
                <div className="flex gap-2">
                  {["salon", "home", "both"].map((mode) => {
                    const active = form.serviceMode === mode;
                    return (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setField("serviceMode", mode)}
                        className={`flex-1 py-2.5 rounded-xl border text-[14px] font-bold capitalize transition-all ${
                          active ? "bg-[#0f766e] border-[#0f766e] text-white shadow-md shadow-teal-100" : "bg-white border-gray-200 text-[#0f766e] hover:bg-gray-50 text-center"
                        }`}
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons */}
              <div className="px-5 py-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-[17px] font-bold text-gray-900 m-0">Add-ons</h3>
                    <span className="text-[13px] text-gray-400 italic">(Optional)</span>
                  </div>
                  {!showAddOnForm && (
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#0f766e] hover:bg-teal-50 transition-colors"
                      onClick={() => setShowAddOnForm(true)}
                    >
                      <PlusCircle size={14} className="text-[#0f766e]" />
                      <span className="text-[13px] font-bold text-[#0f766e]">Add</span>
                    </button>
                  )}
                </div>

                {showAddOnForm && (
                  <div className="flex flex-col gap-4">
                    {form.addOns.map((addon, i) => (
                      <div key={addon.id || i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm relative">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[14px] font-bold text-[#0f766e]">Add-on #{i + 1}</span>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => toggleRecommended(i)} className="p-1">
                              {addon.isRecommended ? <Star fill="#f59e0b" size={20} className="text-amber-500" /> : <Star size={20} className="text-gray-300" />}
                            </button>
                            <button type="button" onClick={() => removeAddOn(i)} className="p-1">
                              <Trash2 size={20} className="text-[#ef4444]" />
                            </button>
                          </div>
                        </div>

                        <input
                          placeholder="Add-on Name *"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 text-[15px] text-gray-900 bg-white focus:outline-[#0f766e] shadow-sm transition-all"
                          value={addon.name}
                          onChange={(e) => updateAddOn(i, "name", e.target.value)}
                        />

                        <div className="flex gap-3">
                          <input
                            placeholder="Price (₹) *"
                            type="number"
                            className="flex-[1.5] border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 bg-white focus:outline-[#0f766e] shadow-sm transition-all"
                            value={addon.price}
                            onChange={(e) => updateAddOn(i, "price", e.target.value)}
                          />
                          <input
                            placeholder="Duration (m)"
                            type="number"
                            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 bg-white focus:outline-[#0f766e] shadow-sm transition-all"
                            value={addon.duration}
                            onChange={(e) => updateAddOn(i, "duration", e.target.value)}
                          />
                        </div>

                        {addon.isRecommended && (
                          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full self-start mt-3 w-max">
                            <Star fill="#f59e0b" size={12} className="text-amber-500" />
                            <span className="text-[11px] font-bold text-amber-600">Recommended</span>
                          </div>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      className="flex justify-center items-center gap-2 py-3.5 rounded-xl border-dashed border-2 border-[#0f766e] bg-white transition-opacity active:opacity-80 mt-1 shadow-sm text-[#0f766e]"
                      onClick={addNewAddOn}
                    >
                      <Plus size={18} />
                      <span className="text-[15px] font-bold text-center w-full">Add Another Add-on</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Modal actions */}
              <div className="flex gap-3 px-5 py-4 pb-12 sticky bottom-0 bg-white border-t border-gray-50 z-20">
                <button
                  type="submit"
                  className="flex-1 flex justify-center items-center gap-2 bg-[#0f766e] py-4 rounded-xl transition-transform active:scale-[0.98] shadow-md shadow-teal-100"
                >
                  <CheckCircle size={18} className="text-white bg-white/20 rounded-full" />
                  <span className="text-white font-bold text-[16px]">
                    {editingService ? "Update" : "Add Service"}
                  </span>
                </button>

                <button
                  type="button"
                  className="flex-[0.8] flex justify-center items-center gap-2 bg-[#ef4444] py-4 rounded-xl transition-transform active:scale-[0.98] shadow-md shadow-red-100"
                  onClick={closeModal}
                >
                  <XCircle size={18} className="text-white bg-white/20 rounded-full" />
                  <span className="text-white font-bold text-[16px]">Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
