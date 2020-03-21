// ******************************************************************************************************
// * Team JS File
// ******************************************************************************************************

// Global Variables
// ------------------------------------------
// ------------------------------------------

// Form Variables
// ------------------------------------------
var errCheck = false;

// User and Order Variables
// ------------------------------------------
var custName;
var custEmail;
var custID;
var ordersArray = [];
var orderId;
var orderName;
var orderDate;

// Cart Variables
// ------------------------------------------
var cartArray = [];
var itemCounter = 0;
// Include contents of orderId in Cart Array
var itemProdId = 1;
var itemStatus = "pending";
var itemPrice = 0;
var itemSize;
var itemNo = 1;
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
// ------------------------------------------

$(document).ready(function() {
  // Logic for index.handlebars Modal
  $(".modal").modal();

  // User Login in index.handlebars
  // ------------------------------------------
  // ------------------------------------------

  // Guest Login
  // ------------------------------------------
  // Completed: 03/__/2020 by: _____
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------
 // Form, on submit
  // Validate form
  // Make sure the name input is not blank
  // If error, set errCheck = true
  // Make sure the name input does not include numbers
  // If error, set errCheck = true
  // If errors
  // Prompt user to fix
  // Set errCheck = false
  // Validate again after submit
  // If no errors:
  // Store 'name' input in custName variable
  // Store '1' in custID
  // Login
  // Login: Take user to menu.handlebars
  // Write custName to the div
  // Create an Order in Orders table
  // oid field will be autogenerated
  // cid field should be set to custID
  // order_name field should be set to custName variable
  // ordered field will be autogerated with current date and time
  // Store order contents from database into variables
  // oid --> orderId variable
  // order_name --> orderName variable
  // ordered --> orderDate variable

  // Customer Login
  // ------------------------------------------
  // Completed: 03/__/2020 by: _____
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------
  // Form, on submit
  // Validate form
  // Make sure the email address is not blank
  // If error, set errCheck = true
  // Make sure the email address is in a valid format
  // If error, set errCheck = true
  // Query Customers table to ensure the email address exists
  // If error, set errCheck = true
  // If errors
  // Prompt user -- either fix, login as guest, or create account
  // Set errCheck = false
  // Validate again after submit
  // If no errors:
  // Store "email" input in custEmail variable and query database based on custEmail
  // Store cid from database in custID variable
  // Store cust_name from database in custName variable
  // Login
  // Login: Take user to menu.handlebars
  // Write custID, custName, custEmail to the div
  // Get Order History for this custID
  // Join Customers and Orders on cid
  // Join Orders and OrderItems on oid
  // Join OrderItems and Products on pid
  // Write Order History to Div
  // Orders | ordered (based on oid)
  // OrderItems | item_no (based on oid)
  // Products | prod_name (based on pid)
  // Products | type (based on pid)
  // OrderItems | size (based on oid)
  // OrderItems | price (based on oid)
  // OrderItems | qty (based on oid)
  // Create an Order in Orders table
  // oid field will be autogenerated
  // cid field should be set to custID variable
  // order_name field should be set to custName variable
  // ordered field will be autogerated with current date and time
  // Store order contents from database into variables
  // oid --> orderId variable
  // order_name --> orderName variable
  // ordered --> orderDate variable

  // Create an Account
  // ------------------------------------------
  // Completed: 03/__/2020 by: _____
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------
  // Form, on submit
  // $("#guestSubmit").on("click",function(event){
  //     event.preventDefault();

  //     var newCustomer = {
  //         cust_name : $("#guestName").val().trim(),

  //     };

  //     $.post("api/customers", newCustomer)
  //     .then(function(data){
  //         console.log(data);
  //     });

  //     $("#guestName").val("");

  // })
  
  // Validate form
  $(document).on("click", "#newSubmit", function(event) {
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
        alert("invalid email")
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
    $.post("api/customers", newCustomer).then(function(req,res) {
    //  console.log(data);

      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++")
      // $("#newName").val("");
      // $("#newEmail").val("");
    window.location.replace("/menu")
    });
    
  });
  // Make sure the name input is not blank
  // If error, set errCheck = true
  // Make sure the name input does not include numbers
  // If error, set errCheck = true
  // Make sure the email address is not blank
  // If error, set errCheck = true
  // Make sure the email address is in a valid format
  // If error, set errCheck = true
  // Query Customers table to ensure the email address DOES NOT exist
  // If error, set errCheck = true
  // If errors
  // Prompt user -- either fix, login as guest, or create account
  // Set errCheck = false
  // Validate again after submit
  // If no errors:
  // Store "name" input in custName variable
  // Store "email" input in custEmail variable
  // Create a Customer to Customers table
  // cid will be autogenerated
  // cust_name should be set to custName variable
  // cust_email should be set to custEmail variable
  // Store cid from database in custID variable
  // CALL Customer Login logic above after new Account creation

      // Orders in menu.handlebars
    // ------------------------------------------
    // ------------------------------------------
    custName = "Sonal";
    custID = 3;

    function getHistory() {
        $.get("/api/orders" + custID, function (data) {
            console.log("Orders", data);
            ordersArray = data;
        }).then(function (data) {

        var profile = $("#profile");
        profile.text("");
        var content = $("<h2>");
        content.append(
            $(custName),
            $("</h2>")
        );
        profile.append(content);
        });
    };

    getHistory();

  // Add to Cart from Order History or Menu
  // ------------------------------------------
  // Completed: 03/__/2020 by: _____
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------

  // Can this be done by populating data in a form?  Need to think about the UI
  // Push data to cartArray
  // Display array contents on div
  // Submit takes you to submit order page

  // Submit Order Logic in checkout.handlebars
  // ------------------------------------------
  // ------------------------------------------

  // Review and Submit Order
  // ------------------------------------------
  // Completed: 03/__/2020 by: _____
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------

  // Spotify Logic in checkout.handlebars
  // ------------------------------------------
  // ------------------------------------------

  // Select and Store Data from Spotify
  // ------------------------------------------
  // Completed: 03/__/2020 by: _____
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------

  // Employee Logic in employee.handlebars
  // ------------------------------------------
  // ------------------------------------------

  // Name of Code Block
  // ------------------------------------------
  // Completed: 03/__/2020 by: _____
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------

  // Big Board Logic in status.handlebars
  // ------------------------------------------

  // Name of Code Block
  // ------------------------------------------
  // Completed: 03/__/2020 by: _____
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------
});
