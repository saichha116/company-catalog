import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

function CartPage() {
  const navigate = useNavigate();

  // ======================================
  // CART STATE
  // ======================================

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ======================================
  // LOAD CART FROM DATABASE
  // ======================================

  useEffect(() => {
    fetch("http://localhost:5000/api/cart/1")
      .then((response) => response.json())
      .then((data) => {
        console.log("Cart from database:", data);

        const formattedCart = data.map((item) => ({
          id: item.product_id,
          cart_item_id: item.cart_item_id,
          name: item.product_name,
          image: item.image,
          quantity: item.quantity,
          price: item.price,
        }));

        setCart(formattedCart);
      })
      .catch((error) => {
        console.error("Unable to load cart:", error);
      });
  }, []);

  // ======================================
  // SEARCH CART PRODUCTS
  // ======================================

  const filteredCart = cart.filter((item) =>
    (item.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ======================================
  // INCREASE QUANTITY
  // ======================================

  const increaseQuantity = async (id) => {
    const item = cart.find((item) => item.id === id);

    if (!item) return;

    const newQuantity = item.quantity + 1;

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${item.cart_item_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update quantity");
      }

      setCart((currentCart) =>
        currentCart.map((cartItem) =>
          cartItem.id === id
            ? {
              ...cartItem,
              quantity: newQuantity,
            }
            : cartItem
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ======================================
  // DECREASE QUANTITY
  // ======================================

  const decreaseQuantity = async (id) => {
    const item = cart.find((item) => item.id === id);

    if (!item || item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${item.cart_item_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update quantity");
      }

      setCart((currentCart) =>
        currentCart.map((cartItem) =>
          cartItem.id === id
            ? {
              ...cartItem,
              quantity: newQuantity,
            }
            : cartItem
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ======================================
  // REMOVE PRODUCT
  // ======================================

  const removeItem = async (id) => {
    const item = cart.find((item) => item.id === id);

    if (!item) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${item.cart_item_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to remove product");
      }

      setCart((currentCart) =>
        currentCart.filter((cartItem) => cartItem.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ======================================
  // CLEAR SEARCH
  // ======================================

  const clearSearch = () => {
    setSearchTerm("");
  };

  // ======================================
  // PROCEED TO CHECKOUT
  // ======================================

  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  // ======================================
  // CONTINUE SHOPPING
  // ======================================

  const continueShopping = () => {
    navigate("/");
  };

  // ======================================
  // RETURN UI
  // ======================================

  return (
    <div className="cart-container">

      {/* HEADING */}

      <div className="cart-heading">
        <h1>Shopping Cart</h1>
        <div className="heading-line"></div>
      </div>

      {/* CART */}

      {cart.length > 0 ? (

        <div className="cart-layout">

          <div className="cart-products">

            {/* SEARCH RESULTS */}

            {filteredCart.length > 0 ? (

              filteredCart.map((item) => (

                <div
                  className="cart-item"
                  key={item.cart_item_id}
                >

                  {/* PRODUCT IMAGE */}

                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  {/* PRODUCT NAME */}

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>

                    <p>
                      ₹{item.price}
                    </p>
                  </div>

                  {/* QUANTITY */}

                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* DELETE */}

                  <button
                    className="delete-btn"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    🗑
                  </button>

                </div>

              ))

            ) : (

              /* NO SEARCH RESULT */

              <div className="empty-cart">

                <h2>No products found</h2>

                <p>
                  No cart product matches "{searchTerm}".
                </p>

                <button onClick={clearSearch}>
                  Clear Search
                </button>

              </div>

            )}

            {/* BUTTONS */}

            {filteredCart.length > 0 && (

              <div className="cart-buttons">

                <button
                  className="checkout-btn"
                  onClick={proceedToCheckout}
                >
                  Proceed To Checkout
                </button>

                <button
                  className="continue-btn"
                  onClick={continueShopping}
                >
                  Continue Shopping
                </button>

              </div>

            )}

          </div>

        </div>

      ) : (

        /* EMPTY CART */

        <div className="empty-cart">

          <h2>Your cart is empty</h2>

          <p>
            Add products to your cart to see them here.
          </p>

          <button onClick={continueShopping}>
            Continue Shopping
          </button>

        </div>

      )}

    </div>
  );
}

export default CartPage;