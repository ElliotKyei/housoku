const express = require('express');
const router = express.Router();

const {
    addUser,
    verifyLogin,
    authenticateUser
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


router.post('/create-account', addUser)
router.post('/sign-in', verifyLogin)
router.get('/auth', authenticateUser)

module.exports = {
    routes: router
}