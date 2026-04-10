import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, 
    X, 
    ChevronDown, 
    Plus, 
    Image as ImageIcon,
    ChevronRight,
    Check
} from 'lucide-react';

const MobileAddServiceScreen = () => {
    const navigate = useNavigate();

    // Form State
    const [serviceName, setServiceName] = useState('Hair Cutting');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('30 min');
    const [basePrice, setBasePrice] = useState('299');
    
    // Image Selection State
    const [imageSource, setImageSource] = useState('library'); // 'library' or 'upload'
    const [selectedLibraryImage, setSelectedLibraryImage] = useState(0);

    const libraryImages = [
        { id: 0, url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', label: 'Hair Cut' },
        { id: 1, url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400', label: 'Hair Styling' },
        { id: 2, url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400', label: 'Hair Wash' },
    ];

    // Add-ons State
    const [addOns, setAddOns] = useState([
        { id: 1, name: 'Hair Wash', price: '50', duration: '10 min', enabled: true },
        { id: 2, name: 'Head Massage', price: '100', duration: '15 min', enabled: true },
        { id: 3, name: 'Hair Styling', price: '150', duration: '20 min', enabled: true },
    ]);

    const toggleAddOn = (id) => {
        setAddOns(addOns.map(addon => 
            addon.id === id ? { ...addon, enabled: !addon.enabled } : addon
        ));
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#FFF5F6] font-sans">
            {/* ── Header ── */}
            <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <h1 className="text-lg font-bold text-[#1e293b]">Add New Service</h1>
                <button 
                    onClick={() => navigate(-1)}
                    className="px-4 py-1.5 bg-gray-100 rounded-full text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
                {/* ── Basic Service Details ── */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-[#1e293b]">Basic Service Details</h2>
                    
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Service Name</label>
                            <input 
                                type="text"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all shadow-sm"
                                placeholder="e.g. Hair Cutting"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Description</label>
                            <textarea 
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all shadow-sm resize-none"
                                placeholder="Short description / about the service..."
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 space-y-1.5">
                                <label className="text-sm font-semibold text-gray-600 ml-1">Service Duration</label>
                                <div className="relative">
                                    <select 
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all shadow-sm appearance-none"
                                    >
                                        <option>15 min</option>
                                        <option>30 min</option>
                                        <option>45 min</option>
                                        <option>60 min</option>
                                    </select>
                                    <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-1.5">
                                <label className="text-sm font-semibold text-gray-600 ml-1">Base Price</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 font-bold">₹</span>
                                    <input 
                                        type="number"
                                        value={basePrice}
                                        onChange={(e) => setBasePrice(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-2xl pl-8 pr-4 py-4 text-base text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all shadow-sm"
                                        placeholder="299"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-px bg-rose-100 w-full" />

                {/* ── Service Image ── */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-[#1e293b]">Service Image</h2>
                    
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div 
                                    onClick={() => setImageSource('library')}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${imageSource === 'library' ? 'border-[#1e293b] bg-[#1e293b]' : 'border-gray-300'}`}
                                >
                                    {imageSource === 'library' && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                                <span className="text-base font-semibold text-gray-700">Choose from Glownify Library</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div 
                                    onClick={() => setImageSource('upload')}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${imageSource === 'upload' ? 'border-[#1e293b] bg-[#1e293b]' : 'border-gray-300'}`}
                                >
                                    {imageSource === 'upload' && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                                <span className="text-base font-semibold text-gray-700">Upload Your Image</span>
                            </label>
                        </div>

                        {imageSource === 'library' && (
                            <div className="grid grid-cols-3 gap-3">
                                {libraryImages.map((img) => (
                                    <div 
                                        key={img.id}
                                        onClick={() => setSelectedLibraryImage(img.id)}
                                        className="space-y-2 cursor-pointer group"
                                    >
                                        <div className="relative rounded-2xl overflow-hidden aspect-square border-2 transition-all shadow-sm">
                                            <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                                            <div className={`absolute inset-0 transition-opacity ${selectedLibraryImage === img.id ? 'bg-black/20' : 'bg-transparent group-hover:bg-black/5'}`} />
                                            {selectedLibraryImage === img.id && (
                                                <div className="absolute top-2 right-2 w-6 h-6 bg-[#1e293b] rounded-full flex items-center justify-center">
                                                    <Check size={14} className="text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-[10px] font-bold text-center text-gray-500 uppercase tracking-wider">{img.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="space-y-2">
                             <div className="flex border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                                <div className="px-6 py-4 bg-white border-r border-gray-100 flex items-center justify-center">
                                    <span className="text-sm font-bold text-[#1e293b]">Upload File</span>
                                </div>
                                <div className="flex-1 px-4 py-4 flex items-center justify-between text-gray-300">
                                    <span className="text-sm font-medium">Choose File</span>
                                    <ChevronRight size={18} />
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 ml-1">Supported JPG / PNG</p>
                        </div>
                    </div>
                </section>

                <div className="h-px bg-rose-100 w-full" />

                {/* ── Add Customizable Add-Ons ── */}
                <section className="space-y-4">
                    <div>
                        <h2 className="text-xl font-bold text-[#1e293b]">Add Customizable Add-Ons</h2>
                        <p className="text-xs font-semibold text-gray-400 mt-1">Allow customers to enhance this service with additional options</p>
                    </div>

                    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                        {/* Table Header */}
                        <div className="flex px-4 py-3 bg-gray-50 border-b border-gray-100">
                            <span className="flex-[2] text-[10px] font-bold text-gray-400 uppercase tracking-wider">Add-On Name</span>
                            <span className="flex-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Price</span>
                            <span className="flex-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Duration</span>
                            <span className="flex-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Toggle</span>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-gray-50">
                            {addOns.map((addon) => (
                                <div key={addon.id} className="flex px-4 py-5 items-center">
                                    <span className="flex-[2] text-sm font-bold text-gray-800">{addon.name}</span>
                                    <span className="flex-1 text-sm font-bold text-gray-800 text-center">₹ {addon.price}</span>
                                    <span className="flex-1 text-sm font-medium text-gray-400 text-center">{addon.duration}</span>
                                    <div className="flex-1 flex justify-end">
                                        <button 
                                            onClick={() => toggleAddOn(addon.id)}
                                            className={`w-10 h-5 rounded-full relative transition-all duration-300 flex items-center px-0.5 ${addon.enabled ? 'bg-emerald-500' : 'bg-gray-200'}`}
                                        >
                                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${addon.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="flex items-center gap-2 text-[#1e293b] font-bold text-sm ml-1 group">
                        <div className="w-6 h-6 rounded-full border-2 border-[#1e293b] flex items-center justify-center group-hover:bg-[#1e293b] group-hover:text-white transition-all">
                            <Plus size={14} />
                        </div>
                        Add New Add-On
                    </button>
                </section>
            </div>

            {/* ── Footer ── */}
            <div className="p-4 bg-[#FFF5F6] border-t border-rose-50 flex gap-4 sticky bottom-0 z-30">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex-1 py-4 bg-gray-100 rounded-full text-base font-bold text-gray-600 hover:bg-gray-200 transition-colors shadow-sm"
                >
                    Cancel
                </button>
                <button 
                    onClick={() => {}}
                    className="flex-[2] py-4 bg-[#233554] text-white rounded-full text-base font-bold hover:bg-[#1a2942] transition-colors shadow-lg shadow-[#233554]/20"
                >
                    Save Service
                </button>
            </div>
        </div>
    );
};

export default MobileAddServiceScreen;
