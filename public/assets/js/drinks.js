// ******************************************************************************************************
// * Team JS File
// ******************************************************************************************************

// Required
// ------------------------------------------
// require("dotenv").config();

// Global Variables
// ------------------------------------------
// ------------------------------------------

// Form Variables
// ------------------------------------------
var errCheck = false;
var errCheck1 = false;
var errCheck2 = false;
var errCheck3 = false;
var errFlag = 1;

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
var cust_code="";
var orderCreated=0;

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

  function handleCreateNewCustomerCallback(status){
    if (status == "yes") { 
      errCheck3 = true; // duplicate found
      alert("Duplicate email address found.");
    }
    else if (status == "no") {
      alert("No duplicate email address found.");
      errCheck3 = false; // duplicate not found
    }
    else if (status == "undefined") {
      // handle case for undefined. When there is a duplicate email, it gets called two times. the first async call is non-deterministic
      // so we need to ignore that
      //alert("undefined...returning this time");
      return;
    }

    //alert("flags >>>> (valid_name, valid_email, duplicate_email) " + errCheck1 + " " + errCheck2 + " " + errCheck3);

    // if everything is Ok, then add the new record to the database
    if  ( errCheck1 == false && errCheck2 == false && errCheck3 == false) {
      console.log("if statement is thereeeeee")
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
        

      
        // $("#newName").val("");
        // $("#newEmail").val("");

        // SEE LINES 257-285 BELOW re orderName and passing data via localstorage (MUST BE DONE HERE AS WELL)
        if (res) {
          // for customer that doesn't exist yet
          custName = newName;
          orderName = custName;

          localStorage.setItem('cid', JSON.stringify(custId));
          localStorage.setItem('name', JSON.stringify(custName));
          localStorage.setItem('oid', JSON.stringify(orderId));

          custName = "";
          custEmail = "";
          custId = 0;

          window.location.href = "/menu"
        }
        // window.location.replace("/menu")
      });
    }
    else{
      // already exisiting customer
      custName = newName;
      orderName = custName;

      // TODO: pass correct cusId and name to the next page
      // currently not working...

      window.location.href = "/menu"
    }
  }

  // Check if new account form email address exists in database
  function checkedDuplicate(newEmail, callback) {
    $.get("/api/customers/" + newEmail, function (data) {
      if (data == null) {
        callback("no"); // no duplicate email found
      }
     }).then(function (data) {
      console.log("------for data-----");
      console.log(data)
      console.log("------for data-----");
      var emailReceived = data.cust_email;

      console.log(emailReceived);
      if (emailReceived === newEmail) {
        custId = 0;
        callback("yes"); // duplicate email found
      }
    });

    callback("undefined"); // this is undefined state
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

    if (errCheck1 === true) {
      alert("Please Enter a Valid Name");
      return;
    }

    if (errCheck2 === true) {
      alert("Enter Valid email address.");
      return;
    }

    checkedDuplicate(newEmail, handleCreateNewCustomerCallback);
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
            console.log("--orderId in index--");
            console.log(orderId);

            // Pam's Test Data until OID functionality is available
            // orderId = 6

            // Set orderName = custName variable
            orderName = custName;
            
            console.log("--orderName in index--");
            console.log(orderName);

            // Create an Order
            createOrder();

            if (orderId !== 0) {
              // Navigate to menu.handlebars
              window.location.href = "/menu"
            } else {
              alert("There was an issue with login, please try again.")
            }

          } else {
            custName = "";
            custEmail = "";
            custId = 0;
            // Clear Local Storage
            localStorage.removeItem('cid');
            localStorage.removeItem('name');
            localStorage.removeItem('oid');
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

      // Create an Order
      createOrder();

       // Create an Order
       createOrder();

       if (orderId !== 0) {
         // Navigate to menu.handlebars
         window.location.href = "/menu"
       } else {
         alert("There was an issue with login, please try again.")
       }

    } else {
      // Clear customer variables
      custName = "";
      custEmail = "";
      custId = 0;
      // Clear Local Storage
      localStorage.removeItem('cid');
      localStorage.removeItem('name');
      localStorage.removeItem('oid');
    }
  });

  // Generate Random Code for Orders
  // Code found on Stack Overflow (Generate random string/characters in JavaScript)
  // ------------------------------------------
  // Tested: 03/24/2020 by: PLK
  // ------------------------------------------
  function genCode(length) {
    cust_code="";
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
 }


  // Create an Order
  // ------------------------------------------
  // Completed: 03/24/2020 by: Pam
  // Tested:  03/___/2020 by: _____
  // ------------------------------------------
  function createOrder() {
  // Reset cust_code variable - it should be unique each time
  cust_code = "";
  // Generate a new random number and assign to cust_code
  cust_code=genCode(15);

  // Create a New Order with cust_code
  var newOrder = {
    cid: custId,
    order_name: orderName,
    cust_code: cust_code
  };

  $.post("api/orders", newOrder)
  .then(function (req, res) {
    });

    // Retrieve order number based on cust_code
    $.get("api/orders/" + cust_code, function (data) {})

    .then(function (data) {
      if (data){
        // Set orderId to returned value
        orderId = data.oid;
        console.log("---data--")
        console.log(data);
        console.log("---oid--")
        console.log(data.oid);
        console.log("---orderId--")
        console.log(orderId);

              // Pass custId, custName, and orderId via localstorage

      localStorage.setItem('cid', JSON.stringify(custId));
      localStorage.setItem('name', JSON.stringify(orderName));
      localStorage.setItem('oid', JSON.stringify(orderId));

    
        } else {
          orderId=0;
        }
      
      });
    
 }

  // Customize Header in menu.handlebars
  // ------------------------------------------
  // Completed: 03/22/2020 by: Pam
  // Tested:  03/24/2020 by: Pam
  // ------------------------------------------


  function getCustInfo() {

    // Clear cart
    cartArray.length=0;
    localStorage.removeItem('cart');

    // Clear customer variables
    custId=0;
    orderName="";
    orderId=0;

    // Pull Customer info from local storage
       custId = JSON.parse(localStorage.getItem('cid'));
       orderName = JSON.parse(localStorage.getItem('name'));
       orderId = JSON.parse(localStorage.getItem('oid'));

       console.log("--custId from localStorage");
        console.log(custId);
        console.log("--orderName from localStorage");
        console.log(orderName);
        console.log("--orderId from localStorage");
        console.log(orderId);

    // Put Welcome message and OrderName in the header
    var profile = $("#profile");
    profile.text("");
    var contentProfile = $("<h3 class='brown-text text-darken-4'>");
    contentProfile.text("Welcome " + orderName);
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

        // console.log("----Data---");
        // console.log(data);

        // console.log("----Data Length---");
        // console.log(data.length);

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




  // Add to Cart from Menu in menu.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Pam
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------


  $(".atcm").unbind("click").click(function (){

    // Prevent default action
    event.preventDefault();

    // console.log("--this.id--");
    // console.log(this.id);

    // Set Product variables by searching product by PID in button
    itemProdId = this.id;

    // Pam's Test Data until oid functionality is available
    // itemOrderId = 6;

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
      console.log("--Data--");
      console.log(data);
      console.log("--itemProdName--");
      console.log(itemProdName);
      console.log("--itemSize--");
      console.log(itemSize);
      console.log("--itemPrice--");
      console.log(itemPrice);
      console.log("--orderId--");
      console.log(orderId);
      console.log("--custId--");
      console.log(custId);
      console.log("--orderName--");
      console.log(orderName);
      console.log("--itemNo--");
      console.log(itemNo);
      console.log("--itemProdId--");
      console.log(itemProdId);
      console.log("--itemProdName--");
      console.log(itemProdName);
      console.log("--itemQty--");
      console.log(itemQty);

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

      getCartItems()
    });

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

  // Display the Cart in menu.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Pam
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------

function getCartItems() {

  $("#cart").text("");

      if (cartArray.length > 0) {
        $("#cart").text("");
        $("#cart").append("<table><thead><tr>")
        $("#cart").append("<th>Item No.</th><th>Description</th><th>Size</th><th>Price</th><th>Qty</th><th> </th></tr>")
        $("#cart").append("</thead><tbody>");
        var cartItems;
        for (var i = 0; i < cartArray.length; i++) {
          cartItems = $("<tr>");
          cartItems.append("<td>" + cartArray[i].item_no + "</td>");
          cartItems.append("<td>" + cartArray[i].prod_name + "</td>");
          cartItems.append("<td>" + cartArray[i].size + "</td>");
          cartItems.append("<td class='right-align'>" + cartArray[i].price + "</td>");
          cartItems.append("<td class='center-align'>" + cartArray[i].qty + "</td>");
          cartItems.append("<button class='btn-flat rfc' type='submit' id='" + cartArray[i].item_no + "'><i class='small material-icons'>clear</i></button></td>");
          cartItems.append("</tr>");
          $("#cart").append(cartItems);
        }
        cartItems.append("</tbody></table><br>");
      

      } else {

        // Create message for no order history results
        $("#cart").text("");
        $("#cart").append("<tr><td><p class='pink-text center-align small'>Please select an item from products or order history.</p></td></tr>");
      }
    
};

// Call getCartItems() function
getCartItems();


  // Delete item from cartArray in menu.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Pam
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------

$(document).on("click", ".rfc", function (event){

  // Prevent double-click
  event.stopImmediatePropagation();

  // Prevent default action
  event.preventDefault();

  // Delete Array Item based on Order Item id
  var findItem = parseInt(this.id) - 1;
  cartArray.splice(findItem,1);

  // Renumber Order Item No. for remaining items
  for (var i = 0; i<cartArray.length;i++){
    cartArray[i].item_no = i+1;
  }
  
  // Update itemCounter to reflect the delete
  itemCounter = cartArray.length;

  localStorage.setItem('cart', JSON.stringify(cartArray));

  getCartItems();

});

  // Cart submit button in menu.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Pam
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------

  $(document).on("click", "#submitCart", function (event){

    // Prevent double-click
    event.stopImmediatePropagation();
  
    // Prevent default action
    event.preventDefault();

    if (cartArray.length>0){
    // Put cartArray in localstorage
    localStorage.setItem('cart', JSON.stringify(cartArray));

    // Navigate to checkout.handlebars
    window.location.href = "/checkout";

    } else {
      alert("Please add at least one item to your cart.")
    };

  });

  // Checkout in checkout.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Nida/Hebah
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------
  function checkout(){

    // Retrieve Customer info from local storage on checkout page
      // custId = JSON.parse(localStorage.getItem('cid'));
            // console.log("--custId from Local Storage-");
            // console.log(custId);
      // orderName = JSON.parse(localStorage.getItem('name'));
            // console.log("--orderName from Local Storage-");
            // console.log(orderName);
      // orderId = JSON.parse(localStorage.getItem('oid'));
            // console.log("--orderId from Local Storage-");
            // console.log(orderId);

  // Retrieve Cart from local storage on checkout page
      // var retrievedCart = localStorage.getItem("cart");
      // var finalCart = JSON.parse(retrievedCart);
      // console.log("--Final from Local Storage-");
      // console.log(finalCart);


  }

  // Spotify in checkout.handlebars
  // ------------------------------------------
  // Completed: 03/__/2020 by: Nida/Hebah
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------

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
        console.log(data)
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
    $.post("api/songs", { song: usersSong }).then(function(req, res){

    });
  });

  $(".songChoice").on("click", function () {
    var usersSong = this.text();
    console.log("usersong is below");
    console.log(usersSong);
  });


  // Employee Page
  // ----------------------------------------------
  // Spotify (pending)
  // Changing status
  
  // Status Page
  // ---------------------------------------------
  // Spotify (pending)
  // DIV for the Song Playing Now
  // Posting to Spotify table??

  // Checkout Page
  // ----------------------------------------------
  // Display the Cart
  // Copy the cart
  // Sum of Cart
  // Post Order Items to the OrderItems table

  // Sliding Pages
  // ----------------------------------------------
  // Getting them done

  // Less important
  // ----------------------------------------------
  // Update button on the Order History
  // Changing the QTY on OrderItem

  //---------------------------------------------
  // End of drinks.js
  //---------------------------------------------
});
