var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var ViewMessagesModel = require('../models/viewMessagesModel');

// Route
router.get('/',function(req,res){
  
  if(!req.session.isLoggedIn || req.session.role != "agent") {
    return res.redirect('../../login/agent');
  } 

  var agentId = req.session.sessionId;
  ViewMessagesModel.getMessages(agentId).
  	then(function(messages)	{
  		return res.render('agentMessages', {
  			messages: messages,
  			id: req.session.sessionId,
  			role: req.session.role
  		})
  	})
  	.catch(function(error)	{
  		return res.redirect('/fa17g07/error');
  	})
  
});

module.exports = router;