import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  Users,
  Search,
  Plus,
  MoreVertical,
  Briefcase,
  Globe,
  TrendingUp,
  UserPlus2,
  Bell,
  Settings as SettingsIcon,
  Search as SearchIcon
} from "lucide-react";
import {
  createSalesman,
  fetchAllSalesman,
} from "../../redux/slice/salesexecutiveSlice";

const ManageSalesman = () => {
  const dispatch = useDispatch();
  const { salesman = [], loading } = useSelector((state) => state.salesexecutive);
  const user = useSelector((state) => state.auth.user);

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

  const filteredSalesman = salesman.filter(
    (item) =>
      item.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.referralId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mockData = Array.from({ length: 13 }).map((_, i) => ({
    _id: `mock-${i}`,
    user: {
      name: [
        "Marcus Reed", "Elena Rodriguez", "Jordan Kim", "Sarah Jenkins", 
        "Alex Thompson", "Priya Sharma", "Liam O'Connor", "Chen Wei",
        "Sofia Martinez", "James Wilson", "Amara Okafor", "Hiroshi Tanaka", "Isabella Rossi"
      ][i % 13],
      email: "exec@glownify.com"
    },
    referralId: `GL-EX-${100 + i}`,
    commissionRate: 15 + (i * 2)
  }));

  const displayData = filteredSalesman.length > 0 ? filteredSalesman : mockData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.roleDetails?.city) {
      toast.error("City not found for logged-in user");
      return;
    }
    const payload = { ...formData, city: user.roleDetails.city, commissionRate: Number(formData.commissionRate) };
    try {
      const createPromise = dispatch(createSalesman(payload)).unwrap();
      await toast.promise(createPromise, {
        loading: "Creating salesman...",
        success: (res) => res?.message || "Salesman created successfully!",
        error: (err) => err?.message || err?.error || "Failed to create salesman",
      });
      setOpenCreate(false);
      setFormData({ name: "", email: "", mobile: "", commissionRate: "" });
    } catch (error) { console.error(error); }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-10">
      {/* Header & Main Stats */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Team Directory
          </h1>
          <p className="max-w-md text-slate-500 font-bold leading-relaxed">
            Oversee and manage the global sales force performance metrics in real-time.
          </p>
        </div>

        <div className="flex items-center gap-4">
             <div className="px-10 py-6 rounded-[32px] bg-white shadow-sm border border-slate-50 flex flex-col items-center">
                <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest mb-1">Total Active</span>
                <span className="text-3xl font-black text-slate-900">{displayData.length}</span>
             </div>
             <div className="px-10 py-6 rounded-[32px] bg-white shadow-sm border border-slate-50 flex flex-col items-center">
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Top Performers</span>
                <div className="flex items-center gap-2">
                   <span className="text-3xl font-black text-slate-900">28</span>
                   <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 text-[10px] font-black">+4%</span>
                </div>
             </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Salesman Cards */}
        {displayData.map((item, index) => (
          <div key={item._id} className="group relative overflow-hidden rounded-[40px] border border-white/80 bg-white/70 backdrop-blur-md p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
             <div className="flex items-start justify-between mb-6">
                <div className="relative">
                   <img 
                     src={`https://i.pravatar.cc/150?u=${item._id}`} 
                     className="w-20 h-20 rounded-3xl object-cover shadow-lg grayscale group-hover:grayscale-0 transition-all duration-500" 
                     alt={item.user?.name} 
                   />
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${index % 5 === 4 ? 'bg-slate-100 text-slate-400' : 'bg-teal-400 text-white'}`}>
                   {index % 5 === 4 ? 'OUT OF OFFICE' : 'ACTIVE'}
                </span>
             </div>

             <div className="mb-8">
                <h3 className="text-xl font-black text-slate-800 tracking-tight truncate">{item.user?.name}</h3>
                <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                   {['North America Region', 'European Markets', 'Asia Pacific', 'Middle East & Africa', 'Latin America'][index % 5]}
                </p>
             </div>

             <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Target Progress</span>
                    <span className="text-rose-500">{95 - (index * 4)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500" style={{ width: `${95 - (index * 4)}%` }} />
                </div>
             </div>

             <button className="w-full py-4 rounded-2xl bg-slate-100 text-[#1a0b3a]/40 text-xs font-black uppercase tracking-widest hover:bg-[#8B5CF6] hover:text-white transition-all shadow-sm">
                View Profile
             </button>
          </div>
        ))}

        {/* Add Executive Card */}
        <button 
          onClick={() => setOpenCreate(true)}
          className="rounded-[40px] border-2 border-dashed border-rose-200 bg-white/40 p-8 flex flex-col items-center justify-center gap-4 transition-all hover:bg-white hover:border-rose-500 group min-h-[400px]"
        >
           <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 transition-all">
              <UserPlus2 size={24} />
           </div>
           <div className="text-center">
              <h4 className="text-lg font-black text-slate-800 mb-1">Add Executive</h4>
              <p className="text-xs font-bold text-slate-400">Expand your team roster</p>
           </div>
        </button>
      </div>

      {/* Create Modal - Reused logic from old version but styled premium */}
      {openCreate && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-lg rounded-[40px] bg-white p-10 shadow-2xl animate-in zoom-in duration-300">
               <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Add Executive</h2>
                  <button onClick={() => setOpenCreate(false)} className="text-slate-300 hover:text-slate-600 transition-colors">
                     <Plus size={32} className="rotate-45" />
                  </button>
               </div>
               <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</p>
                     <input name="name" value={formData.name} onChange={handleChange} className="w-full h-15 rounded-2xl border border-slate-100 bg-slate-50 px-6 font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-rose-500/5 transition-all outline-none" placeholder="Enter executive name..." />
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</p>
                     <input name="email" value={formData.email} onChange={handleChange} className="w-full h-15 rounded-2xl border border-slate-100 bg-slate-50 px-6 font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-rose-500/5 transition-all outline-none" placeholder="email@company.com" />
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Commission Rate (%)</p>
                     <input name="commissionRate" type="number" value={formData.commissionRate} onChange={handleChange} className="w-full h-15 rounded-2xl border border-slate-100 bg-slate-50 px-6 font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-rose-500/5 transition-all outline-none" placeholder="15" />
                  </div>
                  <button type="submit" className="w-full h-16 mt-8 rounded-2xl bg-[#8B5CF6] text-white font-black shadow-xl shadow-purple-500/20 hover:-translate-y-1 transition-all active:scale-95">
                     Onboard Executive
                  </button>
               </form>
            </div>
         </div>
      )}
    </div>
  );
};

export default memo(ManageSalesman);
