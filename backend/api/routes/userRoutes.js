const express = require('express');
const router = express.Router();

const {
    createAccount,
    signIn,
    getAuth,
    signOut,
    getShoppingCart,
    addProductToShoppingCart,
    removeProductFromShoppingCart,
    updateProductQuantityInShoppingCart,
    updateProductSizeInShoppingCart,
    validateOrder,
    checkout
} = require('../controllers/userController.js')

const { sanitizedProductId } = require('../controllers/productController.js');

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session)
const pgPool = require('../../db/db.js')

router.use(session({
    secret: process.env.HOUSOKU_SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 60 * 24),
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    },
    store: new pgSession({
        pool: pgPool,
        tableName: 'session',
        createTableIfMissing: true
    })
}))


router.post('/create-account', createAccount, signIn)
router.post('/sign-in', signIn)
router.get('/getAuth', getAuth)
router.get('/sign-out', signOut)
router.get('/getShoppingCart', getShoppingCart)
router.post('/addProductToShoppingCart', addProductToShoppingCart)
router.post('/updateProductQuantityInShoppingCart', updateProductQuantityInShoppingCart)
router.post('/updateProductSizeInShoppingCart', sanitizedProductId, updateProductSizeInShoppingCart)
router.delete('/removeProductFromShoppingCart/:productIndex', removeProductFromShoppingCart)
router.post('/check-out', validateOrder, checkout)

module.exports = {
    routes: router
}