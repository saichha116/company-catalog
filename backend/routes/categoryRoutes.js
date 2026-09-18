
const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");


// ===============================
// Multer Storage
// ===============================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },


    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});


const upload = multer({
    storage: storage
});


// ===============================
// Get all categories
// ===============================

router.get(
    "/",
    getCategories
);


// ===============================
// Add category
// ===============================

router.post(
    "/",
    upload.single("category_image"),
    addCategory
);


// ===============================
// Update category
// ===============================

router.put(
    "/:id",
    upload.single("category_image"),
    updateCategory
);


// ===============================
// Delete category
// ===============================

router.delete(
    "/:id",
    deleteCategory
);


module.exports = router;
