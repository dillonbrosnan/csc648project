var pool = require('../db');
var Promise = require('promise');

var getSaleInfo = function(saleId){
	return new Promise(function(resolve, reject){
		var sql = 'SELECT lotType, beds, baths, yearBuilt, lotSqFt, sqFt, price, formattedAddress, description FROM Sale where saleId = ?';
		var array = [saleId];
		pool.getConnection(function(err, connection){
			if(err){
				console.log(err);
			}
			connection.query(sql, array, function(err, rows){
				console.log(this.sql);
				if(err){
					return reject(err);
				}
				resolve(rows);
			})
			connection.release();
		});
	});
}
module.exports.getSaleInfo = getSaleInfo;