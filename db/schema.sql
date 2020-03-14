/* Create Database */

DROP DATABASE IF EXISTS drinkstogo_db;
CREATE DATABASE drinkstogo_db;

/* USE Database */

USE drinkstogo_db;

/* Create Tables */

/* Products */

CREATE TABLE products (
    pid INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    cost DECIMAL(10 , 2 ) NOT NULL,
    stock INT NOT NULL,
    available BOOLEAN,
    prep DATETIME,
    PRIMARY KEY (pid)
);

/* price = could change over time */
/* cost = overhead cost this could change over time */
/* prep = time in minutes to prepare */


/* Customers */

CREATE TABLE customers (
    cid INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    favorite INT NULL,
    PRIMARY KEY (cid)
);

/* favorite = hold pid for favorite drink?? */
/* password = should we be storing that?? */

/* Orders */

CREATE TABLE orders (
    oid INT NOT NULL AUTO_INCREMENT,
    cid INT NOT NULL,
    pid INT NOT NULL,
    qty INT NOT NULL,
    price DECIMAL(10 , 2 ) NULL,
    cost DECIMAL(10 , 2 ) NULL,
    ordered DATETIME NOT NULL,
    prep DATETIME NOT NULL,
    state VARCHAR(10),
    PRIMARY KEY (oid)
);

/* price = price at the time of purchase */
/* cost = overhead cost at the time of purchase */
/* state = order state -> pending, ready, or fulfilled */
/* pending = will appear on order pending list */
/* ready = will appear on order ready for pickup list */
