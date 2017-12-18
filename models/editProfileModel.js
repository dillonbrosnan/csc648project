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

module.exports.getAgentInfo = getAgentInfo;
module.exports.getUserInfo = getUserInfo;