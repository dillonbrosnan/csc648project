var pool = require('../db');
var Promise = require('promise');

var userCheck = function (username, email)	{

	return new Promise(function(resolve, reject)	{

		var array = [username, email];
		var sql = "SELECT username, email FROM User WHERE username=? OR email=?;";

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, array, function (err, usernames) {
	          
	          if(err)	return reject(err);

	          resolve(usernames);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

var insertUser = function(userId, hash, email, firstName, lastName, username, lat, lng, formattedAddress)	{

	return new Promise(function(resolve, reject)	{

		var array = [userId, hash, email, firstName, lastName, username, lat, lng, formattedAddress];
		var sql = "INSERT INTO User (`userId`, `password`, `email`, `firstName`, `lastName`, `username`, " +
      "`lat`, `lon`, `formattedAddress`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, array, function (err, usernames) {
	          
	          if(err)	return reject(err);

	          resolve(usernames);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

var agentCheck = function (username, email)	{

	return new Promise(function(resolve, reject)	{

		var array = [username, email]
		var sql = "SELECT username, email FROM Agent WHERE username=? OR email=?;";

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, array, function (err, usernames) {
	          
	          if(err)	return reject(err);

	          resolve(usernames);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

var insertAgent = function(userId, hash, email, firstName, lastName, username, lat, lng, formattedAddress)	{

	return new Promise(function(resolve, reject)	{

		var array = [userId, hash, email, firstName, lastName, username, lat, lng, formattedAddress];
		var sql = "INSERT INTO Agent (`agentId`, `password`, `email`, `firstName`, `lastName`, `username`, " +
      "`lat`, `lon`, `formattedAddress`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";;

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, array, function (err, usernames) {
	          
	          if(err)	return reject(err);

	          resolve(usernames);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}


module.exports.userCheck = userCheck;
module.exports.agentCheck = agentCheck;
module.exports.insertUser = insertUser;
module.exports.insertAgent = insertAgent;