import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ImagePlus,
  ChevronLeft,
  Paperclip,
  ArrowRight,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Images,
} from "lucide-react";
import bgImage from "../../assets/RegisterBackground.png";
import BasicInfoRegistrationForm from "../../components/SalonRegistrationForms/BasicInfoRegistrationForm.jsx";
import SalonAddressRegistrationForm from "../../components/SalonRegistrationForms/SalonAddressRegistrationForm.jsx";
import SalonDocumentUploadForm from "../../components/SalonRegistrationForms/SalonDocumentUploadForm.jsx";
import IndependentHeader from "./IndependentHeader";
import SalonOwnerHeader from "./SalonOwnerHeader";
import { registerIndependentPro, registerSalonOwner } from "../../redux/slice/authSlice";
import { fetchAllCategories } from "../../redux/slice/userSlice";
import PartnersAndHoursForm from "../../components/SalonRegistrationForms/PartnersAndHoursForm.jsx";

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────
const inputStyle =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50/50 hover:bg-white";
const btnPrimary =
  "flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-pink-200 active:scale-95";
const btnSecondary =
  "flex items-center gap-2 text-gray-500 hover:text-pink-600 font-semibold transition-colors";

const DAY_LIST = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─────────────────────────────────────────
// Component
// ─────────────────────────────────────────
const PartnerRegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);
  const { categories } = useSelector((s) => s.user);

  React.useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // ── Role state ──
  const [selectedRole, setSelectedRole] = useState("salon_owner");

  // ══════════════════════════════════════
  // SALON OWNER state
  // ══════════════════════════════════════
  const [salonStep, setSalonStep] = useState(1);
  const [salonFormData, setSalonFormData] = useState({
    basicInfo: {
      ownerName: "",
      password: "",
      gender: "",
      email: "",
      mobileno: "",
      watsupno: "",
      salonname: "",
      shopType: "personal",
      salonType: "unisex", // targetGender
      offersHomeService: false,
      partners: [],
    },
    addressInfo: {
      country: "India",
      state: "",
      city: "",
      area: "",
      pincode: "",
      fullAddress: "",
      lat: 12.9716,
      lng: 77.5946,
    },
    partnersAndHours: {
      openingHours: DAY_LIST.map(day => ({ day, start: "09:00", end: "20:00" })),
    },
    documents: {
      idType: "",
      idNumber: "",
      governmentIdImage: null,
      galleryImages: [],
    },
  });

  const updateSalonData = (section, field, value) => {
    setSalonFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSalonFinalSubmit = async () => {
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      // VALIDATION BEFORE SUBMISSION
      const { ownerName, email, mobileno, password, gender } = salonFormData.basicInfo;
      if (!ownerName || !email || !mobileno || !password || !gender) {
        alert("Owner information is incomplete. Please check name, email, phone, password and gender.");
        return;
      }

      const { city, state, lat, lng, fullAddress } = salonFormData.addressInfo;
      if (!city || !state || !lat || !lng || !fullAddress) {
        alert("Address information is incomplete. Please provide full address and coordinates.");
        return;
      }

      if (!salonFormData.documents.idType || !salonFormData.documents.idNumber || !salonFormData.documents.governmentIdImage) {
        alert("Verification documents are missing.");
        return;
      }

      const formData = new FormData();

      // Top-level User fields
      formData.append("name", salonFormData.basicInfo.ownerName);
      formData.append("email", salonFormData.basicInfo.email);
      formData.append("phone", salonFormData.basicInfo.mobileno);
      formData.append("password", salonFormData.basicInfo.password);
      formData.append("gender", salonFormData.basicInfo.gender);
      formData.append("whatsappNumber", salonFormData.basicInfo.watsupno || "");
      formData.append("role", "salon_owner");

      // Salon Data object
      const salonData = {
        shopType: salonFormData.basicInfo.shopType,
        shopName: salonFormData.basicInfo.salonname,
        targetGender: salonFormData.basicInfo.salonType, // Enums match: men/women/unisex
        offersHomeService: salonFormData.basicInfo.offersHomeService,
        city: salonFormData.addressInfo.city,
        location: {
          type: "Point",
          coordinates: [Number(salonFormData.addressInfo.lng), Number(salonFormData.addressInfo.lat)],
          address: salonFormData.addressInfo.fullAddress,
          city: salonFormData.addressInfo.city,
          state: salonFormData.addressInfo.state,
          pincode: salonFormData.addressInfo.pincode,
        },
        partners: salonFormData.basicInfo.shopType === "partnership" ? salonFormData.basicInfo.partners : [],
        openingHours: salonFormData.partnersAndHours.openingHours,
        governmentId: {
          idType: salonFormData.documents.idType,
          idNumber: salonFormData.documents.idNumber,
        }
      };

      console.log("SalonData JSON to be stringified:", salonData);
      formData.append("salonData", JSON.stringify(salonData));

      // Files
      if (salonFormData.documents.governmentIdImage) {
        formData.append("governmentIdImage", salonFormData.documents.governmentIdImage);
      }
      if (salonFormData.documents.galleryImages?.length > 0) {
        salonFormData.documents.galleryImages.forEach(file => {
          formData.append("galleryImages", file);
        });
      }

      console.log("Submitting Salon Owner registration...", Object.fromEntries(formData.entries()));

      const result = await dispatch(registerSalonOwner(formData));

      if (registerSalonOwner.fulfilled.match(result)) {
        setSubmitSuccess(true);
        setTimeout(() => navigate("/booksubscriptionpage"), 1500);
      } else {
        setSubmitError(
          result.payload?.message ||
          result.error?.message ||
          "Registration failed. Please try again."
        );
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("An unexpected error occurred.");
    }
  };

  // ══════════════════════════════════════
  // INDEPENDENT PRO state
  // ══════════════════════════════════════
  const [proStep, setProStep] = useState(1);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // -- Basic fields --
  const [proBasic, setProBasic] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
  });

  // -- Independent-specific fields --
  const [experienceYears, setExperienceYears] = useState("");
  const [targetGender, setTargetGender] = useState("");
  const [specializations, setSpecializations] = useState([]);

  // -- Availability: { Mon: { start, end }, ... } --
  const [availability, setAvailability] = useState({});

  // -- Location --
  const [location, setLocation] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    radiusInKm: 10,
    lat: "",
    lng: "",
  });

  // -- Profile Photo --
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

  // -- Government ID --
  const [govId, setGovId] = useState({ idType: "", idNumber: "" });
  const [govIdFile, setGovIdFile] = useState(null); // File
  const [govIdPreview, setGovIdPreview] = useState(null);

  // -- Work Photos --
  const [workPhotoFiles, setWorkPhotoFiles] = useState([]); // File[]
  const [workPhotoPreviews, setWorkPhotoPreviews] = useState([]);

  const govIdInputRef = useRef();
  const workPhotoInputRef = useRef();

  // ─────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────
  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setProBasic((prev) => ({ ...prev, [name]: value }));
  };

  const handleGovIdChange = (e) => {
    const { name, value } = e.target;
    setGovId((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleUseCurrentLocationPro = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation((prev) => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Error getting location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleGovIdFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setGovIdFile(file);
    setGovIdPreview(URL.createObjectURL(file));
  };

  const handleWorkPhotos = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const combined = [...workPhotoFiles, ...files].slice(0, 5); // max 5
    setWorkPhotoFiles(combined);
    setWorkPhotoPreviews(combined.map((f) => URL.createObjectURL(f)));
  };

  const removeWorkPhoto = (idx) => {
    const updated = workPhotoFiles.filter((_, i) => i !== idx);
    setWorkPhotoFiles(updated);
    setWorkPhotoPreviews(updated.map((f) => URL.createObjectURL(f)));
  };

  const toggleDay = (day) => {
    setAvailability((prev) => {
      if (prev[day]) {
        const next = { ...prev };
        delete next[day];
        return next;
      }
      return { ...prev, [day]: { start: "09:00", end: "18:00" } };
    });
  };

  const toggleSpecialization = (categoryId) => {
    setSpecializations((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSlotTime = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  // ─────────────────────────────────────────
  // SUBMIT
  // ─────────────────────────────────────────
  const handleProSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Validation
    if (!govIdFile) {
      setSubmitError("Please upload your Government ID image.");
      return;
    }
    if (workPhotoFiles.length === 0) {
      setSubmitError("Please upload at least one work photo.");
      return;
    }
    if (!profilePhotoFile) {
      setSubmitError("Please upload your Profile Photo.");
      return;
    }
    if (specializations.length === 0) {
      setSubmitError("Please select at least one specialization.");
      return;
    }
    if (!location.lat || !location.lng) {
      setSubmitError("Please provide Latitude and Longitude for your location.");
      return;
    }
    if (Object.keys(availability).length === 0) {
      setSubmitError("Please select at least one availability day.");
      return;
    }

    // Build the independentData object
    const independentData = {
      experienceYears: Number(experienceYears),
      specializations,
      targetGender,
      availability: Object.entries(availability).map(([day, times]) => ({
        day,
        start: times.start,
        end: times.end,
      })),
      governmentId: {
        idType: govId.idType,
        idNumber: govId.idNumber,
      },
      location: {
        coordinates: [Number(location.lng), Number(location.lat)],
        address: location.address,
        city: location.city,
        state: location.state,
        pincode: location.pincode,
        radiusInKm: Number(location.radiusInKm),
      },
    };

    // Build FormData (multipart/form-data)
    const formData = new FormData();
    formData.append("name", proBasic.name);
    formData.append("email", proBasic.email);
    formData.append("phone", proBasic.phone);
    formData.append("password", proBasic.password);
    formData.append("gender", proBasic.gender);
    formData.append("role", "independent_pro");
    formData.append("independentData", JSON.stringify(independentData));
    formData.append("profilePhoto", profilePhotoFile);
    formData.append("governmentIdImage", govIdFile);
    workPhotoFiles.forEach((file) => {
      formData.append("workPhotos", file);
    });

    console.log("Submitting Independent Pro Payload:", Object.fromEntries(formData.entries()));
    console.log("independentData JSON:", independentData);

    const result = await dispatch(registerIndependentPro(formData));

    if (registerIndependentPro.fulfilled.match(result)) {
      setSubmitSuccess(true);
      // Navigate based on role
      setTimeout(() => navigate("/independent-pro/dashboard"), 1500);
    } else {
      setSubmitError(
        result.payload?.message ||
        result.error?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  // ── Role switch handler ──
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setSalonStep(1);
    setProStep(1);
  };

  // ══════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════
  return (
    <div className="min-h-screen flex">
      {/* Left side — background image */}
      <div
        className="hidden md:block md:w-[70%] bg-cover bg-left sticky top-0 h-screen transition-all duration-500"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Right side — form panel */}
      <div className="w-full md:w-[30%] flex flex-col bg-white border-l border-gray-100 overflow-y-auto">
        <div className="w-full max-w-md px-6 py-8 mx-auto">

          {/* ── Role Selector ── */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => handleRoleChange("salon_owner")}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${selectedRole === "salon_owner"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Salon Owner
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("independent_pro")}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${selectedRole === "independent_pro"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Independent Professional
            </button>
          </div>

          {/* ══════════════════════════════════════ */}
          {/* SALON OWNER FLOW                       */}
          {/* ══════════════════════════════════════ */}
          {selectedRole === "salon_owner" && (
            <div>
              <div className="mb-6">
                <SalonOwnerHeader step={salonStep} />
              </div>

              {/* ── Error banner for Salon Owner ── */}
              {(submitError || error) && (
                <div className="mb-4 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{submitError || (typeof error === "string" ? error : error?.message)}</span>
                </div>
              )}

              {/* ── Success banner for Salon Owner ── */}
              {submitSuccess && (
                <div className="mb-4 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-semibold">
                  <CheckCircle size={18} />
                  Registered successfully! Redirecting…
                </div>
              )}

              {salonStep === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <BasicInfoRegistrationForm
                    onNext={() => setSalonStep(2)}
                    data={salonFormData.basicInfo}
                    onChange={(field, value) =>
                      updateSalonData("basicInfo", field, value)
                    }
                    theme="purple"
                  />
                </div>
              )}

              {salonStep === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <SalonAddressRegistrationForm
                    onNext={() => setSalonStep(3)}
                    onBack={() => setSalonStep(1)}
                    data={salonFormData.addressInfo}
                    onChange={(field, value) =>
                      updateSalonData("addressInfo", field, value)
                    }
                    theme="purple"
                  />
                </div>
              )}

              {salonStep === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <PartnersAndHoursForm
                    onNext={() => setSalonStep(4)}
                    onBack={() => setSalonStep(2)}
                    data={{
                      shopType: salonFormData.basicInfo.shopType,
                      partners: salonFormData.partnersAndHours.partners,
                      openingHours: salonFormData.partnersAndHours.openingHours
                    }}
                    onChange={(field, value) =>
                      updateSalonData("partnersAndHours", field, value)
                    }
                    theme="purple"
                  />
                </div>
              )}

              {salonStep === 4 && (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  <SalonDocumentUploadForm
                    onBack={() => setSalonStep(3)}
                    data={salonFormData.documents}
                    onChange={(field, value) =>
                      updateSalonData("documents", field, value)
                    }
                    onSubmit={handleSalonFinalSubmit}
                    theme="purple"
                  />
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════ */}
          {/* INDEPENDENT PROFESSIONAL FLOW          */}
          {/* ══════════════════════════════════════ */}
          {selectedRole === "independent_pro" && (
            <div>
              <div className="mb-6">
                <IndependentHeader
                  green={proStep > 1}
                  icon1={proStep > 1}
                  green2={proStep > 2}
                  icon2={proStep > 2}
                />
              </div>

              {/* ── Global error banner ── */}
              {(submitError || error) && (
                <div className="mb-4 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{submitError || (typeof error === "string" ? error : error?.message)}</span>
                </div>
              )}

              {/* ── Success banner ── */}
              {submitSuccess && (
                <div className="mb-4 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-semibold">
                  <CheckCircle size={18} />
                  Registered successfully! Redirecting…
                </div>
              )}

              <form onSubmit={handleProSubmit}>

                {/* ───────────────────────────── */}
                {/* STEP 1: Basic Details          */}
                {/* ───────────────────────────── */}
                {proStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col items-center mb-10">
                      <h2 className="text-xl font-bold text-gray-800 mt-4">
                        Basic Information
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Let's start with your professional profile
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Full Name
                        </label>
                        <input
                          name="name"
                          value={proBasic.name}
                          onChange={handleBasicChange}
                          placeholder="John Doe"
                          required
                          className={inputStyle}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          value={proBasic.phone}
                          onChange={handleBasicChange}
                          placeholder="9876543210"
                          type="tel"
                          required
                          className={inputStyle}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={proBasic.gender}
                          onChange={handleBasicChange}
                          required
                          className={inputStyle}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Email Address
                        </label>
                        <input
                          name="email"
                          value={proBasic.email}
                          onChange={handleBasicChange}
                          placeholder="john@example.com"
                          type="email"
                          required
                          className={inputStyle}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Password
                        </label>
                        <input
                          name="password"
                          value={proBasic.password}
                          onChange={handleBasicChange}
                          placeholder="••••••••"
                          type="password"
                          required
                          className={inputStyle}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Experience (Years)
                        </label>
                        <input
                          name="experienceYears"
                          value={experienceYears}
                          onChange={(e) => setExperienceYears(e.target.value)}
                          placeholder="e.g. 5"
                          type="number"
                          min="0"
                          required
                          className={inputStyle}
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Services Offered To
                        </label>
                        <select
                          value={targetGender}
                          onChange={(e) => setTargetGender(e.target.value)}
                          required
                          className={inputStyle}
                        >
                          <option value="">Select Target Clientele</option>
                          <option value="men">Men</option>
                          <option value="women">Women</option>
                          <option value="unisex">Unisex</option>
                        </select>
                      </div>

                      {/* Categories / Specializations */}
                      <div className="space-y-3 md:col-span-2 mt-4">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Specializations (Select at least one)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {categories?.map((cat) => (
                            <label
                              key={cat._id}
                              className={`flex items-center gap-2 p-2 rounded-xl border-2 cursor-pointer transition-all ${specializations.includes(cat._id)
                                ? "border-pink-500 bg-pink-50 text-pink-700 font-bold shadow-sm"
                                : "border-gray-100 bg-gray-50 text-gray-600 hover:border-pink-200"
                                }`}
                            >
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={specializations.includes(cat._id)}
                                onChange={() => toggleSpecialization(cat._id)}
                              />
                              {cat.icon && <img src={cat.icon} alt={cat.name} className="w-5 h-5 object-contain" />}
                              <span className="text-xs capitalize">{cat.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setProStep(2)}
                        className={btnPrimary}
                      >
                        Continue <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* ───────────────────────────── */}
                {/* STEP 2: Availability + Location */}
                {/* ───────────────────────────── */}
                {proStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <header className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800">
                        Availability & Location
                      </h2>
                      <p className="text-gray-400">
                        Set your working schedule and service area
                      </p>
                    </header>

                    {/* Days + time pickers */}
                    <div className="space-y-3 mb-8">
                      <h3 className="font-bold text-gray-700">
                        Working Days & Hours
                      </h3>
                      {DAY_LIST.map((day) => (
                        <div key={day} className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleDay(day)}
                            className={`h-10 w-14 shrink-0 flex items-center justify-center font-bold rounded-xl border-2 transition-all text-sm ${availability[day]
                              ? "bg-pink-600 border-pink-600 text-white shadow-md shadow-pink-100"
                              : "border-gray-200 text-gray-400 hover:border-pink-200"
                              }`}
                          >
                            {day}
                          </button>

                          {availability[day] && (
                            <div className="flex items-center gap-2 flex-1 animate-in fade-in duration-200">
                              <input
                                type="time"
                                value={availability[day].start}
                                onChange={(e) =>
                                  handleSlotTime(day, "start", e.target.value)
                                }
                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none text-sm bg-gray-50"
                              />
                              <span className="text-gray-400 text-xs font-semibold">
                                to
                              </span>
                              <input
                                type="time"
                                value={availability[day].end}
                                onChange={(e) =>
                                  handleSlotTime(day, "end", e.target.value)
                                }
                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none text-sm bg-gray-50"
                              />
                            </div>
                          )}

                          {!availability[day] && (
                            <span className="text-xs text-gray-300 italic">
                              Off
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Location */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-700">
                        Service Location
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 flex justify-end mb-2">
                          <button
                            type="button"
                            onClick={handleUseCurrentLocationPro}
                            className="bg-purple-100 px-3 py-1.5 rounded-xl border border-purple-200 text-[10px] font-bold text-purple-600 shadow-sm flex items-center gap-1 hover:bg-purple-200 transition-all active:scale-95 z-10"
                          >
                            📍 USE CURRENT LOCATION
                          </button>
                        </div>
                        <div className="space-y-1 col-span-2">
                          <label className="text-xs font-bold text-gray-500 uppercase">
                            Full Address
                          </label>
                          <input
                            name="address"
                            value={location.address}
                            onChange={handleLocationChange}
                            placeholder="House No, Street, Area"
                            required
                            className={inputStyle}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-500 uppercase">
                            City
                          </label>
                          <input
                            name="city"
                            value={location.city}
                            onChange={handleLocationChange}
                            placeholder="Bangalore"
                            required
                            className={inputStyle}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-500 uppercase">
                            State
                          </label>
                          <input
                            name="state"
                            value={location.state}
                            onChange={handleLocationChange}
                            placeholder="Karnataka"
                            required
                            className={inputStyle}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-500 uppercase">
                            Pincode
                          </label>
                          <input
                            name="pincode"
                            value={location.pincode}
                            onChange={handleLocationChange}
                            placeholder="560038"
                            required
                            className={inputStyle}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-500 uppercase">
                            Service Radius (km)
                          </label>
                          <input
                            name="radiusInKm"
                            value={location.radiusInKm}
                            onChange={handleLocationChange}
                            type="number"
                            min="1"
                            placeholder="10"
                            required
                            className={inputStyle}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-500 uppercase text-purple-600">
                            Longitude
                          </label>
                          <input
                            name="lng"
                            value={location.lng}
                            onChange={handleLocationChange}
                            type="number"
                            step="any"
                            placeholder="77.5946"
                            required
                            className={inputStyle}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-500 uppercase text-purple-600">
                            Latitude
                          </label>
                          <input
                            name="lat"
                            value={location.lat}
                            onChange={handleLocationChange}
                            type="number"
                            step="any"
                            placeholder="12.9716"
                            required
                            className={inputStyle}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-10">
                      <button
                        type="button"
                        onClick={() => setProStep(1)}
                        className={btnSecondary}
                      >
                        <ChevronLeft size={20} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitError("");
                          setProStep(3);
                        }}
                        className={btnPrimary}
                      >
                        Continue <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* ───────────────────────────── */}
                {/* STEP 3: Verification + Photos */}
                {/* ───────────────────────────── */}
                {proStep === 3 && (
                  <div className="animate-in fade-in zoom-in-95 duration-500">
                    <header className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-800">
                        Verification & Portfolio
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Secure your account and showcase your work
                      </p>
                    </header>

                    <div className="space-y-6">
                      {/* Gov ID Type */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          ID Document Type
                        </label>
                        <select
                          name="idType"
                          value={govId.idType}
                          onChange={handleGovIdChange}
                          required
                          className={inputStyle}
                        >
                          <option value="">Select ID Type</option>
                          <option value="Aadhaar">Aadhaar Card</option>
                          <option value="PAN">PAN Card</option>
                          <option value="Passport">Passport</option>
                          <option value="DrivingLicense">
                            Driving License
                          </option>
                        </select>
                      </div>

                      {/* Gov ID Number */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          ID Document Number
                        </label>
                        <input
                          name="idNumber"
                          value={govId.idNumber}
                          onChange={handleGovIdChange}
                          placeholder="Enter Number"
                          required
                          className={inputStyle}
                        />
                      </div>

                      {/* Profile Photo Image upload */}
                      <div className="space-y-1 mt-4">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Upload Profile Photo
                        </label>
                        {profilePhotoPreview ? (
                          <div className="relative rounded-2xl overflow-hidden border border-gray-200 w-32 h-32 mx-auto">
                            <img
                              src={profilePhotoPreview}
                              alt="Profile Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setProfilePhotoFile(null);
                                setProfilePhotoPreview(null);
                              }}
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-red-500 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <label
                            className="group border-2 border-dashed border-gray-200 p-6 flex flex-col items-center rounded-2xl cursor-pointer hover:border-pink-500 hover:bg-pink-50/30 transition-all w-32 h-32 mx-auto justify-center text-center"
                          >
                            <div className="bg-pink-100 p-2 rounded-full text-pink-600 group-hover:scale-110 transition-transform">
                              <ImagePlus size={20} />
                            </div>
                            <span className="mt-2 font-bold text-gray-700 text-xs">
                              Profile
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setProfilePhotoFile(file);
                                setProfilePhotoPreview(URL.createObjectURL(file));
                              }}
                            />
                          </label>
                        )}
                      </div>

                      {/* Gov ID Image upload */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Upload ID Proof
                        </label>
                        {govIdPreview ? (
                          <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                            <img
                              src={govIdPreview}
                              alt="ID Preview"
                              className="w-full h-40 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setGovIdFile(null);
                                setGovIdPreview(null);
                              }}
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-red-500 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="govIdFile"
                            className="group border-2 border-dashed border-gray-200 p-8 flex flex-col items-center rounded-2xl cursor-pointer hover:border-pink-500 hover:bg-pink-50/30 transition-all"
                          >
                            <div className="bg-pink-100 p-3 rounded-full text-pink-600 group-hover:scale-110 transition-transform">
                              <Paperclip size={24} />
                            </div>
                            <span className="mt-4 font-bold text-gray-700">
                              Choose File
                            </span>
                            <span className="text-xs text-gray-400 mt-1">
                              PDF, JPG or PNG (Max 5MB)
                            </span>
                            <input
                              type="file"
                              id="govIdFile"
                              ref={govIdInputRef}
                              className="hidden"
                              accept="image/*,.pdf"
                              onChange={handleGovIdFile}
                            />
                          </label>
                        )}
                      </div>

                      {/* Work Photos */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                            Work Photos (up to 5)
                          </label>
                          {workPhotoFiles.length < 5 && (
                            <button
                              type="button"
                              onClick={() => workPhotoInputRef.current?.click()}
                              className="text-xs font-bold text-pink-600 hover:text-pink-700"
                            >
                              + Add More
                            </button>
                          )}
                        </div>

                        {workPhotoPreviews.length > 0 ? (
                          <div className="grid grid-cols-3 gap-2">
                            {workPhotoPreviews.map((src, idx) => (
                              <div
                                key={idx}
                                className="relative rounded-xl overflow-hidden border border-gray-100 aspect-square"
                              >
                                <img
                                  src={src}
                                  alt={`Work ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeWorkPhoto(idx)}
                                  className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow text-gray-500 hover:text-red-500 transition-colors"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <label
                            htmlFor="workPhotosInput"
                            className="group border-2 border-dashed border-gray-200 p-6 flex flex-col items-center rounded-2xl cursor-pointer hover:border-pink-500 hover:bg-pink-50/30 transition-all"
                          >
                            <div className="bg-pink-100 p-3 rounded-full text-pink-600 group-hover:scale-110 transition-transform">
                              <Images size={24} />
                            </div>
                            <span className="mt-3 font-bold text-gray-700 text-sm">
                              Upload Work Photos
                            </span>
                            <span className="text-xs text-gray-400 mt-1">
                              JPG or PNG (Max 5 photos)
                            </span>
                          </label>
                        )}

                        <input
                          type="file"
                          id="workPhotosInput"
                          ref={workPhotoInputRef}
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleWorkPhotos}
                        />
                      </div>

                      {/* Submit Error (step-level) */}
                      {submitError && (
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                          <AlertCircle size={16} className="shrink-0 mt-0.5" />
                          <span>{submitError}</span>
                        </div>
                      )}

                      <div className="flex flex-col gap-3 mt-6">
                        <button
                          type="submit"
                          disabled={loading || submitSuccess}
                          className={`${btnPrimary} w-full disabled:opacity-60 disabled:cursor-not-allowed`}
                        >
                          {loading ? (
                            <>
                              <Loader2
                                size={18}
                                className="animate-spin"
                              />
                              Submitting…
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setProStep(2)}
                          className="text-center text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          Go Back
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerRegistrationPage;
