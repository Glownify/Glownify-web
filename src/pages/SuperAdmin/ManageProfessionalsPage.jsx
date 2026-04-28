import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfessionalStatus } from '../../redux/slice/superadminSlice';
import toast from 'react-hot-toast';
import { 
  User, Phone, Mail, CheckCircle, Clock, Users, 
  Scissors, X, MapPin, ShieldCheck, 
  CreditCard, ChevronLeft, ChevronRight, FileText, Check,
  AlertCircle, Briefcase, Filter, Search
} from 'lucide-react';
import useMobile from '../../hooks/useMobile';

const ManageProfessionalsPage = () => {
  const dispatch = useDispatch();
  const { professionals = [], loading, error } = useSelector((state) => state.superadmin || {});
  const isMobile = useMobile();
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  useEffect(() => {
    // Professionals are already loaded from Redux mock data
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(professionals.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = professionals.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApprove = (proId) => {
    dispatch(updateProfessionalStatus({ proId, field: 'isApproved', value: true }));
    toast.success("Professional approved successfully!", {
      duration: 2000,
      position: 'top-right'
    });
  };

  const handleReject = (proId) => {
    dispatch(updateProfessionalStatus({ proId, field: 'isApproved', value: false }));
    toast.success("Professional rejected.", {
      duration: 2000,
      position: 'top-right'
    });
  };

  const handleToggleActive = (proId) => {
    const professional = professionals.find(p => p._id === proId);
    const action = professional?.isActive ? 'deactivated' : 'activated';
    
    dispatch(updateProfessionalStatus({ proId, field: 'isActive', value: !professional?.isActive }));
    toast.success(`Professional ${action} successfully`, {
      duration: 2000,
      position: 'top-right'
    });
  };

  // Set initial selected professional
  useEffect(() => {
    if (professionals.length > 0 && !selectedProfessional) {
      setSelectedProfessional(professionals[0]);
    }
  }, [professionals]);

  // Filter professionals based on search
  const filteredProfessionals = professionals.filter(pro => 
    pro.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pro.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pro.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCurrentItems = filteredProfessionals.slice(indexOfFirstItem, indexOfLastItem);
  const filteredTotalPages = Math.ceil(filteredProfessionals.length / itemsPerPage);

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-600 border-t-transparent"></div>
    </div>
  );

  // MOBILE VIEW
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 font-sans">
        <div className="mb-8">
           <span className="text-[10px] uppercase font-black tracking-widest text-rose-600">Professional Hub</span>
           <h1 className="text-3xl font-black text-slate-800 tracking-tight mt-1">Professionals</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Manage independent professionals</p>
        </div>

        {/* Search */}
        <div className="bg-white h-12 rounded-2xl border border-slate-100 flex items-center px-4 shadow-sm mb-8">
           <Search size={16} className="text-slate-300 mr-2" />
           <input 
             type="text" 
             placeholder="Search professionals..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="bg-transparent text-xs font-bold text-slate-700 outline-none w-full" 
           />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-32">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pending</span>
              <div className="text-3xl font-black text-rose-600">{professionals.filter(p => !p.isApproved).length}</div>
           </div>
           <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-900 shadow-sm flex flex-col justify-between h-32">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total</span>
              <div className="text-3xl font-black text-white">{professionals.length}</div>
           </div>
        </div>

        {/* Professional List */}
        <div className="space-y-4 mb-20">
           {filteredCurrentItems.map((professional) => (
             <div key={professional._id} className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex flex-col">
                      <h3 className="font-black text-slate-800 text-sm leading-tight">{professional.name}</h3>
                      <span className="text-[10px] font-bold text-slate-400 truncate max-w-[140px]">{professional.specialty}</span>
                   </div>
                   <div className={`w-2.5 h-2.5 rounded-full ${professional.isApproved ? 'bg-emerald-500' : 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]'}`}></div>
                </div>

                <div className="space-y-3 mb-6">
                   <div className="flex items-center gap-3 text-slate-500">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                         <Mail size={14} />
                      </div>
                      <span className="text-xs font-bold">{professional.email}</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-500">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                         <Phone size={14} />
                      </div>
                      <span className="text-xs font-bold">{professional.phone}</span>
                   </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-slate-50">
                   {!professional.isApproved && (
                      <button 
                         onClick={() => handleApprove(professional._id)}
                         className="flex-1 bg-rose-600 text-white py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-rose-100 active:scale-95"
                      >
                         Approve
                      </button>
                   )}
                   <button 
                      onClick={() => handleToggleActive(professional._id)}
                      className={`flex-1 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-colors ${
                         professional.isActive 
                           ? "bg-slate-200 text-slate-700" 
                           : "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                      }`}
                   >
                      {professional.isActive ? 'Deactivate' : 'Activate'}
                   </button>
                   <button 
                      onClick={() => setSelectedProfessional(professional)}
                      className="px-5 bg-slate-50 text-slate-400 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-100"
                   >
                      Details
                   </button>
                </div>
             </div>
           ))}
        </div>

        {/* Pagination */}
        {filteredTotalPages > 1 && (
           <div className="flex justify-center items-center gap-2 mb-20">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 text-slate-400 disabled:opacity-30"
              >
                 <ChevronLeft size={18} />
              </button>
              {[...Array(filteredTotalPages)].map((_, i) => (
                 <button
                   key={i}
                   onClick={() => setCurrentPage(i + 1)}
                   className={`w-8 h-8 rounded-lg text-[11px] font-black transition-all ${
                     currentPage === i + 1 ? "bg-rose-600 text-white" : "text-slate-400"
                   }`}
                 >
                   {i + 1}
                 </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(filteredTotalPages, prev + 1))}
                disabled={currentPage === filteredTotalPages}
                className="p-2 text-slate-400 disabled:opacity-30"
              >
                 <ChevronRight size={18} />
              </button>
           </div>
        )}
      </div>
    );
  }

  // DESKTOP VIEW
  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Professional Management</h1>
            <div className="flex items-center gap-4">
               <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border border-rose-100">
                  {professionals.filter(p => !p.isApproved).length} PENDING APPLICATIONS
               </span>
               <span className="text-slate-400 text-xs font-bold flex items-center gap-1.5">
                  <Clock size={12} /> Live Sync Active
               </span>
            </div>
         </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-12 gap-6">
         <div className="col-span-8 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex flex-col gap-1">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Professionals</span>
               <div className="flex items-end gap-3">
                  <h2 className="text-4xl font-black text-slate-800 tracking-tight">{professionals.length}</h2>
                  <span className="text-emerald-500 text-[11px] font-black mb-1.5 flex items-center gap-1">
                     <CheckCircle size={12} /> {professionals.filter(p => p.isApproved).length} approved
                  </span>
               </div>
            </div>
            <div className="w-1/2 h-16 opacity-20">
               <div className="flex items-end gap-1 h-full justify-end">
                  {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                    <div key={i} className="w-2 bg-rose-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                   ))}
               </div>
            </div>
         </div>

         <div className="col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Now</span>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{professionals.filter(p => p.isActive).length}</h3>
         </div>

         <div className="col-span-2 bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 shadow-sm flex flex-col justify-between group cursor-pointer hover:bg-emerald-100 transition-colors">
            <span className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest">Pending Approval</span>
            <div className="flex items-center justify-between">
               <h3 className="text-3xl font-black text-emerald-700 tracking-tight">{professionals.filter(p => !p.isApproved).length}</h3>
               <span className="px-2 py-0.5 bg-emerald-700 text-white text-[9px] font-black rounded uppercase">Priority</span>
            </div>
         </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm">
         <div className="relative group w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-rose-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search professionals by name, email, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 bg-transparent pl-11 pr-4 text-[13px] font-bold text-slate-700 outline-none"
            />
         </div>
      </div>

      {/* Professional Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="bg-slate-50/30 border-b border-slate-50">
                     <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional</th>
                     <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Specialty</th>
                     <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                     <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                     <th className="text-right px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {filteredCurrentItems.map((professional) => (
                    <tr key={professional._id} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-[13px] overflow-hidden ring-2 ring-white">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${professional.name}`} alt="" className="w-full h-full object-cover" />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[13px] font-black text-slate-800 tracking-tight">{professional.name}</span>
                                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                                   <Mail size={10} /> {professional.email}
                                </span>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-5">
                          <span className="px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-tight bg-rose-50 text-rose-600">
                             {professional.specialty}
                          </span>
                       </td>
                       <td className="px-8 py-5">
                          <span className="text-[12px] font-bold text-slate-500">{professional.phone}</span>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                             <div className={`flex items-center gap-1.5 ${!professional.isApproved ? 'text-orange-500' : 'text-emerald-500'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${!professional.isApproved ? 'bg-orange-500' : 'bg-emerald-500'}`}></div>
                                <span className="text-[10px] font-black uppercase tracking-wider">{professional.isApproved ? 'Approved' : 'Pending'}</span>
                             </div>
                             <div className={`flex items-center gap-1.5 ${!professional.isActive ? 'text-rose-500' : 'text-emerald-500'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${!professional.isActive ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                                <span className="text-[10px] font-black uppercase tracking-wider">{professional.isActive ? 'Active' : 'Inactive'}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <div className="flex items-center gap-2 justify-end">
                             {!professional.isApproved && (
                                <button 
                                  onClick={() => handleApprove(professional._id)}
                                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                >
                                   <CheckCircle size={18} />
                                </button>
                             )}
                             <button 
                               onClick={() => handleToggleActive(professional._id)}
                               className={`p-2 rounded-lg transition-all ${
                                 professional.isActive 
                                   ? 'text-slate-300 hover:bg-slate-50' 
                                   : 'text-emerald-600 hover:bg-emerald-50'
                               }`}
                             >
                                <Briefcase size={18} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         {filteredTotalPages > 1 && (
            <div className="p-8 bg-slate-50/30 border-t border-slate-50 flex justify-end">
               <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-30"
                  >
                     <ChevronLeft size={18} />
                  </button>
                  {[...Array(filteredTotalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-[11px] font-black transition-all ${
                        currentPage === i + 1 ? "bg-rose-600 text-white shadow-lg shadow-rose-200" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(filteredTotalPages, prev + 1))}
                    disabled={currentPage === filteredTotalPages}
                    className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-30"
                  >
                     <ChevronRight size={18} />
                  </button>
               </div>
            </div>
         )}
      </div>
    </div>
  );
};

export default ManageProfessionalsPage;
