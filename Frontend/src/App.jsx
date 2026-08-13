import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";

function App() {
  // Cart state
  const [cart, setCart] = useState([]);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {/* Navbar appears on every page */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cart={cart}
      />

      <Routes>

        {/* PRODUCT PAGE */}
        <Route
          path="/"
          element={
            <ProductPage
              cart={cart}
              setCart={setCart}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        />

        {/* ABOUT PAGE */}
        <Route
          path="/about"
          element={<AboutPage />}
        />

        {/* CART PAGE */}
        <Route
          path="/cart"
          element={
            <CartPage
  cart={cart}
  setCart={setCart}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>
          }
        />

      </Routes>
    </>
  );
}

export default App;