require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const userRoutes = require('./api/routes/userRoutes.js')
const productRoutes = require('./api/routes/productRoutes.js')


const HTTP_PORT = process.env.PORT || 8080;
//app.set("trust proxy", 1)

// Set up static folder for express to use
app.use(express.static(path.join(__dirname, '/public')));

// Configuring express session middleware
app.use(cors({ origin: 'https://housoku.netlify.app', credentials: true }));
app.use(bodyParser.json());

app.use('/api', userRoutes.routes, productRoutes.routes)


app.listen(HTTP_PORT, () => console.log(`Server listening on: ${HTTP_PORT}`));