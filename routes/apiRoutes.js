// Required
//---------------------------------------
var db = require("../models");
var Spotify = require('node-spotify-api');
var keys = require("../keys.js")

// Spotify Keys Propagation
//---------------------------------------
var spotify = new Spotify(keys.spotify);

// API Routes
//---------------------------------------
module.exports = function (app) {

  // Customers API Get Route
  app.get("/api/customers", function (req, res) {
    db.Customer.findAll({}).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });

  // Customers API Get Route by Customer Email
  app.get("/api/customers/:cust_email", function (req, res) {
    db.Customer.findOne({
      where: {
        cust_email: req.params.cust_email
      }
    }).then(function (dbCustomerEmails) {
      res.json(dbCustomerEmails);
      console.log("+++++++++++ customer email received.....");
      console.log(dbCustomerEmails);
    })
      .catch(function (err) {
        res.json(err);
      });

      console.log("------- no emails found ---------");
      return null;
  });
 
  // Orders API Get Route
  app.get("/api/orders", function (req, res) {
    db.Order.findAll({}).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });

  // Orders API Get Route by cust_code
  app.get("/api/orders/:code", function (req, res) {
    db.Order.findOne({
      where: {
        cust_code: req.params.code
      }
    }).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });



  // Orders API Post Route with cust_code
  app.post("/api/orders/", function (req, res) {
    db.Order.create({
      cid: req.body.cid,
      order_name: req.body.order_name,
      cust_code: req.body.cust_code
    }).then(function (data) {
      console.log(data);
      res.json(data);
    });
  });




  // Order Items API Get Route
  app.get("/api/orderitems/", function (req, res) {
    db.OrderItem.findAll({}).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });

  // Order Items API Get Route by Status
  app.get("/api/orderitems/:ready", function (req, res) {
    db.OrderItem.findAll({
      where: {
        status: req.params.ready
      }
    }).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });
  // Order Items API by ID Get Route
  app.get("/api/orderitems", function (req, res) {
    db.OrderItem.findAll({}).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });


  // Order Items API Get Route by Order Items Id
  app.get("/api/orderitemsid/:id", function (req, res) {
    db.OrderItem.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
      console.log(data);
    });
  });


  // Order Items API Get Route by Customer Id
  app.get("/api/orderitemscid/:cid", function (req, res) {
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


  // Products API Get Route by Product ID

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
 app.put("/api/orderitems/:id", function (req, res) {
   console.log("req.body from put on order items")
   console.log(req.body.status)
  db.OrderItem.update(req.body, {
   where: {
    id: req.params.id
   }
  }).then(function (data) {
   res.json(data);
   console.log("put on orderitems is getting hit")
   console.log(data)
  });
 });

  app.post("/api/spotify", function (req, res) {
    console.log("req.body from POST is below");
    var song = req.body.spotifyThis;
    console.log(song);
    spotify.search({ type: "track", query: song }, function (err, data) {

      res.json(data);
    });
  });


  // Songs API Post Route
  app.post("/api/songs", function (req, res) {
    db.Song.create({
      song_name: req.body.song_name, 
      song_url: req.body.song_url,
      artist: req.body.artist
    }).then(function (data) {
      res.json(data);
    });
    console.log("req.body from api/songs is below")

    console.log(req.body.song)
  });

  // Songs API Put Route

  // app.put("/api/songs", function (req, res) {
  //   db.Spotify.update(req.body, {
  //     where: {
  //       id: req.body.id
  //     }
  //   }).then(function (data) {
  //     res.json(data);
  //   });
  // });


  // Songs API Get Route
  app.get("/api/songs", function (req, res) {
    db.Song.findAll({}).then(function (data) {
      res.json(data);
    });
    // res.json(req.body)
  });
  
};