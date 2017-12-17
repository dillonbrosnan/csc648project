var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res) {  

  if(req.session.isLoggedIn)	{
  	res.render('index', { 
  		id: req.session.sessionId,
  		role: req.session.role 
  	});
  }	else	{
  	res.render('index');
  }
  
});

module.exports = router;