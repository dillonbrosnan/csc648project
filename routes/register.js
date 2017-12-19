var express = require('express');
var router = express.Router();
var pool = require('../db');
var bcrypt = require('bcrypt');
var uuidv4 = require('uuid/v4');
var RegisterModel = require('../models/registerModel.js');

// Route
router.get('/',function(req,res){
  if(req.session.isLoggedIn)  {
    return res.redirect('..');
  }
  res.render('register', {role: "user"} );
});

router.get('/agent',function(req,res){
  if(req.session.isLoggedIn)  {
    return res.redirect('../..');
  }
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
  var userId = uuidv4({msecs: new Date().getTime()});

	var salt = bcrypt.genSaltSync(10);
	// Salt and hash password
	var hash = bcrypt.hashSync(password, salt);

  RegisterModel.userCheck(username, email)
    .then(function(duplicateUsers)  {
        if(duplicateUsers.length > 0) { // Duplicate users check
          if(duplicateUsers[0].username == username && duplicateUsers[0].email == email)  {
            return res.render('register', {
              role: 'user',
              error: 'Username ' + username + ' and email ' + email + ' taken'
            })
          } else if(duplicateUsers[0].username == username) {
            return res.render('register', {
              role: 'user',
              error: 'Username ' + username + ' taken',
              email: email
            })
          } else  {
            return res.render('register', {
              role: 'user',
              error: 'Email ' + email + ' taken',
              username: username
            })
          }
        } else  {
          return RegisterModel.insertUser(userId, hash, email, firstName, 
            lastName, username, lat, lng, formattedAddress);
        }
    })
    .then(function(insertedRows)  {
        return res.redirect('../login');
    })
    .catch(function(error)  {
      return res.redirect('/fa17g07/error');
    })

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
  var userId = uuidv4({msecs: new Date().getTime()});

  var salt = bcrypt.genSaltSync(10);
  // Salt and hash password
  var hash = bcrypt.hashSync(password, salt);

  RegisterModel.agentCheck(username, email)
    .then(function(duplicateUsers)  {
        if(duplicateUsers.length > 0) { // Duplicate users check
          if(duplicateUsers[0].username == username && duplicateUsers[0].email == email)  {
            return res.render('register', {
              role: 'agent',
              error: 'Username ' + username + ' and email ' + email + ' taken'
            })
          } else if(duplicateUsers[0].username == username) {
            return res.render('register', {
              role: 'agent',
              error: 'Username ' + username + ' taken',
              email: email
            })
          } else  {
            return res.render('register', {
              role: 'agent',
              error: 'Email ' + email + ' taken',
              username: username
            })
          }
        } else  {
          return RegisterModel.insertAgent(userId, hash, email, firstName, 
            lastName, username, lat, lng, formattedAddress);
        }
    })
    .then(function(insertedRows)  {
        return res.redirect('../login/agent');
    })
    .catch(function(error)  {
      return res.redirect('/fa17g07/error');
    })


});


module.exports = router;
