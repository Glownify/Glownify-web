import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Image as ImageIcon, Plus } from "lucide-react";

const SalonDocumentUploadForm = ({ onBack,data,onChange,onSubmit }) => {
  const navigate=useNavigate()
  // const[uploadData,setUploadData]=useState({
  //   saloLog:"",
  //   coverImg:"",
  //   gallaryImg:""
  // })
  const UploadBox = ({ icon: Icon, label, required, small = false }) => (
    <div
      className={`border border-dashed border-gray-300 rounded-lg
                 flex flex-col items-center justify-center
                 cursor-pointer hover:border-purple-400 transition bg-gray-50/50
                 ${small ? "py-3" : "py-5"}`}
    >
      <div
        className={`${small ? "w-7 h-7" : "w-10 h-10"} 
                   flex items-center justify-center
                   bg-purple-100 text-purple-600 rounded-md mb-2`}
      >
        <Icon className={small ? "w-4 h-4" : "w-6 h-6"} />
      </div>
      <p className={`${small ? "text-[10px]" : "text-xs"} font-medium text-purple-600`}>
        {label} {required && <span className="text-red-500">*</span>}
      </p>
    </div>
  );

  const handleChange=(e)=>{
 const { name, value } = e.target;
    setUploadData(prev => ({ ...prev, [name]: value }));

    const handleSubmit = () => {
  onSubmit(); // parent wala handleFinalSubmit
  console.log("documents data:", data);
  alert("Registration Submitted!");

  setTimeout(() => {
    navigate("/booksubscriptionpage");
  }, 300);
};
  }

  return (
    <div className="w-full">
      {/* Progress */}
      {/* <div className="w-full h-[3px] bg-gray-200 rounded-full mb-6">
        <div className="h-[3px] w-full bg-purple-600 rounded-full" />
      </div>

      <h2 className="text-center font-semibold text-gray-800 text-sm">
        Step 3 of 3: Photos & Logo
      </h2>
      <p className="text-center text-[11px] text-gray-500 mt-1 mb-6">
        Finalize your branding and gallery.
      </p> */}

      {/* Salon Logo */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 mt-5 ">
        <div className="h-0.75 w-full bg-purple-600 rounded-full" />
      
       <h2 className="text-center font-bold text-gray-800 text-sm">
        Step 3 of 3: Photos & Logo
      </h2>
      </div>
      <div className="mb-5">
        <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-tight">Salon Logo</h3>
        <UploadBox icon={Camera} label="Upload Logo" type="file" value={data.salonLogo} onChange={(e)=>onChange(e.target.name, e.target.value)}/>
        <p className="text-[10px] text-gray-400 mt-2">Max 2MB, Square (1:1) preferred.</p>
      </div>

      {/* Cover Image */}
      <div className="mb-5">
        <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-tight">
          Cover Image <span className="text-red-500">*</span>
        </h3>
        <UploadBox icon={ImageIcon} label="Upload Cover" type="file" value={data.coverImg} onChange={(e)=>onChange(e.target.name, e.target.value)} />
        <p className="text-[10px] text-gray-400 mt-2">Landscape (16:9) looks best.</p>
      </div>

      {/* Gallery */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-700 mb-1 uppercase tracking-tight">
          Gallery
        </h3>
        <p className="text-[10px] text-gray-500 mb-3">Add 3-8 interior photos.</p>

        <div className="grid grid-cols-2 gap-2" >
          <UploadBox icon={ImageIcon} label="Photo 1" small />
          <UploadBox icon={ImageIcon} label="Photo 2" small />
          <div className="border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-3 cursor-pointer hover:border-purple-400 transition bg-gray-50/50">
            <Plus className="w-4 h-4 text-gray-400" type="file" value={data.gallaryImg} onChange={(e)=>onChange(e.target.name, e.target.value)} />
            <p className="text-[10px] font-medium text-gray-500">Add More</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <button
          onClick={() => handleSubmit()}
          className="w-full py-2.5 rounded-md text-white text-sm font-semibold
                     bg-linear-to-r from-[#5F3DC4] to-[#7B5DE8]
                     shadow-lg shadow-purple-200 transition active:scale-95"
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