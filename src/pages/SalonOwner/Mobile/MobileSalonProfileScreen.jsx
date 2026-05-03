import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, fetchMe, updateMe } from '../../../redux/slice/authSlice';
import { fetchMySalon, updateMySalon } from '../../../redux/slice/salonownerSlice';
import {
    Pencil,
    Save,
    X,
    Store,
    User,
    Phone,
    MessageCircle,
    MapPin,
    Clock,
    Users,
    ShieldCheck,
    CreditCard,
    Plus,
    CheckCircle2,
    LogOut,
    Navigation,
    Building2,
    Trash2,
    Image as ImageIcon,
    Camera,
    Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import MobileBottomNav from './MobileBottomNav';

// Leaflet imports for Map
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

// MapPicker component for displaying and selecting location
const MapPicker = ({ lat, lng, onChange, isEditing, onUseCurrentLocation }) => {
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                if (isEditing && onChange) {
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
        <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-gray-100 shadow-inner mt-4 z-0">
            {isEditing && onUseCurrentLocation && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onUseCurrentLocation();
                    }}
                    className="absolute top-2 right-2 z-[1000] px-3 py-2 rounded-xl bg-white text-rose-500 text-xs font-bold shadow-md"
                >
                    Use Current Location
                </button>
            )}
            <MapContainer center={center} zoom={lat && lng ? 15 : 5} style={{ width: "100%", height: "100%", zIndex: 0 }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
};




const COLORS = {
    primary: '#1f2937',
    accent: '#f43f5e',
    secondary: '#6b7280',
    border: '#f3f4f6',
    bg: '#ffffff',
    subtle: '#f9fafb',
    success: '#10b981',
    danger: '#ef4444'
};

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

const Card = ({ title, children, onEdit, onCancel, isEditing, isSaving, showEdit = true, icon: Icon }) => (
    <div style={{ backgroundColor: COLORS.bg, borderRadius: '16px', padding: '16px', border: `1px solid ${COLORS.border}`, marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ padding: '6px', borderRadius: '10px', backgroundColor: COLORS.subtle }}>
                    {Icon && <Icon size={16} color={COLORS.primary} />}
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: COLORS.primary, margin: 0 }}>{title}</h3>
            </div>
            {showEdit && (
                <div style={{ display: 'flex', gap: '8px' }}>
                    {isEditing && (
                        <button
                            onClick={onCancel}
                            disabled={isSaving}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '10px',
                                backgroundColor: COLORS.subtle,
                                color: COLORS.danger,
                                border: 'none',
                                fontSize: '11px',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                opacity: isSaving ? 0.5 : 1
                            }}
                        >
                            <X size={12} /> Cancel
                        </button>
                    )}
                    <button
                        onClick={onEdit}
                        disabled={isSaving}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '10px',
                            backgroundColor: isEditing ? (isSaving ? COLORS.secondary : COLORS.success) : COLORS.subtle,
                            color: isEditing ? '#fff' : COLORS.primary,
                            border: 'none',
                            fontSize: '11px',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            opacity: isSaving ? 0.7 : 1
                        }}
                    >
                        {isSaving ? (
                            <><Loader2 size={12} className="animate-spin" /> saving...</>
                        ) : (
                            isEditing ? <><Save size={12} /> Save</> : <><Pencil size={12} /> Edit</>
                        )}
                    </button>
                </div>
            )}
        </div>
        {children}
    </div>
);

const ViewField = ({ label, value, icon: Icon, fullWidth = false }) => (
    <div style={{ marginBottom: '10px', gridColumn: fullWidth ? '1 / -1' : 'auto' }}>
        <p style={{ fontSize: '9px', color: COLORS.secondary, fontWeight: '700', textTransform: 'uppercase', marginBottom: '2px' }}>{label}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {Icon && <Icon size={12} color={COLORS.secondary} />}
            <p style={{ fontSize: '13px', color: COLORS.primary, fontWeight: '600', margin: 0 }}>{value || 'N/A'}</p>
        </div>
    </div>
);

