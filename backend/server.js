require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const userRoutes = require('./api/routes/userRoutes.js')
const session = require('express-session')
const pgSessions = require('connect-pg-simple')
const HTTP_PORT = process.env.PORT || 8080;

// Set up static folder for express to use
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Configuring express session middleware

app.use(session({
    store: {

    },
    secret: process.env.SESSION_SECRET,
    resave: 'false',
    saveUninitialize: 'false',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }

}))

app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes.routes)

app.listen(HTTP_PORT, () => console.log(`Server listening on: ${HTTP_PORT}`));


