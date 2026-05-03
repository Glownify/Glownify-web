import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    ChevronLeft,
    X,
    ChevronDown,
    Plus,
    Check,
    Loader2,
    Image as ImageIcon,
    Upload
} from 'lucide-react';
import { fetchAllCategories, createServiceItem } from '../../../redux/slice/salonownerSlice';
import { toast } from 'react-hot-toast';

const MobileAddServiceScreen = ({ onCancel, onSave }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categories = [], loading } = useSelector((state) => state.saloonowner);
    const fileInputRef = useRef(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        durationMins: '30',
        price: '',
        discountPercent: '',
        serviceCategory: '',
        serviceMode: 'salon'
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategorySelect = (categoryId) => {
        setFormData(prev => ({ ...prev, serviceCategory: categoryId }));
        setIsCategoryModalOpen(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
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
        return null;
    };

    const handleActionCancel = () => {
        if (onCancel) onCancel();
        else navigate(-1);
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
                if (onSave) onSave(result);
                else navigate(-1);
            }
        } catch (error) {
            toast.error(error?.message || "Failed to add service");
        }
    };

    // Ensure categories is an array before calling find
    const safeCategories = Array.isArray(categories) ? categories : [];
    const selectedCategory = safeCategories.find(c => c._id === formData.serviceCategory);

    return (
        <div className="flex flex-col min-h-screen bg-[#FFF5F6] font-sans">
            {/* ── Header ── */}
            <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-30 shadow-sm border-b border-rose-50">
                <button
                    onClick={handleActionCancel}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <h1 className="text-lg font-bold text-[#1e293b]">Add New Service</h1>
                <div className="w-8" />
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 pb-32">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black text-[#1e293b] tracking-tight">Service Details</h2>
                    <p className="text-sm font-medium text-gray-500">Provide the details for your new service.</p>
                </div>

                <div className="space-y-6">
                    {/* Category Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Service Category *</label>
                        <button
                            type="button"
                            onClick={() => setIsCategoryModalOpen(true)}
                            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-5 flex items-center justify-between shadow-sm hover:border-rose-200 transition-all active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-4">
                                {selectedCategory ? (
                                    <>
                                        <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center p-2">
                                            <img src={selectedCategory.icon} alt="" className="w-full h-full object-contain" />
                                        </div>
                                        <span className="text-base font-bold text-gray-800">{selectedCategory.name}</span>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <span className="text-base font-medium">Select a Category</span>
                                    </div>
                                )}
                            </div>
                            <ChevronDown size={20} className="text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Service Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-100 shadow-sm transition-all"
                            placeholder="e.g. Signature Haircut"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Service Image</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative border-2 border-dashed rounded-[30px] p-6 flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 ${selectedFile ? 'border-rose-200 bg-rose-50/20' : 'border-gray-100 bg-white shadow-sm'}`}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {previewUrl ? (
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-[#D81159]">
                                        <Upload size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-gray-800 text-sm">Upload Image</h4>
                                        <p className="text-xs text-gray-400">Tap to select photo (Max 5MB)</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="h-px bg-rose-50 w-full" />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Price (₹) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-100 shadow-sm"
                                placeholder="499"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Duration (Min) *</label>
                            <input
                                type="number"
                                name="durationMins"
                                value={formData.durationMins}
                                onChange={handleInputChange}
                                className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-100 shadow-sm"
                                placeholder="30"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Discount (%)</label>
                        <input
                            type="number"
                            name="discountPercent"
                            value={formData.discountPercent}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-100 shadow-sm"
                            placeholder="0"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
                        <textarea
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-100 shadow-sm resize-none"
                            placeholder="Describe your service..."
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-700 ml-1">Service Mode *</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['salon', 'home', 'both'].map((mode) => (
                                <button
                                    key={mode}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, serviceMode: mode }))}
                                    className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all border ${formData.serviceMode === mode
                                            ? 'bg-[#1e293b] text-white border-[#1e293b] shadow-lg shadow-gray-200'
                                            : 'bg-white text-gray-400 border-gray-100'
                                        }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Category selection Modal */}
            {isCategoryModalOpen && (
                <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
                    <div className="px-4 pt-12 pb-4 flex items-center justify-between border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800">Select Category</h2>
                        <button
                            onClick={() => setIsCategoryModalOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto py-4">
                        <div className="grid grid-cols-1 divide-y divide-gray-50">
                            {safeCategories.map((cat) => (
                                <button
                                    key={cat._id}
                                    onClick={() => handleCategorySelect(cat._id)}
                                    className={`px-6 py-5 flex items-center gap-5 transition-all active:bg-rose-50 ${formData.serviceCategory === cat._id ? 'bg-rose-50/50' : ''}`}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center p-3 shadow-sm border border-rose-100/50">
                                        <img src={cat.icon} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className={`text-base font-bold ${formData.serviceCategory === cat._id ? 'text-[#D81159]' : 'text-gray-800'}`}>{cat.name}</div>
                                        <div className="text-xs font-semibold text-gray-400 capitalize">{cat.gender || 'unisex'}</div>
                                    </div>
                                    {formData.serviceCategory === cat._id && (
                                        <div className="w-6 h-6 rounded-full bg-[#D81159] flex items-center justify-center text-white">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="p-4 bg-white/80 backdrop-blur-md border-t border-rose-50 flex gap-4 sticky bottom-0 z-30">
                <button
                    onClick={handleActionCancel}
                    className="flex-1 py-5 bg-gray-50 rounded-2xl text-base font-bold text-gray-400 hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-[2] py-5 bg-[#D81159] text-white rounded-2xl text-base font-black uppercase tracking-widest hover:bg-[#B00E48] transition-all shadow-xl shadow-rose-500/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Add Service"}
                </button>
            </div>
        </div>
    );
};

export default MobileAddServiceScreen;
