// ******************************************************************************************************
// * Team JS File
// ******************************************************************************************************

// Global Variables
// ------------------------------------------
// ------------------------------------------

// Form Variables
// ------------------------------------------
var errCheck = false;

// Customer Variables
// ------------------------------------------
var custName;
var custEmail;
var custId;

// Order Variables
// ------------------------------------------
var ordersArray = [];
var orderId;
var orderName;
var orderDate;

// Cart Variables
// ------------------------------------------
var cartArray = [];
var itemCounter = 0;
var itemOrderId;
var itemCustId;
var itemOrderName;
var itemNo;
var itemProdId;
var itemProdName
var itemStatus = "pending";
var itemPrice = 0;
var itemSize;
var itemQty = 1;

// Song Variables
// ------------------------------------------
var songArray = [];
var songName;
var songUrl;
var songStatus = "pending";
var songArtist;
// Include contents of custId in Song Array

// Logic
// ------------------------------------------
// ------------------------------------------

$(document).ready(function () {

  // Create New Account on index.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Jyochsna
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------

  // Logic for Create an Account index.handlebars Modal
  $(".modal").modal();

  // Validate Create an Account Form
  $(document).on("click", "#newSubmit", function (event) {
    event.preventDefault();
    // alert("logiiiiiinnnn");
    var newName = $("#newName")
      .val()
      .trim();
    var newEmail = $("#newEmail")
      .val()
      .trim();

    if (newName.length < 1) {
      errCheck = true;
    }

    if (newEmail.length < 1) {
      errCheck = true;
    }

    //var regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
    //var regEx = /\\S+@\\S+/;
    var regEx = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    var validEmail = regEx.test(newEmail);
    if (!validEmail) {
      alert("invalid email");
      //errCheck = true;
    }

    if (errCheck === true) {
      alert("Error Detected");
    }

    var newCustomer = {
      cust_name: $("#newName")
        .val()
        .trim(),
      cust_email: $("#newEmail")
        .val()
        .trim()
    };
    $.post("api/customers", newCustomer).then(function (req, res) {
      //  console.log(data);

      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++")
      // $("#newName").val("");
      // $("#newEmail").val("");
      window.location.replace("/menu")
    });

  });

  $("#songButton").on("click", function (event) {
    event.preventDefault();
    $("#dropdown1").empty();
    var songToSearch = $("#songName").val();
    var song = { spotifyThis: songToSearch };
    $.post("/api/spotify", song, function (data) {
      $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
      console.log("post request")

      // console.log("songToSearch is " + songToSearch);
      $.post("/api/spotify", song, function (data) {
        // console.log("data is below");
        // console.log("----------------------------")
        // console.log(data)
        $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });

        for (var i = 0; i < 5; i++) {
          var songName = data.tracks.items[i].name;
          var artist = data.tracks.items[i].artists[0].name;
          var songInfo = songName + " by " + artist;
          var songMenu = $("<li><a>");
          songMenu.text(songInfo);
          songMenu.addClass("songChoice");
          songMenu.attr("dataVal", songInfo)
          var divider = $("<li>")
          divider.addClass("divider")
          $("#dropdown1").append(songMenu);
          $("#dropdown1").append(divider);
        }
      });
    });
  });

  $(document).on("click", ".songChoice", function (event) {
    event.preventDefault();
    var usersSong = $(this).attr("dataval");
    console.log("usersong is below");
    $.post("api/songs", { song: usersSong });
  })


  $(".songChoice").on("click", function () {
    var usersSong = this.text();
    console.log("usersong is below")
    console.log(usersSong);
  })
  // Customize Header in menu.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Pam
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------

  function getCustName() {
    custName = "Pamela";
    var profile = $("#profile");
    profile.text("");
    var content = $("<h3 class='brown-text text-darken-4'>");
    content.text('Welcome ' + custName);
    profile.append(content);
    console.log(content);
  };
  getCustName();

  // Customize Header in menu.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Pam
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------
  // custName = "Sonal";
  // custID = 3;

  // function getHistory() {
  //   $.get("/api/orders/" + custID, function (data) {
  //     ordersArray = data;
  //   }).then(function (data) {
  //     console.log(data);
  //     var profile = $("#profile");
  //     profile.text("");
  //     var content = $("<h3>");
  //     content.text(custName);
  //     profile.append(content);
  //     console.log(content);
  //   });
  // }
  // getHistory();

  $(".atc").on("click", function (event) {
    event.preventDefault();

    // Increment Item Counter by 1
    itemCounter++;

    // Test Parameters
    orderId = 6;
    custId = 7;
    orderName = "Pam Test"

    // Set Customer-specific variables with existing variables
    itemOrderId = orderId;
    itemCustId = custId;
    itemOrderName = orderName;

    // Set Item No variable to ItemCounter
    itemNo = itemCounter;

    // Set Product variables by searching product by PID in button
    itemProdId = this.id;

    $.get("/api/products/", itemProdId, function (data) {
      itemProdName = data.prod_name;
      itemSize = data.size;
      itemPrice = data.price;
    });
    console.log("--itemOrderId--");
    console.log(itemOrderId);
    console.log("--itemCustId--");
    console.log(itemCustId);
    console.log("--itemOrderName--");
    console.log(itemOrderName);
    console.log("--itemNo--");
    console.log(itemNo);
    console.log("--itemProdId--");
    console.log(itemProdId);
    console.log("--itemProdName--");
    console.log(itemProdName);
    console.log("--itemSize--");
    console.log(itemSize);
    console.log("--itemPrice--");
    console.log(itemPrice);

    // Create Cart Item
    var newCartItem = {
      oid: itemOrderId,
      cid: itemCustId,
      order_name: itemOrderName,
      item_no: itemNo,
      pid: itemProdId,
      prod_name: itemProdName,
      size: itemSize,
      price: itemPrice,
      qty: itemQty
    };
    console.log("--newCartItem--");
    console.log(newCartItem);
    // Push OrderItem Object to Cart Array
    cartArray.push(newCartItem);
    console.log("--cartArray--");
    console.log(cartArray);
  });
  // Loop through cartArray and append to the DOM in the Cart div
  $("#cart").append(cartArray);
});