import { useState } from "react";
import "../styles/ProductCard.css";

function ProductCard({ product, addToCart }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card">

      <button
        className={`like-button ${liked ? "liked" : ""}`}
        onClick={() => setLiked(!liked)}
      >
        {liked ? "♥" : "♡"}
      </button>

      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p className="price">₹{product.price}</p>

      <p className="rating">{product.rating}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;