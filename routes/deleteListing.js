var express = require('express');
var router = express.Router();
var DeleteListingModel = require('../models/deleteListingModel');

router.get('/:saleId', function(req,res){

	if(!req.session.isLoggedIn || req.session.role != "agent")	{
		return res.redirect('../../../login/agent');
	}
	
	var agentId = req.session.sessionId;
	var saleId = req.params.saleId;
	DeleteListingModel.getPermission(agentId, saleId)
		.then(function(listings)	{
			if(listings.length == 0)	{
				return res.redirect('../../viewListings');
			}	else	{
				return DeleteListingModel.deleteListing(agentId, saleId);
			}
		})
		.then(function(deleteRows)	{
			return res.redirect('../../../agent/viewListings')
		})
	
	.catch(function(err){
		console.log(err);
		return res.redirect("/error");
	});
});

module.exports = router;