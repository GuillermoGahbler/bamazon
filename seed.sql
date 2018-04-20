drop database if exists bamazon_db;

CREATE DATABASE if not exists bamazon_db;

use bamazon_db;

 CREATE TABLE products (
item_id INT (4) primary key not null AUTO_INCREMENT,
product_name VARCHAR (100) UNIQUE NOT NULL,
department_name VARCHAR (100) NOT NULL,
price decimal(5,2) default 0.00,
stock_quantity INTEGER (4) default 0, 
check (stock_quantity >=0 and stock_quantity <101)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Milk", "Groceries", 2.99,100),
("Cereal", "Groceries", 5.99,97),
("Motor Oil", "Auto", 6.99,50),
("Paper Towels", "Household Goods", 2.99,80),
("Tooth Paste", "Personal Care", 7.99,56),
("Sleeping Bag", "Sporting Goods", 14.97,30),
("Eggs", "Groceries", 3.47,35),
("Dog Food", "Pets", 21.23,47),
("Shampoo", "Personal Care", 4.97,25),
("AA Batteries", "Electronics", 10.36,100),
("Bicycle","Sporting Goods",89.63,0);

SELECT*FROM products;
