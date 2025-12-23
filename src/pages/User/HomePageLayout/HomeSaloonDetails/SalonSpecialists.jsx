import React from "react";

const SalonSpecialists = () => {
  const specialists = [
    { name: "Amit", role: "Hair Stylist" },
    { name: "Pooja", role: "Makeup Artist" },
  ];

  return (
    <div className="p-4 grid sm:grid-cols-2 gap-4">
      {specialists.map((person, index) => (
        <div
          key={index}
          className="border p-3 rounded-lg text-center"
        >
          <div className="h-20 w-20 mx-auto bg-gray-200 rounded-full mb-2" />
          <h4 className="font-medium">{person.name}</h4>
          <p className="text-sm text-gray-600">{person.role}</p>
        </div>
      ))}
    </div>
  );
};

export default SalonSpecialists;
