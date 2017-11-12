var express = require('express');
var router = express.Router();
var pool = require('../db');
var bcrypt = require('bcrypt');
var uuidv4 = require('uuid/v4');

// Route
router.get('/',function(req,res){
  res.render('register',
    {role: "user"}
  );
});

router.get('/agent*',function(req,res){
  res.render('register',
    {role: "agent"}
  );
});

router.get('/admin*',function(req,res){
  res.render('register',
    {role: "admin"}
  );
});

// Route
router.post('/',function(req,res){

	var password = req.body.password;
  var userId = uuidv4({msecs: new Date('2011-11-01').getTime()});

	// Db query
	var sql = "INSERT INTO `fa17g07`.`User` (`userId`, `password`, `email`, `firstName`, `lastName`, `username`) " +
	"VALUES (?, ?, 'vik.grewal1992@gmail.com', 'vikram', 'grewal', 'jigeri');";
  	var salt = bcrypt.genSaltSync(10);

	// Salt and hash password
	var hash = bcrypt.hashSync(password, salt);

	pool.getConnection(function(err, connection){ //Get connection to pool
    
        connection.query(sql, [userId, hash], function (err, result) {
	    	
        if (err) {
          console.log(err);
          res.redirect('http://www.404errorpages.com/');
        }
	    	
	    	res.redirect("/");
  		});

        connection.release();

	}); //End of connection pool

	

  
});


module.exports = router;