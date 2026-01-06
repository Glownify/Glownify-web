import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllSalesExecutives, 
  fetchAllCities, 
  createSalesExecutive 
} from '../../redux/slice/superadminSlice';
import { 
  UserPlus, Mail, Phone, MapPin, X, Percent, 
  ShieldCheck, Search, Copy, Check, MoreVertical, 
  ArrowRight, Users, Briefcase
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageSalesExecutivePage = () => {
  const dispatch = useDispatch();

  // Redux State
  const {
    salesExecutives = [],
    cities = [],
    loading = false,
  } = useSelector(state => state.superadmin || {});

  // Local UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successData, setSuccessData] = useState(null); 
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    commissionRate: 0,
  });

  useEffect(() => {
    dispatch(fetchAllSalesExecutives());
    dispatch(fetchAllCities());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Wrap the async thunk with toast.promise
  toast.promise(
    dispatch(createSalesExecutive(formData)).unwrap(),
    {
      loading: "Creating executive...",
      success: (payload) => {
        setSuccessData({ password: payload.password });
        dispatch(fetchAllSalesExecutives()); // refresh list
        return "Executive created successfully!";
      },
      error: (err) => err?.message || "Failed to create executive",
    }
  );
};


  const closeModal = () => {
    setIsModalOpen(false);
    setSuccessData(null);
    setFormData({ name: '', email: '', mobile: '', city: '', commissionRate: 0 });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-4 lg:p-10 font-sans text-slate-900">
      
      {/* --- PAGE HEADER --- */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
         
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Sales Executives</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your field team and commission structures.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-200 active:scale-95"
        >
          <UserPlus size={20} /> Register Executive
        </button>
      </div>

      
      {/* --- GRID OF CARDS --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && salesExecutives.length === 0 ? (
           [...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-[32px]" />
          ))
        ) : (
          salesExecutives.map((se) => {
            // CITY NAME LOOKUP LOGIC
            const cityName = cities.find(c => c._id === se.city)?.name || "Not Assigned";

            return (
              <div key={se._id} className="group bg-white rounded-[32px] border border-slate-200 p-6 transition-all hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                      {se.user?.name?.charAt(0)}
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-emerald-100">
                      {se.status || 'Active'}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-800 mb-1">{se.user?.name}</h3>
                  <p className="text-xs font-mono text-indigo-500 font-bold mb-6 tracking-tight">{se.referralId}</p>
                  
                  {/* SQUARE INFO BOXES (Bento Style) */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">City</p>
                      <p className="text-sm font-bold text-slate-700 truncate">{cityName}</p>
                    </div>
                    <div className="bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100/50">
                      <p className="text-[9px] font-bold text-indigo-400 uppercase mb-1">Commission</p>
                      <p className="text-sm font-bold text-indigo-600">{se.commissionRate}%</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-slate-500 border-t border-slate-50 pt-4">
                  <div className="flex items-center gap-3 font-medium">
                    <div className="p-1.5 bg-slate-100 rounded-lg"><Mail size={14}/></div> 
                    {se.user?.email}
                  </div>
                  <div className="flex items-center gap-3 font-medium">
                    <div className="p-1.5 bg-slate-100 rounded-lg"><Phone size={14}/></div> 
                    {se.user?.phone || se.mobile || 'N/A'}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* --- REGISTRATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={closeModal} />
          <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            
            {!successData ? (
              /* FORM VIEW */
              <form onSubmit={handleSubmit} className="p-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Register</h2>
                  <button type="button" onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24} /></button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 ml-1">Full Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-semibold transition-all" placeholder="Enter full name"/>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 ml-1">Email</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange} 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-semibold transition-all"/>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 ml-1">Mobile</label>
                      <input type="text" name="mobile" required value={formData.mobile} onChange={handleInputChange} 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-semibold transition-all"/>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 ml-1">City</label>
                      <select name="city" required value={formData.city} onChange={handleInputChange} 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-semibold transition-all appearance-none">
                        <option value="">Select City</option>
                        {cities.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 ml-1">Comm. %</label>
                      <input type="number" name="commissionRate" value={formData.commissionRate} onChange={handleInputChange} 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-semibold transition-all"/>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-5 rounded-2xl font-bold mt-6 shadow-xl shadow-slate-200 flex items-center justify-center gap-2 transition-all active:scale-95">
                    <ShieldCheck size={20} /> Create Executive Profile
                  </button>
                </div>
              </form>
            ) : (
              /* SUCCESS VIEW */
              <div className="p-12 text-center">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto mb-6 rotate-6">
                  <Check size={48} strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Done!</h2>
                <p className="text-slate-500 mb-8 font-medium">The account is ready. Copy this password for the executive.</p>
                
                <div 
                  onClick={() => handleCopy(successData.password)}
                  className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-[24px] p-8 mb-8 cursor-pointer group relative overflow-hidden transition-all hover:bg-indigo-100/50"
                >
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Temporary Password</p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-4xl font-mono font-black text-indigo-600 tracking-tighter">{successData.password}</span>
                    {copied ? <Check className="text-emerald-500" size={24}/> : <Copy className="text-indigo-300 group-hover:text-indigo-500" size={24} />}
                  </div>
                </div>

                <button onClick={closeModal} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2">
                  Complete Setup <ArrowRight size={20}/>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSalesExecutivePage;