import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSalons } from '../../redux/slice/superadminSlice';
import { 
  User, Phone, Mail, CheckCircle, Clock, Users, 
  Scissors, Image as ImageIcon, X, MapPin, ShieldCheck, 
  CreditCard, ChevronLeft, ChevronRight 
} from 'lucide-react';

const ManageSalonsPage = () => {
  const dispatch = useDispatch();
  const { salons = [], loading, error } = useSelector((state) => state.superadmin);
  
  // States
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
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
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
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" /> : 
                  <Clock size={16} className="text-amber-500 shrink-0" />
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

export default ManageSalonsPage;