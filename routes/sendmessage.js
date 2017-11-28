var express = require('express');
var router = express.Router();
var pool = require('../db');
var bcrypt = require('bcrypt');
var uuidv4 = require('uuid/v4');

//TODO: Pull saleid, agentid and maybe full address to autofill in the form, don't know how to 
router.get('/', function(req, res) {  
  res.render('sendmessage',
  {	agentid: "1234",
  	saleid: "12345678",
  	address: "1234 Test Street San Francisco, CA, 94112"});
});

//TODO: Add post route for sendmessage once form is complete and put into database.
//		Don't want to screw up something that I don't know what to do lol. 
router.post('/', function(req,res) {
	res.redirect('/');
});


module.exports = router;