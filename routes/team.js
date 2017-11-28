var express = require('express');
var router = express.Router();



router.get('/vikram', function(req, res) {  
  res.render('team/vikram');
})
router.get('/animohan', function(req, res) {  
  res.render('team/animohan');
});

router.get('/dillonb', function(req, res) {  
  res.render('team/dillonb');
});

router.get('/indra', function(req, res) {  
  res.render('team/indra');
});

router.get('/darrylr', function(req, res) {  
  res.render('team/darrylr');
});

router.get('/royanguiano', function(req, res) {  
  res.render('team/royanguiano');
});

module.exports = router;