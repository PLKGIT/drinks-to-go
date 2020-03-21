var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
    // db.Customer.findAll({}).then(function(data) {
    //   res.render("index", {
    //     // customers: data
    //   });
    // });
  });

  app.get("/menu", function(req, res) {
    res.render("menu");
    // db.Product.findAll({}).then(function(data) {
      // res.render("menu", {
      //   products: data,
      //   orders: data,
      //   orderitems:data
      // });
    // });
  });


  app.get("/checkout", function(req, res) {
    res.render("checkout");
    // db.Order.findAll({}).then(function(data) {
      // res.render("checkout", {
      //   order: data
      // });
    // });
  });

  app.get("/status", function(req, res) {
    res.render("status");
    // db.OrderItem.findAll({}).then(function(data) {
      // res.render("status", {
      //   orders: data,
      //   orderitems: data,
      //   song: data
      // });
    // });
  });

  app.get("/employee", function(req, res) {
    res.render("employee");
    // db.Song.findAll({}).then(function(data) {
      // res.render("employee", {
      //   orders: data,
      //   orderitems: data,
      //   song: data
      // });
    // });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
