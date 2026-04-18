import React, { useState, useEffect } from "react";
import { ArrowRight, Plus, Trash2 } from 'lucide-react';

const BasicInfoRegistrationForm = ({ onNext, data, onChange, theme }) => {
  const isPurple = theme === "purple";

  // Themed styles
  const inputStyle = isPurple
    ? "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50/50 hover:bg-white"
    : "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500";

  const btnPrimary = isPurple
    ? "flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-purple-200 active:scale-95"
    : "w-full sm:w-40 py-2 rounded-md text-white font-medium text-sm bg-linear-to-r from-[#5F3DC4] via-[#6D4BCF] to-[#7B5DE8] shadow-lg hover:opacity-90 transition active:scale-95 tracking-wide";


  const [partners, setPartners] = useState(data.partners || []);

  useEffect(() => {
    if (data.partners) setPartners(data.partners);
  }, [data.partners]);

  useEffect(() => {
    if (data.shopType === "partnership" && partners.length === 0) {
      addPartner();
    }
  }, [data.shopType]);

  const addPartner = () => {
    setPartners(prev => {
      const updated = [...prev, { name: "", contactNumber: "", whatsappNumber: "" }];
      onChange("partners", updated);
      return updated;
    });
  };

  const removePartner = (index) => {
    setPartners(prev => {
      const updated = prev.filter((_, i) => i !== index);
      onChange("partners", updated);
      return updated;
    });
  };

  const updatePartner = (index, field, value) => {
    setPartners(prev => {
      const updated = prev.map((p, i) => i === index ? { ...p, [field]: value } : p);
      onChange("partners", updated);
      return updated;
    });
  };

  if (isPurple) {
    return (
      <div className="w-full">
        {/* Section header */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Basic Information</h2>
          <p className="text-gray-400 text-sm">Enter owner and salon details to get started</p>
        </div>

        {/* Owner Information Section */}
        <div className="mb-6">
           <h3 className="text-sm font-bold text-purple-600 uppercase mb-3 ml-1">Owner Information</h3>
           <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Owner Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Full Name</label>
                  <input
                    name="ownerName"
                    value={data.ownerName || ""}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    type="text"
                    placeholder="Enter Owner Name"
                    className={inputStyle}
                    required
                  />
                </div>

                {/* Gender */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Gender</label>
                  <select
                    name="gender"
                    value={data.gender || ""}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    className={inputStyle}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Email Address</label>
                  <input
                    name="email"
                    value={data.email}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    type="email"
                    placeholder="Enter Email Address"
                    className={inputStyle}
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Password</label>
                  <input
                    name="password"
                    value={data.password || ""}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    type="password"
                    placeholder="Set Password"
                    className={inputStyle}
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Mobile Number</label>
                  <input
                    name="mobileno"
                    value={data.mobileno}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    type="text"
                    placeholder="Enter Mobile Number"
                    className={inputStyle}
                    required
                  />
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 ml-1 uppercase">WhatsApp Number</label>
                  <input
                    name="watsupno"
                    value={data.watsupno}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    type="text"
                    placeholder="Enter WhatsApp Number"
                    className={inputStyle}
                  />
                </div>
              </div>
           </div>
        </div>

        {/* Salon Information Section */}
        <div className="mb-6">
           <h3 className="text-sm font-bold text-purple-600 uppercase mb-3 ml-1">Salon Details</h3>
           <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Salon Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Salon Name</label>
                  <input
                    name="salonname"
                    value={data.salonname}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    type="text"
                    placeholder="Enter Salon Name"
                    className={inputStyle}
                    required
                  />
                </div>

                {/* Shop Type */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Shop Type</label>
                  <select
                    name="shopType"
                    value={data.shopType || "personal"}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    className={inputStyle}
                    required
                  >
                    <option value="personal">Personal (Sole Proprietorship)</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                {/* Target Gender */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Target Gender</label>
                  <select
                    name="salonType"
                    value={data.salonType}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    className={inputStyle}
                    required
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                {/* Offers Home Service */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Offers Home Service?</label>
                  <select
                    name="offersHomeService"
                    value={data.offersHomeService ? "true" : "false"}
                    onChange={(e) => onChange(e.target.name, e.target.value === "true")}
                    className={inputStyle}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>
            </div>
         </div>

         {/* Partners Section (Only if partnership) */}
         {data.shopType === "partnership" && (
           <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex items-center justify-between mb-3 ml-1">
               <h3 className="text-sm font-bold text-purple-600 uppercase">Partners</h3>
               <button
                 type="button"
                 onClick={addPartner}
                 className="flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition-colors"
               >
                 <Plus size={14} /> Add Partner
               </button>
             </div>
             
             <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-2xl p-5">
               {partners.map((partner, index) => (
                 <div key={index} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 relative group">
                   <button
                     type="button"
                     onClick={() => removePartner(index)}
                     className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity border border-red-200 shadow-sm z-10"
                   >
                     <Trash2 size={14} />
                   </button>
                   <div className="grid grid-cols-1 gap-3">
                     <input
                       placeholder="Partner Name"
                       value={partner.name}
                       onChange={(e) => updatePartner(index, "name", e.target.value)}
                       className={inputStyle}
                     />
                     <div className="grid grid-cols-2 gap-3">
                       <input
                         placeholder="Contact No"
                         value={partner.contactNumber}
                         onChange={(e) => updatePartner(index, "contactNumber", e.target.value)}
                         className={inputStyle}
                       />
                       <input
                         placeholder="WhatsApp No"
                         value={partner.whatsappNumber}
                         onChange={(e) => updatePartner(index, "whatsappNumber", e.target.value)}
                         className={inputStyle}
                       />
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         )}

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => onNext(data)}
            className={btnPrimary}
          >
            Continue <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ── Original (non-themed) layout ──
  return (
    <div className="w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-md px-4 sm:px-6 py-6">

      {/* Form Header */}
      <div className="mt-6 sm:mt-8 mb-4">
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-2 mb-6">
          Enter your salon details to get started.
        </p>
      </div>

      {/* Form */}
      <div className="pt-6 sm:pt-8 py-6">
        {/* Salon Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-700 font-medium">Salon Name</label>
          <input
            name="salonname"
            value={data.salonname}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            type="text"
            placeholder="Enter Salon Name"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Salon Type */}
        <div className="mb-4">
          <label className="text-sm text-gray-700 font-medium block mb-2">
            Salon Type
          </label>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-700">
            {["Male", "Female", "Unisex"].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="salonType"
                  value={type}
                  checked={data.salonType === type}
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                  className="accent-purple-600"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label className="text-sm text-gray-700 font-medium">Mobile Number</label>
          <div className="mt-1 flex w-full">
            <select className="border border-gray-300 rounded-l-md px-2 text-sm focus:outline-none bg-gray-50">
              <option>+91</option>
            </select>
            <input
              name="mobileno"
              value={data.mobileno}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              type="text"
              placeholder="Enter Mobile Number"
              className="w-full border border-gray-300 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Used for Contact & WhatsApp</p>
        </div>

        {/* Whatsapp Number */}
        <div className="mb-4">
          <label className="text-sm text-gray-700 font-medium">Whatsapp Number</label>
          <div className="mt-1 flex w-full">
            <select className="border border-gray-300 rounded-l-md px-2 text-sm focus:outline-none bg-gray-50">
              <option>+91</option>
            </select>
            <input
              name="watsupno"
              value={data.watsupno}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              type="text"
              placeholder="Enter Whatsapp Number"
              className="w-full border border-gray-300 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Same as Mobile or Enter Different Number</p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="text-sm text-gray-700 font-medium">
            Email <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            name="email"
            value={data.email}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            type="email"
            placeholder="Enter Email Address"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={() => onNext(data)}
            className={btnPrimary}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoRegistrationForm;