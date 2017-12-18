var express = require('express');
var router = express.Router();
var pool = require('../db');
var EditProfileModel = require('../models/editProfileModel.js');

// Route
router.get('agent/editProfile',function(req,res){
  if(req.session.isLoggedIn && req.session.role != 'agent')  {
    return res.redirect('../..');
  }
  res.render('agentEditProfile', {role: "agent"} );
});

router.get('editProfile',function(req,res){
  if(req.session.isLoggedIn && req.session.role != 'user')  {
    return res.redirect('..');
  }
  res.render('userEditProfile', {role: "user"});
});

// Route
router.post('editProfile',function(req,res){

  var username = req.body.username;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var formattedAddress = req.body.formattedAddress;
  var lat = Number(req.body.lat);
  var lng = Number(req.body.lng);
  var userId = req.session.sessionId;

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
              error: 'Username ' + username + 'taken',
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
      return res.status(500).send( { error : error });
    })

});

// Route
router.post('agent/editProfile',function(req,res){

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
              error: 'Username ' + username + 'taken',
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
        return res.redirect('../../login/agent');
    })
    .catch(function(error)  {
      return res.status(500).send( { error : error });
    })


});


module.exports = router;
