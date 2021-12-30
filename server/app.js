const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require ('path');
// const dbService = require('./database');
const fs = require('fs');

dotenv.config(); // grabbing environment variables

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, './../public'))); // serving the public folder as a website

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.get('/getAll', (request, response) => {

    // Process products.json data here
    const data = require("./products"); // Reading JSON file
    response.json({data : data});

    // const db = dbService.getDatabaseInstance();
    // const result = db.getAllData();
    // result.then(data => response.json({data : data}))
    //    .catch(err => console.log("Error: " + err));

}) // get all data from database

/*
function writeToFile(data) {
    
    fs.writeFile("./products.json",  JSON.stringify(data), (err) => {
        // Error checking
        if (err) throw err;
        console.log("New data added");
    });
} */

app.get('/search/:search_key', (request, response) => {

   const { search_key } = request.params;


   const product = require("./products");
   // products.forEach(( drink) => {
        
   //      if (drink.prod_name.includes(search_key)){
   //          console.log(`name : ${drink.prod_name}`)
   //      }

   // })

   const data = product.filter((drink) => drink.prod_name.toUpperCase().includes(search_key.toUpperCase())) 

   response.json({data});

   // const db = dbService.getDatabaseInstance();
   // const result = db.searchByName(search_key);


    
  //  result
   // .then(data => response.json({data : data}))
   // .catch(err => console.log("Error: " + err));
}) // get search results, pass as json

const PORT = process.env.PORT || 5000; // using port 5000 if no PORT env var has been specified
app.listen(PORT , () => console.log(`Listening on localhost:[${PORT}]`));