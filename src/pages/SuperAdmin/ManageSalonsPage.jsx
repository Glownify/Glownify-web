import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSalons, updateSalonStatus } from '../../redux/slice/superadminSlice';
import toast from 'react-hot-toast';
import { 
  User, Phone, Mail, CheckCircle, Clock, Users, 
  Scissors, Image as ImageIcon, X, MapPin, ShieldCheck, 
  CreditCard, ChevronLeft, ChevronRight, FileText, Check,
  AlertCircle, Trash2, ArrowRight, ExternalLink, Store
} from 'lucide-react';
import useMobile from '../../hooks/useMobile';

const DUMMY_SALONS = [
  {
    _id: "s1",
    shopName: "L'Artiste Hair Collective",
    owner: { name: "Julian Marc", email: "julian@artiste.com", phone: "+1 234 567 890" },
    contactNumber: "+1 234 567 890",
    verifiedByAdmin: false,
    shopType: "Premium Boutique",
    numberOfStaff: 12,
    serviceItems: [1, 2, 3, 4, 5],
    galleryImages: [1, 2, 3],
    createdAt: new Date().toISOString()
  },
  {
    _id: "s2",
    shopName: "Urban Grind Barbers",
    owner: { name: "Marcus Thorne", email: "marcus@urbangrind.com", phone: "+1 987 654 321" },
    contactNumber: "+1 987 654 321",
    verifiedByAdmin: true,
    shopType: "Men's Shop",
    numberOfStaff: 8,
    serviceItems: [1, 2, 3],
    galleryImages: [1, 2],
    createdAt: new Date().toISOString()
  },
  {
    _id: "s3",
    shopName: "Serenity Wellness Spa",
    owner: { name: "Elena Rossi", email: "elena@serenity.com", phone: "+1 456 789 012" },
    contactNumber: "+1 456 789 012",
    verifiedByAdmin: false,
    shopType: "Spas & Wellness",
    numberOfStaff: 15,
    serviceItems: [1, 2, 3, 4, 5, 6, 7],
    galleryImages: [1, 2, 3, 4],
    createdAt: new Date().toISOString()
  }
];

