import React, { useState } from "react";
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
    const [activeTab, setActiveTab] = useState("Templates");
    const [activeFilter, setActiveFilter] = useState("All Templates");
    const [selectedTemplate, setSelectedTemplate] = useState("Luxe Glow Theme");
    
    // Templates View State
    const [salonName, setSalonName] = useState("Serenity Skin Retreat");
    const [offerText, setOfferText] = useState("40% OFF");
    const [subText, setSubText] = useState("Book any facial treatment this weekend and receive a complimentary hydration mask.");
    const [phoneNumber, setPhoneNumber] = useState("+1 (555) 902-3412");

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
            name: "Luxe Glow Theme",
            badge: "POPULAR",
            image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600",
            badgeColor: "bg-rose-600",
        },
        {
            id: 2,
            name: "Serenity Blush",
            badge: "NEW",
            image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=600",
            badgeColor: "bg-emerald-500",
        },
        {
            id: 3,
            name: "Minimal Edge",
            badge: null,
            image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600",
            badgeColor: null,
        },
        {
            id: 4,
            name: "Urban Vibrant",
            badge: "POPULAR",
            image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600",
            badgeColor: "bg-rose-600",
        }
    ];

    const backgroundImages = [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=200"
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
                                src="/high_res_poster_overview_1774852263301.png" 
                                className="w-full h-full object-cover" 
                                alt="High res sample"
                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800" }}
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
                            onClick={() => setSelectedTemplate(template.name)}
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
                <div className="mb-8">
                    <h2 className="text-[28px] font-black text-slate-900 tracking-tighter leading-none mb-3">
                        Customize Your Poster
                    </h2>
                    <p className="text-[14px] font-medium text-slate-400">
                        Personalize the details to match your salon's promotion.
                    </p>
                </div>

                <div className="flex flex-col xl:flex-row items-start gap-8">
                    {/* Live Preview */}
                    <div className="w-full xl:w-[220px] shrink-0">
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live Preview
                        </p>
                        
                        <div className="aspect-[4/5.5] w-full bg-slate-900 rounded-[24px] overflow-hidden shadow-2xl shadow-rose-900/10 relative border-4 border-slate-900 ring-4 ring-slate-100/50">
                            <div className="absolute inset-0">
                                <img 
                                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600" 
                                    className="w-full h-full object-cover opacity-60" 
                                    alt="Preview BG"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>
                            
                            <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end">
                                <h3 className="text-[14px] font-black text-white leading-tight uppercase tracking-tight mb-2">
                                    Retreat
                                </h3>
                                <div className="bg-rose-600 inline-block self-start px-2 py-1 rounded text-[11px] font-black text-white mb-2">
                                    {offerText}
                                </div>
                                <p className="text-[7px] text-white/70 leading-relaxed line-clamp-2 mb-3">
                                    {subText}
                                </p>
                                <div className="flex items-center gap-1 text-[8px] font-medium text-white/90">
                                    <span className="p-1 rounded-full bg-white/10">📞</span>
                                    {phoneNumber}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-4 mt-6">
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

                    {/* Customization Form */}
                    <div className="flex-1 w-full space-y-6">
                        <div>
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5">
                                Salon Name
                            </label>
                            <input 
                                type="text" 
                                value={salonName}
                                onChange={(e) => setSalonName(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-700 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5">
                                Offer Text (Main Headline)
                            </label>
                            <input 
                                type="text" 
                                value={offerText}
                                onChange={(e) => setOfferText(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-700 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5">
                                Sub Text / Description
                            </label>
                            <textarea 
                                value={subText}
                                onChange={(e) => setSubText(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-700 h-24 resize-none outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5">
                                Phone Number
                            </label>
                            <input 
                                type="text" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-700 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                                Background Image
                            </label>
                            <div className="flex items-center gap-3">
                                {backgroundImages.map((img, i) => (
                                    <div key={i} className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:border-rose-400 transition-colors">
                                        <img src={img} className="w-full h-full object-cover" alt="BG Opt"/>
                                    </div>
                                ))}
                                <button className="w-12 h-12 rounded-lg border-2 border-dashed border-slate-200 text-slate-300 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white h-14 rounded-xl flex items-center justify-center gap-3 text-[13px] font-black tracking-widest uppercase shadow-xl shadow-rose-600/20 transition-all active:scale-95 group">
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
