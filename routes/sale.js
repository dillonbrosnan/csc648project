var express = require('express');
var router = express.Router();
var SaleModel = require('../models/saleModel.js');

// Search route

router.post('/', function(req, res) {
    
    var milesRadius = req.body.milesRadius;
    var lat = req.body.lat;
    var lon = req.body.lng;
    

    lat = Number(lat);
    lon = Number(lon);
    milesRadius = Number(milesRadius);

    SaleModel.getSaleListings(lat, lon, milesRadius)
      .then(function(rows)  {
        if(rows.length >= 0) {
          console.log("Successfuclly got records");
          res.json(rows);
        }
      })
      .catch(function(err) {
        res.redirect("http://www.google.com");
      });


});

module.exports = router;