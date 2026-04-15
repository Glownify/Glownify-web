import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllCities,
  fetchAllStates,
  createCity,
  createState,
} from '../../redux/slice/superadminSlice';
import { 
  MapPin, Globe, Plus, X, Search, 
  Map as MapIcon, Calendar, Hash, Navigation2, 
  ChevronRight, ArrowRight, Activity, Trash2, 
  ShieldCheck, ExternalLink, Settings, Layout
} from 'lucide-react';
import toast from 'react-hot-toast';
import useMobile from '../../hooks/useMobile';

const DUMMY_STATES = [
  { _id: 'st1', name: 'Maharashtra', country: 'India', code: 'MH', createdAt: new Date().toISOString() },
  { _id: 'st2', name: 'Karnataka', country: 'India', code: 'KA', createdAt: new Date().toISOString() },
  { _id: 'st3', name: 'Delhi', country: 'India', code: 'DL', createdAt: new Date().toISOString() },
  { _id: 'st4', name: 'Tamil Nadu', country: 'India', code: 'TN', createdAt: new Date().toISOString() },
];

const DUMMY_CITIES = [
  { _id: 'c1', name: 'Mumbai', state: { name: 'Maharashtra' }, country: 'India', pincode: '400001', createdAt: new Date().toISOString() },
  { _id: 'c2', name: 'Pune', state: { name: 'Maharashtra' }, country: 'India', pincode: '411001', createdAt: new Date().toISOString() },
  { _id: 'c3', name: 'Bangalore', state: { name: 'Karnataka' }, country: 'India', pincode: '560001', createdAt: new Date().toISOString() },
  { _id: 'c4', name: 'New Delhi', state: { name: 'Delhi' }, country: 'India', pincode: '110001', createdAt: new Date().toISOString() },
  { _id: 'c5', name: 'Chennai', state: { name: 'Tamil Nadu' }, country: 'India', pincode: '600001', createdAt: new Date().toISOString() },
];

