var express = require('express');
var router = express.Router();



router.get('/termsconditions', function(req, res) {  
  res.render('termsconditions');
})

module.exports = router;