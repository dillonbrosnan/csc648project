var pool = require('../db');
var Promise = require('promise');

var getSaleInfo = function(saleId){
	return new Promise(function(resolve, reject){
		
		var sql = 'SELECT lotType, beds, baths, yearBuilt, lotSqFt, sqFt, price, formattedAddress, ' +
		'description, SaleImages.imageId FROM Sale, SaleImages where SaleImages.saleId = ? and Sale.saleId = ?;';
		
		var array = [saleId, saleId];
		
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
module.exports.getSaleInfo = getSaleInfo;