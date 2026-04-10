import { useState } from "react";
import salonImg from "../../assets/salon.png";

function SalonCard({ salon, onClick }) {
    const [fav, setFav] = useState(false);

    const img = salon.galleryImages?.[0] || salonImg;
    const services = salon.popularServices || [];

    return (
        <div onClick={onClick}
            className="bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>

            <div className="relative h-52 overflow-hidden">
                <img src={img} alt={salon.shopName}
                    className="w-full sm:h-full h-[163px] object-cover hover:scale-105 transition-transform duration-500" />

                {/* <button
                    onClick={(e) => { e.stopPropagation(); setFav(p => !p); }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md"
                >
                    {fav ? "❤️" : "🤍"}
                </button> */}

                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-3 py-2"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.70), transparent)" }}>

                    <span className="text-white text-xs font-semibold">
                        📍 {salon.distance
                            ? `${salon.distance} km`
                            : salon.distanceInMeters
                                ? `${(salon.distanceInMeters / 1000).toFixed(1)} km`
                                : "N/A"}
                    </span>

                    <span className="text-white text-xs font-semibold">
                        ⭐ {salon.rating || "4.8"} ({salon.reviewCount || "200"})
                    </span>
                </div>
            </div>

            <div className="px-5 pt-4 pb-5">
                <h3 className="font-bold text-gray-900 text-base truncate mb-2">
                    {salon.shopName}
                </h3>

                {/* SERVICES WITH PRICE */}
                {services.length > 0 && (
                    <div className="space-y-1.5">
                        {services.slice(0, 3).map((service, i) => (
                            <div key={i} className="flex justify-between text-sm">
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

export default SalonCard;