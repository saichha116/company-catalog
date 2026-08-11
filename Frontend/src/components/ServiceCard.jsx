import { useState } from "react";

function ServiceCard({
  image,
  title,
  category,
  price,
  rating,
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="service-card">

      {/* IMAGE */}
      <div className="card-image">

        <img
          src={image}
          alt={title}
        />

        {/* POPULAR BADGE */}
        <span className="badge">
          Popular
        </span>

        {/* LIKE BUTTON */}
        <button
          type="button"
          className={`like-button ${liked ? "liked" : ""}`}
          onClick={() => setLiked(!liked)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          {liked ? "♥" : "♡"}
        </button>

      </div>


      {/* CARD CONTENT */}
      <div className="card-content">

        <p className="category">
          {category}
        </p>

        <h3>
          {title}
        </h3>

        <div className="rating">
          ⭐⭐⭐⭐⭐

          <span>
            {rating}
          </span>
        </div>

        <p className="price">
          {price}
        </p>

        <button type="button">
          View Details
        </button>

      </div>

    </div>
  );
}

export default ServiceCard;