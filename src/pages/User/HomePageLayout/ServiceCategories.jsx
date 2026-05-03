
// import { useNavigate } from "react-router-dom";

// // Service Categories — mobile only (horizontal icon scroll)
// const ServiceCategories = ({ activeCategory, setActiveCategory }) => {
//     const navigate = useNavigate();
//     const cats = categories?.length > 0 ? categories : " ";

//     return (
//         <div className="bg-white pb-3">
//             <div className="flex items-center justify-between px-4 pb-3">
//                 <h2 className="text-[15px] font-bold text-gray-800">What do you want to get?</h2>
//                 <button
//                     className="text-[12px] font-bold"
//                     style={{ color: "#0d9488" }}
//                     onClick={() => navigate("/categories")}
//                 >
//                     View all
//                 </button>
//             </div>

//             <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
//                 {cats.map((cat) => {
//                     const isActive = activeCategory === cat.name;
//                     return (
//                         <button
//                             key={cat.id || cat._id}
//                             className="flex flex-col items-center gap-1.5 shrink-0 transition-transform active:scale-95"
//                             onClick={() => setActiveCategory(isActive ? null : cat.name)}
//                         >
//                             <div
//                                 className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? 'ring-2 ring-teal-500 ring-offset-1' : ''}`}
//                                 style={{ backgroundColor: isActive ? "#0d9488" : "#e0f7f5" }}
//                             >
//                                 <img
//                                     src={CATEGORY_ICONS[cat.name] || DEFAULT_ICON}
//                                     alt={cat.name}
//                                     className={`w-8 h-8 object-contain transition-all duration-300 ${isActive ? 'brightness-0 invert' : ''}`}
//                                 />
//                             </div>
//                             <span className={`text-[11px] font-bold transition-colors duration-300 ${isActive ? 'text-teal-700' : 'text-teal-600'}`}>{cat.name}</span>
//                         </button>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default ServiceCategories;



import { useNavigate } from "react-router-dom";

// Service Categories — mobile only (horizontal icon scroll)
const ServiceCategories = ({ categories }) => {
    const navigate = useNavigate();
    const cats = Array.isArray(categories) ? categories : [];

    return (
        <div className="bg-white pb-3">
            <div className="flex items-center justify-between px-4 pt-4 pb-3">
                <h2 className="text-[14px] font-semibold text-gray-800">What do you want to get?</h2>
                <button className="text-[13px] font-semibold" style={{ color: "#0d9488" }} onClick={() => navigate("/categories")}>
                    View all
                </button>
            </div>
            <div
                className="flex gap-4 overflow-x-auto px-4 pb-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {cats.map((cat) => (
                    <button key={cat.id || cat._id} className="flex flex-col items-center gap-1.5 shrink-0" onClick={() => navigate("/categories")}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e0f7f5" }}>
                            <img
                                src={cat.icon}
                                alt={cat.name}
                                className="w-8 h-8 object-contain"
                            />
                        </div>
                        <span className="text-[11px] text-gray-700 font-medium">{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ServiceCategories;
