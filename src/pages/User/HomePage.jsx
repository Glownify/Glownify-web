import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFeaturedSaloons } from "../../redux/slice/userSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Hero from "./HomePageLayout/Hero";
import { fetchAllCategories } from "../../redux/slice/userSlice";
import Categories from "./HomePageLayout/Categories";
import Services from "./HomePageLayout/Services";
import Services2 from "./HomePageLayout/Services2";
import Saloons from "./HomePageLayout/Saloons";
import { GenderSwitch } from "./HomePageLayout/GenderSwitch";
import TopRatedSaloons from "./HomePageLayout/TopRatedSaloons";

const HomePage = () => {
  const dispatch = useDispatch();
  const { salons, loading } = useSelector((state) => state.user);
  const { categories} = useSelector((state) => state.user);
  const [gender, setGender] = useState('women');

  const filteredCategories = categories?.filter(
    (cat) => cat.gender === gender || cat.gender === 'unisex'
  );

  const filteredSalons = salons?.filter(
    (salon) => salon.gender === gender || salon.gender === 'unisex'
  );


  useEffect(() => {
    dispatch(fetchAllFeaturedSaloons());
    dispatch(fetchAllCategories());
  }, [dispatch, gender]);

  console.log("Filtered Salons:", salons);
  console.log("Filtered Categories:", filteredCategories);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFF7F1] to-[#FFEDE2] pb-20">
      {/* Header */}
      <Hero />
      <Services />
      <Services2 />
      <GenderSwitch gender={gender} setGender={setGender} />
      <Categories categories={filteredCategories} gender={gender} />
      <Saloons salons={salons} gender={gender} loading={loading} />
      <TopRatedSaloons salons={salons} categories={categories}/>
    </div>
  );
};

export default HomePage;
