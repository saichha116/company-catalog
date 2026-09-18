import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WishlistPage.css";

function WishlistPage() {
  const navigate = useNavigate();

  // ======================================
  // WISHLIST STATE
  // ======================================

  const [wishlist, setWishlist] = useState([]);

  // ======================================
  // REMOVE FROM WISHLIST
  // ======================================

  const removeFromWishlist = (id, type) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) =>
          !(item.id === id && item.type === type)
      )
    );
  };

  // ======================================
  // RETURN UI
  // ======================================

  return (
    <div className="wishlist-page">

      {/* HEADING */}

      <div className="wishlist-heading">
        <h1>My Wishlist</h1>
        <div className="heading-line"></div>
      </div>

      {/* EMPTY WISHLIST */}

      {wishlist.length === 0 ? (

        <div className="empty-wishlist">

          <h2>Your wishlist is empty</h2>

          <p>
            Add your favorite products and services
            to your wishlist.
          </p>

          <button
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>

          <button
            onClick={() => navigate("/services")}
          >
            Browse Services
          </button>

        </div>

      ) : (

        /* WISHLIST PRODUCTS */

        <div className="wishlist-grid">

          {wishlist.map((item) => (

            <div
              className="wishlist-card"
              key={`${item.type}-${item.id}`}
            >

              {/* IMAGE */}

              <img
                src={item.image}
                alt={item.name || item.title}
              />

              {/* TYPE */}

              <p className="wishlist-type">
                {item.type === "product"
                  ? "Product"
                  : "Service"}
              </p>

              {/* NAME */}

              <h3>
                {item.name || item.title}
              </h3>

              {/* PRICE */}

              <p className="wishlist-price">
                {item.price}
              </p>

              {/* REMOVE */}

              <button
                onClick={() =>
                  removeFromWishlist(
                    item.id,
                    item.type
                  )
                }
              >
                Remove
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default WishlistPage;