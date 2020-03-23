// ******************************************************************************************************
// * Team JS File
// ******************************************************************************************************

// import { check } from "prettier";

// Global Variables
// ------------------------------------------
// ------------------------------------------

// Form Variables
// ------------------------------------------
var errCheck = false;
var errCheck1 = false;
var errCheck2 = false;
var errCheck3 = false;

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
var itemNo;
var itemProdId;
var itemProdName;
var itemStatus = "pending";
var itemPrice;
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
  // Logic for index.handlebars Modal
  // ------------------------------------------
  $(".modal").modal();

  // User Input Validations on index.handlebars
  // ------------------------------------------

  // Check if form name input is valid
  function isValidName(name) {
    if (name.length < 1) {
      return false;
    }
    var regEx = /^[a-zA-Z]+$/;
    var validName = regEx.test(name);

    if (!validName) {
      return false;
    }
    return true;
  }

  // Check if form email address input is valid
  function isValidEmail(email) {
    if (email.length < 1) {
      return false;
    }

    var regEx = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    var validEmail = regEx.test(email);
    if (!validEmail) {
      return false;
    }

    return true;
  }

  // Check if new account form email address exists in database
  function checkedDuplicate(newEmail) {
    $.get("/api/customers/" + newEmail, function (data) { }).then(function (data) {
      var emailReceived = data.cust_email;
      if (emailReceived === newEmail) {
        alert(">>>>>> Email already exists");
        return true;
      }
      else {
        return false;
      }
    });
  }

  // Create New Customer and Login
  $(document).on("click", "#newSubmit", function (event) {
    // Prevent double-click
    event.stopImmediatePropagation();
    // Prevent default action
    event.preventDefault();

    var newName = $("#newName")
      .val()
      .trim();
    var newEmail = $("#newEmail")
      .val()
      .trim();

    if (isValidName(newName)) {
      errCheck1 = false;
    }
    else {
      errCheck1 = true;
    }

    if (isValidEmail(newEmail)) {
      errCheck2 = false;
    }
    else {
      errCheck2 = true;
    }

    if (checkedDuplicate(newEmail)) {
      errCheck3 = true; // duplicate found, so error
    }
    else {
      errCheck3 = false; // no duplicate found
    }

    if (errCheck1 === true) {
      alert("Please Enter a Valid Name");
    }

    if (errCheck2 === true || errCheck3 === true) {
      alert("Either Enter Invalid email address or duplicate email address");
      alert(errCheck2 + " " + errCheck3)
    }

    alert("flags>>>>" + errCheck1 + " " + errCheck2 + " " + errCheck3);

    // if everything is Ok, then add the new record to the database
    if (errCheck1 == false && errCheck2 == false && errCheck3 == false) {
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

        // SEE LINES 257-285 BELOW re orderName and passing data via localstorage (MUST BE DONE HERE AS WELL)
        window.location.href = "/menu"
        // window.location.replace("/menu")
      });
    }

  });


  // Existing Customer Login

  $(document).on("click", "#custSubmit", function (event) {

    // Prevent double-click
    event.stopImmediatePropagation();
    // Prevent default action
    event.preventDefault();

    // Clear Local Storage
    localStorage.removeItem('cid')
    localStorage.removeItem('name')
    localStorage.removeItem('oid')

    // Clear Customer variables
    custName = "";
    custEmail = "";
    custId=0;

    // Grab user input from existing customer form

    var newEmail = $("#formEmail")
      .val()
      .trim();
    console.log("--Email address from the form--");
    console.log(newEmail);

    if (isValidEmail(newEmail)) {
      errCheck = false;
      console.log("--Checking for valid email, no errors found--")
      console.log(errCheck);
      console.log(newEmail);
    } else {
      errCheck = true;
      console.log("--Checking for valid email, errors found--")
      console.log(errCheck);
    }
    if (errCheck === true) {
      console.log("--errCheck after email validation with errors--")
      console.log(errCheck);
      alert("Please enter a valid email address");
    } else {
      console.log("--errCheck after email validation, no errors found--")
      console.log(errCheck);
      console.log(newEmail);
      $.get("/api/customers/" + newEmail, function (data) { })
        .then(function (data) {
          console.log("--Results after db search for newEmail match--")
          console.log(data);
          if (data !== null) {
            custName = data.cust_name;
            custEmail = data.cust_email;
            custId = data.cid
            console.log("---Email address in DB with these values---")
            console.log(custName);
            console.log(custEmail);
            console.log(custId);
          } else {
            alert("Sorry, no account exists for this email address.");
            custId = 0;
            errCheck = true
          }

          if (custId !== 0 && typeof custId != 'undefined') {
            alert("CID: " + custId + " Email: " + custEmail + " Name: " + custName);

            console.log("--custId in index--");
            console.log(custId);
            console.log("--custName in index--");
            console.log(custName);


            // Pam's Test Data until OID functionality is available
            orderId = 6

            // Set orderName = custName variable
            orderName = custName;

            // CREATE AN ORDER in Orders Table
                // using custId and orderName
            // RETRIEVE new oid FROM DATABASE
            // STORE oid in orderId
            
            // Pass custId, custName, and orderId via localstorage

            localStorage.setItem('cid', JSON.stringify(custId));
            localStorage.setItem('name', JSON.stringify(custName));
            localStorage.setItem('oid', JSON.stringify(orderId));

            custName = "";
            custEmail = "";
            custId = 0;

            // Navigate to menu.handlebars
            window.location.href = "/menu"

          } else {
            custName = "";
            custEmail = "";
            custId = 0;
          }
        });
    }
  });


  // Guest Login

  $("#guestSubmit").on("click", function (event) {
    // Prevent double-click
    event.stopImmediatePropagation();
    // Prevent default action
    event.preventDefault();

    // Clear Customer Variables
    custName = "";
    custEmail = "";
    custId = 0;

    // Clear Local Storage
    localStorage.removeItem('cid')
    localStorage.removeItem('name')
    localStorage.removeItem('oid')

    // User input from form
    var guestInput = $("#guestName").val().trim();

    console.log("--Guest Input--");
    console.log(guestInput);

    // Validate user input
    if (isValidName(guestInput)) {
      errCheck = false;

      // Set custId to the guest user's cid
      custId = 1;
      console.log("--Checking for valid name, no errors found--")
      console.log(errCheck);
      console.log(guestInput);
    } else {
      errCheck = true;
      custId = 0;
      console.log("--Checking for valid name, errors found--")
      console.log(errCheck);
    }
    if (errCheck === true) {
      console.log("--errCheck after name validation with errors--")
      console.log(errCheck);
      alert("Please enter a valid name");
    }

    // If no errors, send user to menu page
    if (custId !== 0) {
      // Set orderName = guestInput variable
      orderName = guestInput;

      // CREATE AN ORDER in Orders Table
          // using custId and orderName
      // RETRIEVE new oid FROM DATABASE
      // STORE oid in orderId
      
      // Pass custId, custName, and orderId via localstorage

      localStorage.setItem('cid', JSON.stringify(custId));
      localStorage.setItem('name', JSON.stringify(custName));
      localStorage.setItem('oid', JSON.stringify(orderId));

      custName = "";
      custEmail = "";
      custId = 0;

      // Navigate to menu.handlebars
      window.location.href = "/menu"

    } else {
      // Clear customer variables
      custName = ""; m
      custEmail = "";
      custId = 0;
    }
  });

  // Customize Header in menu.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Pam
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------


  function getCustInfo() {

    // Pull Customer info from local storage
    custId = JSON.parse(localStorage.getItem('cid'));
    custName = JSON.parse(localStorage.getItem('name'));
    orderId = JSON.parse(localStorage.getItem('oid'));

    console.log("--custId in menu--");
    console.log(custId);
    console.log("--custName in menu--");
    console.log(custName);
    console.log("--orderId in menu--");
    console.log(orderId);


    // Put Welcome message and Customer name in the header
    var profile = $("#profile");
    profile.text("");
    var contentProfile = $("<h3 class='brown-text text-darken-4'>");
    contentProfile.text("Welcome " + custName);
    profile.append(contentProfile);
    console.log(contentProfile);

  }

    // Call getCustInfo ()
    getCustInfo();


  // Get Order History

  function getOrderHistory() {
    $.get("/api/orderitemscid/" + custId, function (data) { })
      .then(function (data) {

        $("#ordHistory").text("");

        console.log("----Data---");
        console.log(data);

        console.log("----Data Length---");
        console.log(data.length);

        if (data.length > 0) {
          $("#ordHistory").text("");
          $("#ordHistory").append("<table><thead><tr>")
          $("#ordHistory").append("<th>Order</th><th>Product</th><th>Size</th><th>Price</th><th>Qty</th><th> </th></tr>")
          $("#ordHistory").append("</thead><tbody>");
          var catOrder;
          for (var i = 0; i < data.length; i++) {
            catOrder = $("<tr>");
            catOrder.append("<td>" + data[i].oid + "</td>");
            catOrder.append("<td>" + data[i].prod_name + "</td>");
            catOrder.append("<td>" + data[i].size + "</td>");
            catOrder.append("<td class='right-align'>" + data[i].price + "</td>");
            catOrder.append("<td class='center-align'>" + data[i].qty + "</td>");
            catOrder.append("<button class='btn-flat atch' type='submit' id='" + data[i].id + "'><i class='small material-icons'>add_box</i></button></td>");
            catOrder.append("</tr>");
            $("#ordHistory").append(catOrder);
          }
          catOrder.append("</tbody></table>");

        } else {

          // Create message for no order history results
          $("#ordHistory").text("");
          $("#ordHistory").append("<tr><td><h6 class='pink-text center-align'>No Order History Available</h6></td></tr>");
        }
      });
  };

  // Need a button on Modal that calls getOrderHistory to refresh data
  getOrderHistory()


  $("#songButton").on("click", function (event) {
    event.preventDefault();
    $("#dropdown1").empty();
    var songToSearch = $("#songName").val();
    var song = { spotifyThis: songToSearch };
    $.post("/api/spotify", song, function (data) {
      $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
      console.log("post request");

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
          songMenu.attr("dataVal", songInfo);
          var divider = $("<li>");
          divider.addClass("divider");
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
  });

  $(".songChoice").on("click", function () {
    var usersSong = this.text();
    console.log("usersong is below");
    console.log(usersSong);
  });


  // Add to Cart from Menu in menu.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Pam
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------


  $(".atcm").unbind("click").click(function () {
    event.preventDefault();

    console.log("--this.id--");
    console.log(this.id);

    // Set Product variables by searching product by PID in button
    itemProdId = this.id;

    // Pam's Test Data until oid functionality is available
    itemOrderId =6;

    $.get("/api/products/" + itemProdId, function (data) {
      // Increment Item Counter by 1
      itemCounter++;

      // Set Item No variable to ItemCounter
      itemNo = itemCounter;
      // Set itemProdName, itemSize, and itemPrice from database
      itemProdName = data.prod_name;
      itemSize = data.size;
      itemPrice = data.price;
    }).then(function (data) {
      // Console Logs for Testing
      // console.log("--Data--");
      // console.log(data);
      // console.log("--itemProdName--");
      // console.log(itemProdName);
      // console.log("--itemSize--");
      // console.log(itemSize);
      // console.log("--itemPrice--");
      // console.log(itemPrice);
      // console.log("--itemOrderId--");
      // console.log(itemOrderId);
      // console.log("--itemCustId--");
      // console.log(itemCustId);
      // console.log("--itemOrderName--");
      // console.log(itemOrderName);
      // console.log("--itemNo--");
      // console.log(itemNo);
      // console.log("--itemProdId--");
      // console.log(itemProdId);
      // console.log("--itemProdName--");
      // console.log(itemProdName);
      // console.log("--itemSize--");
      // console.log(itemSize);
      // console.log("--itemPrice--");
      // console.log(itemPrice);

      // Create Cart Item
      var newCartItem = {
        oid: orderId,
        cid: custId,
        order_name: orderName,
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
    $("#cart").append(cartArray);
  });

  // Add to Cart from Order History in menu.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Pam
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------


  $(document).on("click", ".atch", function (event) {

    // Prevent double-click
    event.stopImmediatePropagation();
    // Prevent default action
    event.preventDefault();
    // Increment Item Counter by 1
    // Set Item No variable to ItemCounter
    // Grab the orderItems table's id from the button
    // Search orderItems table by the id
    // Grab product id from orderItems table
    // Search product table by product id
    // Set itemProdName, itemSize, and itemPrice from database
        // itemProdName = data.prod_name;
        // itemSize = data.size;
        // itemPrice = data.price;
    // Create Cart Item
        // var newCartItem = {
        // oid: orderId,
        // cid: custId,
        // order_name: orderName,
        // item_no: itemNo,
        // pid: itemProdId,
        // prod_name: itemProdName,
        // size: itemSize,
        // price: itemPrice,
        // qty: itemQty
    // Push OrderItem Object to Cart Array
    // Append Cart to the DOM
  });

  // Cart submit button inmenu.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Pam
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------

  // Put cartArray in localstorage
  // Navigate to checkout.handlebars, passing oid, cid, order_name, and cartArray from localstorage

  //---------------------------------------------
  // End of drinks.js
  //---------------------------------------------
});
