var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');
var moment = require('moment');
var MessageAgentModel = require('../models/messageAgentModel');

router.post('/:saleId/message', function(req,res){

	if(!req.session.isLoggedIn || req.session.role != "user")	{
		return res.redirect('..');
	}
	var phoneNo = req.body.phoneNo;
	var messageContent = req.body.messageContent;
	var saleId= req.params.saleId;
	var currentTimestamp = moment().unix();
	var date = moment(currentTimestamp*1000).format("YYYY-MM-DD HH:mm:ss");
	var messageId = uuidv4({msecs: new Date().getTime()});
	req.checkBody('phoneNo', 'Phone number must be less than 45 characters').isLength({min: 0, max: 45});
	req.checkBody('messageContent', 'Message cannot be more than 255 characters').isLength({min: 0, max: 255});
	var errors = req.validationErrors();
	if(errors)  {
		
		return res.redirect('/fa17g07/error');

	}   

	MessageAgentModel.getAgentId(saleId)
	.then(function(agentId)	{
		if(agentId.length == 0)	{
			return res.redirect('..');
		}	else	{
			var agentId = agentId[0].agentId;
			return MessageAgentModel.sendMessage(messageId, agentId, 
				saleId, date, messageContent, phoneNo);
		}
	})
	.then(function(messages)	{
		console.log("Message sent to agent for sale " + saleId);
		return res.redirect('/fa17g07/forSale/' + saleId);
	})
	.catch(function(error)  {
		return res.redirect('/fa17g07/error');
	});

});

module.exports = router;