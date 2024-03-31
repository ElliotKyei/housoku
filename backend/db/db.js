const { Pool } = require('pg')

// Configurations for database connection (Postgres)

const db = new Pool({
    user: 'ElliotKyei',
    password: 'abc123',
    host: 'localhost',
    port: 5432,
    database: 'Housoku'
})

// Connect to database

db.connect((err) => {
    if (err) {
        console.log("Error connecting to the database")
    }

    console.log("Database connection established")
})


module.exports = db

