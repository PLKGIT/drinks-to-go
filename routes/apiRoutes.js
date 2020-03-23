var db = require("../models");
// var sequelize = require('sequelize');
var Spotify = require('node-spotify-api');
// var keys = require("../keys.js")
// var spotify = new Spotify(keys.spotify);

module.exports = function (app) {

  app.get("/api/customers/:cust_email", function(req, res){
    db.Customer.findOne({
      where: {
        cust_email: req.params.cust_email
      }
      }).then(function(dbCustomerEmails){
        res.json(dbCustomerEmails);
        console.log("+++++++++++ customer email received.....");
        console.log(dbCustomerEmails);
      });
    });

  // app.get("/api/customers/:cust_email", function(req, res){
  //   var query={}
  //   if (req.query.cust_email){
  //     query.cust_email = req.query.cust_email;
  //   }
  //   db.Customer.findOne({
  //     where:query
  //     }).then(function(dbCustomerEmails){
  //       res.json(dbCustomerEmails);
  //       console.log("+++++++++++ customer email received.....");
  //       console.log(dbCustomerEmails);
  //     });
  //   });
    
  app.get("/api/customers", function (req, res) {
    db.Customer.findAll({}).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });
  // Orders API Get Route
  app.get("/api/orders/:cid", function (req, res) {
    db.Order.findAll({
      where: {
        cid: req.params.cid
      },
      include: db.OrderItem
    }).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });
  // Order Items API Get Route
  app.get("/api/orderitems/:cid", function (req, res) {
    db.OrderItem.findAll({
      where: {
        cid: req.params.cid
      }
    }).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });
  // Products by PID API Get Route
  app.get("/api/products/:pid", function (req, res) {
    db.Product.findOne({
      where: {
        pid: req.params.pid
      }
    }).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });
  // Songs API Get Route
  app.get("/api/songs", function (req, res) {
    db.Song.findAll({}).then(function (data) {
      res.json(data);
    });
  });
  // Customers API Post Route
  app.post("/api/customers", function (req, res) {
    db.Customer.create({
      cust_name: req.body.cust_name,
      cust_email: req.body.cust_email
    }).then(function (dbCustomer) {
      console.log(dbCustomer);
      res.json(dbCustomer);
    });
  });
  // Orders API Post Route
  app.post("/api/orders", function (req, res) {
    db.Order.create(req.body).then(function (data) {
      res.json(data);
    });
  });
  // Order Items API Post Route
  app.post("/api/orderitems", function (req, res) {
    db.OrderItem.create(req.body).then(function (data) {
      res.json(data);
    });
  });
  // Order Items API Put Route
  app.put("/api/orderitems", function (req, res) {
    db.OrderItem.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });
  // Songs API Post Route
  app.post("/api/songs", function (req, res) {
    db.Song.create(req.body).then(function (data) {
      res.json(data);
    });
    console.log(req.body.song)
  });

  // Songs API Put Route
  app.put("/api/songs", function (req, res) {
    db.Spotify.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  app.post("/api/spotify", function(req, res) {
    console.log("req.body from POST is below");
    var song = req.body.spotifyThis;
    console.log(song);
    spotify.search({ type: "track", query: song }, function(err, data) {
      res.json(data);
    });
  });
};