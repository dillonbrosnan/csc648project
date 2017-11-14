var express = require('express');
var router = express.Router();
var pool = require('../db');
var bcrypt = require('bcrypt');
var uuidv4 = require('uuid/v4');

// Route
router.get('/',function(req,res){
  res.render('post',
    {role: "agent"}
  );
});

module.exports = router;