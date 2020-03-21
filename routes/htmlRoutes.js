var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/customers", function (req, res) {
    // console.log("---This is Get Request---");
    db.Customer.findAll({}).then(function (data) {
      console.log("---This is Customers Database---");
      // console.log(data.dataValues);
      var listCustomers = {
        customers: data[0]
      };
      console.log("---This is List Customers---");
      console.log(listCustomers);
      res.render("customers", listCustomers);
    });
  });

  app.get("/menu", function(req, res) {
    var orderHistory = {
      history: []
    }
    db.OrderItem.findAll({
      where: {
        cid: 3
      }
    }).then(function(data) {
      // console.log("--Console Logging Data---")
      // console.log(data[0]);
      for (var j = 0; j < data.length; j++) {
        var currentOrder = {
          order: data[j].dataValues.oid,
          item: data[j].dataValues.item_no,
          description: data[j].dataValues.prod_name,
          size: data[j].dataValues.size,
          price: data[j].dataValues.price,
          qty: data[j].dataValues.qty
        };
        console.log(data[j].dataValues);
        orderHistory.history.push(currentOrder);
      };
      res.render("menu", orderHistory);
      console.log("--Console Logging OrderHistory---")
      console.log(orderHistory);
    });
  });

  app.get("/checkout", function (req, res) {
    res.render("checkout");
  });

  app.get("/status", function (req, res) {
    res.render("status");
  });

  app.get("/employee", function (req, res) {
    res.render("employee");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
