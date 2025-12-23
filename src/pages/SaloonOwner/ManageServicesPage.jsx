import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  fetchAllServiceItems,
  createServiceItem,
  editServiceItem,
  deleteServiceItem,
} from "../../redux/slice/saloonownerSlice";
import { Clock, DollarSign, Pencil, Trash2, Plus, X } from "lucide-react";

const initialFormState = {
  name: "",
  category: "",
  price: "",
  durationMins: "",
  discountPercent: "",
  description: "",
  image: "",
  providerType: "salon",
};

const ManageServicesPage = () => {
  const dispatch = useDispatch();
  const { serviceItems = [], categories = [], loading } = useSelector(
    (state) => state.saloonowner
  );

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

  /* ---------- CREATE ---------- */
  const openCreateModal = () => {
    setIsEditMode(false);
    setForm(initialFormState);
    setShowModal(true);
  };

  /* ---------- EDIT ---------- */
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
    });
    setShowModal(true);
  };

  /* ---------- DELETE ---------- */
  const openDeleteModal = (serviceId) => {
    setDeletingServiceId(serviceId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteServiceItem(deletingServiceId));
    setShowDeleteModal(false);
    setDeletingServiceId(null);
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      dispatch(
        editServiceItem({
          serviceId: editingServiceId,
          serviceData: form,
        })
      );
    } else {
      dispatch(createServiceItem(form));
    }

    setShowModal(false);
    setForm(initialFormState);
    setEditingServiceId(null);
    setIsEditMode(false);
  };

  console.log("Service Items:", serviceItems);  

  if (loading) {
    return <p className="p-8 text-gray-500">Loading services...</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Services Management
        </h1>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-[#9333ea] hover:bg-[#7e22ce] text-white px-5 py-2.5 rounded-lg font-medium shadow-sm"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      {/* Services List */}
      {serviceItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500">No services found. Start by adding one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceItems.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-gray-800">
                    {service.name}
                  </h3>
                  <div className="flex gap-3 text-gray-400">
                    <button
                      onClick={() => openEditModal(service)}
                      className="hover:text-blue-500"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(service._id)}
                      className="hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-6">
                  {service.description || "No description provided."}
                </p>
                <p className="text-gray-600 text-sm mb-4">
  Category:{" "}
  {service.category
    ? `${service.category.name} (${service.category.gender})`
    : "Uncategorized"}
</p>

              </div>

              <div className="flex justify-between items-center mt-auto pt-4">
                <div className="flex items-center gap-1 text-gray-700 font-bold text-lg">
                  <DollarSign size={18} />
                  {service.price}
                  {service.discountPercent > 0 && (
                    <span className="ml-2 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                      -{service.discountPercent}%
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={18} />
                  {service.durationMins} min
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl rounded-xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-6">
              {isEditMode ? "Edit Service" : "Add New Service"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Service Name"
                className="w-full border rounded-lg px-4 py-2.5"
                value={form.name}
                onChange={handleChange}
                required
              />

              <select
                name="category"
                className="w-full border rounded-lg px-4 py-2.5"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name} ({cat.gender})
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="border rounded-lg px-4 py-2.5"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="durationMins"
                  placeholder="Duration (mins)"
                  className="border rounded-lg px-4 py-2.5"
                  value={form.durationMins}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                type="number"
                name="discountPercent"
                placeholder="Discount %"
                className="w-full border rounded-lg px-4 py-2.5"
                value={form.discountPercent}
                onChange={handleChange}
              />

              <textarea
                name="description"
                placeholder="Description"
                className="w-full border rounded-lg px-4 py-2.5 h-24 resize-none"
                value={form.description}
                onChange={handleChange}
              />

              <input
                name="image"
                placeholder="Image URL"
                className="w-full border rounded-lg px-4 py-2.5"
                value={form.image}
                onChange={handleChange}
              />

              <select
                name="providerType"
                className="w-full border rounded-lg px-4 py-2.5"
                value={form.providerType}
                onChange={handleChange}
              >
                <option value="salon">Salon</option>
                <option value="freelancer">Freelancer</option>
              </select>

              <button
                type="submit"
                className="w-full bg-[#9333ea] hover:bg-[#7e22ce] text-white py-3 rounded-lg font-semibold"
              >
                {isEditMode ? "Update Service" : "Create Service"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center">
            <h3 className="text-xl font-bold mb-4">
              Delete Service?
            </h3>
            <p className="text-gray-500 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServicesPage;
