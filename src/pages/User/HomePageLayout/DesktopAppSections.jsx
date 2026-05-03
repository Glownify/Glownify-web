import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchNearbySalons,
    fetchHomeIndependentProfessionals,
    fetchUnisexNearbySalons,
} from "../../../redux/slice/userSlice";
import { formatSalonData } from "../../../utils/formatSalonData";
import salonImg from "../../../assets/salon.png";
import SalonCard from "../../Common/SalonCard";


// ────────────────────────────────────────────────────────────
// 1. CATEGORIES
// ────────────────────────────────────────────────────────────
export function DesktopServiceCategories({ categories }) {
    const navigate = useNavigate();
    const { categoriesLoading } = useSelector((state) => state.user);

    if (categoriesLoading) {
        return <div className="px-10 py-6"><p className="text-gray-400">Loading categories...</p></div>;
    }

    if (!categories?.length) {
        return (
            <div className="bg-white pb-4 border-b border-gray-100 px-10 lg:px-16 py-6">
                <p className="text-gray-400 text-sm">No categories found</p>
            </div>
        );
    }

    return (
        <div className="bg-white pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between px-10 lg:px-16 pt-5 pb-4">
                <h2 className="text-[17px] font-semibold text-gray-800">
                    What do you want to get?
                </h2>
                <button
                    className="text-[14px] font-semibold"
                    style={{ color: "#0d9488" }}
                    onClick={() => navigate("/categories")}
                >
                    View all
                </button>
            </div>

            <div className="flex justify-center gap-10 lg:gap-14 overflow-x-auto px-10 lg:px-16 pb-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

                {categories.map((cat) => (
                    <button
                        key={cat.id || cat._id}
                        className="flex flex-col items-center gap-2 shrink-0"
                        onClick={() => navigate("/categories")}
                    >
                        <div className="w-20 h-20 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#e0f7f5" }}>

                            <img
                                src={cat.icon}
                                alt={cat.name}
                                className="w-11 h-11 object-contain"
                            />
                        </div>
                        <span className="text-[14px] text-teal-600 font-semibold">
                            {cat.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}


// ────────────────────────────────────────────────────────────
// 3. NEARBY SALONS
// ────────────────────────────────────────────────────────────
export function DesktopNearbySalons({ category }) {
    const navigate = useNavigate();
    const { nearbySalons = [], salonsLoading } = useSelector((state) => state.user);

    const salonsToShow = useMemo(() => formatSalonData(nearbySalons), [nearbySalons]);

    if (salonsLoading) {
        return <div className="px-10 py-6"><p className="text-gray-400">Loading salons...</p></div>;
    }

    if (!salonsToShow.length) {
        return <div className="px-10 py-6"><p className="text-gray-400 text-sm">No salons found</p></div>;
    }

    return (
        <div className="bg-white pb-8 border-b border-gray-100">
            <div className="flex justify-between px-10 lg:px-16 pt-6 pb-5">
                <h2 className="text-[18px] font-extrabold">NEARBY SALONS</h2>
                <button onClick={() => navigate("/salons")}
                    className="text-[14px] font-semibold cursor-pointer"
                    style={{ color: "#0d9488" }}>
                    View all
                </button>
            </div>

            <div className="grid grid-cols-3 gap-6 px-10 lg:px-16">
                {salonsToShow.slice(0, 3).map((salon) => (
                    <SalonCard
                        key={salon._id}
                        salon={salon}
                        category={category}
                        onClick={() => navigate(`/salon/${salon._id}`)}
                    />
                ))}
            </div>
        </div>
    );
}

// ────────────────────────────────────────────────────────────
// 4. HOME SERVICE (minor safe fixes only)
// ────────────────────────────────────────────────────────────
function DesktopProCard({ pro, onPress }) {
    const isAvail = pro.availabilityStatus === "available";
    const name = pro.user?.name;
    const exp = pro.experienceYears ? `${pro.experienceYears} yrs Exp` : "N/A";
    const spec = pro.specializations?.length > 0 ? pro.specializations[0] : "General";
    const rating = pro.avgRating || "0.0";
    const distanceKm = pro.distanceInMeters
        ? (pro.distanceInMeters / 1000).toFixed(1)
        : "N/A";

    return (
        <div
            className="bg-white rounded-2xl overflow-hidden shrink-0 cursor-pointer border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            style={{ width: 210, boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}
            onClick={onPress}
        >
            <div className="relative w-full" style={{ height: 220 }}>
                <img src={pro.profilePhoto || salonImg} alt={name} className="w-full h-full object-cover object-center" />
                <div className="absolute top-2 right-2 rounded-full px-2 py-0.5" style={{ backgroundColor: isAvail ? "#16a34a" : "#6b7280" }}>
                    <span className="text-white text-[10px] font-bold">{isAvail ? "● Available" : "● Busy"}</span>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full px-2 py-0.5" style={{ backgroundColor: "#16a34a" }}>
                    <span className="text-white text-[11px] font-bold">{pro.rating || "4.5"}</span>
                    <span className="text-[11px]">⭐</span>
                </div>
                <div className="absolute bottom-2 right-2 rounded-full px-2 py-0.5" style={{ backgroundColor: "rgba(0,0,0,0.55)" }}>
                    <span className="text-white text-[10px] font-bold">{pro.user?.gender || "N/A"}</span>
                </div>
            </div>
            <div className="px-4 pt-3 pb-4">
                <p className="font-bold text-[15px] truncate mb-0.5" style={{ color: "#0d9488" }}>{name}</p>
                <p className="text-[12px] text-gray-500 flex items-center gap-1">🧳 {exp}</p>
                <p className="text-[12px] text-gray-500 mt-0.5 flex items-center gap-1">✂️ {spec}</p>
                <button
                    className="mt-3 w-full py-2 rounded-full text-[13px] font-bold border"
                    style={{ borderColor: "#0d9488", color: "#0d9488" }}
                    onClick={(e) => { e.stopPropagation(); onPress(); }}
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}

export function DesktopHomeService({ lat, lng, gender }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { independentProfessionals, homeLoading } = useSelector((state) => state.user);

    useEffect(() => {
        if (lat && lng && gender) {
            dispatch(fetchHomeIndependentProfessionals({
                lat,
                lng,
                category: gender
            }));
        }
    }, [lat, lng, gender]);

    const goToDetail = (pro) => {
        localStorage.setItem("selectedSalon", JSON.stringify(pro));
        navigate("/independentprofessionaldetailspage");
    };

    const prosToShow = independentProfessionals || [];

    if (homeLoading) {
        return (
            <div className="px-10 py-6">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-white pb-8 border-b border-gray-100">
            <div className="flex items-center justify-between px-10 lg:px-16 pt-6 pb-1">
                <div>
                    <h2 className="text-[18px] font-extrabold text-gray-900 uppercase tracking-wide">HOME SERVICEs</h2>
                    <p className="text-[12px] text-gray-400 mt-0.5">{prosToShow?.length || 0} professionals nearby</p>
                </div>
                <button
                    className="text-[14px] font-semibold py-1.5"
                    style={{ color: "#0d9488", borderColor: "#0d9488" }}
                    onClick={() => navigate("/independentprofessionaldetailspage")}
                >
                    View all
                </button>
            </div>
            <div
                className="flex gap-4 px-10 lg:px-16 pt-4 overflow-x-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {prosToShow?.map((pro) => (
                    <DesktopProCard key={pro._id} pro={pro} onPress={() => goToDetail(pro)} />
                ))}
            </div>
        </div>
    );
}

// ────────────────────────────────────────────────────────────
// 5. UNISEX SALONS
// ────────────────────────────────────────────────────────────
export function DesktopUnisexSalons({ lat, lng }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { unisexSalons = [], unisexLoading } = useSelector((state) => state.user);

    useEffect(() => {
        if (lat && lng) dispatch(fetchUnisexNearbySalons({ lat, lng }));
    }, [lat, lng]);

    const salonsToShow = useMemo(() => formatSalonData(unisexSalons), [unisexSalons]);

    if (unisexLoading) {
        return <div className="px-10 py-6"><p className="text-gray-400">Unisex Salon Loading...</p></div>;
    }

    return (
        <div className="bg-white pb-8">
            <div className="flex justify-between px-10 lg:px-16 pt-6 pb-5">
                <h2 className="text-[18px] font-extrabold">UNISEX SALONS</h2>
                <button onClick={() => navigate("/salons")}
                    className="text-[14px] font-semibold"
                    style={{ color: "#0d9488" }}>
                    View all
                </button>
            </div>

            <div className="grid grid-cols-3 gap-6 px-10 lg:px-16">
                {salonsToShow.slice(0, 3).map((salon) => (
                    <SalonCard
                        key={salon._id}
                        salon={salon}
                        category="UNISEX"
                        onClick={() => navigate(`/salon/${salon._id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
