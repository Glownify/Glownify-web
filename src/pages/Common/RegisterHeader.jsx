import React, { memo } from 'react';
import { User, Store, ShieldCheck, Check } from 'lucide-react';

const RegisterHeader = ({ step }) => {
  // Helper to determine step styling
  const getStepStatus = (currentStep) => {
    if (step > currentStep) return "completed";
    if (step === currentStep) return "active";
    return "pending";
  };

  const steps = [
    {
      id: 1,
      title: "Contact Details",
      sub: "Basic information",
      icon: <User size={20} />,
    },
    {
      id: 2,
      title: "Shop Details",
      sub: "Location & Images",
      icon: <Store size={20} />,
    },
    {
      id: 3,
      title: "Verification",
      sub: "Upload documents",
      icon: <ShieldCheck size={20} />,
    },
  ];

  return (
    <div>
      {/* Top Banner */}
      <header 
        className="px-6 py-8 text-white text-center md:text-left" 
        style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}
      >
        <h1 className="text-2xl font-bold">Earn with Us</h1>
        <p className="text-indigo-100 mt-1 text-sm">
          Partner Registration — register your shop and start earning
        </p>
      </header>

      {/* Stepper Navigation */}
      <nav className="px-6 py-6 bg-white border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((s) => {
            const status = getStepStatus(s.id);
            
            return (
              <div key={s.id} className="flex items-center gap-3">
                <div 
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    status === "completed" 
                      ? "bg-green-500 text-white" 
                      : status === "active" 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {status === "completed" ? <Check size={20} strokeWidth={3} /> : s.icon}
                </div>
                
                <div className="hidden sm:block">
                  <p className={`text-sm font-bold ${status === "active" ? "text-indigo-600" : "text-gray-700"}`}>
                    {s.title}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    {s.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default memo(RegisterHeader);