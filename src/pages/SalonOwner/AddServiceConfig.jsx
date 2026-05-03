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
  X
} from "lucide-react";
import {
  fetchAllCategories,
  createServiceItem
} from "../../redux/slice/salonownerSlice";
import { toast } from "react-hot-toast";

const AddServiceConfig = ({ onCancel, onSave }) => {
  const dispatch = useDispatch();
  const { categories = [], loading } = useSelector((state) => state.saloonowner);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    serviceCategory: "",
    price: "",
    durationMins: "",
    discountPercent: "",
    description: "",
    serviceMode: "salon"
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
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

  const validateForm = () => {
    if (!formData.serviceCategory) return "Please select a category";
    if (!formData.name) return "Service name is required";
    if (!formData.price) return "Price is required";
    if (!formData.durationMins) return "Duration is required";
    if (!formData.serviceMode) return "Please select a service mode";
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

      if (selectedFile) {
        submitData.append("file", selectedFile);
      }

      const result = await dispatch(createServiceItem(submitData)).unwrap();
      if (result) {
        toast.success("Service added successfully!");
        if (onSave) onSave();
      }
    } catch (error) {
      toast.error(error?.message || "Failed to add service");
    }
  };

  const selectedCategory = categories.find(c => c._id === formData.serviceCategory);

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Breadcrumbs & Navigation ── */}
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6">
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          Services
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-[#D81159]">Add New Service</span>
      </nav>

      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-4">
        <div className="space-y-0">
          <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">
            Service Configuration
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ── Main Content (Left) ── */}
        <div className="lg:col-span-8 space-y-10">

          {/* Card: Basic Information */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 overflow-visible relative group">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-[#D81159] flex items-center justify-center">
                <Info size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Basic Information</h2>
            </div>

            <div className="space-y-8">
              {/* Category Dropdown at the Top */}
              <div className="space-y-3 relative" ref={dropdownRef}>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Service Category *</label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 focus:ring-[#D81159]/10 transition-all flex items-center justify-between"
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
                  <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 max-h-60 overflow-y-auto py-2 animate-in fade-in slide-in-from-top-2 duration-200">
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
                  placeholder="e.g., Signature Scalp Treatment"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 focus:ring-[#D81159]/10 transition-all placeholder:text-slate-300"
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
                    placeholder="0.00"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 focus:ring-[#D81159]/10 transition-all placeholder:text-slate-300"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Duration (Min) *</label>
                  <input
                    type="number"
                    name="durationMins"
                    value={formData.durationMins}
                    onChange={handleInputChange}
                    placeholder="60"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 focus:ring-[#D81159]/10 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Discount (%)</label>
                  <input
                    type="number"
                    name="discountPercent"
                    value={formData.discountPercent}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 focus:ring-[#D81159]/10 transition-all placeholder:text-slate-300"
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
                  placeholder="Describe the sensory experience of this service..."
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 focus:ring-[#D81159]/10 transition-all placeholder:text-slate-300 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Sidebar (Right) ── */}
        <div className="lg:col-span-4 space-y-10">

          {/* Card: Service Mode */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Service Mode *</h3>
            <div className="space-y-4">
              {[
                { id: 'salon', label: 'Salon Only', subtext: 'Client visits the atelier', icon: Store, color: 'text-rose-500', bg: 'bg-rose-50' },
                { id: 'home', label: 'Home Service', subtext: 'Artist visits the client', icon: Home, color: 'text-blue-500', bg: 'bg-blue-50' },
                { id: 'both', label: 'Both Modes', subtext: 'Flexible location options', icon: Layers, color: 'text-purple-500', bg: 'bg-purple-50' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleModeChange(mode.id)}
                  className={`w-full text-left p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${formData.serviceMode === mode.id
                    ? 'border-[#D81159] bg-[#D81159]/[0.02]'
                    : 'border-slate-50 hover:border-slate-200'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${mode.bg} ${mode.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <mode.icon size={22} />
                    </div>
                    <div>
                      <div className="font-black text-slate-800 text-sm leading-none mb-1.5">{mode.label}</div>
                      <div className="text-[10px] font-bold text-slate-400">{mode.subtext}</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.serviceMode === mode.id ? 'border-[#D81159] bg-[#D81159]' : 'border-slate-100'
                    }`}>
                    {formData.serviceMode === mode.id && <div className="w-2 h-2 rounded-full bg-white ring-2 ring-white/20" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Card: Visual Identity (File Upload) */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Upload Service Image</h3>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-[30px] p-10 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer transition-all duration-500 ${selectedFile ? 'border-rose-200 bg-rose-50/20' : 'border-slate-100 hover:border-rose-100'}`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-white">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(); }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-[#D81159] group-hover:scale-110 transition-transform">
                    <Upload size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">JPG, PNG up to 5MB</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 space-y-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-5 bg-[#D81159] hover:bg-[#B00E48] disabled:bg-slate-300 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-rose-500/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Add Service"
              )}
            </button>
            <button
              onClick={onCancel}
              className="w-full py-5 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};


export default AddServiceConfig;
