import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllSpecialists,
  createSpecialist,
  editSpecialist,
  deleteSpecialist,
} from "../../redux/slice/saloonownerSlice";
import {
  Plus,
  X,
  Phone,
  Trash2,
  Edit3,
  Briefcase,
  Mail,
  Award,
  Calendar,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import MobileManageSpecialistsScreen from "./Mobile/MobileManageSpecialistsScreen";

const expertiseOptions = ["Hair", "Skin", "Makeup", "Massage", "Nails", "Other"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ManageSpecialistsPage = () => {
  const dispatch = useDispatch();
  const { specialists = [], loading } = useSelector((state) => state.saloonowner);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    experienceYears: "",
    image: "",
    expertise: [],
    certifications: "",
    availability: [],
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchAllSpecialists());
  }, [dispatch]);

  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      experienceYears: "",
      image: "",
      expertise: [],
      certifications: "",
      availability: [],
    });
  };

  const toggleExpertise = (skill) => {
    setForm((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(skill)
        ? prev.expertise.filter((e) => e !== skill)
        : [...prev.expertise, skill],
    }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    setForm((prev) => {
      const exists = prev.availability.find((a) => a.day === day);
      if (exists) {
        return {
          ...prev,
          availability: prev.availability.map((a) =>
            a.day === day ? { ...a, [field]: value } : a
          ),
        };
      }
      return {
        ...prev,
        availability: [...prev.availability, { day, start: "", end: "", [field]: value }],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      expertise: form.expertise,
      experienceYears: Number(form.experienceYears),
      certifications: form.certifications
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      image: form.image,
      availability: form.availability.filter((a) => a.start && a.end),
    };

    try {
      const actionPromise = isEdit
        ? dispatch(
          editSpecialist({
            specialistId: selectedId,
            specialistData: payload,
          })
        ).unwrap()
        : dispatch(createSpecialist(payload)).unwrap();

      await toast.promise(actionPromise, {
        loading: isEdit ? "Updating specialist..." : "Creating specialist...",
        success: (res) =>
          res?.message ||
          (isEdit
            ? "Specialist updated successfully!"
            : "Specialist added successfully!"),
        error: (err) =>
          err?.message ||
          err?.error ||
          "Operation failed. Please try again.",
      });

      setOpen(false);
      setIsEdit(false);
      setSelectedId(null);
      resetForm();

      // Optional refresh if backend doesn't auto-update list
      dispatch(fetchAllSpecialists());
    } catch (error) {
      console.error("Specialist submit error:", error);
    }
  };


  const handleEdit = (s) => {
    setIsEdit(true);
    setSelectedId(s._id);
    setForm({
      name: s.user?.name || "",
      phone: s.user?.phone || "",
      email: s.user?.email || "",
      experienceYears: s.experienceYears || "",
      image: s.image || "",
      expertise: s.expertise || [],
      certifications: (s.certifications || []).join(", "),
      availability: s.availability || [],
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this specialist?")) return;

    try {
      const deletePromise = dispatch(deleteSpecialist(id)).unwrap();

      await toast.promise(deletePromise, {
        loading: "Deleting specialist...",
        success: (res) =>
          res?.message || "Specialist deleted successfully!",
        error: (err) =>
          err?.message ||
          err?.error ||
          "Failed to delete specialist",
      });

      dispatch(fetchAllSpecialists());
    } catch (error) {
      console.error("Delete specialist error:", error);
    }
  };

  // Dummy data for layout visualization
  const dummySpecialists = [
    {
      _id: "d1",
      user: { name: "Elena Rossi", phone: "+1 234 567 890", email: "elena.rossi@atelier.com" },
      experienceYears: "15",
      expertise: ["Master Stylist", "Creative Director", "Color Theory"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      availability: [
        { day: "Mon", start: "09:00", end: "18:00" },
        { day: "Tue", start: "09:00", end: "18:00" },
        { day: "Wed", start: "09:00", end: "18:00" },
        { day: "Thu", start: "09:00", end: "18:00" },
      ]
    },
    {
      _id: "d2",
      user: { name: "Marco Valesco", phone: "+1 234 567 891", email: "marco.v@atelier.com" },
      experienceYears: "12",
      expertise: ["Precision Barbering", "Hot Shave", "Beard Sculpting"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      availability: [
        { day: "Wed", start: "10:00", end: "20:00" },
        { day: "Thu", start: "10:00", end: "20:00" },
        { day: "Fri", start: "10:00", end: "20:00" },
        { day: "Sat", start: "09:00", end: "17:00" },
      ]
    },
    {
      _id: "d3",
      user: { name: "Sofia Chen", phone: "+1 234 567 892", email: "sofia.skin@atelier.com" },
      experienceYears: "8",
      expertise: ["Dermal Therapy", "Botanical Facials", "Chemical Peels"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
      availability: [
        { day: "Mon", start: "11:00", end: "19:00" },
        { day: "Tue", start: "11:00", end: "19:00" },
        { day: "Sat", start: "09:00", end: "18:00" },
        { day: "Sun", start: "10:00", end: "16:00" },
      ]
    },
    {
      _id: "d4",
      user: { name: "Luca Ferrari", phone: "+1 234 567 893", email: "luca.f@atelier.com" },
      experienceYears: "10",
      expertise: ["Balayage Expert", "Avant-Garde Styling", "Extensions"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      availability: [
        { day: "Tue", start: "09:00", end: "18:00" },
        { day: "Wed", start: "09:00", end: "18:00" },
        { day: "Thu", start: "09:00", end: "18:00" },
        { day: "Fri", start: "09:00", end: "18:00" },
      ]
    }
  ];

  const displaySpecialists = specialists.length > 0 ? specialists : dummySpecialists;

  if (isMobile) {
    return <MobileManageSpecialistsScreen />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-6 lg:p-10 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Staff Setup</h1>
            <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
              Curate your atelier's elite team. Onboard specialists, manage their editorial expertise, and define their weekly residency.
            </p>
          </div>
          <button
            onClick={() => {
              setIsEdit(false);
              setSelectedId(null);
              resetForm();
              setOpen(true);
            }}
            className="flex items-center gap-3 bg-[#D81159] hover:bg-[#B00E48] text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest shadow-2xl shadow-rose-500/20 transition-all hover:-translate-y-1 active:scale-95 uppercase"
          >
            <Plus size={20} strokeWidth={3} />
            <span>Add Specialist</span>
          </button>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D81159]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {displaySpecialists.map((s) => (
              <div key={s._id} className="group bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-50 to-transparent rounded-bl-[100px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <img
                      src={s.image || "https://ui-avatars.com/api/?name=" + s.user?.name}
                      className="w-24 h-24 rounded-[30px] object-cover ring-8 ring-slate-50 shadow-lg group-hover:rotate-3 transition-transform duration-500"
                      alt={s.user?.name}
                    />
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end text-[#D81159]">
                        <Award size={14} strokeWidth={3} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{s.experienceYears}Y Exp.</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight group-hover:text-[#D81159] transition-colors">
                      {s.user?.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                      {s.expertise?.map((e, i) => (
                        <span key={i} className="text-[10px] bg-slate-50 border border-slate-100 text-slate-500 px-3 py-1.5 rounded-xl font-black uppercase tracking-widest">
                          {e}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-3 pt-4">
                      <div className="flex items-center gap-3 text-slate-400 font-bold text-xs">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-rose-50 group-hover:text-[#D81159] transition-colors">
                          <Phone size={14} />
                        </div>
                        {s.user?.phone}
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 font-bold text-xs">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-rose-50 group-hover:text-[#D81159] transition-colors">
                          <Mail size={14} />
                        </div>
                        <span className="truncate max-w-[180px]">{s.user?.email || "No email provided"}</span>
                      </div>
                    </div>
                  </div>

                  {s.availability?.length > 0 && (
                    <div className="mt-8 bg-[#FAF7FC] rounded-[30px] p-5 border border-[#F3EDF7]">
                      <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Clock size={12} strokeWidth={3} /> Weekly Residency
                      </p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                        {s.availability.slice(0, 4).map((a, idx) => (
                          <div key={idx} className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-400">{a.day}</span>
                            <span className="text-slate-800">{a.start}-{a.end}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(s)}
                      className="flex-1 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-100 transition-all font-black text-xs uppercase tracking-widest"
                    >
                      <Edit3 size={16} className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="flex-1 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#D81159] hover:bg-red-50 hover:border-red-100 transition-all font-black text-xs uppercase tracking-widest"
                    >
                      <Trash2 size={16} className="mr-2" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setOpen(false)}></div>

            <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <div>
                  <h2 className="font-bold text-xl text-slate-900">
                    {isEdit ? "Update Specialist Profile" : "Add New Specialist"}
                  </h2>
                  <p className="text-sm text-slate-500">Fill in the details below</p>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[75vh]">
                <div className="space-y-6">
                  {/* Personal Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                      <input required placeholder="Jane Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Phone Number</label>
                      <input required placeholder="+1 234..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                      <input required type="email" placeholder="jane@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Years of Experience</label>
                      <input type="number" placeholder="5" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={form.experienceYears}
                        onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Expertise Selection */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 block mb-3">Area of Expertise</label>
                    <div className="flex flex-wrap gap-2">
                      {expertiseOptions.map((e) => (
                        <button
                          key={e}
                          type="button"
                          onClick={() => toggleExpertise(e)}
                          className={`px-4 py-2 rounded-xl text-sm font-black border transition-all uppercase tracking-widest ${form.expertise.includes(e)
                            ? "bg-[#D81159] border-[#D81159] text-white shadow-md shadow-rose-100"
                            : "bg-white border-slate-200 text-slate-400 hover:border-[#D81159]"
                            }`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Certifications</label>
                    <input
                      placeholder="L'Oreal Masterclass, Advanced Skin Therapy..."
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#D81159]/10 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                      value={form.certifications}
                      onChange={(e) => setForm({ ...form, certifications: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Profile Image URL</label>
                    <input
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#D81159]/10 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                    />
                  </div>

                  {/* Availability Grid */}
                  <div className="bg-slate-50/50 p-8 rounded-[30px] border border-slate-100 space-y-6">
                    <div className="flex items-center gap-3 text-slate-800 font-black uppercase tracking-widest text-xs">
                      <Calendar size={18} className="text-[#D81159]" />
                      <h4>Weekly Availability</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {days.map((day) => (
                        <div key={day} className="flex flex-col sm:flex-row gap-4 sm:items-center bg-white p-4 rounded-2xl border border-slate-50">
                          <span className="w-12 font-black text-slate-700 text-xs uppercase tracking-widest">{day}</span>
                          <div className="flex flex-1 gap-3 items-center">
                            <input type="time" className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border-none text-sm font-black text-slate-600 focus:ring-2 focus:ring-[#D81159]/10 outline-none"
                              onChange={(e) => handleAvailabilityChange(day, "start", e.target.value)}
                            />
                            <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">to</span>
                            <input type="time" className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border-none text-sm font-black text-slate-600 focus:ring-2 focus:ring-[#D81159]/10 outline-none"
                              onChange={(e) => handleAvailabilityChange(day, "end", e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-10 mt-6 border-t border-slate-50">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-10 py-4 rounded-2xl bg-[#D81159] hover:bg-[#B00E48] text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-rose-500/20 hover:-translate-y-1 active:scale-95">
                    {isEdit ? "Update Specialist" : "Save Specialist"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSpecialistsPage;