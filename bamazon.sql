-- DROP DATABASE IF EXISTS bamazon;
-- 
-- CREATE DATABASE bamazon;

-- USE bamazon;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(300) NOT NULL,
  department_name VARCHAR(300) NOT NULL,
  price DECIMAL(11, 2),
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY(item_id)
);

SELECT * FROM products;

-- DROP TABLE products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bacon", "Deli",  9.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", "Electronics",  749.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sneakers", "Shoes",  29.99, 200);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pants", "Clothing",  19.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Milk", "Dairy",  4.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bread", "Bakery",  5.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scissors", "Office Supplies",  4.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Window Cleaner", "Cleaning Supplies",  9.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk", "Office Furniture",  119.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Air pump", "Automotive",  14.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hot Cheetos", "Chips",  1.29, 200);

ALTER TABLE products
ADD product_sales DECIMAL;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(200) NOT NULL,
  over_head_costs INT(200) NOT NULL,
  PRIMARY KEY(department_id)
);
-- 
-- DROP TABLE departments;

SELECT * FROM departments;

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Office Supplies', 2999);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Bakery', 2999);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Automotive', 2999);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Office Furniture', 2999);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Clothing', 2999);

-- SELECT products.product_sales, products.department_name, departments.department_name, departments.department_id, departments.over_head_costs
-- FROM products
-- INNER JOIN departments
-- ON products.department_name=departments.department_name;
-- 
--  
-- DELETE FROM products
-- WHERE item_id = 16;