/* Create Database */
/* -------------------------------------- */

DROP DATABASE IF EXISTS drinkstogo_db;
CREATE DATABASE drinkstogo_db;

/* Use Database */
/* -------------------------------------- */
USE drinkstogo_db;

/* Create Tables */
CREATE TABLE customers (
    cid INT NOT NULL AUTO_INCREMENT,
    cust_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (cid)
);

/* Products */

CREATE TABLE products (
    pid INT NOT NULL AUTO_INCREMENT,
    prod_name VARCHAR(50) NOT NULL,
    type VARCHAR(10) NOT NULL,
	temp VARCHAR(5) NOT NULL,
    size VARCHAR(5) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    PRIMARY KEY (pid)
);

/* Orders */

CREATE TABLE orders (
    oid INT NOT NULL AUTO_INCREMENT,
    cid INT NOT NULL,
    order_name VARCHAR(50),
    ordered DATETIME NOT NULL,
    PRIMARY KEY (oid)
);

/* OrderItems*/

CREATE TABLE orderItems (
    id INT NOT NULL AUTO_INCREMENT,
    oid INT NOT NULL,
    pid INT NOT NULL,
    item_no INT NOT NULL,
    size VARCHAR(5),
    price DECIMAL(10 , 2 ) NOT NULL,
    ordered DATETIME NOT NULL,
    status VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);


/* Spotify Request Queue*/

CREATE TABLE songs (
    sid INT NOT NULL AUTO_INCREMENT,
    song_name VARCHAR(255) NOT NULL,
    song_url VARCHAR(255) NOT NULL,
	requested DATETIME NOT NULL,
    status VARCHAR(10) NOT NULL,
    PRIMARY KEY (sid)
);