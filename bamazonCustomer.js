var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err){
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showAllProducts();
});

//Function to display all products
function showAllProducts () {
  connection.query("SELECT * FROM products", function (err,res) {
    if (err) throw err;
    for (var i=0; i < res.length; i++){
      console.log(res[i].item_id + " | " + res[i].product_name + " | " +res[i].price + " | " + res[i].stock_quantity);
    }
  });
}
//timeout to start questions after products are displayed
setTimeout(startCustomer, 1000);


function startCustomer (){
  inquirer.prompt([
    {
      type: "input",
      message: "What is the ID of the item you'd like to purchase?",
      name: "id"
    },
    {
      type: "input",
      name: "units",
      message: "How many units would you like to purchase?",
      default: 1
    }
  ]).then(function(answers){
    let id = answers.id,
     units = answers.units;
    connection.query("SELECT stock_quantity, price, product_sales FROM products WHERE ?", {item_id: id}, function (err,res) {
      var stock = res[0].stock_quantity;
      let price = res[0].price;
      let totalLeft = stock - units;
      var priceTotal = price * units;
      var salesTotal = res[0].product_sales + priceTotal;

      if (err) throw err;
      //If the there is enough of the product in stock, it will proceed query
      if (stock >= units){
        connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: totalLeft,product_sales: salesTotal},{item_id: id}],
          function(err, res) {
            console.log("Your order has been placed. Your total is $" + priceTotal);
            inquirer.prompt([
              {
                type: 'confirm',
                message: 'Would you like to make another purchase?',
                name: 'purchase'
              }
            ]).then(function(answer){
              showAllProducts();
              if (answer.purchase === true){

                startCustomer();
              }else {
                return;
              }
            });
          }
        );
      //If there is NOT enough of the product in stock, it will console log an appropriate response
      } else{
        console.log("Insufficient quantity");
        startCustomer();
      }
    });
  });
}
