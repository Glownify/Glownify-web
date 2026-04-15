import React from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Image as ImageIcon, Plus, Paperclip } from "lucide-react";

const SalonDocumentUploadForm = ({ onBack, data, onChange, onSubmit, theme }) => {
  const navigate = useNavigate();
  const isPurple = theme === "purple";

  const btnPrimary = isPurple
    ? "flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-purple-200 active:scale-95 w-full"
    : "w-full py-2.5 rounded-md text-white text-sm font-semibold bg-linear-to-r from-[#5F3DC4] to-[#7B5DE8] shadow-lg shadow-purple-200 transition active:scale-95";

  const UploadBox = ({ icon: Icon, label, required, small = false }) => (
    <div
      className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all
        ${isPurple
          ? `border-gray-200 hover:border-purple-500 hover:bg-purple-50/30 ${small ? "py-4" : "py-6"}`
          : `border-gray-300 hover:border-purple-400 bg-gray-50/50 ${small ? "py-3" : "py-5"}`
        }`}
    >
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
    </div>
  );

  const handleSubmit = () => {
    onSubmit();
    console.log("documents data:", data);
    alert("Registration Submitted!");
    setTimeout(() => {
      navigate("/booksubscriptionpage");
    }, 300);
  };

  if (isPurple) {
    return (
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">Photos & Logo</h2>
          <p className="text-gray-400">Finalize your branding and gallery</p>
        </header>

        <div className="space-y-6">
          {/* Salon Logo */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Salon Logo</label>
            <UploadBox icon={Camera} label="Upload Logo" />
            <p className="text-[10px] text-gray-400 mt-2 ml-1">Max 2MB, Square (1:1) preferred.</p>
          </div>

          {/* Cover Image */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
              Cover Image <span className="text-red-500">*</span>
            </label>
            <UploadBox icon={ImageIcon} label="Upload Cover" required />
            <p className="text-[10px] text-gray-400 mt-2 ml-1">Landscape (16:9) looks best.</p>
          </div>

          {/* Gallery */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Gallery</label>
            <p className="text-[10px] text-gray-500 mb-3 ml-1">Add 3-8 interior photos.</p>
            <div className="grid grid-cols-2 gap-3">
              <UploadBox icon={ImageIcon} label="Photo 1" small />
              <UploadBox icon={ImageIcon} label="Photo 2" small />
              <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-4 cursor-pointer hover:border-purple-400 transition bg-gray-50/50">
                <Plus className="w-5 h-5 text-gray-400" />
                <p className="text-xs font-medium text-gray-500 mt-1">Add More</p>
              </div>
            </div>
          </div>

          {/* Government ID Section */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Identity Verification</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">ID Type</label>
                <select
                  name="idType"
                  value={data.idType || "Aadhaar"}
                  onChange={(e) => onChange("idType", e.target.value)}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 outline-none bg-gray-50"
                >
                  <option value="Aadhaar">Aadhaar Card</option>
                  <option value="PAN">PAN Card</option>
                  <option value="VoterID">Voter ID</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">ID Number</label>
                <input
                  name="idNumber"
                  value={data.idNumber || ""}
                  onChange={(e) => onChange("idNumber", e.target.value)}
                  placeholder="Enter ID Number"
                  className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 outline-none bg-gray-50"
                />
              </div>
            </div>
            <div className="mt-3">
              <UploadBox icon={Paperclip} label="Upload ID Document" small />
            </div>
          </div>

          {/* Opening Hours */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Business Hours</h3>
            <div className="space-y-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <span className="w-10 text-xs font-bold text-gray-600">{day}</span>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="time"
                      className="flex-1 px-3 py-1 text-xs border border-gray-200 rounded-lg outline-none"
                      defaultValue="09:00"
                    />
                    <span className="text-gray-400 text-xs self-center">to</span>
                    <input
                      type="time"
                      className="flex-1 px-3 py-1 text-xs border border-gray-200 rounded-lg outline-none"
                      defaultValue="20:00"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-10">
            <button type="button" onClick={handleSubmit} className={btnPrimary}>
              Register Salon
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