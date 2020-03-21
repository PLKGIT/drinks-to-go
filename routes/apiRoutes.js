var db = require("../models");
require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./../keys.js")

var spotify = new Spotify(keys.spotify);
module.exports = function(app) {
  app.get("/api/customers", function(req, res) {
    db.Customer.findAll({}).then(function(data) {
      res.json(data);
      console.log(data);
    });
  });

  app.get("/api/products", function(req, res) {
    db.Product.findAll({}).then(function(data) {
      res.json(data);
      console.log(data);
    });
  });

  app.get("/api/orders", function(req, res) {
    db.Order.findAll({}).then(function(data) {
      res.json(data);
      console.log(data);
    });
  });

  app.get("/api/orderitems", function(req, res) {
    db.OrderItem.findAll({}).then(function(data) {
      res.json(data);
      console.log(data);
    });
  });

  app.get("/api/songs", function(req, res) {
    db.Song.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/customers", function(req, res) {
    // takes the request object using it as input for buger.addBurger
    db.Customer.create({
      cust_name: req.body.cust_name,
      cust_email: req.body.cust_email
    }).then(function(dbCustomer) {
      // wrapper for orm.js that using MySQL insert callback will return a log to console,
      // render back to index with handle
      console.log(dbCustomer);
      res.json(dbCustomer);
    });
  });

  // app.post("/api/customers", function(req, res) {
  //   db.Customer.create(req.body).then(function(data) {
  //     res.json(data);
  //   });
  // });

  app.post("/api/orders", function(req, res) {
    db.Order.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/orderitems", function(req, res) {
    db.OrderItem.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  app.put("/api/orderitems", function(req, res) {
    db.OrderItem.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/songs", function(req, res) {
    db.Song.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  app.put("/api/songs", function(req, res) {
    db.Spotify.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/spotify", function(req, res) {
    console.log("req.body from POST is below");
    var song = req.body.spotifyThis;
    console.log(song);
    
    spotify.search({ type: 'track', query: song }, function (err, data){
      res.json(data);
    })
    
    // res.json(req.body);
  });
  // app.get("/api/spotify", function(req, res) {
  //   console.log("req.body from GET is below");
  //   console.log(res);
  //   res.json(req.body);
  // });
};
// function runSpotify(song) {
//   // console.log("Song: " + song)
//   spotify.search({ type: 'track', query: song }, function (err, data) {
//       if (err) {
//           return console.log('Error occurred: ' + err);
//       }
//       // console.log(JSON.stringify(data, null, 2));
//       for (var i = 0; i < data.tracks.items.length; i++) {
//           console.log("------------------------------------------------------------")
//           console.log("Artist: " + data.tracks.items[i].album.artists[0].name)
//           console.log("Song: " + data.tracks.items[i].name)
//           console.log("Link: " + data.tracks.items[i].external_urls.spotify)
//           console.log("Album: " + data.tracks.items[i].album.name)
//           console.log("------------------------------------------------------------")
//           var text="\nArtist: " + data.tracks.items[i].album.artists[0].name+"\nSong: " + data.tracks.items[i].name+"\nLink: " + 
//           data.tracks.items[i].external_urls.spotify+"\nAlbum: " + data.tracks.items[i].album.name+"\n-------------------------------------------------------------------";
//           // fs.appendFile("log.txt", text, function (error) {
//           //     if (error) {
//           //         console.log(error)
//           //     }
//           //     // else {
//           //     //     console.log("Content Added")
//           //     // }
//           // })
//       }
//       return data;
//   });
// }