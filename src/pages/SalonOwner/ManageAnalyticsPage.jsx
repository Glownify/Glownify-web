import React, { useState, useEffect } from 'react';
import MobileSalonReportScreen from './Mobile/MobileSalonReportScreen';

const ManageAnalyticsPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileSalonReportScreen />;
  }

  return (
    <div>ManageAnalyticsPage (Desktop)</div>
  );
};

export default ManageAnalyticsPage;