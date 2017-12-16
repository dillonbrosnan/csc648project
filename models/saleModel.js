var pool = require('../db');
var Promise = require('promise');

var getSaleListings = function (lat, lon, milesRadius)	{

	return new Promise(function(resolve, reject)	{
		
		var sql = ['SELECT saleId, agentId, lat, lon, formattedAddress, price, baths, beds, sqFt, description, ACOS( SIN( RADIANS( lat ) ) * SIN( RADIANS( ? ) ) ' + 
	    '+ COS( RADIANS( lat ) ) * COS( RADIANS( ? )) * COS( RADIANS( lon ) ' +
	    '- RADIANS( ? )) ) * 3959 AS distance FROM Sale WHERE ' +
	    'ACOS( SIN( RADIANS( lat ) ) * SIN( RADIANS( ? ) ) + COS( RADIANS( lat ) ) ' +
	    '* COS( RADIANS( ? )) * COS( RADIANS( lon ) - RADIANS( ? )) ) * 3959 < ?',
	    'ORDER BY distance'].join(" ");

	    var array = [lat, lat, lon, lat, lat, lon, milesRadius];

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
		if(err) reject(err);

		connection.query(sql, array, function (err, rows) {
	          
			if(err)	return reject(err);

			resolve(rows);
		})

		connection.release();

      	}); //End of connection pool

  	});

}

var getAdvancedSaleListings = function (lat, lon, milesRadius, bedsMin, bedsMax, bathsMin, bathsMax, sqFtMin, 
	sqFtMax, lotSqFtMin, lotSqFtMax, yearBuiltMin, yearBuiltMax, hoaMin, hoaMax, lotType, priceMin, priceMax)	{

	return new Promise(function(resolve, reject)	{
	
		var sql = ['SELECT saleId, agentId, lat, lon, formattedAddress, price, baths, beds, sqFt, description, ACOS( SIN( RADIANS( lat ) ) * SIN( RADIANS( ? ) ) ' + 
	    '+ COS( RADIANS( lat ) ) * COS( RADIANS( ? )) * COS( RADIANS( lon ) ' +
	    '- RADIANS( ? )) ) * 3959 AS distance FROM Sale WHERE ' +
	    'ACOS( SIN( RADIANS( lat ) ) * SIN( RADIANS( ? ) ) + COS( RADIANS( lat ) ) ' +
	    '* COS( RADIANS( ? )) * COS( RADIANS( lon ) - RADIANS( ? )) ) * 3959 < ?',
		'AND (beds BETWEEN ? and ?)',
		'AND (baths BETWEEN ? and ?)',
		'AND (sqFt BETWEEN ? and ?)',
		'AND (lotSqFt BETWEEN ? and ?)',
		'AND (yearBuilt BETWEEN ? and ?)',
		'AND (hoa BETWEEN ? and ?)',
		'AND (lotType = ?)',
		'AND (price BETWEEN ? and ?)',
	    'ORDER BY distance'].join(" ");

	    var array = [lat, lat, lon, lat, lat, lon, milesRadius, bedsMin, bedsMax, bathsMin, bathsMax, sqFtMin, 
	    sqFtMax, lotSqFtMin, lotSqFtMax, yearBuiltMin, yearBuiltMax, hoaMin, hoaMax, lotType, priceMin, priceMax];

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
		if(err) reject(err);

		connection.query(sql, array, function (err, rows) {
	          
			if(err)	return reject(err);

			resolve(rows);
	      
		})

		connection.release();

      	}); //End of connection pool

  	});

}

var getSaleImages = function(saleId)	{
	
	return new Promise(function(resolve, reject){
		
		var sql = 'SELECT imageId FROM SaleImages WHERE saleId = ?;';
		
		var array = [saleId];
		
		pool.getConnection(function(err, connection){
			
			if(err) return reject(err);
			
			connection.query(sql, array, function(err, rows){
				
				if(err)	return reject(err);

				resolve(rows);
			})
			
			connection.release();
		});
	});
}

module.exports.getSaleImages = getSaleImages;
module.exports.getSaleListings = getSaleListings;
module.exports.getAdvancedSaleListings = getAdvancedSaleListings;