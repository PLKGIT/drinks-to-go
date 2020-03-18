// ******************************************************************************************************
// drinks_controller.js
// ******************************************************************************************************

var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {

  db.Customer.findAll({}).then(function (data) {
    var customerObj = {
      customers: data
    };
    console.log(customerObj);
    console.log("---Data---");
    console.log(data);
    console.log("------");
    res.render("index", {customers:data});
  });

});


module.exports = router;