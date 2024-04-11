const express = require('express')
const router = express.Router();
const {
    sanitizedProductId,
    getAllTops,
    getProductById,
    getAllFeaturedProducts,
    getAllPants,
    getAllShoes
} = require('../controllers/productController.js')




router.get('/getAllTops', getAllTops)

/*  Utilizing chain of responsibility 
    If the product_id passed to "sanitizeProductId" is invalid, it will throw an error
    however, if it passes all checks, it will pass the function over to next to controller in the middleware */
router.get('/getProductById/:id', sanitizedProductId, getProductById)

router.get('/getAllFeaturedProducts', getAllFeaturedProducts)
router.get('/getAllPants', getAllPants)
router.get('/getAllShoes', getAllShoes)

module.exports = {
    routes: router
}