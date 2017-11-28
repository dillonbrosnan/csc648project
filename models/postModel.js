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

var insertPosting = function(beds, baths, sqFt, lotSqFt, yearBuilt, hoa, lotType, price, lat, lng, formattedAddress, saleId, datePosted, description)	{

	return new Promise(function(resolve, reject)	{

		var array = [beds, baths, sqFt, lotSqFt, yearBuilt, hoa, lotType, price, lat, lng, formattedAddress, saleId, datePosted, description];
		
		var insertPostQuery = "INSERT INTO `fa17g07`.`Sale` (`beds`, `baths`, `sqFt`, `lotSqFt`, `yearBuilt`, `hoa`, " +
      		"`lotType`, `price`, `lat`, `lon`, `formattedAddress`, `saleId`, `datePosted`, `description`) " +
			"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

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

var insertImagesToFileSystem = function(images)	{

	return new Promise(function(resolve, reject)	{

		var imageNames = [];
		console.log(images);

		for(var i = 0; i < images.length; i++)	{
			if(images[i].mimetype == 'image/jpeg')	{
				var imageId = uuidv4({msecs: new Date().getTime()});
				imageNames.push(imageId);
				var image = images[i];
			    image.mv('./public/saleImages/' + imageId + '.jpg', function(err)  {
			      if(err) {
			        reject();
			      }
			    });
			}	else	{
				console.log("File not supported");
			}
		}

		resolve(imageNames);

  	});

}

var buildSqlQuery = function(imageNames)	{

	return new Promise(function(resolve, reject)	{

		console.log(imageNames);

		var sqlQuery = "INSERT INTO `fa17g07`.`SaleImage` (`imageId`, `saleId) VALUES ";

		for(var i = 0; i < imageNames.length; i++)	{
			sqlQuery.concat("(?, ?) ")
		}
		sqlQuery.concat(";")

		resolve(sqlQuery);

  	});

}


module.exports.buildSqlQuery = buildSqlQuery;
module.exports.insertImagesToFileSystem = insertImagesToFileSystem;
module.exports.checkFormattedAddress = checkFormattedAddress;
module.exports.insertPosting = insertPosting;