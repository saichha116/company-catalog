import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import "../styles/ProductDetails.css";

function ProductDetails({
  cart,
  setCart,
  wishlist,
  setWishlist,
}) {

  const { id } = useParams();

  // =========================
  // FIND PRODUCT
  // =========================

  const product = products.find(
    (item) => item.id === Number(id)
  );


  // =========================
  // QUANTITY
  // =========================

  const [quantity, setQuantity] = useState(1);


  // =========================
  // PRODUCT NOT FOUND
  // =========================

  if (!product) {
    return (
      <div className="product-details-page">

        <h2>Product not found</h2>

        <Link to="/">
          ← Back to Products
        </Link>

      </div>
    );
  }


  // =========================
  // CHECK WISHLIST
  // =========================

  const isWishlisted = wishlist.some(
    (item) =>
      item.id === product.id &&
      item.type === "product"
  );


  // =========================
  // TOGGLE WISHLIST
  // =========================

  const toggleWishlist = () => {

    if (isWishlisted) {

      setWishlist(
        wishlist.filter(
          (item) =>
            !(
              item.id === product.id &&
              item.type === "product"
            )
        )
      );

      alert(
        `${product.name} removed from wishlist!`
      );

    } else {

      setWishlist([
        ...wishlist,
        {
          ...product,
          type: "product",
        },
      ]);

      alert(
        `${product.name} added to wishlist!`
      );
    }
  };


  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = async () => {

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

        alert(
          data.message ||
          "Unable to add product to cart"
        );

        return;
      }


      // =========================
      // UPDATE REACT CART
      // =========================

      const existingProduct = cart.find(
        (item) => item.id === product.id
      );


      if (existingProduct) {

        setCart(
          cart.map(
            (item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity:
                      item.quantity + quantity,
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


      alert(
        `${product.name} (${quantity}) added to cart!`
      );

    } catch (error) {

      console.error(
        "Add to cart error:",
        error
      );

      alert("Server is not running");
    }
  };


  return (
    <div className="product-details-page">

      <div className="product-details-container">

        {/* =========================
            MAIN CARD
        ========================= */}

        <div className="product-details-card">


          {/* =========================
              IMAGE SECTION
          ========================= */}

          <div className="product-details-image-section">

            {/* BACK BUTTON */}

            <Link
              to="/products"
              className="product-back-link"
            >
              ← Back to Products
            </Link>


            {/* IMAGE */}

            <div className="product-details-image-box">

              <img
                src={product.image}
                alt={product.name}
                className="product-details-image"
              />

            </div>

          </div>


          {/* =========================
              PRODUCT INFORMATION
          ========================= */}

          <div className="product-details-info">

            {/* CATEGORY */}

            <p className="product-details-category">
              {product.category}
            </p>


            {/* NAME */}

            <h1 className="product-details-title">
              {product.name}
            </h1>


            {/* PRICE */}

            <p className="product-details-price">
              ₹{product.price}
            </p>


            {/* DESCRIPTION */}

            <p className="product-details-description">
              {product.description ||
                `We provide high-quality ${product.name}
                products according to your requirements.
                Our products are suitable for personal
                and business requirements.`}
            </p>


            {/* =========================
                QUANTITY
            ========================= */}

            <div className="quantity-section">

              <span className="quantity-label">
                Quantity
              </span>


              <div className="quantity-controls">

                <button
                  type="button"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  disabled={quantity === 1}
                >
                  −
                </button>


                <span>
                  {quantity}
                </span>


                <button
                  type="button"
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                >
                  +
                </button>

              </div>

            </div>


            {/* =========================
                ACTION BUTTONS
            ========================= */}

            <div className="product-details-actions">

              <button
                type="button"
                className="product-add-cart-button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>


              <button
                type="button"
                className="product-wishlist-button"
                onClick={toggleWishlist}
              >
                {isWishlisted
                  ? "♥ Wishlisted"
                  : "♡ Wishlist"}
              </button>

            </div>


            {/* =========================
                PRODUCT DETAILS
            ========================= */}

            <div className="product-extra-details">

              <h3>
                Product Details
              </h3>

              <ul>

                <li>
                  Category: {product.category}
                </li>


                <li>
                  High-quality product
                </li>

                <li>
                  Suitable for personal and
                  business requirements
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;