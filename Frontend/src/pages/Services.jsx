import { useState } from "react";

import HeroBanner from "../components/HeroBanner";
import CategoryBar from "../components/CategoryBar";
import ServiceGrid from "../components/ServiceGrid";

function Services({ searchTerm }) {
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
      />
    </>
  );
}

export default Services;