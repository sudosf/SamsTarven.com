const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const dbService = require('./database');
dotenv.config();

const fs = require('fs');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

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

  //  const { search_key } = request.params;

   // const db = dbService.getDatabaseInstance();
   // const result = db.searchByName(search_key);
    
  //  result
   // .then(data => response.json({data : data}))
   // .catch(err => console.log("Error: " + err));
}) // get search results, pass as json

app.listen(process.env.PORT, () => console.log("Server Started!"));