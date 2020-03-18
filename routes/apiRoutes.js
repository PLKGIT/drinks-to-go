var db = require("../models");

module.exports = function (app) {
  app.get("/api/customers", function (req, res) {
    db.Customer.findAll({}).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });

  app.get("/api/products", function (req, res) {
    db.Product.findAll({}).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });

  app.get("/api/orders", function (req, res) {
    db.Order.findAll({}).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });

  app.get("/api/orderitems", function (req, res) {
    db.OrderItem.findAll({}).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });

  app.get("/api/songs", function (req, res) {
    db.Song.findAll({}).then(function (data) {
      res.json(data);
    });
  });

  app.post("/api/customers", function (req, res) {
    db.Customer.create(req.body).then(function (data) {
      res.json(data);
    });
  });

  app.post("/api/orders", function (req, res) {
    db.Order.create(req.body).then(function (data) {
      res.json(data);
    });
  });

  app.post("/api/orderitems", function (req, res) {
    db.OrderItem.create(req.body).then(function (data) {
      res.json(data);
    });
  });

  app.put("/api/orderitems", function (req, res) {
    db.OrderItem.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (data) {
        res.json(data);
      });
  });

  app.post("/api/song", function (req, res) {
    db.Song.create(req.body).then(function (data) {
      res.json(data);
    });
  });


  app.put("/api/spotify", function (req, res) {
    db.Spotify.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (data) {
        res.json(data);
      });
  });
};