const ManageCitiesAndStatesPage = () => {
  const dispatch = useDispatch();
  const isMobile = useMobile();
  const { cities: liveCities = [], states: liveStates = [], loading, error } = useSelector(
    (state) => state.superadmin || {}
  );

  const states = liveStates.length > 0 ? liveStates : DUMMY_STATES;
  const cities = liveCities.length > 0 ? liveCities : DUMMY_CITIES;

  const [activeTab, setActiveTab] = useState('cities'); // cities | states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    country: 'India',
    pincode: '',
    code: ''
  });

  useEffect(() => {
    dispatch(fetchAllCities());
    dispatch(fetchAllStates());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const actionPromise =
      activeTab === "cities"
        ? dispatch(
            createCity({
              name: formData.name,
              state: formData.state,
              country: formData.country,
              pincode: formData.pincode,
            })
          ).unwrap()
        : dispatch(
            createState({
              name: formData.name,
              country: formData.country,
              code: formData.code,
            })
          ).unwrap();

    await toast.promise(actionPromise, {
      loading:
        activeTab === "cities"
          ? "Creating city..."
          : "Creating state...",
      success: (res) =>
        res?.message ||
        (activeTab === "cities"
          ? "City created successfully!"
          : "State created successfully!"),
      error: (err) =>
        err?.message ||
        err?.error ||
        "Operation failed. Please try again.",
    });

    // Reset form & close modal ONLY on success
    setFormData({
      name: "",
      state: "",
      country: "India",
      pincode: "",
      code: "",
    });
    setIsModalOpen(false);

    // Refresh list (optional if slice auto-updates)
    dispatch(fetchAllCities());
    dispatch(fetchAllStates());
  } catch (error) {
    console.error("Create city/state error:", error);
  }
};

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-600 border-t-transparent"></div>
    </div>
  );

  // ── DESKTOP VIEW: TERRITORY MANAGER ───────────────────────────────────────
  if (!isMobile) {
    return (
      <div className="space-y-12 animate-in fade-in duration-500 pb-20">
        {/* Header Section */}
        <div className="flex items-end justify-between">
           <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-rose-600">Geo-Spatial Engine</span>
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">Territory Management</h1>
           </div>
           
           <button
             onClick={() => setIsModalOpen(true)}
             className="px-8 py-4 bg-rose-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all active:scale-95 shadow-lg shadow-rose-200"
           >
              Deploy {activeTab === 'cities' ? 'New City' : 'New State'}
           </button>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
           {/* Navigation & Metrics */}
           <div className="col-span-3 space-y-6">
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Entity Layer</h3>
                 <div className="space-y-2">
                    <button
                       onClick={() => setActiveTab('cities')}
                       className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                          activeTab === 'cities' 
                          ? "bg-rose-50 text-rose-600 shadow-sm border border-rose-100/50" 
                          : "text-slate-500 hover:bg-slate-50"
                       }`}
                    >
                       <div className="flex items-center gap-3">
                          <MapPin size={16} />
                          <span>Cities</span>
                       </div>
                       <span className={`px-2 py-0.5 rounded-md text-[9px] ${activeTab === 'cities' ? "bg-rose-200/50" : "bg-slate-100"}`}>
                          {cities.length}
                       </span>
                    </button>
                    <button
                       onClick={() => setActiveTab('states')}
                       className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                          activeTab === 'states' 
                          ? "bg-rose-50 text-rose-600 shadow-sm border border-rose-100/50" 
                          : "text-slate-500 hover:bg-slate-50"
                       }`}
                    >
                       <div className="flex items-center gap-3">
                          <Globe size={16} />
                          <span>States</span>
                       </div>
                       <span className={`px-2 py-0.5 rounded-md text-[9px] ${activeTab === 'states' ? "bg-rose-200/50" : "bg-slate-100"}`}>
                          {states.length}
                       </span>
                    </button>
                 </div>
              </div>

              <div className="bg-rose-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Coverage Index</h4>
                 <div className="text-3xl font-black mb-4">India</div>
                 <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] uppercase font-bold opacity-60">Avg Cities / State</span>
                       <span className="text-sm font-black font-mono">{(cities.length / (states.length || 1)).toFixed(1)}</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Territory Data Grid */}
           <div className="col-span-9 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-50">
                       <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Territory</th>
                       <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Parent Layer</th>
                       <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identifier</th>
                       <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment</th>
                       <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {(activeTab === 'cities' ? cities : states).map((item, index) => (
                       <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                             <div className="flex flex-col">
                                <span className="text-sm font-black text-slate-800">{item.name}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.country}</span>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <span className="text-xs font-bold text-slate-600">
                                {activeTab === 'cities' ? (item.state?.name || 'Unassigned') : 'National'}
                             </span>
                          </td>
                          <td className="px-8 py-6">
                             <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black font-mono text-slate-600">
                                {activeTab === 'cities' ? (item.pincode || 'N/A') : (item.code || 'N/A')}
                             </span>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-2 text-slate-400">
                                <Calendar size={12} />
                                <span className="text-[10px] font-bold">{new Date(item.createdAt).toLocaleDateString()}</span>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <button className="p-2 text-slate-300 hover:text-rose-600 transition-colors">
                                <Settings size={16} />
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* --- MODAL (Shared with Mobile but Styled) --- */}
        {renderModal()}
      </div>
    );
  }

  function renderModal() {
    if (!isModalOpen) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-slate-100">
          <div className="flex items-center justify-between p-8 border-b border-slate-50">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                Add {activeTab === 'cities' ? 'City' : 'State'}
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Territory expansion</p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Territory Name</label>
              <div className="relative">
                 <input
                   type="text"
                   name="name"
                   required
                   value={formData.name}
                   onChange={handleInputChange}
                   placeholder={`e.g. ${activeTab === 'cities' ? 'Mumbai' : 'Maharashtra'}`}
                   className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-rose-50 focus:border-rose-200 outline-none transition-all placeholder:text-slate-300 font-bold text-slate-700"
                 />
                 <MapIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              </div>
            </div>

            {activeTab === 'cities' ? (
              <>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Parent Segment (State)</label>
                  <select 
                    name="state" required value={formData.state} onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-rose-50 focus:border-rose-200 outline-none transition-all font-bold text-slate-700 appearance-none bg-no-repeat bg-[right_1.5rem_center] bg-[length:1em_1em]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")` }}
                  >
                    <option value="">Select State Layer...</option>
                    {states.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Postal Identifier (Pincode)</label>
                  <div className="relative">
                     <input 
                       name="pincode" value={formData.pincode} onChange={handleInputChange}
                       placeholder="400001"
                       className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-rose-50 focus:border-rose-200 outline-none transition-all font-bold text-slate-700"
                     />
                     <Navigation2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Segment Code (State Code)</label>
                <div className="relative">
                   <input 
                     name="code" value={formData.code} onChange={handleInputChange}
                     placeholder="e.g. MH"
                     className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-rose-50 focus:border-rose-200 outline-none transition-all font-bold text-slate-700"
                   />
                   <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
              </div>
            )}

            <button
               type="submit"
               className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-95 mt-4"
            >
              Deploy Territory
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── MOBILE VIEW ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 font-sans">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">States & Cities</h1>
          <p className="text-slate-500 text-sm font-medium">Territory Management</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-rose-100 active:scale-95"
        >
          <Plus size={18} /> Add {activeTab === 'cities' ? 'City' : 'State'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-200/50 rounded-2xl mb-8 border border-slate-100">
        <button
          onClick={() => setActiveTab('cities')}
          className={`flex-1 py-3 rounded-xl text-xs font-black transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'cities' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'
          }`}
        >
          <MapPin size={16} /> Cities
        </button>
        <button
          onClick={() => setActiveTab('states')}
          className={`flex-1 py-3 rounded-xl text-xs font-black transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'states' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'
          }`}
        >
          <Globe size={16} /> States
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Name</th>
                {activeTab === 'cities' ? (
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-center">Pin</th>
                ) : (
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Code</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {(activeTab === 'cities' ? cities : states).map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                     <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">{item.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                           {activeTab === 'cities' ? (item.state?.name || 'India') : item.country}
                        </span>
                     </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-black font-mono">
                       {activeTab === 'cities' ? (item.pincode || '--') : (item.code || '--')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {renderModal()}
    </div>
  );
};

export default ManageCitiesAndStatesPage;