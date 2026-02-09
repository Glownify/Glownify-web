import React, { useState } from "react";
import bgImage from "../../assets/RegisterBackground.png";
import BasicInfoRegistrationForm from "../../components/SalonRegistrationForms/BasicInfoRegistrationForm.jsx";
import SalonAddressRegistrationForm from "../../components/SalonRegistrationForms/SalonAddressRegistrationForm.jsx";
import SalonDocumentUploadForm from "../../components/SalonRegistrationForms/SalonDocumentUploadForm.jsx";

const SalonOwnerRegisterPage = () => {
  const [step, setStep] = useState(1);
const [formData,setFormData]=useState({
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
    fullAddress: ""
    },
    documents: {
       salonLogo:"",
    coverImg:"",
    gallaryImg:""
    },
})

  const totalSteps = 3;

    const updateData = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };
    const handleFinalSubmit = (e) => {
     
      
    console.log("final form sumbit data", formData);
  
  };

  return (
    <div className="min-h-screen flex">
      
      <div
        className="hidden md:block md:w-[75%] bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="w-full md:w-[25%] flex items-center justify-center bg-white border-l border-gray-100">
        <div className="w-full max-w-md px-6 py-8">

          <div className="flex items-center justify-between mb-6">
             <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
               Step {step} of {totalSteps}
             </div>
             <div className="flex space-x-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-1 w-4 rounded-full ${step >= i ? 'bg-black' : 'bg-gray-200'}`} />
                ))}
             </div>
          </div>

          {step === 1 && (
            <BasicInfoRegistrationForm onNext={() => setStep(2)}
              data={formData.basicInfo}
            onChange={(field, value) =>
              updateData("basicInfo", field, value)
            }
 />
          )}

          {step === 2 && (
            <SalonAddressRegistrationForm
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
               data={formData.addressInfo}
            onChange={(field, value) =>
              updateData("addressInfo", field, value)
            }
            />
          )}

          {step === 3 && (
            <SalonDocumentUploadForm onBack={() => setStep(2)}
              data={formData.documents}
            onChange={(field, value) =>
              updateData("documents", field, value)
            }
             onSubmit={handleFinalSubmit}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default SalonOwnerRegisterPage;