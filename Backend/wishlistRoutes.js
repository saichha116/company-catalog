const express = require("express");
const router = express.Router();
const db = require("./config/db");

// ======================================================
// GET WISHLIST FOR A USER
// Supports BOTH products and services
// ======================================================
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT
      w.wishlist_id,
      w.user_id,
      w.product_id,
      w.service_id,
      w.created_at,

      -- PRODUCT DETAILS
      p.product_name,
      p.description AS product_description,
      p.min_price AS product_min_price,
      p.max_price AS product_max_price,
      p.image AS product_image,
      p.stock AS product_stock,

      -- SERVICE DETAILS
      s.service_name,
      s.description AS service_description,
      s.min_price AS service_min_price,
      s.max_price AS service_max_price,
      s.image AS service_image

    FROM wishlist w

    LEFT JOIN products p
      ON w.product_id = p.product_id

    LEFT JOIN services s
      ON w.service_id = s.service_id

    WHERE w.user_id = ?

    ORDER BY w.created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching wishlist:", err);

      return res.status(500).json({
        message: "Failed to fetch wishlist",
      });
    }

    const wishlist = results.map((item) => {

      // ================================================
      // PRODUCT
      // ================================================
      if (item.product_id !== null) {
        return {
          wishlist_id: item.wishlist_id,

          id: item.product_id,
          type: "product",

          name: item.product_name,
          title: item.product_name,

          description: item.product_description,

          image: item.product_image,

          min_price: item.product_min_price,
          max_price: item.product_max_price,

          stock: item.product_stock,
        };
      }

      // ================================================
      // SERVICE
      // ================================================
      if (item.service_id !== null) {
        return {
          wishlist_id: item.wishlist_id,

          id: item.service_id,
          type: "service",

          name: item.service_name,
          title: item.service_name,

          description: item.service_description,

          image: item.service_image,

          min_price: item.service_min_price,
          max_price: item.service_max_price,

          stock: null,
        };
      }

      return null;
    }).filter(Boolean);

    res.json(wishlist);
  });
});


// ======================================================
// ADD PRODUCT OR SERVICE TO WISHLIST
// ======================================================
router.post("/", (req, res) => {

  const {
    user_id,
    item_id,
    item_type,
  } = req.body;

  // ================================================
  // VALIDATION
  // ================================================
  if (!user_id || !item_id || !item_type) {
    return res.status(400).json({
      message: "user_id, item_id and item_type are required",
    });
  }

  // ================================================
  // PRODUCT
  // ================================================
  if (item_type === "product") {

    const checkSql = `
      SELECT wishlist_id
      FROM wishlist
      WHERE user_id = ?
        AND product_id = ?
    `;

    db.query(
      checkSql,
      [user_id, item_id],
      (err, results) => {

        if (err) {
          console.error(
            "Error checking product wishlist:",
            err
          );

          return res.status(500).json({
            message: "Failed to check wishlist",
          });
        }

        if (results.length > 0) {
          return res.status(409).json({
            message: "Product already exists in wishlist",
          });
        }

        const insertSql = `
          INSERT INTO wishlist
          (user_id, product_id, service_id)
          VALUES (?, ?, NULL)
        `;

        db.query(
          insertSql,
          [user_id, item_id],
          (err, result) => {

            if (err) {
              console.error(
                "Error adding product to wishlist:",
                err
              );

              return res.status(500).json({
                message: "Failed to add product to wishlist",
              });
            }

            res.status(201).json({
              message: "Product added to wishlist",
              wishlist_id: result.insertId,
            });
          }
        );
      }
    );

    return;
  }


  // ================================================
  // SERVICE
  // ================================================
  if (item_type === "service") {

    const checkSql = `
      SELECT wishlist_id
      FROM wishlist
      WHERE user_id = ?
        AND service_id = ?
    `;

    db.query(
      checkSql,
      [user_id, item_id],
      (err, results) => {

        if (err) {
          console.error(
            "Error checking service wishlist:",
            err
          );

          return res.status(500).json({
            message: "Failed to check wishlist",
          });
        }

        if (results.length > 0) {
          return res.status(409).json({
            message: "Service already exists in wishlist",
          });
        }

        const insertSql = `
          INSERT INTO wishlist
          (user_id, product_id, service_id)
          VALUES (?, NULL, ?)
        `;

        db.query(
          insertSql,
          [user_id, item_id],
          (err, result) => {

            if (err) {
              console.error(
                "Error adding service to wishlist:",
                err
              );

              return res.status(500).json({
                message: "Failed to add service to wishlist",
              });
            }

            res.status(201).json({
              message: "Service added to wishlist",
              wishlist_id: result.insertId,
            });
          }
        );
      }
    );

    return;
  }


  // ================================================
  // INVALID TYPE
  // ================================================
  return res.status(400).json({
    message: "Invalid item_type. Use product or service.",
  });
});


// ======================================================
// REMOVE PRODUCT OR SERVICE FROM WISHLIST
// ======================================================
router.delete("/", (req, res) => {

  const {
    user_id,
    item_id,
    item_type,
  } = req.body;

  if (!user_id || !item_id || !item_type) {
    return res.status(400).json({
      message: "user_id, item_id and item_type are required",
    });
  }


  // ================================================
  // REMOVE PRODUCT
  // ================================================
  if (item_type === "product") {

    const sql = `
      DELETE FROM wishlist
      WHERE user_id = ?
        AND product_id = ?
    `;

    db.query(
      sql,
      [user_id, item_id],
      (err, result) => {

        if (err) {
          console.error(
            "Error removing product from wishlist:",
            err
          );

          return res.status(500).json({
            message: "Failed to remove product from wishlist",
          });
        }

        return res.json({
          message: "Product removed from wishlist",
          deleted: result.affectedRows > 0,
        });
      }
    );

    return;
  }


  // ================================================
  // REMOVE SERVICE
  // ================================================
  if (item_type === "service") {

    const sql = `
      DELETE FROM wishlist
      WHERE user_id = ?
        AND service_id = ?
    `;

    db.query(
      sql,
      [user_id, item_id],
      (err, result) => {

        if (err) {
          console.error(
            "Error removing service from wishlist:",
            err
          );

          return res.status(500).json({
            message: "Failed to remove service from wishlist",
          });
        }

        return res.json({
          message: "Service removed from wishlist",
          deleted: result.affectedRows > 0,
        });
      }
    );

    return;
  }


  return res.status(400).json({
    message: "Invalid item_type. Use product or service.",
  });
});


module.exports = router;