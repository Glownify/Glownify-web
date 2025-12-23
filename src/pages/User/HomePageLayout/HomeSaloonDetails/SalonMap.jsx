import React from "react";
import { useOutletContext } from "react-router-dom";

const SalonMap = () => {
  const { saloonDetails } = useOutletContext();

  return (
    <div className="p-4">
      <p className="font-medium">📍 Address</p>
      <p className="text-sm text-gray-600">
        {saloonDetails.location?.address},{" "}
        {saloonDetails.location?.city}
      </p>

      <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
        Map Placeholder
      </div>
    </div>
  );
};

export default SalonMap;
