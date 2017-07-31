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
  startManager();
});


function startManager(){
  inquirer.prompt([
    {
      type: "list",
      message: "Menu Options",
      name: "action",
      choices:["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
      default: 0
    }
  ]).then(function(answers){
    switch(answers.action){
      case "View Products For Sale":
        viewProducts();
        break;
      case "View Low Inventory":
        viewLowInventory();
        break;
      case "Add to Inventory":
      showAllProducts();
      setTimeout(addInventory, 1000);
        break;
      case "Add New Product":
        addNewProduct();
        break;
  }
});
}

function viewProducts() {
  connection.query("SELECT * FROM products", function (err, res){
    if (err) throw err;
    for (var i=0; i < res.length; i++){
      console.log(res[i].item_id + " | " + res[i].product_name + " | " +res[i].price + " | " + res[i].stock_quantity);
    }
    startManager();
  });
}

function viewLowInventory () {
  connection.query("SELECT * FROM products WHERE stock_quantity <= ?",[5], function(err, res){
    if (err) throw err;
    for (var i=0; i < res.length; i++){
      console.log(res[i].item_id + " | " + res[i].product_name + " | " +res[i].price + " | " + res[i].stock_quantity);
    }
    startManager();
  });
}

function showAllProducts () {
  connection.query("SELECT * FROM products", function (err,res) {
    if (err) throw err;
    for (var i=0; i < res.length; i++){
      console.log(res[i].item_id + " | " + res[i].product_name + " | " +res[i].price+ " | " + res[i].stock_quantity);
    }
  });
}



function addInventory () {
  inquirer.prompt([
    {
      type:"input",
      message: "What is the ID of the product you'd like to change the stock quantity of?",
      name: "id"
    },
    {
      type: "input",
      message: "What is the new stock quantity?",
      name: "quantity"
    }
  ]).then(function(user){
    var id = user.id;
    var quantity = user.quantity;
    connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: quantity},{item_id: id}],
      function(err, res) {
        console.log("The stock quanitity has been changed to " + quantity);
        showAllProducts();
        setTimeout(startManager,1000);
    });

  });

}

function addNewProduct () {
 inquirer.prompt([
   {
     type: "input",
     message: "What is the name of the product?",
     name: "name"
   },
   {
     type: "input",
     message: "What is the department name for this product?",
     name: "department"
   },
   {
     type: "input",
     message: "What is the price for this product?",
     name: "price"
   },
   {
     type: "input",
     message: "What is the stock quantity of this product?",
     name: "stock"
   }
 ]).then(function(user){
   var name = user.name.toString();
   var department = user.department.toString();
   var price = user.price;
   var stock = user.stock;
   connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)",
   [name, department, price, stock], function(err, res){
     console.log('Product inserted!');
     showAllProducts();
       setTimeout(startManager,1000);
   });
 });
}
