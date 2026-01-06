import React from "react";
import { useOutletContext } from "react-router-dom";

const SalonSpecialists = () => {
  const { saloonDetails } = useOutletContext();

  const specialists = saloonDetails?.specialistsData || [];

  return (
    <div className="p-4 grid sm:grid-cols-2 gap-4">
      {specialists.map((person) => (
        <div
          key={person._id}
          className="border p-4 rounded-xl shadow-sm bg-white"
        >
          {/* Image */}
          <div className="flex justify-center mb-3">
            {person.image ? (
              <img
                src={person.image}
                alt="Specialist"
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}
          </div>

          {/* Experience */}
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Experience:</span>{" "}
            {person.experienceYears} years
          </p>

          {/* Certifications */}
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-semibold">Certifications:</span>{" "}
            {person.certifications?.length
              ? person.certifications.join(", ")
              : "None"}
          </p>

          {/* Expertise */}
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-semibold">Expertise:</span>{" "}
            {person.expertise?.length
              ? person.expertise.join(", ")
              : "Not specified"}
          </p>

          {/* Availability */}
          <div className="mt-2">
            <p className="font-semibold text-sm text-gray-800">
              Availability:
            </p>
            {person.availability?.length ? (
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {person.availability.map((slot, index) => (
                  <li key={index}>
                    {slot.day} — {slot.start} to {slot.end}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Not available</p>
            )}
          </div>

          {/* Meta Info */}
          <div className="mt-3 text-xs text-gray-400">
            <p>Created: {new Date(person.createdAt).toLocaleDateString()}</p>
            <p>Updated: {new Date(person.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalonSpecialists;
