import { useNavigate } from "react-router-dom";

function ServiceCard({
  id,
  image,
  title,
  category,
  price,
  fromHome,
  wishlist = [],
  setWishlist,
}) {
  const navigate = useNavigate();

  // =========================
  // CHECK IF SERVICE IS LIKED
  // =========================
  const isLiked = wishlist.some(
    (item) =>
      item.id === id &&
      item.type === "service"
  );

  // =========================
  // OPEN SERVICE DETAILS
  // =========================
  const openDetails = () => {
    if (fromHome) {
      navigate("/services");
    } else {
      navigate(`/service/${id}`);
    }
  };

  // =========================
  // ADD / REMOVE WISHLIST
  // =========================
  const toggleWishlist = async (e) => {
  e.stopPropagation();

  const userId = 1; // temporary for testing

  try {
    if (isLiked) {
      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            item_id: id,
            item_type: "service",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setWishlist(
        wishlist.filter(
          (item) =>
            !(item.id === id && item.type === "service")
        )
      );

      alert(`${title} removed from wishlist!`);
    } else {
      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            item_id: id,
            item_type: "service",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setWishlist([
        ...wishlist,
        {
          id,
          image,
          title,
          name: title,
          category,
          price,
          type: "service",
        },
      ]);

      alert(`${title} added to wishlist!`);
    }
  } catch (error) {
    console.error("Wishlist error:", error);
    alert("Something went wrong with wishlist.");
  }
};
  return (
    <div
      className="service-card"
      onClick={openDetails}
      style={{ cursor: "pointer" }}
    >

      {/* =========================
          IMAGE
      ========================= */}
      <div className="card-image">

        <img
          src={image}
          alt={title}
        />

        {/* =========================
            WISHLIST BUTTON
        ========================= */}
        <button
          type="button"
          className={`like-button ${
            isLiked ? "liked" : ""
          }`}
          onClick={toggleWishlist}
          aria-label={
            isLiked
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          {isLiked ? "♥" : "♡"}
        </button>

      </div>

      {/* =========================
          CARD CONTENT
      ========================= */}
      <div className="card-content">

        <p className="category">
          {category}
        </p>

        <h3>
          {title}
        </h3>

        <p className="price">
          {price}
        </p>

        {/* =========================
            ADD TO CART
        ========================= */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();

            // Add cart functionality here later
          }}
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ServiceCard;