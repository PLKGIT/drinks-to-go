// *********************************************************************************
// connection.js
// *********************************************************************************

// Connection Dependencies
var mysql = require("mysql");

// Connection Information
var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "password",
  database: "drinkstogo_db"
});

if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host:'qbhol6k6vexd5qjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user:'vchsywlhov3dgzlf',
    password: 'yj0zfow54kjz66rt',
    database: 'bbk0phd05y8qzfwo'
  });
};


// Connect to Database
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export Connection
module.exports = connection;