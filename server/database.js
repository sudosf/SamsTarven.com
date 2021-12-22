const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

const connection = mysql.createConnection({
  // database log in details, in .env file
  host: process.env.localhost, 
  user: 'root', 
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect(err => {
    if (err)
      return console.error("Error: " + err.message);
  
      console.log('Connected to the MySQL Server!');
});

class database {

  static getDatabaseInstance() {
    return instance ? instance : new database();
  }

  async getAllData() {

    try {
      const response = await new Promise((resolve, reject) => {

        const query = "SELECT * FROM products";

        connection.query(query, (err, results) =>{
          if (err) 
            reject(new Error(err.message));

          resolve(results);
        });
      });

      // console.log(response);
      return response;
    } catch (error) { console.log( "Error: " + error.message); }
  }

  async searchByName(search_key) {
    
    try {
      const response = await new Promise((resolve, reject) => {

        const query = "SELECT * FROM products WHERE prod_name like '%"+ search_key +"%'";

        connection.query(query, (err, results) => {
          if (err) 
              reject(new Error(err.message));

            resolve(results);
         });
      });

      return response;
    } catch (error) { console.log( "Error: " + error.message); }
  }

  // methods for insert, update and delete to be implemented

} // database query methods

module.exports = database;

