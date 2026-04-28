import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { 
  Plus, 
  Search, 
  Upload, 
  Download, 
  RefreshCcw, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Share2,
  Bell,
  Copy,
  MessageCircle,
  Facebook,
  Instagram,
  Link2,
  Eye,
  Lightbulb,
  LineChart,
  Megaphone,
  UserPlus,
  Clock,
  ExternalLink
} from "lucide-react";

/**
 * MarketingSuitePage
 * Implementation of the Marketing Suite redesigned desktop interface with multiple tabs.
 */
const MarketingSuitePage = () => {
    const posterRef = useRef(null);
    const [activeTab, setActiveTab] = useState("Templates");
    const [activeFilter, setActiveFilter] = useState("All Templates");
    const [selectedTemplate, setSelectedTemplate] = useState("Royal Maroon");
    
    // Templates View State
    const [salonName, setSalonName] = useState("SALON NAME");
    const [tagline, setTagline] = useState("YOUR MESSAGE");
    const [welcomeMessage, setWelcomeMessage] = useState("1ST MESSAGE / WELCOME MESSAGE");
    const [offerText, setOfferText] = useState("WRITE ANYTHING YOU WANT");
    const [serviceType, setServiceType] = useState("both"); // online, offline, both
    const [phoneNumber, setPhoneNumber] = useState("YOUR PHONE NUMBER");
    const [address, setAddress] = useState("YOUR ADDRESS");
    const [website, setWebsite] = useState("YOUR WEBSITE / SOCIAL");
    const [selectedBg, setSelectedBg] = useState(0);
    const [currentBgImage, setCurrentBgImage] = useState("/templates/royal-maroon.png");

    // Analytics/Notification View State
    const [msgTitle, setMsgTitle] = useState("");
    const [msgBody, setMsgBody] = useState("");
    const [ctaLink, setCtaLink] = useState("https://salone.app/bo");
    const [btnLabel, setBtnLabel] = useState("Book Now");
    const [targetAudience, setTargetAudience] = useState("Send To All");

    const tabs = ["Overview", "Analytics", "Templates", "History"];
    const filters = ["All Templates", "Special Offers", "Festive Season"];

    const templates = [
        {
            id: 1,
            name: "Royal Maroon",
            badge: "POPULAR",
            image: "/templates/royal-maroon.png",
            badgeColor: "bg-rose-700",
            bgImage: "/templates/royal-maroon.png",
            textConfig: {
                salonName: { top: '6%', color: '#f5f5dc', fontSize: '16px', textShadow: '0 2px 6px rgba(0,0,0,0.9)' },
                offer: { top: '38%', color: '#ffffff', fontSize: '20px', bgColor: 'transparent' },
                subText: { bottom: '22%', color: '#e8e8e8', fontSize: '11px', textShadow: '0 2px 4px rgba(0,0,0,0.9)' },
                phone: { bottom: '8%', color: '#ffd700', fontSize: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }
            }
        },
        {
            id: 2,
            name: "Midnight Gold",
            badge: "PREMIUM",
            image: "/templates/midnight-gold.png",
            badgeColor: "bg-yellow-600",
            bgImage: "/templates/midnight-gold.png",
            textConfig: {
                salonName: { top: '6%', color: '#fbbf24', fontSize: '16px', textShadow: '0 2px 6px rgba(0,0,0,0.9)' },
                offer: { top: '38%', color: '#ffffff', fontSize: '20px', bgColor: 'transparent' },
                subText: { bottom: '22%', color: '#e5e5e5', fontSize: '11px', textShadow: '0 2px 4px rgba(0,0,0,0.9)' },
                phone: { bottom: '8%', color: '#fbbf24', fontSize: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }
            }
        },
        {
            id: 3,
            name: "Elegant Cream",
            badge: "NEW",
            image: "/templates/elegant-cream.png",
            badgeColor: "bg-emerald-500",
            bgImage: "/templates/elegant-cream.png",
            textConfig: {
                salonName: { top: '6%', color: '#5c3d2e', fontSize: '16px', textShadow: '0 1px 3px rgba(255,255,255,0.4)' },
                offer: { top: '38%', color: '#3d2b1f', fontSize: '20px', bgColor: 'transparent' },
                subText: { bottom: '22%', color: '#6b4423', fontSize: '11px', textShadow: '0 1px 2px rgba(255,255,255,0.3)' },
                phone: { bottom: '8%', color: '#5c3d2e', fontSize: '12px', textShadow: '0 1px 2px rgba(255,255,255,0.4)' }
            }
        },
        {
            id: 4,
            name: "Rose Blush",
            badge: "TRENDING",
            image: "/templates/rose-blush.png",
            badgeColor: "bg-pink-500",
            bgImage: "/templates/rose-blush.png",
            textConfig: {
                salonName: { top: '6%', color: '#ffffff', fontSize: '16px', textShadow: '0 2px 6px rgba(0,0,0,0.6)' },
                offer: { top: '38%', color: '#ffffff', fontSize: '20px', bgColor: 'transparent' },
                subText: { bottom: '22%', color: '#f5e6f0', fontSize: '11px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' },
                phone: { bottom: '8%', color: '#ffffff', fontSize: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }
            }
        },
        {
            id: 5,
            name: "Emerald Green",
            badge: "ELEGANT",
            image: "/templates/emerald-green.png",
            badgeColor: "bg-emerald-600",
            bgImage: "/templates/emerald-green.png",
            textConfig: {
                salonName: { top: '6%', color: '#f5f5dc', fontSize: '16px', textShadow: '0 2px 6px rgba(0,0,0,0.9)' },
                offer: { top: '38%', color: '#ffffff', fontSize: '20px', bgColor: 'transparent' },
                subText: { bottom: '22%', color: '#d4edda', fontSize: '11px', textShadow: '0 2px 4px rgba(0,0,0,0.9)' },
                phone: { bottom: '8%', color: '#d4af37', fontSize: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }
            }
        },
        {
            id: 6,
            name: "Royal Purple",
            badge: "LUXURY",
            image: "/templates/royal-purple.png",
            badgeColor: "bg-violet-600",
            bgImage: "/templates/royal-purple.png",
            textConfig: {
                salonName: { top: '6%', color: '#f5f5dc', fontSize: '16px', textShadow: '0 2px 6px rgba(0,0,0,0.9)' },
                offer: { top: '38%', color: '#ffffff', fontSize: '20px', bgColor: 'transparent' },
                subText: { bottom: '22%', color: '#e8d5f5', fontSize: '11px', textShadow: '0 2px 4px rgba(0,0,0,0.9)' },
                phone: { bottom: '8%', color: '#c4b5fd', fontSize: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }
            }
        },
        {
            id: 7,
            name: "Ocean Teal",
            badge: "MODERN",
            image: "/templates/ocean-teal.png",
            badgeColor: "bg-teal-500",
            bgImage: "/templates/ocean-teal.png",
            textConfig: {
                salonName: { top: '6%', color: '#f5f5dc', fontSize: '16px', textShadow: '0 2px 6px rgba(0,0,0,0.9)' },
                offer: { top: '38%', color: '#ffffff', fontSize: '20px', bgColor: 'transparent' },
                subText: { bottom: '22%', color: '#ccfbf1', fontSize: '11px', textShadow: '0 2px 4px rgba(0,0,0,0.9)' },
                phone: { bottom: '8%', color: '#5eead4', fontSize: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }
            }
        },
        {
            id: 8,
            name: "Warm Terracotta",
            badge: "RUSTIC",
            image: "/templates/warm-terracotta.png",
            badgeColor: "bg-orange-600",
            bgImage: "/templates/warm-terracotta.png",
            textConfig: {
                salonName: { top: '6%', color: '#f5f5dc', fontSize: '16px', textShadow: '0 2px 6px rgba(0,0,0,0.9)' },
                offer: { top: '38%', color: '#ffffff', fontSize: '20px', bgColor: 'transparent' },
                subText: { bottom: '22%', color: '#fde8d0', fontSize: '11px', textShadow: '0 2px 4px rgba(0,0,0,0.9)' },
                phone: { bottom: '8%', color: '#f5c28a', fontSize: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }
            }
        }
    ];

    const backgroundImages = [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800"
    ];

    // ─── Sub-renderers for Tabs ───

    const renderOverview = () => (
        <div className="flex flex-col gap-10 p-8">
            <div className="mb-2">
                <h2 className="text-[32px] font-black text-slate-900 tracking-tighter leading-none mb-3">
                    Share Salon
                </h2>
                <p className="text-[14px] font-medium text-slate-400 max-w-2xl">
                    Expand your reach. Share your salon profile or create stunning promotional posters to attract new clients across your social networks.
                </p>
            </div>

            <div className="grid grid-cols-12 gap-8 items-start">
                {/* Left: Share Card & Status */}
                <div className="col-span-12 lg:col-span-5 space-y-8">
                    <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                                <Link2 size={20} />
                            </div>
                            <h3 className="text-[16px] font-black text-slate-900 uppercase tracking-tight">Share Salon Link</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-3">Your Personal URL</label>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-[13px] font-bold text-slate-600 truncate">
                                        salone.com/elite-suites/alex-rive
                                    </div>
                                    <button className="p-4 bg-slate-100 rounded-2xl text-slate-500 hover:bg-slate-200 transition-colors">
                                        <Copy size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Share on Social</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-3 bg-[#F0FAF5] text-[#25D366] px-6 py-4 rounded-2xl text-[13px] font-bold hover:opacity-80 transition-opacity">
                                        <MessageCircle size={18} fill="currentColor" /> WhatsApp
                                    </button>
                                    <button className="flex items-center justify-center gap-3 bg-[#F0F5FA] text-[#1877F2] px-6 py-4 rounded-2xl text-[13px] font-bold hover:opacity-80 transition-opacity">
                                        <Facebook size={18} fill="currentColor" /> Facebook
                                    </button>
                                    <button className="flex items-center justify-center gap-3 bg-[#FAF0F3] text-[#E4405F] px-6 py-4 rounded-2xl text-[13px] font-bold hover:opacity-80 transition-opacity">
                                        <Instagram size={18} /> Instagram
                                    </button>
                                    <button className="flex items-center justify-center gap-3 bg-slate-50 text-slate-600 px-6 py-4 rounded-2xl text-[13px] font-bold hover:opacity-80 transition-opacity">
                                        <Link2 size={18} /> Copy Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#E0FFF6] rounded-3xl p-6 flex items-center justify-between border border-[#A7FFEB]">
                        <div>
                            <p className="text-[10px] font-black text-[#00BFA5] uppercase tracking-[0.2em] mb-1">Live Status</p>
                            <h4 className="text-[18px] font-black text-slate-800 tracking-tight">Salon Profile is Active</h4>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#00BFA5] shadow-sm">
                            <CheckCircle2 size={24} />
                        </div>
                    </div>
                </div>

                {/* Right: Poster Creation */}
                <div className="col-span-12 lg:col-span-7">
                    <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm relative group overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[20px] font-black text-slate-900 tracking-tight">Create Poster</h3>
                            <span className="px-4 py-1.5 bg-[#A7FFEB]/50 text-[#00B894] rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-[#00B894]/20">New Designs</span>
                        </div>

                        <div className="aspect-[4/5] bg-slate-100 rounded-[32px] overflow-hidden relative shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                            <img 
                                src="/templates/royal-maroon.png" 
                                className="w-full h-full object-cover" 
                                alt="Salon poster preview"
                                onError={(e) => { e.target.src = "/templates/midnight-gold.png" }}
                            />
                            <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Summer Collection 2024</p>
                                <h4 className="text-white text-[32px] font-black leading-tight tracking-tighter">Elegance in Every <br/> Single Detail.</h4>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white h-16 rounded-2xl flex items-center justify-center gap-3 text-[14px] font-black tracking-widest uppercase shadow-xl shadow-rose-600/20 transition-all active:scale-95">
                                <Sparkles size={20} />
                                Generate High-Res Poster
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ecosystem Assets Section */}
            <div className="pt-8">
                <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Marketing Ecosystem Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
                    {[
                        { title: "Preview Page", desc: "See how your salon profile appears to potential clients on mobile and web devices.", icon: Eye, link: "LIVE VIEW", iColor: "bg-slate-100 text-slate-500" },
                        { title: "Marketing Tips", desc: "Curated strategies from top salon owners to boost your booking rates by up to 40%.", icon: Lightbulb, link: "READ GUIDE", iColor: "bg-slate-100 text-slate-500" },
                        { title: "Track Performance", desc: "Real-time analytics showing clicks, views, and conversion rates from shared links.", icon: LineChart, link: "OPEN INSIGHTS", iColor: "bg-slate-100 text-slate-500" }
                    ].map((asset, idx) => (
                        <div key={idx} className="bg-white rounded-[32px] p-8 border border-slate-100 hover:border-rose-100 hover:shadow-xl hover:shadow-rose-500/5 transition-all group">
                            <div className={`w-12 h-12 ${asset.iColor} rounded-2xl flex items-center justify-center mb-6`}>
                                <asset.icon size={22} />
                            </div>
                            <h4 className="text-[18px] font-black text-slate-900 mb-3 tracking-tight">{asset.title}</h4>
                            <p className="text-[13px] text-slate-400 font-medium leading-relaxed mb-6">
                                {asset.desc}
                            </p>
                            <button className="text-[11px] font-black text-rose-600 tracking-widest uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                                {asset.link} <ArrowRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="flex flex-col gap-10 p-8">
            <div className="mb-2">
                <h2 className="text-[32px] font-black text-slate-900 tracking-tighter leading-none mb-3">
                    Send Notifications
                </h2>
                <p className="text-[14px] font-medium text-slate-400 max-w-2xl">
                    Reach your audience with precision and style.
                </p>
            </div>

            <div className="grid grid-cols-12 gap-10 items-start">
                
                {/* Left: Customer Analytics */}
                <div className="col-span-12 lg:col-span-5 space-y-8">
                    <div className="bg-[#FBFCFD] rounded-[40px] p-8 border border-slate-50 shadow-sm">
                        <h3 className="text-[12px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-8">Customer Analytics</h3>
                        
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Customers</p>
                                <h4 className="text-[28px] font-black text-slate-900 tracking-tight">2,840</h4>
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-2 bg-emerald-50 text-[#00BFA5] rounded-md text-[10px] font-black">
                                    +12% <Clock size={10} />
                                </span>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Bookings</p>
                                <h4 className="text-[28px] font-black text-slate-900 tracking-tight">12.4k</h4>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Repeat Customers</p>
                                    <h4 className="text-[24px] font-black text-slate-900">68%</h4>
                                </div>
                                <div className="flex items-end gap-1 h-12">
                                    {[30, 50, 80, 40, 90, 70].map((h, i) => (
                                        <div key={i} className="w-2.5 bg-rose-500 rounded-full" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-100">
                            <h5 className="text-[13px] font-black text-slate-800 uppercase tracking-tight mb-4">Service Mix Breakdown</h5>
                            {[
                                { name: "Hair Styling", val: 45, color: "bg-rose-500" },
                                { name: "Nail Art & Spa", val: 30, color: "bg-rose-300" },
                                { name: "Skin Treatments", val: 25, color: "bg-indigo-300" }
                            ].map((service, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-[11px] font-black mb-2 uppercase tracking-widest">
                                        <span className="text-slate-600">{service.name}</span>
                                        <span className="text-slate-900">{service.val}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                        <div className={`h-full ${service.color} rounded-full`} style={{ width: `${service.val}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Compose Message */}
                <div className="col-span-12 lg:col-span-7 bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                    <h3 className="text-[12px] font-black text-rose-600 uppercase tracking-[0.2em] mb-8">Compose Message</h3>
                    
                    <div className="space-y-8">
                        <div>
                            <label className="block text-[11px] font-black text-slate-900 uppercase tracking-widest mb-4">Target Audience</label>
                            <div className="flex flex-wrap gap-3">
                                {["Send To All", "New Customers", "Repeat Customers", "Inactive (30+ days)"].map((opt) => (
                                    <button 
                                        key={opt}
                                        onClick={() => setTargetAudience(opt)}
                                        className={`px-5 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-all
                                            ${targetAudience === opt ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                                <button className="px-5 py-2.5 rounded-full border-2 border-dashed border-slate-200 text-slate-400 text-[11px] font-black uppercase tracking-widest hover:border-slate-300">
                                    + Custom Segment
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Message Title</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Special Weekend Offer!"
                                    value={msgTitle}
                                    onChange={(e) => setMsgTitle(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-[13px] font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-rose-500/5 outline-none transition-all placeholder:text-slate-300"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Message Body</label>
                                <textarea 
                                    placeholder="Craft your message here..."
                                    value={msgBody}
                                    onChange={(e) => setMsgBody(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-[13px] font-bold text-slate-700 h-32 resize-none focus:bg-white focus:ring-4 focus:ring-rose-500/5 outline-none transition-all placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Call to Action Link</label>
                                <div className="relative">
                                    <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input 
                                        type="text" 
                                        value={ctaLink}
                                        onChange={(e) => setCtaLink(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-[13px] font-bold text-slate-700 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Button Label</label>
                                <input 
                                    type="text" 
                                    value={btnLabel}
                                    onChange={(e) => setBtnLabel(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-[13px] font-bold text-slate-700 outline-none"
                                />
                            </div>
                        </div>

                        {/* Real-time Preview Card */}
                        <div className="pt-4">
                             <div className="bg-[#FAFBFD] p-8 rounded-[32px] border border-slate-100 relative group">
                                <div className="absolute top-6 right-8 text-slate-100 group-hover:text-slate-200 transition-colors">
                                    <Megaphone size={48} />
                                </div>
                                <p className="text-rose-600 text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-pulse" />
                                    Real-time Preview
                                </p>
                                <h4 className="text-[20px] font-black text-slate-900 mb-3 tracking-tight">
                                    {msgTitle || "Special Weekend Offer!"}
                                </h4>
                                <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-6 max-w-lg">
                                    {msgBody || "Treat yourself to a signature glow-up this weekend. Limited slots available for premium hair styling and nail treatments!"}
                                </p>
                                <button className="px-8 py-3 bg-rose-600 text-white rounded-xl text-[11px] font-black tracking-widest uppercase">
                                    {btnLabel}
                                </button>
                             </div>
                        </div>

                        <div className="flex items-center justify-end gap-6 pt-6 pt-2">
                            <button className="text-[12px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600">Save as Template</button>
                            <button className="px-10 py-5 bg-rose-600 text-white rounded-2xl text-[14px] font-black tracking-widest uppercase shadow-xl shadow-rose-600/20 hover:scale-[1.02] active:scale-95 transition-all">
                                Send Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTemplates = () => (
        <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
            {/* Left Column: Templates */}
            <div className="col-span-12 lg:col-span-7 flex flex-col p-8 border-r border-slate-50 overflow-y-auto no-scrollbar">
                <div className="mb-8">
                    <h2 className="text-[28px] font-black text-slate-900 tracking-tighter leading-none mb-3">
                        Choose a Poster Template
                    </h2>
                    <p className="text-[14px] font-medium text-slate-400">
                        Select a layout to start customizing your salon brand poster.
                    </p>
                </div>

                <div className="flex items-center gap-3 mb-10">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-all
                                ${activeFilter === filter 
                                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/10" 
                                    : "bg-white text-slate-400 border border-slate-100 hover:border-slate-300"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-12">
                    {templates.map((template) => (
                        <div 
                            key={template.id}
                            onClick={() => {
                                setSelectedTemplate(template.name);
                                setSelectedBg(template.id - 1);
                                setCurrentBgImage(template.bgImage);
                                console.log('Template selected:', template.name, 'BG:', template.bgImage);
                            }}
                            className={`group cursor-pointer relative bg-white p-3 rounded-[24px] border transition-all duration-300
                                ${selectedTemplate === template.name 
                                    ? "border-rose-200 shadow-xl shadow-rose-500/5 ring-1 ring-rose-100" 
                                    : "border-slate-100 hover:border-rose-100"
                                }`}
                        >
                            <div className="aspect-[4/5] rounded-[18px] overflow-hidden bg-slate-50 relative">
                                <img 
                                    src={template.image} 
                                    alt={template.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {template.badge && (
                                    <div className={`absolute top-4 right-4 ${template.badgeColor} text-white px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase`}>
                                        {template.badge}
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 px-1 flex items-center justify-between">
                                <span className="text-[14px] font-bold text-slate-800 tracking-tight">
                                    {template.name}
                                </span>
                                {selectedTemplate === template.name && (
                                    <CheckCircle2 size={16} className="text-rose-600" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Customize */}
            <div className="col-span-12 lg:col-span-5 flex flex-col p-8 bg-white overflow-y-auto no-scrollbar">
                <div className="mb-6">
                    <h2 className="text-[28px] font-black text-slate-900 tracking-tighter leading-none mb-2">
                        Customize Your Poster
                    </h2>
                    <p className="text-[14px] font-medium text-slate-400">
                        Personalize the details to match your salon's promotion.
                    </p>
                </div>

                {/* Live Preview — Full Width Top */}
                <div className="mb-8">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Preview
                    </p>
                    
                    <div className="flex justify-center">
                        <div ref={posterRef} className="aspect-[4/5.5] w-[280px] rounded-[20px] overflow-hidden shadow-2xl relative border-4 border-[#1e293b]" style={{boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)'}}>
                            <img 
                                key={selectedBg}
                                crossOrigin="anonymous"
                                src={currentBgImage} 
                                className="absolute inset-0 w-full h-full object-cover"
                                alt="Background"
                            />
                            
                            {/* Dark gradient scrim for readability */}
                            <div className="absolute inset-0" style={{
                                background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.85) 100%)'
                            }} />

                            {/* ═══ POSTER OVERLAY — Premium Design ═══ */}
                            <div className="absolute inset-0 flex flex-col justify-between" style={{ fontFamily: "'Georgia', serif", padding: '10px 10px 8px' }}>
                                
                                {/* ═══ TOP GROUP ═══ */}
                                <div>
                                    {/* ── SALON NAME with decorative corners ── */}
                                    <div style={{ position: 'relative', padding: '2px' }}>
                                        {/* Double border effect */}
                                        <div style={{
                                            background: 'linear-gradient(145deg, rgba(0,0,0,0.85), rgba(20,15,5,0.9))',
                                            border: '2px solid #d4af37',
                                            borderRadius: '4px',
                                            padding: '10px 8px 9px',
                                            textAlign: 'center',
                                            position: 'relative',
                                            boxShadow: 'inset 0 0 20px rgba(212,175,55,0.08), 0 4px 15px rgba(0,0,0,0.5)'
                                        }}>
                                            {/* Inner border */}
                                            <div style={{
                                                position: 'absolute', inset: '3px',
                                                border: '0.5px solid rgba(212,175,55,0.3)',
                                                borderRadius: '2px',
                                                pointerEvents: 'none'
                                            }} />
                                            {/* Corner ornaments */}
                                            {['top:1px;left:1px', 'top:1px;right:1px', 'bottom:1px;left:1px', 'bottom:1px;right:1px'].map((pos, i) => {
                                                const s = {};
                                                pos.split(';').forEach(p => { const [k,v] = p.split(':'); s[k] = v; });
                                                return <div key={i} style={{ position:'absolute', ...s, width:'8px', height:'8px', borderColor:'#d4af37', borderStyle:'solid', borderWidth: i<2 ? (i===0?'1px 0 0 1px':'1px 1px 0 0') : (i===2?'0 0 1px 1px':'0 1px 1px 0') }} />;
                                            })}
                                            <h3 style={{
                                                fontSize: '17px',
                                                fontWeight: 900,
                                                color: '#f5f5dc',
                                                letterSpacing: '0.18em',
                                                textTransform: 'uppercase',
                                                margin: 0,
                                                textShadow: '0 2px 8px rgba(0,0,0,1), 0 0 30px rgba(212,175,55,0.15)',
                                                fontFamily: "'Georgia', serif",
                                                fontStyle: 'italic'
                                            }}>
                                                {salonName}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* ── Decorative divider with diamond ── */}
                                    <div style={{ margin: '6px 8px 5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(to right, transparent, #d4af37 70%)' }} />
                                        <div style={{ width:'5px', height:'5px', background:'#d4af37', transform:'rotate(45deg)', flexShrink:0 }} />
                                        <span style={{ fontSize: '5.5px', color: '#d4af37', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap', textShadow:'0 1px 3px rgba(0,0,0,0.8)' }}>YOUR MESSAGE</span>
                                        <div style={{ width:'5px', height:'5px', background:'#d4af37', transform:'rotate(45deg)', flexShrink:0 }} />
                                        <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(to left, transparent, #d4af37 70%)' }} />
                                    </div>

                                    {/* ── WELCOME MESSAGE ── */}
                                    <div style={{
                                        background: 'linear-gradient(145deg, rgba(0,0,0,0.8), rgba(15,10,5,0.85))',
                                        border: '1.5px solid rgba(212,175,55,0.7)',
                                        borderRadius: '6px',
                                        padding: '8px 10px',
                                        textAlign: 'center',
                                        boxShadow: 'inset 0 0 15px rgba(212,175,55,0.05), 0 3px 10px rgba(0,0,0,0.4)'
                                    }}>
                                        <div style={{
                                            width: '18px', height: '18px',
                                            background: 'linear-gradient(135deg, #d4af37, #b8962e)',
                                            borderRadius: '50%',
                                            margin: '0 auto 5px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '9px',
                                            boxShadow: '0 2px 6px rgba(212,175,55,0.3)'
                                        }}>💬</div>
                                        <p style={{
                                            fontSize: '9px', color: '#f0e6d0', lineHeight: 1.4,
                                            margin: 0, fontWeight: 600, textTransform: 'uppercase',
                                            letterSpacing: '0.06em',
                                            textShadow: '0 1px 4px rgba(0,0,0,1)'
                                        }}>
                                            {welcomeMessage}
                                        </p>
                                    </div>

                                    {/* ── WE ARE divider with diamond ── */}
                                    <div style={{ margin: '6px 8px 5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(to right, transparent, #d4af37 70%)' }} />
                                        <div style={{ width:'5px', height:'5px', background:'#d4af37', transform:'rotate(45deg)', flexShrink:0 }} />
                                        <span style={{ fontSize: '5.5px', color: '#d4af37', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap', textShadow:'0 1px 3px rgba(0,0,0,0.8)' }}>WE ARE</span>
                                        <div style={{ width:'5px', height:'5px', background:'#d4af37', transform:'rotate(45deg)', flexShrink:0 }} />
                                        <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(to left, transparent, #d4af37 70%)' }} />
                                    </div>

                                    {/* ── ONLINE & OFFLINE ── */}
                                    <div style={{
                                        background: 'linear-gradient(145deg, rgba(0,0,0,0.8), rgba(15,10,5,0.85))',
                                        border: '1.5px solid rgba(212,175,55,0.7)',
                                        borderRadius: '6px',
                                        padding: '7px 6px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                                        boxShadow: 'inset 0 0 15px rgba(212,175,55,0.05), 0 3px 10px rgba(0,0,0,0.4)'
                                    }}>
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <div style={{
                                                width: '24px', height: '24px',
                                                background: 'linear-gradient(135deg, #d4af37, #b8962e)',
                                                borderRadius: '50%', margin: '0 auto 2px', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', fontSize: '11px',
                                                boxShadow: '0 2px 6px rgba(212,175,55,0.3)'
                                            }}>🏪</div>
                                            <p style={{ fontSize: '9px', color: '#d4af37', fontWeight: 900, margin: 0, letterSpacing: '0.06em' }}>ONLINE</p>
                                            {(serviceType === 'online' || serviceType === 'both') && (
                                                <p style={{ fontSize: '5.5px', color: '#bbb', margin: '1px 0 0', letterSpacing: '0.06em' }}>SERVICES AVAILABLE</p>
                                            )}
                                        </div>
                                        <div style={{
                                            width: '16px', height: '16px',
                                            border: '1px solid #d4af37',
                                            borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '7px', color: '#d4af37', fontWeight: 900, flexShrink: 0,
                                            background: 'rgba(212,175,55,0.08)'
                                        }}>&amp;</div>
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <div style={{
                                                width: '24px', height: '24px',
                                                background: 'linear-gradient(135deg, #d4af37, #b8962e)',
                                                borderRadius: '50%', margin: '0 auto 2px', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', fontSize: '11px',
                                                boxShadow: '0 2px 6px rgba(212,175,55,0.3)'
                                            }}>💺</div>
                                            <p style={{ fontSize: '9px', color: '#d4af37', fontWeight: 900, margin: 0, letterSpacing: '0.06em' }}>OFFLINE</p>
                                            {(serviceType === 'offline' || serviceType === 'both') && (
                                                <p style={{ fontSize: '5.5px', color: '#bbb', margin: '1px 0 0', letterSpacing: '0.06em' }}>SERVICES AVAILABLE</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* ═══ BOTTOM GROUP ═══ */}
                                <div>
                                    {/* ── GLOWNIFY BRANDING — Premium gradient band ── */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, rgba(40,30,15,0.95) 0%, rgba(60,45,20,0.95) 50%, rgba(40,30,15,0.95) 100%)',
                                        border: '1.5px solid #d4af37',
                                        borderRadius: '20px',
                                        padding: '7px 12px',
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        marginBottom: '5px',
                                        boxShadow: 'inset 0 1px 0 rgba(212,175,55,0.2), 0 4px 15px rgba(0,0,0,0.5)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        {/* Subtle shine effect */}
                                        <div style={{ position:'absolute', top:0, left:0, right:0, height:'40%', background:'linear-gradient(180deg, rgba(255,255,255,0.04), transparent)', borderRadius:'20px 20px 0 0', pointerEvents:'none' }} />
                                        <div style={{
                                            width: '30px', height: '30px',
                                            background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))',
                                            border: '1.5px solid #d4af37',
                                            borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '14px', flexShrink: 0,
                                            boxShadow: '0 0 10px rgba(212,175,55,0.2)'
                                        }}>👩</div>
                                        <div>
                                            <p style={{ fontSize: '5px', color: '#999', margin: 0, letterSpacing: '0.2em', textTransform: 'uppercase' }}>NOW AVAILABLE ON</p>
                                            <p style={{ fontSize: '14px', color: '#d4af37', fontWeight: 900, margin: '0', letterSpacing: '0.08em', fontFamily: "'Georgia', serif", textShadow: '0 1px 6px rgba(212,175,55,0.3)' }}>GLOWNIFY</p>
                                            <p style={{ fontSize: '5px', color: '#888', margin: 0, letterSpacing: '0.12em' }}>FOR ONLINE BOOKING</p>
                                        </div>
                                    </div>

                                    {/* ── CONTACT INFO — Elegant bar ── */}
                                    <div style={{
                                        background: 'linear-gradient(145deg, rgba(0,0,0,0.85), rgba(10,8,5,0.9))',
                                        border: '1px solid rgba(212,175,55,0.4)',
                                        borderRadius: '4px',
                                        padding: '5px 6px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2px'
                                    }}>
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <span style={{ fontSize: '9px' }}>📞</span>
                                            <p style={{ fontSize: '5px', color: '#e8dcc8', margin: '1px 0 0', fontWeight: 600, lineHeight: 1.2, wordBreak: 'break-word' }}>{phoneNumber}</p>
                                        </div>
                                        <div style={{ width: '1px', height: '18px', background: 'linear-gradient(180deg, transparent, #d4af37, transparent)' }} />
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <span style={{ fontSize: '9px' }}>📍</span>
                                            <p style={{ fontSize: '5px', color: '#e8dcc8', margin: '1px 0 0', fontWeight: 600, lineHeight: 1.2, wordBreak: 'break-word' }}>{address}</p>
                                        </div>
                                        <div style={{ width: '1px', height: '18px', background: 'linear-gradient(180deg, transparent, #d4af37, transparent)' }} />
                                        <div style={{ textAlign: 'center', flex: 1 }}>
                                            <span style={{ fontSize: '9px' }}>🌐</span>
                                            <p style={{ fontSize: '5px', color: '#e8dcc8', margin: '1px 0 0', fontWeight: 600, lineHeight: 1.2, wordBreak: 'break-word' }}>{website}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-5">
                        <button className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors border border-slate-100">
                            <Search size={16} />
                        </button>
                        <button className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors border border-slate-100" onClick={() => {}}>
                            <RefreshCcw size={16} />
                        </button>
                        <button className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors border border-slate-100" onClick={() => {}}>
                            <RotateCcw size={16} />
                        </button>
                    </div>
                </div>

                {/* Customization Form — Below Preview */}
                <div className="space-y-5">
                    <div>
                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                            Salon Name
                        </label>
                        <input 
                            type="text" 
                            value={salonName}
                            onChange={(e) => setSalonName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-200 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                            Welcome Message
                        </label>
                        <textarea 
                            value={welcomeMessage}
                            onChange={(e) => setWelcomeMessage(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-700 h-20 resize-none outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-200 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                            Service Availability
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setServiceType('online')}
                                className={`py-2.5 px-3 rounded-xl text-[12px] font-bold transition-all ${
                                    serviceType === 'online' 
                                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' 
                                        : 'bg-slate-50 text-slate-600 border border-slate-100 hover:border-slate-200'
                                }`}
                            >
                                Online Only
                            </button>
                            <button
                                onClick={() => setServiceType('offline')}
                                className={`py-2.5 px-3 rounded-xl text-[12px] font-bold transition-all ${
                                    serviceType === 'offline' 
                                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' 
                                        : 'bg-slate-50 text-slate-600 border border-slate-100 hover:border-slate-200'
                                }`}
                            >
                                Offline Only
                            </button>
                            <button
                                onClick={() => setServiceType('both')}
                                className={`py-2.5 px-3 rounded-xl text-[12px] font-bold transition-all ${
                                    serviceType === 'both' 
                                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' 
                                        : 'bg-slate-50 text-slate-600 border border-slate-100 hover:border-slate-200'
                                }`}
                            >
                                Both
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                                Phone Number
                            </label>
                            <input 
                                type="text" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-200 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                                Address
                            </label>
                            <input 
                                type="text" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-200 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                            Website / Social Media
                        </label>
                        <input 
                            type="text" 
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-200 transition-all"
                        />
                    </div>

                    <div className="pt-3">
                        <button 
                            onClick={async () => {
                                try {
                                    // === MANUAL CANVAS DRAWING ===
                                    const W = 1200, H = 1650;
                                    const canvas = document.createElement('canvas');
                                    canvas.width = W; canvas.height = H;
                                    const ctx = canvas.getContext('2d');
                                    
                                    // 1. Background image (cover-fit)
                                    const bgImg = new Image();
                                    bgImg.crossOrigin = 'anonymous';
                                    await new Promise((resolve, reject) => {
                                        bgImg.onload = resolve;
                                        bgImg.onerror = () => reject(new Error('Background image failed to load'));
                                        bgImg.src = currentBgImage;
                                    });
                                    const imgR = bgImg.width / bgImg.height, canR = W / H;
                                    let sx=0, sy=0, sw=bgImg.width, sh=bgImg.height;
                                    if (imgR > canR) { sw = bgImg.height * canR; sx = (bgImg.width - sw) / 2; }
                                    else { sh = bgImg.width / canR; sy = (bgImg.height - sh) / 2; }
                                    ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, W, H);
                                    
                                    // 2. Dark gradient scrim
                                    const scrim = ctx.createLinearGradient(0, 0, 0, H);
                                    scrim.addColorStop(0, 'rgba(0,0,0,0.55)');
                                    scrim.addColorStop(0.25, 'rgba(0,0,0,0.2)');
                                    scrim.addColorStop(0.5, 'rgba(0,0,0,0.15)');
                                    scrim.addColorStop(0.7, 'rgba(0,0,0,0.45)');
                                    scrim.addColorStop(1, 'rgba(0,0,0,0.85)');
                                    ctx.fillStyle = scrim; ctx.fillRect(0, 0, W, H);
                                    
                                    const M = 60; // margin from edges
                                    const CW = W - M * 2; // content width
                                    
                                    // Rounded rect helper
                                    const rr = (x, y, w, h, r) => {
                                        ctx.beginPath();
                                        ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
                                        ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
                                        ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
                                        ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
                                    };
                                    
                                    // Gold divider helper (with diamonds)
                                    const drawDivider = (cy, label) => {
                                        const textW = ctx.measureText(label).width;
                                        const gapHalf = textW / 2 + 30;
                                        // Left line
                                        const lg = ctx.createLinearGradient(M+30, 0, W/2 - gapHalf, 0);
                                        lg.addColorStop(0, 'transparent'); lg.addColorStop(1, '#d4af37');
                                        ctx.strokeStyle = lg; ctx.lineWidth = 1;
                                        ctx.beginPath(); ctx.moveTo(M+30, cy); ctx.lineTo(W/2 - gapHalf, cy); ctx.stroke();
                                        // Left diamond
                                        ctx.fillStyle = '#d4af37';
                                        ctx.save(); ctx.translate(W/2 - gapHalf + 8, cy); ctx.rotate(Math.PI/4);
                                        ctx.fillRect(-5, -5, 10, 10); ctx.restore();
                                        // Label
                                        ctx.fillStyle = '#d4af37'; ctx.textAlign = 'center';
                                        ctx.font = '700 20px Georgia, serif';
                                        ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 4;
                                        ctx.fillText(label, W/2, cy + 6); ctx.shadowBlur = 0;
                                        // Right diamond
                                        ctx.fillStyle = '#d4af37';
                                        ctx.save(); ctx.translate(W/2 + gapHalf - 8, cy); ctx.rotate(Math.PI/4);
                                        ctx.fillRect(-5, -5, 10, 10); ctx.restore();
                                        // Right line
                                        const rg = ctx.createLinearGradient(W/2 + gapHalf, 0, W - M - 30, 0);
                                        rg.addColorStop(0, '#d4af37'); rg.addColorStop(1, 'transparent');
                                        ctx.strokeStyle = rg;
                                        ctx.beginPath(); ctx.moveTo(W/2 + gapHalf, cy); ctx.lineTo(W - M - 30, cy); ctx.stroke();
                                    };

                                    // ═══ JUSTIFY-BETWEEN LAYOUT ═══
                                    // Content: 870px total, gaps: 6 × 130px = 780px, total = 1650
                                    
                                    // 3. SALON NAME BANNER
                                    const nameY = 130, nameH = 140;
                                    rr(M, nameY, CW, nameH, 12);
                                    ctx.fillStyle = 'rgba(0,0,0,0.82)'; ctx.fill();
                                    ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 4; ctx.stroke();
                                    // Inner border
                                    rr(M+10, nameY+10, CW-20, nameH-20, 6);
                                    ctx.strokeStyle = 'rgba(212,175,55,0.3)'; ctx.lineWidth = 1; ctx.stroke();
                                    // Corner L-shapes
                                    ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 2.5;
                                    [[M+6,nameY+6,25],[M+CW-6,nameY+6,-25],[M+6,nameY+nameH-6,25],[M+CW-6,nameY+nameH-6,-25]].forEach(([cx,cy,len]) => {
                                        const dy = cy < nameY + nameH/2 ? 1 : -1;
                                        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + len, cy); ctx.stroke();
                                        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + len * dy); ctx.stroke();
                                    });
                                    // Text
                                    ctx.fillStyle = '#f5f5dc'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.font = 'italic 900 62px Georgia, serif';
                                    ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 15;
                                    ctx.fillText(salonName.toUpperCase(), W/2, nameY + nameH/2);
                                    ctx.shadowBlur = 0;

                                    // 4. YOUR MESSAGE divider
                                    ctx.font = '700 20px Georgia, serif';
                                    drawDivider(400, 'YOUR MESSAGE');

                                    // 5. WELCOME MESSAGE BOX
                                    const msgY = 430, msgH = 180;
                                    rr(M, msgY, CW, msgH, 16);
                                    ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fill();
                                    ctx.strokeStyle = 'rgba(212,175,55,0.6)'; ctx.lineWidth = 2.5; ctx.stroke();
                                    // Gold chat circle
                                    ctx.beginPath(); ctx.arc(W/2, msgY + 48, 24, 0, Math.PI*2);
                                    const cGrad = ctx.createRadialGradient(W/2, msgY+48, 0, W/2, msgY+48, 24);
                                    cGrad.addColorStop(0, '#d4af37'); cGrad.addColorStop(1, '#b8962e');
                                    ctx.fillStyle = cGrad; ctx.fill();
                                    ctx.font = '24px serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff';
                                    ctx.fillText('💬', W/2, msgY + 55);
                                    // Welcome text with word wrap
                                    ctx.fillStyle = '#f0e6d0'; ctx.font = '600 32px Georgia, serif';
                                    ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 8;
                                    const wWords = welcomeMessage.toUpperCase().split(' ');
                                    let wLine = '', wLineY = msgY + 110;
                                    wWords.forEach(w => {
                                        const t = wLine + w + ' ';
                                        if (ctx.measureText(t).width > CW - 60) {
                                            ctx.fillText(wLine.trim(), W/2, wLineY); wLine = w + ' '; wLineY += 40;
                                        } else wLine = t;
                                    });
                                    ctx.fillText(wLine.trim(), W/2, wLineY);
                                    ctx.shadowBlur = 0;

                                    // 6. WE ARE divider
                                    ctx.font = '700 20px Georgia, serif';
                                    drawDivider(750, 'WE ARE');

                                    // 7. ONLINE & OFFLINE BOX
                                    const svcY = 780, svcH = 220;
                                    rr(M, svcY, CW, svcH, 16);
                                    ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fill();
                                    ctx.strokeStyle = 'rgba(212,175,55,0.6)'; ctx.lineWidth = 2.5; ctx.stroke();
                                    // Online
                                    const onX = W/2 - 180;
                                    ctx.beginPath(); ctx.arc(onX, svcY + 65, 38, 0, Math.PI*2);
                                    const oGrad = ctx.createRadialGradient(onX, svcY+65, 0, onX, svcY+65, 38);
                                    oGrad.addColorStop(0, '#d4af37'); oGrad.addColorStop(1, '#b8962e');
                                    ctx.fillStyle = oGrad; ctx.fill();
                                    ctx.font = '36px serif'; ctx.textAlign = 'center'; ctx.fillText('🏪', onX, svcY + 74);
                                    ctx.fillStyle = '#d4af37'; ctx.font = '900 32px Georgia'; ctx.fillText('ONLINE', onX, svcY + 130);
                                    if (serviceType === 'online' || serviceType === 'both') {
                                        ctx.fillStyle = '#bbb'; ctx.font = '600 18px Georgia'; ctx.fillText('SERVICES AVAILABLE', onX, svcY + 160);
                                    }
                                    // & circle
                                    ctx.beginPath(); ctx.arc(W/2, svcY + 75, 28, 0, Math.PI*2);
                                    ctx.fillStyle = 'rgba(212,175,55,0.08)'; ctx.fill();
                                    ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 2; ctx.stroke();
                                    ctx.fillStyle = '#d4af37'; ctx.font = '900 26px Georgia'; ctx.fillText('&', W/2, svcY + 83);
                                    // Offline
                                    const offX = W/2 + 180;
                                    ctx.beginPath(); ctx.arc(offX, svcY + 65, 38, 0, Math.PI*2);
                                    ctx.fillStyle = oGrad; ctx.fill();
                                    ctx.font = '36px serif'; ctx.fillText('💺', offX, svcY + 74);
                                    ctx.fillStyle = '#d4af37'; ctx.font = '900 32px Georgia'; ctx.fillText('OFFLINE', offX, svcY + 130);
                                    if (serviceType === 'offline' || serviceType === 'both') {
                                        ctx.fillStyle = '#bbb'; ctx.font = '600 18px Georgia'; ctx.fillText('SERVICES AVAILABLE', offX, svcY + 160);
                                    }

                                    // 8. GLOWNIFY BANNER
                                    const glY = 1130, glH = 160;
                                    rr(M, glY, CW, glH, 50);
                                    const glGrad = ctx.createLinearGradient(M, glY, M + CW, glY);
                                    glGrad.addColorStop(0, 'rgba(35,25,10,0.95)');
                                    glGrad.addColorStop(0.5, 'rgba(55,40,18,0.95)');
                                    glGrad.addColorStop(1, 'rgba(35,25,10,0.95)');
                                    ctx.fillStyle = glGrad; ctx.fill();
                                    ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 3; ctx.stroke();
                                    // Shine
                                    rr(M+2, glY+2, CW-4, glH*0.4, 50);
                                    ctx.fillStyle = 'rgba(255,255,255,0.03)'; ctx.fill();
                                    // Logo circle
                                    ctx.beginPath(); ctx.arc(M + 90, glY + glH/2, 42, 0, Math.PI*2);
                                    ctx.fillStyle = 'rgba(212,175,55,0.12)'; ctx.fill();
                                    ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 3; ctx.stroke();
                                    ctx.font = '48px serif'; ctx.textAlign = 'center'; ctx.fillText('👩', M+90, glY + glH/2 + 8);
                                    // Text
                                    ctx.textAlign = 'left';
                                    ctx.fillStyle = '#999'; ctx.font = '500 18px Georgia';
                                    ctx.fillText('NOW AVAILABLE ON', M + 155, glY + 38);
                                    ctx.fillStyle = '#d4af37'; ctx.font = '900 56px Georgia';
                                    ctx.shadowColor = 'rgba(212,175,55,0.3)'; ctx.shadowBlur = 12;
                                    ctx.fillText('GLOWNIFY', M + 155, glY + 90);
                                    ctx.shadowBlur = 0;
                                    ctx.fillStyle = '#888'; ctx.font = '500 18px Georgia';
                                    ctx.fillText('FOR ONLINE BOOKING', M + 155, glY + 120);

                                    // 9. CONTACT BAR
                                    const conY = 1420, conH = 100;
                                    rr(M, conY, CW, conH, 12);
                                    ctx.fillStyle = 'rgba(0,0,0,0.85)'; ctx.fill();
                                    ctx.strokeStyle = 'rgba(212,175,55,0.4)'; ctx.lineWidth = 2; ctx.stroke();
                                    const colW = CW / 3;
                                    ctx.textAlign = 'center';
                                    // Phone
                                    ctx.font = '28px serif'; ctx.fillText('📞', M + colW * 0.5, conY + 30);
                                    ctx.fillStyle = '#e8dcc8'; ctx.font = '600 17px Georgia';
                                    ctx.fillText(phoneNumber, M + colW * 0.5, conY + 58);
                                    // Divider 1
                                    const dg = ctx.createLinearGradient(0, conY+8, 0, conY + conH - 8);
                                    dg.addColorStop(0, 'transparent'); dg.addColorStop(0.5, '#d4af37'); dg.addColorStop(1, 'transparent');
                                    ctx.strokeStyle = dg; ctx.lineWidth = 1;
                                    ctx.beginPath(); ctx.moveTo(M + colW, conY+8); ctx.lineTo(M + colW, conY + conH - 8); ctx.stroke();
                                    // Address
                                    ctx.fillStyle = '#fff'; ctx.font = '28px serif'; ctx.fillText('📍', M + colW * 1.5, conY + 30);
                                    ctx.fillStyle = '#e8dcc8'; ctx.font = '600 17px Georgia';
                                    ctx.fillText(address, M + colW * 1.5, conY + 58);
                                    // Divider 2
                                    ctx.strokeStyle = dg;
                                    ctx.beginPath(); ctx.moveTo(M + colW * 2, conY+8); ctx.lineTo(M + colW * 2, conY + conH - 8); ctx.stroke();
                                    // Website
                                    ctx.fillStyle = '#fff'; ctx.font = '28px serif'; ctx.fillText('🌐', M + colW * 2.5, conY + 30);
                                    ctx.fillStyle = '#e8dcc8'; ctx.font = '600 17px Georgia';
                                    ctx.fillText(website, M + colW * 2.5, conY + 58);
                                    
                                    // === DOWNLOAD ===
                                    const link = document.createElement('a');
                                    link.download = `glownify-poster-${Date.now()}.png`;
                                    link.href = canvas.toDataURL('image/png', 1.0);
                                    link.click();
                                } catch (err) {
                                    console.error('Download failed:', err);
                                    alert('Download failed: ' + (err.message || 'Please try again.'));
                                }
                            }}
                            className="w-full bg-rose-600 hover:bg-rose-700 text-white h-14 rounded-xl flex items-center justify-center gap-3 text-[13px] font-black tracking-widest uppercase shadow-xl shadow-rose-600/20 transition-all active:scale-95 group"
                        >
                            <span>Preview & Download</span>
                            <Download size={18} className="transition-transform group-hover:translate-y-0.5" />
                        </button>
                        <p className="text-[9px] font-black text-slate-400 uppercase text-center mt-3 tracking-widest">
                            Available in JPG, PNG, and PDF
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-full bg-[#FBFBFB]">
            {/* ── 1. Top Header Section ── */}
            <div className="flex items-center justify-between py-6 px-8 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-12">
                    <h1 className="text-[20px] font-black text-slate-900 tracking-tight uppercase">
                        Poster Making
                    </h1>
                    
                    {/* Navigation Tabs */}
                    <nav className="flex items-center gap-10">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[12px] font-black tracking-widest uppercase transition-all relative py-2
                                    ${activeTab === tab 
                                        ? "text-rose-600" 
                                        : "text-slate-400 hover:text-slate-600"
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative group mr-4">
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                         <input type="text" placeholder="Search templates..." className="bg-slate-50 border border-slate-100 rounded-full pl-10 pr-6 py-2.5 text-[12px] font-bold text-slate-600 w-64 focus:bg-white focus:ring-4 focus:ring-rose-500/5 outline-none transition-all placeholder:text-slate-300" />
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <Bell size={20} />
                    </button>
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <Share2 size={20} />
                    </button>
                    <button className="px-6 py-3 bg-rose-600 text-white text-[12px] font-black tracking-widest uppercase rounded-full shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-all flex items-center gap-2">
                        New Poster
                    </button>
                </div>
            </div>

            {/* ── 2. Content Area ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
                {activeTab === "Overview" && renderOverview()}
                {activeTab === "Analytics" && renderAnalytics()}
                {activeTab === "Templates" && renderTemplates()}
                {activeTab === "History" && (
                    <div className="flex items-center justify-center p-20 text-slate-300 font-black uppercase tracking-widest">
                        History Content coming soon
                    </div>
                )}
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default MarketingSuitePage;
