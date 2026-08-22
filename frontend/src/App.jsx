import { useState } from "react";
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Contact from "./components/Contact";
import ProductPage from "./pages/ProductPage";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetails from "./pages/ProductDetails";
function App() {

  // =========================
  // SEARCH
  // =========================
  const [searchTerm, setSearchTerm] = useState("");

  // =========================
  // CART
  // =========================
  const [cart, setCart] = useState([]);

  //wishlist
  const [wishlist, setWishlist] = useState([]);


  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* PAGES */}
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home
            wishlist={wishlist}
            setWishlist={setWishlist}
          />}
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<AboutPage />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
  path="/service/:id"
  element={
    <ServiceDetails
      wishlist={wishlist}
      setWishlist={setWishlist}
    />
  }
/>
        {/* PRODUCTS */}
        <Route
        path="/products"
        element={
      <ProductPage
      cart={cart}
      setCart={setCart}
      wishlist={wishlist}
      setWishlist={setWishlist}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  }
/>
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
<Route
  path="/checkout"
  element={
    <CheckoutPage
      cart={cart}
    />
  }
/>
<Route
  path="/product/:id"
  element={
    <ProductDetails
      cart={cart}
      setCart={setCart}
      wishlist={wishlist}
      setWishlist={setWishlist}
    />
  }
/>
<Route
  path="/services"
  element={
    <Services
      searchTerm={searchTerm}
      wishlist={wishlist}
      setWishlist={setWishlist}
    />
  }
/>
<Route
  path="/wishlist"
  element={
    <WishlistPage
      wishlist={wishlist}
      setWishlist={setWishlist}
    />
  }
/>
      </Routes>

      {/* STATIC FOOTER */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;