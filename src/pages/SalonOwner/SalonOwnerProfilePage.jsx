import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, fetchMe, updateMe } from '../../redux/slice/authSlice';
import { fetchMySalon, updateMySalon } from '../../redux/slice/salonownerSlice';
import {
    Pencil,
    Save,
    Store,
    User,
    Phone,
    MessageCircle,
    MapPin,
    Clock,
    Users,
    ShieldCheck,
    Building2,
    Navigation,
    LogOut,
    CheckCircle2,
    Plus,
    Trash2,
    X,
    Camera,
    Image as ImageIcon,
    Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import useMobile from "../../hooks/useMobile";
import MobileSalonProfileScreen from "./Mobile/MobileSalonProfileScreen";

// Leaflet imports for Map
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const formatTime12h = (timeStr) => {
    if (!timeStr) return 'N/A';
    try {
        const [hours, minutes] = timeStr.split(':');
        let h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12;
        return `${h}:${minutes} ${ampm}`;
    } catch (e) {
        return timeStr;
    }
};

const dayOrder = { 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6, 'Sun': 7 };
const sortDays = (daysArray) => {
    if (!daysArray) return [];
    return [...daysArray].sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
};

const SectionHeader = ({ title, icon: Icon, onEdit, onCancel, isEditing, isSaving, showEdit = true }) => (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
                {Icon && <Icon size={20} />}
            </div>
            <h2 className="text-xl font-black text-gray-900">{title}</h2>
        </div>
        {showEdit && (
            <div className="flex items-center gap-2">
                {isEditing && (
                    <button
                        onClick={onCancel}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-5 h-9 rounded-xl font-bold text-xs uppercase bg-gray-100 text-gray-700 hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
                    >
                        <X size={14} /> Cancel
                    </button>
                )}
                <button
                    onClick={onEdit}
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-5 h-9 rounded-xl font-bold text-xs uppercase transition-all ${isEditing ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white'} disabled:opacity-70`}
                >
                    {isSaving ? (
                        <><Loader2 size={14} className="animate-spin" /> Saving...</>
                    ) : (
                        isEditing ? <><Save size={14} /> Save</> : <><Pencil size={14} /> Edit</>
                    )}
                </button>
            </div>
        )}
    </div>
);

const ViewItem = ({ label, value, icon: Icon, fullWidth = false }) => (
    <div className={`${fullWidth ? 'col-span-full' : 'col-span-1'} p-3 rounded-xl bg-gray-50/50 border border-gray-50`}>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-center gap-2">
            {Icon && <Icon size={12} className="text-gray-400" />}
            <p className="text-sm font-bold text-gray-800">{value || "N/A"}</p>
        </div>
    </div>
);

const EditItem = ({ label, value, onChange, type = "text", options }) => (
    <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        {options ? (
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-10 px-4 rounded-xl bg-gray-50 border border-gray-200 outline-none font-bold text-sm focus:border-rose-500"
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        ) : (
            <input
                type={type}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-10 px-4 rounded-xl bg-gray-50 border border-gray-200 outline-none font-bold text-sm focus:border-rose-500"
            />
        )}
    </div>
);

const MapPicker = ({ lat, lng, onChange, isEditing }) => {
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                if (isEditing) {
                    onChange(e.latlng.lat, e.latlng.lng);
                }
            },
        });

        return lat && lng ? (
            <Marker position={[Number(lat), Number(lng)]} />
        ) : null;
    };

    const center = lat && lng ? [Number(lat), Number(lng)] : [28.6139, 77.2090];

    return (
        <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-gray-100 shadow-inner z-0 mt-4">
            <MapContainer
                center={center}
                zoom={lat && lng ? 15 : 5}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
};

