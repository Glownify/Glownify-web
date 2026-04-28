import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  CheckCircle,
  ImagePlus,
  MapPin,
  Pencil,
  Phone,
  Save,
  Scissors,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useIndependentProWorkspace } from "./useIndependentProWorkspace";

const IndependentProProfilePage = () => {
  const {
    profile,
    updateProfile,
    addPortfolioImage,
    removePortfolioImage,
  } = useIndependentProWorkspace();
  const fileInputRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [draftProfile, setDraftProfile] = useState(profile);

  useEffect(() => {
    setDraftProfile(profile);
  }, [profile]);

  const profileScore = useMemo(() => {
    const requiredFields = ["name", "mobile", "category", "services", "pricing", "serviceArea"];
    const completed = requiredFields.filter((field) => draftProfile[field]?.trim()).length;
    return Math.round((completed / requiredFields.length) * 100);
  }, [draftProfile]);

  const handleChange = (field, value) => {
    setDraftProfile((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = () => {
    if (!draftProfile.name?.trim() || !draftProfile.mobile?.trim()) {
      toast.error("Name and mobile number are required");
      return;
    }

    if (!/^[0-9+\-\s()]{7,16}$/.test(draftProfile.mobile.trim())) {
      toast.error("Enter a valid mobile number");
      return;
    }

    updateProfile({
      ...draftProfile,
      name: draftProfile.name.trim(),
      mobile: draftProfile.mobile.trim(),
      email: draftProfile.email.trim(),
    });
    setEditMode(false);
    toast.success("Profile saved");
  };

  const toggleEdit = () => {
    if (editMode) {
      saveProfile();
    } else {
      setEditMode(true);
    }
  };

  const cancelEdit = () => {
    setDraftProfile(profile);
    setEditMode(false);
  };

  const toggleAvailability = () => {
    const acceptingBookings = !profile.acceptingBookings;
    updateProfile({
      acceptingBookings,
      activeStatus: acceptingBookings ? "Active" : "Paused",
    });
    toast.success(acceptingBookings ? "Bookings enabled" : "Bookings paused");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Choose an image file");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      addPortfolioImage({
        id: Date.now(),
        name: file.name,
        src: reader.result,
      });
      toast.success("Portfolio image added");
      event.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const fieldClass =
    "w-full h-12 rounded-2xl border border-slate-100 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-purple-100 disabled:bg-white disabled:text-slate-500";

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-500">
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 rounded-[36px] bg-white border border-purple-100/50 p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-[28px] bg-purple-50 text-[#8B5CF6] flex items-center justify-center font-black text-3xl border border-purple-100">
                {draftProfile.name?.charAt(0) || "I"}
              </div>
              <div>
                <p className="text-[11px] font-black text-[#8B5CF6] uppercase tracking-[0.2em]">
                  Individual Professional
                </p>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-2">
                  {draftProfile.name}
                </h1>
                <p className="text-sm font-bold text-slate-400 mt-2 flex items-center gap-2">
                  <Phone size={15} /> {draftProfile.mobile}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {editMode && (
                <button
                  onClick={cancelEdit}
                  className="h-14 px-6 rounded-2xl bg-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={toggleEdit}
                className={`h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${
                  editMode ? "bg-emerald-500 text-white" : "bg-slate-900 text-white"
                }`}
              >
                {editMode ? <Save size={16} /> : <Pencil size={16} />}
                {editMode ? "Save Profile" : "Edit Profile"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <label>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Name</span>
              <input
                disabled={!editMode}
                value={draftProfile.name}
                onChange={(event) => handleChange("name", event.target.value)}
                className={fieldClass}
              />
            </label>
            <label>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Mobile Number</span>
              <input
                disabled={!editMode}
                value={draftProfile.mobile}
                onChange={(event) => handleChange("mobile", event.target.value)}
                className={fieldClass}
              />
            </label>
            <label>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Email</span>
              <input
                disabled={!editMode}
                value={draftProfile.email}
                onChange={(event) => handleChange("email", event.target.value)}
                className={fieldClass}
              />
            </label>
            <label>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Service Category</span>
              <select
                disabled={!editMode}
                value={draftProfile.category}
                onChange={(event) => handleChange("category", event.target.value)}
                className={fieldClass}
              >
                <option>Makeup</option>
                <option>Hair Care</option>
                <option>Skin Care</option>
                <option>Nail Care</option>
                <option>Massage</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-5 mt-5">
            <label>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Services Offered</span>
              <textarea
                disabled={!editMode}
                value={draftProfile.services}
                onChange={(event) => handleChange("services", event.target.value)}
                className="mt-2 w-full min-h-28 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-purple-100 disabled:bg-white disabled:text-slate-500"
              />
            </label>
            <label>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Pricing</span>
              <textarea
                disabled={!editMode}
                value={draftProfile.pricing}
                onChange={(event) => handleChange("pricing", event.target.value)}
                className="mt-2 w-full min-h-28 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-purple-100 disabled:bg-white disabled:text-slate-500"
              />
            </label>
            <label>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Service Area</span>
              <textarea
                disabled={!editMode}
                value={draftProfile.serviceArea}
                onChange={(event) => handleChange("serviceArea", event.target.value)}
                className="mt-2 w-full min-h-24 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-purple-100 disabled:bg-white disabled:text-slate-500"
              />
            </label>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-8">
          <div className="rounded-[36px] bg-slate-900 text-white p-8 shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-between">
              <ShieldCheck size={28} className="text-emerald-300" />
              <span className="px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-200 text-[10px] font-black uppercase tracking-widest">
                {profile.approvalStatus}
              </span>
            </div>
            <h2 className="text-3xl font-black mt-8">Admin verified</h2>
            <p className="text-sm font-bold text-slate-300 mt-3 leading-6">
              Profile is allowed to receive service-at-home booking requests.
            </p>
            <button
              onClick={toggleAvailability}
              className={`mt-7 w-full h-12 rounded-2xl font-black text-xs uppercase tracking-widest ${
                profile.acceptingBookings
                  ? "bg-white text-slate-900"
                  : "bg-emerald-500 text-white"
              }`}
            >
              {profile.acceptingBookings ? "Pause Bookings" : "Resume Bookings"}
            </button>
          </div>

          <div className="rounded-[36px] bg-white border border-purple-100/50 p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">Profile Health</h2>
            <div className="mt-6 h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#8B5CF6]"
                style={{ width: `${profileScore}%` }}
              />
            </div>
            <p className="text-sm font-black text-[#8B5CF6] mt-3">{profileScore}% complete</p>
            <div className="space-y-4 mt-7">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                <CheckCircle size={18} className="text-emerald-500" /> Mobile number added
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                <Scissors size={18} className="text-pink-500" /> Services and pricing editable
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                <MapPin size={18} className="text-[#8B5CF6]" /> Service area maintained
              </div>
            </div>
          </div>

          <div className="rounded-[36px] bg-white border border-purple-100/50 p-8 shadow-sm">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-14 h-14 rounded-2xl bg-purple-50 text-[#8B5CF6] flex items-center justify-center"
              aria-label="Add portfolio image"
            >
              <ImagePlus size={24} />
            </button>
            <h2 className="text-xl font-black text-slate-900 mt-5">Profile Images</h2>
            <p className="text-sm font-bold text-slate-400 mt-2">
              Add portfolio images customers can use to judge service quality.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-5">
              {(profile.portfolioImages || []).map((image) => (
                <div key={image.id} className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 aspect-square">
                  <img src={image.src} alt={image.name} className="h-full w-full object-cover" />
                  <button
                    onClick={() => {
                      removePortfolioImage(image.id);
                      toast.success("Portfolio image removed");
                    }}
                    className="absolute right-2 top-2 h-8 w-8 rounded-xl bg-white/90 text-rose-600 flex items-center justify-center"
                    aria-label={`Remove ${image.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {(!profile.portfolioImages || profile.portfolioImages.length === 0) && (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-200 p-5 text-center">
                <p className="text-xs font-bold text-slate-400">No portfolio images added yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndependentProProfilePage;
