import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  CheckCircle,
  Clock,
  MapPin,
  Pencil,
  Plus,
  Scissors,
  Trash2,
} from "lucide-react";
import { useIndependentProWorkspace } from "./useIndependentProWorkspace";

const initialForm = {
  name: "",
  category: "Makeup",
  price: "",
  duration: "",
  atHome: true,
  active: true,
};

const ManageIndependentServicesPage = () => {
  const {
    services,
    serviceAreas,
    upsertService,
    deleteService,
    toggleService,
    addServiceArea,
    removeServiceArea,
  } = useIndependentProWorkspace();
  const [newArea, setNewArea] = useState("");
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const activeServices = useMemo(
    () => services.filter((service) => service.active).length,
    [services]
  );

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const price = Number(form.price);

    if (!form.name.trim() || !form.duration.trim() || !form.category.trim()) {
      toast.error("Please fill service name, category, and duration");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Enter a valid price");
      return;
    }

    const duplicate = services.some(
      (service) =>
        service.id !== editingId &&
        service.name.trim().toLowerCase() === form.name.trim().toLowerCase()
    );

    if (duplicate) {
      toast.error("This service already exists");
      return;
    }

    upsertService({
      ...form,
      name: form.name.trim(),
      duration: form.duration.trim(),
      price,
      id: editingId || Date.now(),
    });

    toast.success(editingId ? "Service updated" : "Service added");
    resetForm();
  };

  const editService = (service) => {
    setEditingId(service.id);
    setForm({ ...service, price: String(service.price) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteService = (service) => {
    const confirmed = window.confirm(`Delete ${service.name}?`);
    if (!confirmed) return;
    deleteService(service.id);
    toast.success("Service deleted");
  };

  const handleToggleService = (service) => {
    toggleService(service.id);
    toast.success(service.active ? "Service paused" : "Service activated");
  };

  const addArea = () => {
    const area = newArea.trim();
    const exists = serviceAreas.some((item) => item.toLowerCase() === area.toLowerCase());

    if (!area) {
      toast.error("Enter an area name");
      return;
    }

    if (exists) {
      toast.error("Area already added");
      return;
    }

    addServiceArea(area);
    setNewArea("");
    toast.success("Service area added");
  };

  const handleRemoveArea = (area) => {
    if (serviceAreas.length === 1) {
      toast.error("At least one service area is required");
      return;
    }

    removeServiceArea(area);
    toast.success("Service area removed");
  };

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-500">
      <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 rounded-[36px] bg-white border border-purple-100/50 p-8 shadow-sm">
        <div>
          <p className="text-[11px] font-black text-[#8B5CF6] uppercase tracking-[0.2em]">
            Individual Services
          </p>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-2">
            Services, Pricing & Areas
          </h1>
          <p className="text-sm font-bold text-slate-400 mt-3 max-w-2xl">
            Add services offered at customer homes, update pricing, and maintain the areas where you accept bookings.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 min-w-[280px]">
          <div className="rounded-3xl bg-purple-50 p-5">
            <Scissors className="text-[#8B5CF6]" size={22} />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3">Services</p>
            <p className="text-3xl font-black text-slate-900">{services.length}</p>
          </div>
          <div className="rounded-3xl bg-emerald-50 p-5">
            <CheckCircle className="text-emerald-600" size={22} />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3">Active</p>
            <p className="text-3xl font-black text-slate-900">{activeServices}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <form
          onSubmit={handleSubmit}
          className="xl:col-span-4 rounded-[36px] bg-white border border-purple-100/50 p-8 shadow-sm space-y-5"
        >
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {editingId ? "Update Service" : "Add Service"}
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Services offered and pricing
            </p>
          </div>

          <label className="block">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Service Name</span>
            <input
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className="mt-2 w-full h-12 rounded-2xl border border-slate-100 bg-slate-50 px-4 text-sm font-bold outline-none focus:ring-4 focus:ring-purple-100"
              placeholder="Example: Bridal makeup"
            />
          </label>

          <label className="block">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Service Category</span>
            <select
              value={form.category}
              onChange={(event) => handleChange("category", event.target.value)}
              className="mt-2 w-full h-12 rounded-2xl border border-slate-100 bg-slate-50 px-4 text-sm font-bold outline-none focus:ring-4 focus:ring-purple-100"
            >
              <option>Makeup</option>
              <option>Hair Care</option>
              <option>Skin Care</option>
              <option>Nail Care</option>
              <option>Massage</option>
            </select>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Pricing</span>
              <input
                value={form.price}
                onChange={(event) => handleChange("price", event.target.value)}
                type="number"
                min="1"
                className="mt-2 w-full h-12 rounded-2xl border border-slate-100 bg-slate-50 px-4 text-sm font-bold outline-none focus:ring-4 focus:ring-purple-100"
                placeholder="2500"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
              <input
                value={form.duration}
                onChange={(event) => handleChange("duration", event.target.value)}
                className="mt-2 w-full h-12 rounded-2xl border border-slate-100 bg-slate-50 px-4 text-sm font-bold outline-none focus:ring-4 focus:ring-purple-100"
                placeholder="90 mins"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChange("atHome", !form.atHome)}
              className={`h-12 rounded-2xl font-black text-xs uppercase tracking-widest ${
                form.atHome ? "bg-teal-500 text-white" : "bg-slate-100 text-slate-400"
              }`}
            >
              At Home
            </button>
            <button
              type="button"
              onClick={() => handleChange("active", !form.active)}
              className={`h-12 rounded-2xl font-black text-xs uppercase tracking-widest ${
                form.active ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
              }`}
            >
              Active
            </button>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 h-12 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Plus size={16} /> {editingId ? "Save" : "Add"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="h-12 px-5 rounded-2xl bg-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="xl:col-span-8 rounded-[36px] bg-white border border-purple-100/50 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Current Services</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                Update prices or remove unavailable services
              </p>
            </div>
          </div>

          {services.length === 0 && (
            <div className="rounded-[30px] bg-slate-50 border border-dashed border-slate-200 p-10 text-center">
              <Scissors className="mx-auto text-slate-300" size={34} />
              <h3 className="text-lg font-black text-slate-900 mt-4">No services yet</h3>
              <p className="text-sm font-bold text-slate-400 mt-1">
                Add your first home-service item using the form.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {services.map((service) => (
              <div key={service.id} className="rounded-[30px] bg-slate-50/70 border border-slate-100 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{service.name}</h3>
                    <p className="text-xs font-bold text-[#8B5CF6] uppercase tracking-widest mt-2">
                      {service.category}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      service.active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {service.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-5 mt-6 text-sm font-bold text-slate-500">
                  <span className="text-2xl font-black text-slate-900">
                    Rs. {service.price.toLocaleString("en-IN")}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-pink-500" /> {service.duration}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest ${
                      service.atHome ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {service.atHome ? "Home Service" : "Studio Only"}
                  </span>
                </div>

                <div className="flex gap-3 mt-7">
                  <button
                    onClick={() => editService(service)}
                    className="flex-1 h-11 rounded-xl bg-white border border-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <Pencil size={15} /> Edit
                  </button>
                  <button
                    onClick={() => handleToggleService(service)}
                    className="flex-1 h-11 rounded-xl bg-purple-50 text-[#8B5CF6] font-black text-xs uppercase tracking-widest"
                  >
                    {service.active ? "Pause" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDeleteService(service)}
                    className="h-11 px-4 rounded-xl bg-rose-50 text-rose-600"
                    aria-label={`Delete ${service.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[36px] bg-white border border-purple-100/50 p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Service Area</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Areas where home service bookings are accepted
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={newArea}
              onChange={(event) => setNewArea(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") addArea();
              }}
              className="h-12 w-full sm:w-72 rounded-2xl border border-slate-100 bg-slate-50 px-4 text-sm font-bold outline-none focus:ring-4 focus:ring-purple-100"
              placeholder="Add new area"
            />
            <button
              onClick={addArea}
              className="h-12 px-6 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-7">
          {serviceAreas.map((area) => (
            <button
              key={area}
              onClick={() => handleRemoveArea(area)}
              className="px-5 h-12 rounded-2xl bg-purple-50 text-[#8B5CF6] font-black text-xs uppercase tracking-widest flex items-center gap-2"
              title="Click to remove this area"
            >
              <MapPin size={15} /> {area}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ManageIndependentServicesPage;
