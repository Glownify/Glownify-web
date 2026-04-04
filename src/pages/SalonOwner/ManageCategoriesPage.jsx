import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Plus, 
  ChevronRight, 
  Trash2, 
  Edit3, 
  Scissors, 
  Droplets, 
  Sparkle, 
  Wind, 
  Palette,
  Layers,
  ChevronDown,
  Info,
  CheckCircle2,
  X
} from "lucide-react";
import { toast } from "react-hot-toast";
import useMobile from "../../hooks/useMobile";
import MobileManageCategoriesScreen from "./Mobile/MobileManageCategoriesScreen";

const ManageCategoriesPage = () => {
  const isMobile = useMobile();
  const [categories, setCategories] = useState([
    {
      _id: "1",
      name: "Hair Styling & Cut",
      description: "Precision cutting, styling, and structural treatments for all hair types.",
      icon: Scissors,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-50",
      gender: "unisex",
      subcategories: ["Men's Cut", "Women's Styling", "Kids Corner"],
      itemCount: 24
    },
    {
      _id: "2",
      name: "Skin & Esthetics",
      description: "Rejuvenating facials, therapeutic massages, and skin revitalization.",
      icon: Droplets,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      gender: "women",
      subcategories: ["Organic Facials", "Hydra-Treatment", "Chemical Peels"],
      itemCount: 18
    },
    {
      _id: "3",
      name: "Artisanal Nails",
      description: "Complete nail architecture including gel extensions and nail art.",
      icon: Palette,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
      gender: "unisex",
      subcategories: ["Manicure Elite", "Pedicure Luxe", "Gel Art"],
      itemCount: 12
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  if (isMobile) {
    return <MobileManageCategoriesScreen />;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(c => c._id !== id));
      toast.success("Category removed successfully");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#E91E63]">
             <span>Inventory Architecture</span>
             <span className="w-1 h-1 rounded-full bg-rose-200"></span>
             <span>Category Engine</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Service Categories
          </h1>
        </div>

        <button 
          onClick={() => { setEditingCategory(null); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-[15px] transition-all shadow-xl shadow-slate-200 hover:-translate-y-1 active:scale-95"
        >
          <Plus size={20} className="stroke-[3]" />
          <span>New Category</span>
        </button>
      </div>

      {/* ── CATEGORY GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category._id} className="group relative bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm transition-all hover:shadow-2xl hover:shadow-rose-500/5 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
            <div className="flex items-start justify-between mb-8">
              <div className={`p-5 rounded-3xl ${category.bgColor} transition-transform group-hover:scale-110 duration-500`}>
                <category.icon className={category.iconColor} size={28} />
              </div>
              <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => { setEditingCategory(category); setIsModalOpen(true); }}
                  className="p-2 text-slate-400 hover:text-[#E91E63] transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(category._id)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center gap-3">
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight">{category.name}</h3>
                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${category.gender === 'unisex' ? 'bg-purple-100 text-purple-600' : 'bg-rose-100 text-rose-600'}`}>
                   {category.gender}
                 </span>
              </div>
              <p className="text-sm font-medium text-slate-500 leading-relaxed opacity-80 uppercase tracking-tighter">
                {category.description}
              </p>
            </div>

            <div className="pt-8 border-t border-slate-50 mt-auto">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory Depth</span>
                  <span className="text-sm font-black text-slate-900">{category.itemCount} Active Services</span>
               </div>
               
               <div className="flex flex-wrap gap-2">
                 {category.subcategories.map((sub, i) => (
                   <span key={i} className="px-3.5 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-[11px] font-bold border border-slate-100 flex items-center gap-2 group/sub cursor-default hover:bg-white hover:border-[#E91E63]/30 transition-all">
                     {sub}
                     <button className="opacity-0 group-hover/sub:opacity-100 transition-opacity text-slate-300 hover:text-rose-500">
                       <X size={12} />
                     </button>
                   </span>
                 ))}
                 <button className="w-8 h-8 rounded-full border border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#E91E63] hover:border-[#E91E63] transition-all">
                   <Plus size={14} />
                 </button>
               </div>
            </div>

            <div className="absolute top-0 right-0 p-8 text-slate-50 pointer-events-none group-hover:text-rose-50 transition-colors">
               <Layers size={80} strokeWidth={1} />
            </div>
          </div>
        ))}

        {/* ── EMPTY ADD STATE ── */}
        <button 
          onClick={() => { setEditingCategory(null); setIsModalOpen(true); }}
          className="group relative border-2 border-dashed border-slate-100 rounded-[40px] p-8 flex flex-col items-center justify-center text-center space-y-6 hover:border-[#E91E63]/30 hover:bg-rose-50/10 transition-all min-h-[400px]"
        >
          <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:bg-[#E91E63]/10 group-hover:text-[#E91E63] transition-all duration-500">
            <Plus size={32} className="stroke-[3]" />
          </div>
          <div>
            <h4 className="text-xl font-black text-slate-800 tracking-tight">Expand Architecture</h4>
            <p className="text-sm font-bold text-slate-400 mt-2 max-w-[200px]">Define a new service category for your salon menu.</p>
          </div>
        </button>
      </div>

      {/* ── MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-10 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {editingCategory ? "Update Structure" : "Establish Category"}
                  </h2>
                  <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest text-[10px]">Architecture Design</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-100 hover:text-rose-600 transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Category Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Therapeutic Spa"
                    className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20 focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Gender Affinity</label>
                    <select className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:bg-white appearance-none transition-all">
                      <option>Unisex</option>
                      <option>Women Only</option>
                      <option>Men Only</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Icon Identity</label>
                    <div className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between cursor-pointer">
                      <Scissors size={20} className="text-slate-400" />
                      <ChevronDown size={14} className="text-slate-300" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Architecture Description</label>
                  <textarea 
                    rows={3}
                    placeholder="Briefly describe the focus of this category..."
                    className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:bg-white transition-all resize-none"
                  />
                </div>
              </div>

              <button 
                onClick={() => { setIsModalOpen(false); toast.success("Configuration saved"); }}
                className="w-full bg-[#E91E63] text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-rose-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <CheckCircle2 size={24} className="stroke-[3]" />
                <span>Save Configuration</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategoriesPage;
