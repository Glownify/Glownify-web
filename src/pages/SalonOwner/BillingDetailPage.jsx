import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  Plus, 
  Trash2, 
  Printer, 
  Share2, 
  Calendar, 
  Clock, 
  User, 
  CreditCard,
  Tag,
  Heart,
  TrendingUp,
  FileText,
  Minus,
  CheckCircle,
  LayoutGrid,
  Scissors,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import MobileBillingDetailPage from './Mobile/BillingDetailPage';

import { useBilling } from '../../hooks/useBilling';
import { TIP_OPTIONS, MOCK_CUSTOMER } from '../../utils/constants';
import Avatar from '../../components/common/Avatar';

const BillingDetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const booking = location.state?.booking;

    const {
        services,
        selectedTip,
        setSelectedTip,
        increment,
        decrement,
        removeService,
        subtotal,
        grandTotal,
        discount
    } = useBilling(booking?.services);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile) return <MobileBillingDetailPage />;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* ── TOP NAV ── */}
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-sm sticky top-0 z-40">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Invoice Architect</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                             Reference: <span className="text-pink-500">#INV-8829</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
                        <Share2 size={18} /> Share Digital
                    </button>
                    <button className="flex items-center gap-3 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">
                        <Printer size={18} /> Finalize & Print
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                
                {/* ── LEFT SIDE: Service Builder ── */}
                <div className="xl:col-span-8 space-y-8">
                    
                    {/* CUSTOMER BANNER */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex items-center justify-between">
                         <div className="flex items-center gap-6">
                             <Avatar 
                                initials={booking?.customerName ? booking.customerName[0] : MOCK_CUSTOMER.initials} 
                                color={MOCK_CUSTOMER.avatarColor} 
                                size={64} 
                                textColor="#E91E63"
                             />
                             <div>
                                 <h4 className="text-2xl font-black text-slate-800 tracking-tight">{booking?.customerName || MOCK_CUSTOMER.name}</h4>
                                 <div className="flex gap-4 mt-1">
                                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Calendar size={12} className="text-pink-500" /> {MOCK_CUSTOMER.date}</span>
                                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Clock size={12} className="text-purple-500" /> {MOCK_CUSTOMER.time}</span>
                                 </div>
                             </div>
                         </div>
                         <div className="px-5 py-2 rounded-2xl bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest">LOYALTY MEMBER</div>
                    </div>

                    {/* SERVICE LIST */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-6 mb-2">
                             <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Line Items</h4>
                             <button className="flex items-center gap-2 text-[#E91E63] font-black text-[10px] uppercase tracking-widest hover:gap-3 transition-all"><Plus size={14} /> Add Premium Service</button>
                        </div>
                        
                        {services.map(s => (
                            <div key={s.id} className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[#E91E63] transition-colors"><Scissors size={20} /></div>
                                    <div>
                                        <h5 className="text-lg font-black text-slate-800">{s.name}</h5>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.category}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl">
                                        <button onClick={() => decrement(s.id)} className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"><Minus size={14} /></button>
                                        <span className="font-black text-slate-800 w-4 text-center">{s.qty}</span>
                                        <button onClick={() => increment(s.id)} className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"><Plus size={14} /></button>
                                    </div>
                                    <div className="text-right min-w-[80px]">
                                        <p className="text-xl font-black text-slate-800">₹{s.price * s.qty}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">₹{s.price} unit</p>
                                    </div>
                                    <button onClick={() => removeService(s.id)} className="text-slate-200 hover:text-rose-500 transition-colors p-2"><Trash2 size={20} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT SIDE: Financials ── */}
                <div className="xl:col-span-4 space-y-8">
                    
                    {/* TIP SELECTOR */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                         <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Heart size={14} className="text-pink-500" /> Gratitude Tip</h4>
                         <div className="grid grid-cols-2 gap-4">
                             {TIP_OPTIONS.map(val => (
                                 <button 
                                    key={val}
                                    onClick={() => setSelectedTip(val)}
                                    className={`py-6 rounded-[2rem] font-black text-lg transition-all ${selectedTip === val ? 'bg-[#E91E63] text-white shadow-xl shadow-pink-500/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                                 >
                                     ₹{val}
                                 </button>
                             ))}
                         </div>
                    </div>

                    {/* BILL SUMMARY */}
                    <div className="bg-[#1A1A1A] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-pink-500/10 rounded-full blur-[80px]" />
                        
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-10">Financial Overview</h4>
                        
                        <div className="space-y-6">
                            <SummaryRow label="Subtotal" value={`₹${subtotal}`} />
                            <SummaryRow label="Tip Extension" value={`₹${selectedTip}`} />
                            <SummaryRow label="Promotional Credit" value={`-₹${discount}`} highlight="text-emerald-400" />
                            
                            <div className="pt-10 border-t border-white/10 mt-10">
                                <div className="flex items-center justify-between">
                                     <div>
                                         <h3 className="text-4xl font-black tracking-tight">₹{grandTotal.toLocaleString()}</h3>
                                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-2 px-3 py-1 bg-white/5 rounded-lg inline-block">Total Due Amount</p>
                                     </div>
                                     <div className="p-4 bg-emerald-500/20 rounded-[2rem] text-emerald-400"><CreditCard size={32} /></div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-12 group bg-gradient-to-r from-[#E91E63] to-rose-600 h-20 rounded-[2.5rem] flex items-center justify-center gap-4 hover:scale-105 transition-all text-white font-black text-sm uppercase tracking-[0.2em]">
                             Complete Transaction <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>

                    {/* COUPON CARD */}
                    <div className="bg-purple-50/50 border border-purple-100 rounded-[3rem] p-8 flex items-center gap-6">
                         <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center text-purple-600 shadow-sm"><Tag size={24} /></div>
                         <div className="flex-1">
                             <h5 className="font-black text-purple-900 tracking-tight">Active Coupon</h5>
                             <p className="text-xs font-bold text-purple-400 lowercase">welcomenew10 applied</p>
                         </div>
                         <button className="text-purple-600"><Plus size={20} /></button>
                    </div>

                </div>
            </div>
        </div>
    );
};

const SummaryRow = ({ label, value, highlight }) => (
    <div className="flex items-center justify-between">
         <span className="text-sm font-bold text-white/50">{label}</span>
         <span className={`text-lg font-black ${highlight || 'text-white'}`}>{value}</span>
    </div>
);

export default BillingDetailPage;
