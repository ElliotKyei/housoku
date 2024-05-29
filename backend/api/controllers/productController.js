const { Query } = require('pg');
const db = require('../../db/db.js')
const Product = require('../models/product.js')

// Validate the user product ID

const sanitizedProductId = (req, res, next) => {
    let productId = null;

    if (req.params.hasOwnProperty('productId'))
        productId = req.params.productId
    if (req.body.hasOwnProperty('productId'))
        productId = req.body.productId

    if (!productId) {
        console.log("invalid id (sanitizaiton)")
        return res.status(404).json({ error: 'Product ID not found' });
    }

    else {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (productId.trim().length !== 36) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        else if (!uuidRegex.test(productId)) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        req.sanitizedProductId = productId
        next()
    }
}

const sanitizeSearchParams = (req, res, next) => {
    let filters = null;


    if (req.params.hasOwnProperty('filters'))
        filters = JSON.parse(req.params.filters)


    if (!filters) {
        console.log("invalid filters (sanitizaiton)")
        return res.status(404).json({ error: 'Product ID not found' });
    }

    else {
        let sanitizedParams = {}
        for (const [key, val] of Object.entries(filters))
            if (val && val.length <= 80)
                sanitizedParams[key] = val

        req.sanitizedFilters = sanitizedParams
        next()
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
        console.log("Nah, nah, nah...", error.message)
        return res.status(500).send(error)
    }

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


const getAllPants = async (req, res) => {
    try {
        const allPants = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE c.category_id = '15087c35-f7da-4d15-be2b-e3aecd0b4ada';")
        let allPantProducts = []
        allPants.rows.forEach(prod => allPantProducts.push(new Product(prod)))
        return res.status(200).send(allPantProducts)
    }
    catch (error) {
        return res.status(500).send(error)
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
        return res.status(500).send(error)
    }

}

const applyFilters = async (req, res) => {

    if (req.hasOwnProperty("sanitizedFilters")) {

        const { category, subcategory, pmin, pmax, filterByColor, filterBySize } = req.sanitizedFilters
        let params = []
        let paramIndex = 1;
        let query = ""

        if (category) {
            query = "SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE c.category_name = $1 "
            params.push(category)
        }
        else {
            query = "SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE c.category_name = $1 "
            params.push("Tops")
        }

        paramIndex = 2

        if (subcategory) {
            query += `AND p.subcategory = $${paramIndex} `
            params.push(subcategory)
            paramIndex++
        }

        if (pmin && pmax) {
            query += `AND p.price BETWEEN $${paramIndex} AND $${paramIndex + 1} `
            params.push(Number(pmin))
            params.push(Number(pmax))
            paramIndex += 2
        }

        if (filterByColor) {

            for (i = 0; i < filterByColor.length; i++) {
                if (i == 0) {
                    query += `AND ($${paramIndex} = ANY(p.colour) `
                    params.push(filterByColor[i])
                    paramIndex++
                }
                else {
                    query += `OR $${paramIndex} = ANY(p.colour) `
                    params.push(filterByColor[i])
                    paramIndex++
                }
            }

            query += ') '
        }


        if (filterBySize) {

            for (i = 0; i < filterBySize.length; i++) {
                if (i == 0) {
                    query += `AND ($${paramIndex} = ANY(p.size) `
                    params.push(filterBySize[i])
                    paramIndex++
                }
                else {
                    query += `OR $${paramIndex} = ANY(p.size) `
                    params.push(filterBySize[i])
                    paramIndex++
                }
            }

            query += ') '
        }

        let allFilteredProducts = []
        let allSubcategories = []

        try {
            const filteredProducts = await db.query(query, params)
            filteredProducts.rows.forEach(prod => allFilteredProducts.push(new Product(prod)))
        }

        catch (error) {
            console.log(error.message)
            return res.status(400).send("Could not process request")
        }

        try {
            const subcategories = await db.query('SELECT DISTINCT p.subcategory FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE c.category_name = $1', [params[0]])
            subcategories.rows.forEach(category => allSubcategories.push(category))
        }

        catch (error) {
            console.log(error.message)
            return res.status(400).send("Could not process request")
        }

        return res.status(200).json({ allFilteredProducts: allFilteredProducts, allSubcategories: allSubcategories })
    }

    else {
        console.log("Invalid search params")
        return res.status(400).send("Could not process request")
    }
}






module.exports = {
    sanitizedProductId,
    sanitizeSearchParams,
    getAllTops,
    getProductById,
    getAllFeaturedProducts,
    getAllPants,
    getAllShoes,
    applyFilters
}