import { useState } from "react";

import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import HeroBanner from "../components/HeroBanner";
import CategoryBar from "../components/CategoryBar";
import ServiceGrid from "../components/ServiceGrid";


function Services() {

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");


  return (
    <>

      <Navbar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>

      <Menu />

      <HeroBanner />

      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

     <ServiceGrid
  activeCategory={activeCategory}
  searchTerm={searchTerm}
/>

    </>
  );
}


export default Services;