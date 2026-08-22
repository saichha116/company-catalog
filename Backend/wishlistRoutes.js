const express = require("express");
const router = express.Router();
const db = require("./config/db");

// ==========================================
// GET WISHLIST FOR A USER
// ==========================================
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT
      w.wishlist_id,
      w.user_id,
      w.product_id,
      w.service_id,
      w.created_at,

      p.product_name,
      p.description AS product_description,
      p.min_price AS product_min_price,
      p.max_price AS product_max_price,
      p.image AS product_image,

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
      if (item.product_id !== null) {
        return {
          wishlist_id: item.wishlist_id,
          id: item.product_id,
          type: "product",
          title: item.product_name,
          name: item.product_name,
          description: item.product_description,
          image: item.product_image,
          min_price: item.product_min_price,
          max_price: item.product_max_price,
        };
      }

      return {
        wishlist_id: item.wishlist_id,
        id: item.service_id,
        type: "service",
        title: item.service_name,
        name: item.service_name,
        description: item.service_description,
        image: item.service_image,
        min_price: item.service_min_price,
        max_price: item.service_max_price,
      };
    });

    res.json(wishlist);
  });
});

// ==========================================
// ADD TO WISHLIST
// ==========================================
router.post("/", (req, res) => {
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

  if (!["product", "service"].includes(item_type)) {
    return res.status(400).json({
      message: "item_type must be product or service",
    });
  }

  const checkColumn =
    item_type === "product"
      ? "product_id"
      : "service_id";

  const sql = `
    SELECT wishlist_id
    FROM wishlist
    WHERE user_id = ?
      AND ${checkColumn} = ?
  `;

  db.query(sql, [user_id, item_id], (err, results) => {
    if (err) {
      console.error("Error checking wishlist:", err);
      return res.status(500).json({
        message: "Failed to check wishlist",
      });
    }

    if (results.length > 0) {
      return res.status(409).json({
        message: "Item already exists in wishlist",
      });
    }

    const productId =
      item_type === "product" ? item_id : null;

    const serviceId =
      item_type === "service" ? item_id : null;

    const insertSql = `
      INSERT INTO wishlist
      (user_id, product_id, service_id)
      VALUES (?, ?, ?)
    `;

    db.query(
      insertSql,
      [user_id, productId, serviceId],
      (err, result) => {
        if (err) {
          console.error("Error adding wishlist:", err);

          return res.status(500).json({
            message: "Failed to add item to wishlist",
          });
        }

        res.status(201).json({
          message: "Item added to wishlist",
          wishlist_id: result.insertId,
        });
      }
    );
  });
});

// ==========================================
// REMOVE FROM WISHLIST
// ==========================================
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

  const column =
    item_type === "product"
      ? "product_id"
      : "service_id";

  const sql = `
    DELETE FROM wishlist
    WHERE user_id = ?
      AND ${column} = ?
  `;

  db.query(sql, [user_id, item_id], (err, result) => {
    if (err) {
      console.error("Error removing wishlist:", err);

      return res.status(500).json({
        message: "Failed to remove item from wishlist",
      });
    }

    res.json({
      message: "Item removed from wishlist",
      deleted: result.affectedRows > 0,
    });
  });
});

module.exports = router;