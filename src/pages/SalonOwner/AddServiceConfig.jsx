import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Info, 
  ChevronDown, 
  Store, 
  Home, 
  Layers,
  Image as ImageIcon,
  CheckCircle,
  X,
  ArrowLeft,
  PlusCircle
} from "lucide-react";

const AddServiceConfig = ({ onCancel, onSave }) => {
  const [activeListing, setActiveListing] = useState(true);
  const [serviceMode, setServiceMode] = useState("Salon Only");
  const [addOns, setAddOns] = useState([
    { id: 1, name: "Premium Essential Oils", price: "350", min: "1" },
    { id: 2, name: "Scalp Therapy Extension", price: "500", min: "1" },
    { id: 3, name: "24K Gold Hydration Mask", price: "1200", min: "0" }
  ]);

  const addRow = () => {
    setAddOns([...addOns, { id: Date.now(), name: "", price: "", min: "" }]);
  };

  const removeRow = (id) => {
    setAddOns(addOns.filter(row => row.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Breadcrumbs & Navigation ── */}
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6">
        <button 
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          Services
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-[#D81159]">Add New Service</span>
      </nav>

      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
            Service Configuration
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
            Define the parameters of your atelier's offerings. Craft each service with editorial precision.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onCancel}
            className="px-8 py-4 text-sm font-black text-slate-400 hover:text-slate-600 transition-all uppercase tracking-widest"
          >
            Cancel
          </button>
          <button 
            onClick={onSave}
            className="px-10 py-4 bg-[#D81159] hover:bg-[#B00E48] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-rose-500/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
          >
            Save Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ── Main Content (Left) ── */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Card: Basic Information */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 overflow-hidden relative group">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-[#D81159] flex items-center justify-center">
                <Info size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Basic Information</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Service Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Signature Scalp Treatment"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 focus:ring-[#D81159]/10 transition-all placeholder:text-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Category</label>
                  <div className="relative group/select">
                    <select className="w-full appearance-none bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 focus:ring-[#D81159]/10 transition-all">
                      <option>Hair Styling</option>
                      <option>Nail Care</option>
                      <option>Skin Therapy</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover/select:text-[#D81159] transition-colors pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Price ($)</label>
                  <input 
                    type="text" 
                    placeholder="0.00"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 focus:ring-[#D81159]/10 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Duration (Min)</label>
                  <input 
                    type="text" 
                    placeholder="60"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 focus:ring-[#D81159]/10 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Describe the sensory experience of this service..."
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-700 font-medium focus:ring-2 focus:ring-[#D81159]/10 transition-all placeholder:text-slate-300 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Card: Service Add-ons */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <PlusCircle size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Service Add-ons</h2>
              </div>
              <button 
                onClick={addRow}
                className="text-[#D81159] hover:text-[#B00E48] font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
              >
                <Plus size={16} strokeWidth={3} /> Add New Row
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 px-4">
                <div className="col-span-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Add-on Name</div>
                <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Price ($)</div>
                <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Min</div>
                <div className="col-span-1"></div>
              </div>

              {addOns.map((row) => (
                <div key={row.id} className="grid grid-cols-12 gap-4 items-center animate-in fade-in slide-in-from-left-2 duration-300 bg-slate-50/50 p-4 rounded-2xl border border-transparent hover:border-slate-100 transition-all group/row">
                  <div className="col-span-5">
                    <input 
                      type="text" 
                      defaultValue={row.name}
                      placeholder="Add-on Name"
                      className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#D81159]/10 transition-all shadow-sm"
                    />
                  </div>
                  <div className="col-span-3">
                    <input 
                      type="text" 
                      defaultValue={row.price}
                      placeholder="0"
                      className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-medium text-center focus:ring-2 focus:ring-[#D81159]/10 transition-all shadow-sm"
                    />
                  </div>
                  <div className="col-span-3">
                    <input 
                      type="text" 
                      defaultValue={row.min}
                      placeholder="0"
                      className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-medium text-center focus:ring-2 focus:ring-[#D81159]/10 transition-all shadow-sm"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button 
                      onClick={() => removeRow(row.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sidebar (Right) ── */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* Card: Service Mode */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Service Mode</h3>
            <div className="space-y-4">
              {[
                { id: 'Salon Only', label: 'Salon Only', subtext: 'Client visits the atelier', icon: Store, color: 'text-rose-500', bg: 'bg-rose-50' },
                { id: 'Home Service', label: 'Home Service', subtext: 'Artist visits the client', icon: Home, color: 'text-blue-500', bg: 'bg-blue-50' },
                { id: 'Both Modes', label: 'Both Modes', subtext: 'Flexible location options', icon: Layers, color: 'text-purple-500', bg: 'bg-purple-50' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setServiceMode(mode.id)}
                  className={`w-full text-left p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${
                    serviceMode === mode.id 
                    ? 'border-[#D81159] bg-[#D81159]/[0.02]' 
                    : 'border-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${mode.bg} ${mode.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <mode.icon size={22} />
                    </div>
                    <div>
                      <div className="font-black text-slate-800 text-sm leading-none mb-1.5">{mode.label}</div>
                      <div className="text-[10px] font-bold text-slate-400">{mode.subtext}</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    serviceMode === mode.id ? 'border-[#D81159] bg-[#D81159]' : 'border-slate-100'
                  }`}>
                    {serviceMode === mode.id && <div className="w-2 h-2 rounded-full bg-white ring-2 ring-white/20" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Card: Visual Identity */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Visual Identity</h3>
            <div className="border-2 border-dashed border-rose-100 rounded-[30px] p-10 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:bg-rose-50/30 transition-all transition-duration-500">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-[#D81159] group-hover:scale-110 transition-transform">
                <ImageIcon size={28} />
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-sm mb-1">Upload Cover Image</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended size: 1080x1080px</p>
              </div>
              <button className="px-6 py-2.5 bg-white border border-slate-100 shadow-sm rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-[#D81159] hover:border-[#D81159]/20 transition-all mt-2">
                Choose File
              </button>
            </div>
          </div>

          {/* Card: Active Listing */}
          <div className="bg-[#FAF7FC] rounded-[40px] p-8 border border-[#F3EDF7]">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-800 tracking-tight">Active Listing</h3>
                <p className="text-[10px] font-bold text-slate-400">Currently visible to clients</p>
              </div>
              <button 
                onClick={() => setActiveListing(!activeListing)}
                className={`w-12 h-7 rounded-full relative transition-all duration-300 flex items-center px-1 ${
                  activeListing ? 'bg-[#D81159]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                  activeListing ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddServiceConfig;
