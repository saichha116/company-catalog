import { useState } from "react";
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// =========================
// MAIN WEBSITE
// =========================

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

// =========================
// ADMIN
// =========================

import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import Categories from "./admin/Categories";
import Products from "./admin/Products";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import EditCategory from "./admin/EditCategory";
import AddCategory from "./admin/AddCategory";


function App() {

  // =========================
  // SEARCH
  // =========================

  const [searchTerm, setSearchTerm] = useState("");


  // =========================
  // CART
  // =========================

  const [cart, setCart] = useState([]);


  // =========================
  // WISHLIST
  // =========================

  const [wishlist, setWishlist] = useState([]);


  return (

    <BrowserRouter>

      <Routes>

        {/* =================================================
            MAIN WEBSITE
        ================================================= */}

        <Route
          path="/"
          element={
            <>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <Home
                wishlist={wishlist}
                setWishlist={setWishlist}
              />

              <Footer />
            </>
          }
        />


        {/* ABOUT */}

        <Route
          path="/about"
          element={
            <>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <AboutPage />

              <Footer />
            </>
          }
        />


        {/* CONTACT */}

        <Route
          path="/contact"
          element={
            <>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <Contact />

              <Footer />
            </>
          }
        />


        {/* =================================================
            SERVICES
        ================================================= */}

        <Route
          path="/services"
          element={
            <>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <Services
                searchTerm={searchTerm}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />

              <Footer />
            </>
          }
        />


        {/* SERVICE DETAILS */}

        <Route
          path="/service/:id"
          element={
            <>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <ServiceDetails
                wishlist={wishlist}
                setWishlist={setWishlist}
              />

              <Footer />
            </>
          }
        />


        {/* =================================================
            PRODUCTS
        ================================================= */}

        <Route
          path="/products"
          element={
            <>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <ProductPage
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <Footer />
            </>
          }
        />


        {/* PRODUCT DETAILS */}

        <Route
          path="/product/:id"
          element={
            <>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <ProductDetails
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />

              <Footer />
            </>
          }
        />


        {/* =================================================
            CART
        ================================================= */}

        <Route
          path="/cart"
          element={
            <>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <CartPage
                cart={cart}
                setCart={setCart}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <Footer />
            </>
          }
        />


        {/* CHECKOUT */}

        <Route
          path="/checkout"
          element={
            <>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <CheckoutPage
                cart={cart}
              />

              <Footer />
            </>
          }
        />


        {/* WISHLIST */}

        <Route
          path="/wishlist"
          element={
            <>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <WishlistPage
                wishlist={wishlist}
                setWishlist={setWishlist}
              />

              <Footer />
            </>
          }
        />


        {/* =================================================
            ADMIN
        ================================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />


        <Route
          path="/admin/products"
          element={<Products />}
        />


        <Route
          path="/admin/categories"
          element={<Categories />}
        />


        <Route
          path="/admin/add-product"
          element={<AddProduct />}
        />


        <Route
          path="/admin/edit-product/:id"
          element={<EditProduct />}
        />


        <Route
          path="/admin/add-category"
          element={<AddCategory />}
        />


        <Route
          path="/admin/edit-category/:id"
          element={<EditCategory />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;