import React from "react";

const SalonGallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
  ];

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Salon"
          className="rounded-lg object-cover h-40 w-full"
        />
      ))}
    </div>
  );
};

export default SalonGallery;
