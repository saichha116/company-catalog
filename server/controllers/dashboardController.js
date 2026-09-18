const db = require("../config/db");

const getDashboardData = async (req, res) => {
    const sql = `
        SELECT
            (SELECT COUNT(*) FROM products) AS totalProducts,
            (SELECT COUNT(*) FROM categories) AS totalCategories
    `;

    try {
        const [result] = await db.query(sql);

        res.json(result[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Dashboard data failed"
        });

    }
};

module.exports = {
    getDashboardData
};