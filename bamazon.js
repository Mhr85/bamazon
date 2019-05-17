var mysql = require('mysql');
var inquirer = require('inquirer');
var TABLE = require('cli-table3');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'MihirPatel85',
  database: 'bamazon'
});

connection.connect(function(err){
  if (err) throw err;
  console.log('Database created');
});
