import React from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Image as ImageIcon, Plus, Paperclip } from "lucide-react";

const SalonDocumentUploadForm = ({ onBack, data, onChange, onSubmit, theme }) => {
  const navigate = useNavigate();
  const isPurple = theme === "purple";

  const fileInputRef = React.useRef(null);
  const galleryInputRef = React.useRef(null);

  const btnPrimary = isPurple
    ? "flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-purple-200 active:scale-95 w-full"
    : "w-full py-2.5 rounded-md text-white text-sm font-semibold bg-linear-to-r from-[#5F3DC4] to-[#7B5DE8] shadow-lg shadow-purple-200 transition active:scale-95";

  const UploadBox = ({ icon: Icon, label, required, small = false, preview, onClick }) => (
    <div
      onClick={onClick}
      className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative
        ${isPurple
          ? `border-gray-200 hover:border-purple-500 hover:bg-purple-50/30 ${small ? "py-4" : "py-6"}`
          : `border-gray-300 hover:border-purple-400 bg-gray-50/50 ${small ? "py-3" : "py-5"}`
        }`}
    >
      {preview ? (
        <img src={preview} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <>
          <div
            className={`flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mb-2
              ${isPurple
                ? `${small ? "w-8 h-8" : "w-12 h-12"} group-hover:scale-110 transition-transform`
                : `${small ? "w-7 h-7" : "w-10 h-10"} rounded-md`
              }`}
          >
            <Icon className={small ? "w-4 h-4" : "w-6 h-6"} />
          </div>
          <p className={`font-medium text-purple-600 ${isPurple ? (small ? "text-xs" : "text-sm font-bold") : (small ? "text-[10px]" : "text-xs")}`}>
            {label} {required && <span className="text-red-500">*</span>}
          </p>
        </>
      )}
    </div>
  );

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      onChange(field, file);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const updated = [...(data.galleryImages || []), ...files];
      onChange("galleryImages", updated);
    }
  };

  const removeGalleryImage = (idx) => {
    const updated = data.galleryImages.filter((_, i) => i !== idx);
    onChange("galleryImages", updated);
  };

  const handleSubmit = () => {
    if (!data.idType || !data.idNumber || !data.governmentIdImage) {
      alert("Please provide Government ID details.");
      return;
    }
    onSubmit();
  };

  if (isPurple) {
    return (
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">Verification & Gallery</h2>
          <p className="text-gray-400">Secure your identity and showcase your salon</p>
        </header>

        <div className="space-y-6">
          {/* Government ID Section */}
          <div className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 uppercase">Government ID Verification</h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">ID Type</label>
              <select
                name="idType"
                value={data.idType || ""}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none bg-white text-sm"
                required
              >
                <option value="">Select ID Type</option>
                <option value="Aadhaar">Aadhaar Card</option>
                <option value="PAN">PAN Card</option>
                <option value="DL">Driving License</option>
                <option value="GST Certificate">GST Certificate</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">ID Number</label>
              <input
                name="idNumber"
                value={data.idNumber || ""}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                placeholder="Enter ID Number"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none bg-white text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">ID Image Proof</label>
              <UploadBox
                icon={Paperclip}
                label="Upload ID Image"
                required
                onClick={() => fileInputRef.current.click()}
                preview={data.governmentIdImage ? URL.createObjectURL(data.governmentIdImage) : null}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "governmentIdImage")}
              />
            </div>
          </div>

          {/* Gallery Section */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Work Gallery</label>
            <p className="text-[10px] text-gray-500 mb-3 ml-1">Add interior/exterior photos (Max 8).</p>
            <div className="grid grid-cols-2 gap-3">
              {data.galleryImages?.map((file, idx) => (
                <div key={idx} className="relative group">
                  <img src={URL.createObjectURL(file)} alt={`gallery-${idx}`} className="w-full h-24 object-cover rounded-2xl border border-gray-100" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeGalleryImage(idx);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Plus className="w-3 h-3 rotate-45" />
                  </button>
                </div>
              ))}
              {(!data.galleryImages || data.galleryImages.length < 8) && (
                <div
                  onClick={() => galleryInputRef.current.click()}
                  className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-4 cursor-pointer hover:border-purple-400 transition bg-gray-50/50 h-24"
                >
                  <Plus className="w-5 h-5 text-gray-400" />
                  <p className="text-xs font-medium text-gray-500 mt-1">Add Photo</p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={galleryInputRef}
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleGalleryChange}
            />
          </div>

          <div className="flex flex-col gap-4 mt-10">
            <button type="button" onClick={handleSubmit} className={btnPrimary}>
              Complete Registration
            </button>
            <button
              type="button"
              onClick={onBack}
              className="text-center text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Original (non-themed) layout ──
  return (
    <div className="w-full">
      <div className="w-full h-[8px] bg-gray-200 rounded-full mb-6 mt-5 ">
        <div className="h-[3px] w-full bg-purple-600 rounded-full" />

        <h2 className="text-center font-bold text-gray-800 text-sm">
          Step 3 of 3: Photos & Logo
        </h2>
      </div>
      <div className="mb-5">
        <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-tight">Salon Logo</h3>
        <UploadBox icon={Camera} label="Upload Logo" type="file" value={data.salonLogo} onChange={(e) => onChange(e.target.name, e.target.value)} />
        <p className="text-[10px] text-gray-400 mt-2">Max 2MB, Square (1:1) preferred.</p>
      </div>

      <div className="mb-5">
        <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-tight">
          Cover Image <span className="text-red-500">*</span>
        </h3>
        <UploadBox icon={ImageIcon} label="Upload Cover" type="file" value={data.coverImg} onChange={(e) => onChange(e.target.name, e.target.value)} />
        <p className="text-[10px] text-gray-400 mt-2">Landscape (16:9) looks best.</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-700 mb-1 uppercase tracking-tight">
          Gallery
        </h3>
        <p className="text-[10px] text-gray-500 mb-3">Add 3-8 interior photos.</p>

        <div className="grid grid-cols-2 gap-2" >
          <UploadBox icon={ImageIcon} label="Photo 1" small />
          <UploadBox icon={ImageIcon} label="Photo 2" small />
          <div className="border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-3 cursor-pointer hover:border-purple-400 transition bg-gray-50/50">
            <Plus className="w-4 h-4 text-gray-400" type="file" value={data.gallaryImg} onChange={(e) => onChange(e.target.name, e.target.value)} />
            <p className="text-[10px] font-medium text-gray-500">Add More</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-100">
        <button
          onClick={() => handleSubmit()}
          className={btnPrimary}
        >
          Register Salon
        </button>
        <button
          onClick={onBack}
          className="w-full py-2 text-gray-500 text-xs font-medium hover:text-purple-600 transition"
        >
          ← Edit Address
        </button>
      </div>
    </div>
  );
};

export default SalonDocumentUploadForm;