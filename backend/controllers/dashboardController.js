const db = require("../config/db");


const getDashboardData = (req,res)=>{


    const sql = `
        SELECT

        (SELECT COUNT(*) FROM products) AS totalProducts,

        (SELECT COUNT(*) FROM categories) AS totalCategories

    `;


    db.query(sql,(err,result)=>{


        if(err){

            console.log(err);

            return res.status(500).json({
                message:"Dashboard data failed"
            });

        }


        res.json(result[0]);

    });


};


module.exports = {
    getDashboardData
};