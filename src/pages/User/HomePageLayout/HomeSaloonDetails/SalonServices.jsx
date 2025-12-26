import React from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const SalonServices = () => {
  const { saloonDetails } = useOutletContext();

  const services = saloonDetails?.serviceCategories || [];


  return (
  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {services.map((service, index) => (
      <div
        key={index}
        className="flex justify-between items-center border p-3 rounded-lg shadow-sm"
      >
        <h4 className="font-medium text-sm">{service.name}</h4>
      </div>
    ))}
  </div>
);
};

export default SalonServices;
