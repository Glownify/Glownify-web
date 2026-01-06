import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, blockUser, activateUser } from '../../redux/slice/superadminSlice';
import { 
  Search, User, Mail, Phone, Calendar, 
  ChevronLeft, ChevronRight, MoreVertical, Filter,
  ShieldCheck, UserPlus
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageUsersPage = () => {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector((state) => state.superadmin);
  
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Keeping it 9 to match your Saloons layout requirement

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

    // Optional: refresh list if backend doesn't auto-update state
    dispatch(fetchAllUsers());
  } catch (error) {
    console.error("Block user failed:", error);
  }
};


const handleActivateUser = async (userId) => {
  try {
    const activatePromise = dispatch(activateUser(userId)).unwrap();

    await toast.promise(activatePromise, {
      loading: "Activating user...",
      success: (res) => res?.message || "User activated successfully",
      error: (err) => err?.message || "Failed to activate user",
    });

    // Optional refresh
    dispatch(fetchAllUsers());
  } catch (error) {
    console.error("Activate user failed:", error);
  }
};



  // Search Logic
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic (Matches Saloons Component)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

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
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">
            Showing {filteredUsers.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} Users
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-100">
          <UserPlus size={18} /> Add New User
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">User</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                 </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-20 text-center text-slate-400 italic">No users found</td>
                </tr>
              ) : (
                currentItems.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-slate-700">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2 mb-1"><Mail size={14} className="text-slate-400"/> {user.email}</div>
                        <div className="flex items-center gap-2 text-xs text-slate-400"><Phone size={14}/> {user.phone || 'N/A'}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold capitalize ${
                        user.role === 'admin' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-center">
  {user.status === 'active' ? (
    <button
      onClick={() => handleBlockUser(user._id)}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 text-xs font-bold hover:bg-rose-100 transition"
    >
      <ShieldCheck size={14} />
      Block
    </button>
  ) : (
    <button
      onClick={() => handleActivateUser(user._id)}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold hover:bg-emerald-100 transition"
    >
      <ShieldCheck size={14} />
      Activate
    </button>
  )}
</td>
                   
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SALOON STYLE NUMBERED PAGINATION --- */}
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
    </div>
  );
};

export default ManageUsersPage;