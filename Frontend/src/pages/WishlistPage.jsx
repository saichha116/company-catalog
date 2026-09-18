import { useNavigate } from "react-router-dom";
import "../styles/WishlistPage.css";

function WishlistPage({ wishlist, setWishlist }) {
  const navigate = useNavigate();

  const removeFromWishlist = (id, type) => {
    setWishlist(
      wishlist.filter(
        (item) => !(item.id === id && item.type === type)
      )
    );
  };

  return (
    <div className="wishlist-page">

      <div className="wishlist-heading">
        <h1>My Wishlist</h1>
        <div className="heading-line"></div>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <h2>Your wishlist is empty</h2>

          <p>
            Add your favorite products and services to your wishlist.
          </p>

          <button onClick={() => navigate("/products")}>
            Browse Products
          </button>

          <button onClick={() => navigate("/services")}>
            Browse Services
          </button>
        </div>
      ) : (

        <div className="wishlist-grid">

          {wishlist.map((item) => (

            <div
              className="wishlist-card"
              key={`${item.type}-${item.id}`}
            >

              <img
                src={item.image}
                alt={item.name || item.title}
              />

              <p className="wishlist-type">
                {item.type === "product"
                  ? "Product"
                  : "Service"}
              </p>

              <h3>
                {item.name || item.title}
              </h3>

              <p className="wishlist-price">
                {item.price}
              </p>

              <button
                onClick={() =>
                  removeFromWishlist(item.id, item.type)
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