var express = require('express');
var router = express.Router();
var pool = require('../db');
var EditProfileModel = require('../models/editProfileModel.js');

// Route
router.get('/agent',function(req,res){
  if(!req.session.isLoggedIn || req.session.role != 'agent')  {
    return res.redirect('../..');
  } else if(req.session.isLoggedIn && req.session.role == 'agent')
    var agentId = req.session.sessionId;
    EditProfileModel.getAgentInfo(agentId)
    .then(function(agentInfo)  {
      res.render('editProfile', {
        role: req.session.role,
        id: req.session.sessionId,
        info: agentInfo[0]
      });
    })
  
});

router.get('/',function(req,res){
  if(!req.session.isLoggedIn || req.session.role != 'user')  {
    return res.redirect('../..');
  } else if(req.session.isLoggedIn && req.session.role == 'user')
    var userId = req.session.sessionId;
    EditProfileModel.getUserInfo(userId)
    .then(function(userInfo)  {
      res.render('editProfile', {
        role: req.session.role,
        id: req.session.sessionId,
        info: userInfo[0]
      });
    })
});

// Route
router.post('/',function(req,res){

  var username = req.body.username;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var formattedAddress = req.body.formattedAddress;
  var lat = Number(req.body.lat);
  var lng = Number(req.body.lng);
  var userId = req.session.sessionId;
  req.checkBody('username', 'Username cannot be empty').notEmpty();
  req.checkBody('email', 'Email cannot be empty').notEmpty();
  req.checkBody('firstName', 'First name cannot be empty').notEmpty();
  req.checkBody('lastName', 'Last name cannot be empty').notEmpty();
  req.checkBody('formattedAddress', 'Formatted address cannot be empty').notEmpty();
  req.checkBody('lat', 'Lat must be filled').notEmpty();
  req.checkBody('lng', 'Lng must be filled').notEmpty();
  var errors = req.validationErrors();
  if(errors)  {
    return res.redirect('/fa17g07/editProfile');
  }

  EditProfileModel.userCheck(username, email, userId)
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
            return res.redirect('../editProfile');
          }
        } else  {
          return EditProfileModel.updateValuesUser(email, firstName, 
            lastName, username, lat, lng, formattedAddress, userId);
        }
    })
    .then(function(insertedRows)  {
      console.log(insertedRows);
        return res.redirect('../editProfile');
    })
    .catch(function(error)  {
      return res.status(500).send( { error : error });
    })

});

// Route
router.post('/agent',function(req,res){

  var username = req.body.username;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var formattedAddress = req.body.formattedAddress;
  var lat = Number(req.body.lat);
  var lng = Number(req.body.lng);
  var agentId = req.session.sessionId;
  req.checkBody('username', 'Username cannot be empty').notEmpty();
  req.checkBody('email', 'Email cannot be empty').notEmpty();
  req.checkBody('firstName', 'First name cannot be empty').notEmpty();
  req.checkBody('lastName', 'Last name cannot be empty').notEmpty();
  req.checkBody('formattedAddress', 'Formatted address cannot be empty').notEmpty();
  req.checkBody('lat', 'Lat must be filled').notEmpty();
  req.checkBody('lng', 'Lng must be filled').notEmpty();
  var errors = req.validationErrors();
  if(errors)  {
    return res.redirect('/fa17g07/editProfile/agent');
  }

  EditProfileModel.agentCheck(username, email, agentId)
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
            return res.redirect('/fa17g07/editProfile/agent');
          }
        } else  {
          return EditProfileModel.updateValuesAgent(email, firstName, 
            lastName, username, lat, lng, formattedAddress, agentId);
        }
    })
    .then(function(insertedRows)  {
      console.log(insertedRows);
        return res.redirect('/fa17g07/editProfile/agent');
    })
    .catch(function(error)  {
      return res.redirect('/fa17g07/error');
    })

});




module.exports = router;
