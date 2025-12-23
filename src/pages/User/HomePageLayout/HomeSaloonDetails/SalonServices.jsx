import React from "react";
import { useOutletContext } from "react-router-dom";

const SalonServices = () => {
  const { saloonDetails } = useOutletContext();

  // Dummy services
  const services = [
    { name: "Hair Cut", price: 299, duration: "30 mins" },
    { name: "Hair Spa", price: 999, duration: "60 mins" },
    { name: "Facial", price: 799, duration: "45 mins" },
  ];

  return (
    <div className="p-4 space-y-4">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex justify-between items-center border p-3 rounded-lg"
        >
          <div>
            <h4 className="font-medium">{service.name}</h4>
            <p className="text-sm text-gray-500">{service.duration}</p>
          </div>
          <span className="font-semibold">₹{service.price}</span>
        </div>
      ))}
    </div>
  );
};

export default SalonServices;
