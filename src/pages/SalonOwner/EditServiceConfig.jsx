import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Info,
  ChevronDown,
  Store,
  Home,
  Layers,
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
  Upload,
  X,
  Plus,
  Trash2,
  Clock,
  Tag,
  Star,
  Camera,
  RefreshCcw
} from "lucide-react";
import {
  fetchAllCategories,
  editServiceItem
} from "../../redux/slice/salonownerSlice";
import { toast } from "react-hot-toast";

const EditServiceConfig = ({ service, onCancel, onSave }) => {
  const dispatch = useDispatch();
  const { categories = [], loading } = useSelector((state) => state.saloonowner);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const addonFileRefs = useRef({});

  // Form State
  const [formData, setFormData] = useState({
    name: service.name || "",
    serviceCategory: typeof service.serviceCategory === 'string' ? service.serviceCategory : (service.serviceCategory?._id || service.category?._id || ""),
    price: service.price || "",
    durationMins: service.durationMins || "",
    discountPercent: service.discountPercent || "",
    description: service.description || "",
    serviceMode: service.serviceMode?.toLowerCase() || "salon",
    status: service.status || "active",
    addOns: (service.addOns || service.addons || []).map(a => ({
      _id: a._id || a.id || null, // Backend needs _id for existing ones
      tempId: !a._id && !a.id ? Math.random().toString() : null, // For local tracking of new ones
      name: a.name,
      price: a.price,
      duration: a.duration || 0,
      isRecommended: a.isRecommended || false,
      imageURL: a.imageURL || null,
      file: null,
      previewUrl: a.imageURL || null,
      imageAction: "keep" // Default action for existing addons
    }))
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(service.imageURL || null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategories());

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (categoryId) => {
    setFormData(prev => ({ ...prev, serviceCategory: categoryId }));
    setIsDropdownOpen(false);
  };

  const handleModeChange = (mode) => {
    setFormData(prev => ({ ...prev, serviceMode: mode }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Add-on handlers
  const addAddOn = () => {
    setFormData(prev => ({
      ...prev,
      addOns: [...prev.addOns, {
        tempId: Date.now().toString(),
        name: "",
        price: "",
        duration: 0,
        isRecommended: false,
        file: null,
        previewUrl: null,
        imageAction: null // New ones don't need 'keep' initially
      }]
    }));
  };

  const removeAddOn = (id, tempId) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.filter(a => id ? a._id !== id : a.tempId !== tempId)
    }));
  };

  const updateAddOn = (matchId, isTemp, field, value) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.map(a => {
        const isMatch = isTemp ? a.tempId === matchId : a._id === matchId;
        return isMatch ? { ...a, [field]: value } : a;
      })
    }));
  };

  const handleAddOnFile = (matchId, isTemp, e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        addOns: prev.addOns.map(a => {
          const isMatch = isTemp ? a.tempId === matchId : a._id === matchId;
          return isMatch ? { ...a, file: file, previewUrl: preview, imageAction: "update" } : a;
        })
      }));
    }
  };

  const removeAddOnImage = (matchId, isTemp) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.map(a => {
        const isMatch = isTemp ? a.tempId === matchId : a._id === matchId;
        if (isMatch) {
          return {
            ...a,
            file: null,
            previewUrl: null,
            imageAction: a._id ? "remove" : null
          };
        }
        return a;
      })
    }));
  };

  const validateForm = () => {
    if (!formData.serviceCategory) return "Please select a category";
    if (!formData.name) return "Service name is required";
    if (!formData.price) return "Price is required";
    if (!formData.durationMins) return "Duration is required";
    if (!formData.serviceMode) return "Please select a service mode";

    for (let a of formData.addOns) {
      if (!a.name || !a.price) return "Please fill all add-on details or remove empty ones";
    }
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("serviceCategory", formData.serviceCategory);
      submitData.append("price", Number(formData.price));
      submitData.append("durationMins", Number(formData.durationMins));
      submitData.append("discountPercent", formData.discountPercent ? Number(formData.discountPercent) : 0);
      submitData.append("description", formData.description);
      submitData.append("serviceMode", formData.serviceMode);
      submitData.append("status", formData.status);

      // 1. Build AddOns Array with correct imageAction
      const addOnsPayload = formData.addOns.map(a => {
        const item = {
          name: a.name,
          price: Number(a.price),
          duration: Number(a.duration),
          isRecommended: a.isRecommended
        };

        if (a._id) item._id = a._id; // Existing ones must have _id
        if (a.imageAction) item.imageAction = a.imageAction; // keep, update, remove

        return item;
      });
      submitData.append("addOns", JSON.stringify(addOnsPayload));

      // 2. Service item image (if changed)
      if (selectedFile) {
        submitData.append("file", selectedFile);
      }

      // 3. AddOn Images: Only append those with imageAction: "update"
      formData.addOns.forEach((a) => {
        if (a.imageAction === "update" && a.file) {
          submitData.append("addonImages", a.file);
        }
      });

      await dispatch(editServiceItem({
        serviceId: service._id,
        serviceData: submitData
      })).unwrap();

      toast.success("Service updated successfully!");
      if (onSave) onSave();
    } catch (error) {
      toast.error(error || "Failed to update service");
    }
  };

  const selectedCategory = categories.find(c => c._id === formData.serviceCategory);

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6">
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
          Services
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-[#D81159]">Edit Service</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-4">
        <div className="space-y-0">
          <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">
            Edit Service
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">

          {/* Card: Basic Information */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 overflow-visible relative">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-[#D81159] flex items-center justify-center">
                <Info size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Essential Details</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-3 relative" ref={dropdownRef}>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Service Category *</label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium transition-all flex items-center justify-between shadow-sm hover:bg-slate-100/50"
                >
                  <div className="flex items-center gap-3">
                    {selectedCategory ? (
                      <>
                        <img src={selectedCategory.icon} alt="" className="w-6 h-6 object-contain" />
                        <span>{selectedCategory.name}</span>
                      </>
                    ) : (
                      <span className="text-slate-300">Select Category</span>
                    )}
                  </div>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 max-h-60 overflow-y-auto py-2">
                    {categories.map((cat) => (
                      <button
                        key={cat._id}
                        type="button"
                        onClick={() => handleCategorySelect(cat._id)}
                        className={`w-full px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors ${formData.serviceCategory === cat._id ? 'bg-rose-50/50' : ''}`}
                      >
                        <img src={cat.icon} alt="" className="w-8 h-8 object-contain" />
                        <span className={`font-bold ${formData.serviceCategory === cat._id ? 'text-[#D81159]' : 'text-slate-700'}`}>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Service Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 ring-rose-100 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 ring-rose-100 outline-none transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Duration (Min) *</label>
                  <input
                    type="number"
                    name="durationMins"
                    value={formData.durationMins}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 ring-rose-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium resize-none focus:ring-2 ring-rose-100 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Card: Add-ons Management */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <Plus size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Service Add-ons</h2>
              </div>
              <button
                onClick={addAddOn}
                className="flex items-center gap-2 text-[#D81159] font-black text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                <Plus size={16} /> Add Another
              </button>
            </div>

            <div className="space-y-6">
              {formData.addOns.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-[30px] border-2 border-dashed border-slate-100">
                  <p className="text-slate-400 font-bold text-sm">No add-ons defined for this service.</p>
                </div>
              ) : (
                formData.addOns.map((addon) => {
                  const matchId = addon._id || addon.tempId;
                  const isTemp = !!addon.tempId;

                  return (
                    <div key={matchId} className="bg-slate-50/50 rounded-3xl p-6 flex flex-col gap-6 border border-slate-100 relative group/addon">

                      <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Add-on Image Upload */}
                        <div className="relative flex-shrink-0">
                          <div
                            onClick={() => addonFileRefs.current[matchId]?.click()}
                            className="w-20 h-20 rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden flex items-center justify-center cursor-pointer hover:border-rose-200 transition-all group/img"
                          >
                            {addon.previewUrl ? (
                              <img src={addon.previewUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Camera size={24} className="text-slate-300 group-hover/img:scale-110 transition-transform" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                              <Upload size={16} className="text-white" />
                            </div>
                          </div>
                          <input
                            type="file"
                            ref={el => addonFileRefs.current[matchId] = el}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleAddOnFile(matchId, isTemp, e)}
                          />
                          {(addon.file || (addon.imageURL && addon.imageAction !== "remove")) && (
                            <button
                              onClick={() => removeAddOnImage(matchId, isTemp)}
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors"
                              title="Remove image"
                            >
                              <X size={12} />
                            </button>
                          )}
                          {addon.imageAction === "remove" && (
                            <div className="absolute -bottom-2 -right-2 bg-rose-500 text-white p-1 rounded-full text-[8px] font-black uppercase tracking-tighter">
                              Removed
                            </div>
                          )}
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Name</label>
                            <input
                              value={addon.name}
                              onChange={(e) => updateAddOn(matchId, isTemp, 'name', e.target.value)}
                              placeholder="e.g., Organic Oil"
                              className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-bold shadow-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Price (₹)</label>
                            <input
                              type="number"
                              value={addon.price}
                              onChange={(e) => updateAddOn(matchId, isTemp, 'price', e.target.value)}
                              placeholder="0"
                              className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-bold shadow-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Min</label>
                            <input
                              type="number"
                              value={addon.duration}
                              onChange={(e) => updateAddOn(matchId, isTemp, 'duration', e.target.value)}
                              placeholder="0"
                              className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-bold shadow-sm"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateAddOn(matchId, isTemp, 'isRecommended', !addon.isRecommended)}
                            className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 shadow-sm ${addon.isRecommended ? 'bg-amber-100 text-amber-600 border border-amber-200' : 'bg-white text-slate-300 border border-slate-100'}`}
                            title="Recommend this add-on"
                          >
                            <Star size={14} fill={addon.isRecommended ? "currentColor" : "none"} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Recommended</span>
                          </button>
                          <button
                            onClick={() => removeAddOn(addon._id, addon.tempId)}
                            className="p-3 bg-white text-rose-300 hover:text-rose-600 rounded-xl transition-colors shadow-sm border border-slate-100"
                            title="Delete add-on"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="lg:col-span-4 space-y-10">
          {/* Service Mode */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Service Mode *</h3>
            <div className="space-y-4">
              {[
                { id: 'salon', label: 'Salon Only', icon: Store, color: 'text-rose-500', bg: 'bg-rose-50' },
                { id: 'home', label: 'Home Service', icon: Home, color: 'text-blue-500', bg: 'bg-blue-50' },
                { id: 'both', label: 'Both Modes', icon: Layers, color: 'text-purple-500', bg: 'bg-purple-50' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleModeChange(mode.id)}
                  className={`w-full text-left p-5 rounded-3xl border-2 transition-all flex items-center justify-between ${formData.serviceMode === mode.id ? 'border-[#D81159] bg-[#D81159]/[0.02]' : 'border-slate-50 hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${mode.bg} ${mode.color} flex items-center justify-center`}>
                      <mode.icon size={20} />
                    </div>
                    <span className="font-black text-slate-800 text-sm">{mode.label}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${formData.serviceMode === mode.id ? 'border-[#D81159] bg-[#D81159]' : 'border-slate-100'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Availability Status</h3>
            <div className="flex bg-slate-50 p-1.5 rounded-2xl">
              <button
                onClick={() => setFormData(prev => ({ ...prev, status: 'active' }))}
                className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${formData.status === 'active' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
              >
                Active
              </button>
              <button
                onClick={() => setFormData(prev => ({ ...prev, status: 'inactive' }))}
                className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${formData.status === 'inactive' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'}`}
              >
                Inactive
              </button>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Service Image</h3>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative border-2 border-dashed border-slate-100 rounded-[30px] p-8 flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:border-rose-100 transition-all bg-slate-50/30 group/mainimg"
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              {previewUrl ? (
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover transition-transform group-hover/mainimg:scale-105 duration-500" />
                  <button onClick={(e) => { e.stopPropagation(); removeFile(); }} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-colors"><X size={16} /></button>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-[#D81159] mb-4">
                    <Upload size={32} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Update Atelier Image</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 space-y-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-5 bg-[#D81159] text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-rose-500/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Update Service"}
            </button>
            <button onClick={onCancel} className="w-full py-5 bg-slate-50 text-slate-400 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-100 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditServiceConfig;
