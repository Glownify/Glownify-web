import { useState } from "react";
import salonImg from "../../assets/salon.png";

function MobileSalonCard({ salon, onClick }) {
    const [fav, setFav] = useState(false);
    const img = salon.galleryImages?.[0] || salonImg;
    const distance = salon.distance ? `${salon.distance} km` : "N/A";
    const rating = salon.rating || "4.8";
    const reviews = salon.reviewCount || "200";
    const services = salon.popularServices || [];

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl overflow-hidden cursor-pointer shrink-0"
            style={{ width: 190, boxShadow: "0 2px 10px rgba(0,0,0,0.10)" }}
        >
            {/* Image section */}
            <div className="relative w-full" style={{ height: 160 }}>
                <img src={img} alt={salon.shopName} className="w-full h-full object-cover" />

                {/* Heart button — top right */}
                {/* <button
                    onClick={(e) => { e.stopPropagation(); setFav(p => !p); }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center"
                    style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.18)" }}
                >
                    <span className="text-base leading-none">{fav ? "❤️" : "🤍"}</span>
                </button> */}

                {/* Dark overlay strip at bottom of image */}
                <div
                    className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 py-1.5"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 100%)" }}
                >
                    <span className="text-white text-[11px] font-semibold flex items-center gap-1">
                        📍 {distance}
                    </span>
                    <span className="text-white text-[11px] font-semibold flex items-center gap-1">
                        ⭐ {rating} ({reviews})
                    </span>
                </div>
            </div>

            {/* Info section below image */}
            <div className="px-3 pt-2.5 pb-3">
                <p className="font-bold text-[14px] text-gray-900 leading-tight truncate">{salon.shopName}</p>
                {services.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                        {services.slice(0, 3).map((service, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center text-sm"
                            >
                                <span className="text-gray-600">{service.name}</span>
                                <span className="font-bold text-indigo-600">
                                    ₹{service.price}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MobileSalonCard;
