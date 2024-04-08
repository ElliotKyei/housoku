const express = require('express')
const router = express.Router();
const {
    getAllTops,
    getProductById,
    getAllFeaturedProducts,
    getAllPants,
    getAllShoes
} = require('../controllers/productController.js')

function sanitizedProductId(req, res, next) {
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


router.get('/getAllTops', getAllTops)
router.get('/getProductById/:id', sanitizedProductId, getProductById)
router.get('/getAllFeaturedProducts', getAllFeaturedProducts)
router.get('/getAllPants', getAllPants)
router.get('/getAllShoes', getAllShoes)

module.exports = {
    routes: router
}