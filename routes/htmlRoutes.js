var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/customers", function(req, res) {
    // console.log("---This is Get Request---");
    db.Customer.findAll({}).then(function(data) {
      console.log("---This is Customers Database---");
      console.log(data[0].dataValues);
      var listCustomers = {
        customers: data[0]
      };
      console.log("---This is List Customers---");
      console.log(listCustomers);
      res.render("customers", listCustomers);
    });
  });

  app.get("/menu", function(req, res) {
    db.Order.findAll({
      where: {
        cid: 3
      },
      include: [db.OrderItem]
    }).then(function(dbOrder) {
      for (var i = 0; i < dbOrder.length; i += 1) {
        for (var j = 0; j < dbOrder[i].OrderItems.length; j++) {
          var currentOrder = {
            order: dbOrder[i].dataValues.OrderItems[j].oid,
            item: dbOrder[i].dataValues.OrderItems[j].item_no,
            description: dbOrder[i].dataValues.OrderItems[j].prod_name,
            size: dbOrder[i].dataValues.OrderItems[j].size,
            price: dbOrder[i].dataValues.OrderItems[j].price,
            qty: dbOrder[i].dataValues.OrderItems[j].qty
          };
          orderHistory.history.push(currentOrder);
        }
      }
      console.log("---Show Me the Money---");
      console.log(orderHistory);
      res.render("menu", orderHistory);
    });
  });

  app.get("/checkout", function(req, res) {
    res.render("checkout");
  });

  app.get("/status", function(req, res) {
    res.render("status");
  });

  app.get("/employee", function(req, res) {
    res.render("employee");
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};