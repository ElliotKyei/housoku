const express = require('express');
const path = require('path');
const app = express();
const { Client, Pool } = require('pg')
const HTTP_PORT = process.env.PORT || 8080;

// Configurations for database connection (Postgres)
const client = new Client({
    user: 'ElliotKyei',
    password: 'abc123',
    host: 'localhost',
    port: 5432,
    database: 'Housoku'
})

// Connect to database

client.connect((err) => {

    if (err) {
        console.error("Error connecting to the database");
        return;
    }
    else {
        console.log("Database connection established")

        let dbQuery = client.query("SELECT * FROM PRODUCTS", (err, res) => {
            if (err)
                console.error(err.message)
            else
                console.log(res.rows)

            client.end();
        })
    }
})

// Set up static folder for express to use

app.use(express.static(path.join(__dirname, '../frontend/public')));

/* app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/Home.html'));
})
 */
app.listen(HTTP_PORT, () => console.log(`Server listening on: ${HTTP_PORT}`));


