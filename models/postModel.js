var pool = require('../db');
var Promise = require('promise');

var checkFormattedAddress = function (formattedAddress)	{

	return new Promise(function(resolve, reject)	{
		
		var sql = 'SELECT formattedAddress from Sale WHERE formattedAddress = ?;'

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
			if(err) console.log(err);

			connection.query(sql, [formattedAddress], function (err, postingsWithAddress) {

      		console.log(this.sql);
	          
			if(err)	{
				return reject(err);
			}

			if(postingsWithAddress.length >= 1)	reject(new Error('Address already exists'));

			else resolve();

	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

var insertPosting = function(beds, baths, sqFt, lotSqFt, yearBuilt, hoa, lotType, price, lat, lng, formattedAddress, saleId, datePosted)	{

	return new Promise(function(resolve, reject)	{

		var array = [beds, baths, sqFt, lotSqFt, yearBuilt, hoa, lotType, price, lat, lng, formattedAddress, saleId, datePosted];
		
		var insertPostQuery = "INSERT INTO `fa17g07`.`Sale` (`beds`, `baths`, `sqFt`, `lotSqFt`, `yearBuilt`, `hoa`, " +
      		"`lotType`, `price`, `lat`, `lon`, `formattedAddress`, `saleId`, `datePosted`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

	    pool.getConnection(function(err, connection){ //Get connection to pool

	    	if(err) reject(err);

	    connection.query(insertPostQuery, array, function (err, postCheck)  {
			
			if(err) {
				reject(err);
			}

			resolve(postCheck);
			
	    });

	  }); //End of connection pool

  	});

}

module.exports.checkFormattedAddress = checkFormattedAddress;
module.exports.insertPosting = insertPosting;