const InputField = ({ label, value, onChange, type = "text", options }) => (
    <div style={{ marginBottom: '10px' }}>
        <label style={{ fontSize: '9px', color: COLORS.secondary, fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>{label}</label>
        {options ? (
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '12px', border: `1px solid ${COLORS.border}`, fontSize: '13px', fontWeight: '600', outline: 'none', backgroundColor: COLORS.subtle }}
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        ) : (
            <input
                type={type}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '12px', border: `1px solid ${COLORS.border}`, fontSize: '13px', fontWeight: '600', outline: 'none', boxSizing: 'border-box', backgroundColor: COLORS.subtle }}
            />
        )}
    </div>
);

export default function MobileSalonProfileScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const handleUpdate = async (section) => {
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
                // Redundant fetches removed
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

    const handleLogout = () => {
        if (window.confirm('Logout?')) {
            dispatch(logoutUser());
            navigate('/login');
        }
    };

    if ((userLoading && !user) || (salonLoading && !mySalon)) {
        return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-rose-500"></div>
        </div>;
    }

    const salon = mySalon?.salon || {};
    const loc = formData.location || {};
    const govtId = salon.governmentId || {};

    return (
        <div style={{ backgroundColor: COLORS.subtle, minHeight: '100vh', paddingBottom: '90px' }}>

            <div style={{ backgroundColor: '#fff', padding: '12px 16px', borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '18px', fontWeight: '900', color: COLORS.primary, margin: 0 }}>{salon.shopName}</h1>
                    <button onClick={handleLogout} style={{ background: COLORS.subtle, border: 'none', padding: '8px', borderRadius: '12px', color: COLORS.danger }}>
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

            <div style={{ padding: '12px' }}>

                {/* ─── BASIC INFO ─── */}
                <Card
                    title="Basic Information"
                    icon={Store}
                    isEditing={editingSection === 'basic'}
                    isSaving={isSaving}
                    onEdit={() => editingSection === 'basic' ? handleUpdate('basic') : setEditingSection('basic')}
                    onCancel={handleCancel}
                >
                    {editingSection === 'basic' ? (
                        <>
                            <InputField label="Shop Name" value={formData.shopName} onChange={(v) => setFormData({ ...formData, shopName: v })} />
                            <InputField label="About" value={formData.about} onChange={(v) => setFormData({ ...formData, about: v })} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                <InputField label="Contact" value={formData.contactNumber} onChange={(v) => setFormData({ ...formData, contactNumber: v })} />
                                <InputField label="WhatsApp" value={formData.whatsappNumber} onChange={(v) => setFormData({ ...formData, whatsappNumber: v })} />
                            </div>
                            <InputField label="Target Gender" value={formData.targetGender} onChange={(v) => setFormData({ ...formData, targetGender: v })} options={[{ label: 'Men', value: 'men' }, { label: 'Women', value: 'women' }, { label: 'Unisex', value: 'unisex' }]} />
                            <InputField label="Home Service" value={formData.offersHomeService ? 'true' : 'false'} onChange={(v) => setFormData({ ...formData, offersHomeService: v === 'true' })} options={[{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }]} />
                        </>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <ViewField label="Shop Name" value={salon.shopName} fullWidth />
                            <ViewField label="Phone" value={salon.contactNumber} icon={Phone} />
                            <ViewField label="WhatsApp" value={salon.whatsappNumber} icon={MessageCircle} />
                            <ViewField label="Target Gender" value={salon.targetGender?.toUpperCase()} />
                            <ViewField label="Home Service" value={salon.offersHomeService ? 'Yes' : 'No'} />
                            <ViewField label="About" value={salon.about} fullWidth />
                        </div>
                    )}
                </Card>

                {/* ─── GALLERY ─── */}
                <Card
                    title="Salon Gallery"
                    icon={ImageIcon}
                    isEditing={editingSection === 'gallery'}
                    isSaving={isSaving}
                    onEdit={() => editingSection === 'gallery' ? handleUpdate('gallery') : setEditingSection('gallery')}
                    onCancel={handleCancel}
                >
                    {editingSection === 'gallery' ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                            {formData.galleryImages?.map((img, i) => (
                                <div key={i} style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${COLORS.border}` }}>
                                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <button
                                        onClick={() => {
                                            setDeletedImages(prev => [...prev, img]);
                                            setFormData({ ...formData, galleryImages: formData.galleryImages.filter((_, idx) => idx !== i) });
                                        }}
                                        style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', padding: '4px', color: '#fff' }}
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            {newFiles.map((file, i) => (
                                <div key={`new-${i}`} style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', border: `2px dashed ${COLORS.accent}` }}>
                                    <img src={URL.createObjectURL(file)} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                                    <button onClick={() => setNewFiles(newFiles.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '4px', right: '4px', background: COLORS.accent, border: 'none', borderRadius: '50%', padding: '4px', color: '#fff' }}><X size={12} /></button>
                                </div>
                            ))}
                            <label style={{ aspectRatio: '1/1', borderRadius: '12px', border: `2px dashed ${COLORS.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: COLORS.subtle }}>
                                <Camera size={20} color={COLORS.secondary} />
                                <span style={{ fontSize: '8px', fontWeight: '800', color: COLORS.secondary }}>ADD</span>
                                <input type="file" multiple hidden accept="image/*" onChange={(e) => setNewFiles([...newFiles, ...Array.from(e.target.files)])} />
                            </label>
                        </div>
                    ) : (
                        formData.galleryImages?.length > 0 ? (
                            <div style={{ position: 'relative' }}>
                                <div
                                    style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', gap: '8px', scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                                    onScroll={(e) => {
                                        const scrollLeft = e.target.scrollLeft;
                                        const width = e.target.clientWidth;
                                        const newIndex = Math.round(scrollLeft / width);
                                        if (newIndex !== activeGalleryIndex) setActiveGalleryIndex(newIndex);
                                    }}
                                    className="no-scrollbar"
                                >
                                    <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                                    {formData.galleryImages.map((img, i) => (
                                        <div key={i} style={{ flex: '0 0 100%', scrollSnapAlign: 'start', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${COLORS.border}` }}>
                                            <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    ))}
                                </div>
                                {formData.galleryImages.length > 1 && (
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
                                        {formData.galleryImages.map((_, i) => (
                                            <div key={i} style={{ width: i === activeGalleryIndex ? '16px' : '6px', height: '6px', borderRadius: '6px', backgroundColor: i === activeGalleryIndex ? COLORS.accent : COLORS.secondary, transition: 'all 0.3s ease' }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p style={{ fontSize: '13px', color: COLORS.secondary, textAlign: 'center', padding: '20px 0', margin: 0 }}>No gallery images available</p>
                        )
                    )}
                </Card>

                {/* ─── BUSINESS ENTITY ─── */}
                <Card title="Business Entity" icon={Building2} showEdit={false}>
                    <ViewField label="Shop Type" value={salon.shopType?.toUpperCase()} icon={ShieldCheck} />
                    <div style={{ marginTop: '8px' }}>
                        <p style={{ fontSize: '9px', color: COLORS.secondary, fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>Registered Partners</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {salon.partners?.map((p, i) => (
                                <div key={i} style={{ backgroundColor: COLORS.subtle, padding: '10px', borderRadius: '12px', border: `1px solid ${COLORS.border}` }}>
                                    <p style={{ fontSize: '12px', fontWeight: '800', color: COLORS.primary, margin: '0 0 4px 0' }}>{p.name}</p>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Phone size={10} color={COLORS.secondary} />
                                            <span style={{ fontSize: '10px', color: COLORS.secondary, fontWeight: '600' }}>{p.contactNumber}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <MessageCircle size={10} color={COLORS.success} />
                                            <span style={{ fontSize: '10px', color: COLORS.secondary, fontWeight: '600' }}>{p.whatsappNumber}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* ─── LOCATION ─── */}
                <Card
                    title="Location Details"
                    icon={MapPin}
                    isEditing={editingSection === 'location'}
                    isSaving={isSaving}
                    onEdit={() => editingSection === 'location' ? handleUpdate('location') : setEditingSection('location')}
                    onCancel={handleCancel}
                >
                    {editingSection === 'location' ? (
                        <>
                            <InputField label="Full Address" value={loc.address} onChange={(v) => setFormData({ ...formData, location: { ...loc, address: v } })} />
                            <div className="grid grid-cols-2 gap-2">
                                <InputField label="City" value={loc.city} onChange={(v) => setFormData({ ...formData, location: { ...loc, city: v } })} />
                                <InputField label="State" value={loc.state} onChange={(v) => setFormData({ ...formData, location: { ...loc, state: v } })} />
                            </div>
                            <InputField label="Pincode" value={loc.pincode} onChange={(v) => setFormData({ ...formData, location: { ...loc, pincode: v } })} />
                            <InputField label="Latitude" value={loc.coordinates?.[1] || ''} onChange={(v) => setFormData({ ...formData, location: { ...loc, coordinates: [loc.coordinates?.[0], Number(v)] } })} />
                            <InputField label="Longitude" value={loc.coordinates?.[0] || ''} onChange={(v) => setFormData({ ...formData, location: { ...loc, coordinates: [Number(v), loc.coordinates?.[1]] } })} />
                            {/* Map Picker for editing */}
                            <MapPicker
                                lat={loc.coordinates?.[1]}
                                lng={loc.coordinates?.[0]}
                                isEditing={true}
                                onChange={(lat, lng) => setFormData({ ...formData, location: { ...loc, coordinates: [lng, lat] } })}
                                onUseCurrentLocation={() => {
                                    if (navigator.geolocation) {
                                        navigator.geolocation.getCurrentPosition(
                                            (pos) => {
                                                const { latitude, longitude } = pos.coords;
                                                setFormData({
                                                    ...formData,
                                                    location: {
                                                        ...loc,
                                                        coordinates: [Number(longitude), Number(latitude)],
                                                    },
                                                });
                                            },
                                            () => {
                                                toast.error('Unable to fetch current location');
                                            }
                                        );
                                    }
                                }}
                            />
                        </>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <ViewField label="Address" value={loc.address} fullWidth />
                            <ViewField label="City" value={loc.city} />
                            <ViewField label="State" value={loc.state} />
                            <ViewField label="Pincode" value={loc.pincode} />
                            <ViewField label="Latitude" value={loc.coordinates?.[1] || 'N/A'} />
                            <ViewField label="Longitude" value={loc.coordinates?.[0] || 'N/A'} />
                            <div style={{ gridColumn: 'span 2' }}>
                                {/* Map Picker for viewing */}
                                <MapPicker
                                    lat={loc.coordinates?.[1]}
                                    lng={loc.coordinates?.[0]}
                                    isEditing={false}
                                    onChange={() => { }}
                                />
                            </div>
                        </div>
                    )}
                </Card>

                {/* ─── OPENING HOURS ─── */}
                <Card
                    title="Opening Hours"
                    icon={Clock}
                    isEditing={editingSection === 'hours'}
                    isSaving={isSaving}
                    onEdit={() => editingSection === 'hours' ? handleUpdate('hours') : setEditingSection('hours')}
                    onCancel={handleCancel}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {formData.openingHours?.map((h, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: `1px solid ${COLORS.border}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {editingSection === 'hours' && (
                                        <button onClick={() => setFormData({ ...formData, openingHours: formData.openingHours.filter((_, idx) => idx !== i) })} style={{ background: 'none', border: 'none', color: COLORS.danger }}><Trash2 size={14} /></button>
                                    )}
                                    {editingSection === 'hours' ? (
                                        <select
                                            value={h.day}
                                            onChange={(e) => {
                                                const nh = [...formData.openingHours];
                                                nh[i] = { ...h, day: e.target.value };
                                                setFormData({ ...formData, openingHours: sortDays(nh) });
                                            }}
                                            style={{ fontSize: '10px', padding: '4px', borderRadius: '6px', border: `1px solid ${COLORS.border}`, outline: 'none', width: '55px' }}
                                        >
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                                .filter(d => d === h.day || !(formData.openingHours?.some(oh => oh.day === d)))
                                                .map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    ) : (
                                        <span style={{ fontSize: '11px', fontWeight: '800', color: COLORS.secondary, width: '30px' }}>{h.day}</span>
                                    )}
                                </div>
                                {editingSection === 'hours' ? (
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <input type="time" value={h.start} onChange={(e) => {
                                            const nh = [...formData.openingHours]; nh[i] = { ...h, start: e.target.value }; setFormData({ ...formData, openingHours: sortDays(nh) });
                                        }} style={{ fontSize: '10px', padding: '4px', borderRadius: '6px', border: `1px solid ${COLORS.border}` }} />
                                        <input type="time" value={h.end} onChange={(e) => {
                                            const nh = [...formData.openingHours]; nh[i] = { ...h, end: e.target.value }; setFormData({ ...formData, openingHours: sortDays(nh) });
                                        }} style={{ fontSize: '10px', padding: '4px', borderRadius: '6px', border: `1px solid ${COLORS.border}` }} />
                                    </div>
                                ) : (
                                    <span style={{ fontSize: '11px', fontWeight: '700', color: COLORS.primary }}>{formatTime12h(h.start)} - {formatTime12h(h.end)}</span>
                                )}
                            </div>
                        ))}
                        {editingSection === 'hours' && (formData.openingHours?.length || 0) < 7 && (
                            <button
                                onClick={() => {
                                    const availableDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                                    const existingDays = formData.openingHours?.map(h => h.day) || [];
                                    const nextDay = availableDays.find(d => !existingDays.includes(d)) || 'Mon';
                                    setFormData({
                                        ...formData,
                                        openingHours: sortDays([...(formData.openingHours || []), { day: nextDay, start: '09:00', end: '18:00' }])
                                    });
                                }}
                                style={{
                                    marginTop: '8px',
                                    padding: '8px',
                                    borderRadius: '12px',
                                    border: `1px dashed ${COLORS.accent}`,
                                    backgroundColor: COLORS.subtle,
                                    color: COLORS.accent,
                                    fontSize: '11px',
                                    fontWeight: '800',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px'
                                }}
                            >
                                <Plus size={14} /> Add Day
                            </button>
                        )}
                    </div>
                </Card>

                {/* ─── GOVERNMENT ID ─── */}
                <Card title="Government ID" icon={ShieldCheck} showEdit={false}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.subtle }}>
                            {govtId.idImageUrl ? (
                                <img src={govtId.idImageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: COLORS.secondary }}>
                                    <ImageIcon size={32} />
                                    <span style={{ fontSize: '10px', fontWeight: '700' }}>No Document Uploaded</span>
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <ViewField label="Document Type" value={govtId.idType} icon={ShieldCheck} />
                            <ViewField label="Document ID" value={govtId.idNumber} />
                        </div>
                    </div>
                </Card>

                {/* ─── OWNER INFO ─── */}
                <Card
                    title="Owner Information"
                    icon={User}
                    isEditing={editingSection === 'owner'}
                    isSaving={isSaving}
                    onEdit={() => editingSection === 'owner' ? handleUpdate('owner') : setEditingSection('owner')}
                    onCancel={handleCancel}
                >
                    {editingSection === 'owner' ? (
                        <>
                            <InputField label="Name" value={formData.ownerName} onChange={(v) => setFormData({ ...formData, ownerName: v })} />
                            <InputField label="WhatsApp" value={formData.ownerWhatsapp} onChange={(v) => setFormData({ ...formData, ownerWhatsapp: v })} />
                            <InputField label="Gender" value={formData.ownerGender} onChange={(v) => setFormData({ ...formData, ownerGender: v })} options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]} />
                        </>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <ViewField label="Legal Name" value={user?.name} />
                            <ViewField label="Email" value={user?.email} />
                            <ViewField label="WhatsApp" value={user?.whatsapp} icon={MessageCircle} />
                            <ViewField label="Gender" value={user?.gender?.toUpperCase()} />
                        </div>
                    )}
                </Card>

            </div>
            <MobileBottomNav />
        </div>
    );
}
