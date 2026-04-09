import React from "react";
import { useNavigate } from "react-router-dom";

// Category icon imports from assets/categoryIcons
import haircutIcon from "../../../assets/categoryIcons/haircut.svg";
import facialIcon from "../../../assets/categoryIcons/facial.svg";
import makeupIcon from "../../../assets/categoryIcons/makeup.svg";
import nailsIcon from "../../../assets/categoryIcons/nails.svg";
import waxingIcon from "../../../assets/categoryIcons/waxing.svg";
import spaIcon from "../../../assets/categoryIcons/spa.svg";
import coloringIcon from "../../../assets/categoryIcons/coloring.svg";
import massageIcon from "../../../assets/categoryIcons/massage.svg";
import skinIcon from "../../../assets/categoryIcons/skin.svg";


// Map category names to local SVG icons
const CATEGORY_ICONS = {
    coloring: coloringIcon,
    massage: massageIcon,
    spa: spaIcon,
    waxing: waxingIcon,
    nails: nailsIcon,
    makeup: makeupIcon,
    facial: facialIcon,
    skin: skinIcon,
    hair: haircutIcon,
    // legacy mappings for safety
    Hairs: haircutIcon,
    Haircut: haircutIcon,
    Spa: spaIcon,
    Nails: nailsIcon,
    Coloring: coloringIcon,
    Wax: waxingIcon,
    Waxing: waxingIcon,
    Makeup: makeupIcon,
    "Make Up": makeupIcon,
    Facial: facialIcon,
    Massage: massageIcon,
    Skin: skinIcon,
};



const DEFAULT_ICON = haircutIcon; // fallback icon

const DEFAULT_CATEGORIES = [
    { id: 1, name: "coloring" },
    { id: 2, name: "massage" },
    { id: 3, name: "spa" },
    { id: 4, name: "waxing" },
    { id: 5, name: "nails" },
    { id: 6, name: "makeup" },
    { id: 7, name: "facial" },
    { id: 8, name: "skin" },
    { id: 9, name: "hair" },
];


// Service Categories — mobile only (horizontal icon scroll)
const ServiceCategories = ({ activeCategory, setActiveCategory }) => {
    const navigate = useNavigate();
    const cats = DEFAULT_CATEGORIES;

    return (
        <div className="bg-white pb-3">
            <div className="flex items-center justify-between px-4 pb-3">
                <h2 className="text-[15px] font-bold text-gray-800">What do you want to get?</h2>
                <button 
                    className="text-[12px] font-bold" 
                    style={{ color: "#0d9488" }} 
                    onClick={() => navigate("/categories")}
                >
                    View all
                </button>
            </div>

            <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {cats.map((cat) => {
                    const isActive = activeCategory === cat.name;
                    return (
                        <button 
                            key={cat.id || cat._id} 
                            className="flex flex-col items-center gap-1.5 shrink-0 transition-transform active:scale-95" 
                            onClick={() => setActiveCategory(isActive ? null : cat.name)}
                        >
                            <div 
                                className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? 'ring-2 ring-teal-500 ring-offset-1' : ''}`} 
                                style={{ backgroundColor: isActive ? "#0d9488" : "#e0f7f5" }}
                            >
                                <img
                                    src={CATEGORY_ICONS[cat.name] || DEFAULT_ICON}
                                    alt={cat.name}
                                    className={`w-8 h-8 object-contain transition-all duration-300 ${isActive ? 'brightness-0 invert' : ''}`}
                                />
                            </div>
                            <span className={`text-[11px] font-bold transition-colors duration-300 ${isActive ? 'text-teal-700' : 'text-teal-600'}`}>{cat.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ServiceCategories;
