import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSalons } from '../../redux/slice/superadminSlice';
import { 
  User, Phone, Mail, CheckCircle, Clock, Users, 
  Scissors, Image as ImageIcon, X, MapPin, ShieldCheck, 
  CreditCard, ChevronLeft, ChevronRight, FileText, Check,
  AlertCircle, Trash2, ArrowRight, ExternalLink
} from 'lucide-react';
import useMobile from '../../hooks/useMobile';

const ManageSalonsPage = () => {
  const dispatch = useDispatch();
  const { salons = [], loading, error } = useSelector((state) => state.superadmin);
  const isMobile = useMobile();
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    dispatch(fetchAllSalons());
  }, [dispatch]);

  // Pagination Logic
  const totalPages = Math.ceil(salons.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = salons.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-600 border-t-transparent"></div>
    </div>
  );

  // ── DESKTOP VIEW: SALON VERIFICATION & AUDIT ─────────────────────────────────
  if (!isMobile) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Verification Header */}
        <div className="flex items-center justify-between">
           <div className="space-y-1">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">Salon Verification & Audit</h1>
              <div className="flex items-center gap-4">
                 <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border border-rose-100">
                    14 PENDING APPLICATIONS
                 </span>
                 <span className="text-slate-400 text-xs font-bold flex items-center gap-1.5">
                    <Clock size={12} /> Last audit: 2 hours ago
                 </span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
           {/* Main Audit Panel */}
           <div className="col-span-8 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-[5rem] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                 
                 <div className="relative flex justify-between items-start mb-10">
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black text-slate-800 tracking-tight">L'Artiste Hair Collective</h2>
                       <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submitted 14 hours ago by</span>
                          <span className="text-slate-800 font-bold text-xs ring-1 ring-slate-100 px-2 py-0.5 rounded-md">Julian Marc</span>
                          <span className="bg-rose-600 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter shadow-sm shadow-rose-100">High Priority</span>
                       </div>
                    </div>
                    <div className="flex gap-3">
                       <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-rose-200 active:scale-95">
                          Approve Salon
                       </button>
                       <button className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-slate-100">
                          Request Info
                       </button>
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-8 mb-10">
                    <AuditInfo label="Category" value="Premium Boutique" />
                    <AuditInfo label="Location" value="West Hollywood, CA" />
                    <AuditInfo label="Tax ID" value="XX-XXXX901" />
                 </div>

                 {/* Studio Gallery */}
                 <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="relative group overflow-hidden rounded-3xl h-48">
                       <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop" alt="Studio" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                       <span className="absolute bottom-4 left-4 text-[10px] font-black text-white uppercase tracking-widest px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg">Main Studio Floor</span>
                    </div>
                    <div className="relative group overflow-hidden rounded-3xl h-48">
                       <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1000&auto=format&fit=crop" alt="Entrance" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                       <span className="absolute bottom-4 left-4 text-[10px] font-black text-white uppercase tracking-widest px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg">Storefront / Entrance</span>
                    </div>
                 </div>

                 {/* Services List */}
                 <div className="space-y-6 pt-10 border-t border-slate-50">
                    <div className="flex items-center gap-2 mb-4">
                       <FileText size={18} className="text-rose-500" />
                       <h3 className="font-black text-slate-800 uppercase tracking-widest text-[11px]">Service Menu & Pricing</h3>
                    </div>
                    <div className="space-y-4">
                       <ServiceRow name="Couture Cut & Style" time="30 Min • Master Stylist" price="$185.00" />
                       <ServiceRow name="Balayage Signature" time="150 Min • Includes Gloss" price="$350.00" />
                       <ServiceRow name="Botanical Scalp Therapy" time="45 Min • Organic Products" price="$95.00" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Side Audit Controls */}
           <div className="col-span-4 space-y-8">
              {/* Checklist */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                 <h3 className="font-black text-slate-800 uppercase tracking-widest text-[11px] mb-6">Audit Checklist</h3>
                 <div className="space-y-5">
                    <CheckItem label="Business License Verified" isDone />
                    <CheckItem label="Insurance Documents Valid" isDone />
                    <CheckItem label="Health Inspection PDF" isDone />
                    <CheckItem label="On-site Audit Required" />
                 </div>
              </div>

              {/* Owner Info */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                 <h3 className="font-black text-slate-800 uppercase tracking-widest text-[11px] mb-6">Owner Background</h3>
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-slate-100 shadow-lg">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elona" alt="Owner" />
                    </div>
                    <div>
                       <h4 className="font-black text-slate-800 text-sm">Elona Moretti</h4>
                       <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">ELITE PARTNER CANDIDATE</span>
                    </div>
                 </div>
                 <p className="text-[12px] font-medium text-slate-500 leading-relaxed mb-6">
                    12+ years in salon management. Previous owner of "The Mane" in NYC. Clean credit history and no prior registration violations.
                 </p>
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Internal Note</span>
                    <p className="text-[11px] font-bold text-slate-600 italic leading-relaxed">
                       "High potential for platform growth. Verify the health certificate and push to final approval."
                    </p>
                 </div>
              </div>

              {/* Denial Actions */}
              <div className="bg-rose-50/10 rounded-[2.5rem] p-8 border border-rose-100/30">
                 <div className="flex items-center gap-2 mb-6">
                    <AlertCircle size={14} className="text-rose-600" />
                    <h3 className="font-black text-slate-800 uppercase tracking-widest text-[11px]">Denial Action</h3>
                 </div>
                 <div className="space-y-4">
                    <select className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-600 outline-none">
                       <option>Incomplete Documentation</option>
                       <option>Safety Concerns</option>
                       <option>Licensing Issue</option>
                    </select>
                    <textarea 
                       placeholder="Provide specific reason for rejection..."
                       className="w-full h-24 bg-white border border-slate-100 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-600 outline-none resize-none placeholder:text-slate-300"
                    ></textarea>
                    <button className="w-full py-4 bg-white border border-rose-100 text-rose-600 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-100/50 transition-colors">
                       Reject Application
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Salons</h1>
          <p className="text-slate-500">Manage and view detailed shop profiles</p>
        </div>
        <div className="text-sm font-semibold text-slate-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
          Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, salons.length)} of {salons.length}
        </div>
      </div>

      {/* Grid of Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((salon) => (
          <div 
            key={salon.id || salon._id}
            onClick={() => setSelectedSalon(salon)}
            className="group cursor-pointer bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-800 truncate pr-2 group-hover:text-indigo-600 transition-colors">
                  {salon.shopName || 'N/A'}
                </h3>
                {salon.verifiedByAdmin ? 
                  <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" /> : 
                  <Clock size={16} className="text-amber-500 flex-shrink-0" />
                }
              </div>
              
              <div className="space-y-2 text-sm text-slate-600 mb-4">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-slate-400" />
                  <span className="truncate">{salon.owner?.name || 'Owner N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <span>{salon.contactNumber || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                {salon.shopType || 'Salon'}
              </span>
              <div className="flex gap-3 text-slate-400">
                <div className="flex items-center gap-1 text-xs"><ImageIcon size={12}/> {salon.galleryImages?.length || 0}</div>
                <div className="flex items-center gap-1 text-xs"><Scissors size={12}/> {salon.serviceItems?.length || 0}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                  currentPage === index + 1
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

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
                    <div className={`flex items-center justify-between p-3 rounded-lg border ${selectedSalon.verifiedByAdmin ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
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