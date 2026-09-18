const db = require("../config/db");

// ===============================
// Add Product
// ===============================
const addProduct = async (req, res) => {

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

    try {

        const [result] = await db.query(
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
            ]
        );

        res.status(201).json({
            message: "Product added successfully",
            product_id: result.insertId
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Product insert failed"
        });

    }
};


// ===============================
// Get All Products
// ===============================
const getProducts = async (req, res) => {

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

    try {

        const [result] = await db.query(sql);

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Failed to fetch products"
        });

    }
};


// ===============================
// Delete Product
// ===============================
const deleteProduct = async (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM products
        WHERE product_id = ?
    `;

    try {

        await db.query(sql, [id]);

        res.json({
            message: "Product deleted successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Product delete failed"
        });

    }
};


// ===============================
// Get Single Product
// ===============================
const getProductById = async (req, res) => {

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

    try {

        const [result] = await db.query(sql, [id]);

        res.json(result[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Failed to fetch product"
        });

    }
};


// ===============================
// Update Product
// ===============================
const updateProduct = async (req, res) => {

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

    } else {

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

    try {

        await db.query(sql, values);

        res.json({
            message: "Product updated successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Product update failed"
        });

    }
};


module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    getProductById,
    updateProduct
};