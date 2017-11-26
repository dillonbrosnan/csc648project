var express = require('express');
var router = express.Router();
var pool = require('../db');
var bcrypt = require('bcrypt');
var uuidv4 = require('uuid/v4');

// Route
router.get('/',function(req,res){
  res.render('registersuccessful',
    {role: "user"}
  );
});
	//TODO: Fix the routing to this page for agents only
	//		In the ejs file, there is a section of code that allows
	//		agents to login in the agent login rather than the user login.
router.get('/agent/',function(req,res){
  res.render('registersuccessful',
    {role: "agent"}
  );
});

module.exports = router;