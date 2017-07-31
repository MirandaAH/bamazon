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
  startSupervisor();
});

function startSupervisor () {
  inquirer.prompt([
    {
      type:"list",
      message: "Supervisor Menu",
      choices: ["View Product Sales by Department", "Create New Department"],
      name: 'action',
      default: "View Product Sales by Department"
    }
  ]).then(function(user){
    if (user.action === "View Product Sales by Department"){
      connection.query("SELECT products.product_sales, products.department_name, departments.department_name, departments.department_id, departments.over_head_costs FROM products INNER JOIN departments ON products.department_name=departments.department_name",function(err,res){
        console.log('ID|Name|Overhead|Sales|Total Profit');
        for (var i=0; i < res.length; i++){
          var total_profit = res[i].over_head_costs - res[i].product_sales;
          console.log(res[i].department_id + " | "
          +res[i].department_name + " | " +
          res[i].over_head_costs + " | "+
          res[i].product_sales + " | " +
          total_profit);
        }
        startSupervisor();
      });
    } else if (user.action === 'Create New Department'){
      inquirer.prompt([
        {
          type: "input",
          message:"What is the department name?",
          name: 'name'
        },
        {
          type: "input",
          message: "What are the overhead costs?",
          name: 'overhead'
        }
      ]).then(function(user){
        var name = user.name;
        var cost = user.overhead;
        connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?,?)", [name, cost], function (err, res) {
          console.log('The department has been added.');
          startSupervisor();
        });

      });
    }
  });
}
