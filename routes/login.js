var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var LoginModel = require('../models/loginModel');

// Route
router.get('/',function(req,res){
  
  if(req.session.isLoggedIn) {
    res.redirect('..');
  } else  {
    res.render('login', {role: "user"});
  }
  
});

router.get('/agent',function(req,res){
  
  if(req.session.isLoggedIn) {
    res.redirect('../..');
  } else  {
    res.render('login', {role: "agent"});
  }
  
});

router.get('/admin',function(req,res){
  
  if(req.session.isLoggedIn) {
    res.redirect('../..');
  } else  {
    res.render('login', {role: "admin"});
  }
  
});

// Route
router.post('/',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  
  req.checkBody('username', 'Username must be between 1 and 20 characters').isLength({ min: 1, max: 20});
  req.checkBody('password', 'Password must be between 1 and 20 characters').isLength({ min: 1, max: 20});
  var errors = req.validationErrors();

  // Checks to see if there is any errors with form types
  if (errors) {
    
    var response = { errors: [] };
    errors.forEach(function(err) {
      response.errors.push(err.msg);
    });
    res.statusCode = 400;
    return res.json(response);

  } else  {

    LoginModel.loginAsUser(username, password)
      .then(function(usernames)  {
        if(usernames.length == 0) {
          res.redirect('../register/');
        }
        if(usernames.length == 1) {
          var hash = usernames[0].password;
          bcrypt.compare(password, hash, function(err, response) {
            if(response == true) { //If username matches database
              req.session.sessionId = usernames[0].userId;
              req.session.isLoggedIn = true;
              req.session.role = "user";
              res.redirect('..');
            } else  { //If username doesn't match database
              res.render('login', {
                role: "user",
                errors: "Password incorrect",
                username: username
              });
            }
          });
        }
      })
      .catch(function(err) {
        console.log(err);
        res.redirect("/error");
      });
  }

});

router.post('/admin',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  
  req.checkBody('username', 'Username must be between 1 and 20 characters').isLength({ min: 1, max: 20});
  req.checkBody('password', 'Password must be between 1 and 20 characters').isLength({ min: 1, max: 20});
  var errors = req.validationErrors();

  // Checks to see if there is any errors with form types
  if (errors) {
    
    var response = { errors: [] };
    errors.forEach(function(err) {
      response.errors.push(err.msg);
    });
    res.statusCode = 400;
    return res.json(response);

  } else  {

    LoginModel.loginAsAdmin(username, password)
      .then(function(usernames)  {
        if(usernames.length == 0) {
          res.redirect('../..');
        }
        if(usernames.length == 1) {
          var hash = usernames[0].password;
          bcrypt.compare(password, hash, function(err, response) {
            if(response == true) { //If username matches database
              req.session.sessionId = usernames[0].adminId;
              req.session.isLoggedIn = true;
              req.session.role = "admin";
              res.redirect('../..');
            } else  { //If username doesn't match database
              res.render('login', {
                role: "admin",
                errors: "Password incorrect",
                username: username
              });
            }
          });
        }
      })
      .catch(function(err) {
        console.log(err);
        res.redirect("/error");
      });
  }

});

router.post('/agent',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  
  req.checkBody('username', 'Username must be between 1 and 20 characters').isLength({ min: 1, max: 20});
  req.checkBody('password', 'Password must be between 1 and 20 characters').isLength({ min: 1, max: 20});
  var errors = req.validationErrors();

  // Checks to see if there is any errors with form types
  if (errors) {
    
    var response = { errors: [] };
    errors.forEach(function(err) {
      response.errors.push(err.msg);
    });
    res.statusCode = 400;
    return res.json(response);

  } else  {

    LoginModel.loginAsAgent(username, password)
      .then(function(usernames)  {
        if(usernames.length == 0) {
          res.redirect('../../register/agent');
        }
        if(usernames.length == 1) {
          var hash = usernames[0].password;
          bcrypt.compare(password, hash, function(err, response) {
            if(response == true) { //If username matches database
              req.session.sessionId = usernames[0].agentId;
              req.session.isLoggedIn = true;
              req.session.role = "agent";
              res.redirect('../..');
            } else  { //If username doesn't match database
              res.render('login', {
                role: "agent",
                errors: "Password incorrect",
                username: username
              });
            }
          });
        }
      })
      .catch(function(err) {
        console.log(err);
        res.redirect("/error");
      });
  }

});


module.exports = router;