var express = require('express');
var router = express.Router();

router.get('/', function(req,res){

	if(req.session.isLoggedIn)	{
		req.session.destroy();
		return res.redirect('..');
	}
	
	return res.redirect('..');
});

module.exports = router;