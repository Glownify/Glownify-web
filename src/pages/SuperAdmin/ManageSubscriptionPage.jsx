import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSubscriptions,
  createSubscription,
} from "../../redux/slice/superadminSlice";
import toast from "react-hot-toast";
import {
  Plus,
  CheckCircle2,
  AlertCircle,
  Layers,
  X,
  Trash2,
} from "lucide-react";

const ManageSubscriptionPage = () => {
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector((state) => state.superadmin);

  const [open, setOpen] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [durationInDays, setDurationInDays] = useState("");
  const [features, setFeatures] = useState([""]);

  useEffect(() => {
    dispatch(fetchAllSubscriptions());
  }, [dispatch]);

  /* ---------------- FEATURES HANDLING ---------------- */
  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index) =>
    setFeatures(features.filter((_, i) => i !== index));
  const updateFeature = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  /* ---------------- CREATE SUBSCRIPTION ---------------- */
  const handleCreate = async () => {
    if (!name || !price || !durationInDays) {
      return toast.error("Please fill in all required fields");
    }

    try {
      const createPromise = dispatch(
        createSubscription({
          name,
          price: Number(price),
          durationInDays: Number(durationInDays),
          features: features.filter((f) => f.trim() !== ""),
        })
      ).unwrap();

      await toast.promise(createPromise, {
        loading: "Creating subscription...",
        success: (res) => res?.message || "Subscription created successfully!",
        error: (err) => err?.message || "Failed to create subscription",
      });

      // Reset form and close modal
      setName("");
      setPrice("");
      setDurationInDays("");
      setFeatures([""]);
      setOpen(false);

      // Refresh subscription list
      dispatch(fetchAllSubscriptions());
    } catch (err) {
      console.error("Subscription creation failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
      <div className="w-full mx-auto px-4 md:px-8 lg:px-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Subscription Plans
            </h1>
            <p className="text-slate-500">
              Manage subscription tiers for salon owners
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold shadow"
          >
            <Plus size={20} />
            Create Plan
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-indigo-600 rounded-full"></div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex gap-3">
            <AlertCircle />
            <span>{error}</span>
          </div>
        )}

        {/* PLANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans && plans.length > 0 ? (
            plans.map((plan) => (
              <div
                key={plan._id}
                className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
              >
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${plan.isActive
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-slate-200 text-slate-500"
                      }`}
                  >
                    {plan.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-4xl font-extrabold">₹{plan.price}</span>
                  <span className="text-slate-500">
                    / {plan.durationInDays} days
                  </span>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-slate-600"
                    >
                      <CheckCircle2 className="text-indigo-500" size={18} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : !loading && (
            <div className="col-span-full bg-white border-2 border-dashed rounded-3xl py-20 flex flex-col items-center">
              <Layers size={48} className="text-slate-300 mb-3" />
              <p className="text-slate-500">No subscription plans found</p>
            </div>
          )}
        </div>
      </div>

      {/* CREATE MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-xl p-8 relative shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Create Subscription Plan
            </h2>

            <input
              className="w-full mb-4 px-4 py-3 border rounded-xl"
              placeholder="Plan Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="number"
                className="px-4 py-3 border rounded-xl"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                className="px-4 py-3 border rounded-xl"
                placeholder="Duration (days)"
                value={durationInDays}
                onChange={(e) => setDurationInDays(e.target.value)}
              />
            </div>

            {/* FEATURES */}
            <div className="space-y-3 mb-6">
              <p className="font-semibold">Features</p>

              {features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    className="flex-1 px-4 py-2 border rounded-xl"
                    placeholder={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                  />
                  {features.length > 1 && (
                    <button
                      onClick={() => removeFeature(index)}
                      className="text-red-500"
                    >
                      <Trash2 />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addFeature}
                className="flex items-center gap-2 text-indigo-600 font-medium"
              >
                <Plus size={16} /> Add Feature
              </button>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 rounded-xl border"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-6 py-2 rounded-xl bg-slate-900 text-white font-semibold"
              >
                Create Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubscriptionPage;
