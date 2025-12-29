import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/slice/authSlice";
import {
  fetchAllStates,
  fetchAllCitiesByStateId,
} from "../../redux/slice/userSlice";
import { uploadImageToCloudinary } from "../../utils/CloudnaryUpload";
import {
  User,
  Users,
  Image as ImageIcon,
  ChevronLeft,
  Plus,
  Trash2,
  Upload,
  MapPin,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import RegisterHeader from "./RegisterHeader";
import toast from "react-hot-toast";

const SalonOwnerRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ownership, setOwnership] = useState("personal");
  const [cityId, setCityId] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const { states, cities } = useSelector((state) => state.user);

  // Initial State matching your exact structure
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "salon_owner",
    salonData: {
      shopName: "",
      shopType: "personal",
      salonCategory: "",
      galleryImages: [], // Holds Files temporarily, then URLs
      contactNumber: "",
      whatsappNumber: "",
      city:"",
      location: {
        type: "Point",
        coordinates: [0, 0],
        address: "",
        city: "",
        state: "",
        pincode: "",
      },
      partners: [{ name: "", contactNumber: "", sharePercentage: "" }],
      governmentId: {
        idType: "",
        idNumber: "",
        idImageUrl: "", // Holds File temporarily, then URL
      },
    },
  });

  useEffect(() => {
    dispatch(fetchAllStates());
    setLat(localStorage.getItem('lat'));
    setLng(localStorage.getItem('lng'));
  }, [dispatch]);

  useEffect(() => {
    if (userData.salonData.location.state) {
      const selectedState = states.find(
        (s) => s.name === userData.salonData.location.state
      );
      if (selectedState) {
        dispatch(fetchAllCitiesByStateId(selectedState._id));
      }
    }
  }, [dispatch, userData.salonData.location.state, states]);

  useEffect(() => {
    if (userData.salonData.location.city) {
      const selectedCity = cities.find(
        (c) => c.name === userData.salonData.location.city
      );
        if (selectedCity) {
            setCityId(selectedCity._id);
        }
    }
  }, [userData.salonData.location.city, cities]);
  // ---------------------------
  // HELPERS
  // ---------------------------
  const updateNested = (path, value) => {
    setUserData((prev) => {
      const keys = path.split(".");
      const newState = { ...prev };
      let current = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handlePartnerUpdate = (index, field, value) => {
    const updatedPartners = [...userData.salonData.partners];
    updatedPartners[index] = { ...updatedPartners[index], [field]: value };
    updateNested("salonData.partners", updatedPartners);
  };

  const addPartner = () => {
    if (userData.salonData.partners.length < 5) {
      updateNested("salonData.partners", [
        ...userData.salonData.partners,
        { name: "", contactNumber: "", sharePercentage: "" },
      ]);
    }
  };

  const removePartner = (index) => {
    const updated = userData.salonData.partners.filter((_, i) => i !== index);
    updateNested("salonData.partners", updated);
  };

  const handleFileChange = (e, path, isMultiple = false) => {
    const files = Array.from(e.target.files);
    if (isMultiple) {
      const currentImages = userData.salonData.galleryImages;
      updateNested(path, [...currentImages, ...files].slice(0, 4));
    } else {
      updateNested(path, files[0]);
    }
  };

  // ---------------------------
  // FINAL SUBMISSION
  // ---------------------------
  const handleRegister = async () => {
    setLoading(true);
    const toastId = toast.loading("Uploading images and registering...");

    try {
      // 1. Upload Gallery Images
      // We use a regular loop or Promise.all. If uploadImageToCloudinary
      // throws an error, it will be caught by the catch block below.
      const galleryUrls = await Promise.all(
        userData.salonData.galleryImages.map((file) =>
          uploadImageToCloudinary(file)
        )
      );

      // 2. Upload Government ID
      const idUrl = await uploadImageToCloudinary(
        userData.salonData.governmentId.idImageUrl
      );

      // Safety check: If for some reason the helper didn't throw but returned null
      if (!idUrl || galleryUrls.includes(null)) {
        throw new Error(
          "One or more images failed to upload. Please try again."
        );
      }

      // 3. Construct Final JSON Payload
      const finalPayload = {
        ...userData,
        salonData: {
          ...userData.salonData,
          shopType: ownership,
          galleryImages: galleryUrls, // Now contains strings (URLs)
          city: cityId,
          location: {
            ...userData.salonData.location,
            coordinates: [lng, lat],
          },
          governmentId: {
            ...userData.salonData.governmentId,
            idImageUrl: idUrl, // Now contains string (URL)
          },
          // Only include partners if it's a partnership
          partners:
            ownership === "partnership" ? userData.salonData.partners : [],
        },
      };

      console.log("Final Registration Payload:", finalPayload);

      // 4. Send to Backend
      // This only runs if all previous awaits succeeded
       const registerPromise = dispatch(register(finalPayload)).unwrap();

    await toast.promise(registerPromise, {
      loading: "Creating salon owner account...",
      success: (res) =>
        res?.message || "Registration successful! Please log in.",
      error: (err) =>
        err?.message ||
        err?.error ||
        "Registration failed. Please try again.",
    });
    
    navigate("/login");
    } catch (err) {
      // This catches Cloudinary errors AND Backend errors
      console.error("Registration Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Validation Logic
  const isStepValid = () => {
    if (step === 1) {
      return (
        userData.name &&
        userData.email &&
        userData.phone.length >= 10 &&
        userData.salonData.shopName
      );
    }
    if (step === 2) {
      return (
        userData.salonData.location.address &&
        userData.salonData.galleryImages.length > 0
      );
    }
    if (step === 3) {
      return (
        userData.salonData.governmentId.idType &&
        userData.salonData.governmentId.idImageUrl
      );
    }
    return false;
  };

  // UI Components (simplified for brevity, keeping your styling)
  const inputClass =
    "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm";
  const labelClass =
    "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100">
        <RegisterHeader step={step} />

        <div className="w-full bg-gray-100 h-1">
          <div
            className="bg-indigo-600 h-full transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <main className="p-6 md:p-10">
          {step === 1 && (
            <div className="space-y-6">
              {/* Ownership Toggle */}
              <div className="grid grid-cols-2 gap-4">
                {["personal", "partnership"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setOwnership(type);
                      updateNested("salonData.shopType", type);
                    }}
                    className={`p-4 border-2 rounded-xl flex items-center gap-4 ${
                      ownership === type
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-100"
                    }`}
                  >
                    {type === "personal" ? <User /> : <Users />}
                    <span className="capitalize font-bold">{type}</span>
                  </button>
                ))}
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Owner Name</label>
                  <input
                    className={inputClass}
                    value={userData.name}
                    onChange={(e) => updateNested("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    className={inputClass}
                    value={userData.phone}
                    onChange={(e) => updateNested("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    className={inputClass}
                    type="email"
                    value={userData.email}
                    onChange={(e) => updateNested("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <input
                    className={inputClass}
                    type="password"
                    value={userData.password}
                    onChange={(e) => updateNested("password", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Business Name</label>
                  <input
                    className={inputClass}
                    value={userData.salonData.shopName}
                    onChange={(e) =>
                      updateNested("salonData.shopName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    className={inputClass}
                    value={userData.salonData.salonCategory}
                    onChange={(e) =>
                      updateNested("salonData.salonCategory", e.target.value)
                    }
                  >
                    <option value="">Select Category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>
              </div>

              {/* Partners Section */}
              {ownership === "partnership" && (
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Partner Details</h3>
                  {userData.salonData.partners.map((p, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2 bg-gray-50 p-2 rounded"
                    >
                      <input
                        placeholder="Name"
                        className={inputClass}
                        value={p.name}
                        onChange={(e) =>
                          handlePartnerUpdate(i, "name", e.target.value)
                        }
                      />
                      <input
                        placeholder="Phone"
                        className={inputClass}
                        value={p.contactNumber}
                        onChange={(e) =>
                          handlePartnerUpdate(
                            i,
                            "contactNumber",
                            e.target.value
                          )
                        }
                      />
                      <div className="flex gap-2">
                        <input
                          placeholder="% Share"
                          className={inputClass}
                          value={p.sharePercentage}
                          onChange={(e) =>
                            handlePartnerUpdate(
                              i,
                              "sharePercentage",
                              e.target.value
                            )
                          }
                        />
                        {i > 0 && (
                          <button
                            onClick={() => removePartner(i)}
                            className="text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addPartner}
                    className="text-sm text-indigo-600 flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Partner
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <label className={labelClass}>Gallery (Max 4)</label>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <label
                    key={i}
                    className="aspect-square border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    {userData.salonData.galleryImages[i] ? (
                      <img
                        src={URL.createObjectURL(
                          userData.salonData.galleryImages[i]
                        )}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="text-gray-300" />
                    )}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(e, "salonData.galleryImages", true)
                      }
                    />
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Address"
                  className={inputClass}
                  value={userData.salonData.location.address}
                  onChange={(e) =>
                    updateNested("salonData.location.address", e.target.value)
                  }
                />
                <select
                  className={inputClass}
                  value={userData.salonData.location.state}
                    onChange={(e) => {
                        updateNested("salonData.location.state", e.target.value);
                    }}
                >
                  <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state.id} value={state.name}>
                            {state.name}
                        </option>
                    ))}
                </select>
                <select
                  className={inputClass}
                  value={userData.salonData.location.city}
                    onChange={(e) => {
                        updateNested("salonData.location.city", e.target.value);
                    }}
                >
                  <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
                
                <input
                  placeholder="Pincode"
                  className={inputClass}
                  value={userData.salonData.location.pincode}
                  onChange={(e) =>
                    updateNested("salonData.location.pincode", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 max-w-md mx-auto">
              <select
                className={inputClass}
                value={userData.salonData.governmentId.idType}
                onChange={(e) =>
                  updateNested("salonData.governmentId.idType", e.target.value)
                }
              >
                <option value="">Select ID Type</option>
                <option value="Aadhar">Aadhar</option>
                <option value="PAN">PAN</option>
              </select>
              <input
                placeholder="ID Number"
                className={inputClass}
                value={userData.salonData.governmentId.idNumber}
                onChange={(e) =>
                  updateNested(
                    "salonData.governmentId.idNumber",
                    e.target.value
                  )
                }
              />
              <label className="flex flex-col items-center p-10 border-2 border-dashed rounded-2xl cursor-pointer">
                {userData.salonData.governmentId.idImageUrl ? (
                  <CheckCircle2 className="text-green-500" size={40} />
                ) : (
                  <Upload className="text-gray-400" size={40} />
                )}
                <p className="mt-2 text-sm">
                  {userData.salonData.governmentId.idImageUrl
                    ? "Document Selected"
                    : "Upload ID Image"}
                </p>
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    handleFileChange(e, "salonData.governmentId.idImageUrl")
                  }
                />
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button
              disabled={step === 1 || loading}
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center text-gray-400 disabled:opacity-0"
            >
              <ChevronLeft /> Back
            </button>
            <button
              disabled={!isStepValid() || loading}
              onClick={() =>
                step === 3 ? handleRegister() : setStep((s) => s + 1)
              }
              className={`px-10 py-3 rounded-xl font-bold text-white transition-all ${
                isStepValid()
                  ? "bg-indigo-600 shadow-indigo-200 shadow-lg"
                  : "bg-gray-300"
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : step === 3 ? (
                "Complete Registration"
              ) : (
                "Next Step"
              )}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalonOwnerRegisterPage;
