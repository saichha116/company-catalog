import HeroSlider from "../components/HeroSlider/HeroSlider";
import Categories from "../components/Categories/Categories";
import ServiceGrid from "../components/ServiceGrid";
import BestSellers from "../components/BestSellers/BestSellers";

function Home({ wishlist, setWishlist }) {
  return (
    <>
      <HeroSlider />

      <Categories />

      {/* SERVICES PREVIEW */}
      <ServiceGrid
        activeCategory="All"
        searchTerm=""
        limit={4}
        fromHome={true}
        wishlist={wishlist}
        setWishlist={setWishlist}
      />

      <BestSellers />
    </>
  );
}

export default Home;