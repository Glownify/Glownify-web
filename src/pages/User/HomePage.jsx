import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFeaturedSaloons } from "../../redux/slice/userSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Hero from "./HomePageLayout/Hero";
import { fetchAllCategories } from "../../redux/slice/userSlice";
import Categories from "./HomePageLayout/Categories";
import Services from "./HomePageLayout/Services";
import ServicesBanner from "./HomePageLayout/ServicesBanner";
import { GenderSwitch } from "./HomePageLayout/GenderSwitch";
import TopRatedSaloons from "./HomePageLayout/TopRatedSaloons";
import HomeSaloons from "./HomePageLayout/HomeSaloons";

const HomePage = () => {
  const dispatch = useDispatch();
  const { salons, categories, loading } = useSelector((state) => state.user);
  const [gender, setGender] = useState('women');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const filteredCategories = categories?.filter(
    (cat) => cat.gender === gender || cat.gender === 'unisex'
  );

  const filteredSalons = salons?.filter(
    (salon) => salon.gender === gender || salon.gender === 'unisex'
  );


  useEffect(() => {
    dispatch(fetchAllFeaturedSaloons());
    dispatch(fetchAllCategories());
  }, [dispatch]);


  useEffect(() => {
  navigator.geolocation.getCurrentPosition(
  (position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
    console.log("User's location:", position.coords);
  },
  (error) => console.error("Error code:", error.code),
  { enableHighAccuracy: true, timeout: 15000 }
);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFF7F1] to-[#FFEDE2] pb-20">
      {/* Header */}
      <Hero />
      <Services />
      <ServicesBanner />
      <GenderSwitch gender={gender} setGender={setGender} />
      <Categories categories={filteredCategories} gender={gender} />
      <HomeSaloons category={gender} lat={lat} lng={lng} />
      <TopRatedSaloons salons={salons} categories={categories}/>
    </div>
  );
};

export default HomePage;
