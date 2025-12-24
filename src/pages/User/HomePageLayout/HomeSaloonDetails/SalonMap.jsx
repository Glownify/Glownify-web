import React from "react";
import { useOutletContext } from "react-router-dom";

const SalonMap = () => {
  const { saloonDetails } = useOutletContext();

  // Ensure coordinates exist: [lat, lng]
  const coords = saloonDetails?.location?.coordinates;
  
  // Construct the Google Maps Embed URL
  // Format: https://maps.google.com/maps?q=LAT,LNG&t=&z=15&ie=UTF8&iwloc=&output=embed
  const mapUrl = coords 
    ? `https://maps.google.com/maps?q=${coords[0]},${coords[1]}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : "";

  return (
    <div className="p-4">
      <p className="font-medium text-lg">📍 Location Details</p>
      
      <div className="mt-2 text-sm text-gray-600">
        <p className="font-semibold text-gray-800">{saloonDetails.name}</p>
        <p>{saloonDetails.location?.address}</p>
        <p>{saloonDetails.location?.city}</p>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        {coords ? (
          <iframe
            title="Salon Location"
            width="100%"
            height="350"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={mapUrl}
            className="grayscale-[0.2] hover:grayscale-0 transition-all"
          ></iframe>
        ) : (
          <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
            Coordinates not available
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${coords?.[0]},${coords?.[1]}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Open in Google Maps App ↗
        </a>
      </div>
    </div>
  );
};

export default SalonMap;