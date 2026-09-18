import HeroSlider from "../components/HeroSlider/HeroSlider";
import Categories from "../components/Categories/Categories";
import Services from "../components/Services/Services";
import BestSellers from "../components/BestSellers/BestSellers";

function Home() {
  return (
    <>
      <HeroSlider />

      <Categories />

      <Services />

      <BestSellers />
    </>
  );
}

export default Home;