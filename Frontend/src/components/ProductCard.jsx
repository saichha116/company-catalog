import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({
  product,
  addToCart,
  wishlist,
  setWishlist,
}) {

  // =========================
  // CHECK IF PRODUCT IS LIKED
  // =========================

  const isLiked = wishlist.some(
    (item) =>
      item.id === product.id &&
      item.type === "product"
  );


  // =========================
  // TOGGLE WISHLIST
  // =========================

  const toggleWishlist = () => {

    if (isLiked) {

      // REMOVE FROM WISHLIST

      setWishlist(
        wishlist.filter(
          (item) =>
            !(
              item.id === product.id &&
              item.type === "product"
            )
        )
      );

      alert(`${product.name} removed from wishlist!`);

    } else {

      // ADD TO WISHLIST

      setWishlist([
        ...wishlist,
        {
          ...product,
          type: "product",
        },
      ]);

      alert(`${product.name} added to wishlist!`);
    }
  };


  return (
    <div className="card">

      {/* =========================
          WISHLIST HEART
      ========================= */}

      <button
        type="button"
        className={`like-button ${
          isLiked ? "liked" : ""
        }`}
        onClick={toggleWishlist}
      >
        {isLiked ? "♥" : "♡"}
      </button>


      {/* =========================
          PRODUCT IMAGE
      ========================= */}

      <Link
        to={`/product/${product.id}`}
        className="product-card-link"
      >
        <img
          src={product.image}
          alt={product.name}
        />
      </Link>


      {/* =========================
          PRODUCT NAME
      ========================= */}

      <Link
        to={`/product/${product.id}`}
        className="product-card-link"
      >
        <h3>{product.name}</h3>
      </Link>


      {/* =========================
          PRICE
      ========================= */}

      <p className="price">
        ₹{product.price}
      </p>


      {/* =========================
          RATING
      ========================= */}

      <p className="rating">
        {product.rating}
      </p>


      {/* =========================
          ADD TO CART
      ========================= */}

      <button
        type="button"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;