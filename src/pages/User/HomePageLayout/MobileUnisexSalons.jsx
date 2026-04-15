import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnisexNearbySalons } from "../../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { formatSalonData } from "../../../utils/formatSalonData";
import MobileSalonCard from "../../Common/MobileSalonCard";


const MobileUnisexSalons = ({ lat, lng }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { unisexSalons = [], unisexLoading } = useSelector((state) => state.user);


    useEffect(() => {
        if (lat && lng) {
            dispatch(fetchUnisexNearbySalons({ lat, lng }));
        }
    }, [lat, lng]);

    const salonsToShow = formatSalonData(unisexSalons || []);

    if (unisexLoading) {
        return (
            <div className="px-4 py-5">
                <p className="text-gray-400 text-sm">Loading Unisex Salons...</p>
            </div>
        );
    }

    // ✅ empty state
    if (!salonsToShow || !salonsToShow.length) {
        return (
            <div className="px-4 py-5">
                <p className="text-gray-400 text-sm">No Unisex Salons found</p>
            </div>
        );
    }

    return (
        <div className="bg-white pb-5">
            {/* Section header */}
            <div className="flex items-center justify-between px-4 pt-5 pb-3">
                <h2 className="text-[15px] font-extrabold text-gray-900 uppercase tracking-wide">Unisex Salons</h2>
                <button
                    onClick={() => navigate("/salons")}
                    className="text-[13px] font-semibold"
                    style={{ color: "#0d9488" }}
                >
                    View all
                </button>
            </div>

            {/* Horizontal scroll */}
            <div
                className="flex gap-3 px-4 overflow-x-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {salonsToShow.map((salon) => (
                    <MobileSalonCard
                        key={salon._id}
                        salon={salon}
                        onClick={() => navigate(`/salon/${salon._id}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MobileUnisexSalons;
