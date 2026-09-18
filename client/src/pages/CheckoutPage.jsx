import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/CheckoutPage.css";

function CheckoutPage({ cart }) {

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // PLACE ORDER ON WHATSAPP
  // =========================
  const handleWhatsAppOrder = () => {

    // Check customer details
    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim()
    ) {
      alert("Please fill all customer details.");
      return;
    }

    // Check cart
    if (!cart || cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // =========================
    // CREATE WHATSAPP MESSAGE
    // =========================

    let message =
      "Hello, I would like to place an order.%0A%0A";

    message +=
      `Customer Name: ${customer.name}%0A`;

    message +=
      `Phone Number: ${customer.phone}%0A`;

    message +=
      `Address: ${customer.address}%0A%0A`;

    message += "Order Details:%0A";

    cart.forEach((item) => {

      const quantity = item.quantity || 1;

      message +=
        `${item.name} - Quantity: ${quantity}%0A`;

    });

    // =========================
    // WHATSAPP NUMBER
    // =========================

    // Replace this with your business WhatsApp number.
    // Include country code 91.
    // Do NOT use + or spaces.

    const whatsappNumber = "919999999999";

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp
    window.open(
      whatsappURL,
      "_blank"
    );
  };

  return (
    <div className="checkout-page">

      {/* =========================
          TITLE
      ========================= */}

      <h1>Checkout</h1>


      {/* =========================
          TWO COLUMN CONTAINER
      ========================= */}

      <div className="checkout-container">


        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="checkout-box">

          <div className="box-heading">

            <div className="heading-icon">
              📋
            </div>

            <div>

              <h2>
                Order Summary
              </h2>

              <p>
                Review the items that you have selected
              </p>

            </div>

          </div>


          <div className="checkout-items">

            {cart && cart.length > 0 ? (

              cart.map((item) => (

                <div
                  className="checkout-item"
                  key={item.id}
                >

                  {/* PRODUCT IMAGE */}

                  <img
                    src={item.image}
                    alt={item.name}
                  />


                  {/* PRODUCT NAME */}

                  <div className="item-name">
                    {item.name}
                  </div>


                  {/* QUANTITY */}

                  <div className="quantity">
                    Quantity: {item.quantity || 1}
                  </div>

                </div>

              ))

            ) : (

              <p className="empty-message">
                Your cart is empty.
              </p>

            )}

          </div>

        </div>


        {/* =========================
            CUSTOMER DETAILS
        ========================= */}

        <div className="checkout-box">

          <div className="box-heading">

            <div className="heading-icon">
              👤
            </div>

            <div>

              <h2>
                Customer Details
              </h2>

              <p>
                Please enter your details to place an order
              </p>

            </div>

          </div>


          <div className="customer-form">


            {/* FULL NAME */}

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
            />


            {/* PHONE NUMBER */}

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
            />


            {/* ADDRESS */}

            <label>
              Address
            </label>

            <textarea
              name="address"
              value={customer.address}
              onChange={handleChange}
              rows="4"
            />

          </div>

        </div>

      </div>


      {/* =========================
          WHATSAPP BUTTON
      ========================= */}

      <div className="checkout-button-container">

        <button
          type="button"
          className="whatsapp-button"
          onClick={handleWhatsAppOrder}
        >

       <FaWhatsapp className="whatsapp-icon" />

         <span>Place order on Whatsapp</span>

        </button>

      </div>

    </div>
  );
}

export default CheckoutPage;