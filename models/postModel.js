var pool = require('../db');
var Promise = require('promise');
var fileUpload = require('express-fileupload');
var uuidv4 = require('uuid/v4');

var checkFormattedAddress = function (formattedAddress)	{

	return new Promise(function(resolve, reject)	{
		
		var sql = 'SELECT formattedAddress from Sale WHERE formattedAddress = ?;'

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
			if(err) console.log(err);

			connection.query(sql, [formattedAddress], function (err, postingsWithAddress) {
	          
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

var insertPosting = function(beds, baths, sqFt, lotSqFt, yearBuilt, hoa, lotType, price, lat, lng, formattedAddress, saleId, datePosted, description, agentId)	{

	return new Promise(function(resolve, reject)	{

		var array = [beds, baths, sqFt, lotSqFt, yearBuilt, hoa, lotType, price, lat, lng, formattedAddress, saleId, datePosted, description, agentId];
		
		var insertPostQuery = "INSERT INTO `fa17g07`.`Sale` (`beds`, `baths`, `sqFt`, `lotSqFt`, `yearBuilt`, `hoa`, " +
      		"`lotType`, `price`, `lat`, `lon`, `formattedAddress`, `saleId`, `datePosted`, `description`, `agentId`) " +
			"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

	    pool.getConnection(function(err, connection){ //Get connection to pool

	    	if(err) reject(err);

	    connection.query(insertPostQuery, array, function (err, postCheck)  {
			
			if(err) {
				reject(err);
			}

			resolve(postCheck);
			
	    });

	    connection.release();

	  }); //End of connection pool

  	});

}

var insertImageDb = function(saleId, imageId)	{

	return new Promise(function(resolve, reject)	{

		var array = [saleId, imageId];
		
		var insertPostQuery = "INSERT INTO `fa17g07`.`SaleImages` (`saleId`, `imageId`) VALUES (?, ?);";

	    pool.getConnection(function(err, connection){ //Get connection to pool

	    	if(err) return reject(err);

	    connection.query(insertPostQuery, array, function (err, insertImageCheck)  {
			
			if(err) {
				return reject(err);
			}

			return resolve(imageId);
			
	    });

	    connection.release();

	  }); //End of connection pool
		

  	});

}

var insertImageFile = function(image, imageId, saleId)	{

	return new Promise(function(resolve, reject)	{

	    image.mv('public/saleImages/' + imageId + '.jpg', function(err) {
			if (err)
			  return reject(err);

			return resolve( imageId);
		});

	});
}


module.exports.insertImageFile = insertImageFile;
module.exports.insertImageDb = insertImageDb;
module.exports.checkFormattedAddress = checkFormattedAddress;
module.exports.insertPosting = insertPosting;