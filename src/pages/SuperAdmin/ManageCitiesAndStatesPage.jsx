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
  Map as MapIcon, Calendar, Hash, Navigation2 
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageCitiesAndStatesPage = () => {
  const dispatch = useDispatch();
  const { cities = [], states = [], loading, error } = useSelector(
    (state) => state.superadmin
  );

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
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 font-sans">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">States and Cities</h1>
          <p className="text-slate-500">Manage serviceable states, and cities</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-100 active:scale-95"
        >
          <Plus size={18} /> Add {activeTab === 'cities' ? 'City' : 'State'}
        </button>
      </div>

      {/* Modern Tab System */}
      <div className="inline-flex p-1 bg-slate-200/50 rounded-2xl mb-8 border border-slate-200">
        <button
          onClick={() => setActiveTab('cities')}
          className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'cities' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <MapPin size={16} /> Cities ({cities.length})
        </button>
        <button
          onClick={() => setActiveTab('states')}
          className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'states' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Globe size={16} /> States ({states.length})
        </button>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">#</th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                {activeTab === 'cities' ? (
                  <>
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">State</th>
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Pincode</th>
                  </>
                ) : (
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Code</th>
                )}
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Country</th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(activeTab === 'cities' ? cities : states).map((item, index) => (
                <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-400">{index + 1}</td>
                  <td className="p-4 text-sm font-bold text-slate-700">{item.name}</td>
                  {activeTab === 'cities' ? (
                    <>
                      <td className="p-4 text-sm text-slate-500">{item.state?.name || '-'}</td>
                      <td className="p-4 text-sm text-center">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-mono font-bold">
                           {item.pincode || 'N/A'}
                        </span>
                      </td>
                    </>
                  ) : (
                    <td className="p-4 text-sm font-bold text-indigo-500">{item.code || '-'}</td>
                  )}
                  <td className="p-4 text-sm text-slate-500">{item.country}</td>
                  <td className="p-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
              <h2 className="text-xl font-bold text-slate-900">Add New {activeTab === 'cities' ? 'City' : 'State'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full text-slate-400"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Name</label>
                <div className="relative">
                  <MapIcon className="absolute left-3 top-3 text-slate-300" size={18} />
                  <input 
                    name="name" required value={formData.name} onChange={handleInputChange}
                    placeholder={`Enter ${activeTab.slice(0, -1)} name`}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {activeTab === 'cities' ? (
                <>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Select State</label>
                    <select 
                      name="state" required value={formData.state} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm appearance-none"
                    >
                      <option value="">Choose a state...</option>
                      {states.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Pincode</label>
                    <div className="relative">
                      <Navigation2 className="absolute left-3 top-3 text-slate-300" size={18} />
                      <input 
                        name="pincode" value={formData.pincode} onChange={handleInputChange}
                        placeholder="Area pincode"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">State Code</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 text-slate-300" size={18} />
                    <input 
                      name="code" value={formData.code} onChange={handleInputChange}
                      placeholder="e.g. MH, DL, NY"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]">
                Confirm & Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCitiesAndStatesPage;