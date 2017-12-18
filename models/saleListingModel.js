var pool = require('../db');
var Promise = require('promise');

var getSaleInfo = function(saleId)	{
	return new Promise(function(resolve, reject){
		
		var sql = 'SELECT lotType, beds, baths, yearBuilt, lotSqFt, sqFt, price, formattedAddress, lat, lon, ' +
		'description FROM Sale WHERE saleId = ?;';
		
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
module.exports.getSaleInfo = getSaleInfo;