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

//helper Functions
// function isValidEmail(email) {

//   if (email.length < 1) {
//     return false;
//   }

//   //var regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
//   //var regEx = /\\S+@\\S+/;
//   var regEx = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

//   var validEmail = regEx.test(email);
//   if (!validEmail) {
//     return false;
//   }

//   return true;
// }

// Query Customers table to ensure the email address exists
// function isEmailAddressExistsInTable(emailInput) {
//   $.get("/api/customers/" + newEmail, function (data) {
//     console.log("----FormEmail----");
//     console.log(newEmail);
//   }).then(function (data) {

//     console.log(data);
//     // TODO: how do we check the data is valid or not that we get from apiRoutes.js??
//     // TODO: currently this is not working !!
//     if (data != null) {
//       return true;
//     }
//     else {
//       return false;
//     }
//   });
// }

// Logic
// ------------------------------------------
// ------------------------------------------

$(document).ready(function() {
  // Logic for index.handlebars Modal
  $(".modal").modal();

  var errCheck1 = false;
  var errCheck2 = false;
  var errCheck3 = false;

  function checkedDuplicate() {
    $.get("/api/customers/" + newEmail, function(data) {
      if (!data) {
        errCheck3 = true;
      }
      //console.log("------------------------------")
      console.log(data);
      //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    });
  }

  $(document).unbind("click").on("click", "#newSubmit", function(event) {
    // $("#newSubmit").on("click", function(event) {
    event.preventDefault();
    // alert("logiiiiiinnnn");
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
      errCheck3 = false;
    }
    else {
      errCheck3 = true;
    }

    if (errCheck1 === true) {
      alert("Please Enter a Valid Name");
    }
    if (errCheck2 === true || errCheck3 === true) {
      alert("Either Enter Invalid email address or duplicate email adress");
    }
    
    var errCheck1 = false;
    var errCheck2 = false;
    var errCheck3 = false;
    
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
// login returning customer
  $("#custSubmit").on("click", function(event) {
    event.preventDefault();
    var newEmail = $("#formEmail")
      .val()
      .trim();
    console.log(newEmail);

    if (isValidEmail(newEmail)) {
      errCheck = false;
    } else if (checkedDuplicate(newEmail)) {
      errCheck2 = false;
    }
    if (errCheck2 == true || errCheck == true) {
      alert("Either Enter Invalid email address or duplicate email adress");
    }else {
     // window.location.replace("/menu")

      $.get("/api/customers/", function(data){
        for(var i = 0; i < data.length; i++) {
          var cusEmail = data[i].cust_email;
          if (cusEmail === newEmail) {
            custName = data[i].cust_name;
            custEmail = data[i].cust_email;
            custId = data[i].cid
            break;
          }
        }

        alert(custId + " " + custEmail + " " + custName);

        // alert("custumer id found: cusId, cusname, cusname", custId, custEmail, custName);
        
        // custName = data.cust_name;
        // custEmail = data.cust_email;
        // custId = data.cid;
        //console.log("************* >>>>>>>")
        //console.log(custName)
        //console.log(data[6].cust_name);
      })
    }
  });

  function isValidName(name) {
    if (name.length < 1) {
      return false;
    }
    return true;
  }

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




  //Guest Login

  // $("#guestSubmit").on("click",function(event){
  //   event.preventDefault();
  //   var guestInput = $("#guestName").val().trim();
  //   console.log("!!!!!!!!!!!!!!!!!!!!!");
  //   console.log(guestInput);
  //   window.location.replace("/menu")
  // });
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
  // Completed: 03/__/2020 by: Jyochsna
  // Tested: 03/__/2020 by: _____
  // ------------------------------------------

  // Logic for Create an Account index.handlebars Modal
  // $(".modal").modal();

  // Validate Create an Account Form
  // $(document).on("click", "#newSubmit", function (event) {
  //   event.preventDefault();
  //   // alert("logiiiiiinnnn");
  //   var newName = $("#newName")
  //     .val()
  //     .trim();
  //   var newEmail = $("#newEmail")
  //     .val()
  //     .trim();

  //   if (newName.length < 1) {
  //     errCheck = true;
  //   }

  //   if (!isValidEmail(newEmail)) {
  //     errCheck = true;
  //   }

  //   if (errCheck === true) {
  //     alert("Error Detected");
  //   }

    // var newCustomer = {
    //   cust_name: $("#newName")
    //     .val()
    //     .trim(),
    //   cust_email: $("#newEmail")
    //     .val()
    //     .trim()
    // };
    // $.post("api/customers", newCustomer).then(function (req, res) {
    //   //  console.log(data);

    //   console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++")
    //   // $("#newName").val("");
    //   // $("#newEmail").val("");
    //   window.location.replace("/menu")
    // });

  // });

  $("#songButton").on("click", function(event) {
    event.preventDefault();
    $("#dropdown1").empty();
    var songToSearch = $("#songName").val();
    var song = { spotifyThis: songToSearch };
    $.post("/api/spotify", song, function(data) {
      $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
      console.log("post request");

      // console.log("songToSearch is " + songToSearch);
      $.post("/api/spotify", song, function(data) {
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

  $(document).on("click", ".songChoice", function(event) {
    event.preventDefault();
    var usersSong = $(this).attr("dataval");
    console.log("usersong is below");
    $.post("api/songs", { song: usersSong });
  });

  $(".songChoice").on("click", function() {
    var usersSong = this.text();
    console.log("usersong is below");
    console.log(usersSong);
  });
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
    content.text("Welcome " + custName);
    profile.append(content);
    console.log(content);
  }
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

  $(".atc")
    .unbind("click")
    .click(function() {
      event.preventDefault();

      console.log("--this.id--");
      console.log(this.id);

      // Set Product variables by searching product by PID in button
      itemProdId = this.id;

      $.get("/api/products/" + itemProdId, function(data) {
        // Increment Item Counter by 1
        itemCounter++;

        // Test Parameters
        orderId = 6;
        custId = 7;
        orderName = "Pam Test";

        // Set Customer-specific variables with existing variables
        itemOrderId = orderId;
        itemCustId = custId;
        itemOrderName = orderName;

        // Set Item No variable to ItemCounter
        itemNo = itemCounter;
        // Data from Get
        itemProdName = data.prod_name;
        itemSize = data.size;
        itemPrice = data.price;
      }).then(function(data) {
        // Console Logs
        console.log("--Data--");
        console.log(data);
        console.log("--itemProdName--");
        console.log(itemProdName);
        console.log("--itemSize--");
        console.log(itemSize);
        console.log("--itemPrice--");
        console.log(itemPrice);
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
      $("#cart").append(cartArray);
    });
});
