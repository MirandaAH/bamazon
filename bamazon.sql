DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(300) NOT NULL,
  department_name VARCHAR(300) NOT NULL,
  price DECIMAL(11, 2),
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY(item_id)
);

SELECT * FROM products;


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bacon", "Deli",  9.99, 200);
