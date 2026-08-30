
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import HeroBanner from "../components/HeroBanner";
import CategoryBar from "../components/CategoryBar";
import ServiceGrid from "../components/ServiceGrid";
import "../styles/service.css";

function Services({
  searchTerm,
  wishlist,
  setWishlist,
}) {
  const [searchParams] = useSearchParams();

  const categoryFromURL = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(
    categoryFromURL || "All"
  );

  // ===============================
  // UPDATE CATEGORY FROM URL
  // ===============================

  useEffect(() => {
    setActiveCategory(categoryFromURL || "All");
  }, [categoryFromURL]);

  return (
    <>
      <HeroBanner />

      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <ServiceGrid
        activeCategory={activeCategory}
        searchTerm={searchTerm || ""}
        wishlist={wishlist}
        setWishlist={setWishlist}
      />
    </>
  );
}

export default Services;

