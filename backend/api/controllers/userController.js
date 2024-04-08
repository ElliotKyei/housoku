const db = require('../../db/db.js')
const argon2 = require('argon2');
const { v4: uuidv4 } = require('uuid')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const pgPool = require('pg-pool')
const sendWelcomeEmail = require('../../mailJet.js')

if (!db) {
    throw new Error("API encountered an error initializing database")
}

// Hash user password

const hashPassword = async (password) => {
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

// Add a user to the database (userController)

const addUser = async (req, res, next) => {
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
                hashedPassword = await hashPassword(password);

                if (hashedPassword instanceof Error) {
                    throw new Error("Error has occurred");
                }

                // Add user info to database and send welcome email

                const query = 'INSERT INTO users (user_id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)';
                const values = [userId, firstName, lastName, email, hashedPassword];
                await db.query(query, values);

                const fullName = `${firstName} ${lastName}`
                //sendWelcomeEmail(email, fullName)
                res.status(201).json({ message: 'User successfully added' })
            }
        }
        catch (err) {
            res.status(500).json({ 'error': err.message })
        }
    }
}

// Verify login details (verify email is within system & given password matches with corresponding password hash within account)

const verifyLogin = async (req, res) => {
    let { email, password } = req.body

    // Refactor email (mainly removing whitespaces) and check if email exists

    email = refactorFinalTextInput(email)
    let validEmail = false;

    try {
        validEmail = await validateEmail(email)
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
        return
    }


    if (!validEmail) {
        res.status(404).json({ error: "Account does not exist" })
        return
    }

    if (validEmail) {
        // Email is within system. Validate if password matches

        let validPassword = false

        try {
            validPassword = await validatePassword(email, password)
        }
        catch (error) {
            res.status(500).json({ error: "Password Internal Server Error" })
            return
        }

        if (!validPassword) {
            res.status(404).json({ error: "The email or password was incorrect" })
            return
        }

        if (validPassword) {

            req.session.user = { isLoggedIn: true }
            res.status(200).send("User has successfully signed in")
        }


    }
}

const authenticateUser = (req, res) => {

    if (!req.session || !req.session.user || !req.session.user.isLoggedIn) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    res.status(200).send(req.session.user);
}





module.exports = {
    addUser,
    verifyLogin,
    authenticateUser
}