const Pool = require('pg-pool')

// Configurations for database connection (Postgres)

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

// Connect to database

db.connect((err) => {
    if (err) {
        console.log("Error connecting to the database")
        return
    }

    console.log("Database connection established")
})


module.exports = db

