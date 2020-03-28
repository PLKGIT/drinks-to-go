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
var cust_code = "";

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
var itemOrderItemId;

// Song Variables
// ------------------------------------------
var songArray = [];
var songName;
var songUrl;
var songStatus = "pending";
var songArtist;

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
  // ------------------------------------------
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

  // New Customer Callback
  // ------------------------------------------
  function handleCreateNewCustomerCallback(status) {
    if (status == "yes") {
      errCheck3 = true; // duplicate found
      alert("This Email Address already exists in our database. Please login as a returning customer");
    }
    else if (status == "no") {
      alert("Thank you for signing up.");
      errCheck3 = false; // duplicate not found
    }
    else if (status == "undefined") {
      // handle case for undefined. When there is a duplicate email, it gets called two times. the first async call is non-deterministic
      // so we need to ignore that
      //alert("undefined...returning this time");
      return;
    }

    //alert("flags (valid_name, valid_email, duplicate_email) " + errCheck1 + " " + errCheck2 + " " + errCheck3);
    var newName = $("#newName")
      .val()
      .trim();

    // if everything is Ok, then add the new record to the database
    if (errCheck1 == false && errCheck2 == false && errCheck3 == false) {
      // console.log("if statement is thereeeeee")
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

        if (res) {

          // for customer that doesn't exist yet
          custName = newName;

          // Clear Local Storage
          localStorage.removeItem('cid')
          localStorage.removeItem('name')
          localStorage.removeItem('oid')

          // Clear Customer variables
          // custName = "";
          // custEmail = "";
          // custId = 0;

          // Pulling New Customer Information from Customers table
          var newEmail = $("#newEmail")
            .val()
            .trim();
          $.get("/api/customers/" + newEmail, function (data) { })
            .then(function (data) {
              // console.log("--Results after db search for newEmail match--")
              // console.log(data);
              if (data !== null) {
                custName = data.cust_name;
                custEmail = data.cust_email;
                custId = data.cid
                // console.log("---Email address in DB with these values---")
                // console.log(custName);
                // console.log(custEmail);
                // console.log(custId);

                // createOrder();
                orderName = custName;
                orderId = 0;
                createOrder();
                localStorage.setItem('cid', JSON.stringify(custId));
                localStorage.setItem('name', JSON.stringify(orderName));
                localStorage.setItem('oid', JSON.stringify(orderId));
              }
            });
          window.location.href = "/article"
        }
      });
    }
    else {
      custName = newName;
      window.location.href = "/"
    }
  }

  // Check if new account form email address exists in database
  function checkedDuplicate(newEmail, callback) {
    $.get("/api/customers/" + newEmail, function (data) {
      if (data == null) {
        callback("no"); // no duplicate email found
      }
    }).then(function (data) {
      // console.log("------for data-----");
      // console.log(data)
      // console.log("------for data-----");
      var emailReceived = data.cust_email;
      custName = data.cust_name;
      custEmail = data.cust_email;
      custId = data.cid;
      //orderName = custName;
      // console.log(emailReceived);
      if (emailReceived === newEmail) {
        custId = 0;
        callback("yes"); // duplicate email found
      }
    });

    callback("undefined"); // this is undefined state
  }

  // Create New Customer and Login
  $(document).on("click", "#newSubmit", function (event) {
    // Prevent default action
    event.preventDefault();
    // Prevent double-click
    event.stopPropagation();

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
  // ------------------------------------------
  $(document).on("click", "#custSubmit", function (event) {
    // Prevent default action
    event.preventDefault();
    // Prevent double-click
    event.stopPropagation();

    // Clear Local Storage
    localStorage.removeItem('cid')
    localStorage.removeItem('name')
    localStorage.removeItem('oid')

    // Clear Customer variables
    custName = "";
    custEmail = "";
    custId = 0;

    // Grab user input from existing customer form

    var newEmail = $("#formEmail")
      .val()
      .trim();
    // console.log("--Email address from the form--");
    // console.log(newEmail);

    if (isValidEmail(newEmail)) {
      errCheck = false;
      // console.log("--Checking for valid email, no errors found--")
      // console.log(errCheck);
      // console.log(newEmail);
    } else {
      errCheck = true;
      // console.log("--Checking for valid email, errors found--")
      // console.log(errCheck);
    }
    if (errCheck === true) {
      // console.log("--errCheck after email validation with errors--")
      // console.log(errCheck);
      alert("Please enter a valid email address");
    } else {
      // console.log("--errCheck after email validation, no errors found--")
      // console.log(errCheck);
      // console.log(newEmail);
      $.get("/api/customers/" + newEmail, function (data) { })
        .then(function (data) {
          // console.log("--Results after db search for newEmail match--")
          // console.log(data);
          if (data !== null) {
            custName = data.cust_name;
            custEmail = data.cust_email;
            custId = data.cid
            // console.log("---Email address in DB with these values---")
            // console.log(custName);
            // console.log(custEmail);
            // console.log(custId);
          } else {
            alert("Sorry, no account exists for this email address.");
            custId = 0;
            errCheck = true
          }

          if (custId !== 0 && typeof custId != 'undefined') {
            // alert("CID: " + custId + " Email: " + custEmail + " Name: " + custName);

            // console.log("--custId in index--");
            // console.log(custId);
            // console.log("--custName in index--");
            // console.log(custName);
            // console.log("--orderId in index--");
            // console.log(orderId);

            // Set orderName = custName variable
            orderName = custName;
            // console.log("--orderName in index--");
            // console.log(orderName);


            // Create an Order
            createOrder();

            if (orderId !== 0) {
              // Pass custId, custName, and orderId via localstorage
              localStorage.setItem('cid', JSON.stringify(custId));
              localStorage.setItem('name', JSON.stringify(orderName));
              localStorage.setItem('oid', JSON.stringify(orderId));
              // Navigate to menu.handlebars
              window.location.href = "/article"
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
    // Prevent default action
    event.preventDefault();
    // Prevent double-click
    event.stopPropagation();

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
      console.log("--Checking for valid name, errors found--")
      console.log(errCheck);
    }
    if (errCheck === true) {
      console.log("--errCheck after name validation with errors--")
      console.log(errCheck);
      custId = 0;
      alert("Please enter a valid name");
    }

    // If no errors, send user to menu page
    if (custId !== 0) {
      // Set orderName = guestInput variable
      orderName = guestInput;
      // Create an Order
      createOrder();

      if (orderId !== 0) {

        // Navigate to menu.handlebars
        window.location.href = "/article"
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
  function genCode(length) {
    cust_code = "";
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
  }


  // Create an Order
  // ------------------------------------------
  function createOrder() {
    // Reset cust_code variable - it should be unique each time
    cust_code.length = 0;
    // Generate a new random number and assign to cust_code
    cust_code = genCode(15);

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
    $.get("api/orders/" + cust_code, function (data) { })

      .then(function (data) {
        if (data) {
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
          orderId = 0;
        }

      });

  }

  // Customize Header in menu.handlebars
  // ------------------------------------------

  function getCustInfo() {

    // Clear cart
    cartArray.length = 0;


    // Clear customer variables
    custId = 0;
    orderName = "";
    orderId = 0;

    // Pull Customer info from local storage
    custId = JSON.parse(localStorage.getItem('cid'));
    orderName = JSON.parse(localStorage.getItem('name'));
    orderId = JSON.parse(localStorage.getItem('oid'));

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
  // ------------------------------------------
  function getOrderHistory() {
    $.get("/api/orderitemscid/" + custId, function (data) { })
      .then(function (data) {

        $("#ordHistory").text("");

        // console.log("----Data---");
        // console.log(data);

        // console.log("----Data Length---");
        // console.log(data.length);

        if (data.length > 0 && custId !== 1) {
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

  $(document).on("click", "#orderHistory", function (event) {
    event.preventDefault();
    console.log("order history button is clicked")
    getOrderHistory();
  })


  // Add to Cart from Menu in menu.handlebars
  // ------------------------------------------
  $(".atcm").unbind("click").click(function () {

    // Prevent default action
    event.preventDefault();

    // Set Product variables by searching product by PID in button
    itemProdId = this.id;

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
      // console.log("--newCartItem--");
      // console.log(newCartItem);

      // Push OrderItem Object to Cart Array
      cartArray.push(newCartItem);

      // console.log("--cartArray--");
      // console.log(cartArray);

      getCartItems()
    });
  });

  // Add items to cart from Order History
  // ------------------------------------------
  $(document).on("click", ".atch", function (event) {

    // Prevent double-click
    event.stopImmediatePropagation();
    // Prevent default action
    event.preventDefault();

    // Grab the orderItems table's id from the button
    itemOrderItemId = this.id;
    // console.log("--orderItemId from Order History");
    // console.log(this.id);

    // Search orderItems table by the itemOrderItemId
    $.get("/api/orderitemsid/" + itemOrderItemId, function (data) { })
      .then(function (data) {
        // Grab product id from orderItems table

        // console.log("--data from search of orderitems table on itemOrderItemId--");
        // console.log(data);
        // console.log("--pid--");
        // console.log(data.pid);
        // console.log("--itemProdId--");
        itemProdId = data.pid;

        $.get("api/products/" + itemProdId, function (data) {
          // Increment Item Counter by 1
          itemCounter++;

          // Set Item No variable to ItemCounter
          itemNo = itemCounter;

          // console.log("--Data--");
          // console.log(data);
          // Set itemProdName, itemSize, and itemPrice from database
          // console.log("--itemProdName--");
          itemProdName = data.prod_name;
          // console.log("--itemSize--");
          itemSize = data.size;
          // console.log("--itemPrice--");
          itemPrice = data.price;

        }).then(function (data) {

          // Console Logs for Testing
          // console.log("--Data--");
          // console.log(data);

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
          // console.log("--newCartItem--");
          // console.log(newCartItem);

          // Push OrderItem Object to Cart Array
          cartArray.push(newCartItem);

          // console.log("--cartArray--");
          // console.log(cartArray);

          getCartItems()
        });
      });

  });

  // getCartItems () function
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

  $(document).on("click", ".rfc", function (event) {

    // Prevent double-click
    event.stopImmediatePropagation();

    // Prevent default action
    event.preventDefault();

    // Delete Array Item based on Order Item id
    var findItem = parseInt(this.id) - 1;
    cartArray.splice(findItem, 1);

    // Renumber Order Item No. for remaining items
    for (var i = 0; i < cartArray.length; i++) {
      cartArray[i].item_no = i + 1;
    }

    // Update itemCounter to reflect the delete
    itemCounter = cartArray.length;

    localStorage.setItem('cart', JSON.stringify(cartArray));

    getCartItems();

  });

  // Cart submit button in menu.handlebars
  // ------------------------------------------

  $(document).on("click", "#submitCart", function (event) {
    // Prevent default action
    event.preventDefault();

    if (cartArray.length > 0) {
      // Put cartArray in localstorage
      localStorage.setItem('cart', JSON.stringify(cartArray));
      // Navigate to checkout.handlebars
      window.location.href = "/checkout";
      // checkout();

    } else {
      alert("Please add at least one item to your cart.")
    };
  });

  $(document).ready(function () {
    console.log("hitting the on load /checkout")
    checkout();
  })

  // Checkout () Function
  // ------------------------------------------
  function checkout() {

    var retrievedCart = localStorage.getItem("cart");
    var finalCart = JSON.parse(retrievedCart);
    // console.log("--Final from Local Storage-");
    // console.log(finalCart);
    // console.log(cartArray.length)

    $("#itemsOrdered").text("");

    if (finalCart.length > 0) {
      $("#itemsOrdered").text("");
      $("#itemsOrdered").append("<table><thead><tr>")
      $("#itemsOrdered").append("</thead><tbody>");
      var cartItems;
      var totalPrice = 0;
      $("#total").text("");
      for (var i = 0; i < finalCart.length; i++) {
        totalPrice += parseFloat(finalCart[i].price.toString());
        console.log("Total price is ", totalPrice);
      }

      for (var i = 0; i < finalCart.length; i++) {
        cartItems = $("<tr>");
        cartItems.append("<td>" + finalCart[i].item_no + "</td>");
        cartItems.append("<td>" + finalCart[i].prod_name + "</td>");
        cartItems.append("<td>" + finalCart[i].size + "</td>");
        cartItems.append("</tr>");
        $("#itemsOrdered").append(cartItems);
      }
      $("#total").append(totalPrice.toFixed(2));

      console.log(totalPrice);
      cartItems.append("</tbody></table><br>");
      $("#thanks").append(orderName);
      $("#orderNum").append(orderId);
    }
  }


  // Submit button in checkout.handlebars
  $("#att").on("click", function (event) {

    // Prevent Default button action
    event.preventDefault();

    var retrievedCart = localStorage.getItem("cart");
    console.log("--Retrieved Cart--");
    console.log(retrievedCart);

    var finalCart = JSON.parse(retrievedCart);
    console.log("final cart is... ", finalCart);

    for (var i = 0; i < finalCart.length; i++) {
      var pushItems = {
        oid: finalCart[i].oid,
        cid: finalCart[i].cid,
        pid: finalCart[i].pid,
        prod_name: finalCart[i].prod_name,
        status: "Pending",
        price: finalCart[i].price,
        size: finalCart[i].size,
        item_no: finalCart[i].item_no,
        qty: finalCart[i].qty,
        order_name: finalCart[i].order_name,
        complete: 0,
        ready: 0
      }
      $.post("/api/orderitems", pushItems)
        .then(function (req, res) {

        })
    }
    setTimeout(function () {
      window.location.href = "/";
    }, 2500);

  })


  // Employee-side orders / Status update
  // ------------------------------------------
  $(".rtg").on("click", function (event) {

    event.preventDefault();
    itemId = this.id;
    console.log(this.id);
    var statusInfo = {
      status: "ready",
      ready: 1,
    };
    $.ajax({
      type: "PUT",
      url: "/api/orderitems/" + itemId,
      data: statusInfo
    }).then(function (data) {
      location.reload();
    });
  });
  $(".com").on("click", function (event) {

    event.preventDefault();

    itemId = this.id;
    console.log(this.id);

    var statusInfo = {
      status: "complete",
      complete: 1,
    };
    $.ajax({
      type: "PUT",
      url: "/api/orderitems/" + itemId,
      data: statusInfo
    }).then(function (data) {
      location.reload();
    });
  });

  // Spotify in checkout.handlebars
  // ------------------------------------------

  $("#songButton").on("click", function (event) {
    event.preventDefault();
    $("#dropdown1").empty();
    var songToSearch = $("#songName").val();
    var song = { spotifyThis: songToSearch };
    $.post("/api/spotify", song, function (data) {
      $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
      console.log("post request");
      console.log("songToSearch is " + songToSearch);
      $.post("/api/spotify", song, function (data) {
        console.log("data is below");
        console.log(data)
        var songData = [];
        $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
        for (var i = 0; i < 5; i++) {
          var songName = data.tracks.items[i].name;
          var songArtist = data.tracks.items[i].artists[0].name;
          var songURL = data.tracks.items[i].preview_url;
          var songInfo = songName + " by " + songArtist;
          var trackInfo = {
            name: songName,
            artist: songArtist,
            url: songURL
          };
          songData.push(trackInfo)
          var songMenu = $("<li><a>");
          songMenu.text(songInfo);
          songMenu.addClass("songChoice");
          songMenu.attr("song", songName);
          songMenu.attr("artist", songArtist);
          songMenu.attr("url", songURL)
          var divider = $("<li>");
          divider.addClass("divider");
          $("#dropdown1").append(songMenu);
          $("#dropdown1").append(divider);
        }
        console.log("songData: " + songData)
      });
    });
  });

  $(document).on("click", ".songChoice", function (event) {
    event.preventDefault();
    var usersSong = $(this).attr("song");
    var usersArtist = $(this).attr("artist");
    var usersURL = $(this).attr("url")
    var newTrack = {
      song_name: usersSong,
      song_url: usersURL,
      artist: usersArtist
    };
    console.log("a piece of hte object is " + newTrack.song_name)
    console.log("url from newTrack object is " + newTrack.song_url)
    $.post("api/songs", newTrack).then(function (req, res) {
      console.log("req.body is below")
      console.log(req.body)
    });
  });


  $("#songButton").on("click", function () {
    $("#selectSong").removeClass("hidden");
  })



  // $("#att").on("click", function() {
  //   setTimeout(function(){ 
  //     window.location.href = "/"; }, 2500);

  // })


  //---------------------------------------------
  // End of drinks.js
  //---------------------------------------------
});