const db = require("../config/db");


// Get all subcategories
const getSubcategories = (req, res) => {

    const sql = `
        SELECT *
        FROM subcategories
        ORDER BY subcategory_id ASC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Failed to fetch subcategories"
            });

        }

        res.json(result);

    });

};


// Get subcategories by category
const getSubcategoriesByCategory = (req, res) => {

    const { category_id } = req.params;

    const sql = `
        SELECT *
        FROM subcategories
        WHERE category_id = ?
        ORDER BY subcategory_id ASC
    `;

    db.query(sql, [category_id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Failed to fetch subcategories"
            });

        }

        res.json(result);

    });

};


module.exports = {
    getSubcategories,
    getSubcategoriesByCategory
};