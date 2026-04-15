import React, { useState } from "react";
import { X, User, Phone, Mail, MapPin, Store, Send, CheckCircle2 } from "lucide-react";

const CreateLeadModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    category: "Salon",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Success state
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-xl animate-in zoom-in-95 duration-300">
        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-slate-200">
          {step === 1 ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-50 px-8 py-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Create New Lead</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Territory Expansion Profile</p>
                </div>
                <button 
                  onClick={onClose}
                  className="h-10 w-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 hover:text-rose-500 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Business Name</label>
                    <div className="relative">
                      <Store size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input 
                        required
                        type="text" 
                        placeholder="Elite Hair & Spa"
                        className="w-full h-13 rounded-2xl bg-slate-50 border-none pl-12 pr-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:ring-4 focus:ring-purple-500/10 transition-all"
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Owner Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input 
                        required
                        type="text" 
                        placeholder="Rajesh Kumar"
                        className="w-full h-13 rounded-2xl bg-slate-50 border-none pl-12 pr-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:ring-4 focus:ring-purple-500/10 transition-all"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input 
                        required
                        type="tel" 
                        placeholder="+91 98765 43210"
                        className="w-full h-13 rounded-2xl bg-slate-50 border-none pl-12 pr-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:ring-4 focus:ring-purple-500/10 transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email (Optional)</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input 
                        type="email" 
                        placeholder="owner@email.com"
                        className="w-full h-13 rounded-2xl bg-slate-50 border-none pl-12 pr-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:ring-4 focus:ring-purple-500/10 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Address / Location</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      required
                      type="text" 
                      placeholder="Street, Area, City"
                      className="w-full h-13 rounded-2xl bg-slate-50 border-none pl-12 pr-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:ring-4 focus:ring-purple-500/10 transition-all"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full h-15 rounded-[22px] bg-[#8B5CF6] text-white text-sm font-black shadow-xl shadow-purple-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} /> REGISTER LEAD
                </button>
              </form>
            </>
          ) : (
            <div className="p-12 flex flex-col items-center text-center space-y-6">
              <div className="h-24 w-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 animate-bounce">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Lead Registered!</h3>
                <p className="text-sm font-bold text-slate-500 mt-2">
                  The lead has been added to your pipeline. You can now track its status from the dashboard.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="px-10 py-4 rounded-2xl bg-slate-900 text-white text-[12px] font-black uppercase tracking-widest transition-all hover:bg-slate-800 active:scale-95"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLeadModal;
