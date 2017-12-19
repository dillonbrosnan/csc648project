var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uuidv4 = require('uuid/v4');
var moment = require('moment');
var SaleListingModel = require('../models/saleListingModel');

router.get('/:saleId', function(req,res){
	var saleId = req.params.saleId;
	Promise.all([SaleListingModel.getSaleInfo(saleId), SaleListingModel.getSaleImages(saleId)])
	// SaleListingModel.getSaleInfo(saleId)
	.then(function(saleListing){
		if(saleListing[0].length == 0)	{
			return res.redirect('/fa17g07/');
		}
		else if(saleListing[0].length == 1 && req.session.isLoggedIn){
			res.render('saleListing', {
				saleId: req.params.saleId,
				saleListing : saleListing[0],
				saleImages : saleListing[1],
				id: req.session.sessionId,
				role: req.session.role
			});
		}
		else if(saleListing[0].length == 1){
			res.render('saleListing', {
				saleId: req.params.saleId,
				saleListing : saleListing[0],
				saleImages : saleListing[1]
			});
		}
	})
	.catch(function(err){
		
		return res.redirect('/fa17g07/error');

	});
});

module.exports = router;