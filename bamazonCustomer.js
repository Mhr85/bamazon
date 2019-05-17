var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table3');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'MihirPatel85',
  database: 'bamazon'
});

connection.connect(function(err){
  if (err) throw err;
  //console.log('Database created');
  allProducts();
});

function allProducts() {
  connection.query('SELECT id, product_name, price FROM products', function(err, res) {
    if (err) throw err;
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    var table = new Table ({
      head: ['ID', 'Web Development Books', 'Price'],
      colWidth: [7, 60, 7],
      colAligns: ['center', 'left', 'right'],
      style: {
        head: ['red'],
        compact: true
      },
      chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
      , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
      , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
      , 'right': '║' , 'right-mid': '╢' , 'middle': '╢' }
    });
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].product_name, res[i].price]);
    }
    console.log(table.toString());
    checkout();
  });
  //connection.end();
};

function checkout() {
  inquirer.prompt ([
    {
      name: 'checkout',
      type: 'input',
      message: 'Enter the ID of the product you would like to purchase'
    }
  ]).then(function(answer) {
    var userSelection = answer.checkout;
    connection.query('SELECT * FROM products WHERE id=?', userSelection, function(err, res) {
      if (err) throw err;

      if (res.length === 0) {
        console.log('Insufficient quantity!');
        checkout();
      } else {
        inquirer.prompt ([
          {
            name: 'productQuantity',
            type: 'input',
            message: 'How many items would you like to purchase?'
          }
        ]).then(function(answer) {
          var quantity = answer.productQuantity;

          if (quantity > res[0].stock_quantity) {
            console.log('Available quantity are ' + res[0].stock_quantity);
            checkout();
          } else {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.log(res[0].product_name + 'Purchased.');
            console.log(quantity + 'qty @ $' + res[0].price);

            var total = quantity * res[0].price;
            console.log('Sales total: $ ' + total);
            var newQuantity = res[0].stock_quantity - quantity;
            connection.query('UPDATE products SET stock_quantity = ' + newQuantity + ' WHERE id = ' + res[0].id, function(err, resUpdate) {
              if (err) throw err;
              console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
              console.log('Your order has been processed');
            });
            connection.end();
          }
        });
      }
    });
  });
};
