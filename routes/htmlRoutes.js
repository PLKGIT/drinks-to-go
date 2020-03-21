var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/menu", function (req, res) {
    var orderHistory = {
      history: []
    };
    db.Order.findAll({
      where: {
        cid: 3
      },
      include: db.OrderItem
    }).then(function (dbOrder) {
      for (var i = 0; i < dbOrder.length; i += 1) {
        for (var j = 0; j < dbOrder[i].OrderItems.length; j++) {
          var currentOrder = {
            order: dbOrder[i].dataValues.OrderItems[j].oid,
            item: dbOrder[i].dataValues.OrderItems[j].item_no,
            description: dbOrder[i].dataValues.OrderItems[j].prod_name,
            size: dbOrder[i].dataValues.OrderItems[j].size,
            price: dbOrder[i].dataValues.OrderItems[j].price,
            qty: dbOrder[i].dataValues.OrderItems[j].qty
          }
          orderHistory.history.push(currentOrder)
        }
      }
      res.render("menu", {drinks:orderHistory});
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
