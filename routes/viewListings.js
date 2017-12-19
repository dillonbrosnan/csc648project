var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var ViewListingsModel = require('../models/viewListingsModel');

// Route
router.get('/',function(req,res){
  
  if(!req.session.isLoggedIn || req.session.role != "agent") {
    return res.redirect('/fa17g07/login/agent');
  } 

  var agentId = req.session.sessionId;
  ViewListingsModel.getListings(agentId).
  	then(function(listings)	{
  		return res.render('agentListings', {
  			listings: listings,
  			id: req.session.sessionId,
  			role: req.session.role
  		})
  	})
  	.catch(function(error)	{
  		return res.redirect('/fa17g07/error');
  	})
  
});

module.exports = router;