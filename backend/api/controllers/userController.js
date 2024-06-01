const db = require('../../db/db.js')
const argon2 = require('argon2');
const { v4: uuidv4 } = require('uuid')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const pgPool = require('pg-pool')
const { sendWelcomeEmail, sendOrderReceipt } = require('../../mailJet.js')
const ShoppingCartProduct = require('../models/shoppingCartProduct.js')
const User = require('../models/user.js')


if (!db) {
    throw new Error("API encountered an error initializing database")
}

// Hash user password

const hashFunction = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password, { type: argon2.argon2id })
        return hashedPassword;
    }
    catch (err) {
        return err;

    }
}


// Refactor User Input

const refactorFinalTextInput = (nameStr, capitalize = false) => {
    let finalTextInput = ""

    // Get rid of all spaces in name. Only add non-white space characters to the final input

    for (let char of nameStr) {
        if (char !== " ")
            finalTextInput += char
    }

    // Make sure the input is trimmed and in lowercase

    finalTextInput = finalTextInput.trim().toLowerCase()

    // Capitalize first letter in input, and using slice to join it ith original input

    if (capitalize) {
        let capitalizeFirstLetter = finalTextInput[0].toUpperCase();
        finalTextInput = capitalizeFirstLetter + finalTextInput.slice(1);
    }

    return finalTextInput;
}

// Get email from database (to authenticate user)

const validateEmail = async (email) => {
    if (email.trim().length !== 0) {

        // Refactor email (remove whitespaces)

        email = refactorFinalTextInput(email, false);

        try {
            const result = await db.query("SELECT (email) FROM users WHERE email = $1", [email])

            if (result.rowCount === 0) {
                return false
            }

            else {
                return true;
            }
        }
        catch (error) {

            throw new Error("Error finding user account")
        }
    }
}

// Validate password (user authentication)

const validatePassword = async (email, passwordInput) => {

    if (email.length !== 0 && passwordInput.length !== 0) {

        try {
            const result = await db.query("SELECT (password) FROM users WHERE email = $1", [email])

            // Did not find any password with given email

            if (result.rowCount === 0) {
                return false
            }
            else {

                // Retrieve password has from database and compare with provided plain text password

                const { password: retrievedPasswordHash } = result.rows[0]

                const passwordMatch = await argon2.verify(retrievedPasswordHash, passwordInput)

                if (!passwordMatch)
                    return false

                else
                    return true

            }
        }
        catch (error) {
            throw new Error("Error occured")
        }
    }

}

const getUserID = async (email) => {

    if (email.length !== 0) {

        try {
            const result = await db.query("SELECT (user_id) FROM users WHERE email = $1", [email])

            // Did not find any user with given email

            if (result.rowCount === 0) {
                return false
            }
            else {

                // Return the user_id

                return { user_id } = result.rows[0]

            }
        }
        catch (error) {
            throw new Error("Error occured")
        }
    }

}

// Add a user to the database (userController)

const createAccount = async (req, res, next) => {
    if (req.body) {
        let { email, firstName, lastName, password } = req.body;

        // Refactor user input (mainly removing whitespaces)

        firstName = refactorFinalTextInput(firstName, true);
        lastName = refactorFinalTextInput(lastName, true);
        email = refactorFinalTextInput(email, false);

        try {

            // Check if user already exists in database

            const result = await db.query("SELECT email FROM users WHERE email = $1", [email]);

            if (result.rowCount !== 0) {
                res.status(500).json({ alreadyExists: 'Account already exists' });
            }

            else {

                // Generate UUID for user_id, and hash the password

                const userId = uuidv4();
                let hashedPassword = ""
                hashedPassword = await hashFunction(password);

                if (hashedPassword instanceof Error) {
                    res.status(500).send("Internal Server Error")
                }

                // Add user info to database and send welcome email

                const query = 'INSERT INTO users (user_id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)';
                const values = [userId, firstName, lastName, email, hashedPassword];
                await db.query(query, values);

                const fullName = `${firstName} ${lastName}`
                sendWelcomeEmail(email, fullName)
                next()
            }
        }
        catch (error) {
            console.log(error.message)
            res.status(500).send("Internal Server Error")
        }
    }

    else {
        res.status(401).send("No information found")
    }
}

// Restore shopping cart (from sign in)

const restoreShoppingCart = async (userId) => {

    try {
        const getCart = await db.query("SELECT cart FROM USERS WHERE user_id = $1", [userId])

        if (getCart.rowCount === 1) {
            if (getCart.rows[0].cart === null) {
                return []
            }
            else {
                return getCart.rows[0].cart
            }

        }

        else {
            return []
        }
    }

    catch (error) {
        console.log("error in while restoring cart:", error.message)
        return error
    }
}



// Verify login details (verify email is within system & given password matches with corresponding password hash within account)

