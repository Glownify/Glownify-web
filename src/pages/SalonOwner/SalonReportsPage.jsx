import React, { useState, useEffect } from "react";
import MobileSalonReportScreen from "./Mobile/MobileSalonReportScreen";

const SalonReportsPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileSalonReportScreen />;
  }

  // Placeholder for desktop version
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Salon Reports (Desktop Placeholder)</h1>
      <p className="mt-4 text-gray-600">Please switch to a mobile resolution to view the newly implemented Salon Reports screen.</p>
    </div>
  );
};

export default SalonReportsPage;
