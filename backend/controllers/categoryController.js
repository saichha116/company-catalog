const db = require("../config/db");
// ===============================
// Get Categories
// ===============================
const getCategories = (req, res) => {
    const sql = `
        SELECT
            c.*,
            m.main_category_name
        FROM categories c
        LEFT JOIN main_categories m
        ON c.main_category_id = m.main_category_id
        ORDER BY c.category_id ASC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Failed to fetch categories"
            });
        }
        res.json(result);
    });
};
// ===============================
// Add Category
// ===============================
const addCategory = (req, res) => {
    const {
        main_category_id,
        category_name,
        description
    } = req.body;
    const category_image = req.file
        ? req.file.filename
        : null;
    const sql = `
        INSERT INTO categories
        (
            main_category_id,
            category_name,
            category_image,
            description
        )
        VALUES (?, ?, ?, ?)
    `;
    db.query(
        sql,
        [
            main_category_id,
            category_name,
            category_image,
            description
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Category insert failed"
                });
            }
            res.status(201).json({
                message: "Category added successfully",
                category_id:
                    result.insertId
            });
        }
    );
};
// ===============================
// Update Category
// ===============================
const updateCategory = (req, res) => {
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
    }
    else {
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
    db.query(
        sql,
        values,
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Category update failed"
                });
            }

            res.json({
                message:
                    "Category updated successfully"
            });
        }
    );
};
// ===============================
// Delete Category
// ===============================
const deleteCategory = (req, res) => {
    const { id } = req.params;
    const sql = `
        DELETE FROM categories
        WHERE category_id=?
    `;
    db.query(
        sql,
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Category delete failed"
                });
            }
            res.json({
                message:
                    "Category deleted successfully"
            });

        }
    );

};

module.exports = {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
};

