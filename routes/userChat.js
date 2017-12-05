var express = require('express');
var router = express.Router();
var UserChatModel = require('../models/userChatModel.js');

// Search route



router.get('/:saleId', function(req, res) {

	if(req.session.role != "user")	{
		res.redirect("/login/");
	}	else if(req.params.saleId)	{
		var userId = req.session.id;
		var saleId = req.params.saleId;
		UserChatModel.getSaleMessages(saleId, userId)
		.then(function(messages)  {
	      res.render('userChat', {
	      	messages: messages
	      })
	    })
		.catch(function(err) {
	      console.log(err);
	      res.status(400);
	      return res.send("Could not open messages");
	    });
	}  

});

router.post('/', function(req, res) {

	var userId = req.session.id, role = req.session.role;
	var messageContent = req.body.messageContent;
	var saleId = req.body.saleId;
	req.checkBody('messageContent', 'Message must be less than 255 characters').notEmpty().isLength({ min: 0, max: 255 });
	req.checkBody('saleId', 'Sale Id cannot be empty').notEmpty();

	var errors = req.validationErrors();

  	if(errors)  {
	  	var response = { errors: [] };
	    errors.forEach(function(err) {
	      response.errors.push(err.msg);
	    });
	    res.statusCode = 400;
	    return res.json(response);
	} else  {
	  	UserChatModel.getAgentId(req.body.saleId)
	    .then(function(agentId) {
	      return Promise.all([agentId[0].agentId, UserChatModel.postMessage(userId, role, agentId[0].agentId, saleId, messageContent)]); 
	    })
	    .then(function()  {
	      return res.send('Successfully posted posting');
	    })
	    .catch(function(err) {
	      console.log(err);
	      res.status(400);
	      return res.send("Couldn't post message");
	    });
	}
});
    

module.exports = router;