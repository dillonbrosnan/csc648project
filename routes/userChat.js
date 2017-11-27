var express = require('express');
var router = express.Router();
var UserchatModel = require('../models/userChatModel.js');

// Search route

router.get('/', function(req, res) {

    res.render('userChat');

});


module.exports = router;