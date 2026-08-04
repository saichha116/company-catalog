import { useState } from "react";

import "../styles/ProductPage.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import products from "../data/products";

function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="product-page">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="page-container">
        <HeroSection />

        <section className="products-section">
          <h2 className="section-title">Office Stationery</h2>

          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <h3>No products found.</h3>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default ProductPage;