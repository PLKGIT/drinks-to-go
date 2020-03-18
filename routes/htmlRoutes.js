var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Customer.findAll({}).then(function(data) {
      res.render("index", {
        customer: data
      });
      console.log(data);
    });
  });

  app.get("/menu", function(req, res) {
    db.Product.findAll({}).then(function(data) {
      res.render("menu", {
        product: data,
        order: data,
        orderitem
      });
      console.log(data);
    });
  });


  app.get("/checkout", function(req, res) {
    db.Order.findAll({}).then(function(data) {
      res.render("checkout", {
        order: data
      });
      console.log(data);
    });
  });

  app.get("/status", function(req, res) {
    db.OrderItem.findAll({}).then(function(data) {
      res.render("status", {
        order: data,
        orderitem: data,
        song: data
      });
      console.log(data);
    });
  });

  app.get("/employee", function(req, res) {
    db.Spotify.findAll({}).then(function(data) {
      res.render("employee", {
        order: data,
        orderitem: data,
        song: data
      });
      console.log(data);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
