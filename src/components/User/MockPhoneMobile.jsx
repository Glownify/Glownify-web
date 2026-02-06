import React from 'react'

export const MockPhoneMobile = () => {
  return (
    <div className="w-1/2 flex justify-end">
      <div className="relative w-40 h-82.5 bg-black rounded-[28px] p-2 shadow-xl">
        
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[22px] p-2 overflow-hidden">
          
          <h3 className="text-purple-700 font-semibold text-xs mb-2">
            Book a Beautician
          </h3>

          {/* CARD */}
          <div className="bg-purple-50 p-2 rounded-xl shadow-sm mb-2">
            <div className="flex items-center gap-2">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="w-7 h-7 rounded-full"
              />
              <div>
                <p className="font-semibold text-xs">Aisha</p>
                <p className="text-[10px] text-gray-500">Koregaon pk</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-1 text-[10px]">
              <div className="flex items-center gap-1">
                ⭐ <span className="font-medium">4.8</span>
              </div>
              <p className="font-semibold">₹500</p>
            </div>
          </div>

          <div className="bg-purple-50 p-2 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                className="w-7 h-7 rounded-full"
              />
              <div>
                <p className="font-semibold text-xs">Gita</p>
                <p className="text-[10px] text-gray-500">Baner</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-1 text-[10px]">
              <div className="flex items-center gap-1">
                ⭐ <span className="font-medium">4.6</span>
              </div>
              <p className="font-semibold">₹450</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MockPhoneMobile