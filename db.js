var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "fa17g07",
  password: "csc648fa17g07",
  database: 'fa17g07'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;