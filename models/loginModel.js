var pool = require('../db');
var Promise = require('promise');
var db = require('../db');

var loginAsUser = function (username, password)	{

	return new Promise(function(resolve, reject)	{
	
		var sql = 'SELECT userId, password FROM User WHERE username = ?';

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, [username], function (err, usernames) {
	          
	          if(err)	return reject(err);

	          resolve(usernames);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

var loginAsAdmin = function (username, password)	{

	return new Promise(function(resolve, reject)	{
	
		var sql = 'SELECT adminId, password FROM Admin WHERE username = ?';

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, [username], function (err, usernames) {
	          
	          if(err)	return reject(err);

	          resolve(usernames);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}

var loginAsAgent = function (username, password)	{

	return new Promise(function(resolve, reject)	{
	
		var sql = 'SELECT agentId, password FROM Agent WHERE username = ?';

	    pool.getConnection(function(err, connection){ //Get connection to pool
	      
	      if(err)	return reject(err);

	      connection.query(sql, [username], function (err, usernames) {
	          
	          if(err)	return reject(err);

	          resolve(usernames);
	      })

	      connection.release();

      	}); //End of connection pool

  	});

}
module.exports.loginAsUser = loginAsUser;
module.exports.loginAsAdmin = loginAsAdmin;
module.exports.loginAsAgent = loginAsAgent;