const signIn = async (req, res) => {
    if (req.body) {
        let { email, password } = req.body

        // Refactor email (mainly removing whitespaces) and check if email exists

        email = refactorFinalTextInput(email)
        let validEmail = false;

        try {
            validEmail = await validateEmail(email)
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" })

        }


        if (!validEmail) {
            return res.status(404).json({ error: "Account does not exist" })

        }

        if (validEmail) {

            // Email is within system. Validate if password matches

            let validPassword = false

            try {
                validPassword = await validatePassword(email, password)
            }
            catch (error) {
                return res.status(500).json({ error: "Password Internal Server Error" })

            }

            if (!validPassword) {
                return res.status(401).json({ error: "The email or password was incorrect" })

            }

            if (validPassword) {
                let userId = null

                req.session.regenerate(async (err) => {
                    if (err) {
                        req.session.destroy((destroyErr) => {
                            if (destroyErr) {
                                return res.status(500).send("Error signing in and failed to destroy session");
                            }
                            return res.status(500).send("Error signing in");
                        })

                    } else {
                        try {
                            const { user_id } = await getUserID(email);
                            const userId = user_id;

                            req.session.user = { userId: userId, isSignedIn: true, email: email };

                            try {
                                req.session.cart = await restoreShoppingCart(userId);
                            } catch (error) {
                                console.log("Error while restoring shopping cart:", error);
                                req.session.cart = [];
                            }

                            res.status(200).send("User has successfully signed in");
                        } catch (error) {
                            return res.status(500).json({ error: "Internal Server Error" });
                        }
                    }
                });
            }
        }
    }
    else {
        res.status(401).send("No information retrieved")
    }
}


const signOut = (req, res) => {
    if (!req.session) {
        return res.status(401).send('Unauthorized');
    }

    req.session.destroy(err => {
        if (err) {
            req.session = null
            return res.status(500).send("Error destroying user session")
        }

        else
            return res.status(200).send("User successfully logged out")
    })
}


// Searching for session and ensuring the cookie is still valid

const getAuth = async (req, res, next) => {


    // session validity checks

    if (!req.session) {
        console.log("GetAuth: Unable to get session")
        return res.status(401).send('Unauthorized');
    }

    if (req.session.hasOwnProperty('user') && !req.session.user.isSignedIn) {
        console.log("GetAuth: Unable to get user from session")
        return res.status(401).send('Unauthorized. Not signed in');
    }

    try {
        const auth = await db.query("SELECT * FROM session WHERE sid = $1", [req.session.id])
        if (auth.rowCount === 0) {
            console.log("GetAuth: Unable to get session from provided sid")
            return res.status(401).send('Unauthorized');
        }
        else {
            res.json({ isSignedIn: req.session.user.isSignedIn });
        }
    }
    catch (error) {
        return res.status(500).send(error)
    }


}

// Get shopping cart from store

const getShoppingCart = async (req, res) => {


    // session validity checks

    if (!req.session) {
        return res.status(401).send('Unauthorized');
    }

    if (req.session.hasOwnProperty('user') && !req.session.user.isSignedIn) {
        return res.status(401).send('Unauthorized');
    }

    if (!req.session.hasOwnProperty('cart')) {
        return res.status(401).send('Unauthorized');
    }
    let shoppingCartProducts = []

    req.session.cart.forEach(prod => shoppingCartProducts.push(new ShoppingCartProduct(prod)))

    res.status(200).json(shoppingCartProducts)
}

// Save shopping cart to user

const saveCart = async (cart, userId) => {

    if (Object.keys(cart).length === 0)
        cart = null

    try {
        const savingCart = await db.query("UPDATE USERS SET cart = $1 WHERE user_id = $2", [cart, userId])

        if (savingCart.rowCount === 1) return

        else
            throw new Error("Failed to save cart to user")
    }
    catch (error) {
        return error
    }
}



// Adding a product to the shopping cart within session store

const addProductToShoppingCart = async (req, res) => {

    // session validity checks

    if (!req.session) {
        return res.status(401).send('Unauthorized');
    }

    if (req.session.hasOwnProperty('user') && !req.session.user.isSignedIn) {
        return res.status(401).send('Unauthorized');
    }

    if (!req.session.hasOwnProperty('cart')) {
        return res.status(401).send('Unauthorized');
    }

    // get request data and check if product can be found within cart already

    const { product_id, size } = req.body
    const productInd = req.session.cart.findIndex(p => p.product_id === product_id && p.size === size)


    // If  found, just increment quantity. If not found, add a new product

    if (productInd !== -1) {
        if (req.session.cart[productInd].quantity < 10) {
            req.session.cart[productInd].quantity += 1


            try {
                await saveCart(req.session.cart, req.session.user.userId)
            }
            catch (error) {
                console.log(error.message)
                return res.sendStatus(500)
            }

            return res.status(200).send({ productIndex: productInd })
        }
        else {
            return res.status(409).send("Maximum quantity")
        }
    }

    // query to ensure requested data is valid (correct product / size)

    else {
        try {
            const productById = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE p.product_id = $1 AND $2 = ANY(p.size);", [product_id, size])

            if (productById.rowCount === 1) {
                productById.rows[0].size = size
                const addedProduct = new ShoppingCartProduct(productById.rows[0])
                req.session.cart.push(addedProduct)

                try {

                    await saveCart(req.session.cart, req.session.user.userId)
                }
                catch (error) {
                    console.log(error.message)
                    return res.sendStatus(500)
                }


                return res.status(201).json(addedProduct)

            }
            else {
                return res.status(404).send("No product found")
            }

        }
        catch (error) {
            console.log(error.message)
            return res.status(401).send("Invalid product");
        }

    }
}

