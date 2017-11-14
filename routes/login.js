var express = require('express');
var router = express.Router();
var db = require('../db');
var bcrypt = require('bcrypt');

// Route
router.get('/',function(req,res){
  
  if(typeof req.query.incorrectPassword != "undefined") {
    var username = req.query.incorrectPassword;
    res.render('login', {
      role: "user",
      username: username
    });
  } else  {
    res.render('login', {role: "user"});
  }
  
});

router.get('/agent',function(req,res){
  
  if(typeof req.query.incorrectPassword != "undefined") {
    var username = req.query.incorrectPassword;
    res.render('login', {
      role: "agent",
      username: username
    });
  } else  {
    res.render('login', {role: "agent"});
  }
  
});

router.get('/admin',function(req,res){
  
  if(typeof req.query.incorrectPassword != "undefined") {
    var username = req.query.incorrectPassword;
    res.render('login', {
      role: "admin",
      username: username
    });
  } else  {
    res.render('login', {role: "admin"});
  }
  
});

// Route
router.post('/user',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  // Db query
  var sql = 'SELECT userId, password FROM User WHERE username = ?';
  db.query(sql, [username], function (err, rows) {

      if (err) {
        res.redirect('http://www.404errorpages.com/');      
      }

      if(rows.length > 0) { // If username exists in database
        var hash = rows[0].password;
        bcrypt.compare(password, hash, function(err, response) {
        
        if(response == true) { //If username matches database
          res.redirect('/');
        } else  { //If username doesn't match database
            res.redirect('/login?incorrectPassword=' + username);
          }
        });
      } else  { // If username doesn't exist
        res.redirect('/register');
      }
  })
});

router.post('/agent',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  // Db query
  var sql = 'SELECT agentId, password FROM Agent WHERE username = ?';
  db.query(sql, [username], function (err, rows) {

      if (err) {
        res.redirect('http://www.404errorpages.com/');      
      }

      if(rows.length > 0) { // If username exists in database
        var hash = rows[0].password;
        bcrypt.compare(password, hash, function(err, response) {
        
        if(response == true) { //If username matches database
          res.redirect('/');
        } else  { //If username doesn't match database
            res.redirect('/login?incorrectPassword=' + username);
          }
        });
      } else  { // If username doesn't exist
        res.redirect('/register');
      }
  })
});

router.post('/admin',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  // Db query
  var sql = 'SELECT adminId, password FROM Admin WHERE username = ?';
  db.query(sql, [username], function (err, rows) {

      if (err) {
        res.redirect('http://www.404errorpages.com/');      
      }

      if(rows.length > 0) { // If username exists in database
        var hash = rows[0].password;
        bcrypt.compare(password, hash, function(err, response) {
        
        if(response == true) { //If username matches database
          res.redirect('/');
        } else  { //If username doesn't match database
            res.redirect('/login?incorrectPassword=' + username);
          }
        });
      } else  { // If username doesn't exist
        res.redirect('/register');
      }
  })
});


module.exports = router;