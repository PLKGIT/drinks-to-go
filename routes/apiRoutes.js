var db = require("../models");

module.exports = function (app) {

  // Customers API Get Route
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
  // Products API Get Route
  app.get("/api/products", function (req, res) {
    db.Product.findAll({}).then(function (data) {
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
};