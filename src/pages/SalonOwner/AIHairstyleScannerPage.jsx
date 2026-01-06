import React, { memo } from "react";
import { ArrowLeft, ScanFace } from "lucide-react";

const AIHairstyleScannerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="max-w-3xl w-full">

        {/* Main Container */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 text-center">

          {/* Icon */}
          <div className="w-14 h-14 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-5">
            <ScanFace size={26} />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            AI Hairstyle Scanner
          </h1>

          {/* Description */}
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            To use the AI Hairstyle Scanner feature, you need to connect your
            OpenAI API key in the Integrations panel. This will enable AI-powered
            hairstyle recommendations based on face shape analysis.
          </p>

          {/* How it works */}
          <div className="bg-purple-50 p-4 rounded-xl max-w-2xl mx-auto text-sm text-gray-700">
            <p>
              <span className="font-semibold">How it works:</span> Once enabled,
              you can upload client photos, receive AI-powered hairstyle
              suggestions based on face shape, and preview styles before the
              haircut.
            </p>

            <p className="mt-2 text-purple-600 font-medium">
              Please connect your OpenAI API Key in the Integrations panel to get
              started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AIHairstyleScannerPage);
