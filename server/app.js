const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require ('path');
const fs = require('fs');

dotenv.config(); // grabbing environment variables

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// serving the public folder as a website
app.use(express.static(path.join(__dirname, './../public'))); 

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.get('/getAll', (request, response) => {

    const data = require("./products"); // Reading JSON file
    response.json({data : data});

}) // get all data

app.get('/search/:search_key', (request, response) => {

   const { search_key } = request.params;

   const product = require("./products");
   const data = product.filter((drink) => 
            drink.prod_name.toUpperCase().includes(search_key.toUpperCase())); 

   response.json({data});
}) // get search results, pass as json

const PORT = process.env.PORT || 5000; // using port 5000 if no PORT env var has been specified
app.listen(PORT , () => console.log(`Server Started!\nListening on localhost:[${PORT}]`));