const removeProductFromShoppingCart = async (req, res) => {
    // session validity checks

    if (!req.session) {
        return res.status(401).send('Unauthorized');
    }

    if (req.session.hasOwnProperty('user') && !req.session.user.isSignedIn) {
        return res.status(401).send('Unauthorized');
    }

    if (!req.session.hasOwnProperty('cart')) {
        return res.status(401).send('Unauthorized');
    }

    // Ensure the quantity is a number and is within range of allowed quantities. If so, delete (splice) cart array at index provided

    const productInd = Number(req.params.productIndex)
    const cartLength = req.session.cart.length - 1

    try {
        if (Number.isInteger(productInd)) {
            if (productInd >= 0 && productInd <= cartLength) {
                req.session.cart.splice(productInd, 1)

                try {
                    await saveCart(req.session.cart, req.session.user.userId)
                }
                catch (error) {
                    console.log(error.message)
                    return res.sendStatus(500)
                }

                return res.status(200).json({ productIndex: productInd })
            }
        }
        return res.status(401).send("Invalid index")
    }
    catch (error) {
        return res.sendStatus(500)
    }
}

const updateProductQuantityInShoppingCart = async (req, res) => {

    // session validity checks

    if (!req.session) {

        return res.status(401).send('Unauthorized');
    }

    if (req.session.hasOwnProperty('user') && !req.session.user.isSignedIn) {
        return res.status(401).send('Unauthorized');
    }

    if (!req.session.hasOwnProperty('cart')) {
        return res.status(401).send('Unauthorized');
    }



    const productInd = Number(req.body.productIndex)
    const quantity = Number(req.body.quantity)
    const cartLength = req.session.cart.length - 1
    try {
        if (Number.isInteger(productInd) && Number.isInteger(quantity)) {
            if ((productInd >= 0 && productInd <= cartLength) && (quantity >= 0 && quantity <= 10)) {
                req.session.cart[productInd].quantity = quantity

                try {
                    await saveCart(req.session.cart, req.session.user.userId)
                }
                catch (error) {
                    console.log(error.message)
                    return res.sendStatus(500)
                }

                return res.status(200).send({ productIndex: productInd, quantity: quantity })
            }
        }

        return res.status(401).send("Invalid index/quantity")
    }
    catch (error) {
        return res.sendStatus(500)
    }
}

const updateProductSizeInShoppingCart = async (req, res, next) => {

    // session validity checks

    if (!req.session) {

        return res.status(401).send('Unauthorized');
    }

    if (req.session.hasOwnProperty('user') && !req.session.user.isSignedIn) {
        return res.status(401).send('Unauthorized');
    }

    if (!req.session.hasOwnProperty('cart')) {
        return res.status(401).send('Unauthorized');
    }

    const productInd = Number(req.body.productIndex)
    const productId = req.sanitizedProductId.trim()
    const size = req.body.size.trim()
    const cartLength = req.session.cart.length - 1

    // validate type and boundaries of the product index and size

    try {
        if (Number.isInteger(productInd) && typeof size === "string") {
            if (productInd >= 0 && productInd <= cartLength) {

                // Find product based on product id and size given

                const validProduct = await db.query("SELECT p.*, c.category_name FROM Products p JOIN productcategories c ON p.category_id = c.category_id WHERE p.product_id = $1 AND $2 = ANY(p.size);", [productId, size])


                // If product is found (rowCount 1), update the product size in the user's cart

                if (validProduct.rowCount === 1) {
                    req.session.cart[productInd].size = size

                    try {
                        await saveCart(req.session.cart, req.session.user.userId)
                    }
                    catch (error) {
                        console.log(error.message)
                        return res.sendStatus(500)
                    }

                    return res.status(200).json({ productIndex: productInd, productId: validProduct.rows[0].product_id, size: validProduct.rows[0].size })
                }

                else {
                    return res.status(404).send("Product not found")
                }
            }
        }

        return res.status(401).send("Invalid index/size")
    }
    catch (error) {
        return res.sendStatus(500)
    }
}



const validateOrder = async (req, res, next) => {
    next()
}

const checkout = async (req, res) => {
    if (!req.session)
        return res.status(401).send('Unauthorized')


    if (req.session.hasOwnProperty('user') && !req.session.user.isSignedIn) {
        return res.status(401).send('Unauthorized');
    }

    if (!req.session.hasOwnProperty('cart')) {
        return res.status(401).send('Unauthorized');
    }


    else {
        let receipt = req.session.cart.map((item, ind) => delete item.product_id)
        req.session.cart = []
        const email = req.session.user.email

        sendOrderReceipt(email, receipt)
        res.status(200).send("Order Completed")
    }
}




module.exports = {
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
}