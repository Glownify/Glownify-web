import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../redux/slice/superadminSlice";
import {
  Layers,
  Tag,
  ChevronRight,
  Info,
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  Scissors,
  Sparkles,
  Zap,
  TrendingUp,
  Settings,
  Plus,
  Trash2,
  Edit2
} from "lucide-react";
import toast from "react-hot-toast";
import useMobile from "../../hooks/useMobile";

const TABS = ["men", "women", "unisex"];

const DUMMY_CATEGORIES = [
  // MEN
  { _id: "m1", name: "Classic Haircut", gender: "men", active: true, icon: "https://cdn-icons-png.flaticon.com/512/2821/2821012.png" },
  { _id: "m2", name: "Beard Grooming", gender: "men", active: true, icon: "https://cdn-icons-png.flaticon.com/512/3248/3248383.png" },
  { _id: "m3", name: "Face Cleanup", gender: "men", active: true, icon: "https://cdn-icons-png.flaticon.com/512/2950/2950821.png" },
  { _id: "m4", name: "Hair Coloring", gender: "men", active: false, icon: "https://cdn-icons-png.flaticon.com/512/2950/2950854.png" },

  // WOMEN
  { _id: "w1", name: "Bridal Makeup", gender: "women", active: true, icon: "https://cdn-icons-png.flaticon.com/512/3209/3209144.png" },
  { _id: "w2", name: "Premium Facial", gender: "women", active: true, icon: "https://cdn-icons-png.flaticon.com/512/3209/3209088.png" },
  { _id: "w3", name: "Smooth Waxing", gender: "women", active: true, icon: "https://cdn-icons-png.flaticon.com/512/2950/2950811.png" },
  { _id: "w4", name: "Nail Art", gender: "women", active: true, icon: "https://cdn-icons-png.flaticon.com/512/2950/2950849.png" },

  // UNISEX
  { _id: "u1", name: "Therapeutic Massage", gender: "unisex", active: true, icon: "https://cdn-icons-png.flaticon.com/512/3209/3209054.png" },
  { _id: "u2", name: "Full Body Spa", gender: "unisex", active: true, icon: "https://cdn-icons-png.flaticon.com/512/3209/3209068.png" },
  { _id: "u3", name: "Aromatherapy", gender: "unisex", active: true, icon: "https://cdn-icons-png.flaticon.com/512/3209/3209112.png" },
];


