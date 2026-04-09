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
  const [activeCategory, setActiveCategory] = useState(null); // e.g. "Massage", "Spa"
  const [lat, setLat] = useState(12.9716); 
  const [lng, setLng] = useState(77.5454);

  const resolveArray = (val) => {
    if (Array.isArray(val)) return val;
    if (val && typeof val === 'object') return Object.values(val).find(Array.isArray) || [];
    return [];
  };

  const displayCategories = resolveArray(categories);
  const displayFeaturedSalons = resolveArray(featuredSalons);

  useEffect(() => {
    dispatch(fetchAllFeaturedSaloons());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(fetchAllCategories(gender));
    }, 300);
    return () => clearTimeout(timeout);
  }, [gender]);

  useEffect(() => {
    if (lat && lng && gender) {
      const categoryToFetch = activeCategory || gender;
      console.log("FETCHING NEARBY:", { lat, lng, category: categoryToFetch });
      dispatch(fetchNearbySalons({
        lat,
        lng,
        category: categoryToFetch
      }));
    }
  }, [gender, activeCategory, lat, lng]);

<<<<<<< HEAD
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLng(longitude);
      },
      () => {
        setLat(12.9716);
        setLng(77.5454);
      }
    );
=======
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
>>>>>>> 950bafbb85d9aa9da4728eb94ee0fea36ea64ea1
  }, []);

  useEffect(() => { dispatch(setSelectedCategory(gender)); }, [gender, dispatch]);
  useEffect(() => { if (lat && lng) dispatch(setLocation({ lat, lng })); }, [lat, lng, dispatch]);

  const sharedProps = { 
    gender, 
    setGender, 
    activeCategory,
    setActiveCategory,
    filteredCategories: displayCategories, 
    fallbackSalons: displayFeaturedSalons, 
    lat, lng 
  };

  return isMobile
    ? <MobileHomePage {...sharedProps} />
    : <DesktopHomePage {...sharedProps} />;
};

export default HomePage;



