import React,{memo,useEffect} from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

function CareerPage() {
   
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
    
  return (
    <div>
      <h1>Register With Us</h1>
      
      
        
    </div>
  )
}

export default memo(CareerPage)