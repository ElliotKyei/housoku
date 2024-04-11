const db = require('../../db/db.js')
const Product = require('../models/product.js')

// Validate the user product ID

const sanitizedProductId = (req, res, next) => {
    const { id } = req.params
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (id.trim().length !== 36) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    else if (!uuidRegex.test(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    req.sanitizedProductId = id
    next()
}

const getAllTops = async (req, res) => {
    try {
        const allTops = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE c.category_id = 'f60c0833-083a-4e9a-ab09-28524c64b10d';")
        let allTopProducts = []
        allTops.rows.forEach(prod => allTopProducts.push(new Product(prod)))
        return res.status(200).send(allTopProducts)
    }
    catch (error) {
        return res.status(500).send(error)
    }

}

const getProductById = async (req, res) => {
    try {
        const product_id = req.sanitizedProductId
        const productById = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE p.product_id = $1;", [product_id])
        if (productById.rowCount === 1) {
            const foundProduct = new Product(productById.rows[0])
            return res.status(200).json(foundProduct)
        }
        else {
            return res.status(404).send("No product found")
        }
    }
    catch (error) {
        return res.status(500).send(error)
    }

}

const getAllFeaturedProducts = async (req, res) => {
    try {

        const featuredProducts = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE p.featured_section IS NOT NULL;")
        let allFeaturedProducts = []
        featuredProducts.rows.forEach(prod => allFeaturedProducts.push(new Product(prod)))

        return res.status(200).send(allFeaturedProducts)
    }
    catch (error) {
        return res.status(500).send(error)
    }

}


const getAllPants = async (req, res) => {
    try {
        const allPants = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE c.category_id = '15087c35-f7da-4d15-be2b-e3aecd0b4ada';")
        let allPantProducts = []
        allPants.rows.forEach(prod => allPantProducts.push(new Product(prod)))
        return res.status(200).send(allPantProducts)
    }
    catch (error) {
        return error
    }

}

const getAllShoes = async (req, res) => {
    try {
        const allShoes = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE c.category_id = '7e1b8eb6-2653-4456-babb-4fe9bd495e46';")
        let allShoeProducts = []
        allShoes.rows.forEach(prod => allShoeProducts.push(new Product(prod)))
        return res.status(200).send(allShoeProducts)
    }
    catch (error) {
        return error
    }

}







module.exports = {
    sanitizedProductId,
    getAllTops,
    getProductById,
    getAllFeaturedProducts,
    getAllPants,
    getAllShoes
}