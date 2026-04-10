import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Edit2,
  Share2,
  Camera,
  PlusCircle,
  MapPin,
  Pencil,
  Star,
  Home,
  Phone,
  MessageCircle,
  Mail,
  Globe,
  Navigation,
  Clock,
  MessageSquare,
  Scissors,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Instagram,
  Store,
  Gift,
  List,
  Layers,
  LayoutGrid,
  XCircle,
  ChevronDown,
  Snowflake,
  Car,
  Wifi,
  CreditCard,
  Dog,
  Coffee,
  Smile,
  Accessibility
} from 'lucide-react';
import MobileMyViewScreen from './Mobile/MobileMyViewScreen';

const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200',
];

const MOCK_SERVICES = [
  { id: '1', name: 'Women Haircut', price: 550, durationMins: 60, description: 'Precision cut with modern finishing.', discountPercent: 20 },
  { id: '2', name: 'Balayage Color', price: 2500, durationMins: 120, description: 'Hand-painted sun-kissed highlights.', discountPercent: 0 },
  { id: '3', name: 'Deep Facial', price: 1200, durationMins: 60, description: 'Deep cleansing & moisturizing facial.', discountPercent: 15 },
  { id: '4', name: 'Bridal Makeup', price: 5000, durationMins: 150, description: 'Full bridal look by expert artists.', discountPercent: 0 },
];

const MOCK_REVIEWS = [
  { id: 'r1', userName: 'Jennie Whang', rating: 4, date: '2 days ago', comment: 'The place was clean, great service, staff are friendly. Will certainly recommend!', ownerReply: null },
  { id: 'r2', userName: 'Nathalie K.', rating: 5, date: '1 week ago', comment: 'Very nice service from the specialist. I always come here for my treatment.', ownerReply: 'Thank you Nathalie! We look forward to seeing you again 💛' },
  { id: 'r3', userName: 'Julia Martha', rating: 4, date: '2 weeks ago', comment: "This is my favourite place to treat my hair :)", ownerReply: null },
];

const AMENITIES_LIST = [
  { key: 'ac', label: 'AC', icon: Snowflake },
  { key: 'parking', label: 'Parking', icon: Car },
  { key: 'wifi', label: 'WiFi', icon: Wifi },
  { key: 'card', label: 'Card Payment', icon: CreditCard },
  { key: 'waiting', label: 'Waiting Area', icon: Coffee },
];

