import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import services from "../data/services";
import "../styles/service-details.css";

function ServiceDetails({
  wishlist,
  setWishlist,
}) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const service = services.find(
    (item) => item.id === Number(id)
  );

  if (!service) {
    return (
      <div className="details-page">
        <div className="details-container">

          <h2>Service not found</h2>

          <Link
            to="/services"
            className="back-link"
          >
            ← Back to Services
          </Link>

        </div>
      </div>
    );
  }

  // =========================
  // CHECK WISHLIST
  // =========================

  const isWishlisted = wishlist.some(
    (item) =>
      item.id === service.id &&
      item.type === "service"
  );

  // =========================
  // WISHLIST FUNCTION
  // =========================

  const toggleWishlist = () => {

    if (isWishlisted) {

      // REMOVE FROM WISHLIST

      setWishlist(
        wishlist.filter(
          (item) =>
            !(
              item.id === service.id &&
              item.type === "service"
            )
        )
      );

      alert(
        `${service.title} removed from wishlist!`
      );

    } else {

      // ADD TO WISHLIST

      setWishlist([
        ...wishlist,
        {
          id: service.id,
          image: service.image,
          title: service.title,
          name: service.title,
          category: service.category,
          price: service.price,
          type: "service",
        },
      ]);

      alert(
        `${service.title} added to wishlist!`
      );
    }
  };

  return (
    <div className="details-page">

      <div className="details-container">

        {/* =========================
            DETAILS CARD
        ========================= */}

        <div className="details-card">

          {/* =========================
              IMAGE SECTION
          ========================= */}

          <div className="details-image-section">

            {/* BACK BUTTON */}
            <Link
              to="/services"
              className="back-link"
            >
              ← Back to Services
            </Link>

            {/* IMAGE */}

            <div className="details-image-box">

              <img
                src={service.image}
                alt={service.title}
                className="details-image"
              />

            </div>

          </div>


          {/* =========================
              SERVICE INFORMATION
          ========================= */}

          <div className="details-info">

            {/* CATEGORY */}

            <p className="details-category">
              {service.category}
            </p>


            {/* TITLE */}

            <h1 className="details-title">
              {service.title}
            </h1>


            {/* PRICE */}

            <p className="details-price">
              {service.price}
            </p>


            {/* DESCRIPTION */}

            <p className="details-description">
              We provide high-quality{" "}
              {service.title.toLowerCase()} services
              according to your requirements. Our
              team provides reliable and professional
              solutions for your printing, branding
              and fabrication needs.
            </p>


            {/* =========================
                QUANTITY
            ========================= */}

            <div className="quantity-section">

              <span className="quantity-label">
                Quantity
              </span>

              <div className="quantity-controls">

                <button type="button"
                  onClick={()=>{
                    if(quantity >1){
                      setQuantity(quantity - 1);
                    }
                  }}
                  disabled={quantity === 1}
                  >
                  -
                </button>

                <span>
                  {quantity}
                </span>

                <button type="button"
                onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>

              </div>

            </div>


            {/* =========================
                ACTION BUTTONS
            ========================= */}

            <div className="details-actions">

              <button
                type="button"
                className="checkout-button"
              >
                Add to Cart
              </button>

              <button
                type="button"
                className="wishlist-button"
                onClick={toggleWishlist}
              >
                {isWishlisted
                  ? "♥ Wishlisted"
                  : "♡ Wishlist"}
              </button>

            </div>


            {/* =========================
                SERVICE DETAILS
            ========================= */}

            <div className="product-details">

              <h3>
                Service Details
              </h3>

              <ul>

                <li>
                  Category: {service.category}
                </li>

                <li>
                  Professional quality service
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

export default ServiceDetails;