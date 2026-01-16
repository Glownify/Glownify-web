import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Star, MapPin, Scissors, Calendar, 
  Sparkles, ShieldCheck, CheckCircle, 
  Clock, Award, ChevronRight 
} from "lucide-react";

const IndependentProfessionalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detailsOfData, setDetailsOfData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedSalon = localStorage.getItem("selectedSalon");
    if (storedSalon) {
      setDetailsOfData(JSON.parse(storedSalon));
    }
  }, []);

  if (!detailsOfData) return <div className="p-10 text-center text-gray-500">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header / Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Professional Image */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                {detailsOfData.profilePhoto ? (
                  <img
                    src={detailsOfData.profilePhoto}
                    alt={detailsOfData.user?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Scissors size={40} />
                  </div>
                )}
              </div>
              {/* Updated to rose-600 */}
              <div className="absolute -bottom-3 -right-3 bg-rose-600 text-white p-2 rounded-full border-4 border-white shadow-lg">
                <ShieldCheck size={20} />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {detailsOfData.user?.name}
                </h1>
                {/* Updated badge colors */}
                <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-full border border-rose-100 uppercase tracking-wider">
                  Solo Professional
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-slate-600">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-amber-500 fill-amber-500" />
                  <span className="font-bold text-slate-900">4.9</span>
                  <span className="text-sm">(120+ Reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Updated icon color */}
                  <Award size={18} className="text-rose-600" />
                  <span className="text-sm font-medium">{detailsOfData.experienceYears}+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-slate-400" />
                  <span className="text-sm">{detailsOfData.location?.radiusInKm || 5} km service radius</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {detailsOfData.specializations?.map((spec, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-sm rounded-lg shadow-sm">
                    {typeof spec === "string" ? spec : spec.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Sidebar (Desktop) */}
            <div className="w-full md:w-80 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {/* Updated indicator color */}
                  <div className="w-2.5 h-2.5 bg-rose-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-rose-600 uppercase">Available Today</span>
                </div>
                <Clock size={16} className="text-slate-400" />
              </div>
              {/* Updated button color */}
              <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-rose-100 flex items-center justify-center gap-2 mb-4">
                Book Appointment
                <ChevronRight size={18} />
              </button>
              <p className="text-[11px] text-center text-slate-400">
                No upfront payment required for most services
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              {/* Updated icon color */}
              <Sparkles className="text-rose-600" size={20} />
              About the Professional
            </h2>
            <p className="text-slate-600 leading-relaxed bg-white p-6 rounded-2xl border border-slate-100">
              {detailsOfData.bio || `${detailsOfData.user?.name} is a highly skilled professional with over ${detailsOfData.experienceYears} years of experience specializing in premium services tailored to your needs.`}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Why Book With Me?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Certified & Background Checked",
                "Premium Products Used",
                "Flexible Home Services",
                "Strict Hygiene Protocols"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100">
                  {/* Updated icon color */}
                  <CheckCircle size={18} className="text-rose-600" />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Information Cards */}
        <div className="space-y-6">
          {/* Updated to rose-900/rose-300 for dark card contrast */}
          <div className="bg-rose-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold text-lg mb-2">Service Guarantee</h3>
            <p className="text-rose-100 text-sm leading-relaxed mb-4">
              I ensure a 100% satisfaction guarantee. If you're not happy with the service, I'll make it right.
            </p>
            <div className="flex items-center gap-2 text-rose-300">
              <ShieldCheck size={16} />
              <span className="text-xs font-bold uppercase">Verified Solo Expert</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              {/* Updated icon color */}
              <Calendar size={18} className="text-rose-600" />
              Availability
            </h3>
            <div className="space-y-3">
              {['Mon - Fri', 'Sat - Sun'].map((days, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-500">{days}</span>
                  <span className="font-medium text-slate-700">{i === 0 ? '9:00 AM - 8:00 PM' : '10:00 AM - 6:00 PM'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IndependentProfessionalDetailPage;