const MOCK_SPECIALISTS = [
  { name: 'Riya Sharma', role: 'Hair Specialist', rating: 4.9, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riya' },
  { name: 'Kavya Nair', role: 'Skin & Makeup', rating: 4.8, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya' },
  { name: 'Rohan Me...', role: 'Beard & Groo...', rating: 4.7, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan' },
];

const POLICIES = [
  { icon: XCircle, title: 'CANCELLATION', desc: 'Free cancellation up to 2 hours before appointment.', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: Clock, title: 'LATE ARRIVAL', desc: 'A grace period of 10 minutes is allowed.', color: 'text-amber-500', bg: 'bg-amber-50' },
  { icon: CreditCard, title: 'PAYMENT', desc: 'Cash, card, and UPI accepted.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Smile, title: 'CHILDREN', desc: 'Children under 5 are welcome with a guardian.', color: 'text-purple-500', bg: 'bg-purple-50' },
];


const SalonMyViewPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  // ── Core State ──────────────────────────────────────────────────────────
  const [editMode, setEditMode] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  // ── Editable Fields ──────────────────────────────────────────────────────
  const [salonName, setSalonName] = useState('Glamour Salon');
  const [salonSubtitle, setSalonSubtitle] = useState('Premium Studio');
  const [salonDescription, setSalonDescription] = useState('We specialize in professional beauty & grooming. Our skilled team ensures you leave looking and feeling your absolute best. Founded in 2012, Glamour Salon has been at the forefront of stylistic innovation in the city.');
  
  const [contact, setContact] = useState({
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'hello@glamoursalon.in',
    website: 'www.glamoursalon.in',
    instagram: '@glamoursalon'
  });

  const [services, setServices] = useState(MOCK_SERVICES);
  const [hours, setHours] = useState('09:00 AM – 09:00 PM');
  
  const [policyData, setPolicyData] = useState(POLICIES.map(p => ({ ...p })));


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) return <MobileMyViewScreen />;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* ── STICKY TOP BAR ── */}
      <div className="flex items-center justify-between bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-sm sticky top-0 z-40">
         <div className="flex items-center gap-6">
            <button 
                onClick={() => navigate(-1)}
                className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm"
            >
                <ChevronLeft size={20} />
            </button>
            <div>
               <h1 className="text-2xl font-black text-slate-800 tracking-tight">Salon My View</h1>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Public Profile Preview</p>
            </div>
         </div>

         <div className="flex items-center gap-4">
            <button 
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-3 px-8 h-12 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${editMode ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-[#E91E63] text-white shadow-lg shadow-pink-500/20'}`}
            >
                {editMode ? <CheckCircle size={18} /> : <Edit2 size={18} />}
                {editMode ? 'Done Editing' : 'Edit Profile'}
            </button>
            <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#E91E63] transition-all shadow-sm">
                <Share2 size={20} />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* ── LEFT COLUMN ── */}
        <div className="xl:col-span-8 space-y-10">
            {/* 0. HERO IMAGE CAROUSEL */}
            <div className="relative group rounded-[3.5rem] overflow-hidden bg-slate-100 aspect-[16/9] shadow-2xl shadow-purple-500/5 border-4 border-white">
                <img src={MOCK_IMAGES[currentImg]} alt="Salon" className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute bottom-10 left-10 flex gap-4">
                    {MOCK_IMAGES.map((img, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentImg(idx)}
                            className={`w-20 h-14 rounded-2xl border-2 transition-all overflow-hidden ${currentImg === idx ? 'border-white scale-110 shadow-xl' : 'border-white/30 opacity-60 hover:opacity-100'}`}
                        >
                            <img src={img} alt="thumb" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>

                {editMode && (
                    <button className="absolute top-10 right-10 flex items-center gap-3 bg-white/20 backdrop-blur-xl border border-white/30 px-8 py-4 rounded-[2rem] text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-white/40 active:scale-95 transition-all">
                        <Camera size={20} /> Edit Gallery
                    </button>
                )}
            </div>

            {/* 1. ABOUT CARD */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50">
                <h3 className="text-xl font-black text-slate-800 mb-6">About</h3>
                {editMode ? (
                    <textarea 
                        value={salonDescription}
                        onChange={(e) => setSalonDescription(e.target.value)}
                        className="w-full p-6 rounded-2xl bg-slate-50 border-2 border-rose-100 text-sm text-slate-600 leading-relaxed font-medium focus:border-rose-300 outline-none transition-all h-32"
                    />
                ) : (
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{salonDescription}</p>
                )}
            </div>

            {/* 2. CONTACT INFO CARD */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50">
                <h3 className="text-xl font-black text-slate-800 mb-8">Contact Info</h3>
                <div className="space-y-6">
                    {editMode ? (
                        <div className="space-y-4">
                            <EditInput icon={Phone} value={contact.phone} onChange={(v) => setContact({...contact, phone: v})} placeholder="Phone" color="text-emerald-500" />
                            <EditInput icon={MessageCircle} value={contact.whatsapp} onChange={(v) => setContact({...contact, whatsapp: v})} placeholder="WhatsApp" color="text-emerald-500" />
                            <EditInput icon={Mail} value={contact.email} onChange={(v) => setContact({...contact, email: v})} placeholder="Email" color="text-blue-500" />
                            <EditInput icon={Globe} value={contact.website} onChange={(v) => setContact({...contact, website: v})} placeholder="Website" color="text-slate-500" />
                            <EditInput icon={Instagram} value={contact.instagram} onChange={(v) => setContact({...contact, instagram: v})} placeholder="Instagram" color="text-rose-500" />
                        </div>
                    ) : (
                        <>
                            <ContactItem icon={Phone} label={contact.phone} color="bg-emerald-50 text-emerald-500" />
                            <ContactItem icon={MessageCircle} label={contact.whatsapp} color="bg-emerald-50 text-emerald-500" />
                            <ContactItem icon={Mail} label={contact.email} color="bg-blue-50 text-blue-500" />
                            <ContactItem icon={Globe} label={contact.website} color="bg-slate-50 text-slate-500" />
                            <ContactItem icon={Instagram} label={contact.instagram} color="bg-rose-50 text-rose-500" />
                        </>
                    )}
                </div>
            </div>

            {/* 3. OPENING HOURS CARD */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-slate-800">Opening Hours</h3>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                        Open <ChevronDown size={14} />
                    </div>
                </div>
                {editMode ? (
                    <input 
                        type="text" 
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 w-full outline-none focus:border-rose-300"
                    />
                ) : (
                    <p className="text-xs font-bold text-slate-400">Today: {hours}</p>
                )}
            </div>

            {/* 4. OUR SERVICES CARD */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-slate-800">Our Services</h3>
                    <button className="text-[#E91E63] text-xs font-black uppercase tracking-widest flex items-center gap-1">View all <ChevronRight size={14} /></button>
                </div>
                <p className="text-xs font-bold text-slate-400 mb-8">{services.length} services available</p>
                <div className="space-y-4">
                    {services.map((service, idx) => (
                        <div key={service.id} className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-50/50 flex items-center justify-between group hover:bg-white hover:shadow-xl hover:shadow-purple-500/5 transition-all">
                            <div className="space-y-2 flex-1 mr-6">
                                {editMode ? (
                                    <input 
                                        type="text"
                                        value={service.name}
                                        onChange={(e) => {
                                            const newServices = [...services];
                                            newServices[idx].name = e.target.value;
                                            setServices(newServices);
                                        }}
                                        className="text-base font-black text-slate-800 bg-white border border-slate-100 rounded-lg px-3 py-1 w-full outline-none focus:border-rose-300"
                                    />
                                ) : (
                                    <h4 className="text-base font-black text-slate-800">{service.name}</h4>
                                )}
                                <p className="text-xs text-slate-400 font-medium">{service.description}</p>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400"><Clock size={12} className="text-purple-400" /> {service.durationMins} min</span>
                                    {service.discountPercent > 0 && <span className="px-2 py-0.5 bg-emerald-50 text-emerald-500 rounded-md text-[9px] font-black">{service.discountPercent}% off</span>}
                                </div>
                            </div>
                            {editMode ? (
                                <div className="flex items-center gap-1">
                                    <span className="text-[#E91E63] font-black">₹</span>
                                    <input 
                                        type="number"
                                        value={service.price}
                                        onChange={(e) => {
                                            const newServices = [...services];
                                            newServices[idx].price = e.target.value;
                                            setServices(newServices);
                                        }}
                                        className="w-20 text-xl font-black text-[#E91E63] bg-white border border-slate-100 rounded-lg px-2 py-1 outline-none font-sans"
                                    />
                                </div>
                            ) : (
                                <span className="text-xl font-black text-[#E91E63]">₹{service.price}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>


            {/* 5. AMENITIES CARD */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50">
                <h3 className="text-xl font-black text-slate-800 mb-8">Amenities</h3>
                <div className="flex flex-wrap gap-4">
                    {AMENITIES_LIST.map(item => (
                        <div key={item.key} className="flex items-center gap-2.5 px-6 py-3 bg-cyan-50/50 border border-cyan-100/50 rounded-2xl">
                             <item.icon size={16} className="text-cyan-500" />
                             <span className="text-xs font-black text-cyan-600 uppercase tracking-tight">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 6. HOME SERVICE CARD */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50">
                <h3 className="text-xl font-black text-slate-800 mb-8">Home Service</h3>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500"><Home size={22} /></div>
                        <h4 className="text-lg font-black text-emerald-600">Home service enabled</h4>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-5 py-2.5 bg-cyan-50/50 border border-cyan-100 rounded-2xl flex items-center gap-2.5 text-cyan-600 font-black text-[10px] tracking-widest uppercase">
                            <Navigation size={14} /> 10 km radius
                        </div>
                        <div className="px-5 py-2.5 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center gap-2.5 text-emerald-600 font-black text-[10px] tracking-widest uppercase">
                            <PlusCircle size={14} /> +₹100 charge
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 9. SALON POLICIES CARD */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50">
                <h3 className="text-xl font-black text-slate-800 mb-8">Salon Policies</h3>
                <div className="space-y-8">
                    {policyData.map((policy, idx) => (
                        <div key={idx} className="flex gap-6">
                            <div className={`w-12 h-12 rounded-2xl ${policy.bg} ${policy.color} flex items-center justify-center shrink-0 shadow-sm`}><policy.icon size={20} /></div>
                            <div className="flex-1">
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{policy.title}</h4>
                                {editMode ? (
                                    <input 
                                        type="text"
                                        value={policy.desc}
                                        onChange={(e) => {
                                            const newPolicies = [...policyData];
                                            newPolicies[idx].desc = e.target.value;
                                            setPolicyData(newPolicies);
                                        }}
                                        className="w-full text-sm font-bold text-slate-700 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 outline-none focus:border-rose-300"
                                    />
                                ) : (
                                    <p className="text-sm font-bold text-slate-700">{policy.desc}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="xl:col-span-4 space-y-10">
            {/* SALON IDENTITY CARD */}
            <div className="bg-white border-4 border-white rounded-[3rem] p-10 shadow-2xl shadow-purple-500/10 text-center">
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#E91E63] to-[#8B5CF6] mx-auto flex items-center justify-center text-white mb-6 shadow-xl shadow-pink-500/20">
                    <Store size={48} />
                </div>
                {editMode ? (
                    <div className="space-y-4">
                        <input 
                            type="text"
                            value={salonName}
                            onChange={(e) => setSalonName(e.target.value)}
                            className="w-full text-2xl font-black text-slate-800 tracking-tight text-center bg-slate-50 border-2 border-pink-100 rounded-xl py-2 outline-none focus:border-rose-300"
                        />
                        <input 
                            type="text"
                            value={salonSubtitle}
                            onChange={(e) => setSalonSubtitle(e.target.value)}
                            className="w-full text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center bg-slate-50 border border-slate-200 rounded-lg py-1 outline-none focus:border-rose-300 italic"
                        />
                    </div>
                ) : (
                    <>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">{salonName}</h2>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-2 italic">{salonSubtitle}</p>
                    </>
                )}
                <div className="flex items-center justify-center gap-3 mt-8">
                   <div className="px-4 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">Open Now</div>
                   <div className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest">Verified</div>
                </div>
            </div>

            {/* QUICK ACTIONS CARD */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                <div className="mb-8">
                    <h3 className="text-xl font-black text-slate-800">Quick Actions</h3>
                    <p className="text-xs font-bold text-slate-400">Manage your salon</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <QuickActionButton 
                        icon={Scissors} 
                        label="Services" 
                        bg="bg-rose-50" 
                        color="text-rose-500" 
                        onClick={() => navigate('/salon-owner/manage-services')} 
                    />
                    <QuickActionButton 
                        icon={Users} 
                        label="Staff" 
                        bg="bg-orange-50" 
                        color="text-orange-500" 
                        onClick={() => navigate('/salon-owner/manage-specialists')} 
                    />
                    <QuickActionButton 
                        icon={LayoutGrid} 
                        label="Categories" 
                        bg="bg-purple-50" 
                        color="text-purple-500" 
                        onClick={() => navigate('/salon-owner/manage-categories')} 
                    />
                    <QuickActionButton 
                        icon={Layers} 
                        label="Add-ons" 
                        bg="bg-emerald-50" 
                        color="text-emerald-500" 
                        onClick={() => navigate('/salon-owner/manage-add-ons')} 
                    />
                    <QuickActionButton 
                        icon={Gift} 
                        label="Combos" 
                        bg="bg-blue-50" 
                        color="text-blue-500" 
                        onClick={() => navigate('/salon-owner/combo-packages')} 
                    />
                    <QuickActionButton 
                        icon={Calendar} 
                        label="Bookings" 
                        bg="bg-pink-50" 
                        color="text-pink-500" 
                        onClick={() => navigate('/salon-owner/manage-bookings')} 
                    />
                </div>
            </div>

            {/* 8. OUR SPECIALISTS CARD */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-slate-800">Our Specialists</h3>
                    <button className="text-[#E91E63] text-xs font-black uppercase tracking-widest flex items-center gap-1">View all <ChevronRight size={14} /></button>
                </div>
                <p className="text-xs font-bold text-slate-400 mb-8">Meet the team</p>
                <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
                    {MOCK_SPECIALISTS.map((spec, i) => (
                        <div key={i} className="flex flex-col items-center text-center shrink-0">
                            <img src={spec.avatar} className="w-20 h-20 rounded-full border-4 border-slate-50 shadow-md mb-4" alt={spec.name} />
                            <h4 className="text-[13px] font-black text-slate-800 leading-tight">{spec.name}</h4>
                            <p className="text-[10px] font-bold text-slate-400 mt-1">{spec.role}</p>
                            <div className="flex items-center gap-1 mt-2 text-amber-500 font-black text-[10px]">
                                <Star size={12} fill="#f59e0b" /> {spec.rating}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 10. REVIEWS CARD */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-slate-800">Reviews</h3>
                    <button className="text-[#E91E63] text-xs font-black uppercase tracking-widest flex items-center gap-1">View all <ChevronRight size={14} /></button>
                </div>
                
                <div className="flex items-center gap-8 mb-10">
                    <div className="text-center">
                        <span className="text-4xl font-black text-slate-800">4.7</span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">3 reviews</p>
                    </div>
                    <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map(star => (
                            <div key={star} className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-slate-400 w-2">{star}</span>
                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                     <div className="h-full bg-[#E91E63] rounded-full" style={{ width: star === 5 ? '85%' : star === 4 ? '60%' : '5%' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    {MOCK_REVIEWS.map(item => (
                        <div key={item.id} className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-50">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-[#E91E63] text-xs">{item.userName[0]}</div>
                                    <div>
                                        <h5 className="text-[13px] font-black text-slate-800">{item.userName}</h5>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</p>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={10} fill={i <= item.rating ? '#f59e0b' : 'transparent'} stroke={i <= item.rating ? '#f59e0b' : '#cbd5e1'} />)}
                                </div>
                            </div>
                            <p className="text-xs font-medium text-slate-600 leading-relaxed mb-4 italic">"{item.comment}"</p>
                            
                            {item.ownerReply ? (
                                <div className="p-4 rounded-xl bg-cyan-50/50 border border-cyan-100/50">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Store size={12} className="text-cyan-600" />
                                        <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest">Owner Reply</span>
                                    </div>
                                    <p className="text-[11px] font-bold text-cyan-700 leading-relaxed">{item.ownerReply}</p>
                                </div>
                            ) : (
                                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-100 text-cyan-600 font-black text-[10px] uppercase tracking-widest hover:bg-cyan-50 transition-all">
                                    <MessageSquare size={12} /> Reply to review
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const QuickActionButton = ({ icon: Icon, label, color, bg, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-3 p-6 rounded-3xl ${bg} transition-all duration-300 hover:scale-105 active:scale-95 group border border-transparent hover:border-white hover:shadow-xl shadow-sm`}
    >
        <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center ${color} shadow-sm transition-transform group-hover:rotate-6`}>
            <Icon size={22} strokeWidth={2.5} />
        </div>
        <span className="text-sm font-black tracking-tight text-slate-800">{label}</span>
    </button>
);

const ActionButton = ({ icon: Icon, label, color, bg, onClick }) => (
    <button 
        onClick={onClick}
        className="flex flex-col items-center gap-4 group"
    >
        <div className={`w-16 h-16 rounded-[1.5rem] ${bg} ${color} flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm border border-transparent group-hover:border-white group-hover:shadow-xl`}>
            <Icon size={24} strokeWidth={2.5} />
        </div>
        <span className="text-[11px] font-black tracking-tight text-slate-800">{label}</span>
    </button>
);

const ContactItem = ({ icon: Icon, label, color }) => (
    <div className="flex items-center gap-6 group cursor-pointer">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center transition-all group-hover:scale-110 shadow-sm shrink-0`}>
            <Icon size={18} />
        </div>
        <span className="text-sm font-bold text-slate-700 transition-colors group-hover:text-slate-900">{label}</span>
    </div>
);

const EditInput = ({ icon: Icon, value, onChange, placeholder, color }) => (
    <div className="flex items-center gap-4 bg-slate-50/50 p-2 rounded-2xl border border-slate-100 focus-within:border-rose-200 transition-all">
        <div className={`w-10 h-10 rounded-xl bg-white ${color} flex items-center justify-center shadow-sm shrink-0`}>
            <Icon size={18} />
        </div>
        <input 
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm font-bold text-slate-700 outline-none"
        />
    </div>
);


const StatBox = ({ label, value, color }) => (
    <div className={`p-6 rounded-[2.5rem] ${color} text-center`}>
        <h4 className="text-2xl font-black">{value}</h4>
        <p className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-70">{label}</p>
    </div>
);

export default SalonMyViewPage;
