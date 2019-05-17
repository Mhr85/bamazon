DROP DATABASE IF NOT EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products  (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255),
  department_name VARCHAR(255),
  price DECIMAL,
  stock_quantity INT DEFAULT 0,
  PRIMARY KEY (id)
);
