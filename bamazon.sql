CREATE DATABASE bamazon;
DROP DATABASE IF EXISTS bamazon;
USE bamazon;

CREATE TABLE products(
	itemid INTEGER NOT NULL,
    productname VARCHAR(45) NOT NULL,
    departmentname VARCHAR(45) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
    stockquantity INTEGER(10) NOT NULL,
    PRIMARY KEY (itemid)
);


INSERT INTO products(ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Echo Dot","Amazon Devices",29.99,200),
	("Kindle","Amazon Devices",129.99,100),
    ("Lenovo Chromebook","Laptops",259.99,75),
    ("Apple MacBook Air","Laptops",749.99,50),
    ("Lenovo Chromebook","Laptops",259.99,75),
    ("Game of Thrones","Books",39.99,150),
    ("Nintendo Switch","Video Games",299.99,25),
    ("Fancy Feast","Pet Supplies",14.70,500),
    ("HP Envy","Office Products",119.99,50),
    ("Nike T-shirt","Clothing",24.99,20);
    
SELECT * FROM bamazon.products;