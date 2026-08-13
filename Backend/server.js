const express = require("express");
const cors = require("cors");
const db = require("./db");
const cartRoutes = require("./cartRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", cartRoutes);

app.get("/", (req, res) => {
  res.send("Stationery Shop Backend is running!");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});