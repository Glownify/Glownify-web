import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Plus, 
  ChevronRight, 
  Trash2, 
  Edit3, 
  Gift, 
  Clock, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  ChevronDown,
  Info,
  CheckCircle2,
  X,
  Package,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { toast } from "react-hot-toast";
import useMobile from "../../hooks/useMobile";
import MobileComboPackagesScreen from "./Mobile/MobileComboPackagesScreen";

const ComboPackagesPage = () => {
  const isMobile = useMobile();
  const [combos, setCombos] = useState([
    {
      _id: "1",
      name: "Bridal Glow Elite",
      description: "Comprehensive bridal preparation: Facial + Hair + Makeup + Nails.",
      originalPrice: 8500,
      comboPrice: 6999,
      discount: 18,
      duration: "240 mins",
      services: ["Bridal Makeup", "Gold Facial", "French Nails", "Hair Spa"],
      color: "bg-rose-500",
      lightColor: "bg-rose-50"
    },
    {
      _id: "2",
      name: "Weekend Detox",
      description: "Total relaxation package for a stress-free weekend experience.",
      originalPrice: 4200,
      comboPrice: 3500,
      discount: 17,
      duration: "120 mins",
      services: ["Aroma Massage", "Herbal Scrub", "Head Massage"],
      color: "bg-blue-500",
      lightColor: "bg-blue-50"
    },
    {
      _id: "3",
      name: "Gentleman's Signature",
      description: "Our signature professional look for the modern gentleman.",
      originalPrice: 1500,
      comboPrice: 1200,
      discount: 20,
      duration: "60 mins",
      services: ["Executive Cut", "Beard Sculpting", "Hair Wash"],
      color: "bg-slate-900",
      lightColor: "bg-slate-50"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState(null);

  if (isMobile) {
    return <MobileComboPackagesScreen />;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this combo?")) {
      setCombos(combos.filter(c => c._id !== id));
      toast.success("Combo removed successfully");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-500">
             <span>Package Optimization</span>
             <span className="w-1 h-1 rounded-full bg-rose-200"></span>
             <span>Combo Engine</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-800">
            Combo Packages
          </h1>
        </div>

        <button 
          onClick={() => { setEditingCombo(null); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-2 bg-[#E91E63] text-white px-8 py-3.5 rounded-2xl font-bold text-[15px] transition-all shadow-xl shadow-rose-200 hover:-translate-y-1 active:scale-95"
        >
          <Plus size={20} className="stroke-[3]" />
          <span>New Combo</span>
        </button>
      </div>

      {/* ── COMBO GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {combos.map((combo) => (
          <div key={combo._id} className="group relative bg-white border border-slate-100 rounded-[40px] p-1 shadow-sm transition-all hover:shadow-2xl hover:shadow-rose-500/5 hover:-translate-y-1 overflow-hidden flex flex-col h-full">
            <div className={`h-40 ${combo.color} rounded-[36px] p-8 flex items-end justify-between relative overflow-hidden transition-all duration-700 group-hover:scale-[0.98]`}>
               <div className="relative z-10 space-y-1 text-white">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-70 italic font-serif">Premium Experience</p>
                 <h3 className="text-2xl font-black tracking-tight">{combo.name}</h3>
               </div>
               <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-xl">
                 <Package size={28} className="transition-transform group-hover:scale-110 duration-700" />
               </div>
               <div className="absolute top-[-30%] right-[-10%] w-60 h-60 rounded-full bg-white/5 group-hover:scale-125 transition-transform duration-1000" />
            </div>

            <div className="p-8 space-y-8 flex-grow">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Archival Value</p>
                     <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-slate-900 tracking-tight">₹ {combo.comboPrice}</span>
                        <span className="text-sm font-bold text-slate-400 line-through opacity-60">₹ {combo.originalPrice}</span>
                     </div>
                  </div>
                  <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-100 animate-pulse">
                     <TrendingUp size={12} />
                     {combo.discount}% SAVING
                  </div>
               </div>

               <p className="text-sm font-medium text-slate-500 leading-relaxed opacity-80 uppercase tracking-tighter">
                 {combo.description}
               </p>

               <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Composition</span>
                  <div className="flex flex-wrap gap-2">
                    {combo.services.map((service, i) => (
                      <span key={i} className="px-3.5 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-[11px] font-bold border border-slate-100 group/sub cursor-default hover:bg-white hover:border-rose-500/20 transition-all">
                        {service}
                      </span>
                    ))}
                  </div>
               </div>
            </div>

            <div className="p-8 pt-0 mt-auto">
               <button className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-[#E91E63]/10 group-hover:text-[#E91E63] group-hover:border-[#E91E63]/30 transition-all duration-300">
                  <Clock size={14} /> Total Duration: {combo.duration}
               </button>
               
               <div className="flex items-center gap-3 mt-4">
                  <button 
                    onClick={() => { setEditingCombo(combo); setIsModalOpen(true); }}
                    className="flex-1 h-12 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:-translate-y-1 transition-all"
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handleDelete(combo._id)}
                    className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
               </div>
            </div>
          </div>
        ))}

        {/* ── EMPTY ADD STATE ── */}
        <button 
          onClick={() => { setEditingCombo(null); setIsModalOpen(true); }}
          className="group relative border-2 border-dashed border-slate-100 rounded-[40px] p-8 flex flex-col items-center justify-center text-center space-y-6 hover:border-rose-500/30 hover:bg-rose-50/10 transition-all min-h-[500px]"
        >
          <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:bg-[#E91E63]/10 group-hover:text-[#E91E63] transition-all duration-500">
            <Plus size={32} className="stroke-[3]" />
          </div>
          <div>
            <h4 className="text-xl font-black text-slate-800 tracking-tight">Create Combo</h4>
            <p className="text-sm font-bold text-slate-400 mt-2 max-w-[200px]">Bundle your best services into a high-value package.</p>
          </div>
        </button>
      </div>

      {/* ── MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="p-10 space-y-8 overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    {editingCombo ? "Update Strategy" : "Define Combo"}
                  </h2>
                  <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest text-[10px]">Package Architecture</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-100 hover:text-rose-600 transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 font-serif">Combo Name</label>
                     <input 
                       type="text" 
                       placeholder="e.g. Bridal Luxury"
                       className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20 transition-all"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 font-serif">Combo Theme Color</label>
                     <div className="flex gap-2">
                        {["bg-rose-500", "bg-blue-500", "bg-emerald-500", "bg-slate-900"].map((c) => (
                           <div key={c} className={`w-8 h-8 rounded-full ${c} cursor-pointer hover:scale-125 transition-transform ring-offset-2 hover:ring-2 ring-slate-200`} />
                        ))}
                     </div>
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 font-serif">Strategy Description</label>
                  <textarea 
                    rows={2}
                    placeholder="Describe the synergy between these services..."
                    className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Value</label>
                     <input type="number" placeholder="₹" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 text-rose-500">Combo Price</label>
                     <input type="number" placeholder="₹" className="w-full px-6 py-4 bg-rose-50 border border-rose-100 rounded-2xl font-bold text-rose-700" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Duration (min)</label>
                     <input type="number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" />
                   </div>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Select Included Services</label>
                   <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto no-scrollbar border-y border-slate-50 py-2">
                      {["Facial", "Hair Cut", "Nail Art", "Massage", "Waxing", "Styling"].map((s) => (
                         <div key={s} className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl hover:bg-[#E91E63]/5 transition-colors cursor-pointer group/item border border-transparent hover:border-[#E91E63]/20">
                            <div className="w-4 h-4 rounded border-2 border-slate-300 group-hover/item:border-[#E91E63] flex items-center justify-center text-white text-[10px]">
                               <span className="opacity-0 group-hover/item:opacity-0 transition-opacity">✓</span>
                            </div>
                            <span className="text-xs font-bold text-slate-600 group-hover/item:text-slate-900">{s}</span>
                         </div>
                      ))}
                   </div>
                </div>
              </div>

              <button 
                onClick={() => { setIsModalOpen(false); toast.success("Strategy established"); }}
                className="w-full bg-[#E91E63] text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-rose-200 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
              >
                <CheckCircle2 size={24} className="stroke-[3]" />
                <span>Establish Combo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComboPackagesPage;
