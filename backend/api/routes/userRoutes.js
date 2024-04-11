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
    validateOrder,
    checkout
} = require('../controllers/userController')

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session)
const pgPool = require('../../db/db.js')

router.use(session({
    secret: process.env.HOUSOKU_SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 60 * 24)
    },
    store: new pgSession({
        pool: pgPool,
        tableName: 'session',
        createTableIfMissing: true
    }),
    httpOnly: true
}))


router.post('/create-account', createAccount, signIn)
router.post('/sign-in', signIn)
router.get('/getAuth', getAuth)
router.get('/sign-out', signOut)
router.get('/getShoppingCart', getShoppingCart)
router.post('/addProductToShoppingCart', addProductToShoppingCart)
router.put('/updateProductQuantityInShoppingCart/:index/:quantity', updateProductQuantityInShoppingCart)
router.delete('/removeProductFromShoppingCart/:index', removeProductFromShoppingCart)
router.post('/check-out', validateOrder, checkout)

module.exports = {
    routes: router
}