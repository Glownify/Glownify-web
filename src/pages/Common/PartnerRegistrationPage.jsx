import React, { useState } from "react";
import { ImagePlus, ChevronLeft, Paperclip, ArrowRight } from 'lucide-react';
import bgImage from "../../assets/RegisterBackground.png";
import BasicInfoRegistrationForm from "../../components/SalonRegistrationForms/BasicInfoRegistrationForm.jsx";
import SalonAddressRegistrationForm from "../../components/SalonRegistrationForms/SalonAddressRegistrationForm.jsx";
import SalonDocumentUploadForm from "../../components/SalonRegistrationForms/SalonDocumentUploadForm.jsx";
import IndependentHeader from "./IndependentHeader";

const PartnerRegistrationPage = () => {
  // ── Role state ──
  const [selectedRole, setSelectedRole] = useState("salon_owner");

  // ══════════════════════════════════════
  // SALON OWNER state
  // ══════════════════════════════════════
  const [salonStep, setSalonStep] = useState(1);
  const [salonFormData, setSalonFormData] = useState({
    basicInfo: {
      salonname: "",
      salonType: "Unisex",
      mobileno: "",
      watsupno: "",
      email: "",
    },
    addressInfo: {
      country: "India",
      state: "",
      city: "",
      area: "",
      pincode: "",
      fullAddress: "",
    },
    documents: {
      salonLogo: "",
      coverImg: "",
      gallaryImg: "",
    },
  });
  const salonTotalSteps = 3;

  const updateSalonData = (section, field, value) => {
    setSalonFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSalonFinalSubmit = () => {
    console.log("final salon form submit data", salonFormData);
  };

  // ══════════════════════════════════════
  // INDEPENDENT PRO state
  // ══════════════════════════════════════
  const [proStep, setProStep] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const proInitialState = {
    name: "", email: "", phone: "", password: "",
    role: "independent_pro",
    profilePhoto: null,
    independentData: {
      specializations: "69298004f63ac61abbb13f00",
      experienceYears: "",
      gender: "",
      governmentId: { idType: "", idNumber: "", idImageUrl: "" },
    },
  };
  const [proForm, setProForm] = useState(proInitialState);

  const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeSlotsList = ["Morning", "Afternoon", "Evening"];

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50/50 hover:bg-white";
  const btnPrimary =
    "flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-pink-200 active:scale-95";
  const btnSecondary =
    "flex items-center gap-2 text-gray-500 hover:text-pink-600 font-semibold transition-colors";

  const handleProChange = (e) => {
    const { name, value } = e.target;
    setProForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProNestedChange = (e, parent) => {
    const { name, value } = e.target;
    setProForm((prev) => ({
      ...prev,
      independentData: {
        ...prev.independentData,
        [parent ? "governmentId" : name]: parent
          ? { ...prev.independentData.governmentId, [name]: value }
          : value,
      },
    }));
  };

  const toggleSelection = (item, state, setState) => {
    setState((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleProSubmit = async (e) => {
    e.preventDefault();
    const finalForm = {
      ...proForm,
      independentData: {
        ...proForm.independentData,
        availability: selectedDays.map((day) => ({ day, slots: selectedSlots })),
      },
    };
    console.log("Submitting independent pro:", finalForm);
  };

  // ── Role switch handler ──
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    // Reset steps when switching roles
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
        className="hidden md:block md:w-[75%] bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Right side — form panel */}
      <div className="w-full md:w-[25%] flex flex-col bg-white border-l border-gray-100 overflow-y-auto">
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
              Independent Pro
            </button>
          </div>

          {/* ══════════════════════════════════════ */}
          {/* SALON OWNER FLOW                       */}
          {/* ══════════════════════════════════════ */}
          {selectedRole === "salon_owner" && (
            <>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Step {salonStep} of {salonTotalSteps}
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 w-4 rounded-full ${salonStep >= i ? "bg-black" : "bg-gray-200"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {salonStep === 1 && (
                <BasicInfoRegistrationForm
                  onNext={() => setSalonStep(2)}
                  data={salonFormData.basicInfo}
                  onChange={(field, value) =>
                    updateSalonData("basicInfo", field, value)
                  }
                />
              )}

              {salonStep === 2 && (
                <SalonAddressRegistrationForm
                  onNext={() => setSalonStep(3)}
                  onBack={() => setSalonStep(1)}
                  data={salonFormData.addressInfo}
                  onChange={(field, value) =>
                    updateSalonData("addressInfo", field, value)
                  }
                />
              )}

              {salonStep === 3 && (
                <SalonDocumentUploadForm
                  onBack={() => setSalonStep(2)}
                  data={salonFormData.documents}
                  onChange={(field, value) =>
                    updateSalonData("documents", field, value)
                  }
                  onSubmit={handleSalonFinalSubmit}
                />
              )}
            </>
          )}

          {/* ══════════════════════════════════════ */}
          {/* INDEPENDENT PROFESSIONAL FLOW          */}
          {/* ══════════════════════════════════════ */}
          {selectedRole === "independent_pro" && (
            <div>
              {/* Compact step indicator matching independent pro style */}
              <div className="mb-6">
                <IndependentHeader
                  green={proStep > 1}
                  icon1={proStep > 1}
                  green2={proStep > 2}
                  icon2={proStep > 2}
                />
              </div>

              <form onSubmit={handleProSubmit}>
                {/* STEP 1: Basic Details */}
                {proStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col items-center mb-10">
                      <div className="relative group">
                        <label
                          htmlFor="userimg"
                          className="bg-pink-50 h-32 w-32 flex items-center justify-center rounded-3xl cursor-pointer border-2 border-dashed border-pink-200 group-hover:border-pink-500 transition-all overflow-hidden"
                        >
                          <div className="text-center">
                            <ImagePlus className="text-pink-400 mx-auto" size={32} />
                            <span className="text-[10px] font-bold text-pink-400 uppercase mt-1 block">
                              Upload
                            </span>
                          </div>
                          <input className="hidden" type="file" id="userimg" />
                        </label>
                      </div>
                      <h2 className="text-xl font-bold text-gray-800 mt-6">
                        Basic Information
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Let's start with your professional profile
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Full Name
                        </label>
                        <input
                          name="name"
                          value={proForm.name}
                          onChange={handleProChange}
                          placeholder="John Doe"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          value={proForm.phone}
                          onChange={handleProChange}
                          placeholder="9876543210"
                          type="number"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Email Address
                        </label>
                        <input
                          name="email"
                          value={proForm.email}
                          onChange={handleProChange}
                          placeholder="john@example.com"
                          type="email"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Password
                        </label>
                        <input
                          name="password"
                          value={proForm.password}
                          onChange={handleProChange}
                          placeholder="••••••••"
                          type="password"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Experience (Years)
                        </label>
                        <input
                          name="experienceYears"
                          value={proForm.independentData.experienceYears}
                          onChange={handleProNestedChange}
                          placeholder="e.g. 5"
                          type="number"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={proForm.independentData.gender}
                          onChange={handleProNestedChange}
                          className={inputStyle}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
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

                {/* STEP 2: Availability */}
                {proStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <header className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800">
                        Set Availability
                      </h2>
                      <p className="text-gray-400">
                        Choose when you're available for bookings
                      </p>
                    </header>

                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-gray-700">Available Days</h3>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedDays(daysList)}
                              className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors"
                            >
                              Select All
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedDays([])}
                              className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-gray-50 text-gray-400 rounded-full"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {daysList.map((day) => (
                            <button
                              type="button"
                              key={day}
                              onClick={() =>
                                toggleSelection(day, selectedDays, setSelectedDays)
                              }
                              className={`h-12 w-16 flex items-center justify-center font-bold rounded-2xl border-2 transition-all ${selectedDays.includes(day)
                                  ? "bg-pink-600 border-pink-600 text-white shadow-md shadow-pink-200"
                                  : "border-gray-100 text-gray-400 hover:border-pink-200"
                                }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-700 mb-4">
                          Preferred Slots
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {timeSlotsList.map((slot) => (
                            <button
                              type="button"
                              key={slot}
                              onClick={() =>
                                toggleSelection(slot, selectedSlots, setSelectedSlots)
                              }
                              className={`py-4 px-2 border-2 rounded-2xl font-bold transition-all ${selectedSlots.includes(slot)
                                  ? "bg-pink-50 border-pink-500 text-pink-600"
                                  : "border-gray-100 text-gray-400 hover:bg-gray-50"
                                }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-12">
                      <button
                        type="button"
                        onClick={() => setProStep(1)}
                        className={btnSecondary}
                      >
                        <ChevronLeft size={20} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setProStep(3)}
                        className={btnPrimary}
                      >
                        Continue <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Verification */}
                {proStep === 3 && (
                  <div className="animate-in fade-in zoom-in-95 duration-500 max-w-md mx-auto">
                    <header className="text-center mb-10">
                      <h2 className="text-2xl font-bold text-gray-800">
                        Verification
                      </h2>
                      <p className="text-gray-400">
                        Secure your account with identity proof
                      </p>
                    </header>

                    <div className="space-y-6">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          ID Document Type
                        </label>
                        <select
                          name="idType"
                          value={proForm.independentData.governmentId.idType}
                          onChange={(e) => handleProNestedChange(e, true)}
                          className={inputStyle}
                        >
                          <option value="">Select ID Type</option>
                          <option value="Aadhaar">Aadhar Card</option>
                          <option value="PAN">PAN Card</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          ID Document Number
                        </label>
                        <input
                          name="idNumber"
                          value={proForm.independentData.governmentId.idNumber}
                          onChange={(e) => handleProNestedChange(e, true)}
                          placeholder="Enter Number"
                          className={inputStyle}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                          Upload ID Proof
                        </label>
                        <label
                          htmlFor="docs"
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
                          <input type="file" id="docs" className="hidden" />
                        </label>
                      </div>

                      <div className="flex flex-col gap-4 mt-10">
                        <button type="submit" className={btnPrimary}>
                          Submit Application
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
