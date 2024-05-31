const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const argon2 = require('argon2')

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

function generateSessionID() {
    return uuidv4();
}

router.use(session({
    secret: process.env.HOUSOKU_SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        /*   secure: true,
          sameSite: 'none', */
        maxAge: (1000 * 60 * 60 * 24)
    },
    store: new pgSession({
        pool: pgPool,
        tableName: 'session',
        createTableIfMissing: true
    }),
    genid: generateSessionID
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