import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import {
  Star,
  MapPin,
  Scissors,
  Calendar,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

// import { fetchIndependentProfessionalById } from '../../../redux/slice/userSlice';

const IndependentProfessionalDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [detailsOfData, setDetailsOfData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedSalon = localStorage.getItem("selectedSalon");
    if (storedSalon) {
      setDetailsOfData(JSON.parse(storedSalon));
    }
  }, [dispatch]);

  
  return (
      <div className="p-5">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-4 border border-gray-100">
        {/* {detailsOfData.map((pro) => ( */}
          <div className="flex flex-col h-80 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden group/card">
            {/* Image Section */}
            <div className="relative h-65 rounded-xl overflow-hidden">
              {detailsOfData?.profilePhoto?.length>0 ? (
                <img
                  src={detailsOfData.profilePhoto}
                  alt={detailsOfData.user?.name}
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                />
              ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                      No Image
                    </div>
              )}

              {/* Overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

              <div className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase">
                {detailsOfData.experienceYears}+ Yrs Exp
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-lg leading-tight truncate">
                  {detailsOfData.user?.name}
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1 text-[11px] text-white/90">
                    <MapPin size={12} className="text-indigo-400" />
                    <span>{detailsOfData.location?.radiusInKm || 5} km away</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1 bg-white">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Specialties
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-bold text-slate-700">
                      4.9
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {detailsOfData.specializations?.slice(0, 2).map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-medium rounded-md italic"
                    >
                      {typeof spec === "string" ? spec : spec.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Section */}
              <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[11px] text-emerald-600 font-bold uppercase tracking-tight">
                    Available
                  </span>
                </div>
                <button
                  onClick={() => goToDetailPage(pro)}
                  className="text-indigo-600 text-xs font-bold hover:text-indigo-800 transition-colors flex items-center gap-1"
                >
                  Book Now 
                  {/* <ChevronRight size={14} /> */}
                </button>
              </div>
            </div>
          </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default IndependentProfessionalDetailPage;
