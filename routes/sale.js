var express = require('express');
var router = express.Router();
var db = require('../db');

// Search route

/* 
  Commenting source for formula
  https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula/27943  
*/

router.post('/', function(req, res) {
    
    var milesRadius = req.body.milesRadius;
    var lat = req.body.lat;
    var lon = req.body.lng;
    if(lat == undefined || lon == undefined || milesRadius == undefined)  {
      res.redirect("/");
    } else  {
      lat = Number(lat);
      lon = Number(lon);
      milesRadius = Number(milesRadius);
      var withinDistance;

      var sql = 'SELECT saleId, ACOS( SIN( RADIANS( lat ) ) * SIN( RADIANS( ? ) ) ' + 
        '+ COS( RADIANS( lat ) ) * COS( RADIANS( ? )) * COS( RADIANS( lon ) ' +
        '- RADIANS( ? )) ) * 3959 AS distance FROM Sale WHERE ' +
        'ACOS( SIN( RADIANS( lat ) ) * SIN( RADIANS( ? ) ) + COS( RADIANS( lat ) ) ' +
        '* COS( RADIANS( ? )) * COS( RADIANS( lon ) - RADIANS( ? )) ) * 3959 < ? ' +
        'ORDER BY distance';
      db.query(sql, [lat, lat, lon, lat, lat, lon, milesRadius], function (err, rows) {
          if(rows.length != 0){
              res.json(rows);
            }else{
              res.json(rows);
          }
      })
    }
});

module.exports = router;