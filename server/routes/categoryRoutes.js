const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

// ===============================
// Multer Storage - FIXED
// ===============================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
    }
});
const upload = multer({ storage: storage });

// Routes
router.get("/", getCategories);
router.post("/", upload.single("category_image"), addCategory);
router.put("/:id", upload.single("category_image"), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;