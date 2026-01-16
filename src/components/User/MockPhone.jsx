import { Star } from "lucide-react";

export const PhoneMockup = () => (
  <div className="w-64 h-125 bg-slate-900 rounded-[3rem] p-3 shadow-2xl relative border-[6px] border-slate-800">
    <div className="w-24 h-6 bg-slate-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl z-20"></div>
    <div className="bg-white w-full h-full rounded-[2.2rem] overflow-hidden flex flex-col">
      <div className="p-5 border-b border-slate-50">
        <p className="text-[10px] font-black uppercase text-rose-500 tracking-widest">Trending Now</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {[
          { name: "Glow Up Studio", rate: "4.9", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400" },
          { name: "Stylista Salon", rate: "4.8", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-slate-50 bg-white shadow-sm">
            <img src={s.img} alt={s.name} className="h-24 w-full object-cover" />
            <div className="p-3">
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-slate-800 text-[10px]">{s.name}</h5>
                <div className="flex items-center gap-0.5 text-rose-500 text-[10px] font-bold">
                  <Star size={10} fill="currentColor" /> {s.rate}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);