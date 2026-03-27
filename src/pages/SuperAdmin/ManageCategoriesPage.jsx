import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCategories,
  addCategory,
  updateCategory,
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
  Plus
} from "lucide-react";
import toast from "react-hot-toast";
import useMobile from "../../hooks/useMobile";

const TABS = ["men", "women", "unisex"];

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

  const filteredCategories = categories.filter(
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
                             {categories.filter(c => c.gender === tab).length}
                          </span>
                       </button>
                    ))}
                 </div>
              </div>

              <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Global Coverage</h4>
                 <div className="text-3xl font-black mb-4">{categories.length}</div>
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
                          
                          <button
                             onClick={() => handleEditCategory(category)}
                             className="p-2 opacity-0 group-hover:opacity-100 bg-slate-50 hover:bg-rose-100 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                          >
                             <Info size={16} />
                          </button>
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
    <div className="min-h-screen bg-slate-50/50 p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Categories
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage service segments
          </p>
        </div>
        <button
          onClick={() => {
             setIsEditMode(false);
             setCategoryData({ name: "", gender: activeTab, icon: "" });
             setIsModalOpen(true);
          }}
          className="bg-rose-600 hover:bg-rose-700 text-white w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-rose-100 flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add New
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-bold border border-red-100">
           {error.message || error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex p-1 bg-slate-200/50 rounded-2xl mb-8 border border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-6 py-3 rounded-xl text-xs font-black capitalize transition-all duration-200 ${
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
      <div className="grid grid-cols-1 gap-4">
        {filteredCategories.map((category) => (
          <div
            key={category._id}
            className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                {category.icon ? (
                  <img src={category.icon} alt="" className="h-8 w-8 object-contain opacity-70" />
                ) : (
                  <Tag className="text-slate-300" size={20} />
                )}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{category.name}</h3>
                <span className={`text-[9px] font-black uppercase tracking-widest ${category.active ? "text-rose-500" : "text-slate-300"}`}>
                  {category.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <button
               onClick={() => handleEditCategory(category)}
               className="p-3 rounded-xl bg-slate-50 text-slate-400"
            >
              <Info size={18} />
            </button>
          </div>
        ))}
      </div>

      {renderModal()}
    </div>
  );
};

export default ManageCategoriesPage;
