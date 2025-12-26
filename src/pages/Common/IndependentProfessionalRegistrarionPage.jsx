import React, { useState } from "react";
import { ImagePlus, ChevronLeft, Paperclip, ArrowRight } from 'lucide-react';
import IndependentHeader from "./IndependentHeader";

const IndependentProfessionalRegisterPage = () => {
  const [step, setStep] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  
  const initialState = {
    name: "", email: "", phone: "", password: "",
    role: "independent_pro",
    profilePhoto: null,
    independentData: {
      specializations: "69298004f63ac61abbb13f00",
      experienceYears: "",
      gender: "",
      governmentId: { idType: "", idNumber: "", idImageUrl: "" }
    },
  };

  const [form, setForm] = useState(initialState);

  const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeSlotsList = ["Morning", "Afternoon", "Evening"];

  // Styles
  const inputStyle = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50/50 hover:bg-white";
  const btnPrimary = "flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-pink-200 active:scale-95";
  const btnSecondary = "flex items-center gap-2 text-gray-500 hover:text-pink-600 font-semibold transition-colors";

  // ---- Handlers ----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      independentData: {
        ...prev.independentData,
        [parent ? "governmentId" : name]: parent 
          ? { ...prev.independentData.governmentId, [name]: value }
          : value
      }
    }));
  };

  const toggleSelection = (item, state, setState) => {
    setState(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalForm = {
      ...form,
      independentData: {
        ...form.independentData,
        availability: selectedDays.map(day => ({ day, slots: selectedSlots }))
      }
    };
    console.log("Submitting:", finalForm);
    // Add your fetch logic here
  };

  return (
    <div className='max-w-3xl mx-auto my-10 bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100'>
      <IndependentHeader 
        green={step > 1} 
        icon1={step > 1} 
        green2={step > 2} 
        icon2={step > 2} 
      />

      <form onSubmit={handleSubmit} className="p-8 md:p-12">
        {/* STEP 1: Basic Details */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className='flex flex-col items-center mb-10'>
              <div className="relative group">
                <label htmlFor='userimg' className='bg-pink-50 h-32 w-32 flex items-center justify-center rounded-3xl cursor-pointer border-2 border-dashed border-pink-200 group-hover:border-pink-500 transition-all overflow-hidden'>
                  <div className="text-center">
                    <ImagePlus className='text-pink-400 mx-auto' size={32} />
                    <span className="text-[10px] font-bold text-pink-400 uppercase mt-1 block">Upload</span>
                  </div>
                  <input className='hidden' type="file" id="userimg" />
                </label>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mt-6">Basic Information</h2>
              <p className="text-gray-400 text-sm">Let's start with your professional profile</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputStyle} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" type="number" className={inputStyle} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Email Address</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" type="email" className={inputStyle} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Password</label>
                <input name="password" value={form.password} onChange={handleChange} placeholder="••••••••" type="password" className={inputStyle} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Experience (Years)</label>
                <input name="experienceYears" value={form.independentData.experienceYears} onChange={handleNestedChange} placeholder="e.g. 5" type="number" className={inputStyle} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Gender</label>
                <select name="gender" value={form.independentData.gender} onChange={handleNestedChange} className={inputStyle}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button type='button' onClick={() => setStep(2)} className={btnPrimary}>
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Availability */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Set Availability</h2>
              <p className="text-gray-400">Choose when you're available for bookings</p>
            </header>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-700">Available Days</h3>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setSelectedDays(daysList)} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors">Select All</button>
                    <button type="button" onClick={() => setSelectedDays([])} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-gray-50 text-gray-400 rounded-full">Clear</button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {daysList.map(day => (
                    <button type='button' key={day} onClick={() => toggleSelection(day, selectedDays, setSelectedDays)} 
                      className={`h-12 w-16 flex items-center justify-center font-bold rounded-2xl border-2 transition-all ${selectedDays.includes(day) ? "bg-pink-600 border-pink-600 text-white shadow-md shadow-pink-200" : "border-gray-100 text-gray-400 hover:border-pink-200"}`}>{day}</button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-700 mb-4">Preferred Slots</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {timeSlotsList.map(slot => (
                    <button type='button' key={slot} onClick={() => toggleSelection(slot, selectedSlots, setSelectedSlots)}
                      className={`py-4 px-2 border-2 rounded-2xl font-bold transition-all ${selectedSlots.includes(slot) ? "bg-pink-50 border-pink-500 text-pink-600" : "border-gray-100 text-gray-400 hover:bg-gray-50"}`}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-12">
              <button type='button' onClick={() => setStep(1)} className={btnSecondary}>
                <ChevronLeft size={20}/> Back
              </button>
              <button type='button' onClick={() => setStep(3)} className={btnPrimary}>
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Verification */}
        {step === 3 && (
          <div className="animate-in fade-in zoom-in-95 duration-500 max-w-md mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-800">Verification</h2>
              <p className="text-gray-400">Secure your account with identity proof</p>
            </header>

            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">ID Document Type</label>
                <select name="idType" value={form.independentData.governmentId.idType} onChange={(e) => handleNestedChange(e, true)} className={inputStyle}>
                  <option value="">Select ID Type</option>
                  <option value="Aadhaar">Aadhar Card</option>
                  <option value="PAN">PAN Card</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">ID Document Number</label>
                <input name="idNumber" value={form.independentData.governmentId.idNumber} onChange={(e) => handleNestedChange(e, true)} placeholder="Enter Number" className={inputStyle} />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Upload ID Proof</label>
                <label htmlFor="docs" className="group border-2 border-dashed border-gray-200 p-8 flex flex-col items-center rounded-2xl cursor-pointer hover:border-pink-500 hover:bg-pink-50/30 transition-all">
                  <div className="bg-pink-100 p-3 rounded-full text-pink-600 group-hover:scale-110 transition-transform">
                    <Paperclip size={24} />
                  </div>
                  <span className="mt-4 font-bold text-gray-700">Choose File</span>
                  <span className="text-xs text-gray-400 mt-1">PDF, JPG or PNG (Max 5MB)</span>
                  <input type="file" id="docs" className="hidden" />
                </label>
              </div>

              <div className="flex flex-col gap-4 mt-10">
                <button type="submit" className={btnPrimary}>
                  Submit Application
                </button>
                <button type='button' onClick={() => setStep(2)} className="text-center text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
                  Go Back
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default IndependentProfessionalRegisterPage;