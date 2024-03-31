const db = require('../../db/db.js')
const asyncHandler = require('express-async-handler')
const argon2 = require('argon2');
const { v4: uuidv4 } = require('uuid')
const sendWelcomeEmail = require('../../mailJet.js')

if (!db) {
    throw new Error("API encountered an error initializing database")
}

// Hash user password

const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password)
        return hashedPassword;
    }
    catch (err) {
        return err;

    }
}

// reformName

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

// Add a user to the database (userController)

const addUser = async (req, res) => {
    if (req.body) {
        let { email, firstName, lastName, password } = req.body;

        firstName = refactorFinalTextInput(firstName, true);
        lastName = refactorFinalTextInput(lastName, true);
        email = refactorFinalTextInput(email, false);

        try {

            const result = await db.query("SELECT email FROM users WHERE email = $1", [email]);

            if (result.rowCount !== 0) {
                res.status(500).json({ alreadyExists: 'Account already exists' });
            }

            else {

                const query = 'INSERT INTO users (user_id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)';
                const userId = uuidv4();
                let hashedPassword = ""
                hashedPassword = await hashPassword(password);

                if (hashedPassword instanceof Error) {
                    throw new Error("Error has occurred");
                }

                const values = [userId, firstName, lastName, email, hashedPassword];
                await db.query(query, values);
                const fullName = `${firstName} ${lastName}`
                sendWelcomeEmail(email, fullName)
                res.status(201).json({ message: 'User successfully added' })

            }
        }
        catch (err) {
            res.status(500).json({ 'error': err.message })
        }
    }
}

module.exports = {
    addUser
}