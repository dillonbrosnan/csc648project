var express = require('express');
var router = express.Router();
var pool = require('../db');

// Search route

/* 
  Commenting source for formula
  https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula/27943  
*/

router.post('/', function(req, res) {
    
    var milesRadius = req.body.milesRadius;
    var lat = req.body.lat;
    var lon = req.body.lng;
    

    lat = Number(lat);
    lon = Number(lon);
    milesRadius = Number(milesRadius);

    var sql = 'SELECT saleId, ACOS( SIN( RADIANS( lat ) ) * SIN( RADIANS( ? ) ) ' + 
    '+ COS( RADIANS( lat ) ) * COS( RADIANS( ? )) * COS( RADIANS( lon ) ' +
    '- RADIANS( ? )) ) * 3959 AS distance FROM Sale WHERE ' +
    'ACOS( SIN( RADIANS( lat ) ) * SIN( RADIANS( ? ) ) + COS( RADIANS( lat ) ) ' +
    '* COS( RADIANS( ? )) * COS( RADIANS( lon ) - RADIANS( ? )) ) * 3959 < ? ' +
    'ORDER BY distance';

    pool.getConnection(function(err, connection){ //Get connection to pool
      if(err) console.log(err);

      connection.query(sql, [lat, lat, lon, lat, lat, lon, milesRadius], function (err, rows) {
          if(rows.length != 0){
              res.json(rows);
            }else{
              res.json(rows);
          }
      })

      connection.release();

    }); //End of connection pool

});

module.exports = router;