export default function SalonOwnerProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobile = useMobile(1024);
    const { user, loading: userLoading } = useSelector(state => state.auth);
    const { mySalon, loading: salonLoading } = useSelector(state => state.saloonowner);

    const [editingSection, setEditingSection] = useState(null);
    const [formData, setFormData] = useState({});
    const [newFiles, setNewFiles] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchMe());
        dispatch(fetchMySalon());
    }, [dispatch]);

    useEffect(() => {
        if (mySalon?.salon) {
            setFormData({
                ...mySalon.salon,
                openingHours: sortDays(mySalon.salon.openingHours),
                ownerName: user?.name,
                ownerEmail: user?.email,
                ownerWhatsapp: user?.whatsapp,
                ownerGender: user?.gender
            });
        }
    }, [mySalon, user]);

    if (isMobile) return <MobileSalonProfileScreen />;

    const handleSave = async (section) => {
        try {
            setIsSaving(true);
            let payload;
            let isFormData = false;
            const safeParse = (data) => {
                if (typeof data === 'string') {
                    try { return JSON.parse(data); } catch (e) { return data; }
                }
                return data;
            };

            if (section === 'owner') {
                payload = {
                    name: formData.ownerName,
                    email: formData.ownerEmail,
                    whatsapp: formData.ownerWhatsapp || '',
                    gender: formData.ownerGender || 'male'
                };
            } else if (section === 'gallery') {
                payload = new FormData();
                isFormData = true;
                // Add images to delete
                deletedImages.forEach(url => payload.append('deleteGalleryImages', url));
                // Add new images to upload
                newFiles.forEach(file => payload.append('galleryImages', file));
            } else {
                payload = {
                    shopName: formData.shopName,
                    about: formData.about,
                    contactNumber: formData.contactNumber,
                    whatsappNumber: formData.whatsappNumber,
                    targetGender: formData.targetGender,
                    offersHomeService: formData.offersHomeService,
                    location: safeParse(formData.location),
                    openingHours: safeParse(formData.openingHours)
                };
            }

            const res = await dispatch(updateMySalon({ payload, isFormData, isOwner: section === 'owner' }));
            if (!res.error) {
                toast.success('Updated successfully!');
                setEditingSection(null);
                setNewFiles([]);
                setDeletedImages([]);
                // No need to fetchMe and fetchMySalon as the slice updates state with the PUT response
            }
        } catch (error) {
            toast.error('Update failed');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setEditingSection(null);
        setNewFiles([]);
        setDeletedImages([]);
        if (mySalon?.salon) {
            setFormData({
                ...mySalon.salon,
                openingHours: sortDays(mySalon.salon.openingHours),
                ownerName: user?.name,
                ownerEmail: user?.email,
                ownerWhatsapp: user?.whatsapp,
                ownerGender: user?.gender
            });
        }
    };

    if ((userLoading && !user) || (salonLoading && !mySalon)) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-rose-500"></div></div>;

    const salon = mySalon?.salon || {};
    const loc = formData.location || {};
    const govtId = salon.governmentId || {};

    return (
        <div className="min-h-screen bg-gray-50/30 p-4 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-lg">
                            <Store size={24} />
                        </div>
                        <h1 className="text-xl font-black text-gray-900 tracking-tight">{salon.shopName}</h1>
                    </div>
                    <button onClick={() => { dispatch(logoutUser()); navigate('/login'); }} className="h-10 px-6 rounded-xl bg-rose-50 text-rose-500 font-bold text-xs uppercase hover:bg-rose-500 hover:text-white transition-all">Logout</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        {/* BASIC DETAILS */}
                        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <SectionHeader
                                title="Basic Details"
                                icon={Store}
                                isEditing={editingSection === 'basic'}
                                isSaving={isSaving}
                                onEdit={() => editingSection === 'basic' ? handleSave('basic') : setEditingSection('basic')}
                                onCancel={handleCancel}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                {editingSection === 'basic' ? (
                                    <>
                                        <div className="col-span-full"><EditItem label="Shop Name" value={formData.shopName} onChange={v => setFormData({ ...formData, shopName: v })} /></div>
                                        <div className="col-span-full"><EditItem label="About" value={formData.about} onChange={v => setFormData({ ...formData, about: v })} /></div>
                                        <EditItem label="Primary Contact" value={formData.contactNumber} onChange={v => setFormData({ ...formData, contactNumber: v })} />
                                        <EditItem label="WhatsApp Business" value={formData.whatsappNumber} onChange={v => setFormData({ ...formData, whatsappNumber: v })} />
                                        <EditItem label="Target Gender" value={formData.targetGender} onChange={v => setFormData({ ...formData, targetGender: v })} options={[{ label: 'Men', value: 'men' }, { label: 'Women', value: 'women' }, { label: 'Unisex', value: 'unisex' }]} />
                                        <EditItem label="Home Service" value={formData.offersHomeService ? 'true' : 'false'} onChange={v => setFormData({ ...formData, offersHomeService: v === 'true' })} options={[{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }]} />
                                    </>
                                ) : (
                                    <>
                                        <ViewItem label="Shop Name" value={salon.shopName} fullWidth />
                                        <ViewItem label="Contact" value={salon.contactNumber} icon={Phone} />
                                        <ViewItem label="WhatsApp" value={salon.whatsappNumber} icon={MessageCircle} />
                                        <ViewItem label="Target" value={salon.targetGender?.toUpperCase()} />
                                        <ViewItem label="Home Service" value={salon.offersHomeService ? 'Yes' : 'No'} />
                                        <ViewItem label="About Salon" value={salon.about} fullWidth />
                                    </>
                                )}
                            </div>
                        </section>

                        {/* GALLERY */}
                        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <SectionHeader
                                title="Salon Gallery"
                                icon={ImageIcon}
                                isEditing={editingSection === 'gallery'}
                                isSaving={isSaving}
                                onEdit={() => editingSection === 'gallery' ? handleSave('gallery') : setEditingSection('gallery')}
                                onCancel={handleCancel}
                            />
                            {editingSection === 'gallery' ? (
                                <div className="grid grid-cols-4 gap-4">
                                    {formData.galleryImages?.map((img, i) => (
                                        <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100"><img src={img} className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => {
                                                    setDeletedImages(prev => [...prev, img]);
                                                    setFormData({ ...formData, galleryImages: formData.galleryImages.filter((_, idx) => idx !== i) });
                                                }}
                                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-rose-500 transition-colors"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    {newFiles.map((file, i) => (
                                        <div key={`new-${i}`} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-rose-200"><img src={URL.createObjectURL(file)} className="w-full h-full object-cover opacity-60" />
                                            <button onClick={() => setNewFiles(newFiles.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full"><X size={12} /></button>
                                        </div>
                                    ))}
                                    <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"><Camera size={24} className="text-gray-400 mb-1" /><span className="text-[10px] font-black text-gray-400 uppercase">Add</span><input type="file" multiple hidden accept="image/*" onChange={e => setNewFiles([...newFiles, ...Array.from(e.target.files)])} /></label>
                                </div>
                            ) : (
                                formData.galleryImages?.length > 0 ? (
                                    <div className="relative">
                                        <div 
                                            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 no-scrollbar"
                                            style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                                            onScroll={(e) => {
                                                const scrollLeft = e.target.scrollLeft;
                                                const width = e.target.clientWidth;
                                                const newIndex = Math.round(scrollLeft / width);
                                                if (newIndex !== activeGalleryIndex) setActiveGalleryIndex(newIndex);
                                            }}
                                        >
                                            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                                            {formData.galleryImages.map((img, i) => (
                                                <div key={i} className="flex-none w-full snap-start aspect-video rounded-2xl overflow-hidden border border-gray-100">
                                                    <img src={img} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                        {formData.galleryImages.length > 1 && (
                                            <div className="flex justify-center gap-2 mt-4">
                                                {formData.galleryImages.map((_, i) => (
                                                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeGalleryIndex ? 'w-4 bg-emerald-500' : 'w-1.5 bg-gray-200'}`} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="py-12 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
                                        <ImageIcon size={32} className="mb-2 opacity-50" />
                                        <p className="text-sm font-bold">No gallery images available</p>
                                    </div>
                                )
                            )}
                        </section>
                    </div>

                    <div className="space-y-6">
                        {/* BUSINESS ENTITY */}
                        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <SectionHeader title="Business Entity" icon={Building2} showEdit={false} />
                            <ViewItem label="Shop Type" value={salon.shopType?.toUpperCase()} icon={ShieldCheck} />
                            <div className="mt-6 space-y-3">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Registered Partners</p>
                                <div className="grid grid-cols-1 gap-3">
                                    {salon.partners?.map((p, i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                            <p className="text-sm font-black text-gray-900 mb-2">{p.name}</p>
                                            <div className="flex gap-6">
                                                <div className="flex items-center gap-2"><Phone size={12} className="text-gray-400" /><span className="text-xs font-bold text-gray-600">{p.contactNumber}</span></div>
                                                <div className="flex items-center gap-2"><MessageCircle size={12} className="text-emerald-500" /><span className="text-xs font-bold text-gray-600">{p.whatsappNumber}</span></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* LOCATION */}
                        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <SectionHeader
                                title="Location Info"
                                icon={MapPin}
                                isEditing={editingSection === 'location'}
                                isSaving={isSaving}
                                onEdit={() => editingSection === 'location' ? handleSave('location') : setEditingSection('location')}
                                onCancel={handleCancel}
                            />
                            
                            <MapPicker 
                                lat={loc.coordinates?.[1]} 
                                lng={loc.coordinates?.[0]} 
                                isEditing={editingSection === 'location'}
                                onChange={(lat, lng) => setFormData({
                                    ...formData, 
                                    location: { ...loc, coordinates: [Number(lng), Number(lat)] }
                                })}
                            />

                            {editingSection === 'location' ? (
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="col-span-full">
                                        <EditItem label="Full Address" value={loc.address} onChange={v => setFormData({ ...formData, location: { ...loc, address: v } })} />
                                    </div>
                                    <EditItem label="City" value={loc.city} onChange={v => setFormData({ ...formData, location: { ...loc, city: v } })} />
                                    <EditItem label="State" value={loc.state} onChange={v => setFormData({ ...formData, location: { ...loc, state: v } })} />
                                    <EditItem label="Pincode" value={loc.pincode} onChange={v => setFormData({ ...formData, location: { ...loc, pincode: v } })} />
                                    <EditItem label="Latitude" value={loc.coordinates?.[1]} onChange={v => setFormData({ ...formData, location: { ...loc, coordinates: [loc.coordinates?.[0], Number(v)] } })} />
                                    <EditItem label="Longitude" value={loc.coordinates?.[0]} onChange={v => setFormData({ ...formData, location: { ...loc, coordinates: [Number(v), loc.coordinates?.[1]] } })} />
                                </div>
                            ) : (
                                <div className="mt-6 space-y-4">
                                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                        <p className="text-base font-bold text-gray-900 mb-1">{loc.address}</p>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{loc.city}, {loc.state} - {loc.pincode}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <ViewItem label="Latitude" value={loc.coordinates?.[1]} icon={Navigation} />
                                        <ViewItem label="Longitude" value={loc.coordinates?.[0]} icon={Navigation} />
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div className="space-y-6">
                        {/* OPENING HOURS */}
                        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <SectionHeader
                                title="Opening Hours"
                                icon={Clock}
                                isEditing={editingSection === 'hours'}
                                isSaving={isSaving}
                                onEdit={() => editingSection === 'hours' ? handleSave('hours') : setEditingSection('hours')}
                                onCancel={handleCancel}
                            />
                            <div className="grid grid-cols-1 gap-2">
                                {formData.openingHours?.map((h, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 border border-gray-50">
                                        <div className="flex items-center gap-3">
                                            {editingSection === 'hours' && <button onClick={() => setFormData({ ...formData, openingHours: formData.openingHours.filter((_, idx) => idx !== i) })} className="text-rose-500 p-1"><Trash2 size={14} /></button>}
                                            <span className="text-xs font-black text-gray-400 w-12">{h.day}</span>
                                        </div>
                                        {editingSection === 'hours' ? (
                                            <div className="flex items-center gap-3">
                                                <input type="time" value={h.start} onChange={e => {
                                                    const nh = [...formData.openingHours]; nh[i] = { ...h, start: e.target.value }; setFormData({ ...formData, openingHours: sortDays(nh) });
                                                }} className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-bold outline-none" />
                                                <span className="text-gray-300 text-xs">to</span>
                                                <input type="time" value={h.end} onChange={e => {
                                                    const nh = [...formData.openingHours]; nh[i] = { ...h, end: e.target.value }; setFormData({ ...formData, openingHours: sortDays(nh) });
                                                }} className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-bold outline-none" />
                                            </div>
                                        ) : (
                                            <span className="text-sm font-bold text-gray-800">{formatTime12h(h.start)} — {formatTime12h(h.end)}</span>
                                        )}
                                    </div>
                                ))}
                                {editingSection === 'hours' && (
                                    <div className="pt-2">
                                        <select onChange={(e) => {
                                            if (!e.target.value) return;
                                            setFormData({ ...formData, openingHours: sortDays([...(formData.openingHours || []), { day: e.target.value, start: "09:00", end: "20:00" }]) });
                                            e.target.value = "";
                                        }} className="w-full h-10 px-4 rounded-xl bg-gray-50 border border-gray-200 outline-none font-bold text-xs text-gray-500">
                                            <option value="">+ Add Working Day</option>
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].filter(d => !formData.openingHours?.some(h => h.day === d)).map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        {/* GOVERNMENT ID */}
                        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-fit">
                            <SectionHeader title="Government ID" icon={ShieldCheck} showEdit={false} />
                            <div className="flex flex-col gap-6">
                                <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden border-2 border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center">
                                    {govtId.idImageUrl ? (
                                        <img src={govtId.idImageUrl} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-gray-400">
                                            <ImageIcon size={48} />
                                            <span className="text-sm font-bold">No Document Uploaded</span>
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <ViewItem label="Document Type" value={govtId.idType} icon={ShieldCheck} />
                                    <ViewItem label="Document ID" value={govtId.idNumber} />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="mt-6">
                    {/* OWNER INFO */}
                    <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <SectionHeader
                            title="Owner Information"
                            icon={User}
                            isEditing={editingSection === 'owner'}
                            isSaving={isSaving}
                            onEdit={() => editingSection === 'owner' ? handleSave('owner') : setEditingSection('owner')}
                            onCancel={handleCancel}
                        />
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {editingSection === 'owner' ? (
                                <>
                                    <EditItem label="Full Name" value={formData.ownerName} onChange={v => setFormData({ ...formData, ownerName: v })} />
                                    <EditItem label="WhatsApp" value={formData.ownerWhatsapp} onChange={v => setFormData({ ...formData, ownerWhatsapp: v })} />
                                    <EditItem label="Gender" value={formData.ownerGender} onChange={v => setFormData({ ...formData, ownerGender: v })} options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]} />
                                </>
                            ) : (
                                <>
                                    <ViewItem label="Legal Name" value={user?.name} icon={User} />
                                    <ViewItem label="Email" value={user?.email} />
                                    <ViewItem label="WhatsApp" value={user?.whatsapp} icon={MessageCircle} />
                                    <ViewItem label="Gender" value={user?.gender?.toUpperCase()} />
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
