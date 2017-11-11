var express = require('express');
var router = express.Router();
var db = require('../db');

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


module.exports = router;