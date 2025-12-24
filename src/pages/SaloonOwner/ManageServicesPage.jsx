import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  fetchAllServiceItems,
  createServiceItem,
  editServiceItem,
  deleteServiceItem,
} from "../../redux/slice/saloonownerSlice";
import { Clock, DollarSign, Pencil, Trash2, Plus, X, Tag, ChevronRight } from "lucide-react";

const initialFormState = {
  name: "",
  category: "",
  price: "",
  durationMins: "",
  discountPercent: "",
  description: "",
  image: "",
  providerType: "salon",
  addOns: [],
};

const ManageServicesPage = () => {
  const dispatch = useDispatch();
  const { serviceItems = [], categories = [], loading } = useSelector((state) => state.saloonowner);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingServiceId, setDeletingServiceId] = useState(null);
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    dispatch(fetchAllServiceItems());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    setForm(initialFormState);
    setShowModal(true);
  };

  const openEditModal = (service) => {
    setIsEditMode(true);
    setEditingServiceId(service._id);
    setForm({
      name: service.name,
      category: service.category?._id || service.category,
      price: service.price,
      durationMins: service.durationMins,
      discountPercent: service.discountPercent || "",
      description: service.description || "",
      image: service.image || "",
      providerType: service.providerType || "salon",
      addOns: service.addOns || [],
    });
    setShowModal(true);
  };

  const openDeleteModal = (serviceId) => {
    setDeletingServiceId(serviceId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteServiceItem(deletingServiceId));
    setShowDeleteModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(editServiceItem({ serviceId: editingServiceId, serviceData: form }));
    } else {
      dispatch(createServiceItem(form));
    }
    setShowModal(false);
    setForm(initialFormState);
  };

  const handleAddAddon = () => {
    setForm({ ...form, addOns: [...form.addOns, { name: "", price: "", duration: "" }] });
  };

  const handleRemoveAddon = (index) => {
    const updated = [...form.addOns];
    updated.splice(index, 1);
    setForm({ ...form, addOns: updated });
  };

  const handleAddonChange = (index, field, value) => {
    const updated = [...form.addOns];
    updated[index][field] = value;
    setForm({ ...form, addOns: updated });
  };

  console.log("Service Items:", serviceItems);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-[#F8FAFC] min-h-screen font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Services</h1>
          <p className="text-slate-500 mt-1 text-lg">Manage your salon menu and service add-ons</p>
        </div>
        <button
          onClick={openCreateModal}
          className="group flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-purple-200 hover:-translate-y-0.5"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Add New Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        {serviceItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="text-slate-300" size={40} />
            </div>
            <p className="text-slate-500 text-lg">Your service menu is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {serviceItems.map((service) => (
              <div
                key={service._id}
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 flex flex-col relative overflow-hidden"
              >
                {/* Header: Name & Actions */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wider mb-2">
                      {service.category?.name ? `${service.category?.name} ${service.category?.gender}` : "General"}
                    </span>
                    <h3 className="font-bold text-2xl text-slate-800 group-hover:text-purple-700 transition-colors capitalize">
                      {service.name}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="p-2.5 bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(service._id)}
                      className="p-2.5 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {service.description || "Offering high-quality professional care and attention."}
                </p>

                {/* Add-ons UI */}
                {service.addOns?.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Tag size={12} /> Available Add-ons
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.addOns.map((addon, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-2 group/addon"
                        >
                          <span className="text-sm font-medium text-slate-700">{addon.name}</span>
                          <span className="text-xs text-purple-600 font-bold bg-white px-1.5 py-0.5 rounded shadow-sm">
                            +${addon.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer: Price & Duration */}
                <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">${service.price}</span>
                    {service.discountPercent > 0 && (
                      <span className="text-sm font-bold text-green-500 ml-2 bg-green-50 px-2 py-0.5 rounded-md">
                        {service.discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-slate-400 font-medium text-sm">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                      <Clock size={16} className="text-purple-400" />
                      {service.durationMins} min
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
{showModal && (
  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      
      {/* Modal Header */}
      <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {isEditMode ? "Edit Service" : "Add New Service"}
          </h2>
          <p className="text-sm text-slate-500">Fill in the details below to update your service menu.</p>
        </div>
        <button 
          onClick={() => setShowModal(false)} 
          className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Modal Body (Scrollable Area) */}
      <div className="p-8 overflow-y-auto custom-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-purple-600 uppercase tracking-widest">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Service Name</label>
                <input 
                  name="name" 
                  placeholder="e.g., Luxury Haircut"
                  className="w-full border-slate-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Category</label>
                <select 
                  name="category" 
                  className="w-full border-slate-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white" 
                  value={form.category} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name} ({cat.gender})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 ml-1">Description</label>
              <textarea 
                name="description" 
                placeholder="Describe the service experience..."
                className="w-full border-slate-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all h-24 resize-none" 
                value={form.description} 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Section 2: Pricing & Logistics */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-purple-600 uppercase tracking-widest">Pricing & Timing</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1 col-span-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Price ($)</label>
                <input type="number" name="price" className="w-full border-slate-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none" value={form.price} onChange={handleChange} required />
              </div>
              <div className="space-y-1 col-span-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Discount (%)</label>
                <input type="number" name="discountPercent" className="w-full border-slate-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none" value={form.discountPercent} onChange={handleChange} />
              </div>
              <div className="space-y-1 col-span-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Duration (Mins)</label>
                <input type="number" name="durationMins" className="w-full border-slate-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none" value={form.durationMins} onChange={handleChange} required />
              </div>
            </div>
          </div>

          {/* Section 3: Advanced Details */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-purple-600 uppercase tracking-widest">Provider & Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Provider Type</label>
                <select name="providerType" className="w-full border-slate-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none bg-white" value={form.providerType} onChange={handleChange}>
                  <option value="salon">Salon</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Image URL</label>
                <input name="image" placeholder="https://..." className="w-full border-slate-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none" value={form.image} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Section 4: Add-ons */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Plus size={18} className="text-purple-600" /> Service Add-ons
              </h3>
              <button 
                type="button" 
                onClick={handleAddAddon} 
                className="text-xs font-bold text-purple-600 hover:text-purple-700 underline decoration-2 underline-offset-4"
              >
                + Add Another
              </button>
            </div>

            {form.addOns.length === 0 ? (
              <div className="text-center py-4 border-2 border-dashed border-slate-200 rounded-xl bg-white/50">
                <p className="text-xs text-slate-400 font-medium">No add-ons currently linked to this service.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {form.addOns.map((addon, index) => (
                  <div key={index} className="grid grid-cols-12 gap-3 items-center bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <div className="col-span-5">
                      <input 
                        placeholder="Add-on name" 
                        className="w-full text-sm border-none focus:ring-0 bg-transparent" 
                        value={addon.name} 
                        onChange={(e) => handleAddonChange(index, "name", e.target.value)} 
                      />
                    </div>
                    <div className="col-span-3 flex items-center border-l pl-2">
                      <span className="text-slate-400 text-xs mr-1">$</span>
                      <input 
                        type="number" 
                        placeholder="Price" 
                        className="w-full text-sm border-none focus:ring-0 bg-transparent" 
                        value={addon.price} 
                        onChange={(e) => handleAddonChange(index, "price", e.target.value)} 
                      />
                    </div>
                    <div className="col-span-3 flex items-center border-l pl-2">
                      <Clock size={14} className="text-slate-300 mr-2" />
                      <input 
                        type="number" 
                        placeholder="Mins" 
                        className="w-full text-sm border-none focus:ring-0 bg-transparent" 
                        value={addon.duration} 
                        onChange={(e) => handleAddonChange(index, "duration", e.target.value)} 
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveAddon(index)} 
                      className="col-span-1 text-slate-300 hover:text-red-500 transition-colors flex justify-center"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 sticky bottom-0 bg-white">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-purple-200"
            >
              {isEditMode ? "Update Service Details" : "Publish Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ManageServicesPage;