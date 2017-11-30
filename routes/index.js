var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res) {  

  if(req.session.isLoggedIn)	{
  	res.render('index', { userId: req.session.userId });
  }	else	{
  	res.render('index');
  	// Did it work
  }
  
});

module.exports = router;