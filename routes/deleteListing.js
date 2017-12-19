var express = require('express');
var router = express.Router();
var DeleteListingModel = require('../models/deleteListingModel');

router.get('/:saleId', function(req,res){

	if(!req.session.isLoggedIn || req.session.role != "agent")	{
		return res.redirect('/fa17g07/login/agent');
	}
	
	var agentId = req.session.sessionId;
	var saleId = req.params.saleId;
	DeleteListingModel.getPermission(agentId, saleId)
		.then(function(listings)	{
			if(listings.length == 0)	{
				return res.redirect('/fa17g07/agent/viewListings');
			}	else	{
				return DeleteListingModel.deleteListing(agentId, saleId);
			}
		})
		.then(function(deleteRows)	{
			return res.redirect('/fa17g07/agent/viewListings')
		})
	
	.catch(function(err){
		return res.redirect("/fa17g07/error");
	});
});

module.exports = router;