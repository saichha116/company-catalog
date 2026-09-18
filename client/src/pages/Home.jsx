import HeroSlider from "../components/HeroSlider/HeroSlider";
import Categories from "../components/Categories/Categories";
import Services from "../components/Services/Services";
import BestSellers from "../components/BestSellers/BestSellers";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <HeroSlider />

      <Categories />

      <Services />

      <BestSellers />

      <Footer />

    </>
  );
}

export default Home;