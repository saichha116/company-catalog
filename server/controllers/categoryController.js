const db = require("../config/db");

// ===============================
// Get Categories
// ===============================
const getCategories = async (req, res) => {
    const sql = `
        SELECT
            c.*,
            m.main_category_name
        FROM categories c
        LEFT JOIN main_categories m
        ON c.main_category_id = m.main_category_id
        ORDER BY c.category_id ASC
    `;

    try {
        const [result] = await db.query(sql);

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Failed to fetch categories"
        });

    }
};


// ===============================
// Add Category
// ===============================
// ===============================
// Add Category - FIXED
// ===============================
const addCategory = async (req, res) => {

    let {
        main_category_id,
        category_name,
        description
    } = req.body;

    // FIX: Extract only ID number from "1 - Products"
    if (main_category_id) {
        main_category_id = parseInt(String(main_category_id).split("-")[0].trim());
    }

    const category_image = req.file
        ? req.file.filename
        : null;

    // VALIDATION
    if (!main_category_id || !category_name) {
        return res.status(400).json({
            message: "Main Category and Category Name are required"
        });
    }

    const sql = `
        INSERT INTO categories
        (
            main_category_id,
            category_name,
            category_image,
            description
        )
        VALUES (?,?,?,?)
    `;

    try {

        const [result] = await db.query(
            sql,
            [
                main_category_id,
                category_name,
                category_image,
                description || null
            ]
        );

        res.status(201).json({
            message: "Category added successfully",
            category_id: result.insertId
        });

    } catch (err) {
        console.log("REAL MYSQL ERROR:", err); // This will show you real error in terminal

        res.status(500).json({
            message: "Category insert failed: " + err.sqlMessage // FIX: Show real reason
        });
    }
};

// ===============================
// Update Category
// ===============================
const updateCategory = async (req, res) => {

    const { id } = req.params;

    const {
        category_name,
        description,
        main_category_id
    } = req.body;

    const category_image = req.file
        ? req.file.filename
        : null;

    let sql;
    let values;

    if (category_image) {

        sql = `
            UPDATE categories
            SET
                main_category_id=?,
                category_name=?,
                description=?,
                category_image=?
            WHERE category_id=?
        `;

        values = [
            main_category_id,
            category_name,
            description,
            category_image,
            id
        ];

    } else {

        sql = `
            UPDATE categories
            SET
                main_category_id=?,
                category_name=?,
                description=?
            WHERE category_id=?
        `;

        values = [
            main_category_id,
            category_name,
            description,
            id
        ];
    }

    try {

        await db.query(sql, values);

        res.json({
            message: "Category updated successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Category update failed"
        });

    }
};


// ===============================
// Delete Category
// ===============================
const deleteCategory = async (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM categories
        WHERE category_id=?
    `;

    try {

        await db.query(sql, [id]);

        res.json({
            message: "Category deleted successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Category delete failed"
        });

    }
};


module.exports = {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
};