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
  TrendingUp,
  Wallet,
  Zap,
  Activity,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  PlusCircle,
  Settings
} from "lucide-react";
import useMobile from "../../hooks/useMobile";

const DUMMY_PLANS = [
  { _id: 'p1', name: 'Essential Starter', price: 999, durationInDays: 30, features: ['Core Analytics', 'Standard Support', 'Up to 5 Shop Listings'], commission: '15' },
  { _id: 'p2', name: 'Professional Growth', price: 2999, durationInDays: 30, features: ['Advanced Insights', 'Priority Support', 'Unlimited Shop Listings', 'SEO Optimization'], commission: '10' },
  { _id: 'p3', name: 'Elite Enterprise', price: 7999, durationInDays: 90, features: ['Custom Reporting', 'Dedicated Manager', 'API Access', 'Global Visibility'], commission: '8' },
];

const ManageSubscriptionPage = () => {
  const dispatch = useDispatch();
  const { plans: livePlans = [], loading, error } = useSelector((state) => state.superadmin || {});
  const isMobile = useMobile();

  const plans = livePlans.length > 0 ? livePlans : DUMMY_PLANS;

  const [open, setOpen] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [durationInDays, setDurationInDays] = useState("");
  const [commission, setCommission] = useState("");
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
    if (!name || !price || !durationInDays || !commission) {
      return toast.error("Please fill in all required fields");
    }

    try {
      const payload = {
        name,
        price: Number(price),
        durationInDays: Number(durationInDays),
        commission: Number(commission),
        features: features.filter((f) => f.trim() !== ""),
      };
      console.log("Creating subscription with payload:", payload);

      const createPromise = dispatch(createSubscription(payload)).unwrap();

      await toast.promise(createPromise, {
        loading: "Creating subscription...",
        success: (res) => res?.message || "Subscription created successfully!",
        error: (err) =>
          err?.message ||
          err?.data?.message ||
          err?.data?.error ||
          err?.data?.errors?.map((e) => e.message || e).join(" ") ||
          err?.errorCode ||
          JSON.stringify(err) ||
          "Failed to create subscription",
      });

      // Reset form and close modal
      setName("");
      setPrice("");
      setDurationInDays("");
      setCommission("");
      setFeatures([""]);
      setOpen(false);

      // Refresh subscription list
      dispatch(fetchAllSubscriptions());
    } catch (err) {
      console.error("Subscription creation failed:", err);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-[20vh]">
      <div className="animate-spin h-8 w-8 border-4 border-rose-600 border-t-transparent rounded-full"></div>
    </div>
  );

  // ── DESKTOP VIEW: REVENUE & PLAN MANAGER ─────────────────────────────────────
  if (!isMobile) {
    return (
      <div className="space-y-12 animate-in fade-in duration-500 pb-20">
        {/* Header Section */}
        <div className="flex flex-col gap-1">
           <span className="text-[10px] uppercase font-black tracking-widest text-rose-600">Revenue Engine</span>
           <h1 className="text-4xl font-black text-slate-800 tracking-tight">Subscription & Plans</h1>
           <p className="text-slate-500 max-w-2xl font-medium mt-2">
              Design and manage the economic tiers of the platform. Configure commission structures, featured listing duration, and tier-specific benefits.
           </p>
        </div>

        {/* Global Financial Stats */}
        <div className="grid grid-cols-12 gap-8 items-stretch">
           <div className="col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Monthly Recurring Revenue (MRR)</h3>
                    <div className="flex items-baseline gap-4">
                       <span className="text-5xl font-black text-slate-800">$142,850</span>
                       <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[11px] font-black border border-emerald-100">
                          <TrendingUp size={12} /> +12.4%
                       </span>
                    </div>
                 </div>
                 <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
                    <Activity size={32} />
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-10 pt-10 border-t border-slate-50">
                 <RevenueMetric label="Active Subs" value="1,240" />
                 <RevenueMetric label="Avg. Split" value="14.2%" />
                 <RevenueMetric label="Churn Rate" value="2.1%" />
              </div>
           </div>

           <div className="col-span-4 bg-rose-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-rose-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 transition-transform group-hover:scale-110"></div>
              <div className="relative h-full flex flex-col justify-between">
                 <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-rose-100 opacity-80">Platform Wallet</span>
                    <h3 className="text-3xl font-black mt-2 tracking-tight">$842,000.00</h3>
                    <p className="text-[11px] font-medium text-rose-100/60 mt-1">Pending Payouts: $24.1k</p>
                 </div>
                 <button className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">
                    Manage Ledger
                 </button>
              </div>
           </div>
        </div>

        {/* Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {(plans && plans.length > 0) ? (
             plans.map((plan, index) => (
                <PlanTierCard 
                   key={plan._id}
                   name={plan.name} 
                   desc={`${plan.durationInDays} days access`} 
                   price={plan.price} 
                   commission={plan.commission || "10"} 
                   features={plan.features}
                   icon={<Layers size={20} />}
                   isPopular={index === 1}
                   isRed={index === 1}
                />
             ))
           ) : (
             <div className="col-span-3 h-[300px] border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-300">
                <Plus size={48} className="mb-2 opacity-20" />
                <p className="font-black uppercase tracking-widest text-xs opacity-40">No active tiers found</p>
             </div>
           )}
        </div>


        {/* Bottom Configuration Area */}
        <div className="grid grid-cols-2 gap-8">
           {/* Commission Config */}
           <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 tracking-tight mb-8">Global Commission Settings</h3>
              <div className="space-y-6">
                 <ConfigRow label="Base Service Fee" value="2.5 %" desc="Applied to all unclassified transactions" />
                 <ConfigRow label="Featured Duration Multiplier" value="x 1.5" desc="Cost weight for top-of-feed placement" />
              </div>
           </div>

           {/* Custom Plan Creator */}
           <div className="bg-slate-50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-rose-600 mb-6">
                 <PlusCircle size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight mb-2">Create New Custom Plan</h3>
              <p className="text-[12px] font-medium text-slate-500 mb-8 max-w-[280px]">
                 Deploy a limited-time promotional tier or a geo-specific pricing model.
              </p>
              <button 
                type="button"
                onClick={() => setOpen(true)}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
              >
                 Launch Plan Creator
              </button>
           </div>
        </div>

        {/* CREATE MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-3xl w-full max-w-xl p-8 relative shadow-xl overflow-y-auto max-h-[90vh]">
              <button
                type="button"
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                <input
                  type="number"
                  className="px-4 py-3 border rounded-xl"
                  placeholder="Commission %"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
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
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-500"
                      >
                        <Trash2 />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center gap-2 text-indigo-600 font-medium"
                >
                  <Plus size={16} /> Add Feature
                </button>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2 rounded-xl border"
                >
                  Cancel
                </button>
                <button
                  type="button"
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
  }

  // ── MOBILE VIEW ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10 font-sans">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[10px] uppercase font-black tracking-widest text-rose-600">Revenue Engine</span>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight mt-1">Subscriptions</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Manage economic tiers</p>
      </div>

      {/* Revenue Stats Row */}
      <div className="flex bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm mb-8 justify-between">
         <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">MRR Snapshot</span>
            <div className="flex items-center gap-2">
               <span className="text-2xl font-black text-slate-800">$142k</span>
               <span className="text-[10px] font-black text-emerald-500">+12%</span>
            </div>
         </div>
         <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <TrendingUp size={22} />
         </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-slate-900 text-white w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 mb-8 active:scale-95"
      >
        <Plus size={18} />
        Initialize New Tier
      </button>

      {/* Plans List */}
      <div className="space-y-6 mb-20">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Active Tiers</h2>
        {(plans && plans.length > 0) ? (
          plans.map((plan, index) => (
             <div key={plan._id} className={`bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden ${index === 1 ? 'ring-2 ring-rose-500' : ''}`}>
                <div className="flex justify-between items-start mb-6">
                   <div className="flex flex-col">
                      <h3 className="font-black text-slate-800 text-lg leading-tight">{plan.name}</h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{plan.durationInDays} Days Cycle</span>
                   </div>
                   <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${index === 1 ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {index === 1 ? 'Popular' : 'Active'}
                   </div>
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                   <span className="text-3xl font-black text-slate-800 tracking-tight">₹ {plan.price}</span>
                   <span className="text-[10px] font-bold text-slate-400">/ billing</span>
                </div>

                <div className="space-y-3 mb-8">
                   {plan.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <CheckCircle2 size={14} className="text-emerald-500" />
                         <span className="text-[11px] font-bold text-slate-500">{f}</span>
                      </div>
                   ))}
                </div>

                <button className="w-full py-3.5 bg-slate-50 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest active:bg-slate-100 group">
                   Adjust Tier Parameters
                </button>
             </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 rounded-[2rem]">
             <Layers size={48} className="opacity-20 mb-2" />
             <p className="font-black text-[10px] uppercase tracking-widest opacity-40">No tiers deployed</p>
          </div>
        )}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
              <input
                type="number"
                className="px-4 py-3 border rounded-xl"
                placeholder="Commission %"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
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

// ── DESKTOP SUB-COMPONENTS ───────────────────────────────────────────────────

const RevenueMetric = ({ label, value }) => (
  <div className="flex flex-col gap-1">
     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
     <span className="text-2xl font-black text-slate-800 tracking-tight">{value}</span>
  </div>
);

const PlanTierCard = ({ name, desc, price, commission, features, icon, isPopular, isInviteOnly, isRed }) => (
  <div className={`relative bg-white rounded-[2.5rem] p-10 border transition-all flex flex-col justify-between h-[520px] ${
    isPopular ? "ring-2 ring-rose-500 shadow-xl shadow-rose-100 scale-105 z-10" : "border-slate-100 shadow-sm"
  }`}>
     {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2">
           <span className="bg-rose-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg">Most Popular</span>
        </div>
     )}

     <div>
        <div className="flex items-center justify-between mb-6">
           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isRed ? "bg-rose-100 text-rose-600" : "bg-slate-50 text-slate-400"}`}>
              {icon}
           </div>
           {isPopular && <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest">Top Performer</span>}
           {isInviteOnly && <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Invite Only</span>}
           {!isPopular && !isInviteOnly && <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Active</span>}
        </div>

        <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-1">{name}</h3>
        <p className="text-xs font-medium text-slate-400 mb-8">{desc}</p>

        <div className="space-y-6 pb-8 border-b border-slate-50 mb-8">
           <div>
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5 block">Pricing (Monthly)</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-xl font-black text-slate-800 tracking-tight">$ {price}</span>
              </div>
           </div>
           <div>
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5 block">Platform Commission</span>
              <div className="flex items-baseline gap-1">
                 <span className={isRed ? "text-xl font-black text-rose-600 tracking-tight" : "text-xl font-black text-slate-800 tracking-tight"}>{commission} %</span>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                 <div className={`w-1.5 h-1.5 rounded-full ${isRed ? "bg-rose-500" : "bg-emerald-500"}`}></div>
                 <span className="text-[11px] font-bold text-slate-600">{f}</span>
              </div>
           ))}
        </div>
     </div>

     <button className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest mt-10 transition-all ${
       isRed ? "bg-rose-600 text-white shadow-lg shadow-rose-100 hover:bg-rose-700" : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
     }`}>
        Update {name} Tier
     </button>
  </div>
);

const ConfigRow = ({ label, value, desc }) => (
  <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50/50 border border-slate-100/50 group hover:bg-white hover:border-slate-100 transition-all cursor-default">
     <div className="flex flex-col">
        <span className="text-[13px] font-black text-slate-800">{label}</span>
        <span className="text-[11px] font-medium text-slate-400 mt-0.5">{desc}</span>
     </div>
     <div className="px-6 py-2 bg-white rounded-xl border border-slate-100 text-sm font-black text-slate-700 shadow-sm">
        {value}
     </div>
  </div>
);

export default ManageSubscriptionPage;
