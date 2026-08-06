import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import HeroSlider from "./components/HeroSlider/HeroSlider";
import Categories from "./components/Categories/Categories";
import Services from "./components/Services/Services";
import BestSellers from "./components/BestSellers/BestSellers";

function App() {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <Categories />
      <Services />
      <BestSellers />
    </>
  );
}

export default App;