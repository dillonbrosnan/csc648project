var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uuidv4 = require('uuid/v4');
var moment = require('moment');
var SaleListingModel = require('../models/saleListingModel');

router.get('/:saleId', function(req,res){
	var saleId = req.params.saleId;
	SaleListingModel.getSaleInfo(saleId)
	.then(function(saleListing){
		if(saleListing.length == 0)	{
			res.redirect('../..');
		}
		else if(saleListing.length == 1 && req.session.isLoggedIn){
			res.render('saleListing', {
				saleId: req.params.saleId,
				saleListing : saleListing,
				id: req.session.sessionId,
				role: req.session.role
			});
		}
		else if(saleListing.length == 1){
			res.render('saleListing', {
				saleId: req.params.saleId,
				saleListing : saleListing,
				role: null
			});
		}
	})
	.catch(function(err){
		console.log(err);
		res.redirect("/error");
	});
});

module.exports = router;