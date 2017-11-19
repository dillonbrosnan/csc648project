var pool = require('../db');
var Promise = require('promise');

var getSaleListings = function (lat, lon, milesRadius)	{

	return new Promise(function(resolve, reject)	{
	
		var sql = 'SELECT saleId, ACOS( SIN( RADIANS( lat ) ) * SIN( RADIANS( ? ) ) ' + 
	    '+ COS( RADIANS( lat ) ) * COS( RADIANS( ? )) * COS( RADIANS( lon ) ' +
	    '- RADIANS( ? )) ) * 3959 AS distance FROM Sale WHERE ' +
	    'ACOS( SIN( RADIANS( lat ) ) * SIN( RADIANS( ? ) ) + COS( RADIANS( lat ) ) ' +
	    '* COS( RADIANS( ? )) * COS( RADIANS( lon ) - RADIANS( ? )) ) * 3959 < ? ' +
	    'ORDER BY distance';

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err) console.log(err);

	      connection.query(sql, [lat, lat, lon, lat, lat, lon, milesRadius], function (err, rows) {
	          
	          if(err)	{
	          	return reject(err);
	          }
	          resolve(rows);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

module.exports.getSaleListings = getSaleListings;