import { useState } from "react";

import HeroBanner from "../components/HeroBanner";
import CategoryBar from "../components/CategoryBar";
import ServiceGrid from "../components/ServiceGrid";

import "../components/Services/Services.css";

function Services({
  searchTerm = "",
  wishlist,
  setWishlist,
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <HeroBanner />

      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <ServiceGrid
        activeCategory={activeCategory}
        searchTerm={searchTerm}
        wishlist={wishlist}
        setWishlist={setWishlist}
      />
    </>
  );
}

export default Services;