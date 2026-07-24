const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Stationery Backend Running 🚀");
});

// Test MySQL Connection
(async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ Connected to MySQL Database");
        connection.release();
    } catch (err) {
        console.error("❌ MySQL Connection Failed");
        console.error(err);
    }
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});