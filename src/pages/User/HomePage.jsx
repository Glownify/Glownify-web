import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFeaturedSaloons, fetchAllCategories, setSelectedCategory, setLocation, fetchNearbySalons } from "../../redux/slice/userSlice";
import toast from "react-hot-toast";
import useMobile from "../../hooks/useMobile";
import MobileHomePage from "./Mobile/MobileHomePage";
import DesktopHomePage from "./Desktop/DesktopHomePage";
import { getUserLocation } from "../../utils/getUserLocation";

/**
 * HomePage — thin dispatcher
 * ─────────────────────────────────────────────────────────────
 * Handles ALL data fetching (Redux, geolocation) in one place,
 * then renders either MobileHomePage or DesktopHomePage.
 *
 * ✅ Edit mobile UI  →  src/pages/User/Mobile/MobileHomePage.jsx
 * ✅ Edit desktop UI →  src/pages/User/Desktop/DesktopHomePage.jsx
 */
const HomePage = () => {
  const isMobile = useMobile();
  const dispatch = useDispatch();
  const { featuredSalons, categories } = useSelector((state) => state.user);
  const [gender, setGender] = useState("women");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // ── Derived data (computed once, passed to both layouts) ──
  const filteredCategories = categories?.filter(
    (cat) => cat.gender === gender || cat.gender === "unisex"
  );
  const filteredFeaturedSalons = featuredSalons?.filter(
    (salon) => salon.gender === gender || salon.gender === "unisex"
  );

  useEffect(() => {
    dispatch(fetchAllFeaturedSaloons());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(fetchAllCategories(gender));
    }, 300); // debounce
    return () => clearTimeout(timeout);
  }, [gender]);

  useEffect(() => {
    if (lat && lng && gender) {
      console.log("CALLING API:", { lat, lng, gender });

      dispatch(fetchNearbySalons({
        lat,
        lng,
        category: gender   // ✅ this is correct if gender = men/women
      }));
    }
  }, [gender, lat, lng]);

  // ── Geolocation ──
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       const { latitude, longitude } = pos.coords;
  //       setLat(latitude);
  //       setLng(longitude);
  //     },
  //     () => {
  //       // ✅ fallback location (important)
  //       setLat(12.9716);
  //       setLng(77.5454);
  //     }
  //   );
  // }, []);
  useEffect(() => {
    const loadLocation = async () => {
      const { lat, lng } = await getUserLocation();

      setLat(lat);
      setLng(lng);

      dispatch(setLocation({ lat, lng }));
    };

    loadLocation();
  }, []);

  // ── Sync gender → Redux selectedCategory ──
  useEffect(() => { dispatch(setSelectedCategory(gender)); }, [gender, dispatch]);

  // ── Sync lat/lng → Redux ──
  useEffect(() => { if (lat && lng) dispatch(setLocation({ lat, lng })); }, [lat, lng, dispatch]);

  // ── Shared props passed to both layouts ──
  const sharedProps = { gender, setGender, filteredCategories, lat, lng };

  return isMobile
    ? <MobileHomePage {...sharedProps} />
    : <DesktopHomePage {...sharedProps} />;
};

export default HomePage;



