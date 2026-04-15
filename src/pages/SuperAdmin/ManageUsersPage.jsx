import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, blockUser, activateUser } from '../../redux/slice/superadminSlice';
import { 
  Search, User, Mail, Phone, Calendar, 
  ChevronLeft, ChevronRight, MoreVertical, Filter,
  ShieldCheck, UserPlus, TrendingUp, MapPin, Briefcase, Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import useMobile from '../../hooks/useMobile';

const ManageUsersPage = () => {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector((state) => state.superadmin || {});
  
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  const isMobile = useMobile();

  const [activeRole, setActiveRole] = useState("All Roles");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleBlockUser = async (userId) => {
    try {
      const blockPromise = dispatch(blockUser(userId)).unwrap();
      await toast.promise(blockPromise, {
        loading: "Blocking user...",
        success: (res) => res?.message || "User blocked successfully",
        error: (err) => err?.message || "Failed to block user",
      });
      dispatch(fetchAllUsers());
    } catch (error) {
      console.error("Block user failed:", error);
    }
  };

  const dummyUsers = [
    { _id: '1', name: 'Elena Rodriguez', email: 'elena.r@glownify.com', role: 'Owner', status: 'active', region: 'North America' },
    { _id: '2', name: 'Marcus Chen', email: 'marcus.c@fieldops.io', role: 'Sales', status: 'active', region: 'APAC' },
    { _id: '3', name: 'Sarah Jenkins', email: 's.jenkins@styledirect.net', role: 'Pro', status: 'suspended', region: 'Europe' },
    { _id: '4', name: 'David Wilson', email: 'dwilson@gmail.com', role: 'Customer', status: 'active', region: 'North America' },
    { _id: '5', name: 'Aisha Khan', email: 'aisha.k@salonsync.com', role: 'Owner', status: 'active', region: 'Middle East' },
    { _id: '6', name: 'Tariq Ahmed', email: 't.ahmed@luxebarbers.com', role: 'Pro', status: 'active', region: 'APAC' },
  ];

  const displayUsers = users.length > 0 ? users : dummyUsers;

  const filteredUsers = displayUsers.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = activeRole === "All Roles" || user.role?.toLowerCase() === activeRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-600 border-t-transparent"></div>
    </div>
  );

  // ── MOBILE VIEW ─────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 font-sans">
        <div className="mb-8">
           <span className="text-[10px] uppercase font-black tracking-widest text-rose-600">Platform Custodian</span>
           <h1 className="text-3xl font-black text-slate-800 tracking-tight mt-1">Users</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Manage platform participants</p>
        </div>

        {/* Search & Filter Mini */}
        <div className="flex gap-2 mb-8">
           <div className="flex-1 bg-white h-12 rounded-2xl border border-slate-100 flex items-center px-4 shadow-sm">
              <Search size={16} className="text-slate-300 mr-2" />
              <input 
                type="text" 
                placeholder="Find users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 outline-none w-full" 
              />
           </div>
           <button className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm">
              <Filter size={18} />
           </button>
        </div>

        {/* User List */}
        <div className="space-y-4 mb-20">
           {currentItems.map((user) => (
             <div key={user._id} className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shadow-inner">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="" />
                      </div>
                      <div className="flex flex-col">
                         <h3 className="font-black text-slate-800 text-sm leading-tight">{user.name}</h3>
                         <span className="text-[10px] font-bold text-slate-400 truncate max-w-[140px]">{user.email}</span>
                      </div>
                   </div>
                   <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                      user.role === 'admin' ? 'bg-orange-50 text-orange-600' : 'bg-rose-50 text-rose-600'
                   }`}>
                      {user.role}
                   </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <div className={`flex items-center gap-1.5 ${user.status === 'suspended' ? 'text-rose-500' : 'text-emerald-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'suspended' ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                      <span className="text-[9px] font-black uppercase tracking-widest">{user.status}</span>
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => handleBlockUser(user._id)} className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 active:bg-rose-50 active:text-rose-600 transition-colors">
                         <ShieldCheck size={16} />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      
      {/* ── Top Stats Area ── */}
      <div className="grid grid-cols-12 gap-6">
         <div className="col-span-8 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex flex-col gap-1">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Platform Users</span>
               <div className="flex items-end gap-3">
                  <h2 className="text-4xl font-black text-slate-800 tracking-tight">12,482</h2>
                  <span className="text-emerald-500 text-[11px] font-black mb-1.5 flex items-center gap-1">
                     <TrendingUp size={12} /> +14% from last month
                  </span>
               </div>
            </div>
            <div className="w-1/2 h-16 opacity-20">
               {/* Tiny Chart Placeholder */}
               <div className="flex items-end gap-1 h-full justify-end">
                  {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                    <div key={i} className="w-2 bg-rose-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                   ))}
               </div>
            </div>
         </div>

         <div className="col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Now</span>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">1,204</h3>
         </div>

         <div className="col-span-2 bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 shadow-sm flex flex-col justify-between group cursor-pointer hover:bg-emerald-100 transition-colors">
            <span className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest">Pending Approval</span>
            <div className="flex items-center justify-between">
               <h3 className="text-3xl font-black text-emerald-700 tracking-tight">42</h3>
               <span className="px-2 py-0.5 bg-emerald-700 text-white text-[9px] font-black rounded uppercase">Priority</span>
            </div>
         </div>
      </div>

      {/* ── Filters Bar ── */}
      <div className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm flex items-center justify-between">
         <div className="flex items-center gap-2">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-4">Role Type</span>
            <div className="flex items-center gap-1 p-1 bg-slate-50 rounded-xl border border-slate-100">
               {["All Roles", "Customer", "Owner", "Pro", "Sales"].map(role => (
                 <button 
                   key={role}
                   onClick={() => setActiveRole(role)}
                   className={`px-5 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
                     activeRole === role ? "bg-rose-500 text-white shadow-lg shadow-rose-200" : "text-slate-400 hover:text-slate-600"
                   }`}
                 >
                   {role}
                 </button>
               ))}
            </div>
         </div>

         <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 border-r border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
               <select className="bg-transparent text-[12px] font-bold text-slate-700 outline-none cursor-pointer">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Suspended</option>
               </select>
            </div>
            <div className="flex items-center gap-2 px-4 py-2">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Region</span>
               <select className="bg-transparent text-[12px] font-bold text-slate-700 outline-none cursor-pointer">
                  <option>Global</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>APAC</option>
               </select>
            </div>
            <button className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 border border-slate-100 transition-colors">
               <Filter size={16} />
            </button>
         </div>
      </div>

      {/* ── User Table ── */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div className="relative group w-full max-w-sm">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-rose-500 transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search platform users by name, email, or ID..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full h-11 bg-transparent pl-11 pr-4 text-[13px] font-bold text-slate-700 outline-none"
               />
            </div>
            <div className="text-[11px] font-bold text-slate-400">
               Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} users
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="bg-slate-50/30 border-b border-slate-50">
                     <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Identity</th>
                     <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                     <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Region</th>
                     <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                     <th className="text-right px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {currentItems.map((user) => (
                    <tr key={user._id} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-[13px] overflow-hidden ring-2 ring-white">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="" className="w-full h-full object-cover" />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[13px] font-black text-slate-800 tracking-tight">{user.name}</span>
                                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                                   <Mail size={10} /> {user.email}
                                </span>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-5">
                          <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-tight ${
                             user.role === 'admin' ? 'bg-orange-50 text-orange-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                             {user.role}
                          </span>
                       </td>
                       <td className="px-8 py-5">
                          <span className="text-[12px] font-bold text-slate-500">{user.region || 'Global'}</span>
                       </td>
                       <td className="px-8 py-5">
                          <div className={`flex items-center gap-1.5 ${user.status === 'suspended' ? 'text-rose-500' : 'text-emerald-500'}`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'suspended' ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                             <span className="text-[10px] font-black uppercase tracking-wider">{user.status || 'Active'}</span>
                          </div>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <button 
                            onClick={() => handleBlockUser(user._id)}
                            className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                          >
                             <ShieldCheck size={18} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         <div className="p-8 bg-slate-50/30 border-t border-slate-50 flex justify-end">
            <div className="flex items-center gap-2">
               <button 
                 onClick={() => handlePageChange(currentPage - 1)}
                 disabled={currentPage === 1}
                 className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-30"
               >
                  <ChevronLeft size={18} />
               </button>
               {[...Array(totalPages)].map((_, i) => (
                 <button
                   key={i}
                   onClick={() => handlePageChange(i + 1)}
                   className={`w-8 h-8 rounded-lg text-[11px] font-black transition-all ${
                     currentPage === i + 1 ? "bg-rose-600 text-white shadow-lg shadow-rose-200" : "text-slate-400 hover:text-slate-600"
                   }`}
                 >
                   {i + 1}
                 </button>
               ))}
               <button 
                 onClick={() => handlePageChange(currentPage + 1)}
                 disabled={currentPage === totalPages}
                 className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-30"
               >
                  <ChevronRight size={18} />
               </button>
            </div>
         </div>
      </div>

      {/* ── Bottom Cards ── */}
      <div className="grid grid-cols-3 gap-8 pt-4">
         <InfoCard 
            icon={<MapPin size={24} className="text-rose-500" />}
            title="Role Management Policy"
            desc="Ensure role changes are logged and verified by departmental leads. Unauthorized role escalations are automatically flagged by security."
         />
         <InfoCard 
            icon={<Briefcase size={24} className="text-teal-500" />}
            title="Bulk Action Center"
            desc="Need to modify 100+ users? Use our bulk CSV uploader to sync statuses and roles across multiple regions simultaneously."
         />
         <InfoCard 
            icon={<Mail size={24} className="text-rose-500" />}
            title="System Assistance"
            desc="Contact platform support for password recovery escalations or account restoration requests older than 30 days."
            isUrgent
         />
      </div>

    </div>
  );
};

const InfoCard = ({ icon, title, desc, isUrgent }) => (
  <div className="bg-white rounded-[2rem] p-8 border border-slate-50 shadow-sm relative group hover:shadow-lg transition-all">
     <div className="mb-6">{icon}</div>
     <h4 className="text-[15px] font-black text-slate-800 tracking-tight lg:mb-3">{title}</h4>
     <p className="text-[12px] font-medium text-slate-400 leading-relaxed">{desc}</p>
     {isUrgent && (
       <button className="absolute bottom-8 right-8 w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-200 hover:-translate-y-1 transition-all">
          <Users size={20} />
       </button>
     )}
  </div>
);

export default ManageUsersPage;