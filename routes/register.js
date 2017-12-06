var express = require('express');
var router = express.Router();
var pool = require('../db');
var bcrypt = require('bcrypt');
var uuidv4 = require('uuid/v4');

// Route
router.get('/',function(req,res){
  res.render('register', {role: "user"} );
});

router.get('/agent',function(req,res){
  res.render('register', {role: "agent"});
});

// Route
router.post('/',function(req,res){

  var username = req.body.username;
	var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var formattedAddress = req.body.formattedAddress;
  var lat = Number(req.body.lat);
  var lng = Number(req.body.lng);
  var userId = uuidv4({msecs: new Date('2011-11-01').getTime()});

	// Db queries
  var checkUsernameEmailQuery = "SELECT username, email FROM fa17g07.User WHERE username=? OR email=?;";
	var insertUserQuery = "INSERT INTO `fa17g07`.`User` (`userId`, `password`, `email`, `firstName`, `lastName`, `username`, " +
      "`lat`, `lon`, `formattedAddress`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

	var salt = bcrypt.genSaltSync(10);
	// Salt and hash password
	var hash = bcrypt.hashSync(password, salt);

	pool.getConnection(function(err, connection){ //Get connection to pool

    connection.query(checkUsernameEmailQuery, [username, email], function (err, usernameEmailResult)  {
      if (err)
        return res.send(400);
      if(usernameEmailResult.length > 0)  { //Logic for if user exists should be put in here
        if(usernameEmailResult[0].username == username && usernameEmailResult[0].email == email)  {
          console.log("Email and username taken");
          res.redirect('/fa17g07/register');
        } else if(usernameEmailResult[0].username == username) {
          console.log("Username taken");
          res.redirect('/fa17g07/register'); 
        } else  {
          console.log("Email taken");
          res.redirect('/fa17g07/register');
        }
      } else  { //Logic for creating user should be put in here
        connection.query(insertUserQuery, [userId, hash, email, firstName, lastName, username, lat, lng, formattedAddress], function (err, registrationResult)  {
        if(err) {
          console.log(err);
          res.redirect('/fa17g07/register');
        }
        console.log("Successfully created user");
        res.redirect('/fa17g07/');
        connection.release();
        });
      }

    });

	}); //End of connection pool

});

// Route
router.post('/agent',function(req,res){

  var username = req.body.username;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var formattedAddress = req.body.formattedAddress;
  var lat = Number(req.body.lat);
  var lng = Number(req.body.lng);
  var userId = uuidv4({msecs: new Date('2011-11-01').getTime()});

  // Db queries
  var checkUsernameEmailQuery = "SELECT username, email FROM fa17g07.Agent WHERE username=? OR email=?;";
  var insertUserQuery = "INSERT INTO `fa17g07`.`Agent` (`agentId`, `password`, `email`, `firstName`, `lastName`, `username`, " +
      "`lat`, `lon`, `formattedAddress`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

  var salt = bcrypt.genSaltSync(10);
  // Salt and hash password
  var hash = bcrypt.hashSync(password, salt);

  pool.getConnection(function(err, connection){ //Get connection to pool

    connection.query(checkUsernameEmailQuery, [username, email], function (err, usernameEmailResult)  {
      if(err) {
        console.log(err);
        res.redirect('/fa17g07/register');
      }
      if(usernameEmailResult.length > 0)  { //Logic for if user exists should be put in here
        if(usernameEmailResult[0].username == username && usernameEmailResult[0].email == email)  {
          console.log("Email and username taken");
          res.redirect('/fa17g07/register');
        } else if(usernameEmailResult[0].username == username) {
          console.log("Username taken");
          res.redirect('/fa17g07/register'); 
        } else  {
          console.log("Email taken");
          res.redirect('/fa17g07/register');
        }
      } else  { //Logic for creating user should be put in here
        connection.query(insertUserQuery, [userId, hash, email, firstName, lastName, username, lat, lng, formattedAddress], function (err, registrationResult)  {
        if(err) {
          console.log(err);
          res.redirect('/fa17g07/register');
        }
        console.log("Successfully created user");
        res.redirect('/fa17g07/');
        connection.release();
        });
      }

    });

  }); //End of connection pool

});


module.exports = router;
