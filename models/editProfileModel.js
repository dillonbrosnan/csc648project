var pool = require('../db');
var Promise = require('promise');

var getUserInfo = function (userId)	{

	return new Promise(function(resolve, reject)	{


		var array = [userId];
		var sql = ['SELECT * FROM User WHERE',
					'userId = ?'].join(" ");

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, array, function (err, rows) {
	          
	          if(err)	return reject(err);

	          return resolve(rows);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

var getAgentInfo = function (agentId)	{

	return new Promise(function(resolve, reject)	{


		var array = [agentId];
		var sql = ['SELECT * FROM Agent WHERE',
					'agentId = ?'].join(" ");

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, array, function (err, rows) {
	          
	          if(err)	return reject(err);

	          return resolve(rows);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

var userCheck = function (username, email, userId)	{

	return new Promise(function(resolve, reject)	{

		var array = [username, email, userId];
		var sql = "SELECT username, email FROM User WHERE (username=? OR email=?) AND userId != ?;";

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

var agentCheck = function (username, email, agentId)	{

	return new Promise(function(resolve, reject)	{

		var array = [username, email, agentId]
		var sql = "SELECT username, email FROM Agent WHERE (username=? OR email=?) AND agentId != ?;";

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

var updateValuesUser = function (email, firstName, lastName, username, lat, lng, formattedAddress, userId)	{

	return new Promise(function(resolve, reject)	{

		var array = [email, firstName, lastName, username, lat, lng, formattedAddress, userId];
		var sql = ['UPDATE User SET email = ?, firstName = ?, lastName = ?, username = ?,',
					'lat = ?, lon = ?, formattedAddress = ?',
					'WHERE userId = ?'].join(" ");

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, array, function (err, rows) {
	          
	          if(err)	return reject(err);

	          return resolve(rows);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

var updateValuesAgent = function (email, firstName, lastName, username, lat, lng, formattedAddress, agentId)	{

	return new Promise(function(resolve, reject)	{

		var array = [email, firstName, lastName, username, lat, lng, formattedAddress, agentId];
		var sql = ['UPDATE Agent SET email = ?, firstName = ?, lastName = ?, username = ?,',
					'lat = ?, lon = ?, formattedAddress = ?',
					'WHERE agentId = ?'].join(" ");

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, array, function (err, rows) {
	          
	          if(err)	return reject(err);

	          return resolve(rows);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

module.exports.getAgentInfo = getAgentInfo;
module.exports.getUserInfo = getUserInfo;
module.exports.userCheck = userCheck;
module.exports.agentCheck = agentCheck;
module.exports.updateValuesUser = updateValuesUser;
module.exports.updateValuesAgent = updateValuesAgent;