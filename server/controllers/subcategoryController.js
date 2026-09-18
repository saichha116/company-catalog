const db = require("../config/db");

// ===============================
// Get All Subcategories
// ===============================
const getSubcategories = async (req, res) => {

    const sql = `
        SELECT *
        FROM subcategories
        ORDER BY subcategory_id ASC
    `;

    try {

        const [result] = await db.query(sql);

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Failed to fetch subcategories"
        });

    }
};


// ===============================
// Get Subcategories By Category
// ===============================
const getSubcategoriesByCategory = async (req, res) => {

    const { category_id } = req.params;

    const sql = `
        SELECT *
        FROM subcategories
        WHERE category_id = ?
        ORDER BY subcategory_id ASC
    `;

    try {

        const [result] = await db.query(
            sql,
            [category_id]
        );

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Failed to fetch subcategories"
        });

    }
};


module.exports = {
    getSubcategories,
    getSubcategoriesByCategory
};