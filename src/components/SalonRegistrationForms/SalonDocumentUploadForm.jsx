import React from "react";
import { Camera, Image } from "lucide-react";

const SalonDocumentUploadForm = ({onBack}) => {
  const UploadBox = ({ icon: Icon, label, required }) => (
    <div
      className="border border-dashed border-gray-300 rounded-lg
               flex flex-col items-center justify-center
               py-5 sm:py-6 text-center cursor-pointer
               hover:border-purple-400 transition"
    >
      <div
        className="w-10 h-10 flex items-center justify-center
                    bg-purple-100 text-purple-600 rounded-md mb-2"
      >
        <Icon className="w-6 h-6" />
      </div>

      <p className="text-sm font-medium text-purple-600">
        + {label} {required && <span className="text-red-500">*</span>}
      </p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center px-4 py-6">
      <div
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl
                   bg-white rounded-xl shadow-md px-4 sm:px-6 py-6"
      >
        {/* Progress */}
        <div className="w-full h-[3px] bg-gray-200 rounded-full mb-6">
          <div className="h-[3px] w-full bg-purple-600 rounded-full" />
        </div>

        <h2 className="text-center font-semibold text-gray-800 text-sm sm:text-base">
          Step 3 of 3: Photos, Logo & Submit
        </h2>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-2 mb-6">
          Upload salon photos and branding, then submit your registration.
        </p>

        {/* Salon Logo */}
        <h3 className="text-sm font-medium text-gray-800 mb-2">Salon Logo</h3>
        <UploadBox icon={Camera} label="Upload Salon Logo" />
        <ul className="text-xs text-gray-500 space-y-1 mt-3 mb-6">
          <li>• PNG / JPG format</li>
          <li>• Square image preferred (1:1)</li>
          <li>• White or transparent background</li>
          <li>• Max size: 2 MB</li>
        </ul>

        {/* Cover Image */}
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          Salon Cover Image
        </h3>
        <UploadBox icon={Image} label="Upload Cover Image" required />
        <ul className="text-xs text-gray-500 space-y-1 mt-3 mb-6">
          <li>• Front view of salon or reception area</li>
          <li>• Well-lit, high-quality photo</li>
          <li>• Aspect ratio 16:9 (landscape)</li>
        </ul>

        {/* Gallery */}
        <h3 className="text-sm font-medium text-gray-800 mb-1">
          Salon Gallery
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Upload 3 to 8 photos of inside your salon
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          <UploadBox icon={Image} label="Upload Photo" />
          <UploadBox icon={Image} label="Upload Photo" />

          <div
            className="border border-dashed border-gray-300 rounded-lg
                       flex flex-col items-center justify-center
                       py-5 text-center cursor-pointer hover:border-purple-400"
          >
            <div className="text-xl font-bold text-gray-500">+</div>
            <p className="text-xs text-gray-600 font-medium">Add More</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-5">
          * Minimum 1 cover image and 3 inside photos required
        </p>

        {/* Submit */}
        <button
        onClick={onBack}
          className="w-full py-2.5 rounded-md text-white text-sm font-medium
                     bg-gradient-to-r from-[#5F3DC4] to-[#7B5DE8]
                     shadow-md hover:opacity-90 transition"
        >
          Back
        </button>
        <button
          className="w-full py-2.5 rounded-md text-white text-sm font-medium
                     bg-gradient-to-r from-[#5F3DC4] to-[#7B5DE8]
                     shadow-md hover:opacity-90 transition"
        >
          Submit & Register Salon
        </button>
      </div>
    </div>
  );
};

export default SalonDocumentUploadForm;
