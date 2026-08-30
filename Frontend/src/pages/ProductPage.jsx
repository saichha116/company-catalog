
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import HeroSection from "../components/HeroSection";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";

import "../styles/ProductPage.css";

function ProductPage({
  cart,
  setCart,
  wishlist,
  setWishlist,
}) {
  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl || "All"
  );

  // ===============================
  // UPDATE CATEGORY FROM URL
  // ===============================

  useEffect(() => {
    setSelectedCategory(categoryFromUrl || "All");
  }, [categoryFromUrl]);


  // ===============================
  // GET PRODUCTS FROM DATABASE
  // ===============================

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        console.log("Products:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Product fetch error:", err);
      });
  }, []);


  // ===============================
  // FILTER PRODUCTS
  // ===============================

  const filteredProducts = products.filter((product) => {
    const productName = product.product_name || "";

    const matchesSearch = productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category_name === selectedCategory ||
      product.subcategory_name === selectedCategory;

    return matchesSearch && matchesCategory;
  });


  // ===============================
  // ADD TO CART
  // ===============================

  const addToCart = (product) => {
    setCart([
      ...cart,
      product,
    ]);

    alert(`${product.product_name} added to cart!`);
  };


  return (
    <div className="product-page">

      <div className="page-container">

        {/* ===============================
            HERO
        =============================== */}

        <HeroSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />


        {/* ===============================
            PRODUCTS
        =============================== */}

        <section className="products-section">


          {/* ===============================
              CATEGORY FILTER
          =============================== */}

          <div className="category-filter-wrapper">

            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

          </div>


          {/* ===============================
              SELECTED CATEGORY
          =============================== */}

          <div className="selected-category-heading">

            <h2>
              {selectedCategory === "All"
                ? "All Products"
                : selectedCategory}
            </h2>

          </div>


          {/* ===============================
              PRODUCT GRID
          =============================== */}

          <div className="product-grid">

            {filteredProducts.length > 0 ? (

              filteredProducts.map((product) => (

                <ProductCard
                  key={product.product_id}
                  product={product}
                  addToCart={addToCart}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />

              ))

            ) : (

              <div className="no-products">

                <h3>
                  No products found.
                </h3>

              </div>

            )}

          </div>

        </section>

      </div>

    </div>
  );
}

export default ProductPage;

