const db = require("../config/db");
// ===============================
// Add Product
// ===============================
const addProduct = (req, res) => {
    const {
        category_id,
        subcategory_id,
        product_name,
        description,
        min_price,
        max_price,
        stock
    } = req.body;

    const image = req.file
        ? req.file.filename
        : null;

    const sql = `
        INSERT INTO products
        (
            category_id,
            subcategory_id,
            product_name,
            description,
            min_price,
            max_price,
            stock,
            image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
        sql,
        [
            category_id,
            subcategory_id || null,
            product_name,
            description,
            min_price,
            max_price,
            stock,
            image
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Product insert failed"
                });

            }


            res.status(201).json({

                message: "Product added successfully",

                product_id: result.insertId

            });

        }
    );

};
// ===============================
// Get All Products
// ===============================
const getProducts = (req, res) => {

const sql = `
        SELECT
            p.*,
            c.category_name,
            c.main_category_id,
            s.subcategory_name
        FROM products p
        JOIN categories c
        ON p.category_id = c.category_id
        LEFT JOIN subcategories s
        ON p.subcategory_id = s.subcategory_id
        ORDER BY p.product_id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Failed to fetch products"
            });

        }
        res.json(result);

    });

};

// ===============================
// Delete Product
// ===============================

const deleteProduct = (req, res) => {

    const { id } = req.params;


    const sql = `
        DELETE FROM products
        WHERE product_id = ?
    `;


    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Product delete failed"
            });

        }


        res.json({

            message: "Product deleted successfully"

        });

    });

};
// ===============================
// Get Single Product
// ===============================

const getProductById = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
    p.*,
    c.category_name,
    c.category_image,
    s.subcategory_name
        FROM products p

        JOIN categories c
        ON p.category_id = c.category_id

        LEFT JOIN subcategories s
        ON p.subcategory_id = s.subcategory_id

        WHERE p.product_id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Failed to fetch product"
            });

        }
        res.json(result[0]);

    });

};

// ===============================
// Update Product
// ===============================

const updateProduct = (req, res) => {

    const { id } = req.params;
    const {
        category_id,
        subcategory_id,
        product_name,
        description,
        min_price,
        max_price,
        stock
    } = req.body;

    const image = req.file
        ? req.file.filename
        : null;

    let sql;
    let values;

    if (image) {

        sql = `
            UPDATE products
            SET
                category_id=?,
                subcategory_id=?,
                product_name=?,
                description=?,
                min_price=?,
                max_price=?,
                stock=?,
                image=?
            WHERE product_id=?
        `;

        values = [

            category_id,
            subcategory_id || null,
            product_name,
            description,
            min_price,
            max_price,
            stock,
            image,
            id

        ];

    }

    else {

        sql = `
            UPDATE products
            SET
                category_id=?,
                subcategory_id=?,
                product_name=?,
                description=?,
                min_price=?,
                max_price=?,
                stock=?
            WHERE product_id=?
        `;


        values = [

            category_id,
            subcategory_id || null,
            product_name,
            description,
            min_price,
            max_price,
            stock,
            id

        ];

    }


    db.query(sql, values, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Product update failed"
            });

        }


        res.json({

            message: "Product updated successfully"

        });

    });

};



module.exports = {

    addProduct,
    getProducts,
    deleteProduct,
    getProductById,
    updateProduct

};
