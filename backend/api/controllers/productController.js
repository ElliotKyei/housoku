const db = require('../../db/db.js')



const getAllTops = async (req, res) => {
    try {
        const allTops = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE c.category_id = 'f60c0833-083a-4e9a-ab09-28524c64b10d';")
        return res.status(200).send(allTops.rows)
    }
    catch (error) {
        return error
    }

}

const getProductById = async (req, res) => {
    try {
        const product_id = req.sanitizedProductId
        const productById = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE p.product_id = $1;", [product_id])
        return res.status(200).send(productById.rows[0])
    }
    catch (error) {
        return error
    }

}

const getAllFeaturedProducts = async (req, res) => {
    try {

        const featuredProducts = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE p.featured_section IS NOT NULL;")
        return res.status(200).send(featuredProducts.rows)
    }
    catch (error) {
        return error
    }

}





const getAllPants = async (req, res) => {
    try {
        const allPants = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE c.category_id = '15087c35-f7da-4d15-be2b-e3aecd0b4ada';")
        return res.status(200).send(allPants.rows)
    }
    catch (error) {
        return error
    }

}

const getAllShoes = async (req, res) => {
    try {
        const allShoes = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE c.category_id = '7e1b8eb6-2653-4456-babb-4fe9bd495e46';")
        return res.status(200).send(allShoes.rows)
    }
    catch (error) {
        return error
    }

}







module.exports = {
    getAllTops,
    getProductById,
    getAllFeaturedProducts,
    getAllPants,
    getAllShoes
}