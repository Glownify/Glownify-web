import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSalesman, createSalesman } from "../../redux/slice/salesexecutiveSlice";
import {
  Users, Search, Mail, Calendar, MoreHorizontal, Award, Plus
} from "lucide-react";
import { toast } from "react-hot-toast";

const ManageSalesman = () => {
  const dispatch = useDispatch();
  const { salesman = [], loading, error } = useSelector(
    (state) => state.salesexecutive
  );
  const user = useSelector((state) => state.auth.user);

  const loggedInCity = user?.roleDetails?.city || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    commissionRate: "",
  });

  useEffect(() => {
    dispatch(fetchAllSalesman());
  }, [dispatch]);

  const filteredSalesman = salesman.filter(s =>
    s.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.referralId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.roleDetails?.city) {
      toast.error("City not found for logged-in user");
      return;
    }

    const payload = {
      ...formData,
      city: user.roleDetails.city,
      commissionRate: Number(formData.commissionRate),
    };

    try {
      const createPromise = dispatch(createSalesman(payload)).unwrap();

      await toast.promise(createPromise, {
        loading: "Creating salesman...",
        success: (res) =>
          res?.message || "Salesman created successfully!",
        error: (err) =>
          err?.message ||
          err?.error ||
          "Failed to create salesman",
      });

      setOpenCreate(false);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        commissionRate: "",
      });
    } catch (error) {
      // Only non-API errors (edge cases)
      console.error("Create Salesman Error:", error);
    }
  };



  if (loading && salesman.length === 0) {
    return (
      <div className="p-10 flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-slate-500 font-medium">Loading salesman data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 bg-[#FBFBFE] min-h-screen">
      <div className="w-full mx-auto px-6 lg:px-12">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Salesman Management</h1>
            <p className="text-slate-500 mt-1">Manage and track performance of your field agents.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative group w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search by name or ID..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Create Button */}
            <button
              onClick={() => setOpenCreate(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl
                bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20
                hover:bg-indigo-700 hover:shadow-xl transition-all"
            >
              <Plus size={18} />
              Create Salesman
            </button>
          </div>
        </div>

        {/* --- CARD GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSalesman.map((item) => (
            <div key={item._id} className="bg-white rounded-[32px] border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              {/* Top Row: Profile & Actions */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {item.user?.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{item.user?.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
                      <Mail size={12} /> {item.user?.email}
                    </div>
                  </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Middle Row: Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Earnings</p>
                  <p className="text-lg font-black text-slate-900">₹{item.totalEarnings?.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Commission</p>
                  <p className="text-lg font-black text-indigo-600">{(item.commissionRate)}%</p>
                </div>
              </div>

              {/* Progress Bar for Commission Level */}
              <div className="mb-6 px-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">
                  <span>Performance Tier</span>
                  <span>{(item.commissionRate)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${(item.commissionRate)}%` }}
                  />
                </div>
              </div>

              {/* Footer Row: ID & Date */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-indigo-400" />
                  <span className="text-xs font-mono font-bold text-indigo-500">{item.referralId}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={14} />
                  <span className="text-xs font-medium">
                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {filteredSalesman.length === 0 && (
          <div className="bg-white rounded-[32px] p-20 text-center border border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Users size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No agents found</h3>
            <p className="text-slate-500 mt-2">No results match your current search criteria.</p>
          </div>
        )}

        {/* --- CREATE SALESMAN MODAL --- */}
        {openCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-[32px] w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in">

              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-900">Create Salesman</h2>
                <button onClick={() => setOpenCreate(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" />
                <input name="mobile" placeholder="Phone" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" />
                <input name="commissionRate" type="number" placeholder="Commission Rate (%)" value={formData.commissionRate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" />

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setOpenCreate(false)} className="px-5 py-3 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button type="submit" className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageSalesman;
