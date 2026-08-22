const express = require("express");
const cors = require("cors");

require("dotenv").config();
const wishlistRoutes = require("./wishlistRoutes");
const db = require("./config/db");
const cartRoutes = require("./cartRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/cart",cartRoutes);
app.use("/api/wishlist",wishlistRoutes);

// Test backend
app.get("/", (req, res) => {
    res.send("Backend is running");
});


// Feedback API
app.post("/api/feedback", (req, res) => {

    const { full_name, email, rating, feedback } = req.body;

    // Check required fields
    if (!full_name || !email || !rating || !feedback) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const sql = `
        INSERT INTO feedback
        (full_name, email, rating, feedback)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [full_name, email, rating, feedback],
        (err, result) => {

            if (err) {
                console.log("Feedback insert error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to save feedback"
                });
            }

            res.json({
                success: true,
                message: "Feedback submitted successfully"
            });
        }
    );
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});