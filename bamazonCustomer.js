require('dotenv').config()
require('inquirer')
require('console.table')
const mysql      = require('mysql');
const key=require('./config/keys').db
const connection = mysql.createConnection(key);
 
connection.connect();
 
connection.query('select * from products;', (error, results) => {
  if (error) throw error;
  console.table(results);
});

 
connection.end();

