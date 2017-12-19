var express = require('express');
var router = express.Router();

router.get('/', function(req,res){

	if(req.session.isLoggedIn)	{
		req.session.destroy();
		return res.redirect('../../../fa17g07/');
	}
	
	return res.redirect('../../../fa17g07/');
});

module.exports = router;