const ManageCategoriesPage = () => {
  const dispatch = useDispatch();
  const isMobile = useMobile();
  const [activeTab, setActiveTab] = useState("men");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: "",
    gender: "men",
    icon: "",
  });

  const {
    categories = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.superadmin || {});

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Use dummy data if categories list is empty
  const displayCategories = categories.length > 0 ? categories : DUMMY_CATEGORIES;

  const filteredCategories = displayCategories.filter(
    (cat) => cat.gender === activeTab
  );


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const actionPromise = isEditMode
      ? dispatch(
          updateCategory({
            categoryId: editingCategoryId,
            categoryData: categoryData,
          })
        ).unwrap()
      : dispatch(addCategory(categoryData)).unwrap();

    await toast.promise(actionPromise, {
      loading: isEditMode ? "Updating category..." : "Creating category...",
      success: (res) =>
        res?.message ||
        (isEditMode
          ? "Category updated successfully!"
          : "Category created successfully!"),
      error: (err) =>
        err?.message ||
        err?.error ||
        "Operation failed. Please try again.",
    });

    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingCategoryId(null);
    setCategoryData({ name: "", gender: "men", icon: "" });

    // Optional refresh if slice doesn't auto-update
    dispatch(fetchAllCategories());
  } catch (error) {
    console.error("Category submit error:", error);
  }
};


  const handleEditCategory = (category) => {
    setIsEditMode(true);
    setEditingCategoryId(category._id);
    setCategoryData({
      name: category.name,
      gender: category.gender,
      icon: category.icon || "",
    });
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    try {
      await toast.promise(dispatch(deleteCategory(categoryId)).unwrap(), {
        loading: "Deleting category...",
        success: "Category removed from taxonomy",
        error: (err) => err?.message || "Failed to delete category",
      });
    } catch (err) {
      console.error(err);
    }
  };


  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-600 border-t-transparent"></div>
      </div>
    );

  // ── DESKTOP VIEW: CLASSIFICATION HUB ───────────────────────────────────────
  if (!isMobile) {
    return (
      <div className="space-y-12 animate-in fade-in duration-500 pb-20">
        {/* Header Section */}
        <div className="flex items-end justify-between">
           <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-rose-600">Taxonomy Manager</span>
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">Service Classifications</h1>
           </div>
           
           <button
             onClick={() => {
                setIsEditMode(false);
                setCategoryData({ name: "", gender: activeTab, icon: "" });
                setIsModalOpen(true);
             }}
             className="px-8 py-4 bg-rose-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all active:scale-95 shadow-lg shadow-rose-200"
           >
              New Classification
           </button>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
           {/* Sidebar Filter & Stats */}
           <div className="col-span-3 space-y-6">
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Market Segment</h3>
                 <div className="space-y-2">
                    {TABS.map(tab => (
                       <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                             activeTab === tab 
                             ? "bg-rose-50 text-rose-600 shadow-sm border border-rose-100/50" 
                             : "text-slate-500 hover:bg-slate-50"
                          }`}
                       >
                          <span className="capitalize">{tab}</span>
                          <span className={`px-2 py-0.5 rounded-md text-[9px] ${activeTab === tab ? "bg-rose-200/50" : "bg-slate-100"}`}>
                             {displayCategories.filter(c => c.gender === tab).length}
                          </span>

                       </button>
                    ))}
                 </div>
              </div>

              <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Global Coverage</h4>
                 <div className="text-3xl font-black mb-4">{displayCategories.length}</div>

                 <p className="text-[11px] font-medium opacity-50 leading-relaxed">
                    Active categories across all gender segments and service types.
                 </p>
              </div>
           </div>

           {/* Classification Grid */}
           <div className="col-span-9">
              <div className="grid grid-cols-3 gap-6">
                 {filteredCategories.map((category) => (
                    <div
                       key={category._id}
                       className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-rose-100 transition-all relative overflow-hidden"
                    >
                       <div className="flex items-start justify-between relative z-10">
                          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 transition-colors group-hover:bg-rose-50 group-hover:border-rose-100">
                             {category.icon ? (
                                <img src={category.icon} alt="" className="w-8 h-8 object-contain opacity-70 group-hover:opacity-100" />
                             ) : (
                                <Tag className="text-slate-300 group-hover:text-rose-500" size={24} />
                             )}
                          </div>
                          
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                             <button
                                onClick={() => handleEditCategory(category)}
                                className="p-2 bg-slate-50 hover:bg-rose-100 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                             >
                                <Edit2 size={14} />
                             </button>
                             <button
                                onClick={() => handleDeleteCategory(category._id)}
                                className="p-2 bg-slate-50 hover:bg-red-100 text-slate-400 hover:text-red-600 rounded-lg transition-all"
                             >
                                <Trash2 size={14} />
                             </button>
                          </div>

                       </div>

                       <div className="mt-8 relative z-10">
                          <h3 className="text-lg font-black text-slate-800 tracking-tight transition-colors group-hover:text-rose-600">{category.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                             <div className={`w-1.5 h-1.5 rounded-full ${category.active ? "bg-emerald-500" : "bg-slate-300"}`}></div>
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                {category.active ? "Active Stream" : "Disabled"}
                             </span>
                          </div>
                       </div>

                       {/* Decorative Gradient Overlay */}
                       <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-rose-50 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    </div>
                 ))}
                 
                 {/* Empty State / Quick Add */}
                 <button 
                   onClick={() => setIsModalOpen(true)}
                   className="rounded-[2rem] border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center gap-4 hover:border-rose-300 hover:bg-rose-50/20 transition-all text-slate-400 hover:text-rose-500 group"
                 >
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                       <Plus size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-inherit">Add Category</span>
                 </button>
              </div>
           </div>
        </div>

        {/* --- MODAL (Shared with Mobile but Styled) --- */}
        {renderModal()}
      </div>
    );
  }

  // Helper for Modal Styling consistency
  function renderModal() {
    if (!isModalOpen) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-slate-100">
          <div className="flex items-center justify-between p-8 border-b border-slate-50">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                {isEditMode ? "Edit Segment" : "New Classification"}
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Classification details</p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Classification Name</label>
              <input
                type="text"
                name="name"
                required
                value={categoryData.name}
                onChange={handleInputChange}
                placeholder="e.g. Couture Haircut"
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-rose-50 focus:border-rose-200 outline-none transition-all placeholder:text-slate-300 font-bold text-slate-700"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Segment Layer</label>
              <div className="grid grid-cols-3 gap-3">
                 {TABS.map(tab => (
                    <button
                       key={tab}
                       type="button"
                       onClick={() => setCategoryData(p => ({ ...p, gender: tab }))}
                       className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          categoryData.gender === tab 
                          ? "bg-rose-600 text-white shadow-lg shadow-rose-100" 
                          : "bg-slate-50 text-slate-400 border border-slate-100"
                       }`}
                    >
                       {tab}
                    </button>
                 ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Visual Icon (External Link)</label>
              <div className="relative">
                 <input
                   type="text"
                   name="icon"
                   required
                   value={categoryData.icon}
                   onChange={handleInputChange}
                   placeholder="https://cdn.example.com/icon.svg"
                   className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-rose-50 focus:border-rose-200 outline-none transition-all placeholder:text-slate-300 font-bold text-slate-700 text-xs"
                 />
                 <Upload size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-95 mt-4"
            >
              {isEditMode ? "Commit Changes" : "Deploy Classification"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── MOBILE VIEW ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 font-sans">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[10px] uppercase font-black tracking-widest text-rose-600">Taxonomy Manager</span>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight mt-1">
          Segments
        </h1>
        <p className="text-slate-500 text-sm font-medium mt-1">
          Service classifications hub
        </p>
      </div>

      <button
        onClick={() => {
           setIsEditMode(false);
           setCategoryData({ name: "", gender: activeTab, icon: "" });
           setIsModalOpen(true);
        }}
        className="bg-slate-900 text-white w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 mb-8 active:scale-95"
      >
        <Plus size={18} />
        New Classification
      </button>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-200/40 rounded-2xl mb-8 border border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
              activeTab === tab
                ? "bg-white text-rose-600 shadow-sm"
                : "text-slate-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="space-y-4 mb-20">
        {filteredCategories.map((category) => (
          <div
            key={category._id}
            className="group bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between relative overflow-hidden active:bg-slate-50"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden group-active:bg-rose-50 group-active:border-rose-100 transition-colors">
                {category.icon ? (
                  <img src={category.icon} alt="" className="h-8 w-8 object-contain opacity-70" />
                ) : (
                  <Tag className="text-slate-300" size={20} />
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="font-black text-slate-800 text-[14px]">{category.name}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <div className={`w-1.5 h-1.5 rounded-full ${category.active ? "bg-emerald-500" : "bg-slate-300"}`}></div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                     {category.active ? "Active" : "Inactive"}
                   </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 relative z-10">
               <button
                  onClick={() => handleEditCategory(category)}
                  className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 active:bg-rose-50 active:text-rose-600"
               >
                 <Edit2 size={16} />
               </button>
               <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="w-10 h-10 rounded-xl bg-slate-50 text-red-400 flex items-center justify-center border border-slate-100 active:bg-red-100"
               >
                 <Trash2 size={16} />
               </button>
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
           <div className="py-20 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 rounded-[2rem]">
              <Tag size={48} className="opacity-20 mb-2" />
              <p className="font-black text-[10px] uppercase tracking-widest opacity-40">No segments deployed</p>
           </div>
        )}
      </div>

      {renderModal()}
    </div>
  );

};

export default ManageCategoriesPage;
