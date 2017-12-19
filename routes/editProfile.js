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
      return res.status(500).send( { error : error });
    })

});




module.exports = router;
