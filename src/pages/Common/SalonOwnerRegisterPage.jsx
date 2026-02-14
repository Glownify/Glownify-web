import React, { useState } from "react";
import SalonOwnerHeader from "./SalonOwnerHeader";
import BasicInfoRegistrationForm from "../../components/SalonRegistrationForms/BasicInfoRegistrationForm.jsx";
import SalonAddressRegistrationForm from "../../components/SalonRegistrationForms/SalonAddressRegistrationForm.jsx";
import SalonDocumentUploadForm from "../../components/SalonRegistrationForms/SalonDocumentUploadForm.jsx";

const SalonOwnerRegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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

  const updateData = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFinalSubmit = () => {
    console.log("final form submit data", formData);
  };

  return (
    <div className='max-w-3xl mx-auto my-0 sm:my-6 md:my-10 bg-white sm:rounded-3xl shadow-none sm:shadow-xl sm:shadow-gray-200/50 overflow-hidden sm:border border-gray-100 min-h-screen sm:min-h-0'>
      <SalonOwnerHeader
        green={step > 1}
        icon1={step > 1}
        green2={step > 2}
        icon2={step > 2}
      />

      <div className="p-5 sm:p-8 md:p-12">
        {/* STEP 1: Basic Salon Info */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BasicInfoRegistrationForm
              onNext={() => setStep(2)}
              data={formData.basicInfo}
              onChange={(field, value) => updateData("basicInfo", field, value)}
              theme="purple"
            />
          </div>
        )}

        {/* STEP 2: Salon Address */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <SalonAddressRegistrationForm
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
              data={formData.addressInfo}
              onChange={(field, value) => updateData("addressInfo", field, value)}
              theme="purple"
            />
          </div>
        )}

        {/* STEP 3: Documents & Photos */}
        {step === 3 && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <SalonDocumentUploadForm
              onBack={() => setStep(2)}
              data={formData.documents}
              onChange={(field, value) => updateData("documents", field, value)}
              onSubmit={handleFinalSubmit}
              theme="purple"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonOwnerRegisterPage;