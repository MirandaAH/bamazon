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

function showAllProducts () {
  connection.query("SELECT * FROM products", function (err,res) {
    if (err) throw err;
    for (var i=0; i < res.length; i++){
      console.log(res[i].item_id + " | " + res[i].product_name + " | " +res[i].price);
    }
  });
}


setTimeout(startQ, 1000);
function startQ (){
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
    connection.query("SELECT stock_quantity, price FROM products WHERE ?", {item_id: id}, function (err,res) {
      var stock = res[0].stock_quantity;
      let totalLeft = stock - units;
      let price = res[0].price;

      if (err) throw err;
      if (stock >= units){
        connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: totalLeft},{item_id: id}],
          function(err, res) {
            var total = price * units;
            console.log("Your order has been placed. Your total is $" + total);
            inquirer.prompt([
              {
                type: 'confirm',
                message: 'Would you like to make another purchase?',
                name: 'purchase'
              }
            ]).then(function(answer){
              if (answer.purchase === true){
                startQ();
              }else {
                return;
              }
            });
          }
        );
      } else{
        console.log("Insufficient quantity");
        startQ();
      }
    });
  });
}
