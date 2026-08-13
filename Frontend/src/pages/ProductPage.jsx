import { useState } from "react";

import "../styles/ProductPage.css";
import HeroSection from "../components/HeroSection";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import products from "../data/products";

function ProductPage({
  cart,
  setCart,
  searchTerm,
  setSearchTerm
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = async (product) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
            product_id: product.id,
            quantity: 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert("Unable to add product to cart");
        return;
      }

      console.log(data);

      // Update React cart
      const existingProduct = cart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          )
        );
      } else {
        setCart([
          ...cart,
          {
            ...product,
            quantity: 1,
          },
        ]);
      }

      alert(`${product.name} added to cart!`);

    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Server is not running");
    }
  };

  // =========================
  // FILTER PRODUCTS
  // =========================
  const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const stationerySubCategories = [
    "Paper",
    "Writing",
    "Computer Media",
    "Desk & Tools",
  ];

 const matchesCategory =
  selectedCategory === "All" ||
  product.category === selectedCategory ||
  product.subCategory === selectedCategory;
    (stationerySubCategories.includes(selectedCategory) &&
      product.subCategory === selectedCategory);

  return matchesSearch && matchesCategory;
});

  return (
    <>
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <section className="products-section">

        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <h2 className="section-title">
          {selectedCategory === "All"
            ? "All Products"
            : selectedCategory}
        </h2>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))
          ) : (
            <h3>No products found.</h3>
          )}
        </div>

      </section>

      <Footer />
    </>
  );
}

export default ProductPage;