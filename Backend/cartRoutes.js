const express = require("express");
const router = express.Router();
const db = require("./db");

// ======================================
// ADD PRODUCT TO CART
// ======================================

router.post("/cart", (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({
      message: "user_id and product_id are required"
    });
  }

  const qty = quantity || 1;

  const checkQuery = `
    SELECT * FROM cart_items
    WHERE user_id = ? AND product_id = ?
  `;

  db.query(
    checkQuery,
    [user_id, product_id],
    (err, results) => {

      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err
        });
      }

      // Product already exists
      if (results.length > 0) {

        const newQuantity =
          results[0].quantity + qty;

        const updateQuery = `
          UPDATE cart_items
          SET quantity = ?
          WHERE user_id = ? AND product_id = ?
        `;

        db.query(
          updateQuery,
          [newQuantity, user_id, product_id],
          (err) => {

            if (err) {
              return res.status(500).json({
                message: "Unable to update cart"
              });
            }

            res.json({
              message: "Product quantity updated",
              quantity: newQuantity
            });
          }
        );

      } else {

        // Product does not exist
        const insertQuery = `
          INSERT INTO cart_items
          (user_id, product_id, quantity)
          VALUES (?, ?, ?)
        `;

        db.query(
          insertQuery,
          [user_id, product_id, qty],
          (err) => {

            if (err) {
              return res.status(500).json({
                message: "Unable to add product",
                error: err
              });
            }

            res.json({
              message: "Product added to cart",
              quantity: qty
            });
          }
        );
      }
    }
  );
});


// ======================================
// GET CART PRODUCTS
// ======================================

router.get("/cart/:user_id", (req, res) => {

  const user_id = req.params.user_id;

  const query = `
    SELECT
      cart_items.cart_item_id,
      cart_items.user_id,
      cart_items.product_id,
      cart_items.quantity,
      products.product_name,
      products.price,
      products.image,
      products.stock
    FROM cart_items
    INNER JOIN products
      ON cart_items.product_id = products.product_id
    WHERE cart_items.user_id = ?
  `;

  db.query(query, [user_id], (err, results) => {

    if (err) {
      return res.status(500).json({
        message: "Unable to fetch cart",
        error: err
      });
    }

    res.json(results);
  });
});


// ======================================
// UPDATE QUANTITY
// ======================================

router.put("/cart/:cart_item_id", (req, res) => {

  const cart_item_id = req.params.cart_item_id;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({
      message: "Quantity must be at least 1"
    });
  }

  const query = `
    UPDATE cart_items
    SET quantity = ?
    WHERE cart_item_id = ?
  `;

  db.query(
    query,
    [quantity, cart_item_id],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Unable to update quantity",
          error: err
        });
      }

      res.json({
        message: "Quantity updated successfully",
        quantity: quantity
      });
    }
  );
});


// ======================================
// DELETE PRODUCT FROM CART
// ======================================

router.delete("/cart/:cart_item_id", (req, res) => {

  const cart_item_id = req.params.cart_item_id;

  const query = `
    DELETE FROM cart_items
    WHERE cart_item_id = ?
  `;

  db.query(
    query,
    [cart_item_id],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Unable to remove product",
          error: err
        });
      }

      res.json({
        message: "Product removed from cart"
      });
    }
  );
});


module.exports = router;