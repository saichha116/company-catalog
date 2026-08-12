const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
    addProduct,
    getProducts,
    deleteProduct,
    getProductById,
    updateProduct
} = require("../controllers/productController");


const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads/");

    },


    filename:(req,file,cb)=>{

        cb(
            null,
            Date.now()+"-"+file.originalname
        );

    }

});


const upload = multer({
    storage:storage
});

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put(
    "/:id",
    upload.single("image"),
    updateProduct
);
router.delete("/:id", deleteProduct);

router.post(
    "/",
    upload.single("image"),
    addProduct
);



module.exports = router;