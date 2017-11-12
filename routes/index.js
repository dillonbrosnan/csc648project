var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res) {  

  res.render("index");

	// db.getConnection(function(err, connection){ //Get connection to pool

 //  connection.query(sql, function (err, rows) {
 //      if(err)	{
 //      	res.redirect('http://www.404errorpages.com/');
 //      }

 //      if(rows.length >= 0)	{

 //      }
 //  })

 //  connection.release();

 //  }); //End of connection pool
  
});

module.exports = router;