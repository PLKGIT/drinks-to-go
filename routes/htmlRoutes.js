var db = require("../models");

module.exports = function (app) {

  // Login HTML Route (Default)
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/splitscreen", function (req, res) {
    res.render("splitScreen");
  });

  app.get("/customers", function (req, res) {
    var customerList = {
      customer: []
    }
    db.Customer.findAll({
    }).then(function (dataCustomer) {
      for (var i = 0; i < dataCustomer.length; i++) {
        var currentCustomer = {
          cid: dataCustomer[i].dataValues.cid,
          name: dataCustomer[i].dataValues.cust_name,
          email: dataCustomer[i].dataValues.cust_email
        };
        console.log(dataCustomer[i].dataValues);
        customerList.customer.push(currentCustomer);
      };
      res.render("customers", customerList);
    });
  });

  // Menu HTML Route
  app.get("/menu", function (req, res) {

    var productsList = {
      products: []
    };

    db.Product.findAll({}).then(function (dataProduct) {
      for (var i = 0; i < dataProduct.length; i++) {
        var currentProduct = {
          pid: dataProduct[i].dataValues.pid,
          prod_name: dataProduct[i].dataValues.prod_name,
          size: dataProduct[i].dataValues.size,
          price: dataProduct[i].dataValues.price,
          type: dataProduct[i].dataValues.type,
          temp: dataProduct[i].dataValues.temp,
          check_hot: dataProduct[i].dataValues.check_hot
        };
        productsList.products.push(currentProduct);
      };
      res.render("menu", productsList);
    });
  });

  // Checkout HTML Route
  app.get("/checkout", function (req, res) {
    res.render("checkout");
  });

  // Employee HTML Route
  app.get("/employee", function (req, res) {
    res.render("employee");
  });

  // Orders HTML Route
  app.get("/orders", function (req, res) {
    var ordersList = {
      orders: []
    };
    db.OrderItem.findAll({}).then(function (dataOrders) {
      for (var i = 0; i < dataOrders.length; i++) {
        var currentOrder = {
          order: dataOrders[i].dataValues.oid,
          customer: dataOrders[i].dataValues.order_name,
          item: dataOrders[i].dataValues.item_no,
          description: dataOrders[i].dataValues.prod_name,
          size: dataOrders[i].dataValues.size,
          price: dataOrders[i].dataValues.price,
          qty: dataOrders[i].dataValues.qty
        };
        ordersList.orders.push(currentOrder);
      };
      res.render("orders", ordersList);
    });
  });

  // Products HTML Route
  app.get("/products", function (req, res) {
    var productsList = {
      products: []
    };

    db.Product.findAll({}).then(function (dataProduct) {
      for (var i = 0; i < dataProduct.length; i++) {
        var currentProduct = {
          id: dataProduct[i].dataValues.pid,
          prod_name: dataProduct[i].dataValues.prod_name,
          size: dataProduct[i].dataValues.size,
          price: dataProduct[i].dataValues.price,
          type: dataProduct[i].dataValues.type,
          temp: dataProduct[i].dataValues.temp
        };
        productsList.products.push(currentProduct);
      };
      res.render("products", productsList);
    });
  });

  // Order Status HTML Route
  app.get("/status", function (req, res) {
    var drinkQueue = {
      list: []
    }
    db.OrderItem.findAll({
      where: {
        complete: 0
      }
    }).then(function(data) {
      console.log("--Console Logging Data---")
      console.log(data[0]);
      for (var j = 0; j < data.length; j++) {
        var allOrders = {
          order_number: data[j].dataValues.oid,
          order_name: data[j].dataValues.order_name,
          description: data[j].dataValues.prod_name,
          size: data[j].dataValues.size,
          status: data[j].dataValues.status,
          ready: data[j].dataValues.ready
        };
        console.log("CUSTNAME" + data[j].dataValues.order_name);
        console.log(data[j].dataValues);
        drinkQueue.list.push(allOrders);
      };
      res.render("status", drinkQueue);
      console.log("--Console Logging OrderHistory---")
      console.log(drinkQueue);
    });
  });

  // 404 HTML Route
  app.get("*", function (req, res) {
    res.render("404");
  });
};