const ManageSalonsPage = () => {

  const dispatch = useDispatch();
  const { salons = [], loading, error } = useSelector((state) => state.superadmin || {});
  const isMobile = useMobile();
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    dispatch(fetchAllSalons());
  }, [dispatch]);

  const displaySalons = salons;

  // Pagination Logic
  const totalPages = Math.ceil(displaySalons.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displaySalons.slice(indexOfFirstItem, indexOfLastItem);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApprove = (salonId) => {
    dispatch(updateSalonStatus({ salonId, field: 'isApproved', value: true }));
    toast.success("Salon approved successfully!", {
      duration: 2000,
      position: 'top-right'
    });
  };

  const [rejectionReason, setRejectionReason] = useState("");
  const handleReject = (salonId) => {
    if (!rejectionReason) return toast.error("Please provide a reason for rejection");
    
    dispatch(updateSalonStatus({ salonId, field: 'isApproved', value: false }));
    toast.success("Application rejected.", {
      duration: 2000,
      position: 'top-right'
    });
    setRejectionReason("");
  };

  const handleToggleActive = (salonId) => {
    const salon = salons.find(s => s._id === salonId);
    const action = salon?.isActive ? 'deactivated' : 'activated';
    
    dispatch(updateSalonStatus({ salonId, field: 'isActive', value: !salon?.isActive }));
    toast.success(`Salon ${action} successfully`, {
      duration: 2000,
      position: 'top-right'
    });
  };

  // Set initial selected salon
  useEffect(() => {
    if (displaySalons.length > 0 && !selectedSalon) {
      setSelectedSalon(displaySalons[0]);
    }
  }, [displaySalons]);


  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-600 border-t-transparent"></div>
    </div>
  );

  // ── DESKTOP VIEW: SALON VERIFICATION & AUDIT ─────────────────────────────────
  if (!isMobile) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-10">
        <div className="flex items-center justify-between">
           <div className="space-y-1">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">Salon Verification & Audit</h1>
              <div className="flex items-center gap-4">
                 <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border border-rose-100">
                    {displaySalons.filter(s => !s.isApproved).length} PENDING APPLICATIONS
                 </span>
                 <span className="text-slate-400 text-xs font-bold flex items-center gap-1.5">
                    <Clock size={12} /> Live Sync Active
                 </span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-12 gap-8 sticky top-0">
           {/* Left: Salon Queue */}
           <div className="col-span-3 space-y-4 max-h-[80vh] overflow-y-auto pr-2 scrollbar-hide">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2">Registration Queue</h3>
              {displaySalons.map(salon => (
                 <div 
                    key={salon._id}
                    onClick={() => setSelectedSalon(salon)}
                    className={`p-5 rounded-[2rem] border transition-all cursor-pointer group ${
                       selectedSalon?._id === salon._id 
                       ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200" 
                       : "bg-white border-slate-100 hover:border-rose-200"
                    }`}
                 >
                    <div className="flex justify-between items-start mb-2">
                       <h4 className={`text-sm font-black truncate max-w-[120px] ${selectedSalon?._id === salon._id ? "text-white" : "text-slate-800"}`}>
                          {salon.shopName}
                       </h4>
                       <div className={`w-2 h-2 rounded-full ${salon.isApproved ? "bg-emerald-500" : "bg-orange-500"}`}></div>
                    </div>
                    <div className="flex items-center gap-2">
                       <MapPin size={10} className={selectedSalon?._id === salon._id ? "text-slate-400" : "text-slate-300"} />
                       <span className={`text-[10px] font-bold ${selectedSalon?._id === salon._id ? "text-slate-400" : "text-slate-500"}`}>
                          {salon.city || "New Area"}
                       </span>
                    </div>
                 </div>
              ))}
           </div>

           {/* Right: Active Audit Panel */}
           {selectedSalon ? (
              <div className="col-span-9 grid grid-cols-12 gap-8">
                 <div className="col-span-8 space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-[5rem] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                       
                       <div className="relative flex justify-between items-start mb-10">
                          <div className="space-y-2">
                             <h2 className="text-3xl font-black text-slate-800 tracking-tight">{selectedSalon.shopName}</h2>
                             <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                   Submitted {new Date(selectedSalon.createdAt).toLocaleDateString()} by
                                </span>
                                <span className="text-slate-800 font-bold text-xs ring-1 ring-slate-100 px-2 py-0.5 rounded-md">
                                   {selectedSalon.owner?.name}
                                </span>
                                {!selectedSalon.isApproved && (
                                   <span className="bg-rose-600 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter shadow-sm shadow-rose-100 animate-pulse">
                                      Action Required
                                   </span>
                                )}
                             </div>
                          </div>
                          
                          <div className="flex gap-3">
                             {!selectedSalon.isApproved && (
                                <button 
                                   onClick={() => handleApprove(selectedSalon._id)}
                                   className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-rose-200 active:scale-95"
                                >
                                   Approve Salon
                                </button>
                             )}
                             <button 
                                onClick={() => handleToggleActive(selectedSalon._id)}
                                className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                                   selectedSalon.isActive 
                                     ? "bg-slate-200 text-slate-700 hover:bg-slate-300" 
                                     : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200"
                                }`}
                             >
                                {selectedSalon.isActive ? 'Deactivate' : 'Activate'}
                             </button>
                          </div>
                          {selectedSalon.isApproved && (
                             <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl border border-emerald-100 flex items-center gap-2">
                                <ShieldCheck size={16} />
                                <span className="text-[11px] font-black uppercase tracking-widest">Verified Account</span>
                             </div>
                          )}
                       </div>

                       <div className="grid grid-cols-3 gap-8 mb-10">
                          <AuditInfo label="Business Type" value={selectedSalon.shopType || "Main Category"} />
                          <AuditInfo label="Contact" value={selectedSalon.contactNumber} />
                          <AuditInfo label="Registration" value={selectedSalon.registrationNumber || "PENDING_ID"} />
                       </div>

                       {/* Studio Gallery */}
                       <div className="grid grid-cols-2 gap-4 mb-10">
                          {selectedSalon.galleryImages?.length > 0 ? (
                             selectedSalon.galleryImages.slice(0, 2).map((img, idx) => (
                                <div key={idx} className="relative group overflow-hidden rounded-3xl h-48">
                                   <img src={img.url || img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                   <div className="absolute inset-0 bg-black/20"></div>
                                </div>
                             ))
                          ) : (
                             <div className="col-span-2 h-48 bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-300 font-bold italic">
                                No documentation images provided
                             </div>
                          )}
                       </div>

                       <div className="space-y-6 pt-10 border-t border-slate-50">
                          <div className="flex items-center gap-2 mb-4">
                             <FileText size={18} className="text-rose-500" />
                             <h3 className="font-black text-slate-800 uppercase tracking-widest text-[11px]">Service Catalog Overview</h3>
                          </div>
                          <div className="space-y-4">
                             {selectedSalon.serviceItems?.length > 0 ? (
                                selectedSalon.serviceItems.slice(0, 3).map((svc, idx) => (
                                   <ServiceRow key={idx} name={svc.name || "Custom Service"} time={`${svc.duration || 30} Min`} price={`$${svc.price || "0.00"}`} />
                                ))
                             ) : (
                                <p className="text-xs text-slate-400 italic">No services listed yet.</p>
                             )}
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="col-span-4 space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                       <h3 className="font-black text-slate-800 uppercase tracking-widest text-[11px] mb-6">Owner Profile</h3>
                       <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-slate-100">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedSalon.owner?.name}`} alt="" />
                          </div>
                          <div>
                             <h4 className="font-black text-slate-800 text-sm">{selectedSalon.owner?.name}</h4>
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{selectedSalon.owner?.email}</span>
                          </div>
                       </div>
                    </div>

                    {!selectedSalon.isApproved && (
                       <div className="bg-rose-50/10 rounded-[2.5rem] p-8 border border-rose-100/30">
                          <div className="flex items-center gap-2 mb-6">
                             <AlertCircle size={14} className="text-rose-600" />
                             <h3 className="font-black text-slate-800 uppercase tracking-widest text-[11px]">Application Controls</h3>
                          </div>
                          <div className="space-y-4">
                             <textarea 
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                placeholder="State reason for rejection if necessary..."
                                className="w-full h-24 bg-white border border-slate-100 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-600 outline-none resize-none placeholder:text-slate-300"
                             ></textarea>
                             <button 
                                onClick={() => handleReject(selectedSalon._id)}
                                disabled={!rejectionReason.trim()}
                                className={`w-full py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors ${
                                  rejectionReason.trim() 
                                    ? "bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-200" 
                                    : "bg-white border border-slate-100 text-slate-400 hover:bg-slate-100"
                                }`}
                             >
                                Reject Application
                             </button>
                          </div>
                       </div>
                    )}
                 </div>
              </div>
           ) : (
              <div className="col-span-9 h-[60vh] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] flex items-center justify-center">
                 <div className="text-center space-y-2">
                    <Store className="mx-auto text-slate-300" size={48} />
                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Select a salon to audit</p>
                 </div>
              </div>
           )}
        </div>
      </div>
    );
  }


  // ── MOBILE VIEW ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10 font-sans">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[10px] uppercase font-black tracking-widest text-rose-600">Verification Hub</span>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight mt-1">Salons</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Manage and audit shop profiles</p>
      </div>

      {/* Stats Mini Row */}
      <div className="grid grid-cols-2 gap-4 mb-8">
         <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-32">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pending</span>
            <div className="text-3xl font-black text-rose-600">{displaySalons.filter(s => !s.isApproved).length}</div>
         </div>
         <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-900 shadow-sm flex flex-col justify-between h-32">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total</span>
            <div className="text-3xl font-black text-white">{displaySalons.length}</div>
         </div>
      </div>

      {/* Salon List */}
      <div className="space-y-4 mb-20">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Application Queue</h2>
        {currentItems.map((salon) => (
          <div 
            key={salon.id || salon._id}
            className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-4">
               <div className="flex flex-col">
                  <h3 className="font-black text-slate-800 text-[15px]">{salon.shopName}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{salon.shopType}</span>
               </div>
               <div className={`w-2.5 h-2.5 rounded-full ${salon.isApproved ? 'bg-emerald-500' : 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]'}`}></div>
            </div>

            <div className="space-y-3 mb-6">
               <div className="flex items-center gap-3 text-slate-500">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                     <User size={14} />
                  </div>
                  <span className="text-xs font-bold">{salon.owner?.name}</span>
               </div>
               <div className="flex items-center gap-3 text-slate-500">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                     <MapPin size={14} />
                  </div>
                  <span className="text-xs font-bold">{salon.city || "New Area"}</span>
               </div>
            </div>

            {!salon.isApproved ? (
               <div className="flex gap-2 pt-4 border-t border-slate-50">
                  <button 
                     onClick={() => handleApprove(salon._id)}
                     className="flex-1 bg-rose-600 text-white py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-rose-100 active:scale-95"
                  >
                     Approve
                  </button>
                  <button 
                     onClick={() => handleToggleActive(salon._id)}
                     className={`flex-1 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-colors ${
                        salon.isActive 
                          ? "bg-slate-200 text-slate-700" 
                          : "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                     }`}
                  >
                     {salon.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button 
                     onClick={() => setSelectedSalon(salon)}
                     className="px-5 bg-slate-50 text-slate-400 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-100"
                  >
                     Details
                  </button>
               </div>
            ) : (
               <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-lg">Verified Partner</span>
                  <button onClick={() => setSelectedSalon(salon)} className="text-slate-400 text-[10px] font-black uppercase tracking-widest">View Audit</button>
               </div>
            )}
          </div>
        ))}
      </div>

      {/* Details Side-Drawer/Modal logic remains same */}


      {/* --- DETAIL MODAL --- */}
      {selectedSalon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="relative h-32 bg-indigo-600 p-8">
              <button 
                onClick={() => setSelectedSalon(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold text-white mb-1">{selectedSalon.shopName}</h2>
              <p className="text-indigo-100 flex items-center gap-2 italic text-sm">
                Registered on {new Date(selectedSalon.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto">
              
              {/* Left Column: Personal & Contact */}
              <div className="space-y-6">
                <section>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Owner Information</label>
                  <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                    <p className="flex items-center gap-3 text-slate-700 font-medium"><User size={16} className="text-indigo-500" /> {selectedSalon.owner?.name}</p>
                    <p className="flex items-center gap-3 text-slate-600 text-sm"><Mail size={16} /> {selectedSalon.owner?.email}</p>
                    <p className="flex items-center gap-3 text-slate-600 text-sm"><Phone size={16} /> {selectedSalon.owner?.phone}</p>
                  </div>
                </section>

                <section>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Business Details</label>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong>Registration:</strong> {selectedSalon.registrationNumber || 'N/A'}</p>
                    <p><strong>WhatsApp:</strong> {selectedSalon.whatsappNumber || 'N/A'}</p>
                    <p><strong>Staff Count:</strong> {selectedSalon.numberOfStaff || 0} Employees</p>
                  </div>
                </section>
              </div>

              {/* Right Column: Status & Stats */}
              <div className="space-y-6">
                <section>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Status & Subscription</label>
                  <div className="flex flex-col gap-3">
                    <div className={`flex items-center justify-between p-3 rounded-lg border ${selectedSalon.isApproved ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
                      <span className="text-sm font-bold">Verification</span>
                      <ShieldCheck size={18} />
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Plan</p>
                        <p className="text-sm font-bold text-slate-700">{selectedSalon.subscription?.paymentStatus || 'FREE'}</p>
                      </div>
                      <CreditCard size={18} className="text-slate-400" />
                    </div>
                  </div>
                </section>

                <section>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Catalog Summary</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50 p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-indigo-600">{selectedSalon.serviceItems?.length || 0}</p>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase">Services</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-slate-600">{selectedSalon.ratings?.length || 0}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Reviews</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t flex justify-end">
              <button 
                onClick={() => setSelectedSalon(null)}
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold text-sm transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── DESKTOP SUB-COMPONENTS ───────────────────────────────────────────────────

const AuditInfo = ({ label, value }) => (
  <div>
     <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">{label}</span>
     <span className="text-sm font-black text-slate-800">{value}</span>
  </div>
);

const ServiceRow = ({ name, time, price }) => (
  <div className="flex items-center justify-between group cursor-default">
     <div className="flex flex-col">
        <span className="text-[13px] font-black text-slate-800 group-hover:text-rose-600 transition-colors">{name}</span>
        <span className="text-[11px] font-medium text-slate-400">{time}</span>
     </div>
     <span className="text-sm font-black text-slate-800">{price}</span>
  </div>
);

const CheckItem = ({ label, isDone }) => (
  <div className="flex items-center gap-4 group">
     <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${isDone ? "bg-emerald-500 text-white" : "bg-slate-50 border border-slate-200 text-transparent"}`}>
        <Check size={12} strokeWidth={4} />
     </div>
     <span className={`text-[12px] font-bold transition-colors ${isDone ? "text-slate-700" : "text-slate-400"}`}>{label}</span>
  </div>
);

export default ManageSalonsPage;