import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/ProductPage.css";
import HeroSection from "../components/HeroSection";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function ProductPage({
  cart,
  setCart,
  wishlist,
  setWishlist,
  searchTerm,
  setSearchTerm,
}) {
  const [searchParams] = useSearchParams();

  const categoryFromURL = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromURL || "All"
  );

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = async (product,quantity=1) => {
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
            quantity: quantity,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Cart Error:", data);
        alert(data.message || "Unable to add product to cart");
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
                  quantity: item.quantity + quantity,
                }
              : item
          )
        );
      } else {
        setCart([
          ...cart,
          {
            ...product,
            quantity: quantity,
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
  // ADD TO WISHLIST
  // =========================
  const addToWishlist = (product) => {
    // Check if product already exists
    const alreadyAdded = wishlist.some(
      (item) => item.id === product.id
    );

    if (alreadyAdded) {
      alert(`${product.name} is already in your wishlist!`);
      return;
    }

    // Add product to wishlist
    setWishlist([
      ...wishlist,
      product,
    ]);

    alert(`${product.name} added to wishlist!`);
  };

  // =========================
  // REMOVE FROM WISHLIST
  // =========================
  const removeFromWishlist = (productId) => {
    setWishlist(
      wishlist.filter(
        (item) => item.id !== productId
      )
    );
  };

  // =========================
  // FILTER PRODUCTS
  // =========================
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory ||
      product.subCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* HERO SECTION */}
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* PRODUCTS SECTION */}
      <section className="products-section">

        {/* CATEGORY FILTER */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* TITLE */}
        <h2 className="section-title">
          {selectedCategory === "All"
            ? "All Products"
            : selectedCategory}
        </h2>

        {/* PRODUCT GRID */}
        <div className="product-grid">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product) => (

           <ProductCard
  key={product.id}
  product={product}
  addToCart={addToCart}
  wishlist={wishlist}
  setWishlist={setWishlist}
/>

            ))

          ) : (

            <h3>No products found.</h3>

          )}

        </div>

      </section>
    </>
  );
}

export default ProductPage;